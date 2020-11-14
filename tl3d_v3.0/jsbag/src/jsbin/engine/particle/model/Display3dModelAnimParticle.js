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
var Display3dModelAnimParticle = /** @class */ (function (_super) {
    __extends(Display3dModelAnimParticle, _super);
    function Display3dModelAnimParticle() {
        return _super.call(this) || this;
    }
    Display3dModelAnimParticle.prototype.updateUV = function () {
        var currentFrame = this._time / Scene_data.frameTime;
        currentFrame = currentFrame > this.modeldata._maxAnimTime ? this.modeldata._maxAnimTime : currentFrame;
        currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);
        this._resultUvVec[0] = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Scene_data.frameTime * this.data._uSpeed;
        this._resultUvVec[1] = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Scene_data.frameTime * this.data._vSpeed;
    };
    return Display3dModelAnimParticle;
}(Display3DModelPartilce));
//# sourceMappingURL=Display3dModelAnimParticle.js.map