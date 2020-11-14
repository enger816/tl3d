
module Pan3d {
    export class ArtFont {
        public fontData: Dictionary;
        public fontData_Unit: Dictionary;
        constructor() {
            this.fontData = new Dictionary([]);
            this.fontData_Unit = new Dictionary([]);
            this.makeFontRect();
        }


        public static Red: string = "Red";
        public static Green: string = "Green";
        public static Blue: string = "Blue";
        public static White: string = "White";
        public static Yellow: string = "Yellow";

        public static BOSSBIGTXT: string = "NUM99";
        public static CN1: string = "NUM100";
        public static num101: string = "NUM101";
        public static num102: string = "NUM102";

        public static BigYellow: string = "NUM12";
        public static num99: string = "NUM99";
        public static GARY_TXT: string = "NUM1";  //NUM1.PNG
        public static ORANGE_TXT: string = "NUM19";  //NUM2


        public static num1: string = "NUM1";  //NUM1
        public static num2: string = "NUM2";  //NUM2
        public static num3: string = "NUM3";  //NUM3
        public static num4: string = "NUM4";  //NUM4
        public static num5: string = "NUM5";  //NUM5
        public static num6: string = "NUM6";  //NUM6
        public static num7: string = "NUM7";  //NUM7

        public static num10: string = "NUM10";  //NUM10

        public static num8: string = "NUM8";  //NUM8
        public static num9: string = "NUM9";  //NUM9
        public static num11: string = "NUM11";  //NUM11

        public static num12: string = "NUM12";  //NUM

        public static num13: string = "NUM13";  //NUM13
        public static num14: string = "NUM14";  //NUM
        public static num15: string = "NUM15";  //NUM


        public static num16: string = "NUM16";  //NUM
        public static num17: string = "NUM17";  //NUM
        public static num18: string = "NUM18";  //NUM
        public static num19: string = "NUM19";  //NUM
        public static num20: string = "NUM20";  //NUM
        public static num21: string = "NUM21";  //NUM

        public static num22: string = "NUM22";  //NUM
        public static num23: string = "NUM23";  //NUM

        public static num24: string = "NUM24";  //NUM
        public static num25: string = "NUM24";  //NUM
        public static num26: string = "NUM26";  //NUM
        public static num27: string = "NUM27";  //NUM
        public static num28: string = "NUM28";  //NUM

        public static num30: string = "NUM30";  //NUM


        public static num51: string = "NUM51";  //NUM
        public static num52: string = "NUM52";  //NUM
        public static num53: string = "NUM53";  //NUM
        public static num54: string = "NUM54";  //NUM
        public static num55: string = "NUM55";  //NUM
        public static num56: string = "NUM56";  //NUM
        public static num57: string = "NUM57";  //NUM
        public static num58: string = "NUM58";  //NUM
        public static num59: string = "NUM59";  //NUM
        public static num60: string = "NUM60";  //NUM

        public static num61: string = "NUM61";  //NUM
        public static numVip: string = "NUM62";  //NUM
        public static num63: string = "NUM63";  //NUM
        public static num64: string = "NUM64";  //NUM
        public static num65: string = "NUM65";  //NUM
        public static num66: string = "NUM66";  //NUM

        private static _instance: ArtFont;
        public static getInstance(): ArtFont {
            if (!this._instance) {
                this._instance = new ArtFont();
            }
            return this._instance;
        }
        private makeFontRect(): void {
            this.fontData["Red"] = this.makeBase12pxNum(new Vector2D(0, 0));
            this.fontData["Green"] = this.makeBase12pxNum(new Vector2D(0, 15));
            this.fontData["Blue"] = this.makeBase12pxNum(new Vector2D(0, 30));
            this.fontData["White"] = this.makeBase12pxNum(new Vector2D(0, 45));
            this.fontData["Yellow"] = this.makeBase12pxNum(new Vector2D(0, 75));

            this.getXmlData()

        }
        private getXmlData(): void {
            // var obj: any = UIData.getUiByName(UIData.textlist, "A_txt1");
            var $uiList: Array<any> = UIData.getUiArrByKey(UIData.textlist);
            for (var i: number = 0; i < $uiList.length; i++) {
                var $skinName: string = String($uiList[i].name)
                if ($skinName.search("A_") != -1) {
                    var $id: number = Number($skinName.substring(5, $skinName.length))
                    var $uiRect: UIRectangle = new UIRectangle();
                    $uiRect.pixelX = Number($uiList[i].ox);
                    $uiRect.pixelY = Number($uiList[i].oy);
                    $uiRect.pixelWitdh = Number($uiList[i].ow);
                    $uiRect.pixelHeight = Number($uiList[i].oh);
                    $uiRect.cellX = Number($uiList[i].cellX);
                    $uiRect.cellY = Number($uiList[i].cellY);
                    var $rectFont: Rectangle = new Rectangle(0, 0, $uiRect.pixelWitdh / $uiRect.cellX, $uiRect.pixelHeight);
                    var $arr: Array<Rectangle> = new Array;
                    for (var j: number = 0; j < $uiRect.cellX; j++) {
                        $arr.push(new Rectangle($uiRect.pixelX + j * $rectFont.width, $uiRect.pixelY, $rectFont.width, $rectFont.height));
                    }
                    this.fontData["NUM" + $id] = $arr;
                    //  //console.log("NUM" + $id, $arr)
                }
                //万、亿
                if ($skinName.search("B_") != -1) {
                    var $id: number = Number($skinName.substring(5, $skinName.length))
                    var $uiRect: UIRectangle = new UIRectangle();
                    $uiRect.pixelX = Number($uiList[i].ox);
                    $uiRect.pixelY = Number($uiList[i].oy);
                    $uiRect.pixelWitdh = Number($uiList[i].ow);
                    $uiRect.pixelHeight = Number($uiList[i].oh);
                    $uiRect.cellX = Number($uiList[i].cellX);
                    $uiRect.cellY = Number($uiList[i].cellY);
                    var $rectFont: Rectangle = new Rectangle(0, 0, $uiRect.pixelWitdh / $uiRect.cellX, $uiRect.pixelHeight);
                    var $arr: Array<Rectangle> = new Array;
                    for (var j: number = 0; j < $uiRect.cellX; j++) {
                        $arr.push(new Rectangle($uiRect.pixelX + j * $rectFont.width, $uiRect.pixelY, $rectFont.width, $rectFont.height));
                    }
                    this.fontData_Unit["BNUM" + $id] = $arr;
                    //  //console.log("NUM" + $id, $arr)
                }
            }

        }



        private makeBase12pxNum($pos: Vector2D): Array<Rectangle> {
            var $arr: Array<Rectangle> = new Array;
            $arr.push(new Rectangle(3, 0, 9, 14))//0
            $arr.push(new Rectangle(14, 0, 9, 14))//1
            $arr.push(new Rectangle(25, 0, 9, 14))//2
            $arr.push(new Rectangle(36, 0, 9, 14))//3
            $arr.push(new Rectangle(47, 0, 9, 14))//4
            $arr.push(new Rectangle(59, 0, 9, 14))//5
            $arr.push(new Rectangle(70, 0, 9, 14))//6
            $arr.push(new Rectangle(81, 0, 9, 14))//7
            $arr.push(new Rectangle(92.5, 0, 9, 14))//8
            $arr.push(new Rectangle(104, 0, 9, 14))//9
            $arr.push(new Rectangle(116, 0, 9, 14))//<+>
            $arr.push(new Rectangle(126, 0, 9, 14))//<->
            $arr.push(new Rectangle(136, 0, 9, 14))//</>
            $arr.push(new Rectangle(144, 0, 9, 13))//<:>
            $arr.push(new Rectangle(154, 0, 9, 13))//<.>

            for (var i: number = 0; i < $arr.length; i++) {
                $arr[i].x = $arr[i].x + $pos.x;
                $arr[i].y = $arr[i].y + $pos.y;
            }
            return $arr;
        }

        // public txtInterval: number = 0;
        //将美术字写到ctx上 左对齐的
        public writeFontToCtxLeft($ctx: CanvasRenderingContext2D, $str: string, $color: string = ArtFont.num1, $tx: number = 0, $ty: number = 0, $txtInterval: number = 0): number {
            var $textItem: Array<Rectangle> = this.fontData[$color]
            var totalW: number = 0;
            var numId: number;
            for (var i: number = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect: Rectangle = this.getRect(numId, $color, $textItem);

                if (!txtNumRect) {
                    //console.log("writeFontToCtxLeft有错")
                    return
                }
                $ctx.drawImage(UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx, $ty, txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval)
            }
            return totalW;
        }
        /**
         * 将美术字写到ctx上 右对齐的
         * $tx:绘制的终点x
         * $ty:绘制的起点Y
         */
        public writeFontToCtxRight($ctx: CanvasRenderingContext2D, $str: string, $color: string = ArtFont.White, $tx: number = 0, $ty: number = 0, $txtInterval: number = 0): number {
            var $textItem: Array<Rectangle> = this.fontData[$color]
            var totalW: number = 0;

            var $txtWidth: number = this.getAirFontWidth($ctx, $str, $color, $txtInterval);
            var numId: number;
            for (var i: number = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect: Rectangle = this.getRect(numId, $color, $textItem);
                $ctx.drawImage(UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx - $txtWidth, $ty, txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }

            return $txtWidth;
        }

        //将美术字写到ctx上 中对齐的center
        public writeFontToCtxCenten($ctx: CanvasRenderingContext2D, $str: string, $color: string = ArtFont.White, $tx: number = 0, $ty: number = 0, $txtInterval: number = 0): number {
            var $textItem: Array<Rectangle> = this.fontData[$color]
            var totalW: number = 0;
            var $txtWidth: number = this.getAirFontWidth($ctx, $str, $color, $txtInterval) / 2;
            var numId: number;
            if ($str == undefined) {
                //console.log("有错的")
            }
            for (var i: number = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect: Rectangle = this.getRect(numId, $color, $textItem);
                $ctx.drawImage(UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx - $txtWidth, $ty, txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }
            return $txtWidth;
        }

        public writeFontToSkinName($UIAtlas: UIAtlas, $iconName: string, $str: string, $color: string = ArtFont.ORANGE_TXT, $textAlign: string = TextAlign.LEFT, $txtInterval: number = 0): number {
            var rec: UIRectangle = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $txtnum: number
            if ($textAlign == TextAlign.LEFT) {
                $txtnum = this.writeFontToCtxLeft($UIAtlas.ctx, $str, $color, 0, 0, $txtInterval)
            }
            else if ($textAlign == TextAlign.RIGHT) {
                $txtnum = this.writeFontToCtxRight($UIAtlas.ctx, $str, $color, rec.pixelWitdh, 0, $txtInterval)
            }
            else if ($textAlign == TextAlign.CENTER) {
                $txtnum = this.writeFontToCtxCenten($UIAtlas.ctx, $str, $color, rec.pixelWitdh / 2, 0, $txtInterval)
            }


            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);

            return $txtnum;

        }

        public writeFontToSkinNameCenter($UIAtlas: UIAtlas, $iconName: string, $str: string, $color: string = ArtFont.ORANGE_TXT, $txtInterval: number = 0): void {
            var rec: UIRectangle = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);


            var $tx = rec.pixelWitdh / 2;
            var $ty = rec.pixelHeight / 2;

            var $textItem: Array<Rectangle> = this.fontData[$color]
            var totalW: number = 0;
            var $txtWidth: number = this.getAirFontWidth($UIAtlas.ctx, $str, $color, $txtInterval) / 2;
            var numId: number;
            for (var i: number = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect: Rectangle = this.getRect(numId, $color, $textItem);
                $UIAtlas.ctx.drawImage(UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx - $txtWidth, $ty - (txtNumRect.height / 2), txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }

            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);

        }
        //统计美术字文本的宽度
        public getAirFontWidth($ctx: CanvasRenderingContext2D, $str: string, $color: string = ArtFont.White, $txtInterval: number = 0): number {
            if ($str == undefined) {
                return 0;
            }
            var $textItem: Array<Rectangle> = this.fontData[$color]
            var totalW: number = 0;
            var numId: number;
            for (var i: number = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect: Rectangle = this.getRect(numId, $color, $textItem);
                if (!txtNumRect) {
                    //console.log("---$str---",$str);
                }
                totalW = totalW + (txtNumRect.width - $txtInterval)
            }
            return totalW;

        }

        private getRect(numId: number, $color: string, $textItem: Array<Rectangle>): Rectangle {
            var txtNumRect: Rectangle;
            if (numId > 15) {
                //亿万处理
                txtNumRect = this.fontData_Unit["B" + $color][numId - 16];
            } else {
                txtNumRect = $textItem[numId];
            }

            return txtNumRect;
        }


        public upArtFont($UIAtlas: UIAtlas, $iconName: string, $str: string, $size: number = 12, $color: string = ArtFont.White, $textAlign: string = TextAlign.LEFT): void {

            //var $str:string="5689556"
            var scale: number = $size / 12;
            var textItem: Array<Rectangle> = this.fontData[$color]

            var rec: UIRectangle = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

            //计算totalW
            var totalW: number = this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, false);
            //选择左中右排布
            var xpos: number = this.getXpos($textAlign, totalW, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight));
            //绘制
            this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, true, xpos);

            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);

        }
        public upArtBase($UIAtlas: UIAtlas, $iconName: string, $str: string, $color: string = ArtFont.White, $textAlign: string = TextAlign.LEFT): void {

            //var $str:string="5689556"
            var scale: number = 1;
            var textItem: Array<Rectangle> = this.fontData[$color]
            var rec: UIRectangle = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

            //计算totalW
            var totalW: number = this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, false);
            //选择左中右排布
            var xpos: number = this.getXpos($textAlign, totalW, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight));


            //绘制
            this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, true, xpos);

            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);

        }






        private getXpos($textAlign: string, $totalW: number, $rect: Rectangle): number {
            var xpos: number = 0;
            var ypos: number = 0;

            if ($textAlign == TextAlign.LEFT) {
                xpos = 0;
            } else if ($textAlign == TextAlign.RIGHT) {
                xpos = $totalW - $rect.width;
            } else if ($textAlign == TextAlign.CENTER) {
                xpos = ($rect.width - $totalW) / 2;
            }

            return xpos;
        }

        /**
         *计算总宽度和是否绘制
         */
        private getTotalWandDraw($rect: Rectangle, $str: string, $textItem: Array<Rectangle>, $scale: number, $ctx: CanvasRenderingContext2D, $isCtx: boolean, $xpos: number = 0, $txtInterval: number = 0): number {
            var totalW: number = 0;
            var numId: number;
            for (var i: number = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect: Rectangle = $textItem[numId];
                if (!txtNumRect) {
                    //console.log("没有这个字")
                }
                if ($isCtx) {
                    $ctx.drawImage(UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, $rect.x + totalW + $xpos, $rect.y, txtNumRect.width * $scale, txtNumRect.height * $scale);
                }
                totalW = totalW + (txtNumRect.width - $txtInterval) * $scale
            }
            return totalW;
        }

        public getCharId(str: string): number {
            if (str == "+" || str == "x" || str == "X") {
                return 10
            }

            if (str == "-") {
                return 11
            }
            if (str == "/") {
                return 12
            }
            if (str == ":") {
                return 13
            }
            if (str == ".") {
                return 14
            }
            if (str == "%") {
                return 15
            }
            if (str == "万") {
                return 16
            }
            if (str == "亿") {
                return 17
            }
            if (str == "[") {
                return 18
            }
            if (str == "]") {
                return 19
            }
            if ((Number(str) == NaN)) {
                alert("MeshVo,GetCharId error:" + str);
            }
            return Number(str)
        }



    }
}