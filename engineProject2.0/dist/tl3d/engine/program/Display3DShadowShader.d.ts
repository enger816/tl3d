import { Shader3D } from "./Shader3D";
export declare class Display3DShadowShader extends Shader3D {
    static Display3DShadowShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
