import { Display3dMovie } from "../engine/display3D/Display3dMovie";
import { UnitFunction } from "../UnitFunction";

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

            var $url: string = UnitFunction.getRoleUrl(num)
            return UnitFunction.getRoleUrl(num);
        }
        protected getSceneCharWeaponUrl(num: number, $suffix: string = ""): string {

            return UnitFunction.getModelUrl(String(num + $suffix));
        }

    }