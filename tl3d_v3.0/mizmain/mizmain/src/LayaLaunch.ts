module baselaunch {
    import Browser = Laya.Browser;
    import Stage = Laya.Stage;
    import AtlasFrameVo = layapan_me.AtlasFrameVo;

    import LayaGame2dDemo = LayaPan3D.LayaGame2dDemo;
    import LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;

    import AtlasFrameSprite = base.AtlasFrameSprite

    export  class LayaLaunch {
        private _canvas: HTMLCanvasElement;
        get canvas(): HTMLCanvasElement {
            return this._canvas;
        }
        constructor() {
            this.init()
        }
        static inited: boolean
        static overrideMethods(): void {
            if (this.inited) {
                return;
            }
            this.inited = true;
            let compatibleLayaRender = function (pan3dFunc: Function, ...args): any {
                let v = pan3dFunc.apply(this, args);

                //   console.log("here")
                return v;
            }
            let funA = WebGLRenderingContext.prototype.blendFunc;
            WebGLRenderingContext.prototype.blendFunc = function (sfactor: GLenum, dfactor: GLenum): void {
                return compatibleLayaRender.call(this, funA, sfactor, dfactor);
            }
            /*
            let ParticleBoneData_setAllByteInfo = Pan3d.ParticleBoneData.prototype.setAllByteInfo;
            Pan3d.ParticleBoneData.prototype.setAllByteInfo = function (byte: Pan3dByteArray): void {
                return compatibleLayaRender.call(this, ParticleBoneData_setAllByteInfo, byte);
            }
            */
        }


        private init(): void {
            // LayaLaunch.overrideMethods()

            this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
            Laya.stage.alignV = Stage.ALIGN_LEFT;
            Laya.stage.alignH = Stage.ALIGN_TOP;

            Laya.stage.scaleMode = "full"
            Laya.stage.bgColor = "#232628";



            Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            Pan3d.Scene_data.fileuiRoot = "res/";
            Pan3d.Scene_data.fileRoot = Pan3d.Scene_data.ossRoot + "baseedit/";



            Pan3d.Engine.init(this._canvas);

  

            //var spriteA: base.SceneLevel = new base.SceneLevel()
            //Laya.stage.addChild(spriteA);
            //spriteA.pos(200, 200);
            //spriteA.setSceneCanvas(400, 200);
 

            this.lastTm = Pan3d.TimeUtil.getTimer()
            Laya.stage.frameLoop(1, this, () => {
                var t = Pan3d.TimeUtil.getTimer() - this.lastTm;
               //  Pan3d.TimeUtil.START_TIME += t * -1;
                this.lastTm = Pan3d.TimeUtil.getTimer()
                Pan3d.TimeUtil.update()
            })

            this.addRightScene()
            Laya.stage.on(Laya.Event.RESIZE, this, this.resizeStage)
            this.resizeStage();
        }
        private resizeStage(): void {

            console.log(Laya.stage.width, Laya.stage.height)

            var minw: number = Laya.stage.width/ this.gameSceneLevel.width ;
            var minh: number = Laya.stage.height/ this.gameSceneLevel.height;

            var tempScale: number = Math.min(minw, minh);
            this.gameSceneLevel.scale(tempScale, tempScale);

            var tx: number = (Laya.stage.width - (tempScale * this.gameSceneLevel.width)) / 2
            var ty: number = (Laya.stage.height - (tempScale * this.gameSceneLevel.height)) / 2

            this.gameSceneLevel.pos(tx, ty)
        }

        private gameSceneLevel: base.SceneLevel;

   
        private addRightScene(): void {

            var tempScene: base.SceneLevel = new base.SceneLevel()
            Laya.stage.addChild(tempScene);
     
            tempScene.setSceneCanvas(720, 1280)
            tempScene.setSceneBgColor(new Pan3d.Vector3D(0.01, 0, 0, 0.1))
            tempScene.getNameLabelVo();
            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            tempScene.addMovieDisplay($baseChar)
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            $baseChar.set2dPos(100, 100);
 

            this.gameSceneLevel = tempScene;
            var atlasFrameSprite: AtlasFrameSprite = this.gameSceneLevel.playAnim("10101_1", true);
            atlasFrameSprite.speedNum = 4;
            atlasFrameSprite.isLoop = false;
            atlasFrameSprite.scale(0.5, 0.5);
            atlasFrameSprite.x = 100;
            atlasFrameSprite.y = 100;

        }


        private lastTm: number

        public static initCanvas($caves: HTMLCanvasElement): void {

            new LayaLaunch();


        }


    }


}