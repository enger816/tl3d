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
    var NodeTreeFloat = /** @class */ (function (_super) {
        __extends(NodeTreeFloat, _super);
        function NodeTreeFloat() {
            var _this = _super.call(this) || this;
            _this.canDynamic = true;
            return _this;
        }
        NodeTreeFloat.prototype.getComponentID = function ($id) {
            if ($id == 0) {
                var str = materialui.CompileTwo.FC + materialui.NodeTree.getID(this.regResultConst.id);
                if (this.regConstIndex == 0) {
                    str += ".x";
                }
                else if (this.regConstIndex == 1) {
                    str += ".y";
                }
                else if (this.regConstIndex == 2) {
                    str += ".z";
                }
                else if (this.regConstIndex == 3) {
                    str += ".w";
                }
                return str;
            }
            return null;
        };
        return NodeTreeFloat;
    }(materialui.NodeTree));
    materialui.NodeTreeFloat = NodeTreeFloat;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeFloat.js.map