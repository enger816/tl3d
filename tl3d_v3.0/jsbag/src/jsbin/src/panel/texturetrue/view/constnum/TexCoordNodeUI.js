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
    var TexCoordNodeUI = /** @class */ (function (_super) {
        __extends(TexCoordNodeUI, _super);
        function TexCoordNodeUI() {
            var _this = _super.call(this) || this;
            _this.gap = 20;
            _this.width = 162;
            _this.height = 65;
            _this.nodeTree = new materialui.NodeTreeTexCoord;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.TEXCOORD;
            _this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.VEC2, false);
            _this.addItems(_this.outItem);
            _this.drawTitleToFrame("TexCoord");
            return _this;
        }
        return TexCoordNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.TexCoordNodeUI = TexCoordNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=TexCoordNodeUI.js.map