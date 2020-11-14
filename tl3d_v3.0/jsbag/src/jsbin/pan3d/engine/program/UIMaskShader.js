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
    var UIMaskShader = /** @class */ (function (_super) {
        __extends(UIMaskShader, _super);
        function UIMaskShader() {
            return _super.call(this) || this;
        }
        UIMaskShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
        };
        UIMaskShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Pos;" +
                "uniform vec4 ui;" +
                "void main(void)" +
                "{" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * ui.zw * 2.0;" +
                "   pos.x += ui.x * 2.0 - 1.0;" +
                "   pos.y += -ui.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        UIMaskShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor = vec4(0.5,0.5,0.5,1.0);\n" +
                "}";
            return $str;
        };
        UIMaskShader.UI_MASK_SHADER = "UImaskShader";
        return UIMaskShader;
    }(Pan3d.Shader3D));
    Pan3d.UIMaskShader = UIMaskShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIMaskShader.js.map