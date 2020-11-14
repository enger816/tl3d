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
    var ScaleAnim = /** @class */ (function (_super) {
        __extends(ScaleAnim, _super);
        function ScaleAnim() {
            var _this = _super.call(this) || this;
            _this.num = 1;
            return _this;
        }
        ScaleAnim.prototype.update = function (t) {
            if (this._isDeath) {
                return;
            }
            this.time = t - this.baseTime;
            if (this._isActiva) {
                this.coreCalculate();
                if (this.time > this.lastTime) {
                    this._isDeath = true;
                }
            }
            else {
                if (this.time >= this.beginTime) {
                    //this.time = this.time-this.beginTime;
                    this._isActiva = true;
                }
            }
        };
        ScaleAnim.prototype.coreCalculate = function () {
            var frameNum = float2int(this.time / Pan3d.Scene_data.frameTime);
            if (frameNum >= this.numAry.length) {
                this.num = this.numAry[this.numAry.length - 1];
            }
            else {
                this.num = this.numAry[frameNum];
            }
        };
        ScaleAnim.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.num = 1;
        };
        ScaleAnim.prototype.depthReset = function () {
            _super.prototype.depthReset.call(this);
            this.num = 1;
        };
        Object.defineProperty(ScaleAnim.prototype, "data", {
            set: function (value) {
                this.numAry = new Array;
                this.beginTime = Number(value[0].value);
                if (Number(value[1].value) == -1) {
                    this.lastTime = Pan3d.Scene_data.MAX_NUMBER;
                }
                else {
                    this.lastTime = Number(value[1].value);
                }
                this.beginScale = Number(value[2].value);
                this.scaleNum = Number(value[3].value);
                this.scaleAry = new Array;
                var addTime = 0;
                for (var i = 4; i < 4 + this.scaleNum * 2; i += 2) {
                    var obj = new Object;
                    obj.value = Number(value[i].value);
                    obj.time = Number(value[i + 1].value);
                    addTime += obj.time;
                    obj.beginTime = this.beginTime + addTime;
                    this.scaleAry.push(obj);
                }
                var frameNum;
                var btime = 0;
                var aTime = 1;
                if (this.scaleAry.length) {
                    frameNum = (this.scaleAry[this.scaleAry.length - 1].beginTime + this.scaleAry[this.scaleAry.length - 1].time) / Pan3d.Scene_data.frameTime;
                    aTime = this.scaleAry[0].beginTime;
                    this._currentTarget = this.scaleAry[0];
                }
                else {
                    frameNum = 0;
                }
                var flag = 0;
                for (i = 0; i < frameNum; i++) {
                    var ctime = Pan3d.Scene_data.frameTime * i;
                    if (ctime >= this._currentTarget.beginTime) {
                        this.beginScale = this._currentTarget.value;
                        btime = this._currentTarget.beginTime;
                        if (flag == this.scaleAry.length - 1) {
                            this._currentTarget = this.scaleAry[this.scaleAry.length - 1];
                        }
                        else {
                            flag++;
                            this._currentTarget = this.scaleAry[flag];
                        }
                        aTime = this._currentTarget.time;
                    }
                    var cNum = (ctime - btime) / aTime * (this._currentTarget.value - this.beginScale) + this.beginScale;
                    this.numAry.push(cNum);
                }
                this._currentTarget = this.scaleAry[0];
            },
            enumerable: true,
            configurable: true
        });
        ScaleAnim.prototype.dataByte = function (va, arr) {
            this.numAry = new Array;
            this.beginTime = arr[0];
            if (arr[1] == -1) {
                this.lastTime = Pan3d.Scene_data.MAX_NUMBER;
            }
            else {
                this.lastTime = arr[1];
            }
            this.beginScale = arr[2];
            this.scaleNum = arr[3];
            this.scaleAry = new Array;
            var addTime = 0;
            for (var i = 4; i < 4 + this.scaleNum * 2; i += 2) {
                var obj = new Object;
                obj.value = arr[i];
                obj.time = arr[i + 1];
                addTime += obj.time;
                obj.beginTime = this.beginTime + addTime;
                this.scaleAry.push(obj);
            }
            var frameNum;
            var btime = 0;
            var aTime = 1;
            if (this.scaleAry.length) {
                frameNum = (this.scaleAry[this.scaleAry.length - 1].beginTime + this.scaleAry[this.scaleAry.length - 1].time) / Pan3d.Scene_data.frameTime;
                aTime = this.scaleAry[0].beginTime;
                this._currentTarget = this.scaleAry[0];
            }
            else {
                frameNum = 0;
            }
            var flag = 0;
            for (i = 0; i < frameNum; i++) {
                var ctime = Pan3d.Scene_data.frameTime * i;
                if (ctime >= this._currentTarget.beginTime) {
                    this.beginScale = this._currentTarget.value;
                    btime = this._currentTarget.beginTime;
                    if (flag == this.scaleAry.length - 1) {
                        this._currentTarget = this.scaleAry[this.scaleAry.length - 1];
                    }
                    else {
                        flag++;
                        this._currentTarget = this.scaleAry[flag];
                    }
                    aTime = this._currentTarget.time;
                }
                var cNum = (ctime - btime) / aTime * (this._currentTarget.value - this.beginScale) + this.beginScale;
                this.numAry.push(cNum);
            }
            this._currentTarget = this.scaleAry[0];
        };
        ScaleAnim.prototype.getAllNum = function (allTime) {
            allTime = Math.min(allTime, this.lastTime + this.beginTime);
            var target = this.scaleAry[this.scaleAry.length - 1];
            if (allTime >= (target.beginTime + target.time)) {
                this.baseNum = target.value;
                return;
            }
            var flag;
            for (var i = 0; i < this.scaleAry.length; i++) {
                if (allTime > this.scaleAry[i].this.beginTime) {
                    this._currentTarget = this.scaleAry[i];
                    this.beginTime = this._currentTarget.this.beginTime;
                    this.beginScale = this._currentTarget.value;
                    flag = i;
                }
            }
            flag++;
            this._currentTarget = this.scaleAry[flag];
            this.baseNum = (this._currentTarget.value - this.beginScale) / this._currentTarget.this.time * (allTime - this.beginTime) + this.beginScale;
        };
        return ScaleAnim;
    }(Pan3d.BaseAnim));
    Pan3d.ScaleAnim = ScaleAnim;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ScaleAnim.js.map