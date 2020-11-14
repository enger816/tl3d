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
    var FresnelNodeUI = /** @class */ (function (_super) {
        __extends(FresnelNodeUI, _super);
        function FresnelNodeUI() {
            var _this = _super.call(this) || this;
            _this.gap = 20;
            _this.width = 162;
            _this.height = 65;
            _this.nodeTree = new materialui.NodeTreeFresnel;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.FRESNEL;
            _this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.FLOAT, false);
            _this.addItems(_this.outItem);
            _this.inAItem = new materialui.ItemMaterialUI("scale", materialui.MaterialItemType.FLOAT, true);
            _this.addItems(_this.inAItem);
            _this.inBItem = new materialui.ItemMaterialUI("add", materialui.MaterialItemType.FLOAT, true);
            _this.addItems(_this.inBItem);
            _this.drawTitleToFrame("Fresnel");
            return _this;
        }
        return FresnelNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.FresnelNodeUI = FresnelNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=FresnelNodeUI.js.map