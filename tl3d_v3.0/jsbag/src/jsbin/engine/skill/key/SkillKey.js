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
        ParticleManager.getInstance().addParticle(this.particle);
    };
    SkillKey.prototype.setInfo = function (obj) {
        this.time = obj.frame * Scene_data.frameTime;
        this.particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + obj.url);
    };
    SkillKey.prototype.reset = function () {
        //this.time = 0;
        this.particle.reset();
        ParticleManager.getInstance().removeParticle(this.particle);
    };
    SkillKey.prototype.destory = function () {
        this.particle.destory();
        this.particle = null;
        this.removeCallFun = null;
    };
    return SkillKey;
}());
//# sourceMappingURL=SkillKey.js.map