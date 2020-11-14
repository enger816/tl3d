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
    var MathMulNodeUI = /** @class */ (function (_super) {
        __extends(MathMulNodeUI, _super);
        function MathMulNodeUI() {
            var _this = _super.call(this) || this;
            _this.left = 600;
            _this.top = 300;
            _this.nodeTree = new materialui.NodeTreeMul;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.MUL;
            _this.initItem();
            _this.drawTitleToFrame("乘法(Mul*)");
            return _this;
        }
        return MathMulNodeUI;
    }(materialui.MathDynamicNodeUI));
    materialui.MathMulNodeUI = MathMulNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MathMulNodeUI.js.map