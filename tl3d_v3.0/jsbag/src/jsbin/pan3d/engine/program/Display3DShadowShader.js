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
    var Display3DShadowShader = /** @class */ (function (_super) {
        __extends(Display3DShadowShader, _super);
        function Display3DShadowShader() {
            return _super.call(this) || this;
        }
        Display3DShadowShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        Display3DShadowShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform vec4 pos[30];" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(v2uv.x, v2uv.y);" +
                "   vec3 vt1= vec3(v3Pos.xyz * pos[int(v2uv.z)].w + pos[int(v2uv.z)].xyz);" +
                "   vec4 vt0= vec4(vt1, 1.0);" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        Display3DShadowShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        Display3DShadowShader.Display3DShadowShader = "Display3DShadowShader";
        return Display3DShadowShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DShadowShader = Display3DShadowShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DShadowShader.js.map