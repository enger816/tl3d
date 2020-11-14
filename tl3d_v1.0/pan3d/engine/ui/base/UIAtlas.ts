

module Pan3d {
    export class UIAtlas {


        public textureRes: TextureRes;

        public configData: any;

        public layoutData: any;

        public ctx: CanvasRenderingContext2D;

        private _useImgUrl: string;

        public useImg: any;

        //public texture: WebGLTexture;


        public constructor() {

        }

        public get texture(): WebGLTexture {
            if (this.textureRes) {
                return this.textureRes.texture;
            } else {
                return null;
            }

        }


        public setInfo(configUrl: string, imgUrl: string, $fun: Function, useImgUrl: string = null): void {
            this._useImgUrl = useImgUrl;
            LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, ($str: any) => {
                var obj: any = JSON.parse($str);
                this.configData = obj.uiArr;
                this.layoutData = obj.panelArr;
                this.loadImgUrl(imgUrl, $fun);
            });
        }

        public loadConfig(configUrl: string, $fun: Function): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, ($str: any) => {
                var obj: any = JSON.parse($str);
                this.configData = obj.uiArr;
                $fun();

            });
        }

        public loadImgUrl(imgUrl: string, $fun: Function): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + imgUrl, ($texture: TextureRes) => {
                //this.texture = $texture.texture;
                this.textureRes = $texture;
                ////console.log(imgUrl);
                if (this._useImgUrl) {
                    this.loadUseImg($fun);
                } else {
                    $fun();
                }
            }, 1, null, 0);
        }

        public loadUseImg($fun: Function): void {

            this.useImg = makeImage()
            this.useImg.onload = () => {
                $fun();
            }
            this.useImg.src = Scene_data.fileRoot + this._useImgUrl;

        }

        public getRec($name: string): UIRectangle {
            var rec: UIRectangle = new UIRectangle;

            for (var j: number = 0; j < this.configData.length; j++) {
                if (this.configData[j].name == $name) {
                    rec.x = this.configData[j].x;
                    rec.y = this.configData[j].y;
                    rec.width = this.configData[j].width;
                    rec.height = this.configData[j].height;
                    rec.pixelWitdh = this.configData[j].ow;
                    rec.pixelHeight = this.configData[j].oh;
                    rec.pixelX = this.configData[j].ox;
                    rec.pixelY = this.configData[j].oy;

                    rec.type = this.configData[j].type;
                    rec.cellX = this.configData[j].cellX;
                    rec.cellY = this.configData[j].cellY;

                    break;
                }
            }

            return rec;
        }



        public getLayoutData($name: string): any {
            if (!this.layoutData) {
                return null;
            }
            for (var key in this.layoutData) {
                var ary: any = this.layoutData[key].item;
                for (var i: number = 0; i < ary.length; i++) {
                    if (ary[i].name == $name) {
                        return ary[i];
                    }
                }
            }
        }

        public getGridRec($name: string): UIGridRentangle {
            var rec: UIGridRentangle = new UIGridRentangle;

            for (var j: number = 0; j < this.configData.length; j++) {
                if (this.configData[j].name == $name) {
                    rec.x = this.configData[j].x;
                    rec.y = this.configData[j].y;
                    rec.width = this.configData[j].width;
                    rec.height = this.configData[j].height;
                    rec.pixelWitdh = this.configData[j].ow;
                    rec.pixelHeight = this.configData[j].oh;
                    rec.pixelX = this.configData[j].ox;
                    rec.pixelY = this.configData[j].oy;
                    rec.ogw = this.configData[j].uow;
                    rec.ogh = this.configData[j].uoh;
                    break;
                }
            }

            return rec;
        }

        public get hasData(): boolean {
            return this.configData;
        }

        public getObject($name: string, $x: number, $y: number, $width: number, $height: number, $maxWidth: number, $maxHeight: number, $cellx: number = 0, $celly: number = 0): any {
            var obj: any = new Object;
            obj.x = $x / $maxWidth;
            obj.y = $y / $maxHeight;
            obj.width = $width / $maxWidth;
            obj.height = $height / $maxHeight;
            obj.ow = $width;
            obj.oh = $height;
            obj.ox = $x;
            obj.oy = $y;
            obj.name = $name;
            obj.cellX = $cellx;
            obj.cellY = $celly;
            return obj;
        }

        public updateCtx($ctx: any, xpos: number, ypos: number): void {
            TextureManager.getInstance().updateTexture(this.texture, xpos, ypos, $ctx);
        }
        public upDataPicToTexture($url: string, $iconName: string): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE,
                ($img: any) => {

                    var rec: UIRectangle = this.getRec($iconName);
                    this.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    this.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    TextureManager.getInstance().updateTexture(this.texture, rec.pixelX, rec.pixelY, this.ctx);
                });
        }
        public clearCtxTextureBySkilname($iconName: string): void {
            var rec: UIRectangle = this.getRec($iconName);
            this.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.ctx.clearRect(0, 0, rec.pixelWitdh, rec.pixelHeight)
            TextureManager.getInstance().updateTexture(this.texture, rec.pixelX, rec.pixelY, this.ctx);
        }

        public copyPicToTexture($srcSkin: string, $desSkin: string): void {
            var srcRec: UIRectangle = this.getRec($srcSkin);
            var desRec: UIRectangle = this.getRec($desSkin);

            this.ctx = UIManager.getInstance().getContext2D(desRec.pixelWitdh, desRec.pixelHeight, false);
            this.ctx.drawImage(this.useImg, srcRec.pixelX, srcRec.pixelY, srcRec.pixelWitdh, srcRec.pixelWitdh, 0, 0, desRec.pixelWitdh, desRec.pixelWitdh);
            TextureManager.getInstance().updateTexture(this.texture, desRec.pixelX, desRec.pixelY, this.ctx);
        }


        /**
         * 渲染文字
         */
        public updateLable($key: string, $str: string, fontsize: number, fontColor: string,
            textBaseline: string = TextAlign.MIDDLE, textAlign: string = TextAlign.CENTER, bolder: boolean = false, maxWidth: number = 0): void {

            var rec: UIRectangle = this.getRec($key);
            this.ctx = this.getTextCtx(rec, fontsize, fontColor, bolder, textBaseline, textAlign);

            var xpos: number = this.getTextxpos(textAlign, this.ctx);
            var ypos: number = this.getTextypos(textBaseline, this.ctx);

            if (maxWidth > 0) {
                this.wrapText(this.ctx, $str, xpos, ypos, maxWidth, fontsize + 3);
            } else {
                this.ctx.fillText($str, xpos, ypos);
            }

            TextureManager.getInstance().updateTexture(this.texture, rec.pixelX, rec.pixelY, this.ctx);
        }
        public updateArtNum($targetName: string, $srcName: string, num: number): void {
            var str: string = String(num);
            var targetRec: UIRectangle = this.getRec($targetName);
            var srcRec: UIRectangle = this.getRec($srcName);
            this.ctx = UIManager.getInstance().getContext2D(targetRec.pixelWitdh, targetRec.pixelHeight, false);
            var sw: number = srcRec.pixelWitdh / 10;
            for (var i: number = 0; i < str.length; i++) {
                var snum: number = Number(str.charAt(i));
                this.ctx.drawImage(this.useImg, srcRec.pixelX + snum * sw, srcRec.pixelY, sw, srcRec.pixelHeight,
                    i * sw, 0, sw, srcRec.pixelHeight);
            }
            TextureManager.getInstance().updateTexture(this.texture, targetRec.pixelX, targetRec.pixelY, this.ctx);
        }



        //写入单行颜色字体，字号,对齐，基础颜色 并上传显卡
        public writeSingleLabel($key: string, $str: string, fontsize: number = 12, $align: string = TextAlign.CENTER, $baseColor: string = "#ffffff"): void {
            LabelTextFont.writeSingleLabel(this, $key, $str, fontsize, $align, $baseColor);

        }
        //单行字绘制到CXT上
        public writeSingleLabelToCxt($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0): void {
            $ctx.textBaseline = TextAlign.TOP;
            $ctx.textAlign = TextAlign.LEFT;
            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            TextRegExp.wrapText($ctx, $str, "#ffffff", $tx, $ty, 9999, 20);  //9999为无限大

        }

        /**
         * 未渲染文字。只是绘制到CanvasRenderingContext2D
         * 返回CanvasRenderingContext2D对象
         */
        public updateLableCtx($ctx: CanvasRenderingContext2D, $str: string, $x: number, $y: number, $fontsize: number
            , $textAlign: string = TextAlign.CENTER
            , $textBaseline: string = TextAlign.MIDDLE
            , $textcolor: string = "#000000"
            , $textbolder: string = "bolder"
            , $maxWidth: number = 0): void {

            $ctx.textAlign = $textAlign
            $ctx.textBaseline = $textBaseline
            $ctx.fillStyle = $textcolor;
            $ctx.font = $textbolder + " " + $fontsize + "px " + UIData.font;

            var $xpos: number = this.getTextxpos($textAlign, $ctx);

            if ($maxWidth > 0) {
                this.wrapText($ctx, $str, $x, $y, $maxWidth, $fontsize + 3);
            } else {
                $ctx.fillText($str, $x + $xpos, $y);
            }
        }

        public getTextCtx($rec: UIRectangle, $fontsize: number, $fontColor: string, $bolder: boolean, $textBaseline: string
            , $textAlign: string): CanvasRenderingContext2D {

            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            $ctx.textBaseline = $textBaseline;
            $ctx.textAlign = $textAlign;
            $ctx.fillStyle = $fontColor;
            $ctx.font = ($bolder ? "bolder " : "") + " " + $fontsize + "px " + UIData.font;

            return $ctx;
        }

        private getTextxpos($textAlign: string, $ctx: CanvasRenderingContext2D): number {

            var $xpos: number = 0;
            if ($textAlign == TextAlign.LEFT) {
                $xpos = 0;
            } else if ($textAlign == TextAlign.RIGHT) {
                $xpos = $ctx.canvas.width;
            } else if ($textAlign == TextAlign.CENTER) {
                $xpos = $ctx.canvas.width / 2;
            }

            return $xpos;
        }

        private getTextypos($textBaseline: string, $ctx: CanvasRenderingContext2D): number {

            var $ypos: number = 0;
            if ($textBaseline == TextAlign.BOTTOM) {
                $ypos = $ctx.canvas.height;
            } else if ($textBaseline == TextAlign.TOP) {
                $ypos = 0;
            } else if ($textBaseline == TextAlign.MIDDLE) {
                $ypos = $ctx.canvas.height / 2;
            }

            return $ypos;
        }



        private wrapText(context, text, x, y, maxWidth, lineHeight) {
            var words = text;
            var line = "";

            for (var n = 0; n < words.length; n++) {

                if (words[n] == "\n") {
                    context.fillText(line, x, y);
                    line = "";
                    y += lineHeight;
                } else {
                    var testLine = line + words[n] + " ";
                    var metrics = context.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > maxWidth) {
                        context.fillText(line, x, y);
                        line = words[n] + "";
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }

                }

            }
            context.fillText(line, x, y);
        }

        public _hasDispose: boolean = false;
        public dispose(): void {
            if (this._hasDispose) {
                return;
            }
            this.textureRes.clearUseNum();
            this.configData = null;
            this.layoutData = null;
            this.useImg = null;
            this._hasDispose = true;
        }

    }

}