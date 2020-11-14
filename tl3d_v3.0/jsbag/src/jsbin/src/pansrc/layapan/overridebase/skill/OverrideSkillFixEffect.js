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
    var BaseEvent = Pan3d.BaseEvent;
    var Vector3D = Pan3d.Vector3D;
    var Matrix3D = Pan3d.Matrix3D;
    var OverrideSkillFixEffect = /** @class */ (function (_super) {
        __extends(OverrideSkillFixEffect, _super);
        function OverrideSkillFixEffect($skillvo) {
            var _this = _super.call(this) || this;
            _this.skill = $skillvo;
            return _this;
        }
        OverrideSkillFixEffect.prototype.onPlayCom = function (event) {
            if (event === void 0) { event = null; }
            this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            this.skill.skillManager.sceneManager.particleManager.removeParticle(this.particle);
            this.removeCallFun(this);
        };
        OverrideSkillFixEffect.prototype.addToRender = function () {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true;
            this.skill.skillManager.sceneManager.particleManager.addParticle(this.particle);
            this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            if (this.outPos) {
                this.particle.x = this.outPos.x;
                this.particle.y = this.outPos.y;
                this.particle.z = this.outPos.z;
                this.particle.rotationX = this.rotation.x;
                this.particle.rotationY = this.rotation.y + this.active.rotationY;
                this.particle.rotationZ = this.rotation.z;
                this.particle.bindTarget = null;
            }
            else if (this.hasSocket) {
                var targetActive = this.active;
                this.particle.bindTarget = (targetActive);
                this.particle.bindSocket = this.socket;
            }
            else {
                var ma = new Matrix3D;
                ma.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
                var v3d = ma.transformVector(this.pos);
                v3d.x += this.active.x;
                v3d.y += this.active.y;
                v3d.z += this.active.z;
                var $SkillBugBind = new Pan3d.SkillBugBind();
                $SkillBugBind.bindMatrix = new Matrix3D;
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.x, Vector3D.X_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.y, Vector3D.Y_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.z, Vector3D.Z_AXIS);
                $SkillBugBind.bindMatrix.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
                $SkillBugBind.bindMatrix.appendTranslation(v3d.x, v3d.y, v3d.z);
                this.particle.bindTarget = $SkillBugBind;
            }
        };
        return OverrideSkillFixEffect;
    }(Pan3d.SkillFixEffect));
    layapan_me.OverrideSkillFixEffect = OverrideSkillFixEffect;
})(layapan_me || (layapan_me = {}));
//# sourceMappingURL=OverrideSkillFixEffect.js.map