import { Shader3D } from "../../program/Shader3D";
export declare class Display3DFollowLocusShader extends Shader3D {
    static Display3D_FollowLocus_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
    };
    static shader_vec4: {
        camPos: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
