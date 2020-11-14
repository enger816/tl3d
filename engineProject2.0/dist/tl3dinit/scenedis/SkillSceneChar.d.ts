import { SceneChar } from "../../tl3d/baseprite/SceneChar";
export declare class SkillSceneChar extends SceneChar {
    onMeshLoaded(): void;
    loadFinishFun: Function;
    changeActionFun: Function;
    changeAction($action: string): void;
    setWeaponByAvatar(avatar: number, $suffix?: string): void;
}
