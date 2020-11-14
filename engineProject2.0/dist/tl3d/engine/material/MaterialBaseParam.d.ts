import { GC } from "../base/GC";
import { Material } from "./Material";
export declare class MaterialBaseParam extends GC {
    material: Material;
    dynamicTexList: Array<any>;
    dynamicConstList: Array<any>;
    destory(): void;
    update(): void;
    setData($material: Material, $ary: Array<any>): void;
}
