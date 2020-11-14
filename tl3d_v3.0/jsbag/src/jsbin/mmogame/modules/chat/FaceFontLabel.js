//带表情的文字
var FaceFontLabel = /** @class */ (function () {
    function FaceFontLabel() {
    }
    FaceFontLabel.writeMultiFaceLineToCtx = function ($ctx, $str, fontsize, $tx, $ty, _textWidth, _thh, baseColor) {
        if (fontsize === void 0) { fontsize = 12; }
        if ($tx === void 0) { $tx = 0; }
        if ($ty === void 0) { $ty = 0; }
        if (_thh === void 0) { _thh = 0; }
        if (baseColor === void 0) { baseColor = "[]"; }
        //$ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
        var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
        return this.wrapFaceText($ctx, $str, fontsize, baseColor, $tx, $ty, _textWidth, fontsize + _thh);
    };
    FaceFontLabel.getTextHeight = function ($ctx, $str, fontsize, _textWidth) {
        if (fontsize === void 0) { fontsize = 12; }
        // $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
        var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
        return this.wrapFaceText($ctx, $str, fontsize, "[]", 0, 0, _textWidth, fontsize + Math.ceil(fontsize / 10), false);
    };
    FaceFontLabel.getNextWords = function ($str, indx) {
        var $iconId = -1;
        if ($str[indx] == "/" && $str.length > (indx + 2)) {
            var tempA = $str[indx + 0] + $str[indx + 1] + $str[indx + 2];
            for (var i = 0; i < UIData.faceItem.length; i++) {
                if (UIData.faceItem[i] == tempA) {
                    return i + 1;
                }
            }
        }
        return $iconId;
    };
    FaceFontLabel.getFaceTxtStrLen = function (text) {
        var len = 0;
        TextRegExp.pushStr(text);
        var $lineNum = 1; //行数
        for (var n = 0; n < text.length; n++) {
            if (TextRegExp.isColor(n, null)) {
                continue;
            }
            var $faceId = this.getNextWords(text, n);
            if ($faceId == -1) {
                len += 1;
            }
            else {
                len += 2;
            }
        }
        return len;
    };
    FaceFontLabel.wrapFaceText = function ($ctx, text, fontsize, baseColor, x, y, maxWidth, lineHeight, $wirte) {
        if (fontsize === void 0) { fontsize = 12; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (maxWidth === void 0) { maxWidth = 500; }
        if (lineHeight === void 0) { lineHeight = 10; }
        if ($wirte === void 0) { $wirte = true; }
        if (baseColor) {
            TextRegExp.defaultColor = baseColor;
            $ctx.fillStyle = TextRegExp.defaultColor;
        }
        $ctx.strokeStyle = "#222222";
        $ctx.lineWidth = 4;
        TextRegExp.pushStr(text);
        var words = text;
        var line = "";
        var ty = 0;
        var $lineNum = 1; //行数
        for (var n = 0; n < words.length; n++) {
            if (TextRegExp.isColor(n, $ctx)) {
                continue;
            }
            var metrics = $ctx.measureText(line.replace("\n", ""));
            var $faceId = this.getNextWords(words, n);
            if ($faceId == -1) {
                // //console.log($ctx.font)
                if (metrics.width > maxWidth || words[n] == "\n") {
                    ty += lineHeight;
                    line = "";
                    if (words[n] != "\n") {
                        if ($wirte) {
                            $ctx.strokeText(words[n], x, y + ty);
                            $ctx.fillText(words[n], x, y + ty);
                        }
                    }
                    $lineNum++;
                }
                else {
                    if ($wirte) {
                        $ctx.strokeText(words[n], x + metrics.width * 1.0, y + ty);
                        $ctx.fillText(words[n], x + metrics.width * 1.0, y + ty);
                    }
                }
                line += words[n];
            }
            else {
                var faceSize = fontsize * 1.4;
                var $rect = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - faceSize / 10, faceSize, faceSize);
                if (metrics.width > maxWidth) {
                    ty += lineHeight;
                    line = "";
                    $lineNum++;
                    $rect = new Rectangle(x + 0, y + ty - faceSize / 10, faceSize, faceSize);
                }
                // if ($wirte) {
                this.drawFaceIcon($ctx, $rect, $faceId);
                // }
                n = n + 2;
                line += "脸1";
            }
        }
        return $lineNum;
    };
    FaceFontLabel.drawFaceIcon = function (ctx, $rect, $faceId) {
        UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
    };
    return FaceFontLabel;
}());
//# sourceMappingURL=FaceFontLabel.js.map