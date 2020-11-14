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
    var NodeTreeNormal = /** @class */ (function (_super) {
        __extends(NodeTreeNormal, _super);
        function NodeTreeNormal() {
            var _this = _super.call(this) || this;
            _this.constVec3 = new Vector3D;
            return _this;
        }
        NodeTreeNormal.prototype.getComponentID = function ($id) {
            return "normalVec.xyz";
        };
        return NodeTreeNormal;
    }(materialui.NodeTree));
    materialui.NodeTreeNormal = NodeTreeNormal;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeNormal.js.map