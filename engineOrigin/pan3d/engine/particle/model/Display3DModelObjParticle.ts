module Pan3d {
    export class Display3DModelObjParticle extends Display3DModelPartilce {
        protected _depthMode: boolean;

        public constructor() {
            super();
        }

        public update(): void {

            if (this._depthMode) {
                Scene_data.context3D.setDepthTest(true);
            }

            super.update();
            if (this._depthMode) {
                Scene_data.context3D.setDepthTest(false);
            }
        }

        //public setAllInfo(allObj: any): void {
        //    var obj: any = allObj.display;

        //    this._depthMode = obj.depthMode;
        //    super.setAllInfo(allObj);
        //}
    }
}