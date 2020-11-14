import { SceneChar } from "../../tl3d/baseprite/SceneChar";
export declare class ModelSceneChar extends SceneChar {
    setWeaponByAvatar(avatar: number, $suffix?: string): void;
    setWingByID($wingId: number): void;
    setMountById($mountId: number): void;
}
