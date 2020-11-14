var materialui;
(function (materialui) {
    var RegisterItem = /** @class */ (function () {
        function RegisterItem($id) {
            this.id = $id;
        }
        RegisterItem.prototype.getUse = function ($nodeTree) {
            var $type = $nodeTree.type;
            if ($type == materialui.NodeTree.VEC3) {
                if (!this.xUse) {
                    this.xUse = true;
                    this.yUse = true;
                    this.zUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 0;
                    return true;
                }
            }
            else if ($type == materialui.NodeTree.VEC2) {
                if (!this.xUse) {
                    this.xUse = true;
                    this.yUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 0;
                    return true;
                }
                else if (!this.yUse) {
                    this.yUse = true;
                    this.zUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 1;
                    return true;
                }
                else if (!this.zUse) {
                    this.zUse = true;
                    this.wUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 2;
                    return true;
                }
            }
            else if ($type == materialui.NodeTree.FLOAT) {
                if (!this.xUse) {
                    this.xUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 0;
                    return true;
                }
                else if (!this.yUse) {
                    this.yUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 1;
                    return true;
                }
                else if (!this.zUse) {
                    this.zUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 2;
                    return true;
                }
                else if (!this.wUse) {
                    this.wUse = true;
                    $nodeTree.regResultConst = this;
                    $nodeTree.regConstIndex = 3;
                    return true;
                }
            }
            return false;
        };
        return RegisterItem;
    }());
    materialui.RegisterItem = RegisterItem;
})(materialui || (materialui = {}));
//# sourceMappingURL=RegisterItem.js.map