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
    var SkyShader = /** @class */ (function (_super) {
        __extends(SkyShader, _super);
        function SkyShader() {
            return _super.call(this) || this;
        }
        SkyShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v3Normal");
        };
        SkyShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec3 v3Normal;" +
                //"attribute vec2 v2LightBuff;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec3 vNormal;" +
                //"varying vec2 v_texLight;" +
                "void main(void)" +
                "{" +
                "   vNormal = vec3(v3Normal.x, v3Normal.y,v3Normal.z);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        SkyShader.prototype.getFragmentShaderString = function () {
            var $str = 
            //"#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
            //"precision highp float;\n" +
            //" #else\n" +
            //" precision mediump float;\n" +
            //" #endif\n" +
            "precision mediump float;\n" +
                "uniform samplerCube s_texture;\n" +
                //"uniform sampler2D light_texture;\n" +
                "varying vec3 vNormal;\n" +
                //"varying vec2 v_texLight;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = textureCube(s_texture, vNormal);\n" +
                //"if (infoUv.a <= 0.9) {\n" +
                //"     discard;\n" +
                //"}\n" +
                //"vec4 infoLight = texture2D(light_texture, v_texLight);\n" +
                //"vec4 test = vec4(0.5,0,0,1);\n" +
                //"vec4 test = testconst * testconst2;\n" +
                //"test = test * testconst2;\n" +
                //"infoUv.xyz = test.xyz * infoUv.xyz;\n" +
                //"info.rgb = info.rgb / 0.15;\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        SkyShader.Sky_Shader = "SkyShader";
        return SkyShader;
    }(Pan3d.Shader3D));
    Pan3d.SkyShader = SkyShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkyShader.js.map