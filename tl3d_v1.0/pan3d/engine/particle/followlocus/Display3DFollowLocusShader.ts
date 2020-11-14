module Pan3d {
    export class Display3DFollowLocusShader extends Shader3D {
        static Display3D_FollowLocus_Shader: string = "Display3DFollowLocusShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
        }
        public static shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1 };
        public static shader_vec4 = { camPos: [2, 0] };
        public getMat4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DFollowLocusShader.shader_mat4[key] + "]";
        }
        public getVec4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DFollowLocusShader.shader_vec4[key][0] + "][" + Display3DFollowLocusShader.shader_vec4[key][1] + "]";
        }
        public static getVcSize(): number {
            return 3;
        }
        getVertexShaderString(): string {

            var defineBaseStr: string =
                "attribute vec3 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
                "uniform mat4 vcmat[" + Display3DFacetShader.getVcSize() + "];\n" +//所有vc值
                // "uniform mat4 viewMatrix3D;\n" +
                // "uniform mat4 camMatrix3D;\n" +
                // "uniform vec3 camPos;\n" +
                "uniform vec3 bindpos[30];\n" +
                "varying vec2 v0;\n";

            var watchPosStr: string =
                "   vec3 cpos = bindpos[int(v3Position.x)];\n" +
                "   vec3 mulPos = normalize(vec3(" + this.getVec4Str("camPos") + ".xyz) - cpos);\n" +
                "   vec3 normals = bindpos[int(v3Position.y)];\n" +
                "   mulPos = cross(mulPos, normals);\n" +
                "   mulPos = normalize(mulPos);\n" +
                "   mulPos *= v3Position.z;\n" +
                "   cpos += mulPos;\n" +
                "   gl_Position = " + this.getMat4Str("viewMatrix3D") + "  * " + this.getMat4Str("camMatrix3D") + " * vec4(cpos,1.0);\n";

            var uvStr: string =
                "v0 = v2TexCoord;\n";

            var resultAllStr: string = defineBaseStr + "void main(){\n" + watchPosStr + uvStr + "}";

            return resultAllStr;

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