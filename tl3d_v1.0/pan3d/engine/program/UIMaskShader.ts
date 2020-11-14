module Pan3d {
    export class UIMaskShader extends Shader3D {
        static UI_MASK_SHADER: string = "UImaskShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "uniform vec4 ui;" +

                "void main(void)" +
                "{" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy * ui.zw * 2.0;" +
                "   pos.x += ui.x * 2.0 - 1.0;" +
                "   pos.y += -ui.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +

                "void main(void)\n" +
                "{\n" +

                "gl_FragColor = vec4(0.5,0.5,0.5,1.0);\n" +


                "}"
            return $str

        }

    }
}