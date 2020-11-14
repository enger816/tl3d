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
    var Vector2D = Pan3d.Vector2D;
    var NodeTreeTexCoord = /** @class */ (function (_super) {
        __extends(NodeTreeTexCoord, _super);
        function NodeTreeTexCoord() {
            var _this = _super.call(this) || this;
            _this.constValue = new Vector2D;
            _this.canDynamic = true;
            return _this;
        }
        NodeTreeTexCoord.prototype.getComponentID = function ($id) {
            if ($id == 0) {
                return "uvpos.xy";
            }
            return null;
        };
        return NodeTreeTexCoord;
    }(materialui.NodeTree));
    materialui.NodeTreeTexCoord = NodeTreeTexCoord;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeTexCoord.js.map