var Pan3d;
(function (Pan3d) {
    var SkillPath = /** @class */ (function () {
        function SkillPath() {
            /**
            * 当前方向
            */
            this._currentDirect = new Pan3d.Vector3D;
        }
        SkillPath.prototype.update = function (t) {
            this.time = t;
            if (this.hasReached) {
                this.endTime += t;
                if (this.endTime > 200) {
                    this.applyArrive();
                }
                return;
            }
            if (this.skillTrajectory.setCurrentPos()) {
                this._currentDirect.x = this.currentTargetPos.x - this.currentPos.x;
                this._currentDirect.y = this.currentTargetPos.y - this.currentPos.y;
                this._currentDirect.z = this.currentTargetPos.z - this.currentPos.z;
                this._currentDirect.normalize();
                this._currentDirect.scaleBy(this.speed);
                this.setRotationMatrix(this.currentTargetPos.subtract(this.currentPos));
                if (this._currentDirect.length == 0) {
                    this.arrive();
                    return;
                }
            }
            var currentDistance = this._currentDirect.length * this.time;
            if (!this.hasReached) {
                var targetDistance = Pan3d.Vector3D.distance(this.currentPos, this.currentTargetPos);
                this.currentPos.x += this._currentDirect.x * this.time;
                this.currentPos.y += this._currentDirect.y * this.time;
                this.currentPos.z += this._currentDirect.z * this.time;
            }
            if (currentDistance > targetDistance) {
                this.arrive();
            }
            //this.distance += currentDistance;
        };
        SkillPath.prototype.setRotationMatrix = function ($newPos) {
            $newPos.normalize();
            var base = new Pan3d.Vector3D(0, 0, 1);
            var axis = base.cross($newPos);
            axis.normalize();
            var angle = Math.acos($newPos.dot(base));
            var qu = new Pan3d.Quaternion();
            qu.fromAxisAngle(axis, angle);
            qu.toMatrix3D(this.rotationMatrix);
        };
        SkillPath.prototype.arrive = function () {
            this.hasReached = true;
        };
        SkillPath.prototype.applyArrive = function () {
            this.endFun();
            if (this.bloodFun) {
                this.bloodFun();
            }
        };
        SkillPath.prototype.reset = function () {
            this.hasReached = false;
            this._currentDirect.setTo(0, 0, 0);
            this.endTime = 0;
        };
        SkillPath.prototype.add = function () {
        };
        SkillPath.prototype.setData = function ($skillTrajectory, $endFun, $currentPos, $rotationMatrix, $currentTargetPos, $bloodFun) {
            this.skillTrajectory = $skillTrajectory;
            this.currentPos = $currentPos;
            this.rotationMatrix = $rotationMatrix;
            this.currentTargetPos = $currentTargetPos;
            this.endFun = $endFun;
            this.bloodFun = $bloodFun;
        };
        return SkillPath;
    }());
    Pan3d.SkillPath = SkillPath;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillPath.js.map