import { ResCount } from "../base/ResCount";
export declare class Shader3D extends ResCount implements IShader {
    vertex: string;
    fragment: string;
    name: string;
    program: WebGLProgram;
    vShader: WebGLShader;
    fShader: WebGLShader;
    paramAry: Array<any>;
    localDic: Object;
    constructor();
    encode(): boolean;
    getWebGLUniformLocation($name: string): WebGLUniformLocation;
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
    destory(): void;
}
interface IShader {
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
    encode($context: Laya.WebGLContext): void;
    binLocation($context: Laya.WebGLContext): void;
}
export {};
