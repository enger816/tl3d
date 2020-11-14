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
    var SceneRes = /** @class */ (function (_super) {
        __extends(SceneRes, _super);
        function SceneRes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneRes.prototype.load = function ($url, $completeFun, $progressFun, $readDataFun) {
            var _this = this;
            if (this.sceneData) {
                if (this.isNeedReload()) {
                    $completeFun();
                    $progressFun(1);
                    this.applyByteArray();
                }
                else {
                    $completeFun();
                    $progressFun(1);
                    $readDataFun(this.sceneData);
                }
                return;
            }
            this._completeFun = $completeFun;
            this._readDataFun = $readDataFun;
            this._progressFun = $progressFun;
            var config = SceneRes.sceneConfigData;
            //config[$url] = null;
            if (config && config[$url]) {
                ////console.log($url)
                this.loadZipMap($url, config[$url].len);
            }
            else {
                $url = Pan3d.Scene_data.fileRoot + getMapUrl($url);
                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
                    _this.loadComplete($byte);
                    //this.unZip($byte);
                }, null, $progressFun);
            }
        };
        SceneRes.prototype.loadZipMap = function (name, size) {
            var _this = this;
            var xhrList = new Array;
            var aryBufList = new Array;
            var comNum = 0;
            var proList = new Array;
            for (var i = 0; i < size; i++) {
                proList[i] = 0;
            }
            var comFun = function ($curxhr) {
                var arybuf = $curxhr.response;
                var idx = xhrList.indexOf($curxhr);
                aryBufList[idx] = arybuf;
                comNum++;
                if (comNum == xhrList.length) { //加载完成
                    var bufSize = 0;
                    for (var i = 0; i < aryBufList.length; i++) {
                        bufSize += aryBufList[i].byteLength;
                    }
                    var newBuf = new Uint8Array(bufSize);
                    var flag = 0;
                    for (var i = 0; i < aryBufList.length; i++) {
                        newBuf.set(new Uint8Array(aryBufList[i]), flag);
                        flag += aryBufList[i].byteLength;
                    }
                    _this.loadComplete(newBuf.buffer);
                    //this.unZip(newBuf.buffer);
                }
            };
            var proFun = function ($curxhr, num) {
                var idx = xhrList.indexOf($curxhr);
                proList[idx] = num;
                var allPre = 0;
                for (var i = 0; i < size; i++) {
                    allPre += proList[i];
                }
                allPre = allPre / size;
                ////console.log("--------地图加载@：",idx,num,allPre);
                _this._progressFun(allPre);
            };
            for (var i = 0; i < size; i++) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function (e) {
                    var curXhr = e.target;
                    if (curXhr.status == 200 && curXhr.readyState == 4) {
                        comFun(curXhr);
                    }
                };
                xhr.onprogress = function (e) {
                    var curXhr = e.target;
                    ////console.log("++++++++地图加载@：",e,e.loaded,e.total);
                    proFun(curXhr, e.loaded / e.total);
                };
                var url = Pan3d.Scene_data.fileRoot + getZipMapUrl(name) + i + ".txt";
                xhrList.push(xhr);
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.send();
            }
        };
        //private curTime:number = 0;
        SceneRes.prototype.isNeedReload = function () {
            var ary = this.sceneData.buildItem;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].type == Pan3d.BaseRes.PREFAB_TYPE && ary[i].lighturl) {
                    var url = Pan3d.Scene_data.fileRoot + ary[i].lighturl;
                    if (Pan3d.TextureManager.getInstance().hasTexture(url)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            return ((Pan3d.ResCount.GCTime - this.idleTime) < 10);
        };
        SceneRes.prototype.loadComplete = function ($byte) {
            //alert(TimeUtil.getTimer()-this.curTime);
            this._byte = new Pan3d.Pan3dByteArray($byte);
            this._completeFun && this._completeFun();
            this.applyByteArray();
        };
        SceneRes.prototype.applyByteArray = function () {
            var _this = this;
            this._byte.position = 0;
            this.version = this._byte.readInt();
            this.read(function () { _this.readNext(); }); //img
        };
        // public readZipNext():void{
        //     this.read(() => { this.readNext() });//zipobj
        // }
        SceneRes.prototype.readNext = function () {
            this.read(); //obj
            this.read(); //material
            this.read(); //particle;
            this.readScene();
            this._readDataFun && this._readDataFun(this.sceneData);
        };
        SceneRes.prototype.readScene = function () {
            var types = this._byte.readInt();
            this.readAstat();
            if (this.version >= 28) {
                this.readTerrainIdInfoBitmapData(this._byte);
            }
            var size = this._byte.readInt();
            this.sceneData = JSON.parse(this._byte.readUTFBytes(size));
            this.sceneData.astar = this._astarDataMesh;
            this.sceneData.terrain = this._terrainDataItem;
        };
        SceneRes.prototype.readTerrainIdInfoBitmapData = function ($byte) {
            var $len = $byte.readInt();
            if ($len) {
                //var newByte: ByteArray = new ByteArray();
                //newByte.length = $len;
                //$byte.readBytes(newByte, 0, $len);
                var zipLen = $len;
                var aryBuf = $byte.buffer.slice($byte.position, $byte.position + zipLen);
                $byte.position += zipLen;
                var zipedBuf = unZip(aryBuf);
                var newByte = new Pan3d.Pan3dByteArray(zipedBuf);
                this._terrainDataItem = Pan3d.GroundDataMesh.meshAllgroundData(newByte);
            }
        };
        SceneRes.prototype.readAstat = function () {
            var hasAstat = this._byte.readBoolean();
            if (hasAstat) {
                this._astarDataMesh = new AstarDataMesh;
                this._astarDataMesh.aPos = new Pan3d.Vector3D;
                this._astarDataMesh.astarItem = new Array;
                this._astarDataMesh.heightItem = new Array;
                this._astarDataMesh.jumpItem = new Array;
                this._astarDataMesh.midu = this._byte.readFloat();
                this._astarDataMesh.aPos.x = this._byte.readFloat();
                this._astarDataMesh.aPos.y = this._byte.readFloat();
                this._astarDataMesh.aPos.z = this._byte.readFloat();
                var i;
                var j;
                var tw = this._byte.readInt();
                var th = this._byte.readInt();
                this._astarDataMesh.width = tw;
                this._astarDataMesh.height = th;
                if (this.version < 25) {
                    for (i = 0; i < th; i++) {
                        var tempAstar = new Array;
                        for (j = 0; j < tw; j++) {
                            tempAstar.push(this._byte.readFloat());
                        }
                        this._astarDataMesh.astarItem.push(tempAstar);
                    }
                    for (i = 0; i < th; i++) {
                        var tempHeightArr = new Array;
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readFloat());
                        }
                        this._astarDataMesh.heightItem.push(tempHeightArr);
                    }
                }
                else {
                    var $heightScaleNum = this._byte.readFloat();
                    var $astrBase = this.readAstarFromByte(this._byte);
                    var $jumpBase = this.readAstarFromByte(this._byte);
                    var $astrBaseId = 0;
                    var $jumpBaseId = 0;
                    for (i = 0; i < th; i++) {
                        var tempAstar = new Array;
                        var tempJump = new Array;
                        for (j = 0; j < tw; j++) {
                            var astarNum = $astrBase[$astrBaseId++];
                            tempAstar.push(astarNum);
                            if (astarNum == 1) {
                                var ssss = $jumpBase[$jumpBaseId++];
                                tempJump.push(ssss);
                            }
                            else {
                                tempJump.push(0);
                            }
                        }
                        this._astarDataMesh.astarItem.push(tempAstar);
                        this._astarDataMesh.jumpItem.push(tempJump);
                    }
                    this._astarDataMesh.jumpItem;
                    for (i = 0; i < th; i++) {
                        var tempHeightArr = new Array;
                        for (j = 0; j < tw; j++) {
                            tempHeightArr.push(this._byte.readShort() / $heightScaleNum);
                        }
                        this._astarDataMesh.heightItem.push(tempHeightArr);
                    }
                }
            }
        };
        SceneRes.prototype.readAstarFromByte = function ($byte) {
            var $len = $byte.readUnsignedInt();
            var $intLen = Math.ceil($len / 32);
            var $astrBase = new Array;
            for (var i = 0; i < $intLen; i++) {
                var $num = $byte.readUnsignedInt();
                for (var j = 0; j < 32; j++) {
                    var $ast = $num & 1;
                    if ($astrBase.length < $len) {
                        $astrBase.push($ast);
                    }
                    $num >>= 1;
                }
            }
            return $astrBase;
        };
        return SceneRes;
    }(Pan3d.BaseRes));
    Pan3d.SceneRes = SceneRes;
    var AstarDataMesh = /** @class */ (function () {
        function AstarDataMesh() {
        }
        return AstarDataMesh;
    }());
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SceneRes.js.map