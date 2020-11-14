import { SceneChar } from "../../tl3d/baseprite/SceneChar";
import { SceneBaseChar } from "../../tl3d/baseprite/SceneBaseChar";
import { SceneManager } from "../../tl3d/engine/scene/SceneManager";
import { UnitFunction } from "../../tl3d/UnitFunction";
import { MountChar } from "../../tl3d/baseprite/MountChar";

export class ModelSceneChar extends SceneChar {

    public setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
        this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
    }


    public setWingByID($wingId: number): void {
        if (!this._wingDisplay) {
            this._wingDisplay = new SceneBaseChar();
        }
        this._wingDisplay.setRoleUrl(UnitFunction.getRoleUrl($wingId));
        this._wingDisplay.setBind(this, SceneChar.WING_SLOT);
        SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
    }


    public setMountById($mountId: number): void {
        if (!this.mountChar) {
            this.mountChar = new MountChar();
        }
        this.mountChar.setRoleUrl(UnitFunction.getRoleUrl($mountId));
        this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
        SceneManager.getInstance().addMovieDisplay(this.mountChar);

        this.isMount = true
    }

}
