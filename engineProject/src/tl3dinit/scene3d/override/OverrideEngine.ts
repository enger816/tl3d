namespace tl3d {
    import Scene_data=tl3d.Scene_data;
    export class OverrideEngine extends tl3d.Engine {
        constructor() {
            super()
        }
        static initConfig(): void {
            tl3d. Engine.init = ($caves: HTMLCanvasElement) => { this.init($caves) } //更换引擎初始化
            tl3d. Engine.resetSize = (width?: number, height?: number) => { this.resetSize(width, height) } //更尺寸变化

        }
        static resetSize(width?: number, height?: number): void {
            Scene_data.stageWidth = width;
            tl3d. Scene_data.stageHeight = height;
            Scene_data.canvas3D.width = Scene_data.stageWidth;
            Scene_data.canvas3D.height = Scene_data.stageHeight;
            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);
            tl3d.  UIManager.getInstance().resize();
            tl3d.  Engine.resetViewMatrx3D()
        }


        static init($caves: HTMLCanvasElement): void {
            Scene_data.vpMatrix = new tl3d. Matrix3D;
            Scene_data.canvas3D = $caves;
            Scene_data.context3D = new tl3d.Context3D();
            Scene_data.context3D.init($caves);
            tl3d.UIManager.getInstance().init();
            Scene_data.cam3D = new tl3d.Camera3D;
            Scene_data.focus3D = new tl3d.Object3D;
            Scene_data.focus3D.rotationY = 135;
            Scene_data.focus3D.rotationX = -45;
            Scene_data.light = new tl3d.LightVo();
            tl3d.TimeUtil.init();
            //todo packageapp
            Scene_data.supportBlob = false;

        }
    }
}