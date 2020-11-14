import { Display3dMovie } from "../engine/display3D/Display3dMovie";
export declare class SceneBaseChar extends Display3dMovie {
    private _avatar;
    _visible: boolean;
    get visible(): boolean;
    set visible(value: boolean);
    setAvatar(num: number): void;
    update(): void;
    protected getSceneCharAvatarUrl(num: number): string;
    protected getSceneCharWeaponUrl(num: number, $suffix?: string): string;
}
