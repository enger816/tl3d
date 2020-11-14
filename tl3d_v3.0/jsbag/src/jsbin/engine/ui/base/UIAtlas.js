var UIAtlas = /** @class */ (function () {
    //public texture: WebGLTexture;
    function UIAtlas() {
        this._hasDispose = false;
    }
    Object.defineProperty(UIAtlas.prototype, "texture", {
        get: function () {
            if (this.textureRes) {
                return this.textureRes.texture;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    UIAtlas.prototype.setInfo = function (configUrl, imgUrl, $fun, useImgUrl) {
        var _this = this;
        if (useImgUrl === void 0) { useImgUrl = null; }
        this._useImgUrl = useImgUrl;
        LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, function ($str) {
            var obj = JSON.parse($str);
            _this.configData = obj.uiArr;
            _this.layoutData = obj.panelArr;
            _this.loadImgUrl(imgUrl, $fun);
        });
    };
    UIAtlas.prototype.loadConfig = function (configUrl, $fun) {
        var _this = this;
        LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, function ($str) {
            var obj = JSON.parse($str);
            _this.configData = obj.uiArr;
            $fun();
        });
    };
    UIAtlas.prototype.loadImgUrl = function (imgUrl, $fun) {
        var _this = this;
        TextureManager.getInstance().getTexture(Scene_data.fileRoot + imgUrl, function ($texture) {
            //this.texture = $texture.texture;
            _this.textureRes = $texture;
            ////console.log(imgUrl);
            if (_this._useImgUrl) {
                _this.loadUseImg($fun);
            }
            else {
                $fun();
            }
        }, 1, null, 0);
    };
    UIAtlas.prototype.loadUseImg = function ($fun) {
        this.useImg = new Image();
        this.useImg.onload = function () {
            $fun();
        };
        this.useImg.src = Scene_data.fileRoot + this._useImgUrl;
    };
    UIAtlas.prototype.getRec = function ($name) {
        var rec = new UIRectangle;
        for (var j = 0; j < this.configData.length; j++) {
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
    };
    UIAtlas.prototype.getLayoutData = function ($name) {
        if (!this.layoutData) {
            return null;
        }
        for (var key in this.layoutData) {
            var ary = this.layoutData[key].item;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].name == $name) {
                    return ary[i];
                }
            }
        }
    };
    UIAtlas.prototype.getGridRec = function ($name) {
        var rec = new UIGridRentangle;
        for (var j = 0; j < this.configData.length; j++) {
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
    };
    Object.defineProperty(UIAtlas.prototype, "hasData", {
        get: function () {
            return this.configData;
        },
        enumerable: true,
        configurable: true
    });
    UIAtlas.prototype.getObject = function ($name, $x, $y, $width, $height, $maxWidth, $maxHeight, $cellx, $celly) {
        if ($cellx === void 0) { $cellx = 0; }
        if ($celly === void 0) { $celly = 0; }
        var obj = new Object;
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
    };
    UIAtlas.prototype.updateCtx = function ($ctx, xpos, ypos) {
        TextureManager.getInstance().updateTexture(this.texture, xpos, ypos, $ctx);
    };
    UIAtlas.prototype.upDataPicToTexture = function ($url, $iconName) {
        var _this = this;
        LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE, function ($img) {
            var rec = _this.getRec($iconName);
            _this.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            _this.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(_this.texture, rec.pixelX, rec.pixelY, _this.ctx);
        });
    };
    UIAtlas.prototype.clearCtxTextureBySkilname = function ($iconName) {
        var rec = this.getRec($iconName);
        this.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
        this.ctx.clearRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
        TextureManager.getInstance().updateTexture(this.texture, rec.pixelX, rec.pixelY, this.ctx);
    };
    UIAtlas.prototype.copyPicToTexture = function ($srcSkin, $desSkin) {
        var srcRec = this.getRec($srcSkin);
        var desRec = this.getRec($desSkin);
        this.ctx = UIManager.getInstance().getContext2D(desRec.pixelWitdh, desRec.pixelHeight, false);
        this.ctx.drawImage(this.useImg, srcRec.pixelX, srcRec.pixelY, srcRec.pixelWitdh, srcRec.pixelWitdh, 0, 0, desRec.pixelWitdh, desRec.pixelWitdh);
        TextureManager.getInstance().updateTexture(this.texture, desRec.pixelX, desRec.pixelY, this.ctx);
    };
    /**
     * 渲染文字
     */
    UIAtlas.prototype.updateLable = function ($key, $str, fontsize, fontColor, textBaseline, textAlign, bolder, maxWidth) {
        if (textBaseline === void 0) { textBaseline = TextAlign.MIDDLE; }
        if (textAlign === void 0) { textAlign = TextAlign.CENTER; }
        if (bolder === void 0) { bolder = false; }
        if (maxWidth === void 0) { maxWidth = 0; }
        var rec = this.getRec($key);
        this.ctx = this.getTextCtx(rec, fontsize, fontColor, bolder, textBaseline, textAlign);
        var xpos = this.getTextxpos(textAlign, this.ctx);
        var ypos = this.getTextypos(textBaseline, this.ctx);
        if (maxWidth > 0) {
            this.wrapText(this.ctx, $str, xpos, ypos, maxWidth, fontsize + 3);
        }
        else {
            this.ctx.fillText($str, xpos, ypos);
        }
        TextureManager.getInstance().updateTexture(this.texture, rec.pixelX, rec.pixelY, this.ctx);
    };
    UIAtlas.prototype.updateArtNum = function ($targetName, $srcName, num) {
        var str = String(num);
        var targetRec = this.getRec($targetName);
        var srcRec = this.getRec($srcName);
        this.ctx = UIManager.getInstance().getContext2D(targetRec.pixelWitdh, targetRec.pixelHeight, false);
        var sw = srcRec.pixelWitdh / 10;
        for (var i = 0; i < str.length; i++) {
            var snum = Number(str.charAt(i));
            this.ctx.drawImage(this.useImg, srcRec.pixelX + snum * sw, srcRec.pixelY, sw, srcRec.pixelHeight, i * sw, 0, sw, srcRec.pixelHeight);
        }
        TextureManager.getInstance().updateTexture(this.texture, targetRec.pixelX, targetRec.pixelY, this.ctx);
    };
    //写入单行颜色字体，字号,对齐，基础颜色 并上传显卡
    UIAtlas.prototype.writeSingleLabel = function ($key, $str, fontsize, $align, $baseColor) {
        if (fontsize === void 0) { fontsize = 12; }
        if ($align === void 0) { $align = TextAlign.CENTER; }
        if ($baseColor === void 0) { $baseColor = "#ffffff"; }
        LabelTextFont.writeSingleLabel(this, $key, $str, fontsize, $align, $baseColor);
    };
    //单行字绘制到CXT上
    UIAtlas.prototype.writeSingleLabelToCxt = function ($ctx, $str, fontsize, $tx, $ty) {
        if (fontsize === void 0) { fontsize = 12; }
        if ($tx === void 0) { $tx = 0; }
        if ($ty === void 0) { $ty = 0; }
        $ctx.textBaseline = TextAlign.TOP;
        $ctx.textAlign = TextAlign.LEFT;
        $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
        TextRegExp.wrapText($ctx, $str, "#ffffff", $tx, $ty, 9999, 20); //9999为无限大
    };
    /**
     * 未渲染文字。只是绘制到CanvasRenderingContext2D
     * 返回CanvasRenderingContext2D对象
     */
    UIAtlas.prototype.updateLableCtx = function ($ctx, $str, $x, $y, $fontsize, $textAlign, $textBaseline, $textcolor, $textbolder, $maxWidth) {
        if ($textAlign === void 0) { $textAlign = TextAlign.CENTER; }
        if ($textBaseline === void 0) { $textBaseline = TextAlign.MIDDLE; }
        if ($textcolor === void 0) { $textcolor = "#000000"; }
        if ($textbolder === void 0) { $textbolder = "bolder"; }
        if ($maxWidth === void 0) { $maxWidth = 0; }
        $ctx.textAlign = $textAlign;
        $ctx.textBaseline = $textBaseline;
        $ctx.fillStyle = $textcolor;
        $ctx.font = $textbolder + " " + $fontsize + "px " + UIData.font;
        var $xpos = this.getTextxpos($textAlign, $ctx);
        if ($maxWidth > 0) {
            this.wrapText($ctx, $str, $x, $y, $maxWidth, $fontsize + 3);
        }
        else {
            $ctx.fillText($str, $x + $xpos, $y);
        }
    };
    UIAtlas.prototype.getTextCtx = function ($rec, $fontsize, $fontColor, $bolder, $textBaseline, $textAlign) {
        var $ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
        $ctx.textBaseline = $textBaseline;
        $ctx.textAlign = $textAlign;
        $ctx.fillStyle = $fontColor;
        $ctx.font = ($bolder ? "bolder " : "") + " " + $fontsize + "px " + UIData.font;
        return $ctx;
    };
    UIAtlas.prototype.getTextxpos = function ($textAlign, $ctx) {
        var $xpos = 0;
        if ($textAlign == TextAlign.LEFT) {
            $xpos = 0;
        }
        else if ($textAlign == TextAlign.RIGHT) {
            $xpos = $ctx.canvas.width;
        }
        else if ($textAlign == TextAlign.CENTER) {
            $xpos = $ctx.canvas.width / 2;
        }
        return $xpos;
    };
    UIAtlas.prototype.getTextypos = function ($textBaseline, $ctx) {
        var $ypos = 0;
        if ($textBaseline == TextAlign.BOTTOM) {
            $ypos = $ctx.canvas.height;
        }
        else if ($textBaseline == TextAlign.TOP) {
            $ypos = 0;
        }
        else if ($textBaseline == TextAlign.MIDDLE) {
            $ypos = $ctx.canvas.height / 2;
        }
        return $ypos;
    };
    UIAtlas.prototype.wrapText = function (context, text, x, y, maxWidth, lineHeight) {
        var words = text;
        var line = "";
        for (var n = 0; n < words.length; n++) {
            if (words[n] == "\n") {
                context.fillText(line, x, y);
                line = "";
                y += lineHeight;
            }
            else {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + "";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
        }
        context.fillText(line, x, y);
    };
    UIAtlas.prototype.dispose = function () {
        if (this._hasDispose) {
            return;
        }
        this.textureRes.clearUseNum();
        this.configData = null;
        this.layoutData = null;
        this.useImg = null;
        this._hasDispose = true;
    };
    return UIAtlas;
}());
//# sourceMappingURL=UIAtlas.js.map