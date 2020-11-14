module Pan3d {
    export class MaterialBatchAnimShader extends Shader3D {
        constructor() {
            super();
            this.name = "Material_Batch_Anim_Shader";
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "pos");
            $context.bindAttribLocation(this.program, 1, "v2Uv");
            $context.bindAttribLocation(this.program, 2, "boneID");
            $context.bindAttribLocation(this.program, 3, "boneWeight");

            var usePbr: boolean = this.paramAry[0];
            var useNormal: boolean = this.paramAry[1];
            var lightProbe: boolean = this.paramAry[4];
            var directLight: boolean = this.paramAry[5];

            if (usePbr) {
                $context.bindAttribLocation(this.program, 4, "normal");
                if (useNormal) {
                    $context.bindAttribLocation(this.program, 5, "tangent");
                    $context.bindAttribLocation(this.program, 6, "bitangent");
                }
            } else if (lightProbe || directLight) {
                $context.bindAttribLocation(this.program, 4, "normal");
            }

        }
        getVertexShaderString(): string {

            var usePbr: boolean = this.paramAry[0];
            var useNormal: boolean = this.paramAry[1];
            var hasFresnel: boolean = this.paramAry[2];
            var useDynamicIBL: boolean = this.paramAry[3];
            var lightProbe: boolean = this.paramAry[4];
            var directLight: boolean = this.paramAry[5];
            var noLight: boolean = this.paramAry[6];

            var $str: string =
                "precision mediump float;\n" +
                "attribute vec4 pos;\n" +
                "attribute vec3 v2Uv;\n" +
                "attribute vec4 boneID;\n" +
                "attribute vec4 boneWeight;\n" +


                "varying vec2 v0;\n" +

                "uniform mat4 bone[19];\n" +
                "uniform mat4 viewMatrix3D;\n" +
                "uniform mat4 camMatrix3D;\n" +
                "uniform mat4 posMatrixAry[6];\n";

            if (lightProbe) {
                $str +=
                    "varying vec3 v2;\n"
            } else if (directLight) {
                $str +=
                    "uniform vec3 sunDirect;\n" +
                    "uniform vec3 sunColor;\n" +
                    "uniform vec3 ambientColor;\n" +
                    "varying vec3 v2;\n"
            } else if (noLight) {

            } else {
                $str +=
                    "varying vec2 v2;\n"
            }

            if (usePbr) {
                $str +=
                    "attribute vec4 normal;\n" +
                    "uniform mat4 rotationMatrix3D;\n" +
                    "varying vec3 v1;\n";
                if (!useNormal) {
                    $str += "varying vec3 v4;\n";
                } else {
                    $str += "varying mat3 v4;\n";
                }

                if (useNormal) {
                    $str +=
                        "attribute vec4 tangent;\n" +
                        "attribute vec4 bitangent;\n";
                }
            } else if (lightProbe || directLight) {
                $str +=
                    "attribute vec4 normal;\n" +
                    "uniform mat4 rotationMatrix3D;\n";
            }

            $str +=
                "void main(void){\n" +

                "v0 = vec2(v2Uv.xy);\n" +


                "vec4 vt0 = bone[int(boneID.x)] * pos * boneWeight.x;\n" +
                "vt0 += bone[int(boneID.y)] * pos * boneWeight.y;\n" +
                "vt0 += bone[int(boneID.z)] * pos * boneWeight.z;\n" +
                "vt0 += bone[int(boneID.w)] * pos * boneWeight.w;\n" +
                "vt0 = posMatrixAry[int(v2Uv.z)] * vt0;\n";
            if (usePbr) {
                $str +=
                    "v1 = vec3(vt0.x,vt0.y,vt0.z);\n"
            }

            $str +=
                "vt0 = camMatrix3D * vt0;\n" +
                "vt0 = viewMatrix3D * vt0;\n" +
                "gl_Position = vt0;\n";
            if (usePbr) {
                if (!useNormal) {
                    $str +=
                        "vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
                        "vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
                        "vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
                        "vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
                        "vt0 = rotationMatrix3D * vt0;\n" +
                        "vt0.xyz = normalize(vt0.xyz);\n" +
                        "v4 = vec3(vt0.x,vt0.y,vt0.z);\n";
                } else {
                    $str +=
                        "vec4 vt2 = bone[int(boneID.x)] * tangent * boneWeight.x;\n" +
                        "vt2 += bone[int(boneID.y)] * tangent * boneWeight.y;\n" +
                        "vt2 += bone[int(boneID.z)] * tangent * boneWeight.z;\n" +
                        "vt2 += bone[int(boneID.w)] * tangent * boneWeight.w;\n" +
                        "vt2 = rotationMatrix3D * vt2;\n" +
                        "vt2.xyz = normalize(vt2.xyz);\n" +

                        "vec4 vt1 = bone[int(boneID.x)] * bitangent * boneWeight.x;\n" +
                        "vt1 += bone[int(boneID.y)] * bitangent * boneWeight.y;\n" +
                        "vt1 += bone[int(boneID.z)] * bitangent * boneWeight.z;\n" +
                        "vt1 += bone[int(boneID.w)] * bitangent * boneWeight.w;\n" +
                        "vt1 = rotationMatrix3D * vt1;\n" +
                        "vt1.xyz = normalize(vt1.xyz);\n" +

                        "vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
                        "vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
                        "vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
                        "vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
                        "vt0 = rotationMatrix3D * vt0;\n" +
                        "vt0.xyz = normalize(vt0.xyz);\n" +

                        "v4 = mat3(vec3(vt2.x,vt2.y,vt2.z),vec3(vt1.x,vt1.y,vt1.z),vec3(vt0.x,vt0.y,vt0.z));\n"
                }
            } else if (lightProbe || directLight) {
                $str +=
                    "vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
                    "vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
                    "vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
                    "vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
                    "vt0 = rotationMatrix3D * vt0;\n" +
                    "vt0.xyz = normalize(vt0.xyz);\n";
                //"vt0 = vec4(0,1,0,1);\n";
            }

            if (lightProbe) {
                $str +=
                    "vec3 lpb = normalize(vec3(1.0,1.0,-1.0));\n" +
                    "float lp = min(0.0,dot(lpb,vec3(vt0.xyz)));\n" +
                    "lp = lp * 2.0 + 0.7;\n" +
                    "v2 = vec3(lp,lp,lp);\n";
            } else if (directLight) {
                $str +=
                    "float suncos = dot(vt0.xyz,sunDirect.xyz);\n" +
                    "suncos = clamp(suncos,0.0,1.0);\n" +
                    "v2 = sunColor * suncos + ambientColor;";
                //"v2 = sunColor * suncos;"
            } else if (noLight) {

            } else {
                $str +=
                    "v2 = v2Uv;\n"
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


        }
        getFragmentShaderString(): string {
            var $str: string =

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
                "}"
            return $str

        }
    }
}