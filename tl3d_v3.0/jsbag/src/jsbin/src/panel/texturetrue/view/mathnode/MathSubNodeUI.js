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
    var MathSubNodeUI = /** @class */ (function (_super) {
        __extends(MathSubNodeUI, _super);
        function MathSubNodeUI() {
            var _this = _super.call(this) || this;
            _this.left = 600;
            _this.top = 300;
            _this.nodeTree = new materialui.NodeTreeSub;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.SUB;
            _this.initItem();
            _this.drawTitleToFrame("减法(Sub-)");
            return _this;
        }
        return MathSubNodeUI;
    }(materialui.MathDynamicNodeUI));
    materialui.MathSubNodeUI = MathSubNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MathSubNodeUI.js.map