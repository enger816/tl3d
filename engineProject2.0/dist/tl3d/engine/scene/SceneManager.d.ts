import { Display3D } from "../display3D/Display3D";
import { Display3DSprite } from "../display3D/Display3DSprite";
import { CombineParticle } from "../particle/CombineParticle";
import { Display3dMovie } from "../display3D/Display3dMovie";
import { Vector2D } from "../math/Vector2D";
import { ViewFrustum } from "./ViewFrustum";
export declare class SceneManager {
    static _instance: any;
    static getInstance(): SceneManager;
    get displayList(): Array<Display3D>;
    protected _displayList: Array<Display3D>;
    protected _display2DList: Array<Display3D>;
    protected _displaySpriteList: Array<Display3DSprite>;
    protected _displayRoleList: Array<Display3dMovie>;
    protected _sceneParticleList: Array<CombineParticle>;
    protected _time: number;
    protected _ready: boolean;
    render: boolean;
    private _sceneDic;
    private _sceneQuadTree;
    viewFrustum: ViewFrustum;
    private _currentUrl;
    constructor();
    get displayRoleList(): Array<Display3dMovie>;
    get displaySpriteList(): Array<Display3DSprite>;
    clearScene(): void;
    clearStaticScene(): void;
    testUrl($url: string): boolean;
    loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void;
    getDisplayByID($type: number, $id: number): any;
    fixAstart(pos: Vector2D): void;
    loadSceneConfigCom(obj: any): void;
    private getGroundSprite;
    private makeCollisioin;
    set ready($value: boolean);
    get ready(): boolean;
    private getBuildSprite;
    private getParticleSprite;
    private initScene;
    addDisplay($display: Display3D): void;
    removeDisplay($display: Display3D): void;
    /**
     * 动态添加的staticMesh 物件例如武器等
    */
    addSpriteDisplay($display: Display3DSprite): void;
    removeSpriteDisplay($display: Display3DSprite): void;
    /**
     * 动态添加的骨骼动画角色
     */
    addMovieDisplay($display: Display3dMovie): void;
    addMovieDisplayTop($display: Display3dMovie): void;
    removeMovieDisplay($display: Display3dMovie): void;
    private setParticleVisible;
    addDisplay2DList($dis: Display3D): void;
    private mathCamFar;
    protected updateStaticDiplay(): void;
    protected updateStaticBind(): void;
    protected updateSpriteDisplay(): void;
    protected updateMovieDisplay(): void;
    protected updateMovieFrame(): void;
}
