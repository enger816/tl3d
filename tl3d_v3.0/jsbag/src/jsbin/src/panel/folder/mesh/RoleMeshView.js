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
    var RoleMeshView = /** @class */ (function (_super) {
        __extends(RoleMeshView, _super);
        function RoleMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RoleMeshView.prototype.getView = function () {
            var _this = this;
            var ary = [
                { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "roleurl", target: this, Category: "角色", ClikEventKey: "clikFileRole" },
                { Type: ReflectionData.MeshScene2DUI, Label: "窗口:", FunKey: "roleurl", target: this, Category: "角色" },
                { Type: ReflectionData.RoleAnim2DUI, Label: "动作:", FunKey: "animDic", changFun: function () { _this.animChange(); }, target: this, Suffix: "md5mesh", Category: "action" },
                { Type: ReflectionData.RoleMesh2DUI, Label: "mesh:", FunKey: "skinMesh", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "md5mesh", Category: "mesh" },
            ];
            return ary;
        };
        RoleMeshView.prototype.eventKey = function (value) {
            switch (value) {
                case "clikFileRole":
                    var pathurl = Pan3d.Scene_data.fileRoot + this._roleStaticMesh.url;
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""));
                    break;
                default:
                    console.log("没有对象", value);
                    break;
            }
        };
        RoleMeshView.prototype.animChange = function () {
            this.saveToSever();
            this.chuangeData();
        };
        Object.defineProperty(RoleMeshView.prototype, "animDic", {
            get: function () {
                return this._roleStaticMesh.animDic;
            },
            set: function (value) {
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "skinMesh", {
            get: function () {
                return this._roleStaticMesh.skinMesh;
            },
            set: function (value) {
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        RoleMeshView.prototype.textureChangeInfo = function (value) {
            //this._roleStaticMesh.paramInfo = value;
            this.saveToSever();
            this.chuangeData();
        };
        RoleMeshView.prototype.chuangeData = function () {
            this._roleStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
        };
        Object.defineProperty(RoleMeshView.prototype, "roleurl", {
            get: function () {
                if (this._roleStaticMesh) {
                    return this._roleStaticMesh.url;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "texture", {
            get: function () {
                return this._roleStaticMesh.material;
            },
            set: function (value) {
                this._roleStaticMesh.material = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this._roleStaticMesh = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        RoleMeshView.prototype.getChangeRoleStr = function () {
            if (this._roleStaticMesh.skinMesh) {
                var temp = this._roleStaticMesh.getObject();
                temp.version = pack.FileOssModel.version;
                var $str = JSON.stringify(temp);
                return $str;
            }
            else {
                return null;
            }
        };
        RoleMeshView.prototype.saveToSever = function () {
            var _this = this;
            this.lastTm = Pan3d.TimeUtil.getTimer();
            // this.isSaveNow = true
            if (!this.isSaveNow) {
                this.isSaveNow = true;
                this.saveTm = this.lastTm;
                var $roleStr = this.getChangeRoleStr();
                var $file = new File([$roleStr], "ossfile.txt");
                var pathUrl = Pan3d.Scene_data.fileRoot + this._roleStaticMesh.url;
                var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                console.log("提交上传ing...", pathurl);
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
                        console.log("更新角色完成", pathurl + $file.name);
                    }
                });
            }
            else {
                console.log("正在处理保存");
            }
        };
        return RoleMeshView;
    }(MetaDataView));
    filelist.RoleMeshView = RoleMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=RoleMeshView.js.map