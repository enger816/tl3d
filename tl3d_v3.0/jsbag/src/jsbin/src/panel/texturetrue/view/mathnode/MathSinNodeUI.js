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
    var MathSinNodeUI = /** @class */ (function (_super) {
        __extends(MathSinNodeUI, _super);
        function MathSinNodeUI() {
            var _this = _super.call(this) || this;
            _this.left = 600;
            _this.top = 300;
            _this.nodeTree = new materialui.NodeTreeSin;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.SIN;
            _this.initItem();
            _this.drawTitleToFrame("正弦(sin)");
            return _this;
        }
        return MathSinNodeUI;
    }(materialui.MathStaticNodeUI));
    materialui.MathSinNodeUI = MathSinNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MathSinNodeUI.js.map