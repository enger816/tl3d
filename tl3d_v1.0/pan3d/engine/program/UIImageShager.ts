module Pan3d {
    export class UIImageShader extends Shader3D {
        static UI_IMG_SHADER: string = "UI_img_Shader";
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
                "attribute vec2 v2uv;" +
                "uniform vec2 scale;" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(v2uv.x, v2uv.y);" +
                "   vec4 vt0= vec4(v3Pos.x*scale.x,v3Pos.y*scale.y,v3Pos.z,1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "uniform float alpha;" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +

                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "infoUv.w = alpha;\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +


                "}"
            return $str

        }

    }
}