import { Shader3D } from "../../program/Shader3D";
export declare class Display3DFollowShader extends Shader3D {
    static Display3D_Follow_Shader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        modelMatrix: number;
        watheye: number;
        rotationMatrix: number;
    };
    static shader_vec4: {
        time: number[];
        scale: number[];
        scaleCtrl: number[];
        force: number[];
        worldPos: number[];
        camPos: number[];
        animCtrl: number[];
        uvCtrl: number[];
    };
    getMat4Str(key: string): string;
    getVec4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
