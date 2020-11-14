module Pan3d {
    export class SceneRes extends BaseRes {
        public static sceneConfigData: any;//场景分组数据
        private _completeFun: Function;
        private _readDataFun: Function;
        protected _progressFun: Function;
        public sceneData: any;


        public load($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): void {

            if (this.sceneData) {
                if (this.isNeedReload()) {
                    $completeFun();
                    $progressFun(1);
                    this.applyByteArray();
                } else {
                    $completeFun();
                    $progressFun(1);
                    $readDataFun(this.sceneData);
                }
                return;
            }

            this._completeFun = $completeFun;
            this._readDataFun = $readDataFun;
            this._progressFun = $progressFun;

            var config: any = SceneRes.sceneConfigData;
            //config[$url] = null;
            if (config && config[$url]) {
                ////console.log($url)
                this.loadZipMap($url, config[$url].len);
            } else {
                $url = Scene_data.fileRoot + getMapUrl($url);
                LoadManager.getInstance().load($url, LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                    this.loadComplete($byte);
                    //this.unZip($byte);
                }, null, $progressFun);
            }

        }

        public loadZipMap(name: string, size: number): void {

            var xhrList: Array<XMLHttpRequest> = new Array;

            var aryBufList: Array<ArrayBuffer> = new Array;
            var comNum: number = 0;

            var proList: Array<number> = new Array;

            for (var i: number = 0; i < size; i++) {
                proList[i] = 0;
            }


            var comFun: Function = ($curxhr: XMLHttpRequest) => {
                var arybuf: ArrayBuffer = $curxhr.response;

                var idx: number = xhrList.indexOf($curxhr);
                aryBufList[idx] = arybuf;

                comNum++;
                if (comNum == xhrList.length) {//加载完成
                    var bufSize: number = 0;
                    for (var i: number = 0; i < aryBufList.length; i++) {
                        bufSize += aryBufList[i].byteLength;
                    }

                    var newBuf: Uint8Array = new Uint8Array(bufSize);
                    var flag: number = 0;
                    for (var i: number = 0; i < aryBufList.length; i++) {
                        newBuf.set(new Uint8Array(aryBufList[i]), flag);
                        flag += aryBufList[i].byteLength;
                    }
                    this.loadComplete(newBuf.buffer);
                    //this.unZip(newBuf.buffer);
                }

            }

            var proFun: Function = ($curxhr: XMLHttpRequest, num: number) => {
                var idx: number = xhrList.indexOf($curxhr);
                proList[idx] = num;
                var allPre: number = 0;
                for (var i: number = 0; i < size; i++) {
                    allPre += proList[i];
                }
                allPre = allPre / size;
                ////console.log("--------地图加载@：",idx,num,allPre);
                this._progressFun(allPre);
            }

            for (var i: number = 0; i < size; i++) {
                var xhr: XMLHttpRequest = new XMLHttpRequest();

                xhr.onreadystatechange = (e: Event) => {
                    var curXhr: XMLHttpRequest = <XMLHttpRequest>e.target;
                    if (curXhr.status == 200 && curXhr.readyState == 4) {
                        comFun(curXhr);
                    }
                }
                xhr.onprogress = (e: ProgressEvent) => {
                    var curXhr: XMLHttpRequest = <XMLHttpRequest>e.target;
                    ////console.log("++++++++地图加载@：",e,e.loaded,e.total);
                    proFun(curXhr, e.loaded / e.total);
                }

                var url: string = Scene_data.fileRoot + getZipMapUrl(name) + i + ".txt"
                xhrList.push(xhr);
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.send();

            }

        }
        //private curTime:number = 0;


        public isNeedReload(): boolean {
            var ary: Array<any> = this.sceneData.buildItem;
            for (var i: number = 0; i < ary.length; i++) {

                if (ary[i].type == BaseRes.PREFAB_TYPE && ary[i].lighturl) {
                    var url: string = Scene_data.fileRoot + ary[i].lighturl;
                    if (TextureManager.getInstance().hasTexture(url)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            return ((ResCount.GCTime - this.idleTime) < 10);
        }

        public loadComplete($byte: ArrayBuffer): void {
            //alert(TimeUtil.getTimer()-this.curTime);
            this._byte = new Pan3dByteArray($byte);
            this._completeFun();

            this.applyByteArray();
        }

        public applyByteArray(): void {
            this._byte.position = 0;
            this.version = this._byte.readInt()
            this.read(() => { this.readNext() });//img
        }
        // public readZipNext():void{
        //     this.read(() => { this.readNext() });//zipobj
        // }
        public readNext(): void {
            this.read();//obj
            this.read();//material
            this.read();//particle;
            this.readScene();

            this._readDataFun(this.sceneData);
        }


        public readScene(): void {

            var types: number = this._byte.readInt();
            this.readAstat();
            if (this.version >= 28) {
                this.readTerrainIdInfoBitmapData(this._byte)
            }
            var size: number = this._byte.readInt();
            this.sceneData = JSON.parse(this._byte.readUTFBytes(size));
            this.sceneData.astar = this._astarDataMesh;
            this.sceneData.terrain = this._terrainDataItem;
        }
        private _terrainDataItem: Array<GroundDataMesh>
        private readTerrainIdInfoBitmapData($byte: Pan3dByteArray): void {
            var $len: number = $byte.readInt();
            if ($len) {
                //var newByte: ByteArray = new ByteArray();
                //newByte.length = $len;
                //$byte.readBytes(newByte, 0, $len);

                var zipLen: number = $len
                var aryBuf: ArrayBuffer = $byte.buffer.slice($byte.position, $byte.position + zipLen);
                $byte.position += zipLen;
                var zipedBuf: ArrayBuffer = unZip(aryBuf)
                var newByte: Pan3dByteArray = new Pan3dByteArray(zipedBuf);

                this._terrainDataItem = GroundDataMesh.meshAllgroundData(newByte);
            }

        }
        private _astarDataMesh: AstarDataMesh
        private readAstat(): void {
            var hasAstat: boolean = this._byte.readBoolean();
            if (hasAstat) {
                this._astarDataMesh = new AstarDataMesh
                this._astarDataMesh.aPos = new Vector3D;
                this._astarDataMesh.astarItem = new Array;
                this._astarDataMesh.heightItem = new Array;
                this._astarDataMesh.jumpItem = new Array;

                this._astarDataMesh.midu = this._byte.readFloat();
                this._astarDataMesh.aPos.x = this._byte.readFloat();
                this._astarDataMesh.aPos.y = this._byte.readFloat();
                this._astarDataMesh.aPos.z = this._byte.readFloat();
                var i: number;
                var j: number;
                var tw: number = this._byte.readInt();
                var th: number = this._byte.readInt();

                this._astarDataMesh.width = tw;
                this._astarDataMesh.height = th;
                if (this.version < 25) {
                    for (i = 0; i < th; i++) {
                        var tempAstar: Array<number> = new Array
                        for (j = 0; j < tw; j++) {
                            tempAstar.push(this._byte.readFloat())
                        }
                        this._astarDataMesh.astarItem.push(tempAstar);
                    }
                    for (i = 0; i < th; i++) {
                        var tempHeightArr: Array<number> = new Array
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readFloat())
                        }
                        this._astarDataMesh.heightItem.push(tempHeightArr);
                    }
                } else {
                    var $heightScaleNum: number = this._byte.readFloat();
                    var $astrBase: Array<number> = this.readAstarFromByte(this._byte);
                    var $jumpBase: Array<number> = this.readAstarFromByte(this._byte);

                    var $astrBaseId: number = 0;
                    var $jumpBaseId: number = 0;
                    for (i = 0; i < th; i++) {
                        var tempAstar: Array<number> = new Array;
                        var tempJump: Array<number> = new Array;
                        for (j = 0; j < tw; j++) {
                            var astarNum: number = $astrBase[$astrBaseId++]
                            tempAstar.push(astarNum);
                            if (astarNum == 1) {
                                var ssss: number = $jumpBase[$jumpBaseId++]
                                tempJump.push(ssss);
                            } else {
                                tempJump.push(0);
                            }
                        }
                        this._astarDataMesh.astarItem.push(tempAstar);
                        this._astarDataMesh.jumpItem.push(tempJump);
                    }

                    this._astarDataMesh.jumpItem
                    for (i = 0; i < th; i++) {
                        var tempHeightArr: Array<number> = new Array;
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readShort() / $heightScaleNum);
                        }
                        this._astarDataMesh.heightItem.push(tempHeightArr);
                    }

                }
            }
        }
        private readAstarFromByte($byte: Pan3dByteArray): Array<number> {
            var $len: number = $byte.readUnsignedInt();
            var $intLen: number = Math.ceil($len / 32);
            var $astrBase: Array<number> = new Array
            for (var i: number = 0; i < $intLen; i++) {
                var $num: number = $byte.readUnsignedInt();
                for (var j: number = 0; j < 32; j++) {
                    var $ast: number = $num & 1;
                    if ($astrBase.length < $len) {
                        $astrBase.push($ast);
                    }
                    $num >>= 1;
                }
            }
            return $astrBase
        }
        /*
        private smoothHeight($base: number = null): void
        {
            for (var i: number = 0; i < this._astarDataMesh.heightItem.length; i++) {
                for (var j: number = 0; j < this._astarDataMesh.heightItem[i].length; j++) {
                    if (this._astarDataMesh.heightItem[i][j]==null) {
                        this._astarDataMesh.heightItem[i][j] = this.getRoundHeight(i, j, $base)
                    }
                }
            }
    
        }
        private getRoundHeight($tx: number, $ty: number,$base:number): number
        {
            var $item:Array<Vector2D>=new Array
            $item.push(new Vector2D($tx - 1, $ty - 1));
            $item.push(new Vector2D($tx, $ty - 1));
            $item.push(new Vector2D($tx + 1, $ty - 1));
    
            $item.push(new Vector2D($tx - 1, $ty));
            $item.push(new Vector2D($tx + 1, $ty));
    
            $item.push(new Vector2D($tx - 1, $ty + 1));
            $item.push(new Vector2D($tx, $ty + 1));
            $item.push(new Vector2D($tx + 1, $ty + 1));
    
            var totalNum: number = 0
            var addNum: number = 0;
            for (var i: number = 0; i < $item.length; i++) {
                var pos: Vector2D = $item[i]
                if (this._astarDataMesh.heightItem[pos.x] && this._astarDataMesh.heightItem[pos.x][pos.y]) {
                    if (this._astarDataMesh.heightItem[pos.x][pos.y]!=null) {
                        totalNum += this._astarDataMesh.heightItem[pos.x][pos.y];
                        addNum++;
                    }
                }
            }
            if (addNum > 0) {
                return totalNum / addNum;
            } else {
                return $base;
            }
      
        }
        */




    }
    class AstarDataMesh {
        public aPos: Vector3D;
        public midu: number
        public width: number
        public height: number
        public astarItem: Array<Array<number>>;
        public jumpItem: Array<Array<number>>;
        public heightItem: Array<Array<number>>;


    }
}