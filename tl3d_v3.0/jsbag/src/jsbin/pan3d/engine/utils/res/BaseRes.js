var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var BaseRes = /** @class */ (function (_super) {
        __extends(BaseRes, _super);
        function BaseRes() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.allImgBytes = 10000000;
            return _this;
        }
        //constructor() {
        //this.useNum = 0;
        //}
        BaseRes.prototype.read = function ($imgFun) {
            if ($imgFun === void 0) { $imgFun = null; }
            this._imgFun = $imgFun;
            var fileType = this._byte.readInt();
            if (fileType == BaseRes.IMG_TYPE) {
                if (Pan3d.Scene_data.supportBlob) {
                    this.readImg();
                }
                else {
                    this.readImgLow();
                }
            }
            else if (fileType == BaseRes.OBJS_TYPE) {
                this.readObj(this._byte);
            }
            else if (fileType == BaseRes.MATERIAL_TYPE) {
                this.readMaterial();
            }
            else if (fileType == BaseRes.PARTICLE_TYPE) {
                this.readParticle();
            }
            else if (fileType == BaseRes.ZIP_OBJS_TYPE) {
                this.readZipObj();
            }
        };
        BaseRes.prototype.readZipObj = function () {
            var zipLen = this._byte.readInt();
            var aryBuf = this._byte.buffer.slice(this._byte.position, this._byte.position + zipLen);
            this._byte.position += zipLen;
            var zipedBuf = unZip(aryBuf);
            var newByte = new Pan3d.Pan3dByteArray(zipedBuf);
            this.readObj(newByte);
        };
        BaseRes.prototype.readImg = function () {
            var _this = this;
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            //this.imgAry = new Array;
            var time = Pan3d.TimeUtil.getTimer();
            var ary = new Array;
            var urlAry = new Array;
            for (var i = 0; i < this.imgNum; i++) {
                var url = Pan3d.Scene_data.fileRoot + this._byte.readUTF();
                var imgSize = this._byte.readInt();
                if (url.search(".jpng") != -1) {
                    this.readJpngImg(url);
                    continue;
                }
                //this.imgAry.push(url);
                var imgAryBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + imgSize);
                this._byte.position += imgSize;
                var blob = new Blob([imgAryBuffer], { type: "application/octet-binary" });
                ary.push(blob);
                urlAry.push(url);
            }
            for (var i = 0; i < ary.length; i++) {
                var img = new Image();
                img.url = urlAry[i];
                img.onload = function (evt) {
                    _this.loadImg(evt.target);
                    var etimg = evt.target;
                    URL.revokeObjectURL(etimg.src);
                };
                img.src = URL.createObjectURL(ary[i]);
            }
        };
        BaseRes.prototype.readJpngImg = function ($url) {
            var _this = this;
            var rgbSize = this._byte.readInt();
            var imgAryBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + rgbSize);
            this._byte.position += rgbSize;
            var alphaSize = this._byte.readInt();
            var alphaImgAryBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + alphaSize);
            this._byte.position += alphaSize;
            var img = makeImage();
            var alphaImg = makeImage();
            var loadNum = 0;
            var comFun = function (evt) {
                loadNum++;
                if (loadNum < 2) {
                    return;
                }
                var ctx = Pan3d.UIManager.getInstance().getContext2D(img.width, img.height);
                ctx.drawImage(img, 0, 0);
                var imgData = ctx.getImageData(0, 0, img.width, img.height);
                ctx.clearRect(0, 0, img.width, img.height);
                ctx.drawImage(alphaImg, 0, 0);
                var alphaImgdata = ctx.getImageData(0, 0, img.width, img.height);
                for (var i = 0; i < imgData.data.length; i += 4) {
                    var per = alphaImgdata.data[i] / 255;
                    // imgData.data[i] *= per;
                    // imgData.data[i + 1] *= per;
                    // imgData.data[i + 2] *= per;
                    imgData.data[i + 3] = alphaImgdata.data[i];
                }
                _this.addImg($url.replace(".jpng", ".png"), imgData);
            };
            img.onload = comFun;
            alphaImg.onload = comFun;
            //img.src = 'data:image/png;base64,' + Base64.encode(imgAryBuffer);
            //alphaImg.src = 'data:image/png;base64,' + Base64.encode(alphaImgAryBuffer);
        };
        BaseRes.prototype.readImgLow = function () {
            var _this = this;
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            // this.imgAry = new Array;
            var time = Pan3d.TimeUtil.getTimer();
            var bytes = 0;
            for (var i = 0; i < this.imgNum; i++) {
                var url = Pan3d.Scene_data.fileRoot + this._byte.readUTF();
                var imgSize = this._byte.readInt();
                bytes += imgSize;
                var img = makeImage();
                img.url = url;
                //this.imgAry.push(url);
                img.onload = function (evt) {
                    _this.loadImg(evt.target);
                };
                img.src = url;
            }
            this.allImgBytes = bytes;
        };
        BaseRes.prototype.loadImg = function (img) {
            Pan3d.TextureManager.getInstance().addRes(img.url, img);
            this.countImg();
        };
        BaseRes.prototype.addImg = function ($url, img) {
            Pan3d.TextureManager.getInstance().addRes($url, img);
            this.countImg();
        };
        BaseRes.prototype.countImg = function () {
            this.imgLoadNum++;
            if (this.imgLoadNum == this.imgNum) {
                this._imgComplete = true;
                this.allResCom();
            }
        };
        BaseRes.prototype.readObj = function ($srcByte) {
            var objNum = $srcByte.readInt();
            for (var i = 0; i < objNum; i++) {
                var url = Pan3d.Scene_data.fileRoot + $srcByte.readUTF();
                var size = $srcByte.readInt();
                var newByte = new Pan3d.Pan3dByteArray();
                newByte.length = size;
                $srcByte.readBytes(newByte, 0, size);
                var objData = Pan3d.ObjDataManager.getInstance().loadObjCom(newByte.buffer, url);
            }
            if (this._imgFun) {
                this._imgFun();
            }
        };
        BaseRes.prototype.readMaterial = function () {
            var objNum = this._byte.readInt();
            //this.materialAry = new Array;
            var time = Pan3d.TimeUtil.getTimer();
            for (var i = 0; i < objNum; i++) {
                var url = Pan3d.Scene_data.fileRoot + this._byte.readUTF();
                var size = this._byte.readInt();
                var dataByte = new Pan3d.Pan3dByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size);
                Pan3d.MaterialManager.getInstance().addResByte(url, dataByte);
                //this.materialAry.push(url);
            }
            ////console.log("material time", (TimeUtil.getTimer() - time));
            //this.read();
        };
        BaseRes.prototype.readParticle = function () {
            var objNum = this._byte.readInt();
            //this.particleAry = new Array;
            var time = Pan3d.TimeUtil.getTimer();
            for (var i = 0; i < objNum; i++) {
                var url = Pan3d.Scene_data.fileRoot + this._byte.readUTF();
                var size = this._byte.readInt();
                var dataByte = new Pan3d.Pan3dByteArray;
                dataByte.length = size;
                this._byte.readBytes(dataByte, 0, size);
                Pan3d.ParticleManager.getInstance().addResByte(url, dataByte);
                //this.particleAry.push(url);
                //SceneRes.particleDic[url] = str;
            }
            ////console.log("particle time", (TimeUtil.getTimer() - time));
            //this.read();
        };
        //读材质参数
        BaseRes.prototype.readMaterialInfo = function () {
            var len = this._byte.readInt();
            if (len > 0) {
                var $arr = new Array;
                for (var i = 0; i < len; i++) {
                    var $temp = new Object();
                    $temp.type = this._byte.readInt();
                    $temp.name = this._byte.readUTF();
                    if ($temp.type == 0) {
                        $temp.url = this._byte.readUTF();
                    }
                    if ($temp.type == 1) {
                        $temp.x = this._byte.readFloat();
                    }
                    if ($temp.type == 2) {
                        $temp.x = this._byte.readFloat();
                        $temp.y = this._byte.readFloat();
                    }
                    if ($temp.type == 3) {
                        $temp.x = this._byte.readFloat();
                        $temp.y = this._byte.readFloat();
                        $temp.z = this._byte.readFloat();
                    }
                    $arr.push($temp);
                }
                return $arr;
            }
            else {
                return null;
            }
        };
        //读取浮点数据，两个字节
        BaseRes.readFloatTwoByte = function (byte, vertices) {
            var verLength = byte.readInt();
            if (verLength > 0) {
                var $scaleNum = byte.readFloat();
                vertices.length = 0;
                for (var i = 0; i < verLength; i++) {
                    vertices.push(byte.readFloatTwoByte($scaleNum));
                }
            }
        };
        //读取一个字节的LightMap
        BaseRes.readFloatOneByte = function (byte, vertices) {
            var verLength = byte.readInt();
            if (verLength > 0) {
                for (var i = 0; i < verLength; i++) {
                    vertices.push((byte.readByte() + 128) / 256);
                }
            }
        };
        BaseRes.readIntForTwoByte = function (byte, indexs) {
            var iLen = byte.readInt();
            for (var i = 0; i < iLen; i++) {
                indexs.push(byte.readShort());
            }
        };
        BaseRes.readIntForOneByte = function (byte, indexs) {
            var iLen = byte.readInt();
            for (var i = 0; i < iLen; i++) {
                indexs.push(byte.readByte());
            }
        };
        /**
         * $readType
         * 0 readFloatTwoByte
         * 1 readFloatOneByte
         * 2 readIntForOneByte
         *  */
        BaseRes.readBytes2ArrayBuffer = function ($byte, $data, $dataWidth, $offset, $stride, $readType) {
            if ($readType === void 0) { $readType = 0; }
            var verLength = $byte.readInt();
            if (verLength <= 0) {
                return;
            }
            var scaleNum;
            if ($readType == 0) {
                scaleNum = $byte.readFloat();
            }
            var readNum = verLength / $dataWidth;
            for (var i = 0; i < readNum; i++) {
                var pos = $stride * i + $offset;
                for (var j = 0; j < $dataWidth; j++) {
                    if ($readType == 0) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatTwoByte(scaleNum), true);
                    }
                    else if ($readType == 1) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloatOneByte(), true);
                    }
                    else if ($readType == 2) {
                        $data.setFloat32((pos + j) * 4, $byte.readByte(), true);
                    }
                    else if ($readType == 3) {
                        $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);
                    }
                    else if ($readType == 4) {
                        $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);
                    }
                }
            }
        };
        //读取材质参数
        BaseRes.readMaterialParamData = function (byte) {
            var mpNum = byte.readInt();
            if (mpNum > 0) {
                var mpAry = new Array;
                for (var j = 0; j < mpNum; j++) {
                    var obj = new Object;
                    obj.name = byte.readUTF();
                    obj.type = byte.readByte();
                    if (obj.type == 0) {
                        obj.url = byte.readUTF();
                    }
                    else if (obj.type == 1) {
                        obj.x = byte.readFloat();
                    }
                    else if (obj.type == 2) {
                        obj.x = byte.readFloat();
                        obj.y = byte.readFloat();
                    }
                    else if (obj.type == 3) {
                        obj.x = byte.readFloat();
                        obj.y = byte.readFloat();
                        obj.z = byte.readFloat();
                    }
                    mpAry.push(obj);
                }
                return mpAry;
            }
            return null;
        };
        BaseRes.prototype.allResCom = function () {
            if (this._imgFun) {
                this._imgFun();
            }
        };
        BaseRes.IMG_TYPE = 1;
        BaseRes.OBJS_TYPE = 2;
        BaseRes.MATERIAL_TYPE = 3;
        BaseRes.PARTICLE_TYPE = 4;
        BaseRes.SCENE_TYPE = 5;
        BaseRes.ZIP_OBJS_TYPE = 6;
        BaseRes.PREFAB_TYPE = 1;
        BaseRes.SCENE_PARTICLE_TYPE = 11;
        return BaseRes;
    }(Pan3d.ResCount));
    Pan3d.BaseRes = BaseRes;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=BaseRes.js.map