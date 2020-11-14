var materialui;
(function (materialui) {
    var NodeTreeItem = /** @class */ (function () {
        function NodeTreeItem() {
        }
        NodeTreeItem.prototype.getObj = function () {
            var obj = new Object;
            obj.inoutType = this.inoutType;
            obj.id = this.id;
            obj.type = this.type;
            return obj;
        };
        NodeTreeItem.prototype.otherNeedObj = function () {
            var obj = new Object;
            obj.id = this.id;
            obj.inoutType = this.inoutType;
            obj.pid = this.node.id;
            return obj;
        };
        NodeTreeItem.IN = "in";
        NodeTreeItem.OUT = "out";
        return NodeTreeItem;
    }());
    materialui.NodeTreeItem = NodeTreeItem;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeItem.js.map