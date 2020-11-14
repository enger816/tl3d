import { ResGC } from "../../base/ResGC";
import { SceneRes } from "../../scene/SceneRes";
export declare class ResManager extends ResGC {
    private static _instance;
    static getInstance(): ResManager;
    loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void;
    loadSkillRes(url: string, $fun: Function): void;
    loadSceneRes($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): SceneRes;
    clearSceneUse(curRes: SceneRes): void;
    gc(): void;
}
