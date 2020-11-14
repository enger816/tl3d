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
    var ParticleLocusData = /** @class */ (function (_super) {
        __extends(ParticleLocusData, _super);
        function ParticleLocusData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._speed = 1; //粒子运动数字
            _this._isLoop = false; //是否循环
            return _this;
        }
        ParticleLocusData.prototype.getParticle = function () {
            return new Pan3d.Display3DLocusPartilce;
        };
        ParticleLocusData.prototype.setAllByteInfo = function ($byte) {
            this._isLoop = $byte.readBoolean(); //b
            this._speed = $byte.readFloat(); //f
            this._density = $byte.readFloat(); //f
            this._isEnd = $byte.readBoolean(); //b
            this.objData = new Pan3d.ObjData;
            var vLen = $byte.getInt();
            var dataWidth = 9;
            var len = vLen * dataWidth * 4;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4); //vertices
            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 4, 3, dataWidth, 4); //normal
            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 2, 7, dataWidth, 4); //uv
            // var vLen: number = $byte.readInt();
            // for (var i: number = 0; i < vLen; i++) {
            //     this.objData.vertices.push($byte.readFloat())
            // }
            // var nLen: number = $byte.readInt();
            // for (var i: number = 0; i < nLen; i++) {
            //     this.objData.normals.push($byte.readFloat())
            // }
            // var uLen: number = $byte.readInt();
            // for (var j: number = 0; j < uLen; j++) {
            //     this.objData.uvs.push($byte.readFloat())
            // }
            var iLen = $byte.readInt();
            for (var k = 0; k < iLen; k++) {
                this.objData.indexs.push($byte.readInt());
            }
            this.objData.stride = dataWidth * 4;
            _super.prototype.setAllByteInfo.call(this, $byte);
            this.initUV();
            if (this._watchEye) {
                this._caramPosVec = [0, 0, 0];
            }
            this._uvVec = [this._isU ? -1 : 1, this._isV ? -1 : 1, this._isUV ? 1 : -1];
            // this.uploadGpu();
            this.initVcData();
            this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            this.objData.treNum = this.objData.indexs.length;
        };
        ParticleLocusData.prototype.initUV = function () {
            this._resultUvVec = new Array(3);
            var $nowTime = 0;
            var $lifeRoundNum = (this._life / 100);
            var $moveUv = this._speed * $nowTime / this._density / 10;
            if (this._isEnd) {
                $moveUv = Math.min(1, $moveUv);
            }
            var $fcVector;
            if (this._isLoop) {
                if (this._life) {
                    $moveUv = $moveUv % ($lifeRoundNum + 1);
                    $fcVector = new Pan3d.Vector3D($moveUv, $lifeRoundNum, -$lifeRoundNum);
                }
                else {
                    $moveUv = $moveUv % 1;
                    $fcVector = new Pan3d.Vector3D($moveUv + 1, 99, -2);
                }
            }
            else {
                if (this._life) {
                    $fcVector = new Pan3d.Vector3D($moveUv, $lifeRoundNum, -1);
                }
                else {
                    $fcVector = new Pan3d.Vector3D($moveUv, 99, -1);
                }
            }
            this._resultUvVec[0] = $fcVector.x;
            this._resultUvVec[1] = $fcVector.y;
            this._resultUvVec[2] = $fcVector.z;
        };
        ParticleLocusData.prototype.uploadGpu = function () {
            this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            if (this._watchEye) {
                this.objData.normalsBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.normals);
            }
            this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            this.objData.treNum = this.objData.indexs.length;
        };
        ParticleLocusData.prototype.regShader = function () {
            if (!this.materialParam) {
                return;
            }
            var isWatchEye = this._watchEye ? 1 : 0;
            var changeUv = 0;
            var hasParticleColor = this.materialParam.material.hasParticleColor;
            if (this._isU || this._isV || this._isUV) {
                changeUv = 1;
                this._changUv = true;
            }
            else {
                this._changUv = false;
            }
            var shaderParameAry;
            shaderParameAry = [isWatchEye, changeUv, hasParticleColor ? 1 : 0];
            //var shader: Display3DLocusShader = new Display3DLocusShader();
            this.materialParam.shader = Pan3d.ProgrmaManager.getInstance().getMaterialProgram(Pan3d.Display3DLocusShader.Display3D_Locus_Shader, Pan3d.Display3DLocusShader, this.materialParam.material, shaderParameAry);
            this.materialParam.program = this.materialParam.shader.program;
        };
        ParticleLocusData.prototype.initVcData = function () {
            this.vcmatData = new Float32Array(Pan3d.Display3DLocusShader.getVcSize() * 16);
        };
        ParticleLocusData.prototype.setFloat32Vec = function (key, ary) {
            var idxary = Pan3d.Display3DLocusShader.shader_vec4[key];
            var idx = idxary[0] * 16 + idxary[1] * 4;
            this.vcmatData.set(ary, idx);
        };
        ParticleLocusData.prototype.setFloat32Mat = function (key, ary) {
            var idx = Pan3d.Display3DLocusShader.shader_mat4[key] * 16;
            this.vcmatData.set(ary, idx);
        };
        return ParticleLocusData;
    }(Pan3d.ParticleData));
    Pan3d.ParticleLocusData = ParticleLocusData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleLocusData.js.map