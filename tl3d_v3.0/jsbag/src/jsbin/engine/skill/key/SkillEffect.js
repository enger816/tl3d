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
var SkillEffect = /** @class */ (function (_super) {
    __extends(SkillEffect, _super);
    function SkillEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillEffect.prototype.addToRender = function () {
        _super.prototype.addToRender.call(this);
        this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
    };
    SkillEffect.prototype.onPlayCom = function (event) {
        if (event === void 0) { event = null; }
        this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
        ParticleManager.getInstance().removeParticle(this.particle);
        this.removeCallFun(this);
    };
    return SkillEffect;
}(SkillKey));
//# sourceMappingURL=SkillEffect.js.map