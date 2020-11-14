module Pan3d {
    export class Sprite2DShader extends Shader3D {
        static SPRITE2D_SHADER: string = "Sprite2DShader";
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

                "uniform mat4 viewMatrix3D;\n" +
                "uniform mat4 camMatrix3D;\n" +
                "uniform mat4 watchCamMatrix3D;\n" +

                "uniform vec4 posdata[12];" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                "   vec4 data = posdata[int(v2uv.z)];" +
                "   vec4 vt0= vec4(v3Pos * data.w,1.0);" +
                "   vt0= watchCamMatrix3D * vt0;" +
                "   vt0.xyz += data.xyz;" +
                "   v_texCoord = vec2(v2uv.x,v2uv.y);" +


                "   gl_Position = viewMatrix3D * camMatrix3D * vt0;" +
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
                "if(infoUv.w < 0.1){discard;}\n" +
                "gl_FragColor = infoUv;\n" +


                "}"
            return $str

        }
    }
}