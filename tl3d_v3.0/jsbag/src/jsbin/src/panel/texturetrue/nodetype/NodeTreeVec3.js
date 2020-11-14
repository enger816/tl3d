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
    var Vector3D = Pan3d.Vector3D;
    var NodeTreeVec3 = /** @class */ (function (_super) {
        __extends(NodeTreeVec3, _super);
        function NodeTreeVec3() {
            var _this = _super.call(this) || this;
            _this.constVec3 = new Vector3D;
            _this.canDynamic = true;
            return _this;
        }
        NodeTreeVec3.prototype.getComponentID = function ($id) {
            if ($id == 0) {
                return materialui.CompileTwo.FC + materialui.NodeTree.getID(this.regResultConst.id) + ".xyz";
            }
            else if ($id == 1) {
                return materialui.CompileTwo.FC + materialui.NodeTree.getID(this.regResultConst.id) + ".w";
            }
            else if ($id == 2) {
                return materialui.CompileTwo.FC + materialui.NodeTree.getID(this.regResultConst.id);
            }
            return null;
        };
        return NodeTreeVec3;
    }(materialui.NodeTree));
    materialui.NodeTreeVec3 = NodeTreeVec3;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeVec3.js.map