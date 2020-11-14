module Pan3d {
    export class TextRegVo {
        public begin: number
        public end: number
        public color: string
    }
    export class TextRegExp {
        public static item: Array<TextRegVo>;
        public static defaultColor: string = "#000000"
        public constructor() {
        }
        public static pushStr($str: string): void {
            this.item = new Array();
            var patt1: RegExp = /\[\]|\[[A-Za-z0-9]{6}\]/g;
            var arr: RegExpExecArray;
            while ((arr = patt1.exec($str)) != null) {
                // //console.log(arr.index + "-" + patt1.lastIndex + ":" + arr);
                var $vo: TextRegVo = new TextRegVo;
                $vo.begin = arr.index
                $vo.end = patt1.lastIndex
                $vo.color = arr.toString();
                $vo.color = $vo.color.replace("[", "");
                $vo.color = $vo.color.replace("]", "");
                //    //console.log($baseColor)
                if ($vo.color.length < 5) {
                    $vo.color = TextRegExp.defaultColor;
                } else {
                    $vo.color = "#" + $vo.color;
                }
                this.item.push($vo)
            }
        }

        /**
         * 将字符串中所有颜色替换为#号 并返回新的字符串
         * @param  
         */
        public static pushStrCopy($str: string): string {
            this.item = new Array();
            var patt1: RegExp = /\[\]|\[[A-Za-z0-9]{6}\]/g;
            var arr: RegExpExecArray;
            var newstr: string = $str;
            while ((arr = patt1.exec($str)) != null) {
                // //console.log(arr.index + "-" + patt1.lastIndex + ":" + arr);
                var $vo: TextRegVo = new TextRegVo;
                $vo.begin = arr.index
                $vo.end = patt1.lastIndex
                $vo.color = arr.toString();
                newstr = newstr.replace($vo.color, "#");
                $vo.color = $vo.color.replace("[", "");
                $vo.color = $vo.color.replace("]", "");
                //    //console.log($baseColor)
                if ($vo.color.length < 5) {
                    $vo.color = TextRegExp.defaultColor;
                } else {
                    $str.replace("[" + $vo.color + "]", "#");
                    $vo.color = "#" + $vo.color;
                }
                this.item.push($vo)
            }
            return newstr;
        }

        public static isColor($index: number, $ctx: CanvasRenderingContext2D): boolean {
            for (var i: number = 0; i < this.item.length; i++) {
                if ($index >= this.item[i].begin && $index < this.item[i].end) {
                    if ($ctx) {
                        $ctx.fillStyle = this.item[i].color;
                    }
                    return true
                }
            }
            return false
        }
        public static getTextMetrics($ctx: CanvasRenderingContext2D, text: string): TextMetrics {
            if (!text) {
                text = ""
            }
            this.pushStr(text);
            var words = text;
            var line = "";
            var ty: number = 0
            for (var n = 0; n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                line += words[n];
            }
            var metrics: TextMetrics = $ctx.measureText(line);
            return metrics;
        }
        public static getTextOnlyTxt($ctx: CanvasRenderingContext2D, text: string): string {
            if (!text) {
                text = ""
            }
            this.pushStr(text);
            var words = text;
            var line = "";
            var ty: number = 0
            for (var n = 0; n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                line += words[n];
            }
            return line;
        }

        private static getNextWords($str: string, indx: number): number {
            var $iconId: number = -1
            if ($str[indx] == "/" && $str.length > (indx + 2)) {
                var tempA: string = $str[indx + 0] + $str[indx + 1] + $str[indx + 2]
                for (var i: number = 0; i < UIData.faceItem.length; i++) {
                    if (UIData.faceItem[i] == tempA) {
                        return i + 1
                    }
                }
            }
            return $iconId
        }

        /**
         * 逐字符写入文本。兼容表情。返回行数
         * @param  
         * @param text 
         * @param baseColor 
         * @param x 
         * @param y 
         * @param maxWidth 
         * @param lineHeight 
         * @param fontsize 
         * @param  
         * @param  
         * @param  
         */
        public static wrapText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x: number = 0, y: number = 0,
            maxWidth: number = 500, lineHeight: number = 10, fontsize: number = 12, $filterColor: string = "", $filterWidth: number = 4, $gapScale: number = 1.0): number {
            TextRegExp.defaultColor = baseColor;
            if (maxWidth > 300) {

            }
            maxWidth = maxWidth * 0.98; //特殊缩小


            if ($filterColor != "") {
                if ($filterColor.indexOf("[") != -1) {  //[00ff00]
                    $filterColor = "#" + $filterColor.substr(1, 6);
                }
                $ctx.strokeStyle = $filterColor;
                $ctx.lineWidth = $filterWidth;
            }

            this.pushStr(text);
            var words = text;
            var line = "";
            var ty: number = 0  //特殊加上偏移， 还待测试调整
            var $lineNum: number = 1 //行数
            for (var n = 0; words && n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                var metrics: TextMetrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId: number = this.getNextWords(words, n)
                if ($faceId == -1) {
                    //绘制文本
                    if (metrics.width > maxWidth || words[n] == "\n") {
                        //换行
                        ty += lineHeight;
                        line = "";
                        $lineNum++
                        if (words[n] != "\n") {
                            if ($filterColor != "") {
                                $ctx.strokeText(words[n], x, y + ty);
                            }
                            $ctx.fillText(words[n], x, y + ty);
                        }
                    } else {
                        //当前行
                        if ($filterColor != "") {
                            $ctx.strokeText(words[n], x + metrics.width * $gapScale, y + ty);
                        }
                        $ctx.fillText(words[n], x + metrics.width * $gapScale, y + ty);
                    }
                    if (words[n] != "\n") {
                        line += words[n];
                    }
                } else {
                    //绘制表情
                    var faceSize: number = fontsize * 1.4
                    var $rect: Rectangle = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - faceSize / 10, faceSize, faceSize);
                    if (metrics.width > maxWidth) {
                        ty += lineHeight;
                        line = "";
                        $lineNum++
                        $rect = new Rectangle(x + 0, y + ty - faceSize / 10, faceSize, faceSize);
                    }
                    this.drawFaceIcon($ctx, $rect, $faceId)
                    n = n + 2;
                    line += "脸1"
                }

            }
            return $lineNum
        }


        /**
         * 逐字符写入文本。兼容表情。返回行数 竖着写
         * @param  
         * @param text 
         * @param baseColor 
         * @param x 
         * @param y 
         * @param maxWidth 
         * @param lineHeight 
         * @param fontsize 
         * @param  
         * @param  
         * @param  
         */
        public static wrapTextVertical($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x: number = 0, y: number = 0,
            maxWidth: number = 500, lineWidth: number = 10, fontsize: number = 12, $filterColor: string = "", $filterWidth: number = 4, $gapScale: number = 1.0): number {
            TextRegExp.defaultColor = baseColor;

            if ($filterColor != "") {
                if ($filterColor.indexOf("[") != -1) {  //[00ff00]
                    $filterColor = "#" + $filterColor.substr(1, 6);
                }
                $ctx.strokeStyle = $filterColor;
                $ctx.lineWidth = $filterWidth;
            }

            this.pushStr(text);
            var words = text;
            var line = "";
            var tx: number = 2  //特殊加上偏移， 还待测试调整
            var $lineNum: number = 1 //行数
            var ty: number = 0;
            for (var n = 0; words && n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                // var metrics: TextMetrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId: number = this.getNextWords(words, n)
                if ($faceId == -1) {
                    //绘制文本
                    if (ty > maxWidth || words[n] == "\n") {
                        //换行
                        tx += lineWidth;
                        line = "";
                        ty = 0;
                        if (words[n] != "\n") {
                            if ($filterColor != "") {
                                $ctx.strokeText(words[n], x + tx, ty);
                            }
                            $ctx.fillText(words[n], x + tx, ty);
                        }
                        $lineNum++
                    } else {
                        //当前行
                        ty += fontsize + 5;
                        if ($filterColor != "") {
                            $ctx.strokeText(words[n], x + tx, ty);
                        }
                        $ctx.fillText(words[n], x + tx, ty);
                    }
                    line += words[n];
                    // } else {
                    //     //绘制表情
                    //     var faceSize: number = fontsize * 1.4
                    //     var $rect: Rectangle = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - faceSize / 10, faceSize, faceSize);
                    //     if (metrics.width > maxWidth) {
                    //         ty += lineHeight;
                    //         line = "";
                    //         $lineNum++
                    //         $rect = new Rectangle(x + 0, y + ty - faceSize / 10, faceSize, faceSize);
                    //     }
                    //     this.drawFaceIcon($ctx, $rect, $faceId)
                    //     n = n + 2;
                    //     line += "脸1"
                }

            }
            return $lineNum
        }

        /**
         * 按行写入字符。暂不兼容表情。返回数组行宽行高
         * @param  
         * @param text 
         * @param baseColor 
         * @param  
         * @param  
         * @param  
         * @param lineHeight 
         * @param fontsize 
         * @param  
         * @param  
         * @param  
         */
        public static drawText($ctx: CanvasRenderingContext2D, text: string, baseColor: string,
            $maxWidth: number = 500, lineHeight: number = 10, fontsize: number = 12): Array<number> {
            TextRegExp.defaultColor = baseColor;

            var newtext = this.pushStrCopy(text);

            var totalWidth: number = 0;
            var totalHeight: number = 0;
            var words = text;
            var line = "";
            var lastposx: number = 0;

            var textcellAry: Array<TextCell> = new Array;
            var art: Array<string> = newtext.split("#");
            for (var i = 0; i < art.length; i++) {
                var nstr: string = art[i];
                if (nstr != "") {
                    $ctx.fillStyle = i > 0 ? this.item[i - 1].color : baseColor;

                    for (var n = 0; n < nstr.length; n++) {
                        if (nstr[n] == "\n") {
                            var aaa = new TextCell(line, totalHeight, $ctx.measureText(line).width, $ctx.fillStyle, $maxWidth)
                            textcellAry.push(aaa);
                            lastposx = 0;
                            line = "";
                            totalHeight += lineHeight;
                        } else {
                            var testLine = line + nstr[n];
                            var metrics = $ctx.measureText(testLine);
                            var testWidth = metrics.width + lastposx;
                            totalWidth = Math.min($maxWidth, testWidth);
                            if (testWidth > $maxWidth) {
                                var aaa = new TextCell(line, totalHeight, $ctx.measureText(line).width, $ctx.fillStyle, $maxWidth)
                                textcellAry.push(aaa);
                                line = nstr[n] + "";
                                totalHeight += lineHeight;
                                lastposx = 0;
                            } else {
                                line = testLine;
                            }
                        }
                    }
                    var cwidth: number = $ctx.measureText(line).width;
                    lastposx += cwidth;
                    var aaa = new TextCell(line, totalHeight, $ctx.measureText(line).width, $ctx.fillStyle, $maxWidth)
                    textcellAry.push(aaa);
                    line = "";
                }
            }

            var lastposy = -10000;
            var start_point;
            for (var k = 0; k < textcellAry.length; k++) {
                if (lastposy != textcellAry[k].posy) {
                    lastposy = textcellAry[k].posy
                    start_point = this.getStartPoint(textcellAry[k], textcellAry);
                    start_point = Math.max(start_point, 0);
                }
                $ctx.fillStyle = textcellAry[k].color;
                $ctx.fillText(textcellAry[k].str, start_point, lastposy);
                start_point += textcellAry[k].width;
            }

            //计算高度
            totalHeight = totalHeight + lineHeight;

            return [totalWidth, totalHeight];

        }


        private static getStartPoint(vo: TextCell, $textcellary: Array<TextCell>): number {
            var ary: Array<TextCell> = new Array
            for (var k = 0; k < $textcellary.length; k++) {
                var element = $textcellary[k];
                if (vo.posy == element.posy) {
                    ary.push(element);
                }
            }

            var totalwidth: number = 0;
            for (var x = 0; x < ary.length; x++) {
                totalwidth += ary[x].width;
            }

            return (vo.maxwidth - totalwidth) / 2;
        }


        private static drawFaceIcon(ctx: CanvasRenderingContext2D, $rect: Rectangle, $faceId: number): void {
            UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
        }
    }

    export  class TextCell {
        public str: string;
        public posy: number;
        public width: number;
        public color: string;
        public maxwidth: number;

        constructor($str: string, $posy: number, $width: number, $color: string, $maxWidth: number) {
            this.str = $str;
            this.posy = $posy;
            this.width = $width;
            this.color = $color;
            this.maxwidth = $maxWidth;
        }
    }

    export  class LabelTextFont {

        /*
        *写入单行颜色字体，字号,对齐，基础颜色 并上传显卡
        */
        public static writeSingleLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number = 12, $align: string = TextAlign.CENTER,
            $baseColor: string = "#ffffff", $filterColor: string = "", $ty: number = 0, $filterWidth: number = 4, $bolder: boolean = true): number {

            if ($baseColor.indexOf("[") != -1) {  //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }

            var $uiRect: UIRectangle = $uiAtlas.getRec($key);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);

            $ctx.fillStyle = $baseColor
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str)
            var $tx: number = 0
            if ($align == TextAlign.CENTER) {
                $tx = ($uiRect.pixelWitdh - $textMetrics.width) / 2;
            } else if ($align == TextAlign.RIGHT) {
                $tx = ($uiRect.pixelWitdh - $textMetrics.width);
            }
            TextRegExp.wrapText($ctx, $str, $baseColor, $tx, $ty, $uiRect.pixelWitdh - (fontsize / 2), 20, fontsize, $filterColor, $filterWidth);

            $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);

            return $textMetrics.width;
        }

        /*
        *写入多行颜色字体，字号,对齐，基础颜色 并上传显卡
        */
        public static writeTextLabel($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number = 12, $align: string = TextAlign.CENTER, $maxWidth: number = 500,
            $baseColor: string = "#ffffff", $filterColor: string = "", $ty: number = 0, $filterWidth: number = 4, $bolder: boolean = true): Array<number> {

            if ($baseColor.indexOf("[") != -1) {  //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }

            var hight: number = fontsize + 4
            var $uiRect: UIRectangle = $uiAtlas.getRec($key);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);

            $ctx.fillStyle = $baseColor
            $ctx.textAlign = $align;
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str)
            // var $tx: number = 0
            // if ($align == TextAlign.CENTER) {
            //     $tx = ($uiRect.pixelWitdh - $textMetrics.width) / 2;
            // } else if ($align == TextAlign.RIGHT) {
            //     $tx = ($uiRect.pixelWitdh - $textMetrics.width);
            // }
            var linenum: number = TextRegExp.wrapText($ctx, $str, $baseColor, 0, $ty, $maxWidth, hight, fontsize, $filterColor, $filterWidth);

            $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);

            return [$textMetrics.width, linenum * hight];
        }

        /*
         *将单行颜色字写到CTX中
         * 
         */
        public static writeSingleLabelToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0,
            $align: string = TextAlign.CENTER, $baseColor: string = "#ffffff", $filterColor: string = "", $bolder: boolean = true): number {

            if ($baseColor.indexOf("[") != -1) {  //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }

            $ctx.fillStyle = $baseColor
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str)
            if ($align == TextAlign.CENTER) {
                // $tx -= $textMetrics.width / 2;
                $tx += ($ctx.canvas.width - $textMetrics.width) / 2;
            } else if ($align == TextAlign.RIGHT) {
                // $tx -= $textMetrics.width;
                $tx += ($ctx.canvas.width - $textMetrics.width);
            }


            TextRegExp.wrapText($ctx, $str, $baseColor, $tx, $ty, 9999, 20, fontsize, $filterColor);
            return $textMetrics.width;
        }

        /*
         *将单行颜色字写到CTX中
         * 
         */
        public static writeSingleLabelToCtxByVertical($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0,
            $baseColor: string = "#ffffff", $filterColor: string = "", $bolder: boolean = true) {

            if ($baseColor.indexOf("[") != -1) {  //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }

            $ctx.fillStyle = $baseColor
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + UIData.font;

            TextRegExp.wrapTextVertical($ctx, $str, $baseColor, $tx, $ty, 9999, 20, fontsize, $filterColor);
        }


        /*
         *将单行颜色字写到CTX中
         * $tx 为对齐点的坐标
         */
        public static writeSingleLabelToCtxSetAnchor($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0,
            $align: string = TextAlign.CENTER, $baseColor: string = "#ffffff", $filterColor: string = "", $bolder: boolean = true): number {

            if ($baseColor.indexOf("[") != -1) {  //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }

            $ctx.fillStyle = $baseColor
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str)
            if ($align == TextAlign.CENTER) {
                $tx -= $textMetrics.width / 2;
            } else if ($align == TextAlign.RIGHT) {
                $tx -= $textMetrics.width;
            }


            TextRegExp.wrapText($ctx, $str, $baseColor, $tx, $ty, 9999, 20, fontsize, $filterColor);
            return $textMetrics.width;
        }


        /**
         * 整行写入文本 不兼容处理颜色
         * @param $x 文本写入时光标所在x位置
         * @param $y 文本写入时光标所在y位置
         * @param fontsize 
         * @param fontColor 
         * @param bolder 
         * @param  $textAlign 对齐方式
         * @readme 如果需要居中对齐显示，则光标所在位置需要传入中心点坐标，对齐方式也需要传入center
         */
        public static writeText($uiAtlas: UIAtlas, $key: string,
            $x: number, $y: number,
            $str: string, fontsize: number, fontColor: string, $maxWidth: number = 0, bolder: boolean = false, $textAlign: string = TextAlign.LEFT): Array<number> {

            if (fontColor.indexOf("[") != -1) {  //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }

            var totalwidthAndheight: Array<number> = [10, 10]

            var uiRect: UIRectangle = $uiAtlas.getRec($key);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);

            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + UIData.font;
            ctx.textAlign = $textAlign;
            var $xpos: number = this.getTextxpos($textAlign, ctx);

            totalwidthAndheight = this.wrapText(ctx, $str, $x, $y, $maxWidth, fontsize + 5);

            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
            return totalwidthAndheight;
        }


        /**
         * 按行写入文本 带解析颜色。但只能居中对齐
         */
        public static writeTextAutoCenterByAnchor($uiAtlas: UIAtlas, $key: string,
            $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder: boolean = true, $filterColor: string = ""): Array<number> {

            if (fontColor.indexOf("[") != -1) {  //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var uiRect: UIRectangle = $uiAtlas.getRec($key);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);

            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + UIData.font;
            ctx.textAlign = TextAlign.LEFT;


            var totalwidthAndheight: Array<number> = TextRegExp.drawText(ctx, $str, fontColor, $maxWidth, fontsize + 5, fontsize);

            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
            return totalwidthAndheight;
        }

        /*
        *写入普通文字,字数不满足换行时，自动纵向居中。
        */
        public static writeTextAutoVerticalCenter($uiAtlas: UIAtlas, $key: string,
            $str: string, fontsize: number, fontColor: string, $maxWidth: number, $filterColor: string = "", bolder: boolean = false): void {

            if (fontColor.indexOf("[") != -1) {  //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var uiRect: UIRectangle = $uiAtlas.getRec($key);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);

            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + UIData.font;

            var $x = 0
            var $y = 0
            var $xpos: number = this.getTextxpos(TextAlign.LEFT, ctx);
            if ($maxWidth > 0) {
                if (!this.isNewline(ctx, $str, $maxWidth)) {
                    $y = (uiRect.pixelHeight / 2) - (fontsize / 2)
                }
                // this.wrapText(ctx, $str, $x, $y, $maxWidth, fontsize + 3);
                TextRegExp.wrapText(ctx, $str, fontColor, $x, $y, $maxWidth, fontsize + 3, fontsize, $filterColor);
            }

            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
        }

        /*
        *写入普通文字,字数不满足换行时，自动居中。
        */
        public static writeTextAutoCenter($uiAtlas: UIAtlas, $key: string,
            $str: string, fontsize: number, fontColor: string, $maxWidth: number, bolder: boolean = false): void {

            if (fontColor.indexOf("[") != -1) {  //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var uiRect: UIRectangle = $uiAtlas.getRec($key);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);

            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + UIData.font;

            var $x = 0
            var $y = 0
            var $xpos: number = this.getTextxpos(TextAlign.LEFT, ctx);
            if ($maxWidth > 0) {
                if (!this.isNewline(ctx, $str, $maxWidth)) {
                    var metrics = ctx.measureText($str);
                    $y = (uiRect.pixelHeight / 2) - (fontsize / 2)
                    $x = (uiRect.pixelWitdh / 2) - (metrics.width / 2)
                }
                // this.wrapText(ctx, $str, $x, $y, $maxWidth, fontsize + 3);
                TextRegExp.wrapText(ctx, $str, fontColor, $x, $y, $maxWidth, fontsize + 3);
            }

            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);

        }

        private static isNewline(ctx: CanvasRenderingContext2D, $text: string, $maxWidth: number): boolean {
            var words = $text;
            var metrics = ctx.measureText(words);
            var testWidth = metrics.width;
            if (testWidth > $maxWidth) {
                return true;
            }
            return false;
        }

        // public static writeTextToCtx(ctx: CanvasRenderingContext2D,
        //     $x: number, $y: number,
        //     $str: string, fontsize: number, fontColor: string, bolder: boolean = false, $maxWidth: number = 0): void {

        //     ctx.textBaseline = TextAlign.MIDDLE;
        //     ctx.textAlign = TextAlign.CENTER;
        //     ctx.fillStyle = fontColor;
        //     ctx.font = "bolder " + fontsize + "px " + UIData.font;

        //     var $xpos: number = this.getTextxpos(TextAlign.CENTER, ctx);
        //     if ($maxWidth > 0) {
        //         this.wrapText(ctx, $str, $x, $y, $maxWidth, fontsize + 3);
        //     } else {
        //         ctx.fillText($str, $x + $xpos, $y);
        //     }
        // }

        private static getTextxpos($textAlign: string, $ctx: CanvasRenderingContext2D): number {

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

        private static wrapText($ctx: CanvasRenderingContext2D, text: string, $tx: number, $ty: number, maxWidth: number, $th: number): Array<number> {

            var totalWidth: number = 0;
            var totalHeight: number = $ty;
            var words = text;
            var line = "";
            for (var n = 0; n < words.length; n++) {
                if (words[n] == "\n") {
                    $ctx.fillText(line, $tx, totalHeight);
                    line = "";
                    totalHeight += $th;
                } else {
                    var testLine = line + words[n];
                    var metrics = $ctx.measureText(testLine);
                    var testWidth = metrics.width;
                    totalWidth = Math.max(totalWidth, testWidth);
                    if (testWidth > maxWidth) {
                        $ctx.fillText(line, $tx, totalHeight);
                        line = words[n] + "";
                        totalHeight += $th;
                    } else {
                        line = testLine;
                    }
                }
            }
            $ctx.fillText(line, $tx, totalHeight);

            //计算高度
            totalHeight = totalHeight - $ty + $th;

            return [totalWidth, totalHeight];
        }
        /**已弃用 请使用clearUI */
        public static clearLabel($uiAtlas: UIAtlas, $key: string): void {
            var $uiRect: UIRectangle = $uiAtlas.getRec($key);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        }




    }
}