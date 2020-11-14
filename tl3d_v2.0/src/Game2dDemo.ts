module base {
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle
    import MouseType = Pan3d.MouseType
    import CombineParticle = Pan3d.CombineParticle
    import Scene_data = Pan3d.Scene_data
    
    import LayaScene2dPicSprit = LayaPan3D.LayaScene2dPicSprit;
    import LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;

    import LayaScene2D = LayaPan3D.LayaScene2D;
    

    export class Game2dDemo extends LayaScene2D {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
        protected initScene(): void {
            super.initScene();
            this.addEvents();
            this.addSceneModel();

        }
        private mainChar: LayaScene2dSceneChar
        private addSceneModel(): void {
            this.sceneManager.cam3D.scene2dScale =5
            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(200, 200);
            $baseChar.rotationY = 180;
            this.mainChar = $baseChar;
            var rect100: Pan3d.Rectangle = new Pan3d.Rectangle(0, 0, 100, 100);
            for (var i: number = 0; i < 6; i++) {
                for (var j: number = 0; j < 4; j++) {
                     this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
                }
            }
        }
   
        public addGrouandPic(value: string, rect: Pan3d.Rectangle): LayaScene2dPicSprit {
            var tempPic: LayaScene2dPicSprit = new LayaScene2dPicSprit(value);
            tempPic.set2dPos(rect.x, rect.y);
            tempPic.width = rect.width;
            tempPic.height = rect.height;
            this.sceneManager.addDisplay(tempPic);
            return tempPic
        }
        protected addEvents(): void {
            this.on(MouseType.MouseDown, this, this.onStartDrag);
            this.on(MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(-100, -100)
        }

        private onMouseWheel(e: any): void {

            if (!this.rootpos) {
                this.rootpos = new Vector2D()
            }
            this.rootpos.x += e.delta;
            this.rootpos.y += e.delta;

            console.log(this.rootpos)
        }
        private dragRegion: Laya.Rectangle;
        private onStartDrag(e: Event): void {
            if (this.mouseY < 30) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            } else {
                var v2d: Vector2D = this.getMousePos(this.mouseX, this.mouseY);
                console.log("mouseX----", this.mouseX, "mouseY", this.mouseY, "mouseDown", v2d)
                this.mainChar.set2dPos(v2d.x, v2d.y);

                this.mainChar.scale = 0.2;
            

                this.addFramePartice(new Vector2D(this.mouseX, this.mouseY))
            }
        }

        private addFramePartice(v2d: Vector2D): void {

            var pathname: string = "pan/atlas"
            var effictname: string = "10101_1"
            var info: any = {}
            info.timeLen = 1000
            info.frameScale = 0.1
            info.loop = false
            info.isShow = true
            var combineParticle: CombineParticle = layapan_me.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + pathname + "/", effictname, info)
            this.sceneManager.particleManager.addParticle(combineParticle);
            var povsto: Vector2D = new Vector2D(v2d.x, v2d.y)
 
            var $nScale: number = 1
            var $tx: number = povsto.x * $nScale;
            var $tz: number = povsto.y * $nScale / (Math.sin(45 * Math.PI / 180)) * -1;
            combineParticle.x = $tx;
            combineParticle.y = 0;
            combineParticle.z = $tz;

 


        }

    }
}