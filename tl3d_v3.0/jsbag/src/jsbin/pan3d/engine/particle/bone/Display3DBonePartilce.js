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
    var Display3DBoneShader = /** @class */ (function (_super) {
        __extends(Display3DBoneShader, _super);
        function Display3DBoneShader() {
            return _super.call(this) || this;
        }
        Display3DBoneShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
            $context.bindAttribLocation(this.program, 2, "boneWeight");
            $context.bindAttribLocation(this.program, 3, "boneID");
        };
        Display3DBoneShader.prototype.getMat4Str = function (key) {
            //return key;
            return "vcmat[" + Display3DBoneShader.shader_mat4[key] + "]";
        };
        Display3DBoneShader.getVcSize = function () {
            return 3;
        };
        Display3DBoneShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 pos;" +
                "attribute vec2 v2uv;" +
                "attribute vec4 boneWeight;" +
                "attribute vec4 boneID;" +
                "uniform vec4 boneQ[54];\n" +
                "uniform vec3 boneD[54];\n" +
                "uniform mat4 vcmat[" + Display3DBoneShader.getVcSize() + "];\n" + //所有vc值
                //"uniform mat4 viewMatrix3D;\n" +
                //"uniform mat4 camMatrix3D;\n" +
                //"uniform mat4 posMatrix3D;\n" +
                "varying vec2 v0;\n" +
                Pan3d.MaterialAnimShader.getMd5M44Str() +
                "void main(void)" +
                "{" +
                "v0 = v2uv;\n" +
                "vec4 vt0 = getQDdata(vec3(pos.x,pos.y,pos.z));\n" +
                " gl_Position = " + this.getMat4Str("viewMatrix3D") + " * " + this.getMat4Str("camMatrix3D") + " *" + this.getMat4Str("posMatrix3D") + "* vt0;" +
                "}";
            return $str;
        };
        Display3DBoneShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "varying vec2 v0;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor = vec4(1.0,0.0,1.0,1.0);\n" +
                "}";
            return $str;
        };
        Display3DBoneShader.Display3DBoneShader = "Display3DBoneShader";
        Display3DBoneShader.shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, posMatrix3D: 2 };
        return Display3DBoneShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DBoneShader = Display3DBoneShader;
    var Display3DBonePartilce = /** @class */ (function (_super) {
        __extends(Display3DBonePartilce, _super);
        function Display3DBonePartilce() {
            var _this = _super.call(this) || this;
            _this.skipNum = 0;
            return _this;
        }
        Object.defineProperty(Display3DBonePartilce.prototype, "modeldata", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Display3DBonePartilce.prototype.creatData = function () {
            this.data = new Pan3d.ParticleBoneData;
        };
        Display3DBonePartilce.prototype.update = function () {
            Pan3d.Scene_data.context3D.setWriteDepth(false);
            _super.prototype.update.call(this);
            //   Scene_data.context3D.setWriteDepth(false);
        };
        Display3DBonePartilce.prototype.setVc = function () {
            var currentFrame = float2int((this._time / Pan3d.Scene_data.frameTime) / 2);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            //this.data.setFloat32Mat("viewMatrix3D", Scene_data.viewMatrx3D.m);
            this.data.vcmatData.set(Pan3d.Scene_data.viewMatrx3D.m, 0);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            //this.data.setFloat32Mat("camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            this.data.vcmatData.set(Pan3d.Scene_data.cam3D.cameraMatrix.m, 16);
            //Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "posMatrix3D", this.modelMatrix.m);
            //this.data.setFloat32Mat("posMatrix3D", this.modelMatrix.m);
            this.data.vcmatData.set(this.modelMatrix.m, 32);
            Pan3d.Scene_data.context3D.setVcMatrix4fv(this.data.materialParam.shader, "vcmat", this.data.vcmatData);
            var $frameDualQuat = this.modeldata.animData.boneQPAry[0];
            var $frameLen = $frameDualQuat.length;
            var $frameId = currentFrame % $frameLen;
            /*
            for (var i: number = 0; i < this.modeldata.boneQDitem[$frameId].length; i++) {
                var $dq: ObjectBone = this.modeldata.boneQDitem[$frameId][i]
    
                Scene_data.context3D.setVc4fv(this.data.materialParam.program, "boneQ[" + i + "]", [$dq.qx, $dq.qy, $dq.qz, $dq.qw]);
                Scene_data.context3D.setVc3fv(this.data.materialParam.program, "boneD[" + i + "]", [$dq.tx, $dq.ty, $dq.tz]);
            }
            */
            var $dualQuatFrame = $frameDualQuat[$frameId];
            Pan3d.Scene_data.context3D.setVc4fv(this.data.materialParam.shader, "boneQ", $dualQuatFrame.quat); //旋转
            Pan3d.Scene_data.context3D.setVc3fv(this.data.materialParam.shader, "boneD", $dualQuatFrame.pos); //所有的位移
            this.setMaterialVc();
        };
        Display3DBonePartilce.prototype.setVa = function () {
            var tf = Pan3d.Scene_data.context3D.pushVa(this.modeldata.meshData.vertexBuffer);
            if (!tf) {
                Pan3d.Scene_data.context3D.setVaOffset(0, 3, this.modeldata.meshData.stride, 0);
                Pan3d.Scene_data.context3D.setVaOffset(1, 2, this.modeldata.meshData.stride, 12);
                Pan3d.Scene_data.context3D.setVaOffset(3, 4, this.modeldata.meshData.stride, 20);
                Pan3d.Scene_data.context3D.setVaOffset(2, 4, this.modeldata.meshData.stride, 36);
            }
            // Scene_data.context3D.setVa(0, 3, this.modeldata.meshData.vertexBuffer);
            // Scene_data.context3D.setVa(1, 2, this.modeldata.meshData.uvBuffer);
            // Scene_data.context3D.setVa(2, 4, this.modeldata.meshData.boneWeightBuffer);
            // Scene_data.context3D.setVa(3, 4, this.modeldata.meshData.boneIdBuffer);
            this.setMaterialTexture();
            Pan3d.Scene_data.context3D.drawCall(this.modeldata.meshData.indexBuffer, this.modeldata.meshData.treNum);
        };
        Display3DBonePartilce.prototype.resetVa = function () {
            //Scene_data.context3D.clearVa(2);
            //Scene_data.context3D.clearVa(3);
            _super.prototype.resetVa.call(this);
        };
        return Display3DBonePartilce;
    }(Pan3d.Display3DParticle));
    Pan3d.Display3DBonePartilce = Display3DBonePartilce;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DBonePartilce.js.map