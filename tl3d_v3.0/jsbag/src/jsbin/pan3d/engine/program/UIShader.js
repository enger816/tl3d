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
    var UIShader = /** @class */ (function (_super) {
        __extends(UIShader, _super);
        function UIShader() {
            return _super.call(this) || this;
        }
        UIShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        };
        UIShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +
                "uniform vec4 ui[50];" +
                "uniform vec4 ui2[50];" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   vec4 data = ui2[int(v2uv.z)];" +
                "   v_texCoord = vec2(v2uv.x * data.x + data.z, v2uv.y * data.y + data.w);" +
                "   data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        UIShader.prototype.getFragmentShaderString = function () {
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
        UIShader.UI_SHADER = "UIShader";
        return UIShader;
    }(Pan3d.Shader3D));
    Pan3d.UIShader = UIShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIShader.js.map