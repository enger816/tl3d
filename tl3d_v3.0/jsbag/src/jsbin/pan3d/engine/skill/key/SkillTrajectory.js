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
    var SkillTrajectory = /** @class */ (function (_super) {
        __extends(SkillTrajectory, _super);
        function SkillTrajectory() {
            var _this = _super.call(this) || this;
            _this._currentPos = new Pan3d.Vector3D;
            _this.rotationMatrix = new Pan3d.Matrix3D;
            _this._socketMaxrix = new Pan3d.Matrix3D;
            _this._currentTargetPos = new Pan3d.Vector3D;
            return _this;
            //this.path = new SkillSinPath();
            //this.path.setData(this, () => { this.applyArrive() } ,this._currentPos, this.rotationMatrix, this._currentTargetPos);
        }
        SkillTrajectory.prototype.update = function (t) {
            this.path.update(t);
        };
        SkillTrajectory.prototype.reset = function () {
            _super.prototype.reset.call(this);
            //if(false){ 
            if (this.endParticle) {
                Pan3d.ParticleManager.getInstance().addParticle(this.endParticle);
                this.endParticle.reset();
                this.endParticle.setPos(this._currentTargetPos.x, this._currentTargetPos.y, this._currentTargetPos.z);
            }
            if (this.removeCallFun) {
                this.removeCallFun(this);
            }
        };
        SkillTrajectory.prototype.endPlayFun = function (e) {
            if (e === void 0) { e = null; }
            Pan3d.ParticleManager.getInstance().removeParticle(this.endParticle);
            this.endParticle.removeEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
        };
        SkillTrajectory.prototype.setCurrentPos = function () {
            if (this.data.hitSocket) {
                var targetMovie = (this.target);
                if (targetMovie) {
                    targetMovie.getSocket(this.data.hitSocket, this._socketMaxrix);
                    this._currentTargetPos.setTo(this._socketMaxrix.position.x, this._socketMaxrix.position.y, this._socketMaxrix.position.z);
                }
                else {
                    //console.log("需要处理,特殊没有指定对象")
                }
                return true;
            }
            else {
                if (this._currentTargetPos.x == this.target.x && this._currentTargetPos.y == this.target.y && this._currentTargetPos.z == this.target.z) {
                    return false;
                }
                else {
                    this._currentTargetPos.setTo(this.target.x, this.target.y, this.target.z);
                    return true;
                }
            }
        };
        SkillTrajectory.prototype.addToRender = function () {
            _super.prototype.addToRender.call(this);
            var beginPos;
            if (this.data.beginType == 0) {
                var ma = new Pan3d.Matrix3D;
                ma.appendRotation(this.active.rotationY, Pan3d.Vector3D.Y_AXIS);
                beginPos = ma.transformVector(this.data.beginPos);
                this._currentPos.setTo(this.active.x + beginPos.x, this.active.y + beginPos.y, this.active.z + beginPos.z);
            }
            else if (this.data.beginType == 1) {
                var tempMa = new Pan3d.Matrix3D;
                var bindActive = (this.active);
                bindActive.getSocket(this.data.beginSocket, tempMa);
                beginPos = tempMa.position;
                this._currentPos.setTo(beginPos.x, beginPos.y, beginPos.z);
            }
            this.particle.setPos(this._currentPos.x, this._currentPos.y, this._currentPos.z);
            this.path.add();
        };
        SkillTrajectory.prototype.getSocket = function (socketName, resultMatrix) {
            resultMatrix.identity();
            resultMatrix.append(this.rotationMatrix);
            resultMatrix.appendTranslation(this._currentPos.x, this._currentPos.y, this._currentPos.z);
        };
        SkillTrajectory.prototype.getSunType = function () {
            return 0;
        };
        SkillTrajectory.prototype.setInfo = function (obj) {
            _super.prototype.setInfo.call(this, obj);
            this.particle.bindTarget = this;
            this.data = obj;
            //this.path.speed = this.data.speed;
            if (this.data.endParticleUrl) {
                this.endParticle = Pan3d.ParticleManager.getInstance().getParticleByte(Pan3d.Scene_data.fileRoot + this.data.endParticleUrl);
                this.endParticle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
            }
        };
        SkillTrajectory.prototype.setPlayData = function ($active, $target, $removeCallFun, types, $bloodFun) {
            var _this = this;
            if (types === void 0) { types = 0; }
            if ($bloodFun === void 0) { $bloodFun = null; }
            this.active = $active;
            this.target = $target;
            this.removeCallFun = $removeCallFun;
            this._currentPos.setTo(0, 0, 0);
            this.rotationMatrix.identity();
            this._socketMaxrix.identity();
            this._currentTargetPos.setTo(0, 0, 0);
            if (!this.path) {
                this.path = Pan3d.PathManager.getNewPath(2);
                this.path.setData(this, function () { _this.reset(); }, this._currentPos, this.rotationMatrix, this._currentTargetPos, $bloodFun);
                this.path.speed = this.data.speed;
            }
            this.path.reset();
        };
        SkillTrajectory.prototype.destory = function () {
            _super.prototype.destory.call(this);
            this.active = null;
            this.target = null;
            this.data = null;
            this._currentPos = null;
            this.rotationMatrix = null;
            this._socketMaxrix = null;
            this._currentTargetPos = null;
            this.path = null;
        };
        return SkillTrajectory;
    }(Pan3d.SkillKey));
    Pan3d.SkillTrajectory = SkillTrajectory;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillTrajectory.js.map