import { Scene_data } from "../context/Scene_data";
import { ResCount } from "../base/ResCount";



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
        var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;

        this.program = gl.createProgram();
        this.vShader = gl.createShader(gl.VERTEX_SHADER);
        this.fShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(this.vShader, this.vertex);
        gl.shaderSource(this.fShader, this.fragment);

        gl.compileShader(this.vShader);
        gl.compileShader(this.fShader);

        gl.attachShader(this.program, this.vShader);
        gl.attachShader(this.program, this.fShader);

        this.binLocation(gl);
        gl.linkProgram(this.program);
        //Scene_data.context3D.addProgram(this.program);

        this.localDic = new Object();


        var info: string = gl.getProgramInfoLog(this.program);
        var vInfo: string = gl.getShaderInfoLog(this.vShader);
        var fInfo: string = gl.getShaderInfoLog(this.fShader);

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

    binLocation(gl: WebGLRenderingContext): void {

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

interface IShader {

    getVertexShaderString(): string
    getFragmentShaderString(): string
    encode(gl: WebGLRenderingContext): void
    binLocation(gl: WebGLRenderingContext): void
}