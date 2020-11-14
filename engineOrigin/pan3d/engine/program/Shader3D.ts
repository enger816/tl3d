interface IShader {

    getVertexShaderString(): string
    getFragmentShaderString(): string
    encode($context: WebGLRenderingContext): void
    binLocation($context: WebGLRenderingContext): void
}

module Pan3d {
    export class Shader3D extends ResCount implements IShader {
        public vertex: string
        public fragment: string
        public name: string;
        public program: WebGLProgram;
        public vShader: WebGLShader;
        public fShader: WebGLShader;
        public paramAry: Array<any>;
        public localDic: Object;
        constructor() {
            super();
            this.fragment = this.getFragmentShaderString()
        }
        public encode(): boolean {
            this.vertex = this.getVertexShaderString();
            ////console.log(this.vertex);

            var $context: WebGLRenderingContext = Scene_data.context3D.renderContext;

            this.program = $context.createProgram();
            this.vShader = $context.createShader($context.VERTEX_SHADER);
            this.fShader = $context.createShader($context.FRAGMENT_SHADER);

            $context.shaderSource(this.vShader, this.vertex);
            $context.shaderSource(this.fShader, this.fragment);

            $context.compileShader(this.vShader);
            $context.compileShader(this.fShader);

            $context.attachShader(this.program, this.vShader);
            $context.attachShader(this.program, this.fShader);

            this.binLocation($context);
            $context.linkProgram(this.program);
            //Scene_data.context3D.addProgram(this.program);

            this.localDic = new Object();


            var info: string = $context.getProgramInfoLog(this.program);
            var vInfo: string = $context.getShaderInfoLog(this.vShader);
            var fInfo: string = $context.getShaderInfoLog(this.fShader);

            if (info != "") {
                if (vInfo == "" && fInfo == "") {
                    return true;
                }
                //console.log("shader error: " + info + "," + vInfo + "," + fInfo);
                return false;
            } else {
                return true;
            }

        }

        public getWebGLUniformLocation($name: string): WebGLUniformLocation {
            var local: WebGLUniformLocation = this.localDic[$name];
            if (local) {
                return local;
            } else {
                this.localDic[$name] = Scene_data.context3D.getLocation(this.program, $name);
                return this.localDic[$name];
            }
        }

        binLocation($context: WebGLRenderingContext): void {

        }
        getVertexShaderString(): string {
            return ""
        }
        getFragmentShaderString(): string {
            return ""
        }
        public destory(): void {
            this.vertex = null;
            this.fragment = null;
            this.name = null;
            this.localDic = null;
            Scene_data.context3D.deleteShader(this);
        }
    }
}