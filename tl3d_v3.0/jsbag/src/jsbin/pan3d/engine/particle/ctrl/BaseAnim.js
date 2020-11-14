var Pan3d;
(function (Pan3d) {
    var BaseAnim = /** @class */ (function () {
        function BaseAnim() {
            this.baseNum = 0;
            this.num = 0;
            this.time = 0;
            this.speed = 0;
            this.aSpeed = 0;
            this.beginTime = 0;
            this.lastTime = 0;
            this.baseTime = 0;
        }
        BaseAnim.prototype.BaseAnim = function () {
        };
        BaseAnim.prototype.update = function (t) {
            if (this._isDeath) {
                return;
            }
            this.time = t - this.baseTime;
            if (this._isActiva) {
                this.time = this.time - this.beginTime;
                if (this.time > this.lastTime) {
                    this.time = this.lastTime - this.beginTime;
                    this._isDeath = true;
                }
                this.coreCalculate();
            }
            else {
                if (this.time >= this.beginTime) {
                    if (this.time >= this.lastTime) {
                        this.time = this.lastTime - this.beginTime;
                        this.coreCalculate();
                        this._isDeath = true;
                    }
                    else {
                        this.time = this.time - this.beginTime;
                        this.coreCalculate();
                    }
                    this._isActiva = true;
                }
            }
        };
        BaseAnim.prototype.coreCalculate = function () {
            this.num = this.speed * this.time + this.aSpeed * this.time * this.time + this.baseNum;
        };
        BaseAnim.prototype.reset = function () {
            this._isActiva = false;
            this._isDeath = false;
            //time = 0;
            //baseNum = num;
            this.time = 0;
            this.num = 0;
        };
        BaseAnim.prototype.depthReset = function () {
            this._isActiva = false;
            this._isDeath = false;
            this.time = 0;
            this.baseNum = 0;
            this.num = 0;
        };
        Object.defineProperty(BaseAnim.prototype, "data", {
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseAnim.prototype, "isDeath", {
            get: function () {
                return this._isDeath;
            },
            set: function (value) {
                this._isDeath = value;
            },
            enumerable: true,
            configurable: true
        });
        BaseAnim.prototype.getAllNum = function (allTime) {
            allTime = Math.min(allTime, this.lastTime);
            allTime = allTime - this.beginTime;
            var num = this.speed * allTime + this.aSpeed * allTime * allTime;
            this.baseNum += num;
        };
        return BaseAnim;
    }());
    Pan3d.BaseAnim = BaseAnim;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=BaseAnim.js.map