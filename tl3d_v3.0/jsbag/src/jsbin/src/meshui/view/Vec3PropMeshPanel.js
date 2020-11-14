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
    var Vec3PropMeshPanel = /** @class */ (function (_super) {
        __extends(Vec3PropMeshPanel, _super);
        function Vec3PropMeshPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Vec3PropMeshPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.Vec3Color, Label: "Vec3d:", FunKey: "constValue", target: this, Step: 0.1, Category: "属性" },
            ];
            return ary;
        };
        Object.defineProperty(Vec3PropMeshPanel.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.constVec3NodeUI = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec3PropMeshPanel.prototype, "constValue", {
            get: function () {
                return this.constVec3NodeUI.constValue;
            },
            set: function (value) {
                this.constVec3NodeUI.constValue = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        Vec3PropMeshPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return Vec3PropMeshPanel;
    }(prop.MetaDataView));
    prop.Vec3PropMeshPanel = Vec3PropMeshPanel;
})(prop || (prop = {}));
//# sourceMappingURL=Vec3PropMeshPanel.js.map