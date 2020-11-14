import { Shader3D } from "../../program/Shader3D";
import { Display3DParticle } from "../Display3DParticle";
import { ParticleBoneData } from "./ParticleBoneData";
export declare class Display3DBoneShader extends Shader3D {
    static Display3DBoneShader: string;
    constructor();
    binLocation($context: Laya.WebGLContext): void;
    static shader_mat4: {
        viewMatrix3D: number;
        camMatrix3D: number;
        posMatrix3D: number;
    };
    getMat4Str(key: string): string;
    static getVcSize(): number;
    getVertexShaderString(): string;
    getFragmentShaderString(): string;
}
export declare class Display3DBonePartilce extends Display3DParticle {
    constructor();
    get modeldata(): ParticleBoneData;
    creatData(): void;
    update(): void;
    private skipNum;
    setVc(): void;
    setVa(): void;
    resetVa(): void;
}
