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
    var NodeTreeDynamic = /** @class */ (function (_super) {
        __extends(NodeTreeDynamic, _super);
        function NodeTreeDynamic() {
            return _super.call(this) || this;
        }
        NodeTreeDynamic.prototype.getComponentID = function ($id) {
            var output = this.outputVec[0];
            if ($id == 0) {
                if (output.type == materialui.MaterialItemType.VEC4) {
                    return materialui.CompileTwo.FT + this.regResultTemp.id;
                }
                else if (output.type == materialui.MaterialItemType.VEC3) {
                    return materialui.CompileTwo.FT + this.regResultTemp.id + ".xyz";
                }
                else if (output.type == materialui.MaterialItemType.VEC2) {
                    return materialui.CompileTwo.FT + this.regResultTemp.id + ".xy";
                }
                else if (output.type == materialui.MaterialItemType.FLOAT) {
                    return materialui.CompileTwo.FT + this.regResultTemp.id + ".x";
                }
            }
            else if ($id == 1) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".x";
            }
            else if ($id == 2) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".y";
            }
            else if ($id == 3) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".z";
            }
            else if ($id == 4) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".xy";
            }
            else if ($id == 5) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".xyz";
            }
            else if ($id == 6) {
                return materialui.CompileTwo.FT + this.regResultTemp.id + ".w";
            }
            return null;
        };
        return NodeTreeDynamic;
    }(materialui.NodeTree));
    materialui.NodeTreeDynamic = NodeTreeDynamic;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeDynamic.js.map