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
    var NodeTreeVec2 = /** @class */ (function (_super) {
        __extends(NodeTreeVec2, _super);
        function NodeTreeVec2() {
            var _this = _super.call(this) || this;
            _this.constValue = new Vector2D;
            _this.canDynamic = true;
            return _this;
        }
        NodeTreeVec2.prototype.getComponentID = function ($id) {
            if ($id == 0) {
                var str = materialui.CompileTwo.FC + materialui.NodeTree.getID(this.regResultConst.id);
                if (this.regConstIndex == 0) {
                    str += ".xy";
                }
                else if (this.regConstIndex == 1) {
                    str += ".yz";
                }
                else if (this.regConstIndex == 2) {
                    str += ".zw";
                }
                return str;
            }
            return null;
        };
        return NodeTreeVec2;
    }(materialui.NodeTree));
    materialui.NodeTreeVec2 = NodeTreeVec2;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeVec2.js.map