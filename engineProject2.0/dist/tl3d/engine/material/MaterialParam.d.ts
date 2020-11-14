import { MaterialBaseParam } from "./MaterialBaseParam";
import { Shader3D } from "../program/Shader3D";
import { Material } from "./Material";
export declare class MaterialParam extends MaterialBaseParam {
    materialUrl: string;
    program: WebGLProgram;
    shader: Shader3D;
    constructor();
    destory(): void;
    setMaterial($materialTree: Material): void;
    setLife($life: number): void;
    setTexList(): void;
    setConstList(): void;
    setTextObj(ary: Array<any>): void;
    setConstObj(ary: Array<any>): void;
}
