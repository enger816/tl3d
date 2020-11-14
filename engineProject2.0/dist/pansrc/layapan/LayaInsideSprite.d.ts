import { LayaOverride2dSceneManager } from "./overridebase/LayaOverride2dSceneManager";
export declare class Pan3dInSideLaya {
    static inited: boolean;
    static overrideMethods(): void;
}
export declare class LayaInsideSprite extends Laya.Sprite {
    private static _list;
    private static add;
    private static forEach;
    testRenderPan3d(index: number): void;
    protected _layaRenderIndex: number;
    tscene: LayaOverride2dSceneManager;
    constructor();
    protected initData(): void;
    init(texture: Laya.Texture, vb?: Array<any>, ib?: Array<any>): void;
    protected upFrame(): void;
    static saveLayaWebGLContext(): void;
    static revertLayaWebGLContext(): void;
}
