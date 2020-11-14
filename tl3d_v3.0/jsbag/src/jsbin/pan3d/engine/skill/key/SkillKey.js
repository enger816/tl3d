var Pan3d;
(function (Pan3d) {
    var SkillKey = /** @class */ (function () {
        function SkillKey() {
            this.time = 0;
        }
        SkillKey.prototype.addToRender = function () {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true;
            Pan3d.ParticleManager.getInstance().addParticle(this.particle);
        };
        SkillKey.prototype.setInfo = function (obj) {
            this.time = obj.frame * Pan3d.Scene_data.frameTime;
            this.particle = Pan3d.ParticleManager.getInstance().getParticleByte(Pan3d.Scene_data.fileRoot + obj.url);
        };
        SkillKey.prototype.reset = function () {
            //this.time = 0;
            this.particle.reset();
            Pan3d.ParticleManager.getInstance().removeParticle(this.particle);
        };
        SkillKey.prototype.destory = function () {
            this.particle.destory();
            this.particle = null;
            this.removeCallFun = null;
        };
        return SkillKey;
    }());
    Pan3d.SkillKey = SkillKey;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillKey.js.map