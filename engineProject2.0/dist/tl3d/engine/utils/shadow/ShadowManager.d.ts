import { Shadow } from "./Shadow";
export declare class ShadowManager {
    private static _instance;
    static getInstance(): ShadowManager;
    private _displayList;
    constructor();
    addShadow(): Shadow;
    removeShadow(sd: Shadow): void;
    update(): void;
    private getIdleShadow;
}
