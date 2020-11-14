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
    var ParticleBallGpuData = /** @class */ (function (_super) {
        __extends(ParticleBallGpuData, _super);
        function ParticleBallGpuData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleBallGpuData.prototype.destory = function () {
            _super.prototype.destory.call(this);
            if (this.basePos) {
                this.basePos.length = 0;
                this.basePos = null;
                if (this.basePosBuffer) {
                    Pan3d.Scene_data.context3D.deleteBuffer(this.basePosBuffer);
                    this.basePosBuffer = null;
                }
            }
            if (this.beMove) {
                this.beMove.length = 0;
                this.beMove = null;
                if (this.beMoveBuffer) {
                    Pan3d.Scene_data.context3D.deleteBuffer(this.beMoveBuffer);
                    this.beMoveBuffer = null;
                }
            }
            if (this.randomColor) {
                this.randomColor.length = 0;
                this.randomColor = null;
                if (this.randomColorBuffer) {
                    Pan3d.Scene_data.context3D.deleteBuffer(this.randomColorBuffer);
                    this.randomColorBuffer = null;
                }
            }
            if (this.baseRotation) {
                this.baseRotation.length = 0;
                this.baseRotation = null;
                if (this.baseRotationBuffer) {
                    Pan3d.Scene_data.context3D.deleteBuffer(this.baseRotationBuffer);
                    this.baseRotationBuffer = null;
                }
            }
        };
        return ParticleBallGpuData;
    }(Pan3d.ParticleGpuData));
    Pan3d.ParticleBallGpuData = ParticleBallGpuData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleBallGpuData.js.map