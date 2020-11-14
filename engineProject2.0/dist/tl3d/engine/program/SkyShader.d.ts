import { Shader3D } from "./Shader3D";
export declare class SkyShader extends Shader3D {
    static Sky_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
