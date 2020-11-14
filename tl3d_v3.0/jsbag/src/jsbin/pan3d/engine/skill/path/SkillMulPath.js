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
    var SkillMulPath = /** @class */ (function (_super) {
        __extends(SkillMulPath, _super);
        function SkillMulPath() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastTime = 0;
            return _this;
        }
        SkillMulPath.prototype.setInitCurrentPos = function (ary) {
            this.currentPosAry = ary;
            this.allTimeList = new Array;
            for (var i = 0; i < ary.length; i++) {
                this.allTimeList.push(0);
            }
        };
        SkillMulPath.prototype.add = function () {
            this.skillTrajectory.setCurrentPos();
            this.directAry = new Array;
            var maxLenght = 0;
            for (var i = 0; i < this.currentPosAry.length; i++) {
                var v3d = new Pan3d.Vector3D();
                v3d.x = this.currentTargetPos.x - this.currentPosAry[i].x;
                v3d.y = this.currentTargetPos.y - this.currentPosAry[i].y;
                v3d.z = this.currentTargetPos.z - this.currentPosAry[i].z;
                var le = v3d.length;
                if (le > maxLenght) {
                    maxLenght = le;
                    this.maxV3d = this.currentPosAry[i];
                }
                this.allTimeList[i] = le / this.speed;
                v3d.normalize();
                v3d.scaleBy(this.speed);
                this.directAry.push(v3d);
            }
            this.alltime = maxLenght / this.speed;
            this.setAllData();
        };
        SkillMulPath.prototype.setAllData = function () {
            var frame = float2int(this.alltime / 33) + 8;
            this.resultAry = new Array;
            for (var i = 0; i < this.currentPosAry.length; i++) {
                var itemAry = new Array;
                this.resultAry.push(itemAry);
                var directV3d = this.directAry[i];
                for (var k = 0; k < 6; k++) {
                    itemAry.push([this.currentPosAry[i].x, this.currentPosAry[i].y, this.currentPosAry[i].z]);
                }
                for (var j = 0; j < frame; j++) {
                    this.lastTime = 33 * j;
                    var per = (this.lastTime / this.allTimeList[i]);
                    var ypos = per;
                    var pos;
                    if (per >= 1) {
                        ypos = 0;
                        pos = [this.currentTargetPos.x, this.currentTargetPos.y, this.currentTargetPos.z];
                    }
                    else {
                        ypos = ypos - ypos * ypos;
                        ypos *= 250;
                        pos = [directV3d.x * this.lastTime + this.currentPosAry[i].x, directV3d.y * this.lastTime + ypos + this.currentPosAry[i].y, directV3d.z * this.lastTime + this.currentPosAry[i].z];
                    }
                    var normal;
                    if (j == 0) {
                        normal = [0, 1, 0];
                    }
                    else {
                        var lastpos = itemAry[j * 2 - 2];
                        normal = [pos[0] - lastpos[0], pos[1] - lastpos[1], pos[2] - lastpos[2]];
                        var len = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
                        normal[0] /= len;
                        normal[1] /= len;
                        normal[2] /= len;
                    }
                    itemAry.push(pos, normal);
                }
            }
        };
        SkillMulPath.prototype.update = function (t) {
            this.time = t;
            this.lastTime += t;
            if (this.hasReached) {
                this.endTime += t;
                if (this.endTime > 200) {
                    this.applyArrive();
                }
                return;
            }
            this.skillTrajectory.setCurrentPos();
            for (var i = 0; i < this.currentPosAry.length; i++) {
                var ypos = (this.lastTime / this.allTimeList[i]);
                ypos = ypos - ypos * ypos;
                ypos *= 250;
                var basePos = this.currentPosAry[i];
                this._currentDirect.x = this.currentTargetPos.x - basePos.x;
                this._currentDirect.y = this.currentTargetPos.y - basePos.y;
                this._currentDirect.z = this.currentTargetPos.z - basePos.z;
                this._currentDirect.normalize();
                this._currentDirect.scaleBy(this.speed);
                if (this.maxV3d == basePos) {
                    this.setRotationMatrix(this.currentTargetPos.subtract(basePos));
                    if (this._currentDirect.length == 0) {
                        this.arrive();
                        return;
                    }
                }
                var currentDistance = this._currentDirect.length * this.time;
                if (!this.hasReached) {
                    var targetDistance = Pan3d.Vector3D.distance(basePos, this.currentTargetPos);
                    basePos.x += this._currentDirect.x * this.time;
                    basePos.y += this._currentDirect.y * this.time;
                    basePos.z += this._currentDirect.z * this.time;
                    basePos.w = ypos;
                }
                if (this.maxV3d == basePos) {
                    if (currentDistance > targetDistance) {
                        this.arrive();
                    }
                }
            }
            this.currentPos.setTo(this.currentPosAry[0].x, this.currentPosAry[0].y + this.currentPosAry[0].w, this.currentPosAry[0].z);
        };
        SkillMulPath.prototype.setData = function ($skillTrajectory, $endFun, $currentPos, $rotationMatrix, $currentTargetPos) {
            _super.prototype.setData.call(this, $skillTrajectory, $endFun, $currentPos, $rotationMatrix, $currentTargetPos, null);
            this.skillMul = $skillTrajectory;
        };
        SkillMulPath.prototype.applyData = function (ary) {
            for (var i = 0; i < ary.length; i++) {
                ary[i].setTo(this.currentPosAry[i].x, this.currentPosAry[i].y + this.currentPosAry[i].w, this.currentPosAry[i].z);
            }
        };
        SkillMulPath.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.lastTime = 0;
        };
        return SkillMulPath;
    }(Pan3d.SkillPath));
    Pan3d.SkillMulPath = SkillMulPath;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillMulPath.js.map