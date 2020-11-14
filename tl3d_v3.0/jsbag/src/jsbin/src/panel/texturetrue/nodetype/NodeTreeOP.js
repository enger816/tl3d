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
    var NodeTreeOP = /** @class */ (function (_super) {
        __extends(NodeTreeOP, _super);
        function NodeTreeOP() {
            var _this = _super.call(this) || this;
            _this.writeZbuffer = true;
            return _this;
        }
        NodeTreeOP.prototype.checkInput = function () {
            return true;
        };
        return NodeTreeOP;
    }(materialui.NodeTree));
    materialui.NodeTreeOP = NodeTreeOP;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeOP.js.map