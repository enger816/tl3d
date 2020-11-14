import { LayaOverride2dSceneManager } from "./LayaOverride2dSceneManager";
import { GroupRes } from "../../../tl3d/engine/utils/res/GroupRes";
import { GroupDataManager } from "../../../tl3d/engine/utils/GroupDataManager";
export declare class LayaGroupRes extends GroupRes {
    constructor();
    scene: LayaOverride2dSceneManager;
    readParticle(): void;
}
export declare class LayaOverrideGroupDataManager extends GroupDataManager {
    scene: LayaOverride2dSceneManager;
    getGroupData($url: string, $fun: Function): void;
}
