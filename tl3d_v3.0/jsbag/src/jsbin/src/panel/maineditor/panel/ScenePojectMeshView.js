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
var maineditor;
(function (maineditor) {
    var Vector3D = Pan3d.Vector3D;
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var ScenePojectMeshView = /** @class */ (function (_super) {
        __extends(ScenePojectMeshView, _super);
        function ScenePojectMeshView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._bgcolor = new Vector3D(11, 11, 11);
            return _this;
        }
        ScenePojectMeshView.prototype.getView = function () {
            var _this = this;
            var ary = [
                { Type: ReflectionData.TEXT, Label: "场景名字:", FunKey: "mapname", target: this, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "背景颜色:", FunKey: "bgcolor", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.ComboBox, Label: "坐标网格:", FunKey: "gridline", target: this, Category: "属性", Data: [{ name: "false", type: 0 }, { name: "true", type: 1 }] },
                { Type: ReflectionData.Vec3, Label: "坐标:", FunKey: "campos", target: this, Step: 1, Category: "镜头" },
                { Type: ReflectionData.Vec3, Label: "角度:", FunKey: "camrotation", target: this, Step: 1, Category: "镜头" },
                { Type: ReflectionData.NumberInput, Label: "比例:", FunKey: "scenescale", target: this, Step: 1, Category: "镜头" },
                { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "material", Category: "后期" },
            ];
            return ary;
        };
        Object.defineProperty(ScenePojectMeshView.prototype, "scenescale", {
            get: function () {
                return this.sceneProjectVo.scenescale;
            },
            set: function (value) {
                this.sceneProjectVo.scenescale = value;
                ScenePojectMeshView.gridLineSprite.scale = this.sceneProjectVo.scenescale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "gridline", {
            get: function () {
                if (!ScenePojectMeshView.gridLineSprite) {
                    ScenePojectMeshView.gridLineSprite = new Pan3d.GridLineSprite();
                    ScenePojectMeshView.gridLineSprite.scale = this.sceneProjectVo.scenescale;
                }
                ScenePojectMeshView.gridLineSprite.scale = 0.5;
                if (this.sceneProjectVo.gildline) {
                    maineditor.MainEditorProcessor.edItorSceneManager.addDisplay(ScenePojectMeshView.gridLineSprite, 0);
                }
                else {
                    maineditor.MainEditorProcessor.edItorSceneManager.removeDisplay(ScenePojectMeshView.gridLineSprite);
                }
                return this.sceneProjectVo.gildline ? 1 : 0;
            },
            set: function (value) {
                this.sceneProjectVo.gildline = value == 1;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        ScenePojectMeshView.prototype.textureChangeInfo = function (value) {
            this.sceneProjectVo.paramInfo = value;
            this.sceneProjectVo.materialParam = new Pan3d.MaterialBaseParam;
            this.sceneProjectVo.materialParam.material = this.sceneProjectVo.material;
            pack.PackPrefabManager.getInstance().makeMaterialBaseParam(this.sceneProjectVo.materialParam, this.sceneProjectVo.paramInfo);
        };
        //private chuangeData(): void {
        //    this.sceneProjectVo.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE))
        //}
        ScenePojectMeshView.prototype.getParamItem = function (value) {
            for (var i = 0; this.sceneProjectVo.paramInfo && i < this.sceneProjectVo.paramInfo.length; i++) {
                if (this.sceneProjectVo.paramInfo[i].paramName == value) {
                    return this.sceneProjectVo.paramInfo[i].data;
                }
            }
            return null;
        };
        Object.defineProperty(ScenePojectMeshView.prototype, "texture", {
            get: function () {
                var _this = this;
                if (this.sceneProjectVo.material) {
                    return this.sceneProjectVo.material;
                }
                else {
                    if (this.sceneProjectVo.textureurl) {
                        pack.PackMaterialManager.getInstance().getMaterialByUrl(this.sceneProjectVo.textureurl, function ($materialTree) {
                            _this.sceneProjectVo.material = $materialTree;
                            _this.refreshViewValue();
                        });
                    }
                    return null;
                }
            },
            set: function (value) {
                this.sceneProjectVo.material = value;
                this.sceneProjectVo.textureurl = this.sceneProjectVo.material.url;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "mapname", {
            get: function () {
                return AppData.mapOpenUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.sceneProjectVo = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "campos", {
            get: function () {
                return new Vector3D();
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "bgcolor", {
            get: function () {
                return this._bgcolor;
            },
            set: function (value) {
                this._bgcolor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "camrotation", {
            get: function () {
                return new Vector3D();
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        return ScenePojectMeshView;
    }(MetaDataView));
    maineditor.ScenePojectMeshView = ScenePojectMeshView;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=ScenePojectMeshView.js.map