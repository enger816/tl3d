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
    var MaterialAnimShader = /** @class */ (function (_super) {
        __extends(MaterialAnimShader, _super);
        function MaterialAnimShader() {
            var _this = _super.call(this) || this;
            _this.name = "Material_Anim_shader";
            return _this;
        }
        MaterialAnimShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "pos");
            $context.bindAttribLocation(this.program, 1, "v2Uv");
            $context.bindAttribLocation(this.program, 2, "boneID");
            $context.bindAttribLocation(this.program, 3, "boneWeight");
            var usePbr = this.paramAry[0];
            var useNormal = this.paramAry[1];
            var lightProbe = this.paramAry[4];
            var directLight = this.paramAry[5];
            if (usePbr) {
                $context.bindAttribLocation(this.program, 4, "normal");
                if (useNormal) {
                    $context.bindAttribLocation(this.program, 5, "tangent");
                    $context.bindAttribLocation(this.program, 6, "bitangent");
                }
            }
            else if (lightProbe || directLight) {
                $context.bindAttribLocation(this.program, 4, "normal");
            }
        };
        MaterialAnimShader.getMd5M44Str = function () {
            var str = "vec4 qdv(vec4 q,vec3 d, vec3 v ){\n" +
                "vec3 t = 2.0 * cross(q.xyz, v);\n" +
                "vec3 f = v + q.w * t + cross(q.xyz, t);\n" +
                "return  vec4(f.x+d.x,f.y+d.y,f.z+d.z,1.0);\n" +
                " }\n" +
                "vec4 getQDdata(vec3 vdata){\n" +
                "vec4 tempnum = qdv(boneQ[int(boneID.x)],boneD[int(boneID.x)],vdata) * boneWeight.x;\n" +
                "tempnum += qdv(boneQ[int(boneID.y)],boneD[int(boneID.y)],vdata) * boneWeight.y;\n" +
                "tempnum += qdv(boneQ[int(boneID.z)],boneD[int(boneID.z)],vdata)* boneWeight.z;\n" +
                "tempnum += qdv(boneQ[int(boneID.w)],boneD[int(boneID.w)],vdata) * boneWeight.w;\n" +
                "tempnum.x = tempnum.x*-1.0;\n" +
                "return  tempnum;\n" +
                " }\n";
            return str;
        };
        MaterialAnimShader.getMd5M44NrmStr = function () {
            var str = "vec4 qdvNrm(vec4 q, vec3 v ){\n" +
                "vec3 t = 2.0 * cross(q.xyz, v);\n" +
                "vec3 f = v + q.w * t + cross(q.xyz, t);\n" +
                "return  vec4(f.x,f.y,f.z,1.0);\n" +
                " }\n" +
                "vec4 getQDdataNrm(vec3 vdata){\n" +
                "vec4 tempnum = qdvNrm(boneQ[int(boneID.x)],vdata) * boneWeight.x;\n" +
                "tempnum += qdvNrm(boneQ[int(boneID.y)],vdata) * boneWeight.y;\n" +
                "tempnum += qdvNrm(boneQ[int(boneID.z)],vdata)* boneWeight.z;\n" +
                "tempnum += qdvNrm(boneQ[int(boneID.w)],vdata) * boneWeight.w;\n" +
                "tempnum.x = tempnum.x*-1.0;\n" +
                "tempnum.xyz = normalize(tempnum.xyz);\n" +
                "return  tempnum;\n" +
                " }\n";
            return str;
        };
        MaterialAnimShader.prototype.getVertexShaderString = function () {
            var usePbr = this.paramAry[0];
            var useNormal = this.paramAry[1];
            var hasFresnel = this.paramAry[2];
            var useDynamicIBL = this.paramAry[3];
            var lightProbe = this.paramAry[4];
            var directLight = this.paramAry[5];
            var noLight = this.paramAry[6];
            var $str = "attribute vec4 pos;\n" +
                "attribute vec2 v2Uv;\n" +
                "attribute vec4 boneID;\n" +
                "attribute vec4 boneWeight;\n" +
                "varying vec2 v0;\n" +
                "uniform vec4 boneQ[54];\n" +
                "uniform vec3 boneD[54];\n" +
                //"uniform mat4 viewMatrix3D;\n" +
                // "uniform mat4 camMatrix3D;\n" +
                "uniform mat4 vpMatrix3D;\n" +
                "uniform mat4 posMatrix3D;\n";
            if (lightProbe) {
                $str +=
                    "uniform vec3 sh[9];\n" +
                        "varying vec3 v2;\n";
            }
            else if (directLight) {
                $str +=
                    "uniform vec3 sunDirect;\n" +
                        "uniform vec3 sunColor;\n" +
                        "uniform vec3 ambientColor;\n" +
                        "varying vec3 v2;\n";
            }
            else if (noLight) {
            }
            else {
                $str +=
                    "varying vec2 v2;\n";
            }
            if (usePbr) {
                $str +=
                    "attribute vec4 normal;\n" +
                        "uniform mat4 rotationMatrix3D;\n" +
                        "varying vec3 v1;\n";
                if (!useNormal) {
                    $str += "varying vec3 v4;\n";
                }
                else {
                    $str += "varying mat3 v4;\n";
                }
                if (useNormal) {
                    $str +=
                        "attribute vec4 tangent;\n" +
                            "attribute vec4 bitangent;\n";
                }
            }
            else if (lightProbe || directLight) {
                $str +=
                    "attribute vec4 normal;\n" +
                        "uniform mat4 rotationMatrix3D;\n";
            }
            $str +=
                MaterialAnimShader.getMd5M44Str() +
                    MaterialAnimShader.getMd5M44NrmStr() +
                    "void main(void){\n" +
                    "v0 = v2Uv;\n" +
                    "vec4 vt0 = getQDdata(vec3(pos.x,pos.y,pos.z));\n" +
                    "vt0.xyz = vt0.xyz*1.0;\n" +
                    "vt0 = posMatrix3D * vt0;\n";
            if (usePbr) {
                $str +=
                    "v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
            }
            $str +=
                //"vt0 = camMatrix3D * vt0;\n" +
                //"vt0 = viewMatrix3D * vt0;\n" +
                "vt0 = vpMatrix3D * vt0;\n" +
                    "gl_Position = vt0;\n";
            if (usePbr) {
                if (!useNormal) {
                    $str +=
                        //"vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
                        //"vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
                        //"vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
                        //"vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
                        "vt0 = getQDdataNrm(vec3(normal.x,normal.y,normal.z));\n" +
                            "vt0 = rotationMatrix3D * vt0;\n" +
                            "vt0.xyz = normalize(vt0.xyz);\n" +
                            "v4 = vec3(vt0.x,vt0.y,vt0.z);\n";
                }
                else {
                    $str +=
                        //"vec4 vt2 = bone[int(boneID.x)] * tangent * boneWeight.x;\n" +
                        //"vt2 += bone[int(boneID.y)] * tangent * boneWeight.y;\n" +
                        //"vt2 += bone[int(boneID.z)] * tangent * boneWeight.z;\n" +
                        //"vt2 += bone[int(boneID.w)] * tangent * boneWeight.w;\n" +
                        "vec4 vt2 = getQDdataNrm(vec3(tangent.x,tangent.y,tangent.z));\n" +
                            "vt2 = rotationMatrix3D * vt2;\n" +
                            "vt2.xyz = normalize(vt2.xyz);\n" +
                            //"vec4 vt1 = bone[int(boneID.x)] * bitangent * boneWeight.x;\n" +
                            //"vt1 += bone[int(boneID.y)] * bitangent * boneWeight.y;\n" +
                            //"vt1 += bone[int(boneID.z)] * bitangent * boneWeight.z;\n" +
                            //"vt1 += bone[int(boneID.w)] * bitangent * boneWeight.w;\n" +
                            "vec4 vt1 = getQDdataNrm(vec3(bitangent.x,bitangent.y,bitangent.z));\n" +
                            "vt1 = rotationMatrix3D * vt1;\n" +
                            "vt1.xyz = normalize(vt1.xyz);\n" +
                            //"vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
                            //"vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
                            //"vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
                            //"vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
                            "vt0 = getQDdataNrm(vec3(normal.x,normal.y,normal.z));\n" +
                            "vt0 = rotationMatrix3D * vt0;\n" +
                            "vt0.xyz = normalize(vt0.xyz);\n" +
                            "v4 = mat3(vec3(vt2.x,vt2.y,vt2.z),vec3(vt1.x,vt1.y,vt1.z),vec3(vt0.x,vt0.y,vt0.z));\n";
                }
            }
            else if (lightProbe || directLight) {
                $str +=
                    //"vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
                    //"vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
                    //"vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
                    //"vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
                    "vt0 = getQDdataNrm(vec3(normal.x,normal.y,normal.z));\n" +
                        "vt0 = rotationMatrix3D * vt0;\n" +
                        "vt0.xyz = normalize(vt0.xyz);\n";
                //"vt0 = vec4(0,1,0,1);\n";
            }
            if (lightProbe) {
                $str +=
                    "vec3 lpb = sh[0] * 0.28209479177387814;\n" +
                        "lpb += sh[1] * (vt0.y * -0.4886025119029199);\n" +
                        "lpb += sh[2] * (vt0.z * 0.4886025119029199);\n" +
                        "lpb += sh[3] * (vt0.x * -0.4886025119029199);\n" +
                        "lpb += sh[4] * (vt0.x * vt0.y * 1.0925484305920792);\n" +
                        "lpb += sh[5] * (vt0.z * vt0.y * -1.0925484305920792);\n" +
                        "lpb += sh[6] * ((3.0 * vt0.z * vt0.z - 1.0) * 0.31539156525252005);\n" +
                        "lpb += sh[7] * (vt0.z * vt0.x * -1.0925484305920792);\n" +
                        "lpb += sh[8] * ((vt0.x * vt0.x - vt0.y * vt0.y) * 0.5462742152960396);\n" +
                        "v2 = lpb;\n";
            }
            else if (directLight) {
                $str +=
                    "float suncos = dot(vt0.xyz,sunDirect.xyz);\n" +
                        "suncos = clamp(suncos,0.0,1.0);\n" +
                        "v2 = sunColor * suncos + ambientColor;";
                // "v2 += vec3(1.0,1.0,1.0);" 
            }
            else if (noLight) {
            }
            else {
                $str +=
                    "v2 = v2Uv;\n";
            }
            $str += "}";
            //if (usePbr) {
            //    if (!useNormal) {
            //        $str += "v4 = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n";
            //    } else {
            //        $str += 
            //        "v4 = mat3(v3Tangent,v3Bitangent,v3Normal);\n"
            //    }
            //}
            return $str;
        };
        MaterialAnimShader.prototype.getFragmentShaderString = function () {
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
        MaterialAnimShader.MATERIAL_ANIM_SHADER = "Material_Anim_shader";
        return MaterialAnimShader;
    }(Pan3d.Shader3D));
    Pan3d.MaterialAnimShader = MaterialAnimShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=MaterialAnimShader.js.map