namespace tl3d {
    export class BaseRes extends ResCount {


        static IMG_TYPE: number = 1;
        static OBJS_TYPE: number = 2;
        static MATERIAL_TYPE: number = 3;
        static PARTICLE_TYPE: number = 4;
        static SCENE_TYPE: number = 5;
        static ZIP_OBJS_TYPE: number = 6;
        static PREFAB_TYPE: number = 1;
        static SCENE_PARTICLE_TYPE: number = 11;


        protected _byte: TLByteArray
        protected imgNum: number;
        protected imgLoadNum: number;
        protected _imgComplete: boolean;

        protected _progressFun: Function;
        public version: number;
        public _imgFun: Function;

        private allImgBytes: number = 10000000;

        public read($imgFun: Function = null): void {
            this._imgFun = $imgFun;
            var fileType: number = this._byte.readInt();
            if (fileType == BaseRes.IMG_TYPE) {
                if (Scene_data.supportBlob) {
                    this.readImg();
                } else {
                    this.readImgLow();
                }
            } else if (fileType == BaseRes.OBJS_TYPE) {
                this.readObj(this._byte);
            } else if (fileType == BaseRes.MATERIAL_TYPE) {
                this.readMaterial();
            } else if (fileType == BaseRes.PARTICLE_TYPE) {
                this.readParticle();
            } else if (fileType == BaseRes.ZIP_OBJS_TYPE) {
                this.readZipObj();
            }

        }

        public readZipObj(): void {
            var zipLen: number = this._byte.readInt();
            var aryBuf: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + zipLen);
            this._byte.position += zipLen;
            var zipedBuf: ArrayBuffer = Util.unZip(aryBuf)
            var newByte: TLByteArray = new TLByteArray(zipedBuf);
            this.readObj(newByte);
        }

        /**
         * h5微端解析效率很高
         */
        public readImg(): void {
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            // var time: number = TimeUtil.getTimer();

            var ary: Array<Blob> = new Array;
            var urlAry: Array<string> = new Array;

            for (var i: number = 0; i < this.imgNum; i++) {
                var url: string = Scene_data.fileRoot + this._byte.readUTF();
                var imgSize: number = this._byte.readInt();
                if (url.search(".jpng") != -1) {
                    this.readJpngImg(url);
                    continue;
                }
                var imgAryBuffer: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + imgSize);
                this._byte.position += imgSize;
                var blob: Blob = new Blob([imgAryBuffer], { type: "application/octet-binary" });
                ary.push(blob);
                urlAry.push(url);
            }

            for (var i: number = 0; i < ary.length; i++) {
                var img: any = new Image();
                img.url = urlAry[i];
                img.onload = (evt: Event) => {
                    this.addImg(evt.target["url"], evt.target);
                    var etimg: any = evt.target;
                    URL.revokeObjectURL(etimg.src);
                }
                img.src = URL.createObjectURL(ary[i]);
            }
        }


        public readJpngImg($url: string): void {
            var rgbSize: number = this._byte.readInt();
            var imgAryBuffer: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + rgbSize);
            this._byte.position += rgbSize;


            var alphaSize: number = this._byte.readInt();
            var alphaImgAryBuffer: ArrayBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + alphaSize);
            this._byte.position += alphaSize;

            var img: any = new Image();
            var alphaImg: any = new Image();

            var loadNum: number = 0;
            var comFun: Function = (evt: Event) => {
                loadNum++;
                if (loadNum < 2) {
                    return;
                }
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(img.width, img.height);
                ctx.drawImage(img, 0, 0);

                var imgData: ImageData = ctx.getImageData(0, 0, img.width, img.height);

                ctx.clearRect(0, 0, img.width, img.height);
                ctx.drawImage(alphaImg, 0, 0);

                var alphaImgdata: ImageData = ctx.getImageData(0, 0, img.width, img.height);

                for (var i = 0; i < imgData.data.length; i += 4) {
                    var per: number = alphaImgdata.data[i] / 255;
                    // imgData.data[i] *= per;
                    // imgData.data[i + 1] *= per;
                    // imgData.data[i + 2] *= per;
                    imgData.data[i + 3] = alphaImgdata.data[i];
                }
                this.addImg($url.replace(".jpng", ".png"), imgData);
            }

            img.onload = comFun;
            alphaImg.onload = comFun;
            img.src = 'data:image/png;base64,' + Base64.encode(imgAryBuffer);
            alphaImg.src = 'data:image/png;base64,' + Base64.encode(alphaImgAryBuffer);
        }

        private urlCache: Object = {};

        public readImgLow(): void {
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            // var time: number = TimeUtil.getTimer();
            var bytes: number = 0;
            for (var i: number = 0; i < this.imgNum; i++) {
                var _url = this._byte.readUTF();
                var url: string = Scene_data.fileRoot + LoadManager.getInstance().getVersion(_url);
                var imgSize: number = this._byte.readInt();
                bytes += imgSize;
                var img: any = new Image();
                img.url = url;
                this.urlCache[url] = Scene_data.fileRoot + _url;
                img.onload = (evt: Event) => {
                    this.loadImg(evt.target);
                }
                img.src = url;
            }
            this.allImgBytes = bytes;

        }

        public loadImg(img: any): void {
            var url = this.urlCache[img.url] || img.url;
            TextureManager.getInstance().addRes(url, img);
            this.countImg();
        }

        public addImg($url: string, img: any): void {
            TextureManager.getInstance().addRes($url, img);
            this.countImg();
        }

        public countImg(): void {
            this.imgLoadNum++;
            if (this.imgLoadNum == this.imgNum) {
                this._imgComplete = true;
                this.allResCom();
            }
        }

        public readObj($srcByte: TLByteArray): void {
            var objNum: number = $srcByte.readInt();
            for (var i: number = 0; i < objNum; i++) {
                var url: string = Scene_data.fileRoot + $srcByte.readUTF();
                var size: number = $srcByte.readInt();
                var newByte: TLByteArray = new TLByteArray();
                newByte.length = size;
                $srcByte.readBytes(newByte, 0, size);
                var objData: ObjData = ObjDataManager.getInstance().loadObjCom(newByte.buffer, url);
            }
            if (this._imgFun) {
                this._imgFun();
            }

        }

        public readMaterial(): void {
            var objNum: number = this._byte.readInt();
            // var time: number = TimeUtil.getTimer();

            for (var i: number = 0; i < objNum; i++) {
                var url: string = Scene_data.fileRoot + this._byte.readUTF();
                var size: number = this._byte.readInt();

                var dataByte: TLByteArray = new TLByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size)
                MaterialManager.getInstance().addResByte(url, dataByte);
            }
        }

        public readParticle(): void {
            var objNum: number = this._byte.readInt();
            // var time: number = TimeUtil.getTimer();

            for (var i: number = 0; i < objNum; i++) {
                var url: string = Scene_data.fileRoot + this._byte.readUTF();
                var size: number = this._byte.readInt();


                var dataByte: TLByteArray = new TLByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size)
                ParticleManager.getInstance().addResByte(url, dataByte);
            }
        }

        //读材质参数
        public readMaterialInfo(): Array<any> {

            var len: number = this._byte.readInt();
            if (len > 0) {
                var $arr: Array<any> = new Array
                for (var i: number = 0; i < len; i++) {
                    var $temp: any = new Object();
                    $temp.type = this._byte.readInt()
                    $temp.name = this._byte.readUTF()
                    if ($temp.type == 0) {
                        $temp.url = this._byte.readUTF()
                    }
                    if ($temp.type == 1) {
                        $temp.x = this._byte.readFloat()
                    }
                    if ($temp.type == 2) {
                        $temp.x = this._byte.readFloat()
                        $temp.y = this._byte.readFloat()
                    }
                    if ($temp.type == 3) {
                        $temp.x = this._byte.readFloat()
                        $temp.y = this._byte.readFloat()
                        $temp.z = this._byte.readFloat()
                    }

                    $arr.push($temp)
                }
                return $arr
            } else {
                return null
            }
        }

        //读取浮点数据，两个字节
        static readFloatTwoByte(byte: TLByteArray, vertices: Array<number>): void {


            var verLength: number = byte.readInt();
            if (verLength > 0) {
                var $scaleNum: number = byte.readFloat();
                vertices.length = 0
                for (var i: number = 0; i < verLength; i++) {
                    vertices.push(byte.readFloatTwoByte($scaleNum))

                }
            }

        }

        //读取一个字节的LightMap
        static readFloatOneByte(byte: TLByteArray, vertices: Array<number>): void {
            var verLength: number = byte.readInt();
            if (verLength > 0) {
                for (var i: number = 0; i < verLength; i++) {
                    vertices.push((byte.readByte() + 128) / 256)
                }
            }

        }

        static readIntForTwoByte(byte: TLByteArray, indexs: Array<number>): void {
            var iLen: number = byte.readInt();
            for (var i: number = 0; i < iLen; i++) {
                indexs.push(byte.readShort());
            }
        }

        static readIntForOneByte(byte: TLByteArray, indexs: Array<number>): void {
            var iLen: number = byte.readInt();
            for (var i: number = 0; i < iLen; i++) {
                indexs.push(byte.readByte());
            }
        }


        /**
         * $readType
         * 0 readFloatTwoByte
         * 1 readFloatOneByte
         * 2 readIntForOneByte
         *  */
        static readBytes2ArrayBuffer($byte: TLByteArray, $data: DataView, $dataWidth: number, $offset: number, $stride: number, $readType: number = 0): void {
            var verLength: number = $byte.readInt();

            if (verLength <= 0) {
                return;
            }

            var scaleNum: number;
            if ($readType == 0) {
                scaleNum = $byte.readFloat();
            }

            var readNum: number = verLength / $dataWidth;
            for (var i: number = 0; i < readNum; i++) {
                var pos: number = $stride * i + $offset;
                for (var j: number = 0; j < $dataWidth; j++) {

                    if ($readType == 0) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatTwoByte(scaleNum), true);
                    } else if ($readType == 1) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatOneByte(), true);
                    } else if ($readType == 2) {
                        $data.setFloat32((pos + j) * 4, $byte.readByte(), true);
                    } else if ($readType == 3) {
                        $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);
                    } else if ($readType == 4) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);
                    }
                }
            }
        }



        //读取材质参数
        static readMaterialParamData(byte: TLByteArray): Array<any> {
            var mpNum: number = byte.readInt();
            if (mpNum > 0) {
                var mpAry: Array<any> = new Array;
                for (var j: number = 0; j < mpNum; j++) {
                    var obj: any = new Object;
                    obj.name = byte.readUTF();
                    obj.type = byte.readByte();
                    if (obj.type == 0) {
                        obj.url = byte.readUTF();
                    } else if (obj.type == 1) {
                        obj.x = byte.readFloat();
                    } else if (obj.type == 2) {
                        obj.x = byte.readFloat();
                        obj.y = byte.readFloat();
                    } else if (obj.type == 3) {
                        obj.x = byte.readFloat();
                        obj.y = byte.readFloat();
                        obj.z = byte.readFloat();
                    }
                    mpAry.push(obj);
                }
                return mpAry
            }
            return null
        }
        public allResCom(): void {
            if (this._imgFun) {
                this._imgFun();
            }
        }
    }
}