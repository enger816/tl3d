import { ResGC } from "../base/ResGC";
import { Shader3D } from "./Shader3D";
import { Material } from "../material/Material";
export declare class ProgramManager extends ResGC {
    private static _instance;
    constructor();
    static getInstance(): ProgramManager;
    getProgram($str: string): Shader3D;
    registe($str: any, $shader3D: Shader3D): void;
    getMaterialProgram(key: String, shaderCls: any, $material: Material, paramAry?: any, parmaByFragmet?: boolean): Shader3D;
    outShader($str: string): void;
    gc(): void;
}
