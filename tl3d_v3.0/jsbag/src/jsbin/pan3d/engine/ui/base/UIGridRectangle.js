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
    var UIGridRentangle = /** @class */ (function (_super) {
        __extends(UIGridRentangle, _super);
        function UIGridRentangle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ogw = 0;
            _this.ogh = 0;
            return _this;
        }
        return UIGridRentangle;
    }(Pan3d.UIRectangle));
    Pan3d.UIGridRentangle = UIGridRentangle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIGridRectangle.js.map