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
    var ParticleFollowLocusData = /** @class */ (function (_super) {
        __extends(ParticleFollowLocusData, _super);
        function ParticleFollowLocusData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleFollowLocusData.prototype.getParticle = function () {
            return new Pan3d.Display3DFollowLocusPartilce;
        };
        ParticleFollowLocusData.prototype.setAllByteInfo = function ($byte) {
            this._fenduanshu = $byte.readFloat();
            _super.prototype.setAllByteInfo.call(this, $byte);
            //this.initBindMatrixAry();
            this.uploadGpu();
            this.initVcData();
        };
        ParticleFollowLocusData.prototype.uploadGpu = function () {
            this.objData = new Pan3d.ObjData;
            this.objData.vertices = new Array;
            this.objData.uvs = new Array;
            this.objData.indexs = new Array;
            for (var i = 0; i <= this._fenduanshu; i++) {
                var pA = new Pan3d.Vector2D(i / this._fenduanshu, 0);
                var pB = new Pan3d.Vector2D(i / this._fenduanshu, 1);
                pA.scaleBy(0.9);
                pB.scaleBy(0.9);
                if (this._isU) {
                    pA.x = -pA.x;
                    pB.x = -pB.x;
                }
                if (this._isV) {
                    pA.y = -pA.y;
                    pB.y = -pB.y;
                }
                var vcIndex = i * 2;
                this.objData.vertices.push(vcIndex, vcIndex + 1, -this._originWidthScale * this._width / 100);
                if (this._isUV) {
                    this.objData.vertices.push(pA.y, pA.x);
                }
                else {
                    this.objData.vertices.push(pA.x, pA.y);
                }
                this.objData.vertices.push(vcIndex, vcIndex + 1, (1 - this._originWidthScale) * this._width / 100);
                if (this._isUV) {
                    this.objData.vertices.push(pB.y, pB.x);
                }
                else {
                    this.objData.vertices.push(pB.x, pB.y);
                }
                // if (this._isUV) {
                //     this.objData.uvs.push(pA.y, pA.x);
                //     this.objData.uvs.push(pB.y, pB.x);
                // } else {
                //     this.objData.uvs.push(pA.x, pA.y);
                //     this.objData.uvs.push(pB.x, pB.y);
                // }
            }
            for (i = 0; i < this._fenduanshu; i++) {
                this.objData.indexs.push(0 + 2 * i, 1 + 2 * i, 2 + 2 * i, 1 + 2 * i, 3 + 2 * i, 2 + 2 * i);
            }
            this.pushToGpu();
        };
        ParticleFollowLocusData.prototype.pushToGpu = function () {
            this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            //this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            this.objData.stride = 5 * 4;
            this.objData.treNum = this.objData.indexs.length;
        };
        ParticleFollowLocusData.prototype.initVcData = function () {
            this.vcmatData = new Float32Array(Pan3d.Display3DFollowLocusShader.getVcSize() * 16);
        };
        ParticleFollowLocusData.prototype.regShader = function () {
            if (!this.materialParam) {
                return;
            }
            var shader = new Pan3d.Display3DFollowLocusShader();
            this.materialParam.shader = Pan3d.ProgrmaManager.getInstance().getMaterialProgram(Pan3d.Display3DFollowLocusShader.Display3D_FollowLocus_Shader, Pan3d.Display3DFollowLocusShader, this.materialParam.material);
            this.materialParam.program = this.materialParam.shader.program;
        };
        return ParticleFollowLocusData;
    }(Pan3d.ParticleData));
    Pan3d.ParticleFollowLocusData = ParticleFollowLocusData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleFollowLocusData.js.map