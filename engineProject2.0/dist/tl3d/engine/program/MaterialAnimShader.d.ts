import { Shader3D } from "./Shader3D";
export declare class MaterialAnimShader extends Shader3D {
    static MATERIAL_ANIM_SHADER: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static getMd5M44Str(): string;
    static getMd5M44NrmStr(): string;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
