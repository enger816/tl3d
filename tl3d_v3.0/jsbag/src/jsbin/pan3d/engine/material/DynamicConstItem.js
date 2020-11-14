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
var Pan3d;
(function (Pan3d) {
    var DynamicConstItem = /** @class */ (function (_super) {
        __extends(DynamicConstItem, _super);
        function DynamicConstItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DynamicConstItem.prototype.update = function (t) {
            if (t === void 0) { t = 0; }
            this.currentValue = this.curve.getValue(t);
            this.target.setDynamic(this);
            //this.target.setDynamicDirect(this.curve.getValue(t),this.targetOffset);
        };
        Object.defineProperty(DynamicConstItem.prototype, "type", {
            set: function (value) {
                this._type = value;
                this.curve = new Pan3d.Curve;
                this.curve.type = value;
            },
            enumerable: true,
            configurable: true
        });
        return DynamicConstItem;
    }(Pan3d.DynamicBaseConstItem));
    Pan3d.DynamicConstItem = DynamicConstItem;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=DynamicConstItem.js.map