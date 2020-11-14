
module buff {
    import CharTitleUiVo = Pan3d.CharTitleUiVo;
    import Scene_data = Pan3d.Scene_data;
    import LoadManager = Pan3d.LoadManager;
    import UIManager = Pan3d.UIManager;
    import TextureManager = Pan3d.TextureManager;
    import UIRectangle = Pan3d.UIRectangle;
    import Vector3D = Pan3d.Vector3D;
    import Matrix3D = Pan3d.Matrix3D;
    import UIData = Pan3d.UIData;
    import UiDraw = Pan3d.UiDraw;
    import Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    export class BuffTitleUiVo extends CharTitleUiVo {
        private _buffTitleMesh: BuffTitleMesh
        public makeData(): void {
            if (this._data) {
                this._buffTitleMesh = <BuffTitleMesh>this._data
                var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                for (var i: number = 0; i < this._buffTitleMesh.buffarr.length; i++) {
                    var picId: number = this._buffTitleMesh.buffarr[i]
                    UiDraw.cxtDrawImg(ctx, "TYPE" + picId, new Pan3d.Rectangle(30*i, 0, 32, 32), UIData.publicUi);  //逐个绘制BUFF图片，取公共图片。对应可自行设置参数
                }
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            }
        }
        public update(): void {
            if (this._buffTitleMesh) {
                if (this._buffTitleMesh.needDraw) {
                    this.makeData();
                    this._buffTitleMesh.needDraw = false
                }
                if (this._buffTitleMesh.pos) {
                    if (this._buffTitleMesh.visible) {
                        if (this.needUpData(this._buffTitleMesh.pos)) {
                            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
                            m.append(Scene_data.viewMatrx3D);
                            var p: Vector3D = m.transformVector(this._buffTitleMesh.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;
                            this.oldPos.x = this._buffTitleMesh.pos.x;
                            this.oldPos.y = this._buffTitleMesh.pos.y;
                        }
                    } else {
                        this.ui.x = 10000
                    }
                }
                if (this._buffTitleMesh.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }
    export class BuffTitleMesh extends Pan3d.baseMeshVo {
        private _num: Array<number>;

        public needDraw: boolean;
        public destory(): void {
            this.pos = null;
            this._num = null;
            this.clear = true
        }
        public set buffarr(value: Array<number>) {
            this._num = value;
            this.needDraw = true;
        }
        public get buffarr(): Array<number> {
            return this._num;
        }
    }
    export class BuffThreeModel {
        private _scene: layapan.LayaOverride2dSceneManager
        private _buffDis2DUI: Dis2DUIContianerPanel
        constructor($scene: layapan.LayaOverride2dSceneManager) {
            this._scene = $scene
            this._buffDis2DUI = new Pan3d.Dis2DUIContianerPanel(BuffTitleUiVo, new  Pan3d.Rectangle(0, 0, 256, 32), 10);
            this._scene.bloodManager.uiContianerItem.push(this._buffDis2DUI);
        }
        public getCharTitleMeshVo(value: Array<number>): BuffTitleMesh {
            var $vo: BuffTitleMesh = new BuffTitleMesh;
            $vo.buffarr = value
            $vo.pos = new Vector3D(0, 50, 0);
            this._buffDis2DUI.showTemp($vo);
            return $vo;
        }
    }
    export class BuffThreePanel extends Laya.Sprite {
        constructor() {
            super();
            this.ape = new BaseWinPanel()
            this.addChild(this.ape);
            var $imag: Laya.Image = new Laya.Image("res/2dbg.jpg")
            $imag.x = 20
            $imag.y = 30
            this.ape.addChild($imag);

            this.ape.pos(100, 100)

            this.layaSceneLevel = new BaseLaya3dSprite();
            this.addChild(this.layaSceneLevel)
            this.buffThreeModel = new BuffThreeModel(this.layaSceneLevel.scene);

            this.uiLayaSceneChar = this.addModelChar();
            this.uiLayaSceneChar.nameEnable = true
            this.uiLayaSceneChar.bloodEnable = true


            this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
        }
        private buffThreeModel: BuffThreeModel
        private uiLayaSceneChar: Game2dChar

        public render(context: Laya.RenderContext, x: number, y: number): void {
            super.render(context, x, y)
            this.layaSceneLevel.x = this.ape.x
            this.layaSceneLevel.y = this.ape.y
        }
        private ape: BaseWinPanel
        private onStartDrag(e: Event): void {
            /*
            if (this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK || this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK_MOUNT) {
                this.uiLayaSceneChar.play(Pan3d.CharAction.STANAD)
            } else {
                this.uiLayaSceneChar.play(Pan3d.CharAction.WALK)
            }
            */

            this.uiLayaSceneChar.moveTopos(new Pan3d.Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y));  //坐标
            this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz))


            this.showBuff()
            /*
            var $mouse: Pan3d.Vector2D = new Pan3d.Vector2D(this.mouseX - this.ape.x, this.mouseY - this.ape.y)
            var $tx: number = $mouse.x * layapan.LayaOverride2dEngine.htmlScale;
            var $tz: number = $mouse.y * layapan.LayaOverride2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
            this.layaSceneLevel.scene.playLyf("model/qigan.txt", new Pan3d.Vector3D($tx, 0, $tz), random(360));
            */
        }
        private showBuff(): void {
            var $buff: BuffTitleMesh = this.buffThreeModel.getCharTitleMeshVo([2,2,3]); //创BUFF编号，
            $buff.pos = new Vector3D(this.uiLayaSceneChar.px, this.uiLayaSceneChar.py, this.uiLayaSceneChar.pz);//给定创建位置
            console.log("字定义BUFF")
            Pan3d.TimeUtil.addTimeOut(1000, () => {
                $buff.clear = true //清理这个对象
                $buff=null  //相当于销毁
            })
        }


        private layaSceneLevel: BaseLaya3dSprite
        private addModelChar(): Game2dChar {
            var $baseChar: Game2dChar = new Game2dChar();
            this.layaSceneLevel.scene.addMovieDisplay($baseChar);
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            $baseChar.setMount("4104");
            $baseChar.setWing("902");
            $baseChar.setWeaponByAvatar(50011);
            $baseChar.play(Pan3d.CharAction.STAND_MOUNT);
            $baseChar.forceRotationY = 145
            $baseChar.set2dPos(400, 200);  //坐标
            return $baseChar
        }

    }
}