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
    var NodeTreeInputItem = /** @class */ (function (_super) {
        __extends(NodeTreeInputItem, _super);
        function NodeTreeInputItem() {
            return _super.call(this) || this;
        }
        Object.defineProperty(NodeTreeInputItem.prototype, "parentNodeItem", {
            get: function () {
                return this._parentNodeItem;
            },
            set: function (value) {
                this._parentNodeItem = value;
            },
            enumerable: true,
            configurable: true
        });
        NodeTreeInputItem.prototype.getObj = function () {
            var obj = _super.prototype.getObj.call(this);
            obj.parentObj = this.parentNodeItem ? this.parentNodeItem.otherNeedObj() : null;
            return obj;
        };
        return NodeTreeInputItem;
    }(materialui.NodeTreeItem));
    materialui.NodeTreeInputItem = NodeTreeInputItem;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeInputItem.js.map