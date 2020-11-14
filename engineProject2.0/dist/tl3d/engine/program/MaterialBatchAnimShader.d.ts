import { Shader3D } from "./Shader3D";
export declare class MaterialBatchAnimShader extends Shader3D {
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
