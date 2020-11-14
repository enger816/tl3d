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
    var NodeTreeTex = /** @class */ (function (_super) {
        __extends(NodeTreeTex, _super);
        function NodeTreeTex() {
            return _super.call(this) || this;
        }
        NodeTreeTex.prototype.checkInput = function () {
            return true;
        };
        return NodeTreeTex;
    }(materialui.NodeTree));
    materialui.NodeTreeTex = NodeTreeTex;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeTex.js.map