module base {
 
    import MouseType = Pan3d.MouseType;
    import LayaScene2dSceneChar = LayaPan3D.LayaScene2dSceneChar;
    import LayaScene2D = LayaPan3D.LayaScene2D;
    import AtlasFrameVo = layapan_me.AtlasFrameVo;

    export class CanvasScene extends LayaScene2D {
        public constructor(w: number = 128, h: number = 128) {
            super(w, h)
        }
        protected initScene(): void {
            super.initScene();
        }
    }
    export class BooldUserSprite extends Laya.Sprite {
        private _labe: Laya.Label
        private _bg: Laya.Image
        private _line: Laya.Image
        public constructor() {
            super()
            this._bg = new Laya.Image("res/ui/bloodbg.png")
            this.addChild(this._bg)

            this._line = new Laya.Image("res/ui/bloodline.png")
            this.addChild(this._line)
            this._line.scaleX=0.5
 
        }
    }
    export class AtlasFrameSprite extends Laya.Sprite {
        public constructor( ) {  
            super()
            this.frameLoop(1, this, this.updateFrame);
        }
        private _skipNum: number=0;
        private _speedNum: number = 1;
        public isLoop: boolean = true;

        private lastDrawVo: AtlasFrameVo

        public set speedNum(value: number) {
            this._speedNum = value;
        }
        private updateFrame(): void {
            if (this.frameItem && this.frameTexture) {
                var fnum: number = Math.floor(this._skipNum++ / this._speedNum)
                if (this.isLoop || fnum < this.frameItem.length) {  //循环时才会播放
                    var id: number = fnum % this.frameItem.length;
                    var vo: AtlasFrameVo = this.frameItem[id];
                    if (this.lastDrawVo != vo) {
                        this.graphics.clear()
                        var outTexture: Laya.Texture = Laya.Texture.createFromTexture(this.frameTexture, vo.frame.x, vo.frame.y, vo.frame.w, vo.frame.h);
                        var g = this.graphics;
                        g.drawTexture(outTexture);
                        this.width = vo.frame.w
                        this.height = vo.frame.h
                        this.lastDrawVo = vo

                        this.pivotX = this.width / 2;
                        this.pivotY = this.height / 2;
                    }
                }
            }
        }
        private frameItem: Array<AtlasFrameVo>;
        private frameTexture: Laya.Texture

        public static pathUrl: string = "res/frameatlas/";
        public setInfo($data: any): void {
            this.frameItem = []
            for (var key in $data.frames) {
                var $atlasFrameVo: AtlasFrameVo = new AtlasFrameVo();
                $atlasFrameVo.meshData($data.frames[key]);
                $atlasFrameVo.key = key;
                this.frameItem.push($atlasFrameVo);
            }
            var picUrl: string = AtlasFrameSprite.pathUrl + $data.meta.image;
            Laya.loader.load(picUrl, Laya.Handler.create(this, (value: Laya.Texture) => {
                this.frameTexture = value;
            }))
        }
 
    }
    
    export class SceneLevel extends Laya.Box {
        private _bottomLayer: Laya.Box; //底
        private _midScene3dPic: CanvasScene; //3D对象容器
        private _topLayer: Laya.Box; //显示上层对象
        private _textRect: Pan3d.Rectangle;  //图片大小 是传入进来的图片的大小。 
        public constructor(w: number = 128, h: number = 128) {
            super();
            this._textRect = new Pan3d.Rectangle(0, 0, w, h)
            this._bottomLayer = new Laya.Box;
            this._midScene3dPic = new CanvasScene(w,h)
            this._topLayer = new Laya.Box;

            this.addChild(this._bottomLayer)
            this.addChild(this._midScene3dPic);
            this.addChild(this._topLayer);

            this._midScene3dPic.rootpos = null
            this.setSceneScale(6);
            this.setSceneCanvas(w, h);
            this.addEvents();
        }
        //public get rootpos(): Vector2D {
        //    return this._midScene3dPic.rootpos;
        //}
        //public set rootpos(value: Vector2D) {
        //    this._midScene3dPic.rootpos = value;
        //}
        protected addEvents(): void {
            this.on(MouseType.MouseDown, this, this.onMouseDown);
        }
        private onMouseDown(e: Event): void {
            var label: Laya.Label = this.getNameLabelVo();
            label.x = this.mouseX;
            label.y = this.mouseY;
            var atlasFrameSprite: AtlasFrameSprite = this.playAnim("10101_1", true);
            atlasFrameSprite.speedNum = 4;
            atlasFrameSprite.isLoop = false;
            atlasFrameSprite.scale(0.5, 0.5);
            atlasFrameSprite.x = label.x;
            atlasFrameSprite.y = label.y;
            var booldUserSprite: BooldUserSprite = this.getBloodVo();

            booldUserSprite.x = label.x;
            booldUserSprite.y = label.y;


            var $baseChar: LayaScene2dSceneChar = new LayaScene2dSceneChar();
            this.addMovieDisplay($baseChar)
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            $baseChar.set2dPos(label.x, label.y);
            label.alpha = $baseChar.alpha = 0.2
            booldUserSprite.alpha = $baseChar.alpha = 0.2
        }
        public addMovieDisplay($display: LayaScene2dSceneChar): void {
            this._midScene3dPic.sceneManager.addMovieDisplay($display);
        }
        //设置背景颜色
        public setSceneBgColor(value: Pan3d.Vector3D): void {
            this._midScene3dPic.bgColor = value
        }
        //设置3D角色比例
        private _sceneScale: number
        public setSceneScale(value: number): void {
            this._sceneScale = value;
            this._midScene3dPic.sceneManager.cam3D.scene2dScale = this._sceneScale;
        }
        //设计渲染范围
        public setSceneCanvas(w: number, h: number): void {
            this._midScene3dPic.scale(w / this._textRect.width, h / this._textRect.height);
            this.width = w;
            this.height = h;
        }
        //获取一个名字Label;
        public getNameLabelVo(): Laya.Label {
            var temp: Laya.Label = new Laya.Label("名字");
            temp.color = "#ffffff";
            temp.fontSize = 16;
            temp.x = 100;
            temp.y = 100;
            this._topLayer.addChild(temp);
            return temp;
        }
        //获取一个名字Label;
        public getBloodVo(): BooldUserSprite {
            var sp: BooldUserSprite= new BooldUserSprite;
            sp.x = 100;
            sp.y = 100;
            sp.scale(0.3,0.3)
            this._topLayer.addChild(sp);
            return sp;
        }
        //获取图片动画对象 
        public getFrameAnimSprite(isTop: boolean): AtlasFrameSprite {
            var sp: AtlasFrameSprite = new AtlasFrameSprite;
            if (isTop) {
                this._topLayer.addChild(sp);
            } else {
                this._bottomLayer.addChild(sp);
            }
            return sp;
        }
        public playAnim(value: string, isTop?: boolean): AtlasFrameSprite {
            var sp: AtlasFrameSprite = this.getFrameAnimSprite(isTop);
            Laya.loader.load(AtlasFrameSprite.pathUrl + value + ".atlas", Laya.Handler.create(this, ($data: any) => {
                sp.setInfo($data);
            }))
            return sp;
        }
     
    }
}