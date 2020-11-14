import { SkillKey } from "./SkillKey";
import { Object3D } from "../../base/Object3D";
export declare class SkillEffect extends SkillKey {
    active: Object3D;
    addToRender(): void;
    protected onPlayCom(event?: Event): void;
}
