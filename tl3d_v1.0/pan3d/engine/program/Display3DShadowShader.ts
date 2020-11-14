module Pan3d {
    export class Display3DShadowShader extends Shader3D {
        static Display3DShadowShader: string = "Display3DShadowShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +

                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform vec4 pos[30];" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(v2uv.x, v2uv.y);" +
                "   vec3 vt1= vec3(v3Pos.xyz * pos[int(v2uv.z)].w + pos[int(v2uv.z)].xyz);" +
                "   vec4 vt0= vec4(vt1, 1.0);" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +

                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +

                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +


                "}"
            return $str

        }

    }
}