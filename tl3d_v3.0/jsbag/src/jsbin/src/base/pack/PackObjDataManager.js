var pack;
(function (pack) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var PackObjDataManager = /** @class */ (function () {
        function PackObjDataManager() {
            this.dic = {};
            this.loadDic = {};
        }
        PackObjDataManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PackObjDataManager();
            }
            return this._instance;
        };
        PackObjDataManager.prototype.getObjDataByUrl = function ($url, bfun) {
            var _this = this;
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url]);
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun];
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.XML_TYPE, function ($modelxml) {
                    var $objData = _this.readTxtToModel($modelxml);
                    if (!_this.dic[$url]) {
                        _this.dic[$url] = $objData;
                    }
                    while (_this.loadDic[$url].length) {
                        _this.loadDic[$url].pop()($objData);
                    }
                });
            }
            else {
                this.loadDic[$url].push(bfun);
            }
        };
        PackObjDataManager.prototype.readTxtToModel = function ($str) {
            var objstr = JSON.parse($str);
            var $objdata = new ObjData();
            $objdata.vertices = objstr.vertices;
            $objdata.normals = objstr.normals;
            $objdata.uvs = objstr.uvs;
            $objdata.lightuvs = objstr.lightuvs;
            $objdata.indexs = objstr.indexs;
            $objdata.treNum = $objdata.indexs.length;
            TBNUtils.processTBN($objdata);
            $objdata.vertexBuffer = Scene_data.context3D.uploadBuff3D($objdata.vertices);
            $objdata.uvBuffer = Scene_data.context3D.uploadBuff3D($objdata.uvs);
            $objdata.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objdata.lightuvs);
            $objdata.tangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.tangents);
            $objdata.bitangentBuffer = Scene_data.context3D.uploadBuff3D($objdata.bitangents);
            $objdata.normalsBuffer = Scene_data.context3D.uploadBuff3D($objdata.normals);
            $objdata.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objdata.indexs);
            return $objdata;
        };
        return PackObjDataManager;
    }());
    pack.PackObjDataManager = PackObjDataManager;
})(pack || (pack = {}));
//# sourceMappingURL=PackObjDataManager.js.map