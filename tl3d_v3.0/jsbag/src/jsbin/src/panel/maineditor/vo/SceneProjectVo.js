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
    var EventDispatcher = Pan3d.EventDispatcher;
    var SceneProjectVo = /** @class */ (function (_super) {
        __extends(SceneProjectVo, _super);
        function SceneProjectVo(value) {
            var _this = _super.call(this) || this;
            _this.scenescale = 1;
            _this.meshObj(value);
            return _this;
        }
        SceneProjectVo.prototype.meshObj = function (value) {
            var _this = this;
            for (var key in value) {
                this[key] = value[key];
            }
            if (this.textureurl) {
                pack.PackMaterialManager.getInstance().getMaterialByUrl(this.textureurl, function ($materialTree) {
                    _this.material = $materialTree;
                    _this.materialParam = new Pan3d.MaterialBaseParam;
                    _this.materialParam.material = _this.material;
                    pack.PackPrefabManager.getInstance().makeMaterialBaseParam(_this.materialParam, _this.paramInfo);
                });
            }
        };
        SceneProjectVo.prototype.getSaveObj = function () {
            var obj = {};
            if (this.material) {
                this.textureurl = this.material.url;
            }
            obj.paramInfo = this.paramInfo;
            obj.scenescale = this.scenescale;
            obj.textureurl = this.textureurl;
            obj.gildline = this.gildline;
            return obj;
        };
        return SceneProjectVo;
    }(EventDispatcher));
    maineditor.SceneProjectVo = SceneProjectVo;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=SceneProjectVo.js.map