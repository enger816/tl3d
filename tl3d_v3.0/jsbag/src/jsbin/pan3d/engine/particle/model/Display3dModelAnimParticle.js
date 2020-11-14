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
    var Display3dModelAnimParticle = /** @class */ (function (_super) {
        __extends(Display3dModelAnimParticle, _super);
        function Display3dModelAnimParticle() {
            return _super.call(this) || this;
        }
        Display3dModelAnimParticle.prototype.updateUV = function () {
            var currentFrame = this._time / Pan3d.Scene_data.frameTime;
            currentFrame = currentFrame > this.modeldata._maxAnimTime ? this.modeldata._maxAnimTime : currentFrame;
            currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);
            this._resultUvVec[0] = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Pan3d.Scene_data.frameTime * this.data._uSpeed;
            this._resultUvVec[1] = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Pan3d.Scene_data.frameTime * this.data._vSpeed;
        };
        return Display3dModelAnimParticle;
    }(Pan3d.Display3DModelPartilce));
    Pan3d.Display3dModelAnimParticle = Display3dModelAnimParticle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3dModelAnimParticle.js.map