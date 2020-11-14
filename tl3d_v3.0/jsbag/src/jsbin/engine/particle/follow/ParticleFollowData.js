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
var ParticleFollowData = /** @class */ (function (_super) {
    __extends(ParticleFollowData, _super);
    function ParticleFollowData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParticleFollowData.prototype.getParticle = function () {
        return new Display3DFollowPartilce;
    };
    ParticleFollowData.prototype.setAllByteInfo = function ($byte) {
        _super.prototype.setAllByteInfo.call(this, $byte);
        //this.initBingMatrixAry();
        this.uploadGpu();
    };
    ParticleFollowData.prototype.regShader = function () {
        if (!this.materialParam) {
            return;
        }
        var shaderParameAry = this.getShaderParam();
        //var shader: Display3DFollowShader = new Display3DFollowShader()
        this.materialParam.shader = ProgrmaManager.getInstance().getMaterialProgram(Display3DFollowShader.Display3D_Follow_Shader, Display3DFollowShader, this.materialParam.material, shaderParameAry);
        this.materialParam.program = this.materialParam.shader.program;
    };
    return ParticleFollowData;
}(ParticleBallData));
//# sourceMappingURL=ParticleFollowData.js.map