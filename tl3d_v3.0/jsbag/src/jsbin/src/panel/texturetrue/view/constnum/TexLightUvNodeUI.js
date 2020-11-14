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
var materialui;
(function (materialui) {
    var TexLightUvNodeUI = /** @class */ (function (_super) {
        __extends(TexLightUvNodeUI, _super);
        function TexLightUvNodeUI() {
            var _this = _super.call(this) || this;
            _this.gap = 20;
            _this.width = 162;
            _this.height = 65;
            _this.nodeTree = new materialui.NodeTreeLightuv;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.TEXCOORDLIGHT;
            _this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.VEC2, false);
            _this.addItems(_this.outItem);
            _this.drawTitleToFrame("Lightuv");
            return _this;
        }
        return TexLightUvNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.TexLightUvNodeUI = TexLightUvNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=TexLightUvNodeUI.js.map