/// <reference path="../../scene3d/override/OverrideEngine.ts" />

namespace tl3d {
    import Scene_data=tl3d.Scene_data;
    export class Override2dEngine extends OverrideEngine {
        constructor() {
            super()
        }
        static htmlScale: number = 0.5;
        static initConfig(): void {
            tl3d. Engine.init = ($caves: HTMLCanvasElement) => { this.init($caves) } //更换引擎初始化
            tl3d. Engine.resetSize = (width?: number, height?: number) => { this.resetSize(width, height) } //更尺寸变化
            tl3d. Engine.resetViewMatrx3D = () => { this.resetViewMatrx3D() }
        }
     
        static resetSize(width?: number, height?: number): void {
            if (isNaN(width)) {
                width = document.body.clientWidth;
            }
            if (isNaN(height)) {
                height = document.body.clientHeight;
            }

            tl3d.  Scene_data.stageWidth = width;
            Scene_data.stageHeight = height;

            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);

            tl3d. UIManager.getInstance().resize();
            tl3d. Engine.resetViewMatrx3D()
            CanvasPostionModel.getInstance().resetSize();
        }


        static init($caves: HTMLCanvasElement): void {

            tl3d.OverrideEngine.init($caves)
            tl3d. Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            tl3d. Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -45
            tl3d. Scene_data.cam3D.distance = 250;

        }
        static resetViewMatrx3D() {
            if (Scene_data.viewMatrx3D) {
                Scene_data.viewMatrx3D.identity()
            } else {
                Scene_data.viewMatrx3D = new tl3d.Matrix3D;
            }
            var fovw: number = tl3d. Scene_data.stageWidth
            var fovh: number = tl3d. Scene_data.stageHeight
            tl3d. Scene_data.sceneViewHW = Math.max(fovw, fovh)
            Scene_data.viewMatrx3D.appendScale(1 / Scene_data.sceneViewHW * 2, 1 / Scene_data.sceneViewHW * 2, 1 / 1000);
            Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
            tl3d.  Scene_data.viewMatrx3D.appendScale(2 * this.htmlScale, 2 * this.htmlScale, 1);
        }

    }
}