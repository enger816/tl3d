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
    var MaterialShader = /** @class */ (function (_super) {
        __extends(MaterialShader, _super);
        function MaterialShader() {
            var _this = _super.call(this) || this;
            _this.name = "Material_shader";
            return _this;
        }
        MaterialShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
            //if (this.paramAry[0]){
            //    $context.bindAttribLocation(this.program, 3, "v3Normal");
            //}
            //if (this.paramAry[1]){
            //    $context.bindAttribLocation(this.program, 4, "v3Tangent");
            //    $context.bindAttribLocation(this.program, 5, "v3Bitangent");
            //}
            var usePbr = this.paramAry[0];
            var useNormal = this.paramAry[1];
            var lightProbe = this.paramAry[4];
            var directLight = this.paramAry[5];
            var noLight = this.paramAry[6];
            if (!(directLight || noLight)) {
                $context.bindAttribLocation(this.program, 2, "v2lightuv");
            }
            if (usePbr) {
                $context.bindAttribLocation(this.program, 3, "v3Normal");
                if (useNormal) {
                    $context.bindAttribLocation(this.program, 4, "v3Tangent");
                    $context.bindAttribLocation(this.program, 5, "v3Bitangent");
                }
            }
            else if (directLight) {
                $context.bindAttribLocation(this.program, 3, "v3Normal");
            }
        };
        MaterialShader.prototype.getVertexShaderString = function () {
            var usePbr = this.paramAry[0];
            var useNormal = this.paramAry[1];
            var hasFresnel = this.paramAry[2];
            var useDynamicIBL = this.paramAry[3];
            var lightProbe = this.paramAry[4];
            var directLight = this.paramAry[5];
            var noLight = this.paramAry[6];
            var fogMode = this.paramAry[7];
            var $str = "attribute vec3 v3Position;\n" +
                "attribute vec2 v2CubeTexST;\n" +
                "varying vec2 v0;\n";
            if (directLight) {
                $str += "varying vec3 v2;\n";
            }
            else if (noLight) {
            }
            else {
                $str +=
                    "attribute vec2 v2lightuv;\n" +
                        "varying vec2 v2;\n";
            }
            if (usePbr) {
                $str +=
                    "attribute vec3 v3Normal;\n" +
                        "varying vec3 v1;\n";
                if (!useNormal) {
                    $str += "varying vec3 v4;\n";
                }
                else {
                    $str += "varying mat3 v4;\n";
                }
            }
            else if (fogMode != 0) {
                $str +=
                    "varying vec3 v1;\n";
            }
            if (useNormal) {
                $str +=
                    "attribute vec3 v3Tangent;\n" +
                        "attribute vec3 v3Bitangent;\n";
            }
            if (directLight) {
                if (!usePbr) {
                    $str +=
                        "attribute vec3 v3Normal;\n";
                }
                $str +=
                    "uniform vec3 sunDirect;\n" +
                        "uniform vec3 sunColor;\n" +
                        "uniform vec3 ambientColor;\n";
            }
            $str +=
                // "uniform mat4 viewMatrix3D;\n" +
                // "uniform mat4 camMatrix3D;\n" +
                "uniform mat4 vpMatrix3D;\n" +
                    "uniform mat4 posMatrix3D;\n" +
                    "uniform mat3 rotationMatrix3D;\n";
            $str +=
                "void main(void){\n" +
                    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n" +
                    "vec4 vt0= vec4(v3Position, 1.0);\n" +
                    "vt0 = posMatrix3D * vt0;\n";
            if (!(directLight || noLight)) {
                $str += "v2 = vec2(v2lightuv.x, v2lightuv.y);\n";
            }
            if (usePbr || fogMode != 0) {
                $str +=
                    "v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
            }
            $str +=
                //"vt0 = camMatrix3D * vt0;\n" +
                "vt0 = vpMatrix3D * vt0;\n";
            if (usePbr) {
                if (!useNormal) {
                    $str += "v4 = rotationMatrix3D * v3Normal;\n";
                }
                else {
                    $str +=
                        "v4 = mat3(rotationMatrix3D * v3Tangent,rotationMatrix3D * v3Bitangent, rotationMatrix3D * v3Normal);\n";
                }
            }
            if (directLight) {
                if (!usePbr) {
                    $str +=
                        //    "vec4 n = rotationMatrix3D * vec4(v3Normal, 1.0);\n" +
                        "vec3 n = rotationMatrix3D * v3Normal;\n" +
                            "float suncos = dot(n.xyz,sunDirect.xyz);\n";
                }
                else {
                    $str +=
                        "float suncos = dot(v4.xyz,sunDirect.xyz);\n";
                }
                $str +=
                    "suncos = clamp(suncos,0.0,1.0);\n" +
                        "v2 = sunColor * suncos + ambientColor;";
                //"v2 = vec3(1.0,0.0,0.0);\n";
            }
            $str += "gl_Position = vt0;" + "}";
            //   this.outstr($str);
            return $str;
        };
        MaterialShader.prototype.outstr = function (str) {
            var arr = str.split(";");
            for (var i = 0; i < arr.length; i++) {
                var $ddd = String(trim(arr[i]));
                //console.log("\"" + $ddd + "\;" + "\"" + "\+")
            }
            //   //console.log(arr)
        };
        MaterialShader.prototype.getFragmentShaderString = function () {
            var $str = 
            //"#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
            //"precision highp float;\n" +
            //" #else\n" +
            //" precision mediump float;\n" +
            //" #endif\n" +
            "uniform sampler2D s_texture1;\n" +
                //"uniform sampler2D light_texture;\n" +
                "uniform vec4 testconst;" +
                "varying vec2 v_texCoord;\n" +
                //"varying vec2 v_texLight;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                //"if (infoUv.a <= 0.9) {\n" +
                //"     discard;\n" +
                //"}\n" +
                //"vec4 infoLight = texture2D(light_texture, v_texLight);\n" +
                //"vec4 test = vec4(0.5,0,0,1);\n" +
                "infoUv.xyz = testconst.xyz * infoUv.xyz;\n" +
                //"info.rgb = info.rgb / 0.15;\n" +
                "gl_FragColor = infoUv;\n" +
                "}";
            return $str;
        };
        MaterialShader.MATERIAL_SHADER = "Material_shader";
        return MaterialShader;
    }(Pan3d.Shader3D));
    Pan3d.MaterialShader = MaterialShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MaterialShader.js.map