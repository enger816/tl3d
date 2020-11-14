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
var ResCount = /** @class */ (function (_super) {
    __extends(ResCount, _super);
    function ResCount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._useNum = 0;
        _this.idleTime = 0;
        return _this;
    }
    Object.defineProperty(ResCount.prototype, "useNum", {
        get: function () {
            return this._useNum;
        },
        set: function (n) {
            this._useNum = n;
            if (this._useNum == 0) {
                this.idleTime = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    ResCount.prototype.clearUseNum = function () {
        this._useNum--;
        if (this._useNum <= 0) {
            this.idleTime = ResCount.GCTime;
        }
    };
    ResCount.GCTime = 4;
    return ResCount;
}(GC));
//# sourceMappingURL=ResCount.js.map