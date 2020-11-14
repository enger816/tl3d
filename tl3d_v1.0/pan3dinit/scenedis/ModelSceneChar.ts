module scenedis {


    export class ModelSceneChar extends Pan3d.SceneChar {

        public setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
            this.addPart(Pan3d.SceneChar.WEAPON_PART, Pan3d. SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        }


        public setWingByID($wingId: string): void {
            if (!this._wingDisplay) {
                this._wingDisplay = new Pan3d.SceneBaseChar();
            }
            this._wingDisplay.setRoleUrl(getRoleUrl($wingId));
            this._wingDisplay.setBind(this, Pan3d.SceneChar.WING_SLOT);
            Pan3d.SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        }


        public setMountById($mountId: string): void {
            if (!this.mountChar) {
                this.mountChar = new Pan3d.MountChar();
            }
            this.mountChar.setRoleUrl(getRoleUrl($mountId));
            this.setBind(this.mountChar, Pan3d.SceneChar.MOUNT_SLOT);
            Pan3d.SceneManager.getInstance().addMovieDisplay(this.mountChar);

            this.isMount = true
        }

    }

}