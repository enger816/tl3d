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
    var TerrainDisplay3DShader = /** @class */ (function (_super) {
        __extends(TerrainDisplay3DShader, _super);
        function TerrainDisplay3DShader() {
            return _super.call(this) || this;
        }
        TerrainDisplay3DShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
        };
        TerrainDisplay3DShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 v2TexCoord;\n" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec2 v0;\n" +
                "void main(void)" +
                "{" +
                " v0 = v2TexCoord;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        TerrainDisplay3DShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;" +
                "uniform sampler2D idmaptexture;" +
                "uniform sampler2D infotexture;" +
                "uniform sampler2D sixtexture;" +
                "uniform sampler2D lightexture;" +
                "vec4 qdvNrm(float indx ,vec2 uvpos){" +
                "vec2 sixuvTx=uvpos; " +
                "float ccavid= floor(indx*255.0);" +
                "if (ccavid==0.0) {\n" +
                "} else  if (ccavid==1.0){\n" +
                "sixuvTx.x=sixuvTx.x+0.5;" +
                "} else  if (ccavid==2.0){" +
                "sixuvTx.y=sixuvTx.y+0.5;" +
                "}else{" +
                "sixuvTx.x=sixuvTx.x+0.5;" +
                "sixuvTx.y=sixuvTx.y+0.5;" +
                "}; " +
                "sixuvTx.x=sixuvTx.x+0.001;" +
                "sixuvTx.y=sixuvTx.y+0.001;" +
                "vec4 sixUvColor = texture2D(sixtexture, sixuvTx.xy);\n" +
                "return  sixUvColor;\n" +
                " }\n" +
                "varying vec2 v0;" +
                "void main(void)" +
                "{" +
                "vec4 idUv = texture2D(idmaptexture, v0.xy);\n" +
                "vec4 infoUv = texture2D(infotexture, v0.xy);\n" +
                "vec4 sixUv = texture2D(sixtexture, v0.xy);\n" +
                "vec4 lightUv = texture2D(lightexture, v0*0.995+0.0025);\n" +
                "vec2 sixuv=fract(v0*10.0); " +
                " sixuv=sixuv*0.498; " +
                "vec4 tempnumA = qdvNrm(idUv.x,sixuv) * infoUv.x;\n" +
                "vec4 tempnumB = qdvNrm(idUv.y,sixuv) * infoUv.y;\n" +
                "vec4 tempnumC = qdvNrm(idUv.z,sixuv) * infoUv.z;\n" +
                "vec4 tempnumD = tempnumA+tempnumB+tempnumC;\n" +
                " tempnumD.xyz=tempnumD.xyz*lightUv.xyz*2.0; " +
                "gl_FragColor = tempnumD;" +
                "}";
            return $str;
        };
        TerrainDisplay3DShader.TerrainDisplay3DShader = "TerrainDisplay3DShader";
        return TerrainDisplay3DShader;
    }(Pan3d.Shader3D));
    Pan3d.TerrainDisplay3DShader = TerrainDisplay3DShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=TerrainDisplay3DShader.js.map