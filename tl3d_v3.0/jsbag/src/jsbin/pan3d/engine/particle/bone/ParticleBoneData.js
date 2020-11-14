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
    var ParticleBoneData = /** @class */ (function (_super) {
        __extends(ParticleBoneData, _super);
        function ParticleBoneData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.objScale = 1;
            return _this;
        }
        ParticleBoneData.prototype.getParticle = function () {
            return new Pan3d.Display3DBonePartilce();
        };
        ParticleBoneData.prototype.destory = function () {
            _super.prototype.destory.call(this);
            //this.timelineData.destory();
            //this.timelineData = null;
            this.meshData.destory();
            this.animData = null;
        };
        ParticleBoneData.prototype.setAllByteInfo = function ($byte) {
            this.meshData = new Pan3d.MeshData();
            this.animData = new Pan3d.AnimData();
            this.objScale = $byte.readFloat();
            var dataWidth = 13;
            var len = $byte.getInt();
            len *= dataWidth * 4;
            var arybuff = new ArrayBuffer(len);
            var data = new DataView(arybuff);
            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth); //vertices
            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth); //uvs
            Pan3d.BaseRes.readIntForTwoByte($byte, this.meshData.indexs);
            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 4, 5, dataWidth, 2); //boneIDAry
            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 4, 9, dataWidth, 3); //boneWeightAry
            this.meshData.stride = dataWidth * 4;
            // BaseRes.readFloatTwoByte($byte, this.meshData.vertices)
            // //console.log($byte.position);
            // BaseRes.readFloatTwoByte($byte, this.meshData.uvs)
            // //console.log($byte.position);
            // BaseRes.readIntForTwoByte($byte, this.meshData.indexs);
            // //console.log($byte.position);
            // var numLength: number = $byte.readInt();
            // this.meshData.boneIDAry = new Array
            // for (var j: number = 0; j < numLength; j++) {
            //     this.meshData.boneIDAry.push($byte.readByte())
            // }
            // //console.log($byte.position);
            // numLength = $byte.readInt();
            // this.meshData.boneWeightAry = new Array
            // for (var j: number = 0; j < numLength; j++) {
            //     this.meshData.boneWeightAry.push(($byte.readByte() + 128) / 255);
            // }
            // //console.log($byte.position);
            this.readFrameQua($byte);
            ////console.log($byte.position);
            _super.prototype.setAllByteInfo.call(this, $byte);
            //this.uploadGpu();
            this.initVcData();
            this.meshData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
            this.meshData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.meshData.indexs);
            this.meshData.treNum = this.meshData.indexs.length;
        };
        ParticleBoneData.prototype.initVcData = function () {
            this.vcmatData = new Float32Array(Pan3d.Display3DBoneShader.getVcSize() * 16);
        };
        ParticleBoneData.prototype.setFloat32Mat = function (key, ary) {
            var idx = Pan3d.Display3DBoneShader.shader_mat4[key] * 16;
            this.vcmatData.set(ary, idx);
        };
        ParticleBoneData.prototype.readFrameQua = function ($byte) {
            var $tempNum = $byte.readFloat();
            var $RGB32767 = 32767;
            var $frameNum = $byte.readInt();
            var $frameDualQuat = new Array;
            for (var i = 0; i < $frameNum; i++) {
                var $len = $byte.readInt();
                var $DualQuatFloat32Array = new Pan3d.DualQuatFloat32Array;
                $DualQuatFloat32Array.quat = new Float32Array($len * 4);
                $DualQuatFloat32Array.pos = new Float32Array($len * 3);
                for (var j = 0; j < $len; j++) {
                    $DualQuatFloat32Array.quat[j * 4 + 0] = $byte.readShort() / $RGB32767;
                    $DualQuatFloat32Array.quat[j * 4 + 1] = $byte.readShort() / $RGB32767;
                    $DualQuatFloat32Array.quat[j * 4 + 2] = $byte.readShort() / $RGB32767;
                    $DualQuatFloat32Array.quat[j * 4 + 3] = $byte.readShort() / $RGB32767;
                    $DualQuatFloat32Array.pos[j * 3 + 0] = $byte.readShort() / $RGB32767 * $tempNum;
                    $DualQuatFloat32Array.pos[j * 3 + 1] = $byte.readShort() / $RGB32767 * $tempNum;
                    $DualQuatFloat32Array.pos[j * 3 + 2] = $byte.readShort() / $RGB32767 * $tempNum;
                }
                $frameDualQuat.push($DualQuatFloat32Array);
            }
            this.animData.boneQPAry = new Array;
            this.animData.boneQPAry.push($frameDualQuat);
        };
        ParticleBoneData.prototype.uploadGpu = function () {
            this.uploadMesh(this.meshData);
        };
        ParticleBoneData.prototype.uploadMesh = function ($mesh) {
            $mesh.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($mesh.vertices);
            $mesh.uvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($mesh.uvs);
            $mesh.boneIdBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($mesh.boneIDAry);
            $mesh.boneWeightBuffer = Pan3d.Scene_data.context3D.uploadBuff3D($mesh.boneWeightAry);
            $mesh.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D($mesh.indexs);
            $mesh.treNum = $mesh.indexs.length;
        };
        ParticleBoneData.prototype.regShader = function () {
            this.materialParam.shader = Pan3d.ProgrmaManager.getInstance().getMaterialProgram(Pan3d.Display3DBoneShader.Display3DBoneShader, Pan3d.Display3DBoneShader, this.materialParam.material);
            this.materialParam.program = this.materialParam.shader.program;
        };
        return ParticleBoneData;
    }(Pan3d.ParticleData));
    Pan3d.ParticleBoneData = ParticleBoneData;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleBoneData.js.map