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
    var NodeTreeFresnel = /** @class */ (function (_super) {
        __extends(NodeTreeFresnel, _super);
        function NodeTreeFresnel() {
            return _super.call(this) || this;
        }
        NodeTreeFresnel.prototype.getComponentID = function ($id) {
            if ($id == 0) {
                var str = materialui.CompileTwo.FT + this.regResultTemp.id + ".x";
                return str;
            }
            return null;
        };
        return NodeTreeFresnel;
    }(materialui.NodeTree));
    materialui.NodeTreeFresnel = NodeTreeFresnel;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeFresnel.js.map