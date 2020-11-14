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
    }(Pan3d.GC));
    Pan3d.ResCount = ResCount;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ResCount.js.map