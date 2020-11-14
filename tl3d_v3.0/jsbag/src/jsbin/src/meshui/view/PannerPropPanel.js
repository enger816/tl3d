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
    var PannerPropPanel = /** @class */ (function (_super) {
        __extends(PannerPropPanel, _super);
        function PannerPropPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PannerPropPanel.prototype.getView = function () {
            var ary = [
                { Type: prop.ReflectionData.NumberInput, Label: "coord_x:", FunKey: "coordinateX", target: this, Step: 0.01 },
                { Type: prop.ReflectionData.NumberInput, Label: "coord_y:", FunKey: "coordinateY", target: this, Step: 0.01 },
                { Type: prop.ReflectionData.NumberInput, Label: "speed_x:", FunKey: "speedX", target: this, Step: 0.01 },
                { Type: prop.ReflectionData.NumberInput, Label: "speed_y:", FunKey: "speedY", target: this, Step: 0.01 },
            ];
            return ary;
        };
        Object.defineProperty(PannerPropPanel.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.pannerNodeUI = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PannerPropPanel.prototype, "coordinateX", {
            get: function () {
                return this.pannerNodeUI.coordinate.x;
            },
            set: function (value) {
                this.pannerNodeUI.coordinate.x = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PannerPropPanel.prototype, "coordinateY", {
            get: function () {
                return this.pannerNodeUI.coordinate.y;
            },
            set: function (value) {
                this.pannerNodeUI.coordinate.y = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PannerPropPanel.prototype, "speedX", {
            get: function () {
                return this.pannerNodeUI.speed.x;
            },
            set: function (value) {
                this.pannerNodeUI.speed.x = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PannerPropPanel.prototype, "speedY", {
            get: function () {
                return this.pannerNodeUI.speed.y;
            },
            set: function (value) {
                this.pannerNodeUI.speed.y = value;
                this.changeData();
            },
            enumerable: true,
            configurable: true
        });
        PannerPropPanel.prototype.changeData = function () {
            ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
        };
        return PannerPropPanel;
    }(prop.MetaDataView));
    prop.PannerPropPanel = PannerPropPanel;
})(prop || (prop = {}));
//# sourceMappingURL=PannerPropPanel.js.map