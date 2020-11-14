import { UnitFunction } from "../../tl3d/UnitFunction";
import { SceneManager } from "../../tl3d/engine/scene/SceneManager";
import { CharAction } from "../../tl3d/baseprite/CharAction";
import { ModelSceneChar } from "./ModelSceneChar";

export class CharModelShow {
    constructor() {
        this.addModelChar()
    }

    private addModelChar(): void {
        var $sc: ModelSceneChar = new ModelSceneChar();
        $sc.setRoleUrl(UnitFunction.getRoleUrl(50003));
        $sc.setWingByID(901);
        $sc.setMountById(4103);
        $sc.setWeaponByAvatar(50011);
        $sc.play(CharAction.STAND_MOUNT);

        SceneManager.getInstance().addMovieDisplay($sc);
    }
}