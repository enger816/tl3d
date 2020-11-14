module Pan3d {
    export class Display3DUISprite extends Display3DSprite {

        private uiMatrix: Matrix3D;
        private uiViewMatrix: Matrix3D;
        private modelRes: ModelRes;
        public constructor() {
            super();
            this.uiMatrix = new Matrix3D;
            this.uiMatrix.prependTranslation(0, 0, 600);
            this.uiMatrix.prependRotation(-15, Vector3D.X_AXIS);
            this.uiMatrix.prependRotation(0, Vector3D.Y_AXIS);
            this.uiViewMatrix = new Matrix3D;

        }

        private loadRes($name: string): void {
            if (!this.modelRes) {
                this.modelRes = new ModelRes();
            }
            this.modelRes.load(Scene_data.fileRoot + getModelUrl($name), () => { this.loadResComFinish() });
        }
        public loadResComFinish(): void {

            this.setObjUrl(this.modelRes.objUrl);
            this.setMaterialUrl(this.modelRes.materialUrl);
        }
        public loadGroup($name: string): void {
            var groupRes: GroupRes = new GroupRes;
            groupRes.load(Scene_data.fileRoot + "model/" + $name + ".txt", () => { this.loadPartRes(groupRes) });
        }
        private loadPartRes(groupRes: GroupRes): void {
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                } else if (item.types == BaseRes.PREFAB_TYPE) {
                    this.setObjUrl(item.objUrl);
                    this.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                }

            }
        }



        public resize(): void {
            this.uiViewMatrix.identity();
            this.uiViewMatrix.perspectiveFieldOfViewLH(1, 1, 500, 5000);
            this.uiViewMatrix.appendScale(1000 / Scene_data.stageWidth, 1000 / Scene_data.stageHeight, 1);
        }

        public setCam(): void {
            //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "posMatrix3D", this.posMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.material.shader, "viewMatrix3D", this.uiViewMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.material.shader, "camMatrix3D", this.uiMatrix.m);
        }



        public update(): void {
            Scene_data.context3D.setWriteDepth(true);
            Scene_data.context3D.setDepthTest(true);
            super.update();
            Scene_data.context3D.setWriteDepth(false);
            Scene_data.context3D.setDepthTest(false);
            ////console.log(this.posMatrix.m)
        }



    }
}