module scene2d {
    export class Override2dEngine extends scene3d.OverrideEngine {


        constructor() {
            super()
        }
        public static htmlScale: number = 0.5;
    
        public static initConfig(): void {
            Pan3d. Engine.update = () => { this.update() }  //更换update
            Pan3d. Engine.init = ($caves: HTMLCanvasElement) => { this.init($caves) } //更换引擎初始化
            Pan3d. Engine.resetSize = (width?: number, height?: number) => { this.resetSize(width, height) } //更尺寸变化

            Pan3d. Engine.resetViewMatrx3D = () => { this.resetViewMatrx3D() }

          

        }
     
        public static resetSize(width?: number, height?: number): void {
            if (isNaN(width)) {
                width = document.body.clientWidth;
            }
            if (isNaN(height)) {
                height = document.body.clientHeight;
            }

            Pan3d.  Scene_data.stageWidth = width;
            Pan3d.Scene_data.stageHeight = height;

            Pan3d.Scene_data.context3D.resetSize(Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight);

            Pan3d. UIManager.getInstance().resize();
            Pan3d.BloodManager.getInstance().resize();
            Pan3d. Engine.resetViewMatrx3D()
            CanvasPostionModel.getInstance().resetSize();
        }


        public static init($caves: HTMLCanvasElement): void {

            scene3d.OverrideEngine.init($caves)
            Pan3d. Scene_data.focus3D.x = 0;
            Pan3d.Scene_data.focus3D.y = 0;
            Pan3d.Scene_data.focus3D.z = 0;
            Pan3d. Scene_data.focus3D.rotationY = 0;
            Pan3d.Scene_data.focus3D.rotationX = -45
            Pan3d. Scene_data.cam3D.distance = 250;

        }
        public static resetViewMatrx3D() {
            if (Pan3d.Scene_data.viewMatrx3D) {
                Pan3d.Scene_data.viewMatrx3D.identity()
            } else {
                Pan3d.Scene_data.viewMatrx3D = new Pan3d.Matrix3D;
            }
            var fovw: number = Pan3d. Scene_data.stageWidth
            var fovh: number = Pan3d. Scene_data.stageHeight
            Pan3d. Scene_data.sceneViewHW = Math.max(fovw, fovh)
            Pan3d.Scene_data.viewMatrx3D.appendScale(1 / Pan3d.Scene_data.sceneViewHW * 2, 1 / Pan3d.Scene_data.sceneViewHW * 2, 1 / 1000);
            Pan3d.Scene_data.viewMatrx3D.appendScale(1 * (Pan3d.Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Pan3d.Scene_data.sceneViewHW / fovw * 2), 1);
            Pan3d.  Scene_data.viewMatrx3D.appendScale(2 * this.htmlScale, 2 * this.htmlScale, 1);
        }

    }
}