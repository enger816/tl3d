import { Shader3D } from "./Shader3D";
export declare class BuildShader extends Shader3D {
    static buildShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
