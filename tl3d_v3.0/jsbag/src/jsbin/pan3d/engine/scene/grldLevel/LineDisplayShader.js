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
    var LineDisplayShader = /** @class */ (function (_super) {
        __extends(LineDisplayShader, _super);
        function LineDisplayShader() {
            return _super.call(this) || this;
        }
        LineDisplayShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v3Color");
        };
        LineDisplayShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec3 v3Color;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec4 colorData;" +
                "void main(void)" +
                "{" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   colorData =vec4(v3Color,1) ;" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        LineDisplayShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "varying vec4 colorData;\n" +
                "void main(void)\n" +
                "{\n" +
                "gl_FragColor =colorData;\n" +
                "}";
            return $str;
        };
        LineDisplayShader.LineShader = "LineShader";
        return LineDisplayShader;
    }(Pan3d.Shader3D));
    Pan3d.LineDisplayShader = LineDisplayShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=LineDisplayShader.js.map