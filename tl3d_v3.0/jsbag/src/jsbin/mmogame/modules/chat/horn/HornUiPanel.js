var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var hornui;
(function (hornui) {
    var HornUiPanel = /** @class */ (function (_super) {
        __extends(HornUiPanel, _super);
        function HornUiPanel() {
            var _this = _super.call(this) || this;
            _this._msgTxt = "请输入文字..";
            _this.uiAtlasComplet = false;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas;
            return _this;
        }
        HornUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/chat/horn/horn.xml", "ui/uidata/chat/horn/horn.png", function () { _this.loadConfigCom(); });
        };
        HornUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this._bottomRender.applyObjData();
            this._midRender.applyObjData();
            this.a_input_bg = this.addEvntBut("a_input_bg", this._bottomRender);
            this.addEvntBut("a_tittle", this._topRender);
            this.addEvntBut("a_label", this._topRender);
            this.a_addhorn = this.addEvntBut("a_addhorn", this._topRender);
            this.a_face = this.addEvntBut("a_face", this._topRender);
            this.a_send = this.addEvntBut("a_send", this._topRender);
            this.a_input_txt = this.addEvntBut("a_input_txt", this._topRender);
            this.a_horn_num = this.addChild(this._topRender.getComponent("a_horn_num"));
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();
        };
        HornUiPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.c_close:
                    this.close();
                    break;
                case this.a_input_bg:
                case this.a_input_txt:
                    if (this._msgTxt.search("请输入文字") != -1) {
                        this._msgTxt = "";
                    }
                    InputPanel.show(function ($str) { _this.inputBfun($str); }, this._msgTxt);
                    break;
                case this.a_face:
                    //var $facePanel: Chat.FacePanel = Chat.FacePanel.show(this._topRender.uiAtlas, ($str: string) => { this.addFaceText($str) });
                    //$facePanel.bottom = (Scene_data.stageHeight - evt.y) / UIData.Scale
                    //$facePanel.left = (Scene_data.stageWidth / UIData.Scale - 450) / 2;
                    var $skd = new faceui.FaceUiEvent(faceui.FaceUiEvent.SHOW_FACE_UI_PANEL);
                    $skd.data = { bfun: function ($faceStr) { _this.addFaceText($faceStr); }, bottom: (Scene_data.stageHeight - evt.y - 30) / UIData.Scale, left: (Scene_data.stageWidth / UIData.Scale - 450) / 2 };
                    ModuleEventManager.dispatchEvent($skd);
                    break;
                case this.a_send:
                    //console.log("发送喇叭=》", this._msgTxt)
                    if (this._msgTxt.length) {
                        NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_HORM, ColorType.Redff0000 + this._msgTxt);
                        this._msgTxt = "";
                        this.refresh();
                    }
                    break;
                default:
                    break;
            }
        };
        HornUiPanel.prototype.addFaceText = function (value) {
            this._msgTxt = this._msgTxt + value;
            this.refresh();
        };
        HornUiPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                this.drawDescTxt(this._msgTxt);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_horn_num.skinName, ColorType.Green2ca937 + "99", 16);
            }
        };
        HornUiPanel.prototype.inputBfun = function ($str) {
            this._msgTxt = $str;
            this.refresh();
        };
        HornUiPanel.prototype.drawDescTxt = function ($desc) {
            var $rect = this._topRender.uiAtlas.getRec(this.a_input_txt.skinName);
            var $ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            HornUiPanel.writeMultiFaceLineToCtx($ctx, ColorType.Brown7a2f21 + $desc, 16, 0, 0);
            this._topRender.uiAtlas.updateCtx($ctx, $rect.pixelX, $rect.pixelY);
        };
        HornUiPanel.writeMultiFaceLineToCtx = function ($ctx, $str, fontsize, $tx, $ty) {
            if (fontsize === void 0) { fontsize = 12; }
            if ($tx === void 0) { $tx = 0; }
            if ($ty === void 0) { $ty = 0; }
            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics = TextRegExp.getTextMetrics($ctx, $str);
            return this.wrapFaceText($ctx, $str, "[]", $tx, $ty, 270, fontsize + 5);
        };
        HornUiPanel.getNextWords = function ($str, indx) {
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
        HornUiPanel.wrapFaceText = function ($ctx, text, baseColor, x, y, maxWidth, lineHeight) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (maxWidth === void 0) { maxWidth = 500; }
            if (lineHeight === void 0) { lineHeight = 10; }
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
                    if (metrics.width > maxWidth || words[n] == "\n") {
                        ty += lineHeight;
                        line = "";
                        if (words[n] != "\n") {
                            $ctx.fillText(words[n], x, y + ty);
                        }
                        $lineNum++;
                    }
                    else {
                        $ctx.fillText(words[n], x + metrics.width * 1.0, y + ty);
                    }
                    line += words[n];
                }
                else {
                    var $rect = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - 3, 24, 24);
                    if (metrics.width > maxWidth) {
                        ty += lineHeight;
                        line = "";
                        $lineNum++;
                        $rect.x = x;
                        $rect.y = y + ty - 3;
                    }
                    this.drawFaceIcon($ctx, $rect, $faceId);
                    n = n + 2;
                    line += "大1";
                }
            }
            return $lineNum;
        };
        HornUiPanel.drawFaceIcon = function (ctx, $rect, $faceId) {
            UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
        };
        HornUiPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return HornUiPanel;
    }(WindowCentenMin));
    hornui.HornUiPanel = HornUiPanel;
})(hornui || (hornui = {}));
//# sourceMappingURL=HornUiPanel.js.map