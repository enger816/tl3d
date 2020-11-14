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
    var Vec2PropMeshPanel = /** @class */ (function (_super) {
        __extends(Vec2PropMeshPanel, _super);
        function Vec2PropMeshPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Vec2PropMeshPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.Vec2, Label: "xy:", FunKey: "vec2data", target: this, Step: 0.1, Category: "属性" },
            ];
            return ary;
        };
        Object.defineProperty(Vec2PropMeshPanel.prototype, "vec2data", {
            get: function () {
                return this.constVec2NodeUI.constValue;
            },
            set: function (value) {
                this.constVec2NodeUI.constValue = value;
                this.changeData();
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vec2PropMeshPanel.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.constVec2NodeUI = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Vec2PropMeshPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return Vec2PropMeshPanel;
    }(prop.MetaDataView));
    prop.Vec2PropMeshPanel = Vec2PropMeshPanel;
})(prop || (prop = {}));
//# sourceMappingURL=Vec2PropMeshPanel.js.map