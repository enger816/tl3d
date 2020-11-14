var Pan3d;
(function (Pan3d) {
    var ArtFont = /** @class */ (function () {
        function ArtFont() {
            this.fontData = new Pan3d.Dictionary([]);
            this.fontData_Unit = new Pan3d.Dictionary([]);
            this.makeFontRect();
        }
        ArtFont.getInstance = function () {
            if (!this._instance) {
                this._instance = new ArtFont();
            }
            return this._instance;
        };
        ArtFont.prototype.makeFontRect = function () {
            this.fontData["Red"] = this.makeBase12pxNum(new Pan3d.Vector2D(0, 0));
            this.fontData["Green"] = this.makeBase12pxNum(new Pan3d.Vector2D(0, 15));
            this.fontData["Blue"] = this.makeBase12pxNum(new Pan3d.Vector2D(0, 30));
            this.fontData["White"] = this.makeBase12pxNum(new Pan3d.Vector2D(0, 45));
            this.fontData["Yellow"] = this.makeBase12pxNum(new Pan3d.Vector2D(0, 75));
            this.getXmlData();
        };
        ArtFont.prototype.getXmlData = function () {
            // var obj: any = UIData.getUiByName(UIData.textlist, "A_txt1");
            var $uiList = Pan3d.UIData.getUiArrByKey(Pan3d.UIData.textlist);
            for (var i = 0; i < $uiList.length; i++) {
                var $skinName = String($uiList[i].name);
                if ($skinName.search("A_") != -1) {
                    var $id = Number($skinName.substring(5, $skinName.length));
                    var $uiRect = new Pan3d.UIRectangle();
                    $uiRect.pixelX = Number($uiList[i].ox);
                    $uiRect.pixelY = Number($uiList[i].oy);
                    $uiRect.pixelWitdh = Number($uiList[i].ow);
                    $uiRect.pixelHeight = Number($uiList[i].oh);
                    $uiRect.cellX = Number($uiList[i].cellX);
                    $uiRect.cellY = Number($uiList[i].cellY);
                    var $rectFont = new Pan3d.Rectangle(0, 0, $uiRect.pixelWitdh / $uiRect.cellX, $uiRect.pixelHeight);
                    var $arr = new Array;
                    for (var j = 0; j < $uiRect.cellX; j++) {
                        $arr.push(new Pan3d.Rectangle($uiRect.pixelX + j * $rectFont.width, $uiRect.pixelY, $rectFont.width, $rectFont.height));
                    }
                    this.fontData["NUM" + $id] = $arr;
                    //  //console.log("NUM" + $id, $arr)
                }
                //万、亿
                if ($skinName.search("B_") != -1) {
                    var $id = Number($skinName.substring(5, $skinName.length));
                    var $uiRect = new Pan3d.UIRectangle();
                    $uiRect.pixelX = Number($uiList[i].ox);
                    $uiRect.pixelY = Number($uiList[i].oy);
                    $uiRect.pixelWitdh = Number($uiList[i].ow);
                    $uiRect.pixelHeight = Number($uiList[i].oh);
                    $uiRect.cellX = Number($uiList[i].cellX);
                    $uiRect.cellY = Number($uiList[i].cellY);
                    var $rectFont = new Pan3d.Rectangle(0, 0, $uiRect.pixelWitdh / $uiRect.cellX, $uiRect.pixelHeight);
                    var $arr = new Array;
                    for (var j = 0; j < $uiRect.cellX; j++) {
                        $arr.push(new Pan3d.Rectangle($uiRect.pixelX + j * $rectFont.width, $uiRect.pixelY, $rectFont.width, $rectFont.height));
                    }
                    this.fontData_Unit["BNUM" + $id] = $arr;
                    //  //console.log("NUM" + $id, $arr)
                }
            }
        };
        ArtFont.prototype.makeBase12pxNum = function ($pos) {
            var $arr = new Array;
            $arr.push(new Pan3d.Rectangle(3, 0, 9, 14)); //0
            $arr.push(new Pan3d.Rectangle(14, 0, 9, 14)); //1
            $arr.push(new Pan3d.Rectangle(25, 0, 9, 14)); //2
            $arr.push(new Pan3d.Rectangle(36, 0, 9, 14)); //3
            $arr.push(new Pan3d.Rectangle(47, 0, 9, 14)); //4
            $arr.push(new Pan3d.Rectangle(59, 0, 9, 14)); //5
            $arr.push(new Pan3d.Rectangle(70, 0, 9, 14)); //6
            $arr.push(new Pan3d.Rectangle(81, 0, 9, 14)); //7
            $arr.push(new Pan3d.Rectangle(92.5, 0, 9, 14)); //8
            $arr.push(new Pan3d.Rectangle(104, 0, 9, 14)); //9
            $arr.push(new Pan3d.Rectangle(116, 0, 9, 14)); //<+>
            $arr.push(new Pan3d.Rectangle(126, 0, 9, 14)); //<->
            $arr.push(new Pan3d.Rectangle(136, 0, 9, 14)); //</>
            $arr.push(new Pan3d.Rectangle(144, 0, 9, 13)); //<:>
            $arr.push(new Pan3d.Rectangle(154, 0, 9, 13)); //<.>
            for (var i = 0; i < $arr.length; i++) {
                $arr[i].x = $arr[i].x + $pos.x;
                $arr[i].y = $arr[i].y + $pos.y;
            }
            return $arr;
        };
        // public txtInterval: number = 0;
        //将美术字写到ctx上 左对齐的
        ArtFont.prototype.writeFontToCtxLeft = function ($ctx, $str, $color, $tx, $ty, $txtInterval) {
            if ($color === void 0) { $color = ArtFont.num1; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            if ($txtInterval === void 0) { $txtInterval = 0; }
            var $textItem = this.fontData[$color];
            var totalW = 0;
            var numId;
            for (var i = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect = this.getRect(numId, $color, $textItem);
                if (!txtNumRect) {
                    //console.log("writeFontToCtxLeft有错")
                    return;
                }
                $ctx.drawImage(Pan3d.UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx, $ty, txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }
            return totalW;
        };
        /**
         * 将美术字写到ctx上 右对齐的
         * $tx:绘制的终点x
         * $ty:绘制的起点Y
         */
        ArtFont.prototype.writeFontToCtxRight = function ($ctx, $str, $color, $tx, $ty, $txtInterval) {
            if ($color === void 0) { $color = ArtFont.White; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            if ($txtInterval === void 0) { $txtInterval = 0; }
            var $textItem = this.fontData[$color];
            var totalW = 0;
            var $txtWidth = this.getAirFontWidth($ctx, $str, $color, $txtInterval);
            var numId;
            for (var i = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect = this.getRect(numId, $color, $textItem);
                $ctx.drawImage(Pan3d.UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx - $txtWidth, $ty, txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }
            return $txtWidth;
        };
        //将美术字写到ctx上 中对齐的center
        ArtFont.prototype.writeFontToCtxCenten = function ($ctx, $str, $color, $tx, $ty, $txtInterval) {
            if ($color === void 0) { $color = ArtFont.White; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            if ($txtInterval === void 0) { $txtInterval = 0; }
            var $textItem = this.fontData[$color];
            var totalW = 0;
            var $txtWidth = this.getAirFontWidth($ctx, $str, $color, $txtInterval) / 2;
            var numId;
            if ($str == undefined) {
                //console.log("有错的")
            }
            for (var i = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect = this.getRect(numId, $color, $textItem);
                $ctx.drawImage(Pan3d.UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx - $txtWidth, $ty, txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }
            return $txtWidth;
        };
        ArtFont.prototype.writeFontToSkinName = function ($UIAtlas, $iconName, $str, $color, $textAlign, $txtInterval) {
            if ($color === void 0) { $color = ArtFont.ORANGE_TXT; }
            if ($textAlign === void 0) { $textAlign = Pan3d.TextAlign.LEFT; }
            if ($txtInterval === void 0) { $txtInterval = 0; }
            var rec = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $txtnum;
            if ($textAlign == Pan3d.TextAlign.LEFT) {
                $txtnum = this.writeFontToCtxLeft($UIAtlas.ctx, $str, $color, 0, 0, $txtInterval);
            }
            else if ($textAlign == Pan3d.TextAlign.RIGHT) {
                $txtnum = this.writeFontToCtxRight($UIAtlas.ctx, $str, $color, rec.pixelWitdh, 0, $txtInterval);
            }
            else if ($textAlign == Pan3d.TextAlign.CENTER) {
                $txtnum = this.writeFontToCtxCenten($UIAtlas.ctx, $str, $color, rec.pixelWitdh / 2, 0, $txtInterval);
            }
            Pan3d.TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);
            return $txtnum;
        };
        ArtFont.prototype.writeFontToSkinNameCenter = function ($UIAtlas, $iconName, $str, $color, $txtInterval) {
            if ($color === void 0) { $color = ArtFont.ORANGE_TXT; }
            if ($txtInterval === void 0) { $txtInterval = 0; }
            var rec = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $tx = rec.pixelWitdh / 2;
            var $ty = rec.pixelHeight / 2;
            var $textItem = this.fontData[$color];
            var totalW = 0;
            var $txtWidth = this.getAirFontWidth($UIAtlas.ctx, $str, $color, $txtInterval) / 2;
            var numId;
            for (var i = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect = this.getRect(numId, $color, $textItem);
                $UIAtlas.ctx.drawImage(Pan3d.UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, totalW + $tx - $txtWidth, $ty - (txtNumRect.height / 2), txtNumRect.width, txtNumRect.height);
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }
            Pan3d.TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);
        };
        //统计美术字文本的宽度
        ArtFont.prototype.getAirFontWidth = function ($ctx, $str, $color, $txtInterval) {
            if ($color === void 0) { $color = ArtFont.White; }
            if ($txtInterval === void 0) { $txtInterval = 0; }
            if ($str == undefined) {
                return 0;
            }
            var $textItem = this.fontData[$color];
            var totalW = 0;
            var numId;
            for (var i = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect = this.getRect(numId, $color, $textItem);
                if (!txtNumRect) {
                    //console.log("---$str---",$str);
                }
                totalW = totalW + (txtNumRect.width - $txtInterval);
            }
            return totalW;
        };
        ArtFont.prototype.getRect = function (numId, $color, $textItem) {
            var txtNumRect;
            if (numId > 15) {
                //亿万处理
                txtNumRect = this.fontData_Unit["B" + $color][numId - 16];
            }
            else {
                txtNumRect = $textItem[numId];
            }
            return txtNumRect;
        };
        ArtFont.prototype.upArtFont = function ($UIAtlas, $iconName, $str, $size, $color, $textAlign) {
            if ($size === void 0) { $size = 12; }
            if ($color === void 0) { $color = ArtFont.White; }
            if ($textAlign === void 0) { $textAlign = Pan3d.TextAlign.LEFT; }
            //var $str:string="5689556"
            var scale = $size / 12;
            var textItem = this.fontData[$color];
            var rec = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //计算totalW
            var totalW = this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, false);
            //选择左中右排布
            var xpos = this.getXpos($textAlign, totalW, new Pan3d.Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight));
            //绘制
            this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, true, xpos);
            Pan3d.TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);
        };
        ArtFont.prototype.upArtBase = function ($UIAtlas, $iconName, $str, $color, $textAlign) {
            if ($color === void 0) { $color = ArtFont.White; }
            if ($textAlign === void 0) { $textAlign = Pan3d.TextAlign.LEFT; }
            //var $str:string="5689556"
            var scale = 1;
            var textItem = this.fontData[$color];
            var rec = $UIAtlas.getRec($iconName);
            $UIAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //计算totalW
            var totalW = this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, false);
            //选择左中右排布
            var xpos = this.getXpos($textAlign, totalW, new Pan3d.Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight));
            //绘制
            this.getTotalWandDraw(rec, $str, textItem, scale, $UIAtlas.ctx, true, xpos);
            Pan3d.TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);
        };
        ArtFont.prototype.getXpos = function ($textAlign, $totalW, $rect) {
            var xpos = 0;
            var ypos = 0;
            if ($textAlign == Pan3d.TextAlign.LEFT) {
                xpos = 0;
            }
            else if ($textAlign == Pan3d.TextAlign.RIGHT) {
                xpos = $totalW - $rect.width;
            }
            else if ($textAlign == Pan3d.TextAlign.CENTER) {
                xpos = ($rect.width - $totalW) / 2;
            }
            return xpos;
        };
        /**
         *计算总宽度和是否绘制
         */
        ArtFont.prototype.getTotalWandDraw = function ($rect, $str, $textItem, $scale, $ctx, $isCtx, $xpos, $txtInterval) {
            if ($xpos === void 0) { $xpos = 0; }
            if ($txtInterval === void 0) { $txtInterval = 0; }
            var totalW = 0;
            var numId;
            for (var i = 0; i < $str.length; i++) {
                numId = this.getCharId($str[i]);
                var txtNumRect = $textItem[numId];
                if (!txtNumRect) {
                    //console.log("没有这个字")
                }
                if ($isCtx) {
                    $ctx.drawImage(Pan3d.UIData.textImg, txtNumRect.x, txtNumRect.y, txtNumRect.width, txtNumRect.height, $rect.x + totalW + $xpos, $rect.y, txtNumRect.width * $scale, txtNumRect.height * $scale);
                }
                totalW = totalW + (txtNumRect.width - $txtInterval) * $scale;
            }
            return totalW;
        };
        ArtFont.prototype.getCharId = function (str) {
            if (str == "+" || str == "x" || str == "X") {
                return 10;
            }
            if (str == "-") {
                return 11;
            }
            if (str == "/") {
                return 12;
            }
            if (str == ":") {
                return 13;
            }
            if (str == ".") {
                return 14;
            }
            if (str == "%") {
                return 15;
            }
            if (str == "万") {
                return 16;
            }
            if (str == "亿") {
                return 17;
            }
            if (str == "[") {
                return 18;
            }
            if (str == "]") {
                return 19;
            }
            if ((Number(str) == NaN)) {
                alert("MeshVo,GetCharId error:" + str);
            }
            return Number(str);
        };
        ArtFont.Red = "Red";
        ArtFont.Green = "Green";
        ArtFont.Blue = "Blue";
        ArtFont.White = "White";
        ArtFont.Yellow = "Yellow";
        ArtFont.BOSSBIGTXT = "NUM99";
        ArtFont.CN1 = "NUM100";
        ArtFont.num101 = "NUM101";
        ArtFont.num102 = "NUM102";
        ArtFont.BigYellow = "NUM12";
        ArtFont.num99 = "NUM99";
        ArtFont.GARY_TXT = "NUM1"; //NUM1.PNG
        ArtFont.ORANGE_TXT = "NUM19"; //NUM2
        ArtFont.num1 = "NUM1"; //NUM1
        ArtFont.num2 = "NUM2"; //NUM2
        ArtFont.num3 = "NUM3"; //NUM3
        ArtFont.num4 = "NUM4"; //NUM4
        ArtFont.num5 = "NUM5"; //NUM5
        ArtFont.num6 = "NUM6"; //NUM6
        ArtFont.num7 = "NUM7"; //NUM7
        ArtFont.num10 = "NUM10"; //NUM10
        ArtFont.num8 = "NUM8"; //NUM8
        ArtFont.num9 = "NUM9"; //NUM9
        ArtFont.num11 = "NUM11"; //NUM11
        ArtFont.num12 = "NUM12"; //NUM
        ArtFont.num13 = "NUM13"; //NUM13
        ArtFont.num14 = "NUM14"; //NUM
        ArtFont.num15 = "NUM15"; //NUM
        ArtFont.num16 = "NUM16"; //NUM
        ArtFont.num17 = "NUM17"; //NUM
        ArtFont.num18 = "NUM18"; //NUM
        ArtFont.num19 = "NUM19"; //NUM
        ArtFont.num20 = "NUM20"; //NUM
        ArtFont.num21 = "NUM21"; //NUM
        ArtFont.num22 = "NUM22"; //NUM
        ArtFont.num23 = "NUM23"; //NUM
        ArtFont.num24 = "NUM24"; //NUM
        ArtFont.num25 = "NUM24"; //NUM
        ArtFont.num26 = "NUM26"; //NUM
        ArtFont.num27 = "NUM27"; //NUM
        ArtFont.num28 = "NUM28"; //NUM
        ArtFont.num30 = "NUM30"; //NUM
        ArtFont.num51 = "NUM51"; //NUM
        ArtFont.num52 = "NUM52"; //NUM
        ArtFont.num53 = "NUM53"; //NUM
        ArtFont.num54 = "NUM54"; //NUM
        ArtFont.num55 = "NUM55"; //NUM
        ArtFont.num56 = "NUM56"; //NUM
        ArtFont.num57 = "NUM57"; //NUM
        ArtFont.num58 = "NUM58"; //NUM
        ArtFont.num59 = "NUM59"; //NUM
        ArtFont.num60 = "NUM60"; //NUM
        ArtFont.num61 = "NUM61"; //NUM
        ArtFont.numVip = "NUM62"; //NUM
        ArtFont.num63 = "NUM63"; //NUM
        ArtFont.num64 = "NUM64"; //NUM
        ArtFont.num65 = "NUM65"; //NUM
        ArtFont.num66 = "NUM66"; //NUM
        return ArtFont;
    }());
    Pan3d.ArtFont = ArtFont;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ArtFont.js.map