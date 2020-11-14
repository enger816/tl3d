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
    var Movie2DShader = /** @class */ (function (_super) {
        __extends(Movie2DShader, _super);
        function Movie2DShader() {
            return _super.call(this) || this;
        }
        Movie2DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        Movie2DShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform mat4 viewMatrix3D;\n" +
                "uniform mat4 camMatrix3D;\n" +
                "uniform mat4 watchCamMatrix3D;\n" +
                "uniform vec4 posdata[24];" +
                "uniform vec2 outuv;" +
                //"uniform vec4 ui[6];" +
                //"uniform vec4 ui2[6];" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   vec4 data = posdata[int(v2uv.z)];" +
                //"   v_texCoord = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                //"   data = ui[int(v2uv.z)];" +
                "   vec4 vt0= vec4(v3Pos * data.w,1.0);" +
                "   vt0= watchCamMatrix3D * vt0;" +
                "   vt0.xyz += data.xyz;" +
                //"   pos.xy = v3Pos.xy * data.zw * 2.0;" +
                //"   pos.x += data.x * 2.0 - 1.0;" +
                //"   pos.y += -data.y * 2.0 + 1.0;" +
                "   v_texCoord = vec2(v2uv.x,v2uv.y) + outuv;" +
                //"   vec4 vt0= vec4(v3Pos, 1.0);" +
                "   gl_Position = viewMatrix3D * camMatrix3D * vt0;" +
                "}";
            return $str;
        };
        Movie2DShader.prototype.getFragmentShaderString = function () {
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
        Movie2DShader.MOVIE2D_SHADER = "Movie2DShader";
        return Movie2DShader;
    }(Pan3d.Shader3D));
    Pan3d.Movie2DShader = Movie2DShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Movie2DShader.js.map