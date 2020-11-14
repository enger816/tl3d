import { QuadTreeNode } from "./QuadTreeNode";
export declare class SceneQuadTree {
    private _sceneDic;
    private _rootNode;
    private _circle;
    private _lastx;
    private _lastz;
    needUpdata: boolean;
    private panleAry;
    private _ray;
    init(obj: any, $dic: Object): void;
    getNode(obj: any): QuadTreeNode;
    setCircle($x: number, $z: number, $radius: number): void;
    update(): void;
    private getPanelByVec;
    private capsuleLineSprite;
    updateDraw(): void;
    private drawCylinder;
}
