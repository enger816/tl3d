import {ModelSceneChar} from "./ModelSceneChar"
import {CharAction} from "../../pan3d/baseprite/CharAction"
import {SceneManager} from "../../pan3d/engine/scene/SceneManager"

    export class CharModelShow {
        constructor() {
            this.addModelChar()
        }
        private addModelChar(): void {


            var $sc: ModelSceneChar = new ModelSceneChar();
            $sc.setRoleUrl(getRoleUrl("50003"));
            $sc.setWingByID("901");
            $sc.setMountById("4103");
            $sc.setWeaponByAvatar(50011);
            $sc.play(CharAction.STAND_MOUNT);


             SceneManager.getInstance().addMovieDisplay($sc);



        }
    }
