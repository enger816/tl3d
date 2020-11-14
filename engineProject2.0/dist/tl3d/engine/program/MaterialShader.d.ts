import { Shader3D } from "./Shader3D";
export declare class MaterialShader extends Shader3D {
    static MATERIAL_SHADER: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    outstr(str: string): void;
    getFragmentShaderString(): string;
}
