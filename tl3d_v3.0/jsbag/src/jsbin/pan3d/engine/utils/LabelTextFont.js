var Pan3d;
(function (Pan3d) {
    var TextRegVo = /** @class */ (function () {
        function TextRegVo() {
        }
        return TextRegVo;
    }());
    Pan3d.TextRegVo = TextRegVo;
    var TextRegExp = /** @class */ (function () {
        function TextRegExp() {
        }
        TextRegExp.pushStr = function ($str) {
            this.item = new Array();
            var patt1 = /\[\]|\[[A-Za-z0-9]{6}\]/g;
            var arr;
            while ((arr = patt1.exec($str)) != null) {
                // //console.log(arr.index + "-" + patt1.lastIndex + ":" + arr);
                var $vo = new TextRegVo;
                $vo.begin = arr.index;
                $vo.end = patt1.lastIndex;
                $vo.color = arr.toString();
                $vo.color = $vo.color.replace("[", "");
                $vo.color = $vo.color.replace("]", "");
                //    //console.log($baseColor)
                if ($vo.color.length < 5) {
                    $vo.color = TextRegExp.defaultColor;
                }
                else {
                    $vo.color = "#" + $vo.color;
                }
                this.item.push($vo);
            }
        };
        /**
         * 将字符串中所有颜色替换为#号 并返回新的字符串
         * @param
         */
        TextRegExp.pushStrCopy = function ($str) {
            this.item = new Array();
            var patt1 = /\[\]|\[[A-Za-z0-9]{6}\]/g;
            var arr;
            var newstr = $str;
            while ((arr = patt1.exec($str)) != null) {
                // //console.log(arr.index + "-" + patt1.lastIndex + ":" + arr);
                var $vo = new TextRegVo;
                $vo.begin = arr.index;
                $vo.end = patt1.lastIndex;
                $vo.color = arr.toString();
                newstr = newstr.replace($vo.color, "#");
                $vo.color = $vo.color.replace("[", "");
                $vo.color = $vo.color.replace("]", "");
                //    //console.log($baseColor)
                if ($vo.color.length < 5) {
                    $vo.color = TextRegExp.defaultColor;
                }
                else {
                    $str.replace("[" + $vo.color + "]", "#");
                    $vo.color = "#" + $vo.color;
                }
                this.item.push($vo);
            }
            return newstr;
        };
        TextRegExp.isColor = function ($index, $ctx) {
            for (var i = 0; i < this.item.length; i++) {
                if ($index >= this.item[i].begin && $index < this.item[i].end) {
                    if ($ctx) {
                        $ctx.fillStyle = this.item[i].color;
                    }
                    return true;
                }
            }
            return false;
        };
        TextRegExp.getTextMetrics = function ($ctx, text) {
            if (!text) {
                text = "";
            }
            this.pushStr(text);
            var words = text;
            var line = "";
            var ty = 0;
            for (var n = 0; n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                line += words[n];
            }
            var metrics = $ctx.measureText(line);
            return metrics;
        };
        TextRegExp.getTextOnlyTxt = function ($ctx, text) {
            if (!text) {
                text = "";
            }
            this.pushStr(text);
            var words = text;
            var line = "";
            var ty = 0;
            for (var n = 0; n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                line += words[n];
            }
            return line;
        };
        TextRegExp.getNextWords = function ($str, indx) {
            var $iconId = -1;
            if ($str[indx] == "/" && $str.length > (indx + 2)) {
                var tempA = $str[indx + 0] + $str[indx + 1] + $str[indx + 2];
                for (var i = 0; i < Pan3d.UIData.faceItem.length; i++) {
                    if (Pan3d.UIData.faceItem[i] == tempA) {
                        return i + 1;
                    }
                }
            }
            return $iconId;
        };
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
        TextRegExp.wrapText = function ($ctx, text, baseColor, x, y, maxWidth, lineHeight, fontsize, $filterColor, $filterWidth, $gapScale) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (maxWidth === void 0) { maxWidth = 500; }
            if (lineHeight === void 0) { lineHeight = 10; }
            if (fontsize === void 0) { fontsize = 12; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($filterWidth === void 0) { $filterWidth = 4; }
            if ($gapScale === void 0) { $gapScale = 1.0; }
            TextRegExp.defaultColor = baseColor;
            if (maxWidth > 300) {
            }
            maxWidth = maxWidth * 0.98; //特殊缩小
            if ($filterColor != "") {
                if ($filterColor.indexOf("[") != -1) { //[00ff00]
                    $filterColor = "#" + $filterColor.substr(1, 6);
                }
                $ctx.strokeStyle = $filterColor;
                $ctx.lineWidth = $filterWidth;
            }
            this.pushStr(text);
            var words = text;
            var line = "";
            var ty = 0; //特殊加上偏移， 还待测试调整
            var $lineNum = 1; //行数
            for (var n = 0; words && n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                var metrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId = this.getNextWords(words, n);
                if ($faceId == -1) {
                    //绘制文本
                    if (metrics.width > maxWidth || words[n] == "\n") {
                        //换行
                        ty += lineHeight;
                        line = "";
                        $lineNum++;
                        if (words[n] != "\n") {
                            if ($filterColor != "") {
                                $ctx.strokeText(words[n], x, y + ty);
                            }
                            $ctx.fillText(words[n], x, y + ty);
                        }
                    }
                    else {
                        //当前行
                        if ($filterColor != "") {
                            $ctx.strokeText(words[n], x + metrics.width * $gapScale, y + ty);
                        }
                        $ctx.fillText(words[n], x + metrics.width * $gapScale, y + ty);
                    }
                    if (words[n] != "\n") {
                        line += words[n];
                    }
                }
                else {
                    //绘制表情
                    var faceSize = fontsize * 1.4;
                    var $rect = new Pan3d.Rectangle(x + metrics.width * 1.0 + 0, y + ty - faceSize / 10, faceSize, faceSize);
                    if (metrics.width > maxWidth) {
                        ty += lineHeight;
                        line = "";
                        $lineNum++;
                        $rect = new Pan3d.Rectangle(x + 0, y + ty - faceSize / 10, faceSize, faceSize);
                    }
                    this.drawFaceIcon($ctx, $rect, $faceId);
                    n = n + 2;
                    line += "脸1";
                }
            }
            return $lineNum;
        };
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
        TextRegExp.wrapTextVertical = function ($ctx, text, baseColor, x, y, maxWidth, lineWidth, fontsize, $filterColor, $filterWidth, $gapScale) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (maxWidth === void 0) { maxWidth = 500; }
            if (lineWidth === void 0) { lineWidth = 10; }
            if (fontsize === void 0) { fontsize = 12; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($filterWidth === void 0) { $filterWidth = 4; }
            if ($gapScale === void 0) { $gapScale = 1.0; }
            TextRegExp.defaultColor = baseColor;
            if ($filterColor != "") {
                if ($filterColor.indexOf("[") != -1) { //[00ff00]
                    $filterColor = "#" + $filterColor.substr(1, 6);
                }
                $ctx.strokeStyle = $filterColor;
                $ctx.lineWidth = $filterWidth;
            }
            this.pushStr(text);
            var words = text;
            var line = "";
            var tx = 2; //特殊加上偏移， 还待测试调整
            var $lineNum = 1; //行数
            var ty = 0;
            for (var n = 0; words && n < words.length; n++) {
                if (this.isColor(n, $ctx)) {
                    continue;
                }
                // var metrics: TextMetrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId = this.getNextWords(words, n);
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
                        $lineNum++;
                    }
                    else {
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
            return $lineNum;
        };
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
        TextRegExp.drawText = function ($ctx, text, baseColor, $maxWidth, lineHeight, fontsize) {
            if ($maxWidth === void 0) { $maxWidth = 500; }
            if (lineHeight === void 0) { lineHeight = 10; }
            if (fontsize === void 0) { fontsize = 12; }
            TextRegExp.defaultColor = baseColor;
            var newtext = this.pushStrCopy(text);
            var totalWidth = 0;
            var totalHeight = 0;
            var words = text;
            var line = "";
            var lastposx = 0;
            var textcellAry = new Array;
            var art = newtext.split("#");
            for (var i = 0; i < art.length; i++) {
                var nstr = art[i];
                if (nstr != "") {
                    $ctx.fillStyle = i > 0 ? this.item[i - 1].color : baseColor;
                    for (var n = 0; n < nstr.length; n++) {
                        if (nstr[n] == "\n") {
                            var aaa = new TextCell(line, totalHeight, $ctx.measureText(line).width, $ctx.fillStyle, $maxWidth);
                            textcellAry.push(aaa);
                            lastposx = 0;
                            line = "";
                            totalHeight += lineHeight;
                        }
                        else {
                            var testLine = line + nstr[n];
                            var metrics = $ctx.measureText(testLine);
                            var testWidth = metrics.width + lastposx;
                            totalWidth = Math.min($maxWidth, testWidth);
                            if (testWidth > $maxWidth) {
                                var aaa = new TextCell(line, totalHeight, $ctx.measureText(line).width, $ctx.fillStyle, $maxWidth);
                                textcellAry.push(aaa);
                                line = nstr[n] + "";
                                totalHeight += lineHeight;
                                lastposx = 0;
                            }
                            else {
                                line = testLine;
                            }
                        }
                    }
                    var cwidth = $ctx.measureText(line).width;
                    lastposx += cwidth;
                    var aaa = new TextCell(line, totalHeight, $ctx.measureText(line).width, $ctx.fillStyle, $maxWidth);
                    textcellAry.push(aaa);
                    line = "";
                }
            }
            var lastposy = -10000;
            var start_point;
            for (var k = 0; k < textcellAry.length; k++) {
                if (lastposy != textcellAry[k].posy) {
                    lastposy = textcellAry[k].posy;
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
        };
        TextRegExp.getStartPoint = function (vo, $textcellary) {
            var ary = new Array;
            for (var k = 0; k < $textcellary.length; k++) {
                var element = $textcellary[k];
                if (vo.posy == element.posy) {
                    ary.push(element);
                }
            }
            var totalwidth = 0;
            for (var x = 0; x < ary.length; x++) {
                totalwidth += ary[x].width;
            }
            return (vo.maxwidth - totalwidth) / 2;
        };
        TextRegExp.drawFaceIcon = function (ctx, $rect, $faceId) {
            Pan3d.UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, Pan3d.UIData.publicUi);
        };
        TextRegExp.defaultColor = "#000000";
        return TextRegExp;
    }());
    Pan3d.TextRegExp = TextRegExp;
    var TextCell = /** @class */ (function () {
        function TextCell($str, $posy, $width, $color, $maxWidth) {
            this.str = $str;
            this.posy = $posy;
            this.width = $width;
            this.color = $color;
            this.maxwidth = $maxWidth;
        }
        return TextCell;
    }());
    Pan3d.TextCell = TextCell;
    var LabelTextFont = /** @class */ (function () {
        function LabelTextFont() {
        }
        /*
        *写入单行颜色字体，字号,对齐，基础颜色 并上传显卡
        */
        LabelTextFont.writeSingleLabelCopy = function ($uiAtlas, $key, $str, fontsize, $align, $baseColor, $filterColor, $ty, $filterWidth, $bolder) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($align === void 0) { $align = Pan3d.TextAlign.CENTER; }
            if ($baseColor === void 0) { $baseColor = "#ffffff"; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($ty === void 0) { $ty = 0; }
            if ($filterWidth === void 0) { $filterWidth = 4; }
            if ($bolder === void 0) { $bolder = true; }
            if ($baseColor.indexOf("[") != -1) { //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }
            var $uiRect = $uiAtlas.getRec($key);
            var ctx = Pan3d.UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            ctx.font = fontsize + "px Georgia";
            ctx.fillStyle = $baseColor;
            ctx.lineWidth = 0;
            ctx.fillText($str, 0, 2);
            $uiAtlas.updateCtx(ctx, $uiRect.pixelX, $uiRect.pixelY);
            return 0;
        };
        LabelTextFont.writeSingleLabel = function ($uiAtlas, $key, $str, fontsize, $align, $baseColor, $filterColor, $ty, $filterWidth, $bolder) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($align === void 0) { $align = Pan3d.TextAlign.CENTER; }
            if ($baseColor === void 0) { $baseColor = "#ffffff"; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($ty === void 0) { $ty = 0; }
            if ($filterWidth === void 0) { $filterWidth = 4; }
            if ($bolder === void 0) { $bolder = true; }
            if ($baseColor.indexOf("[") != -1) { //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }
            var $uiRect = $uiAtlas.getRec($key);
            var $ctx = Pan3d.UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $ctx.fillStyle = $baseColor;
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + Pan3d.UIData.font;
            var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
            var $tx = 0;
            if ($align == Pan3d.TextAlign.CENTER) {
                $tx = ($uiRect.pixelWitdh - $textMetrics.width) / 2;
            }
            else if ($align == Pan3d.TextAlign.RIGHT) {
                $tx = ($uiRect.pixelWitdh - $textMetrics.width);
            }
            TextRegExp.wrapText($ctx, $str, $baseColor, $tx, $ty, $uiRect.pixelWitdh - (fontsize / 2), 20, fontsize, $filterColor, $filterWidth);
            $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
            return $textMetrics.width;
        };
        /*
        *写入多行颜色字体，字号,对齐，基础颜色 并上传显卡
        */
        LabelTextFont.writeTextLabel = function ($uiAtlas, $key, $str, fontsize, $align, $maxWidth, $baseColor, $filterColor, $ty, $filterWidth, $bolder) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($align === void 0) { $align = Pan3d.TextAlign.CENTER; }
            if ($maxWidth === void 0) { $maxWidth = 500; }
            if ($baseColor === void 0) { $baseColor = "#ffffff"; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($ty === void 0) { $ty = 0; }
            if ($filterWidth === void 0) { $filterWidth = 4; }
            if ($bolder === void 0) { $bolder = true; }
            if ($baseColor.indexOf("[") != -1) { //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }
            var hight = fontsize + 4;
            var $uiRect = $uiAtlas.getRec($key);
            var $ctx = Pan3d.UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $ctx.fillStyle = $baseColor;
            $ctx.textAlign = $align;
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + Pan3d.UIData.font;
            var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
            // var $tx: number = 0
            // if ($align == TextAlign.CENTER) {
            //     $tx = ($uiRect.pixelWitdh - $textMetrics.width) / 2;
            // } else if ($align == TextAlign.RIGHT) {
            //     $tx = ($uiRect.pixelWitdh - $textMetrics.width);
            // }
            var linenum = TextRegExp.wrapText($ctx, $str, $baseColor, 0, $ty, $maxWidth, hight, fontsize, $filterColor, $filterWidth);
            $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
            return [$textMetrics.width, linenum * hight];
        };
        /*
         *将单行颜色字写到CTX中
         *
         */
        LabelTextFont.writeSingleLabelToCtx = function ($ctx, $str, fontsize, $tx, $ty, $align, $baseColor, $filterColor, $bolder) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            if ($align === void 0) { $align = Pan3d.TextAlign.CENTER; }
            if ($baseColor === void 0) { $baseColor = "#ffffff"; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($bolder === void 0) { $bolder = true; }
            if ($baseColor.indexOf("[") != -1) { //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }
            $ctx.fillStyle = $baseColor;
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + Pan3d.UIData.font;
            var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
            if ($align == Pan3d.TextAlign.CENTER) {
                // $tx -= $textMetrics.width / 2;
                $tx += ($ctx.canvas.width - $textMetrics.width) / 2;
            }
            else if ($align == Pan3d.TextAlign.RIGHT) {
                // $tx -= $textMetrics.width;
                $tx += ($ctx.canvas.width - $textMetrics.width);
            }
            TextRegExp.wrapText($ctx, $str, $baseColor, $tx, $ty, 9999, 20, fontsize, $filterColor);
            return $textMetrics.width;
        };
        /*
         *将单行颜色字写到CTX中
         *
         */
        LabelTextFont.writeSingleLabelToCtxByVertical = function ($ctx, $str, fontsize, $tx, $ty, $baseColor, $filterColor, $bolder) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            if ($baseColor === void 0) { $baseColor = "#ffffff"; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($bolder === void 0) { $bolder = true; }
            if ($baseColor.indexOf("[") != -1) { //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }
            $ctx.fillStyle = $baseColor;
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + Pan3d.UIData.font;
            TextRegExp.wrapTextVertical($ctx, $str, $baseColor, $tx, $ty, 9999, 20, fontsize, $filterColor);
        };
        /*
         *将单行颜色字写到CTX中
         * $tx 为对齐点的坐标
         */
        LabelTextFont.writeSingleLabelToCtxSetAnchor = function ($ctx, $str, fontsize, $tx, $ty, $align, $baseColor, $filterColor, $bolder) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            if ($align === void 0) { $align = Pan3d.TextAlign.CENTER; }
            if ($baseColor === void 0) { $baseColor = "#ffffff"; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if ($bolder === void 0) { $bolder = true; }
            if ($baseColor.indexOf("[") != -1) { //[00ff00]
                $baseColor = "#" + $baseColor.substr(1, 6);
            }
            $ctx.fillStyle = $baseColor;
            $ctx.font = ($bolder ? "bolder " : "") + " " + fontsize + "px " + Pan3d.UIData.font;
            var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
            if ($align == Pan3d.TextAlign.CENTER) {
                $tx -= $textMetrics.width / 2;
            }
            else if ($align == Pan3d.TextAlign.RIGHT) {
                $tx -= $textMetrics.width;
            }
            TextRegExp.wrapText($ctx, $str, $baseColor, $tx, $ty, 9999, 20, fontsize, $filterColor);
            return $textMetrics.width;
        };
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
        LabelTextFont.writeText = function ($uiAtlas, $key, $x, $y, $str, fontsize, fontColor, $maxWidth, bolder, $textAlign) {
            if ($maxWidth === void 0) { $maxWidth = 0; }
            if (bolder === void 0) { bolder = false; }
            if ($textAlign === void 0) { $textAlign = Pan3d.TextAlign.LEFT; }
            if (fontColor.indexOf("[") != -1) { //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var totalwidthAndheight = [10, 10];
            var uiRect = $uiAtlas.getRec($key);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + Pan3d.UIData.font;
            ctx.textAlign = $textAlign;
            var $xpos = this.getTextxpos($textAlign, ctx);
            totalwidthAndheight = this.wrapText(ctx, $str, $x, $y, $maxWidth, fontsize + 5);
            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
            return totalwidthAndheight;
        };
        /**
         * 按行写入文本 带解析颜色。但只能居中对齐
         */
        LabelTextFont.writeTextAutoCenterByAnchor = function ($uiAtlas, $key, $str, fontsize, fontColor, $maxWidth, bolder, $filterColor) {
            if (bolder === void 0) { bolder = true; }
            if ($filterColor === void 0) { $filterColor = ""; }
            if (fontColor.indexOf("[") != -1) { //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var uiRect = $uiAtlas.getRec($key);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + Pan3d.UIData.font;
            ctx.textAlign = Pan3d.TextAlign.LEFT;
            var totalwidthAndheight = TextRegExp.drawText(ctx, $str, fontColor, $maxWidth, fontsize + 5, fontsize);
            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
            return totalwidthAndheight;
        };
        /*
        *写入普通文字,字数不满足换行时，自动纵向居中。
        */
        LabelTextFont.writeTextAutoVerticalCenter = function ($uiAtlas, $key, $str, fontsize, fontColor, $maxWidth, $filterColor, bolder) {
            if ($filterColor === void 0) { $filterColor = ""; }
            if (bolder === void 0) { bolder = false; }
            if (fontColor.indexOf("[") != -1) { //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var uiRect = $uiAtlas.getRec($key);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + Pan3d.UIData.font;
            var $x = 0;
            var $y = 0;
            var $xpos = this.getTextxpos(Pan3d.TextAlign.LEFT, ctx);
            if ($maxWidth > 0) {
                if (!this.isNewline(ctx, $str, $maxWidth)) {
                    $y = (uiRect.pixelHeight / 2) - (fontsize / 2);
                }
                // this.wrapText(ctx, $str, $x, $y, $maxWidth, fontsize + 3);
                TextRegExp.wrapText(ctx, $str, fontColor, $x, $y, $maxWidth, fontsize + 3, fontsize, $filterColor);
            }
            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
        };
        /*
        *写入普通文字,字数不满足换行时，自动居中。
        */
        LabelTextFont.writeTextAutoCenter = function ($uiAtlas, $key, $str, fontsize, fontColor, $maxWidth, bolder) {
            if (bolder === void 0) { bolder = false; }
            if (fontColor.indexOf("[") != -1) { //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var uiRect = $uiAtlas.getRec($key);
            var ctx = Pan3d.UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px " + Pan3d.UIData.font;
            var $x = 0;
            var $y = 0;
            var $xpos = this.getTextxpos(Pan3d.TextAlign.LEFT, ctx);
            if ($maxWidth > 0) {
                if (!this.isNewline(ctx, $str, $maxWidth)) {
                    var metrics = ctx.measureText($str);
                    $y = (uiRect.pixelHeight / 2) - (fontsize / 2);
                    $x = (uiRect.pixelWitdh / 2) - (metrics.width / 2);
                }
                // this.wrapText(ctx, $str, $x, $y, $maxWidth, fontsize + 3);
                TextRegExp.wrapText(ctx, $str, fontColor, $x, $y, $maxWidth, fontsize + 3);
            }
            $uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);
        };
        LabelTextFont.isNewline = function (ctx, $text, $maxWidth) {
            var words = $text;
            var metrics = ctx.measureText(words);
            var testWidth = metrics.width;
            if (testWidth > $maxWidth) {
                return true;
            }
            return false;
        };
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
        LabelTextFont.getTextxpos = function ($textAlign, $ctx) {
            var $xpos = 0;
            if ($textAlign == Pan3d.TextAlign.LEFT) {
                $xpos = 0;
            }
            else if ($textAlign == Pan3d.TextAlign.RIGHT) {
                $xpos = $ctx.canvas.width;
            }
            else if ($textAlign == Pan3d.TextAlign.CENTER) {
                $xpos = $ctx.canvas.width / 2;
            }
            return $xpos;
        };
        LabelTextFont.wrapText = function ($ctx, text, $tx, $ty, maxWidth, $th) {
            var totalWidth = 0;
            var totalHeight = $ty;
            var words = text;
            var line = "";
            for (var n = 0; n < words.length; n++) {
                if (words[n] == "\n") {
                    $ctx.fillText(line, $tx, totalHeight);
                    line = "";
                    totalHeight += $th;
                }
                else {
                    var testLine = line + words[n];
                    var metrics = $ctx.measureText(testLine);
                    var testWidth = metrics.width;
                    totalWidth = Math.max(totalWidth, testWidth);
                    if (testWidth > maxWidth) {
                        $ctx.fillText(line, $tx, totalHeight);
                        line = words[n] + "";
                        totalHeight += $th;
                    }
                    else {
                        line = testLine;
                    }
                }
            }
            $ctx.fillText(line, $tx, totalHeight);
            //计算高度
            totalHeight = totalHeight - $ty + $th;
            return [totalWidth, totalHeight];
        };
        /**已弃用 请使用clearUI */
        LabelTextFont.clearLabel = function ($uiAtlas, $key) {
            var $uiRect = $uiAtlas.getRec($key);
            var $ctx = Pan3d.UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        };
        return LabelTextFont;
    }());
    Pan3d.LabelTextFont = LabelTextFont;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=LabelTextFont.js.map