namespace tl3d {
    export class Engine {
        
        static canvas: HTMLCanvasElement

        static init($caves: HTMLCanvasElement): void {


            Scene_data.vpMatrix = new Matrix3D;
            Scene_data.canvas3D = $caves;
            Scene_data.context3D = new Context3D();
            Scene_data.context3D.init($caves);
            UIManager.getInstance().init();

            Scene_data.cam3D = new Camera3D;
            Scene_data.focus3D = new Object3D;
            Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            Scene_data.focus3D.rotationY = 135;
            Scene_data.focus3D.rotationX = -45;

            Scene_data.light = new LightVo();

            Engine.testBlob();

            Engine.resetSize();

            Engine.initShadow();

            TimeUtil.init();

            PathManager.init();

        }

        static resReady(): void {
            Engine.initPbr();
        }

        static testBlob(): void {

            //Scene_data.supportBlob = false;
            //return;
            //todo packageapp
            // try {
            //     var blob = new Blob();
            // } catch (e) {
            //     Scene_data.supportBlob = false;
            //     return;
            // }
            // Scene_data.supportBlob = true;
        }

        static initPbr(): void {
            if (!Scene_data.pubLut) {
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + "base/brdf_ltu.jpg", ($texture: TextureRes) => {
                    Scene_data.pubLut = $texture.texture;
                }, 1);
            }

            // if (!Scene_data.skyCubeMap) {
            //     TextureManager.getInstance().loadCubeTexture(Scene_data.fileRoot + "base/cube/e", ($ary: any) => {
            //         Scene_data.skyCubeMap = $ary;
            //     })
            // }


        }

        static initShadow(): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + "base/shadow.png", ($texture: TextureRes) => {
                Display3dShadow.texture = $texture.texture;
            });
        }

        static needVertical: Boolean = true;
        static needInputTxt: boolean = false;//在输入文本时，将不再可调整大小
        static resetSize(a: number = 0, b: number = 0): void {

            if (Engine.needInputTxt) {
                return;
            }
            //Scene_data.stageWidth = document.documentElement.clientWidth;
            //Scene_data.stageHeight = document.documentElement.clientHeight;
            //var flag: boolean = false;

            if (document.body.clientWidth > document.body.clientHeight) {
                Scene_data.stageWidth = document.body.clientWidth;
                Scene_data.stageHeight = document.body.clientHeight;
                Scene_data.verticalScene = false;
            } else {
                Scene_data.stageWidth = document.body.clientHeight;
                Scene_data.stageHeight = document.body.clientWidth;
                Scene_data.verticalScene = true;
            }

            // Scene_data.stageWidth = document.body.clientWidth;
            // Scene_data.stageHeight = document.body.clientHeight;
            // Scene_data.verticalScene = false;

            if (!this.needVertical) {
                Scene_data.stageWidth = document.body.clientWidth;
                Scene_data.stageHeight = document.body.clientHeight;
                Scene_data.verticalScene = false;
            }

            Scene_data.canvas3D.width = Scene_data.stageWidth;
            Scene_data.canvas3D.height = Scene_data.stageHeight;


            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);

            UIManager.getInstance().resize();


            this.resetViewMatrx3D()

            Scene_data.canvas3D.style.position = "absolute";
            Scene_data.canvas3D.style.left = "0px";
            Scene_data.canvas3D.style.top = "0px";

            if (Scene_data.verticalScene) {
                Scene_data.canvas3D.style.transform = "matrix(0,1,-1,0," + Scene_data.stageHeight + ",0)";
                //Scene_data.canvas3D.style.webkitTransform = "matrix(0,1,-1,0," + Scene_data.stageHeight + ",0)";
            } else {

                Scene_data.canvas3D.style.transform = "matrix(1,0,0,1,0,0)";
                //Scene_data.canvas3D.style.webkitTransform = "matrix(0,1,-1,0," + Scene_data.stageHeight + ",0)";
            }

            Scene_data.canvas3D.style.transformOrigin = "0px 0px 0px";

            Scene_data.canvas3D.style.top = "0px";

        }
        static sceneCamScale: number = 1.76;
        static resetViewMatrx3D(): void {
            if (Scene_data.viewMatrx3D) {
                Scene_data.viewMatrx3D.identity()
            } else {
                Scene_data.viewMatrx3D = new Matrix3D;
            }
            var fovw: number = Scene_data.stageWidth
            var fovh: number = Scene_data.stageHeight
            Scene_data.sceneViewHW = Math.max(fovw, fovh)

            Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this.sceneCamScale, 1, 50, Scene_data.camFar);
            Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);



        }

        static update(): void {
            TimeUtil.update();
            FpsMc.update();
        }

        static unload(): void {
            //NetManager.getInstance().close();
        }


    }
}