import {SceneChar} from "../../pan3d/baseprite/SceneChar"
import {SceneBaseChar} from "../../pan3d/baseprite/SceneBaseChar"
import {SceneManager} from "../../pan3d/engine/scene/SceneManager"
import {MountChar} from "../../pan3d/baseprite/MountChar"



    export class ModelSceneChar extends SceneChar {

        public setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
            this.addPart(SceneChar.WEAPON_PART,  SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        }


        public setWingByID($wingId: string): void {
            if (!this._wingDisplay) {
                this._wingDisplay = new SceneBaseChar();
            }
            this._wingDisplay.setRoleUrl(getRoleUrl($wingId));
            this._wingDisplay.setBind(this, SceneChar.WING_SLOT);
            SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        }


        public setMountById($mountId: string): void {
            if (!this.mountChar) {
                this.mountChar = new MountChar();
            }
            this.mountChar.setRoleUrl(getRoleUrl($mountId));
            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
            SceneManager.getInstance().addMovieDisplay(this.mountChar);

            this.isMount = true
        }

    }

