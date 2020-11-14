import { ResGC } from "../base/ResGC";
export declare class GroupDataManager extends ResGC {
    protected _loadDic: Object;
    private static _instance;
    static getInstance(): GroupDataManager;
    getGroupData($url: string, $fun: Function): void;
}
