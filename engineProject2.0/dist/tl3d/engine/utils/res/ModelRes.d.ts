import { BaseRes } from "./BaseRes";
import { LightVo } from "../../vo/LightVo";
export declare class ModelRes extends BaseRes {
    private _fun;
    objUrl: string;
    light: LightVo;
    materialUrl: string;
    load(url: string, $fun: Function): void;
    loadComplete($byte: ArrayBuffer): void;
    private readNexte;
}
