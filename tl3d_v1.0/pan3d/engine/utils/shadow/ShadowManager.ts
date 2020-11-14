module Pan3d {
    export class ShadowManager {

        private static _instance: ShadowManager;
        public static getInstance(): ShadowManager {
            if (!this._instance) {
                this._instance = new ShadowManager();
            }
            return this._instance;
        }
        private _displayList: Array<Display3dShadow>;
        public constructor() {
            this._displayList = new Array;
            ProgrmaManager.getInstance().registe(Display3DShadowShader.Display3DShadowShader, new Display3DShadowShader())
        }

        public addShadow(): Shadow {
            var display: Display3dShadow = this.getIdleShadow();
            var sd: Shadow = new Shadow();
            display.addShadow(sd);
            return sd;
        }

        public removeShadow(sd: Shadow): void {
            sd.display.removeShadow(sd);
        }

        public update(): void {

            if (this._displayList.length) {
                Scene_data.context3D.setWriteDepth(false);

                for (var i: number = 0; i < this._displayList.length; i++) {
                    this._displayList[i].update();
                }

                Scene_data.context3D.setWriteDepth(true);
            }


        }

        private getIdleShadow(): Display3dShadow {
            for (var i: number = 0; i < this._displayList.length; i++) {
                if (this._displayList[i].hasIdle()) {
                    return this._displayList[i];
                }
            }

            var display: Display3dShadow = new Display3dShadow();
            this._displayList.push(display);
            return display;

        }

    }
}