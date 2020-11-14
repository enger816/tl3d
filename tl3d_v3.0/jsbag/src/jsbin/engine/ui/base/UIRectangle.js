var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UIRectangle = /** @class */ (function (_super) {
    __extends(UIRectangle, _super);
    function UIRectangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pixelWitdh = 1;
        _this.pixelHeight = 1;
        _this.pixelX = 0;
        _this.pixelY = 0;
        _this.cellX = 0;
        _this.cellY = 0;
        _this.type = 0;
        return _this;
    }
    return UIRectangle;
}(Rectangle));
//# sourceMappingURL=UIRectangle.js.map