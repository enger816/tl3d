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
var faction;
(function (faction) {
    var NoticePanel = /** @class */ (function (_super) {
        __extends(NoticePanel, _super);
        function NoticePanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            //添加好友面板渲染器
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        NoticePanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            _super.prototype.dispose.call(this);
        };
        NoticePanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            //     this._publicbgRender.uiAtlas = $publicbgUiAtlas;
            this._topRender.setInfo("ui/uidata/faction/gonggao/announcement.xml", "ui/uidata/faction/gonggao/announcement.png", function () { _this.loadConfigCom(); });
            // });
        };
        NoticePanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            var renderLevel = this._topRender;
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this.g_bg_6 = this.addEvntBut("cnew_infobg", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.g_bg_6, "g_bg_6", renderLevel);
            this.g_bg_7 = this.addEvntBut("cnew_txtbg", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.g_bg_7, "g_bg_7", renderLevel);
            this.g_bg_8 = this.addEvntBut("cnew_txtbg", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.g_bg_8, "g_bg_8", renderLevel);
            this._publicbgRender.applyObjData();
            this.addUIList(["a_49", "a_50", "a_48"], renderLevel);
            this.addChild(this._midRender.getComponent("a_1"));
            this.b_btnbg_qr = this.addEvntBut("a_34_1", renderLevel);
            this.b_btnbg_qx = this.addEvntBut("a_51", renderLevel);
            this.GG = this.addChild(renderLevel.getComponent("a_52"));
            this.QQ = this.addChild(renderLevel.getComponent("a_54"));
            this.WeChat = this.addChild(renderLevel.getComponent("a_53"));
            this.applyLoadComplete();
        };
        NoticePanel.prototype.initData = function () {
            var str = GuidData.faction.getNotice();
            if (str && str.length > 0) {
                var ary = str.split("\1");
                if (ary[0].length > 0) {
                    this._msgTxtGG = ary[0];
                    this._type = true;
                }
                else {
                    this._msgTxtGG = "在此处输入文字";
                    this._type = false;
                }
                this._msgTxtQQ = ary[1];
                this._msgTxtWeChat = ary[2];
            }
            else {
                this._msgTxtGG = "在此处输入文字";
                this._type = false;
                this._msgTxtQQ = "";
                this._msgTxtWeChat = "";
            }
            this.refreshInputBfunGG(this._msgTxtGG, this._type);
            this.refreshInputBfunQQ(this._msgTxtQQ);
            this.refreshInputBfunWeChat(this._msgTxtWeChat);
        };
        NoticePanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        NoticePanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.initData();
            }
        };
        NoticePanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        NoticePanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
                case this.g_bg_6:
                    //文本框监听事件  
                    InputPanel.show(function ($str) { _this.inputBfunGG($str); }, this._type ? this._msgTxtGG : "", 0, 200);
                    break;
                case this.g_bg_7:
                    //文本框监听事件  
                    InputPanel.show(function ($str) { _this.inputBfunQQ($str); }, this._msgTxtQQ);
                    break;
                case this.g_bg_8:
                    //文本框监听事件  
                    InputPanel.show(function ($str) { _this.inputBfunWeChat($str); }, this._msgTxtWeChat);
                    break;
                case this.b_btnbg_qx:
                    this.hide();
                    break;
                case this.b_btnbg_qr:
                    var key = "\1";
                    var str = this._msgTxtGG == "在此处输入文字" ? "" : this._msgTxtGG;
                    var completestr = str + key + this._msgTxtQQ + key + this._msgTxtWeChat;
                    var byte = new ByteArray();
                    byte.writeUTF(completestr);
                    if (byte.length > 100) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "字符太长", 99);
                        return;
                    }
                    NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_NOTICE, 0, 0, completestr, "");
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        NoticePanel.prototype.inputBfunGG = function ($str) {
            if ($str.length > 0) {
                this._type = true;
                this._msgTxtGG = $str;
            }
            else {
                this._type = false;
                this._msgTxtGG = "在此处输入文字";
            }
            this.refreshInputBfunGG(this._msgTxtGG, this._type);
        };
        NoticePanel.prototype.inputBfunQQ = function ($str) {
            this._msgTxtQQ = $str;
            this.refreshInputBfunQQ($str);
        };
        NoticePanel.prototype.inputBfunWeChat = function ($str) {
            this._msgTxtWeChat = $str;
            this.refreshInputBfunWeChat($str);
        };
        NoticePanel.prototype.refreshInputBfunGG = function ($str, $type) {
            LabelTextFont.writeText(this._topRender.uiAtlas, this.GG.skinName, 10, 5, $str, 16, $type ? "#853d07" : "#853d07", 320, true);
            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.h_label_num_txt.skinName,"99",ArtFont.num1)
        };
        NoticePanel.prototype.refreshInputBfunQQ = function ($str) {
            var ary = $str.split("\1");
            if (ary[1] == "") {
                $str = "";
            }
            LabelTextFont.writeText(this._topRender.uiAtlas, this.QQ.skinName, 10, 5, $str, 16, "#853d07", 180, true);
            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.h_label_num_txt.skinName,"99",ArtFont.num1)
        };
        NoticePanel.prototype.refreshInputBfunWeChat = function ($str) {
            var ary = $str.split("\1");
            if (ary[1] == "") {
                $str = "";
            }
            LabelTextFont.writeText(this._topRender.uiAtlas, this.WeChat.skinName, 10, 5, $str, 16, "#853d07", 180, true);
            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.h_label_num_txt.skinName,"99",ArtFont.num1)
        };
        return NoticePanel;
    }(WindowCentenMin));
    faction.NoticePanel = NoticePanel;
})(faction || (faction = {}));
//# sourceMappingURL=NoticePanel.js.map