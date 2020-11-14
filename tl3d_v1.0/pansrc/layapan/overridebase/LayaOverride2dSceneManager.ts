
module topfront {
    import UICompenent = Pan3d.UICompenent;
    import AlphaUICompenent = Pan3d.AlphaUICompenent;
    import AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
    import UIConatiner = Pan3d.UIConatiner;
    import UIRectangle = Pan3d.UIRectangle;
    import UIAtlas = Pan3d.UIAtlas;
    import Rectangle = Pan3d.Rectangle;
    import Disp2DBaseText = Pan3d.Disp2DBaseText
    import AlphaUiContianer=Pan3d.AlphaUiContianer
    import LoadManager=Pan3d.LoadManager
    export class FrontUIRenderComponent extends AlphaUIRenderComponent {
        public creatBaseComponent($skinName: string): AlphaUICompenent {
            var ui: AlphaUICompenent = new AlphaUICompenent();
            ui.skinName = $skinName;
            var rec: UIRectangle = this.uiAtlas.getRec($skinName);
            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;
            ui.baseRec = new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight)
            ui.uiRender = this;
            return ui;
        }
    }
    export class BaseFrontVo {
        public uiItem: Array<AlphaUICompenent>
        private panel: LayaForntPanel;
        public _uiRect: Rectangle //设计宽度;
        private baseRect: Rectangle
        private startTm: number;
        private endTm: number;
        private isBottom: boolean

        public set timeLen(value: number) { //需要注意，如果长时使用，必须人公清理 destory
            this.startTm = Pan3d.TimeUtil.getTimer()
            this.endTm = this.startTm + value
        }
        public constructor($uiPanle: LayaForntPanel, $bottom: boolean) {
            this.isBottom = $bottom
            this.panel = $uiPanle;
            this.uiItem = [];
            this.timeLen = 1000 * 10; //每个对象，默认10秒后会自动清理，
        }
        public makeUi(value: any): void {
            this.pushUiByKey(value);
            this.setBasePos()
        }
        protected setBasePos(): void {
            this.baseRect = this.getBaseTextWidth();
            this._uiRect = new Rectangle(this.baseRect.x, this.baseRect.y, this.baseRect.width, this.baseRect.height)
            this.changeSize();
        }
        public getBaseTextWidth(): Rectangle {
            if (!this.baseRect) {
                var rect: Rectangle = new Rectangle()
                for (var i: number = 0; i < this.uiItem.length; i++) {
                    rect.width += this.uiItem[i].baseRec.width
                    rect.height = Math.max(rect.height, this.uiItem[i].baseRec.height)
                }
                this.baseRect = rect;
            }

            return this.baseRect

        }

        public pushUiByKey(value: string): void {

            var $rend: FrontUIRenderComponent = this.panel.getCanUseRender(this.isBottom)

            var ui: AlphaUICompenent = $rend.creatBaseComponent(value);
            this.panel.addChild(ui);
            this.uiItem.push(ui);
        }
        public resize(): void {

        }
        public set x(value: number) {
            this._uiRect.x = value;
            this.changeSize()
        }
        public get x() {
            return this._uiRect.x;
        }
        public set scale(value: number) {
            this._scale = value;

            this.width = this.baseRect.width * this._scale;
            this.height = this.baseRect.height * this._scale;
        }
        private _scale: number = 1
        public get scale() {
            return this._scale;
        }

        public set alpha(value: number) {
            for (var i: number = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].alpha = value;
            }
        }

        public set y(value: number) {

            this._uiRect.y = value;
            this.changeSize()

        }
        public get y() {
            return this._uiRect.y;
        }
        public set width(value: number) {
            this._uiRect.width = value;
            this.changeSize()
        }
        public get width() {
            return this._uiRect.width
        }
        public set height(value: number) {
            this._uiRect.height = value;
            this.changeSize()

        }
        public get height() {
            return this._uiRect.height;
        }
        public changeSize(): void {

            var scaleW: number = this.width / this.baseRect.width;
            var scaleH: number = this.height / this.baseRect.height;
            var $tx: number = 0
            for (var i: number = 0; i < this.uiItem.length; i++) {

                this.uiItem[i].x = $tx + this.x;
                this.uiItem[i].y = this.y
                this.uiItem[i].width = this.uiItem[i].baseRec.width * scaleW;
                this.uiItem[i].height = this.uiItem[i].baseRec.height * scaleH;
                $tx += this.uiItem[i].baseRec.width * scaleW;
            }

        }
        public needClear: boolean;
        public fun: Function //回调函数  有两个参数，对象本身和 时间 
        public update() {
            if (Pan3d.TimeUtil.getTimer() > this.endTm) {
                this.needClear = true
            } else {
                this.fun && this.fun(this, (Pan3d.TimeUtil.getTimer() - this.startTm) / (this.endTm - this.startTm))
            }
        }

        public destory(): void {  //清理对象
            this.clearVo(this);
            while (this.uiItem.length) {
                this.panel.removeChild(this.uiItem.pop());
            }
        }
        private clearVo(vo: BaseFrontVo): void {
            var index: number = this.panel.listFrontItem.indexOf(vo)
            if (index != -1) {
                this.panel.listFrontItem.splice(index, 1);
            }
        }

    }
    export class ColorFrontVo extends BaseFrontVo {
        public makeUi(value: any): void {
            var num: number = value.num
            var str: string = num.toString();
            for (var i: number = 0; i < str.length; i++) {
                var temp: string = str.substr(i, 1);
                this.pushUiByKey(value.color + "_num_" + temp);
            }
            this.setBasePos()
        }
    }
    export class LayaDisp2DBaseText extends Disp2DBaseText {
        private _width: number
        public makeData(): void {
            if (this._data) {
                var vo: DynamicTextMeshVo = this._data
                this.dtime = vo.showTime + Pan3d.TimeUtil.getTimer()


                if (vo.bg) {
                    LoadManager.getInstance().load(Scene_data.fileRoot + vo.bg, LoadManager.IMG_TYPE,
                        ($img: any) => {
                            this.drawHasBg($img)
                        });
                } else {
                    this.drawHasBg()
                }
            }
        }
        private drawHasBg($img: any = null): void {
            if (!this._data) {
                return
            }
            var vo: DynamicTextMeshVo = this._data
            var rec: Pan3d.UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

            if ($img) {
                var imgRect: Pan3d.Rectangle = new Pan3d.Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight)
                if (vo.bgRect) { //文字大小;
                    imgRect.x = vo.bgRect.x;
                    imgRect.y = vo.bgRect.y;
                    imgRect.width = vo.bgRect.width;
                    imgRect.height = vo.bgRect.height;

                }
                this.parent.uiAtlas.ctx.drawImage($img, imgRect.x, imgRect.y, imgRect.width, imgRect.height);
            }
            var fontsize = 10;
            var tx: number = 0
            var ty: number = 0

            if (vo.fontsize) { //文字大小
                fontsize = vo.fontsize
            }
            if (vo.tx) { //文字大小
                tx = vo.tx
            }
            if (vo.ty) { //文字大小
                ty = vo.ty
            }
            Pan3d.LabelTextFont.writeSingleLabelToCtx(ctx, vo.label, fontsize, tx, ty)
//2Dxie wenzi 

            Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);


        }
        public update(): void {
            var vo: DynamicTextMeshVo = this._data
            if (vo) {
                this.time = Pan3d.TimeUtil.getTimer();
                if (this.time >= this.dtime || vo.clear) {
                    console.log("时间 到了清理")
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                } else {

                    if (this.ui) {
                        this.ui.x = vo.pos.x;
                        this.ui.y = vo.pos.y;
                        (<Pan3d.AlphaUICompenent>this.ui).alpha = vo.alpha;

                    }
                }
            }
        }

    }

    export class LayaTextUiContianer extends AlphaUiContianer {
        public upFrameDraw(): void {
            for (var i: number = 0; i < this.renderList.length; i++) {
                this.renderList[i].update();
            }
            super.update(0)
        }

    }
    export class DynamicTextMeshVo extends Pan3d.baseMeshVo {

        public alpha: number = 0
        public label: string   //必填
        public fontsize: number = 10//(可选)
        public tx: number = 0//(可选)
        public ty: number = 0//(可选)
        public bg: string   // "ui/textlist/128_64.png"  //背景图(可选)
        public bgRect: Pan3d.Rectangle //(可选)
        public showTime: number;

        public constructor() {
            super();
            this.showTime = 1000
            this.pos = new Vector3D();
        }
        public destory(): void {
            this.pos = null;
            this.clear = true
        }
    }
    export class LayaForntPanel extends UIConatiner {
        public _baseRender: FrontUIRenderComponent;
        private bottomRendItem: Array<FrontUIRenderComponent>
        private topRendItem: Array<FrontUIRenderComponent>
        private dynamicTextFornt: LayaTextUiContianer
        public drawDynamicTextDemo(txt:string, picUrl:string): DynamicTextMeshVo {
            var vo: DynamicTextMeshVo = new DynamicTextMeshVo;
            vo.label = "[ffffff]" + txt  //必须
            vo.fontsize = 21;  //文字大小  (可选)
            vo.tx = -65;  //位置偏移(可选)
            vo.ty = 2;  //位置偏移(可选)
            vo.bg = picUrl;  //背景图(可选)
            vo.bgRect = new Pan3d.Rectangle(0, 0, 128, 32)  //暂时不能超过256*64(可选)
            vo.showTime = 1000;
            vo.alpha = 0.2
            this.dynamicTextFornt.showTemp(vo);
            return vo
        }
        public constructor() {
            super();
            this.left = 0;
            this.top = 0;

            this.bottomRendItem = [];
            this.topRendItem = [];
            this.listFrontItem = [];

            this._baseRender = new FrontUIRenderComponent;
            this.addRender(this._baseRender);
            this._baseRender.uiAtlas = new UIAtlas

             this.dynamicTextFornt = new LayaTextUiContianer(LayaDisp2DBaseText, new Pan3d.Rectangle(0, 0, 256, 64),40);


            this._baseRender.uiAtlas.loadImgUrl("ui/arpgui/textlist.png", () => { this.loadConfigCom() })
        }
        public getCanUseRender(value: boolean): FrontUIRenderComponent {


            var $selectItem: Array<FrontUIRenderComponent> = value ? this.bottomRendItem : this.topRendItem;

            var temp: FrontUIRenderComponent
            for (var i: number = 0; i < $selectItem.length; i++) {
                if ($selectItem[i].getUiListLen() < 40) {
                    temp = $selectItem[i]
                    i = $selectItem.length;
                }
            }
            if (!temp) {
                temp = new FrontUIRenderComponent;
                temp.uiAtlas = this._baseRender.uiAtlas;
                $selectItem.push(temp);
                this.addRender(temp);

            }
            console.log("渲染层----------->", this.renderList.length)
            return temp
        }
        private loadConfigCom(): void {
            this._baseRender.uiAtlas.configData = [];


            this.addNum0_9("red", new Rectangle(0, 0, 20, 24)); //设置数字的位置
            this.addNum0_9("green", new Rectangle(0, 24, 20, 24));
            this.addNum0_9("blue", new Rectangle(0, 48, 20, 24));
            this.addNum0_9("yellow", new Rectangle(0, 74, 20, 24));


            this.makeFrontUiRect("fanji", new Rectangle(9, 158, 73, 40)); //设置单图片
            this.makeFrontUiRect("fantan", new Rectangle(110, 158, 73, 40));
            this.makeFrontUiRect("lianji", new Rectangle(9, 205, 73, 40));
            this.makeFrontUiRect("gedang", new Rectangle(110, 205, 73, 40));
            this.makeFrontUiRect("tuimo", new Rectangle(9, 364, 73, 40));
            this.makeFrontUiRect("xishou", new Rectangle(81, 364, 73, 40));
            this.makeFrontUiRect("shanbi", new Rectangle(7, 404, 73, 40));
            this.makeFrontUiRect("hanzidiban", new Rectangle(102, 415, 124, 27));
            this.makeFrontUiRect("hanzidiban", new Rectangle(0, 109, 76, 28));
            this.makeFrontUiRect("hanzidiban", new Rectangle(77, 109, 76, 28));
            this.makeFrontUiRect("hanzidiban", new Rectangle(147, 109, 76, 28));
            this.makeFrontUiRect("fangyu", new Rectangle(185, 156, 71, 43));
            this.makeFrontUiRect("zhuiji", new Rectangle(156, 361, 73, 44));
            this.makeFrontUiRect("jianshe", new Rectangle(3, 250, 73, 44));
            this.makeFrontUiRect("wulilianji", new Rectangle(84, 250, 73, 44));
            this.makeFrontUiRect("niepan", new Rectangle(166, 250, 73, 44));

            this.isLoadFinish = true

            // this.drawDemo(new Pan3d.Vector2D(random(200), random(200)))



        }
        private isLoadFinish: boolean
        private addA(v2d: Pan3d.Vector2D): void {  //单独一组数字
            var a: BaseFrontVo = this.drawLabel(1, { color: "red", num: 1234567890 }, false);
            a.x = 300 + v2d.x
            a.y = 200 + v2d.y
            a.alpha = 1;
            a.timeLen = 5000 //1秒后会自己动清理  //默认为10秒会清理

        }
        public addB(v2d: Pan3d.Vector2D): void { //组合，有底，有前部分和数字，注意层级
            //默认为10秒会清理    如需要时间，需要每个对象都赋置
            var b: BaseFrontVo = this.drawLabel(2, "wenzibeijing", true);
            b.x = 400 + v2d.x;
            b.y = 400 + v2d.y
            b.width = 320
            b.height = 80
            // var c: BaseFrontVo = this.drawLabel(2, "fanji", false);
            // c.x = b.x + 10
            // c.y = b.y + 30
            var d: BaseFrontVo = this.drawLabel(2, { color: "yellow", num: 8888 }, false);
            d.x = b.x + 100
            d.y = b.y + 30
            d.alpha = 1;
        }
        //拥有回调时间 ，可以用于处理移动以及透明，以及缩放
        private addC(v2d: Pan3d.Vector2D): void {

            var e: BaseFrontVo = this.drawLabel(1, { color: "red", num: 1234567890 }, false);
            e.x = 300 + v2d.x
            e.y = 600 + v2d.y
            e.alpha = 1;

            e.timeLen = 5000 //1秒后会自己动清理  //默认为10秒会清理
            e.fun = (taget: BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
                //t=>[0->1]
                taget.y--
                taget.x--
                taget.alpha = 0.5;
                taget.scale = 1 + t;
            }

        }
        private drawDemo(v2d: Pan3d.Vector2D): void {
            this.addA(v2d)
            this.addB(v2d)
            this.addC(v2d)
            Pan3d.TimeUtil.addTimeOut(1000 * 1, () => {
                this.drawDemo(new Pan3d.Vector2D(random(200), random(200)))
            })

        }
        public listFrontItem: Array<BaseFrontVo>
        public baseStrVo(value: string, isbottom: boolean): BaseFrontVo {
            var vo: BaseFrontVo = new BaseFrontVo(this, isbottom);
            vo.makeUi(value)
            return vo
        }
        public numStrVo(ccolor: string, nnum: number, isbottom: boolean): BaseFrontVo {
            var vo: ColorFrontVo = new ColorFrontVo(this, isbottom);
            vo.makeUi({ color: ccolor, num: nnum })
            return vo
        }
        //第一个参数为类开，1为数字，2为显示单图  //第二个为参数，第二个显上下层位置
        public drawLabel(type: number, data: any, isbottom: boolean = false): BaseFrontVo {
            if (!this.isLoadFinish) {
                return null
            }

            var vo: BaseFrontVo
            switch (type) {
                case 1:
                    vo = this.numStrVo(data.color, data.num, isbottom);
                    break
                case 2:
                    vo = this.baseStrVo(data, isbottom);
                    break
                default:
                    console.log("需要处理类型", type)
                    break
            }
            if (vo) {
                this.listFrontItem.push(vo);
            }

            return vo
        }

        private makeFrontUiRect(value: string, rect: Rectangle): void {
            var temp: any = this._baseRender.uiAtlas.getObject(value, rect.x, rect.y, rect.width, rect.height, 256, 512)
            temp.ow = rect.width;
            temp.oh = rect.height;
            this._baseRender.uiAtlas.configData.push(temp);
        }
        private addNum0_9(str: string, rect: Rectangle): void { //创建数字位置  str 前缀  rect 为数字宽度，和起始位置
            for (var i: number = 0; i < 10; i++) {
                this.makeFrontUiRect(str + "_num_" + i, new Rectangle(rect.width * i + rect.x, rect.y, rect.width, rect.height));
            }
        }

        public update(): void {
            for (var j: number = 0; j < this.listFrontItem.length; j++) {
                this.listFrontItem[j].update()
                if (this.listFrontItem[j].needClear) {
                    this.listFrontItem[j].destory()

                    j--
                }
            }
            for (var i: number = 0; i < this.renderList.length; i++) {
                if (this.bottomRendItem.indexOf(<FrontUIRenderComponent>this.renderList[i]) != -1) {
                    this.renderList[i].update()
                }
            }
            for (var k: number = 0; k < this.renderList.length; k++) {
                if (this.bottomRendItem.indexOf(<FrontUIRenderComponent>this.renderList[k]) == -1) {
                    this.renderList[k].update()

                    this.renderList[k].applyObjData();
                }
            }

            this.dynamicTextFornt.upFrameDraw();
        }

    }
}

module layapan {
    import Display3dMovie = Pan3d.Display3dMovie;
    export class LayaOverride2dSceneManager extends scene3d.OverrideSceneManager {
        private static sceneNum: number = 0
        constructor() {
            super();

            this.particleManager = new LayaOverride2dParticleManager();
            this.shadowManager = new LayaOverrideShadowManager();
            this.skillManager = new LayaOverride2dSkillManager(this);
            this.bloodManager = new Pan3d.BloodManager();
            this.groupDataManager = new LayaOverrideGroupDataManager();
            this.layaForntPanel = new topfront.LayaForntPanel();
            console.log("创建场景=>", LayaOverride2dSceneManager.sceneNum++);
        }
        public layaForntPanel: topfront.LayaForntPanel;
        public shadowManager: LayaOverrideShadowManager
        public groupDataManager: LayaOverrideGroupDataManager
        public skillManager: LayaOverride2dSkillManager;
        public particleManager: LayaOverride2dParticleManager;
        public bloodManager: Pan3d.BloodManager;

        public static initConfig(): void {
            Pan3d.SceneManager._instance = new LayaOverride2dSceneManager;
        }
        public update(): void {
            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            scene2d.GroundModel.getInstance().update();

            this.upFrame();
        }
        public changeBloodManager($bloodManager: Pan3d.BloodManager): void {
            this.bloodManager = $bloodManager
        }
        public addMovieDisplay($display: Display3dMovie): void {
            $display._scene = this
            this._displayRoleList.push($display);
            $display.addStage();
        }
        public loadSceneConfigCom(obj: any): void {
            //保持原来的角度
            var $rotationY: number = Pan3d.Scene_data.focus3D.rotationY;
            super.loadSceneConfigCom(obj);
            Pan3d.Scene_data.focus3D.rotationY = $rotationY;

        }
        public playLyf($url: string, $pos: Pan3d.Vector3D, $r: number = 0): void {

            this.groupDataManager.scene = this
            this.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, (groupRes: Pan3d.GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: Pan3d.GroupItem = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: Pan3d.CombineParticle = this.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.rotationY = $r;
                        this.particleManager.addParticle($particle);
                        $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
        }
        public charPlaySkill($char: layapan.LayaSceneChar, $skillfile: string): void {
            if (!$char._scene.ready) {
                return;
            }

            var $skill: layapan.OverrideSkill = this.skillManager.getSkill(getSkillUrl($skillfile), "skill_01");
            if (!$skill.keyAry) {
                return;
            }
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            $skill.configFixEffect($char);
            this.skillManager.playSkill($skill)
        }
        private onPlayCom(value: Pan3d.BaseEvent): void {
            this.particleManager.removeParticle(<Pan3d.CombineParticle>(value.target))
        }
        public cameraMatrix: Pan3d.Matrix3D;
        public viewMatrx3D: Pan3d.Matrix3D;
        public upFrame(): void {
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = Pan3d.TimeUtil.getTimer()

            }
            this.updateMovieFrame();
            if (this._ready) {
                this.particleManager.updateTime();
                this.skillManager.update()

                if (this.render) {
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();
                    this.shadowManager.update()
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                    this.particleManager.update();
                    this.bloodManager.update();
                    this.layaForntPanel.update()
                    Pan3d.Scene_data.context3D.setBlendParticleFactors(0)
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                }
                Pan3d.Scene_data.context3D.setDepthTest(false);
                Pan3d.UIManager.getInstance().update();

                this.cameraMatrix = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
                this.viewMatrx3D = Pan3d.Scene_data.viewMatrx3D.clone();
            }
        }
    }
}