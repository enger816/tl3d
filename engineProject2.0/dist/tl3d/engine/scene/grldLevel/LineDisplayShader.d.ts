import { Shader3D } from "../../program/Shader3D";
export declare class LineDisplayShader extends Shader3D {
    static LineShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
