module scenedis {


    export class SkillSceneChar extends Pan3d.SceneChar {

        public onMeshLoaded(): void {
            super.onMeshLoaded()
            if (this.loadFinishFun) {
                this.loadFinishFun();
            }
        }
        public loadFinishFun: Function

        public changeActionFun: Function
        public changeAction($action: string): void {
            this.curentAction = this._defaultAction;
            if (this.changeActionFun) {
                this.changeActionFun($action);
            }
        }
        public setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
        }
    }
}