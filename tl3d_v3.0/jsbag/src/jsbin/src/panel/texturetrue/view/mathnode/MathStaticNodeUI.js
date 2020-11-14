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
    var MathStaticNodeUI = /** @class */ (function (_super) {
        __extends(MathStaticNodeUI, _super);
        function MathStaticNodeUI() {
            var _this = _super.call(this) || this;
            _this.left = 600;
            _this.top = 300;
            _this.gap = 20;
            _this.width = 162;
            _this.height = 80;
            _this.resetBgSize();
            return _this;
        }
        MathStaticNodeUI.prototype.initItem = function () {
            this.intItem = new materialui.ItemMaterialUI("in", materialui.MaterialItemType.FLOAT);
            this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.FLOAT, false);
            this.addItems(this.intItem);
            this.addItems(this.outItem);
        };
        return MathStaticNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.MathStaticNodeUI = MathStaticNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MathStaticNodeUI.js.map