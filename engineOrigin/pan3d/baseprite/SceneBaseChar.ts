module Pan3d {
    export class SceneBaseChar extends Display3dMovie {
        private _avatar: number = -1;

        public _visible: boolean = true

        public get visible(): boolean {
            return this._visible
        }
        public set visible(value: boolean) {
            this._visible = value
        }

        public setAvatar(num: number): void {

            if (this._avatar == num) {
                return;
            }
            this._avatar = num;
            this.setRoleUrl(this.getSceneCharAvatarUrl(num));


        }
        public update(): void {
            if (this.visible) {
                super.update()
            }
            if (this._shadow) {
                this._shadow._visible = this.visible;
            }
        }



        protected getSceneCharAvatarUrl(num: number): string {

            var $url: string = getRoleUrl(String(num))
            return getRoleUrl(String(num));
        }
        protected getSceneCharWeaponUrl(num: number, $suffix: string = ""): string {

            return getModelUrl(String(num + $suffix));
        }

    }
}