import { Shader3D } from "./Shader3D";
export declare class TerrainDisplay3DShader extends Shader3D {
    static TerrainDisplay3DShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
