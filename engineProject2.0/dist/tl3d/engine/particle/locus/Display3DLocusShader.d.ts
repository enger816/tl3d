import { Shader3D } from "../../program/Shader3D";
export declare class Display3DLocusShader extends Shader3D {
    static Display3D_Locus_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        posMatrix3D: number;
    };
    static shader_vec4: {
        uvMove: number[];
        camPos: number[];
        isUv: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
