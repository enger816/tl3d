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
var SkillSinPath = /** @class */ (function (_super) {
    __extends(SkillSinPath, _super);
    function SkillSinPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.basePos = new Vector3D;
        return _this;
    }
    SkillSinPath.prototype.add = function () {
        this.skillTrajectory.setCurrentPos();
        var v3d = new Vector3D();
        v3d.x = this.currentTargetPos.x - this.currentPos.x;
        v3d.y = this.currentTargetPos.y - this.currentPos.y;
        v3d.z = this.currentTargetPos.z - this.currentPos.z;
        this.basePos.setTo(this.currentPos.x, this.currentPos.y, this.currentPos.z);
        this.alltime = v3d.length / this.speed;
    };
    SkillSinPath.prototype.update = function (t) {
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
        var ypos = (this.lastTime / this.alltime);
        if (ypos > 1) {
            ypos = 1;
        }
        //ypos = ypos - ypos * ypos;   
        //ypos *= 150; 
        var offsetv3d = this.getOffset(ypos);
        this._currentDirect.x = this.currentTargetPos.x - this.basePos.x;
        this._currentDirect.y = this.currentTargetPos.y - this.basePos.y;
        this._currentDirect.z = this.currentTargetPos.z - this.basePos.z;
        this._currentDirect.normalize();
        this._currentDirect.scaleBy(this.speed);
        this.setRotationMatrix(this.currentTargetPos.subtract(this.basePos));
        if (this._currentDirect.length == 0) {
            this.arrive();
            return;
        }
        var currentDistance = this._currentDirect.length * this.time;
        if (!this.hasReached) {
            var targetDistance = Vector3D.distance(this.basePos, this.currentTargetPos);
            this.basePos.x += this._currentDirect.x * this.time;
            this.basePos.y += this._currentDirect.y * this.time;
            this.basePos.z += this._currentDirect.z * this.time;
            // this.currentPos.x = this.basePos.x + ypos;
            // this.currentPos.y = this.basePos.y;
            // this.currentPos.z = this.basePos.z;
            this.setApplyPos(offsetv3d);
        }
        if (currentDistance > targetDistance) {
            this.arrive();
        }
        //this.distance += currentDistance;
    };
    SkillSinPath.prototype.setApplyPos = function ($offset) {
        this.currentPos.x = this.basePos.x + $offset.x;
        this.currentPos.y = this.basePos.y + $offset.y;
        this.currentPos.z = this.basePos.z + $offset.z;
    };
    SkillSinPath.prototype.getOffset = function (ypos) {
        ypos = Math.sin(ypos * Math.PI) * 100;
        var offsetv3d = this._currentDirect.cross(new Vector3D(0, 1, 0));
        offsetv3d.scaleBy(ypos);
        return offsetv3d;
    };
    SkillSinPath.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.lastTime = 0;
    };
    return SkillSinPath;
}(SkillPath));
var SkillCosPath = /** @class */ (function (_super) {
    __extends(SkillCosPath, _super);
    function SkillCosPath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillCosPath.prototype.getOffset = function (ypos) {
        ypos = (ypos - ypos * ypos) * 300; //Math.sin(ypos * Math.PI) * 100;
        var offsetv3d = this._currentDirect.cross(new Vector3D(0, -1, 0));
        offsetv3d.scaleBy(ypos);
        return offsetv3d;
    };
    return SkillCosPath;
}(SkillSinPath));
//# sourceMappingURL=SkillSinPath.js.map