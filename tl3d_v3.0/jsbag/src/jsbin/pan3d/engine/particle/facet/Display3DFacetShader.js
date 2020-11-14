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
    var Display3DFacetShader = /** @class */ (function (_super) {
        __extends(Display3DFacetShader, _super);
        function Display3DFacetShader() {
            return _super.call(this) || this;
        }
        Display3DFacetShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
        };
        Display3DFacetShader.prototype.getMat4Str = function (key) {
            //return key;
            return "vcmat[" + Display3DFacetShader.shader_mat4[key] + "]";
        };
        Display3DFacetShader.prototype.getVec4Str = function (key) {
            //return key;
            return "vcmat[" + Display3DFacetShader.shader_vec4[key][0] + "][" + Display3DFacetShader.shader_vec4[key][1] + "]";
        };
        Display3DFacetShader.getVcSize = function () {
            return 5;
        };
        Display3DFacetShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec4 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
                "uniform mat4 vcmat[" + Display3DFacetShader.getVcSize() + "];\n" + //所有vc值
                //"uniform mat4 viewMatrix3D;\n" +
                //"uniform mat4 camMatrix3D;\n" +
                // "uniform mat4 rotationMatrix3D;\n" +
                //"uniform mat4 posMatrix3D;\n" +
                //"uniform vec2 uvMove;\n" +
                "varying vec2 v0;\n" +
                "void main(void){\n" +
                "   v0 = v2TexCoord + vec2(" + this.getVec4Str("uvMove") + ".xy);\n" +
                "   gl_Position = " + this.getMat4Str("viewMatrix3D") + "  * " + this.getMat4Str("camMatrix3D") + " * "
                + this.getMat4Str("posMatrix3D") + " * " + this.getMat4Str("rotationMatrix3D") + " * v3Position;\n" +
                "}";
            return $str;
        };
        Display3DFacetShader.prototype.getFragmentShaderString = function () {
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
        Display3DFacetShader.Display3D_Facet_Shader = "Display3DFacetShader";
        Display3DFacetShader.shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, rotationMatrix3D: 2, posMatrix3D: 3 };
        Display3DFacetShader.shader_vec4 = { uvMove: [4, 0] };
        return Display3DFacetShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DFacetShader = Display3DFacetShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DFacetShader.js.map