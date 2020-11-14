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
    var ConstFloatNodeUI = /** @class */ (function (_super) {
        __extends(ConstFloatNodeUI, _super);
        function ConstFloatNodeUI() {
            var _this = _super.call(this) || this;
            _this.gap = 20;
            _this.width = 162;
            _this.height = 65;
            _this._constValue = 0;
            _this.nodeTree = new materialui.NodeTreeFloat;
            _this.nodeTree.ui = _this;
            _this.nodeTree.type = materialui.NodeTree.FLOAT;
            _this.outItem = new materialui.ItemMaterialUI("out", materialui.MaterialItemType.FLOAT, false);
            _this.addItems(_this.outItem);
            _this.drawTitleToFrame("float");
            return _this;
        }
        ConstFloatNodeUI.prototype.setData = function (obj) {
            _super.prototype.setData.call(this, obj);
            this.constValue = obj.constValue;
            this.nodeTree.constValue = this.constValue;
            this.showDynamic();
        };
        ConstFloatNodeUI.prototype.getData = function () {
            var obj = _super.prototype.getData.call(this);
            obj.constValue = this._constValue;
            return obj;
        };
        Object.defineProperty(ConstFloatNodeUI.prototype, "constValue", {
            get: function () {
                return this._constValue;
            },
            set: function (value) {
                this._constValue = value;
                this.nodeTree.constValue = value;
                this.showDynamic();
            },
            enumerable: true,
            configurable: true
        });
        ConstFloatNodeUI.prototype.showDynamic = function () {
            if (this.nodeTree.isDynamic) {
                this.drawTitleToFrame("float<" + this.nodeTree.paramName + ">(" + this.getNumStr(this._constValue) + ")");
            }
            else {
                this.drawTitleToFrame("float(" + this.getNumStr(this._constValue) + ")");
            }
        };
        ConstFloatNodeUI.prototype.getNumStr = function (num) {
            var n = Math.floor(num * 100) / 100;
            return n.toString();
        };
        return ConstFloatNodeUI;
    }(materialui.BaseMaterialNodeUI));
    materialui.ConstFloatNodeUI = ConstFloatNodeUI;
})(materialui || (materialui = {}));
//# sourceMappingURL=ConstFloatNodeUI.js.map