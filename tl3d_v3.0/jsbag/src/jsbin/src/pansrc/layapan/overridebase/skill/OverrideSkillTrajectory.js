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
var layapan_me;
(function (layapan_me) {
    var OverrideSkillTrajectory = /** @class */ (function (_super) {
        __extends(OverrideSkillTrajectory, _super);
        function OverrideSkillTrajectory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OverrideSkillTrajectory.prototype.reset = function () {
            this.particle.reset();
            this.skill.skillManager.sceneManager.particleManager.removeParticle(this.particle);
            if (this.endParticle) {
                this.endParticle.reset();
                this.skill.skillManager.sceneManager.particleManager.addParticle(this.endParticle);
                this.endParticle.setPos(this._currentTargetPos.x, this._currentTargetPos.y, this._currentTargetPos.z);
            }
            if (this.removeCallFun) {
                this.removeCallFun(this);
            }
        };
        OverrideSkillTrajectory.prototype.addToRender = function () {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true;
            this.skill.skillManager.sceneManager.particleManager.addParticle(this.particle);
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
        OverrideSkillTrajectory.prototype.endPlayFun = function (e) {
            if (e === void 0) { e = null; }
            this.skill.skillManager.sceneManager.particleManager.removeParticle(this.endParticle);
            this.endParticle.removeEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
        };
        OverrideSkillTrajectory.prototype.setInfo = function (obj) {
            this.time = obj.frame * Pan3d.Scene_data.frameTime;
            this.particle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + obj.url);
            this.particle.bindTarget = this;
            this.data = obj;
            //this.path.speed = this.data.speed;
            if (this.data.endParticleUrl) {
                this.endParticle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + this.data.endParticleUrl);
                this.endParticle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
            }
            //this.time = obj.frame * Pan3d.Scene_data.frameTime;
            //this.particle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + obj.url);
            //this.particle.bindTarget = this;
            //this.data = <Pan3d.SkillTrajectoryTargetKeyVo>obj;
            ////this.path.speed = this.data.speed;
            //if (this.data.endParticleUrl) {
            //    this.endParticle = this.skill.skillManager.sceneManager.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + this.data.endParticleUrl);
            //    this.endParticle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
            //}
        };
        return OverrideSkillTrajectory;
    }(Pan3d.SkillTrajectory));
    layapan_me.OverrideSkillTrajectory = OverrideSkillTrajectory;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=OverrideSkillTrajectory.js.map