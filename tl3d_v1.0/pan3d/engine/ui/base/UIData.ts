module Pan3d {
    export class MainUiLoad {
        public static loadFun: Function
        public static init($res: Array<any>, $bfun: Function, $loadFun: Function = null): number {
            this._itemLoad = $res;//初始化资源内容
            this._bFun = $bfun;
            this.loadFun = $loadFun;
            this.loadBaseConfigCom();
            return $res.length;
        }
        private static _skipnum: number = 0;
        private static _bFun: Function;
        private static _itemLoad: Array<any>;
        private static loadBaseConfigCom(): void {
            for (var i: number = 0; i < this._itemLoad.length; i++) {
                this.loadUIdata(this._itemLoad[i].xmlurl, this._itemLoad[i].picurl, this._itemLoad[i].name, Boolean(this._itemLoad[i].isTexture));
            }
        }
        private static loadOkNum($num: number): void {
            if (this.loadFun) {
                this.loadFun($num);
            }
        }
        private static _dic: Dictionary = new Dictionary([]);
        private static _imgDic: Dictionary = new Dictionary([]);
        private static loadUIdata($xmlUrl: string, $imgUrl: string, $key: string = "default", $isTexture: boolean = false): void {
            if (!$isTexture) {
                var kim: HTMLImageElement = makeImage()
                this._imgDic[$key] = kim;
                kim.onload = (evt: Event) => {
                    this.loadOkd()
                }
            }
            LoadManager.getInstance().load(Scene_data.fileRoot + $xmlUrl, LoadManager.XML_TYPE,
                ($data: string) => {
                    var $arr: Array<any> = Array(JSON.parse($data))[0];
                    this._dic[$key] = $arr;
                    if ($isTexture) {
                        TextureManager.getInstance().getTexture(Scene_data.fileRoot + $imgUrl, ($texture: TextureRes) => {
                            this._imgDic[$key] = $texture;
                            this.loadOkd()
                        }, 1, null, 0);
                    } else {
                        kim.src = Scene_data.fileRoot + $imgUrl;
                    }
                });
        }
        public static loadOkd(): void {
            this._skipnum++
            this.loadOkNum(this._skipnum)
            if (this._skipnum >= this._itemLoad.length) {
                this._bFun()
            }
        }


    }

    export class UIData {
        //设计宽高
        public static designWidth: number = 960;
        public static designHeight: number = 540;
        public static font: string = "Helvetica";//Georgia

        public static Scale: number;

        public static setDesignWH($width: number, $height: number): void {
            this.designWidth = $width;
            this.designHeight = $height;
            //  this.Scale = Math.min(Scene_data.stageWidth / $width, Scene_data.stageHeight / $height);
            this.resize();
        }
        public static resize(): void {

            this.Scale = Math.min(Scene_data.stageWidth / this.designWidth, Scene_data.stageHeight / this.designHeight);
        }
        public static textImg: any; //文本数字图片
        public static loadFun: Function
        public static init($res: Array<any>, $bfun: Function, $loadFun: Function = null): number {
            this._itemLoad = $res;//初始化资源内容
            this._bFun = $bfun;
            this.loadFun = $loadFun;
            this.loadBaseConfigCom();
            return $res.length;
        }
        private static _skipnum: number = 0;
        private static _bFun: Function;
        private static _listUIRenderComponent: UIRenderComponent
        public static get mainUIAtlas(): UIAtlas {//基础公用显示对象。如提示框。还有公用背景按钮
            return null

        }
        private static _itemLoad: Array<any>;
        private static loadBaseConfigCom(): void {
            for (var i: number = 0; i < this._itemLoad.length; i++) {
                this.loadUIdata(this._itemLoad[i].xmlurl, this._itemLoad[i].picurl, this._itemLoad[i].name, Boolean(this._itemLoad[i].isTexture));
            }
        }
        private static loadOkNum($num: number): void {
            if (this.loadFun) {
                this.loadFun($num);
            }
        }
        public static textlist: string = "textlist";

        public static publicUi: string = "publicUi";
        public static faceItem: Array<string> = ["/大笑", "/脸2", "/脸3", "/脸4", "/脸5", "/脸6", "/脸7", "/脸8", "/脸9", "/脸a", "/脸b", "/脸c", "/脸d", "/脸e", "/脸f", "/脸g", "/脸h", "/脸i"];


        private static _dic: Dictionary = new Dictionary([]);
        private static _imgDic: Dictionary = new Dictionary([]);
        private static loadUIdata($xmlUrl: string, $imgUrl: string, $key: string = "default", $isTexture: boolean = false): void {
            if (!$isTexture) {
                var kim: HTMLImageElement = makeImage()
                this._imgDic[$key] = kim;
                kim.onload = (evt: Event) => {
                    this.loadOkd()
                }
            }
            LoadManager.getInstance().load(Scene_data.fileRoot + $xmlUrl, LoadManager.XML_TYPE,
                ($data: string) => {
                    var $arr: Array<any> = Array(JSON.parse($data))[0];
                    this._dic[$key] = $arr;
                    if ($isTexture) {
                        TextureManager.getInstance().getTexture(Scene_data.fileRoot + $imgUrl, ($texture: TextureRes) => {
                            this._imgDic[$key] = $texture;
                            this.loadOkd()
                        }, 1, null, 0);
                    } else {
                        kim.src = Scene_data.fileRoot + $imgUrl;
                    }
                });


        }
        public static loadOkd(): void {
            this._skipnum++
            this.loadOkNum(this._skipnum)
            if (this._skipnum >= this._itemLoad.length) {
                UIData.textImg = this._imgDic[UIData.textlist] //将指定图片给
                this._bFun()
            }
        }
        public static getImgByKey($key: string): HTMLImageElement {
            if (this._imgDic.containsKey($key)) {
                return this._imgDic[$key]
            }
            //console.log("uiData getImgByKey=>" + $key)
            return null
        }
        public static getUiByName($key: string, $name: string): Object {
            if (this._dic.containsKey($key)) {
                var uiArr: any = this._dic[$key].uiArr
                for (var i: number = 0; i < uiArr.length; i++) {
                    if (uiArr[i].name == $name) {
                        return uiArr[i]
                    }
                }
            }
            //console.log("uiData getUiByName =>" + $name)
            return null
        }
        public static getUiArrByKey($key: string): any {
            if (this._dic.containsKey($key)) {
                return this._dic[$key].uiArr
            }
            return null
        }
    }

    export class UiDraw {

        public static drawUseImg($ui: UICompenent, $useImgAtlas: UIAtlas, $skinName: string): void {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var useRec: any = $useImgAtlas.getRec($skinName);
            ctx.drawImage($useImgAtlas.useImg, useRec.pixelX, useRec.pixelY, useRec.pixelWitdh, useRec.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        public static clearUI($ui: UICompenent): void {
            var $uiRect: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $ui.uiRender.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        }

        public static drawTxtLab($ui: UICompenent, $str: string, $fontsize: number, $align: string, $tx: number = 0, $ty: number = 3): void {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);

            LabelTextFont.writeSingleLabelToCtx(ctx, $str, $fontsize, $tx, $ty, $align);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        /**属性 - value */
        public static drawAttVal($ui: UICompenent, $att: number, $val: number, $align: string = TextAlign.LEFT, $needadd: boolean = false): void {
            var keyStr: string = "";
            if (typeof ($att) == "undefined") {
                UiDraw.clearUI($ui);
                return;
            }

            keyStr = ColorType.Orange7a2f21 + getKeyProById($att) + ":  " + ColorType.Orange9a683f + Snum(Math.floor($val / 100));
            if ($needadd) {
                keyStr = ColorType.Orange7a2f21 + getKeyProById($att) + ":  " + ColorType.Orange9a683f + "+" + Snum(Math.floor($val / 100));
            }
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, keyStr, 14, $align);
        }

        /**绘制未获得属性 - value */
        public static drawAttValAdd($ui: UICompenent, $att: number, $val: number): void {
            var keyStr: string = "";
            if (typeof ($att) == "undefined") {
                UiDraw.clearUI($ui);
                return;
            }
            keyStr = ColorType.Orange7a2f21 + getKeyProById($att) + ":    " + ColorType.Green2ca937 + "+" + Snum(Math.floor($val / 100));
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, keyStr, 14, TextAlign.LEFT);
        }

        /**绘制增加属性 向上箭头 */
        public static drawAddValTop($ui: UICompenent, $val: number): void {
            var addStr: string = "";
            if ($val > 0) {
                addStr = "+" + Snum(Math.floor($val / 100));
            } else {
                addStr = "+0";
            }
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            if (addStr != "") {
                UiDraw.cxtDrawImg(ctx, PuiData.ARROW_TOP, new Rectangle(0, 3, 12, 16), UIData.publicUi);
            }

            LabelTextFont.writeSingleLabelToCtx(ctx, addStr, 14, 15, 0, TextAlign.LEFT, ColorType.Green2ca937);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }
        /**绘制增加属性 向右箭头 $align只接受左右对齐*/
        public static drawAddValRight($ui: UICompenent, $val: number, $needadd: boolean = false, $align: string = TextAlign.RIGHT): void {
            // var addStr: string = "";
            if ($val >= 0) {
                // addStr = Snum($val);
                var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                UiDraw.cxtDrawImg(ctx, PuiData.ARROW_RIGHT, new Rectangle(0, 3, 16, 12), UIData.publicUi);
                var addStr: string = Snum(Math.floor($val / 100));
                if ($needadd) {
                    addStr = "+" + addStr;
                }
                var tx: number = 0;
                if ($align == TextAlign.LEFT) {
                    tx = 22;
                }
                //console.log("-----addStr----",addStr,tx);
                LabelTextFont.writeSingleLabelToCtx(ctx, addStr, 14, tx, 0, $align, ColorType.Green2ca937);
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            } else {
                UiDraw.clearUI($ui);
            }
        }

        /**
         * 绘制需 自身有某id的道具多少个和需要多少数量的道具  a/b
         * @param  
         * @param  
         * @param  
         */
        public static drawResHasNumAndAllNum($ui: UICompenent, $CostAry: Array<number>, $txt: string = ""): boolean {
            var costnum: string;
            var flag: boolean;

         
            return false;
        }

        /**
         * 在ctx上指定位置绘制一个小图标
         * @param  
         * @param  
         */
        public static drawCost($cxt: CanvasRenderingContext2D, $tx: number, $ty: number, $type: number): void {
            UiDraw.cxtDrawImg($cxt, UIuitl.getInstance().costtype($type), new Rectangle($tx, $ty, 35, 35), UIData.publicUi);
        }
        public static drawCostUI($ui: UICompenent, $tx: number, $ty: number, $type: number): void {
            var $goldtxtrec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($goldtxtrec.pixelWitdh, $goldtxtrec.pixelHeight, false);
            UiDraw.cxtDrawImg($ctx, UIuitl.getInstance().costtype($type), new Rectangle($tx, $ty, 35, 35), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx($ctx, $goldtxtrec.pixelX, $goldtxtrec.pixelY);
        }

       

        //将目标的图绘制到CXT对象中，
        public static cxtDrawImg($cxt: CanvasRenderingContext2D, $name, $rect: Rectangle, $key: string): void {
            var obj: any = UIData.getUiByName($key, $name);
            if (obj) {
                if ($rect.width == 0 || $rect.height == 0) {
                    $rect.width = obj.ow;
                    $rect.height = obj.oh;
                }
                if (obj.type == 0) {
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.ow, obj.oh, $rect.x, $rect.y, $rect.width, $rect.height);
                } else if (obj.type == 1) {
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.uow, obj.uoh, $rect.x, $rect.y, obj.uow, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy, obj.ow - obj.uow * 2, obj.uoh, $rect.x + obj.uow, $rect.y, $rect.width - obj.uow * 2, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy, obj.uow, obj.uoh, $rect.x + $rect.width - obj.uow, $rect.y, obj.uow, obj.uoh);

                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.uoh, obj.uow, obj.oh - obj.uoh * 2, $rect.x, $rect.y + obj.uoh, obj.uow, $rect.height - obj.uoh * 2);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.uoh, obj.ow - obj.uow * 2, obj.oh - obj.uoh * 2, $rect.x + obj.uow, $rect.y + obj.uoh, $rect.width - obj.uow * 2, $rect.height - obj.uoh * 2);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.uoh, obj.uow, obj.uoh, $rect.x + $rect.width - obj.uow, $rect.y + obj.uoh, obj.uow, $rect.height - obj.uoh * 2);

                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, $rect.x, $rect.y + $rect.height - obj.uoh, obj.uow, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.oh - obj.uoh, obj.ow - obj.uow * 2, obj.uoh, $rect.x + obj.uow, $rect.y + $rect.height - obj.uoh, $rect.width - obj.uow * 2, obj.uoh);
                    $cxt.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, $rect.x + $rect.width - obj.uow, $rect.y + $rect.height - obj.uoh, obj.uow, obj.uoh);
                } else {
                    alert("UiDraw没有绘制成功  " + obj.type);
                }

            }


        }

        //将目标的图绘制到$uiAtlas纹理对象中，
        public static uiAtlasDrawImg($uiAtlas: UIAtlas, $skinName: string, $key: string, $shareName: string): void {
            var $uiRectangle: UIRectangle = $uiAtlas.getRec($skinName)
            $uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);
            var obj: any = UIData.getUiByName($key, $shareName);
            ////console.log("obj", obj)
            if (obj) {
                if (obj.type == 0) {
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.ow, obj.oh, 0, 0, $uiRectangle.pixelWitdh, $uiRectangle.pixelHeight);
                } else if (obj.type == 1) {
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy, obj.uow, obj.uoh, 0, 0, obj.uow, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy, obj.ow - obj.uow * 2, obj.uoh, obj.uow, 0, $uiRectangle.pixelWitdh - obj.uow * 2, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow, 0, obj.uow, obj.uoh);

                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.uoh, obj.uow, obj.oh - obj.uoh * 2, 0, obj.uoh, obj.uow, $uiRectangle.pixelHeight - obj.uoh * 2);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.uoh, obj.ow - obj.uow * 2, obj.oh - obj.uoh * 2, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow * 2, $uiRectangle.pixelHeight - obj.uoh * 2);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.uoh, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow, obj.uoh, obj.uow, $uiRectangle.pixelHeight - obj.uoh * 2);

                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, 0, $uiRectangle.pixelHeight - obj.uoh, obj.uow, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.uow, obj.oy + obj.oh - obj.uoh, obj.ow - obj.uow * 2, obj.uoh, obj.uow, $uiRectangle.pixelHeight - obj.uoh, $uiRectangle.pixelWitdh - obj.uow * 2, obj.uoh);
                    $uiAtlas.ctx.drawImage(UIData.getImgByKey($key), obj.ox + obj.ow - obj.uow, obj.oy + obj.oh - obj.uoh, obj.uow, obj.uoh, $uiRectangle.pixelWitdh - obj.uow, $uiRectangle.pixelHeight - obj.uoh, obj.uow, obj.uoh);
                } else {
                    //console.log("11");
                }

                TextureManager.getInstance().updateTexture($uiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, $uiAtlas.ctx);
            } else {
                alert("uiAtlasDrawImg错误")
            }

        }


        /**
         * 将共享资源图绘制到$uiAtlas纹理对象中
         * $touiAtlas：绘制到的uiAtlas对象
         * $fromuiAtlas: 资源来源的uiAtlas对象
         * $skinName: 绘制对象名
         * $shareName：资源名
         * $tx：偏移量x
         * $ty：偏移量y
         * $fillflag：是否填充整个对象，若填充，则考虑偏移量，否则反之
         */
        public static SharedDrawImg($touiAtlas: UIAtlas, $fromuiAtlas: UIAtlas, $skinName: string, $shareName: string, $tx: number = 0, $ty: number = 0, $fillflag: boolean = true): void {
            var $uiRectangle: UIRectangle = $touiAtlas.getRec($skinName)
            $touiAtlas.ctx = UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);
            var imgUseRect: UIRectangle = $fromuiAtlas.getRec($shareName)

            var posx: number = $fillflag ? 0 : $tx
            var posy: number = $fillflag ? 0 : $ty
            var pwitdh: number = $fillflag ? $uiRectangle.pixelWitdh : imgUseRect.pixelWitdh
            var phight: number = $fillflag ? $uiRectangle.pixelHeight : imgUseRect.pixelHeight

            $touiAtlas.ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, posx, posy, pwitdh, phight);
            TextureManager.getInstance().updateTexture($touiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, $touiAtlas.ctx);
        }
        public static drawToUiAtlasToCtx($ctx: CanvasRenderingContext2D, $fromuiAtlas: UIAtlas, $shareName: string, $posRect: Rectangle): void {
            var imgUseRect: UIRectangle = $fromuiAtlas.getRec($shareName)
            if (!$posRect) {
                $posRect = new Rectangle(0, 0, 0, 0)
            }
            if ($posRect.width > 1 && $posRect.height > 1) {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, $posRect.width, $posRect.height);
            } else {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
            }

        }
        public static RepeatLoadImg($url1: string, $url2: string, $backFuc: Function = null): void {
            var imgA: any = makeImage()
            imgA.onload = () => {
                LoadManager.getInstance().load($url2, LoadManager.IMG_TYPE,
                    ($imgB: any) => {
                        if ($backFuc) {
                            $backFuc(imgA, $imgB);
                        }
                    });
            }
            imgA.src = $url1;

        }
    }

    export class UIuitl {
        private static _instance: UIuitl;
        public static getInstance(): UIuitl {
            if (!this._instance) {
                this._instance = new UIuitl();
            }
            return this._instance;
        }

        public constructor() {

        }

        /**
         * 绘制背景图+资源icon+资源数目
         */
        public drawCostUI($uiAtlas: UIAtlas, $skinName: string, $costary: Array<any>, $fontcolor: string = "#000000", $bgwidth: number = 0, $bgheight: number = 0): void {
            if ($fontcolor.indexOf("[") != -1) {  //[00ff00]
                $fontcolor = "#" + $fontcolor.substr(1, 6);
            }
            var $rec: UIRectangle = $uiAtlas.getRec($skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            if ($bgwidth == 0) {
                $bgwidth = $rec.pixelWitdh;
                $bgheight = $rec.pixelHeight;
            }
            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle($rec.pixelWitdh - $bgwidth, $rec.pixelHeight - $bgheight - 3, $bgwidth, $bgheight + 3), UIData.publicUi);

            var posx: number
            var posy: number
            if (Number($costary[0]) > -1) {
                UiDraw.cxtDrawImg(ctx, this.costtype(Number($costary[0])), new Rectangle(0, 0, 35, 35), UIData.publicUi);
                posx = ($bgwidth - 35) / 2 + 35;
                if ($bgheight >= 35) {
                    posy = 2
                } else {
                    posy = 35 - $bgheight
                }
            } else {
                posx = $bgwidth / 2 + ($rec.pixelWitdh - $bgwidth)
                posy = $rec.pixelHeight - $bgheight
            }

            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($costary[1]), 16, posx, posy, TextAlign.CENTER, $fontcolor);
            ArtFont.getInstance()
            $uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        public costtype($costid: number): string {
            switch ($costid) {
                case 1:
                    //元宝
                    return PuiData.A_YUANBAO;
                case 2:
                    //绑定元宝
                    return PuiData.A_BANGYUAN;
                case 3:
                    //身上的银子
                    return PuiData.A_YINBI;
                case 101:
                    //真气
                    return PuiData.A_ZHENQI;
                case 102:
                    //兽灵
                    return PuiData.A_SHOULING;
                case 103:
                    //宝石精华
                    return PuiData.A_JINGHUA;
                case 6:
                    //帮贡
                    return PuiData.A_BANGGONG;
                case 7:
                    //荣誉
                    return PuiData.A_HONOR;
                case 8:
                    //斗魂
                    return PuiData.A_DOUHUN;
                case 9:
                    //历练值
                    return PuiData.A_DOUHUN;
                case 10:
                    //怪物令牌
                    return PuiData.A_CARD_G;
                case 11:
                    //采集令牌
                    return PuiData.A_CARD_C;
                case 12:
                    //押镖令牌
                    return PuiData.A_CARD_B;
                case 104:
                    //经验
                    return PuiData.A_EXP;
                default:
                    break

            }
        }
    }



}