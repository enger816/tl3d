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
    var Sprite2DShader = /** @class */ (function (_super) {
        __extends(Sprite2DShader, _super);
        function Sprite2DShader() {
            return _super.call(this) || this;
        }
        Sprite2DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        Sprite2DShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform mat4 viewMatrix3D;\n" +
                "uniform mat4 camMatrix3D;\n" +
                "uniform mat4 watchCamMatrix3D;\n" +
                "uniform vec4 posdata[12];" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   vec4 data = posdata[int(v2uv.z)];" +
                "   vec4 vt0= vec4(v3Pos * data.w,1.0);" +
                "   vt0= watchCamMatrix3D * vt0;" +
                "   vt0.xyz += data.xyz;" +
                "   v_texCoord = vec2(v2uv.x,v2uv.y);" +
                "   gl_Position = viewMatrix3D * camMatrix3D * vt0;" +
                "}";
            return $str;
        };
        Sprite2DShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "if(infoUv.w < 0.1){discard;}\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        Sprite2DShader.SPRITE2D_SHADER = "Sprite2DShader";
        return Sprite2DShader;
    }(Pan3d.Shader3D));
    Pan3d.Sprite2DShader = Sprite2DShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Sprite2DShader.js.map