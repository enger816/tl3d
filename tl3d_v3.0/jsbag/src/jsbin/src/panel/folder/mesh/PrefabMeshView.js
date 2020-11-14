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
var filelist;
(function (filelist) {
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var PrefabMeshView = /** @class */ (function (_super) {
        __extends(PrefabMeshView, _super);
        function PrefabMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PrefabMeshView.prototype.getView = function () {
            var _this = this;
            var ary = [
                { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "prebaburl", target: this, Category: "模型", ClikEventKey: "clikFilePrefab" },
                { Type: ReflectionData.MeshScene2DUI, Label: "窗口:", FunKey: "prebaburl", target: this, Category: "模型" },
                { Type: ReflectionData.Texturue2DUI, Label: "Objs:", FunKey: "objsurl", target: this, Suffix: "objs", Category: "网格" },
                { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "material", Category: "材质" },
            ];
            return ary;
        };
        PrefabMeshView.prototype.eventKey = function (value) {
            switch (value) {
                case "clikFilePrefab":
                    var pathurl = Pan3d.Scene_data.fileRoot + this.prefabStaticMesh.url;
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""));
                    break;
                default:
                    console.log("没有对象", value);
                    break;
            }
        };
        PrefabMeshView.prototype.textureChangeInfo = function (value) {
            this.prefabStaticMesh.paramInfo = value;
            this.saveToSever();
            this.chuangeData();
        };
        PrefabMeshView.prototype.chuangeData = function () {
            this.prefabStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
        };
        PrefabMeshView.prototype.getParamItem = function (value) {
            for (var i = 0; this.prefabStaticMesh.paramInfo && i < this.prefabStaticMesh.paramInfo.length; i++) {
                if (this.prefabStaticMesh.paramInfo[i].paramName == value) {
                    return this.prefabStaticMesh.paramInfo[i].data;
                }
            }
            return null;
        };
        Object.defineProperty(PrefabMeshView.prototype, "prebaburl", {
            get: function () {
                // return AppData.getFileName(this.prefabStaticMesh.url)
                return this.prefabStaticMesh.url;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "texture", {
            get: function () {
                return this.prefabStaticMesh.material;
            },
            set: function (value) {
                this.prefabStaticMesh.material = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "objsurl", {
            get: function () {
                return this.prefabStaticMesh.objsurl;
            },
            set: function (value) {
                this.prefabStaticMesh.objsurl = value;
                this.saveToSever();
                this.chuangeData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.prefabStaticMesh = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        PrefabMeshView.prototype.saveToSever = function () {
            var _this = this;
            this.lastTm = Pan3d.TimeUtil.getTimer();
            // this.isSaveNow = true
            if (!this.isSaveNow) {
                this.isSaveNow = true;
                this.saveTm = this.lastTm;
                var $byte = new Pan3d.Pan3dByteArray();
                var $fileUrl = Pan3d.Scene_data.fileRoot + this.prefabStaticMesh.url;
                console.log(this.prefabStaticMesh.material);
                this.prefabStaticMesh.textureurl = this.prefabStaticMesh.material.url;
                var $temp = this.prefabStaticMesh.getObject();
                $temp.version = pack.FileOssModel.version;
                $byte.writeUTF(JSON.stringify($temp));
                var $file = new File([$byte.buffer], "cc.prefab");
                var pathurl = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile($file, pathurl, function () {
                    if (_this.lastTm != _this.saveTm) {
                        console.log("不是最后一次，所以需要再存一次");
                        Pan3d.TimeUtil.addTimeOut(1000, function () {
                            _this.isSaveNow = false;
                            _this.saveToSever();
                        });
                    }
                    else {
                        _this.isSaveNow = false;
                        console.log("更新Prafab完成", pathurl + $file.name);
                    }
                });
            }
            else {
                console.log("正在处理保存");
            }
        };
        return PrefabMeshView;
    }(MetaDataView));
    filelist.PrefabMeshView = PrefabMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=PrefabMeshView.js.map