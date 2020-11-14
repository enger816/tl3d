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
    var MathDivNodeUI = /** @class */ (function (_super) {
        __extends(MathDivNodeUI, _super);
        function MathDivNodeUI() {
            var _this = _super.call(this) || this;
            _this.left = 600;
            _this.top = 300;
            _this.nodeTree = new materialui.NodeTreeDiv;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.DIV;
            _this.initItem();
            _this.drawTitleToFrame("除法(Div/)");
            return _this;
        }
        return MathDivNodeUI;
    }(materialui.MathDynamicNodeUI));
    materialui.MathDivNodeUI = MathDivNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=MathDivNodeUI.js.map