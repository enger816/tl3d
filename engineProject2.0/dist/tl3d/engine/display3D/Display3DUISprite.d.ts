import { Display3DSprite } from "./Display3DSprite";
export declare class Display3DUISprite extends Display3DSprite {
    private uiMatrix;
    private uiViewMatrix;
    private modelRes;
    constructor();
    private loadRes;
    loadResComFinish(): void;
    loadGroup($name: string): void;
    private loadPartRes;
    resize(): void;
    setCam(): void;
    update(): void;
}
