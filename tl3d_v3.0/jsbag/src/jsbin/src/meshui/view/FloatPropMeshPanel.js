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
    var FloatPropMeshPanel = /** @class */ (function (_super) {
        __extends(FloatPropMeshPanel, _super);
        function FloatPropMeshPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FloatPropMeshPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.NumberInput, Label: "值:", FunKey: "constValue", target: this, Step: 0.01, Category: "属性" },
            ];
            return ary;
        };
        Object.defineProperty(FloatPropMeshPanel.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.constFloatNodeUI = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FloatPropMeshPanel.prototype, "constValue", {
            get: function () {
                return this.constFloatNodeUI.constValue;
            },
            set: function (value) {
                this.constFloatNodeUI.constValue = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        FloatPropMeshPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return FloatPropMeshPanel;
    }(prop.MetaDataView));
    prop.FloatPropMeshPanel = FloatPropMeshPanel;
})(prop || (prop = {}));
//# sourceMappingURL=FloatPropMeshPanel.js.map