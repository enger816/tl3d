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
    var Display3DLocusShader = /** @class */ (function (_super) {
        __extends(Display3DLocusShader, _super);
        function Display3DLocusShader() {
            return _super.call(this) || this;
        }
        Display3DLocusShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
            if (this.paramAry[0]) {
                $context.bindAttribLocation(this.program, 2, "v3Normal");
            }
        };
        Display3DLocusShader.prototype.getMat4Str = function (key) {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_mat4[key] + "]";
        };
        Display3DLocusShader.prototype.getVec4Str = function (key) {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_vec4[key][0] + "][" + Display3DLocusShader.shader_vec4[key][1] + "]";
        };
        Display3DLocusShader.getVcSize = function () {
            return 4;
        };
        Display3DLocusShader.prototype.getVertexShaderString = function () {
            var defineBaseStr = "attribute vec4 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
                "uniform mat4 vcmat[" + Pan3d.Display3DFacetShader.getVcSize() + "];\n" + //所有vc值
                //"uniform mat4 viewMatrix3D;\n" +
                //"uniform mat4 camMatrix3D;\n" +
                //"uniform mat4 posMatrix3D;\n" +
                // "uniform vec3 uvMove;\n" +
                "varying vec2 v0;\n" +
                "varying vec4 v2;\n";
            var defineWachtStr = "attribute vec4 v3Normal;\n"; // +
            //"uniform vec3 camPos;\n";
            var defineUvStr = "";
            //"uniform vec3 isUv;\n";
            var defineParticleColor = "varying vec2 v1;\n";
            var baseStr = "   vec2 tempv0 = v2TexCoord;\n" +
                "   tempv0.x -= " + this.getVec4Str("uvMove") + ".x;\n";
            var particleColorStr = "   v1 = v2TexCoord;\n";
            var baseUvStr = "   v0 = tempv0;\n";
            var uvStr = "   tempv0.xy *= " + this.getVec4Str("isUv") + ".xy;\n" +
                "   if(" + this.getVec4Str("isUv") + ".z >= 0.0){\n" +
                "   vec2 tempv1 = tempv0;\n" +
                "   tempv0.y = tempv1.x;\n" +
                "   tempv0.x = tempv1.y;}\n" +
                "   v0 = tempv0;\n";
            var killStr = "   float alpha = tempv0.x/" + this.getVec4Str("uvMove") + ".y;\n" +
                "   alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n" +
                "   float kill = -tempv0.x;\n" +
                "   kill *= tempv0.x - " + this.getVec4Str("uvMove") + ".z;\n" +
                "   v2 = vec4(kill,0.0,0.0,alpha);\n";
            var posStr = "   gl_Position = " + this.getMat4Str("viewMatrix3D") + "  * " + this.getMat4Str("camMatrix3D") + " * " + this.getMat4Str("posMatrix3D") + " * v3Position;\n";
            var watchPosStr = "   vec4 tempPos = " + this.getMat4Str("posMatrix3D") + " * v3Position;\n" +
                "   vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n" +
                "   vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n" +
                "   mulPos = normalize(vec3(" + this.getVec4Str("camPos") + ".xyz) - mulPos);\n" +
                "   mulPos = cross(mulPos, normals);\n" +
                "   mulPos = normalize(mulPos);\n" +
                "   mulPos *= v3Normal.w;\n" +
                "   tempPos.xyz = mulPos.xyz + v3Position.xyz;\n" +
                "   gl_Position = " + this.getMat4Str("viewMatrix3D") + "  * " + this.getMat4Str("camMatrix3D") + " * " + this.getMat4Str("posMatrix3D") + " * tempPos;\n";
            var isWatchEye = this.paramAry[0];
            var isUV = this.paramAry[1];
            var hasParticleColor = this.paramAry[2];
            var defineStr = defineBaseStr;
            if (isWatchEye) {
                defineStr += defineWachtStr;
            }
            if (isUV) {
                defineStr += defineUvStr;
            }
            if (hasParticleColor) {
                defineStr += defineParticleColor;
            }
            var mainStr = baseStr + killStr;
            if (hasParticleColor) {
                mainStr += particleColorStr;
            }
            if (isUV) {
                mainStr += uvStr;
            }
            else {
                mainStr += baseUvStr;
            }
            if (isWatchEye) {
                mainStr += watchPosStr;
            }
            else {
                mainStr += posStr;
            }
            var resultStr = defineStr + "void main(void){\n" + mainStr + "}";
            return resultStr;
        };
        Display3DLocusShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "uniform sampler2D tex;\n" +
                "varying vec2 v0;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(tex, v0.xy);\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        Display3DLocusShader.Display3D_Locus_Shader = "Display3DLocusShader";
        Display3DLocusShader.shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, posMatrix3D: 2 };
        Display3DLocusShader.shader_vec4 = { uvMove: [3, 0], camPos: [3, 1], isUv: [3, 2] };
        return Display3DLocusShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DLocusShader = Display3DLocusShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DLocusShader.js.map