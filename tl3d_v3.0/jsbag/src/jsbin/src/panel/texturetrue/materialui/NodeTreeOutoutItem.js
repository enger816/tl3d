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
    var NodeTreeOutoutItem = /** @class */ (function (_super) {
        __extends(NodeTreeOutoutItem, _super);
        function NodeTreeOutoutItem() {
            var _this = _super.call(this) || this;
            _this.sunNodeItems = new Array;
            _this.inoutType = materialui.NodeTreeItem.OUT;
            return _this;
        }
        NodeTreeOutoutItem.prototype.pushSunNode = function (nodeitem) {
            this.sunNodeItems.push(nodeitem);
        };
        NodeTreeOutoutItem.prototype.removeSunNode = function (nodeitem) {
            for (var i = 0; i < this.sunNodeItems.length; i++) {
                if (this.sunNodeItems[i] == nodeitem) {
                    this.sunNodeItems.splice(i, 1);
                    break;
                }
            }
        };
        NodeTreeOutoutItem.prototype.getObj = function () {
            var obj = _super.prototype.getObj.call(this);
            var ary = new Array;
            for (var i = 0; i < this.sunNodeItems.length; i++) {
                ary.push(this.sunNodeItems[i].otherNeedObj());
            }
            obj.sunObj = ary;
            return obj;
        };
        return NodeTreeOutoutItem;
    }(materialui.NodeTreeItem));
    materialui.NodeTreeOutoutItem = NodeTreeOutoutItem;
})(materialui || (materialui = {}));
//# sourceMappingURL=NodeTreeOutoutItem.js.map