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
    var NodeTreePanner = /** @class */ (function (_super) {
        __extends(NodeTreePanner, _super);
        function NodeTreePanner() {
            var _this = _super.call(this) || this;
            _this.coordinateValue = new Vector2D(1, 1);
            _this.speedValue = new Vector2D(0, 0);
            return _this;
        }
        NodeTreePanner.prototype.getComponentID = function ($id) {
            var str;
            if ($id == 0) {
                str = materialui.CompileTwo.FT + this.regResultTemp.id + ".xy";
            }
            return str;
        };
        NodeTreePanner.prototype.checkInput = function () {
            return true;
        };
        return NodeTreePanner;
    }(materialui.NodeTree));
    materialui.NodeTreePanner = NodeTreePanner;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreePanner.js.map