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
    var ScaleChange = /** @class */ (function (_super) {
        __extends(ScaleChange, _super);
        function ScaleChange() {
            var _this = _super.call(this) || this;
            _this.num = 1;
            return _this;
        }
        ScaleChange.prototype.coreCalculate = function () {
            this.num = 1 + this.speed * this.time + this.baseNum;
            if (this.num < this.minNum) {
                this.num = this.minNum;
            }
            else if (this.num > this.maxNum) {
                this.num = this.maxNum;
            }
        };
        Object.defineProperty(ScaleChange.prototype, "data", {
            /**
             *
             * @param value
             *
             */
            set: function (value) {
                this.beginTime = Number(value[0].value);
                if (Number(value[1].value) == -1) {
                    this.lastTime = Pan3d.Scene_data.MAX_NUMBER;
                }
                else {
                    this.lastTime = Number(value[1].value);
                }
                this.speed = Number(value[2].value) * 0.001;
                this.minNum = Number(value[3].value) * 0.01;
                this.maxNum = Number(value[4].value) * 0.01;
            },
            enumerable: true,
            configurable: true
        });
        ScaleChange.prototype.dataByte = function (va, arr) {
            this.beginTime = arr[0];
            if (arr[1] == -1) {
                this.lastTime = Pan3d.Scene_data.MAX_NUMBER;
            }
            else {
                this.lastTime = arr[1];
            }
            this.speed = arr[2] * 0.001;
            this.minNum = arr[3] * 0.01;
            this.maxNum = arr[4] * 0.01;
        };
        ScaleChange.prototype.getAllNum = function (allTime) {
            allTime = Math.min(allTime, this.lastTime);
            allTime = allTime - this.beginTime;
            var num = this.speed * allTime;
            this.baseNum += num;
            if (this.baseNum < this.minNum) {
                this.baseNum = this.minNum;
            }
            else if (num > this.maxNum) {
                this.baseNum = this.maxNum;
            }
        };
        ScaleChange.prototype.reset = function () {
            this._isActiva = false;
            this._isDeath = false;
            this.time = 0;
            this.num = 1;
        };
        ScaleChange.prototype.depthReset = function () {
            this._isActiva = false;
            this._isDeath = false;
            this.time = 0;
            this.baseNum = 0;
            this.num = 1;
        };
        return ScaleChange;
    }(Pan3d.BaseAnim));
    Pan3d.ScaleChange = ScaleChange;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ScaleChange.js.map