module scene3d {
    export class OverrideEngine extends Pan3d.Engine {


        constructor() {
            super()
        }
        public static initConfig(): void {
            Pan3d. Engine.update = () => { this.update() }  //更换update
            Pan3d. Engine.init = ($caves: HTMLCanvasElement) => { this.init($caves) } //更换引擎初始化
            Pan3d. Engine.resetSize = (width?: number, height?: number) => { this.resetSize(width, height) } //更尺寸变化

        }
        public static update(): void {


            Pan3d. TimeUtil.update();
            Pan3d.  SceneManager.getInstance().update();



        }
        public static resetSize(width?: number, height?: number): void {
            Pan3d.Scene_data.stageWidth = width;
            Pan3d. Scene_data.stageHeight = height;
            Pan3d.Scene_data.canvas3D.width = Pan3d.Scene_data.stageWidth;
            Pan3d.Scene_data.canvas3D.height = Pan3d.Scene_data.stageHeight;

            Pan3d.Scene_data.context3D.resetSize(Pan3d.Scene_data.stageWidth, Pan3d.Scene_data.stageHeight);

            Pan3d.  UIManager.getInstance().resize();
            Pan3d.  BloodManager.getInstance().resize();
            Pan3d.  Engine.resetViewMatrx3D()
        }


        public static init($caves: HTMLCanvasElement): void {

            var isIpad = /ipad/i.test(navigator.userAgent);
            var isIphone = /iPhone/i.test(navigator.userAgent);
            var isAndroid = /android/i.test(navigator.userAgent);
            var isWindow = /iindow/i.test(navigator.userAgent);

            var sUserAgent = navigator.userAgent.toLowerCase();
            ////console.log("--sUserAgent--",sUserAgent,isIpad,isIphone,isAndroid,isWindow);
            if (isIpad || isIphone || isAndroid) {
                Pan3d. Scene_data.isPc = false;
            } else {
                Pan3d. Scene_data.isPc = true;
            }

            Pan3d.Scene_data.vpMatrix = new Pan3d. Matrix3D;
            Pan3d. Scene_data.canvas3D = $caves;
            Pan3d.Scene_data.context3D = new Pan3d.Context3D();
            Pan3d. Scene_data.context3D.init($caves);
            Pan3d. UIManager.getInstance().init();

            Pan3d.  Scene_data.cam3D = new Pan3d. Camera3D;
            Pan3d.  Scene_data.focus3D = new Pan3d.Object3D;
            Pan3d. Scene_data.focus3D.x = 0;
            Pan3d. Scene_data.focus3D.y = 0;
            Pan3d. Scene_data.focus3D.z = 0;
            Pan3d. Scene_data.focus3D.rotationY = 135;
            Pan3d. Scene_data.focus3D.rotationX = -45;

            Pan3d.Scene_data.light = new Pan3d.LightVo();

            Pan3d. TimeUtil.init();
            Pan3d.  Scene_data.supportBlob = true;

        }
    }
}