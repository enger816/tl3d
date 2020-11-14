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
    var NodeTreeTime = /** @class */ (function (_super) {
        __extends(NodeTreeTime, _super);
        function NodeTreeTime() {
            var _this = _super.call(this) || this;
            _this.speed = 1;
            _this.timeValue = new Vector2D(1, 1);
            return _this;
        }
        NodeTreeTime.prototype.getComponentID = function ($id) {
            if ($id == 0) {
                return "time";
            }
            return null;
        };
        return NodeTreeTime;
    }(materialui.NodeTree));
    materialui.NodeTreeTime = NodeTreeTime;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeTime.js.map