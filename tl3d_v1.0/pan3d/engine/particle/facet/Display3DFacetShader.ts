module Pan3d {
    export class Display3DFacetShader extends Shader3D {
        static Display3D_Facet_Shader: string = "Display3DFacetShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
        }
        public static shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, rotationMatrix3D: 2, posMatrix3D: 3 };
        public static shader_vec4 = { uvMove: [4, 0] };
        public getMat4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DFacetShader.shader_mat4[key] + "]";
        }
        public getVec4Str(key: string): string {
            //return key;
            return "vcmat[" + Display3DFacetShader.shader_vec4[key][0] + "][" + Display3DFacetShader.shader_vec4[key][1] + "]";
        }
        public static getVcSize(): number {
            return 5;
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec4 v3Position;\n" +
                "attribute vec2 v2TexCoord;\n" +
                "uniform mat4 vcmat[" + Display3DFacetShader.getVcSize() + "];\n" +//所有vc值
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
                "}"
            return $str;
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