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
var prop;
(function (prop) {
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var NodeTimePropPanel = /** @class */ (function (_super) {
        __extends(NodeTimePropPanel, _super);
        function NodeTimePropPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NodeTimePropPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.NumberInput, Label: "时间间隔:", FunKey: "timeInterval", target: this, Step: 0.01, Category: "属性" },
                { Type: prop.ReflectionData.NumberInput, Label: "数值比例:", FunKey: "numScale", target: this, Step: 0.01, Category: "属性" },
            ];
            return ary;
        };
        Object.defineProperty(NodeTimePropPanel.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.timeNodeUI = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeTimePropPanel.prototype, "timeInterval", {
            get: function () {
                return this.timeNodeUI.timeValue.x;
            },
            set: function (value) {
                this.timeNodeUI.timeValue.x = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeTimePropPanel.prototype, "numScale", {
            get: function () {
                return this.timeNodeUI.timeValue.y;
            },
            set: function (value) {
                this.timeNodeUI.timeValue.y = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        NodeTimePropPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return NodeTimePropPanel;
    }(prop.MetaDataView));
    prop.NodeTimePropPanel = NodeTimePropPanel;
})(prop || (prop = {}));
//# sourceMappingURL=NodeTimePropPanel.js.map