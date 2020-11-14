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
    var FileMeshView = /** @class */ (function (_super) {
        __extends(FileMeshView, _super);
        function FileMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FileMeshView.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "fileUrl", target: this, Category: "模型", ClikEventKey: "clikFilePrefab" },
                { Type: ReflectionData.MeshScene2DUI, Label: "窗口:", FunKey: "fileUrl", target: this, Category: "模型" },
            ];
            return ary;
        };
        FileMeshView.prototype.eventKey = function (value) {
            switch (value) {
                case "clikFilePrefab":
                    var pathurl = Pan3d.Scene_data.fileRoot + this.fileUrl;
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), pathurl.replace(Pan3d.Scene_data.ossRoot, ""));
                    break;
                default:
                    console.log("没有对象", value);
                    break;
            }
        };
        Object.defineProperty(FileMeshView.prototype, "fileUrl", {
            get: function () {
                return this.data;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        return FileMeshView;
    }(MetaDataView));
    filelist.FileMeshView = FileMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=FileMeshView.js.map