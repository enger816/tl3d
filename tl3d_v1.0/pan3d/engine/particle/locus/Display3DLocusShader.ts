module Pan3d {
    export class Display3DLocusShader extends Shader3D {
        static Display3D_Locus_Shader: string = "Display3DLocusShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
            if (this.paramAry[0]) {
                $context.bindAttribLocation(this.program, 2, "v3Normal");
            }
        }
        public static shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, posMatrix3D: 2 };
        public static shader_vec4 = { uvMove: [3, 0], camPos: [3, 1], isUv: [3, 2] };
        public getMat4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_mat4[key] + "]";
        }
        public getVec4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DLocusShader.shader_vec4[key][0] + "][" + Display3DLocusShader.shader_vec4[key][1] + "]";
        }
        public static getVcSize(): number {
            return 4;
        }
        getVertexShaderString(): string {
            var defineBaseStr: string =
                "attribute vec4 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
                "uniform mat4 vcmat[" + Display3DFacetShader.getVcSize() + "];\n" +//所有vc值
                //"uniform mat4 viewMatrix3D;\n" +
                //"uniform mat4 camMatrix3D;\n" +
                //"uniform mat4 posMatrix3D;\n" +
                // "uniform vec3 uvMove;\n" +

                "varying vec2 v0;\n" +
                "varying vec4 v2;\n";
            var defineWachtStr: string =
                "attribute vec4 v3Normal;\n"// +
            //"uniform vec3 camPos;\n";
            var defineUvStr: string = ""
            //"uniform vec3 isUv;\n";
            var defineParticleColor: string =
                "varying vec2 v1;\n";

            var baseStr: string =
                "   vec2 tempv0 = v2TexCoord;\n" +
                "   tempv0.x -= " + this.getVec4Str("uvMove") + ".x;\n";
            var particleColorStr: string =
                "   v1 = v2TexCoord;\n";
            var baseUvStr: string =
                "   v0 = tempv0;\n";
            var uvStr: string =
                "   tempv0.xy *= " + this.getVec4Str("isUv") + ".xy;\n" +
                "   if(" + this.getVec4Str("isUv") + ".z >= 0.0){\n" +
                "   vec2 tempv1 = tempv0;\n" +
                "   tempv0.y = tempv1.x;\n" +
                "   tempv0.x = tempv1.y;}\n" +
                "   v0 = tempv0;\n";


            var killStr: string =
                "   float alpha = tempv0.x/" + this.getVec4Str("uvMove") + ".y;\n" +
                "   alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n" +

                "   float kill = -tempv0.x;\n" +
                "   kill *= tempv0.x - " + this.getVec4Str("uvMove") + ".z;\n" +
                "   v2 = vec4(kill,0.0,0.0,alpha);\n";
            var posStr: string =
                "   gl_Position = " + this.getMat4Str("viewMatrix3D") + "  * " + this.getMat4Str("camMatrix3D") + " * " + this.getMat4Str("posMatrix3D") + " * v3Position;\n";
            var watchPosStr: string =
                "   vec4 tempPos = " + this.getMat4Str("posMatrix3D") + " * v3Position;\n" +
                "   vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n" +
                "   vec3 normals = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n" +
                "   mulPos = normalize(vec3(" + this.getVec4Str("camPos") + ".xyz) - mulPos);\n" +
                "   mulPos = cross(mulPos, normals);\n" +
                "   mulPos = normalize(mulPos);\n" +
                "   mulPos *= v3Normal.w;\n" +
                "   tempPos.xyz = mulPos.xyz + v3Position.xyz;\n" +
                "   gl_Position = " + this.getMat4Str("viewMatrix3D") + "  * " + this.getMat4Str("camMatrix3D") + " * " + this.getMat4Str("posMatrix3D") + " * tempPos;\n";

            var isWatchEye: boolean = this.paramAry[0];
            var isUV: boolean = this.paramAry[1];
            var hasParticleColor: boolean = this.paramAry[2];

            var defineStr: string = defineBaseStr;

            if (isWatchEye) {
                defineStr += defineWachtStr;
            }
            if (isUV) {
                defineStr += defineUvStr;
            }
            if (hasParticleColor) {
                defineStr += defineParticleColor;
            }

            var mainStr: string = baseStr + killStr;

            if (hasParticleColor) {
                mainStr += particleColorStr;
            }

            if (isUV) {
                mainStr += uvStr;
            } else {
                mainStr += baseUvStr;
            }

            if (isWatchEye) {
                mainStr += watchPosStr;
            } else {
                mainStr += posStr;
            }


            var resultStr: string = defineStr + "void main(void){\n" + mainStr + "}";

            return resultStr;

        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "uniform sampler2D tex;\n" +
                "varying vec2 v0;\n" +

                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(tex, v0.xy);\n" +
                "gl_FragColor = infoUv;\n" +
                "}"
            return $str;

        }

    }
}