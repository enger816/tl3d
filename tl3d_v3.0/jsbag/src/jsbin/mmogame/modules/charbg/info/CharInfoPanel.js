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
var charbg;
(function (charbg) {
    var CharInfoPanel = /** @class */ (function (_super) {
        __extends(CharInfoPanel, _super);
        function CharInfoPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.partNameAry = ["武器", "衣服", "护手", "腰带", "鞋子", "头饰", "项链", "手镯", "戒指", "腰坠"];
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.setBlackBg();
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        CharInfoPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/charbg/charinfo.xml", "ui/uidata/charbg/charinfo.png", function () { _this.loadConfigCom(); });
        };
        CharInfoPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.addChild(this.winmidRender.getComponent("t_bg"));
            this.addUIList(["t_win_title", "t_title_bg"], this._bgRender);
            var ui;
            ui = this.addChild(this._baseRender.getComponent("t_btn1"));
            ui.addEventListener(InteractiveEvent.Down, this.delread, this);
            ui = this.addChild(this._baseRender.getComponent("t_btn2"));
            ui.addEventListener(InteractiveEvent.Down, this.getAll, this);
            this.charName = this.addChild(this._baseRender.getComponent("t_name"));
            this.charVip = this.addChild(this._baseRender.getComponent("t_vip"));
            this.charTitle = this.addChild(this._baseRender.getComponent("t_title"));
            this.equIconAry = new Array;
            for (var i = 0; i < 10; i++) {
                this.equIconAry.push(this.addChild(this._baseRender.getComponent("t_i" + i)));
                this.equIconAry[i].addEventListener(InteractiveEvent.Up, this.equclick, this);
            }
            this.uiAtlasComplet = true;
            this.addPersonChar();
            this.applyLoadComplete();
        };
        CharInfoPanel.prototype.equclick = function ($e) {
            var data = $e.target.data;
            if (data) {
                var evt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                evt.data = data;
                evt.buttonType = 6;
                ModuleEventManager.dispatchEvent(evt);
            }
        };
        CharInfoPanel.prototype.draw = function (pvo) {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.charName.skinName, getBaseName(pvo.spo.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var equDic = new Object;
            for (var i = 0; i < pvo.equAry.length; i++) {
                var str = pvo.equAry[i].equip;
                var item = BagData.paserItemData(str);
                item.qhGemData = pvo.equAry[i];
                equDic[item.entryData.pos] = item;
            }
            for (var i = 0; i < this.equIconAry.length; i++) {
                var item = equDic[i + 1];
                if (item) {
                    IconManager.getInstance().drawItemIcon60(this.equIconAry[i], item.entry, 1, false, false);
                }
                else {
                    this.setNoEquIcon(this.equIconAry[i].skinName, i);
                }
                this.equIconAry[i].data = item;
            }
            this.showDisPlay.setBaseRoleAvatar(pvo.spo.coat, pvo.spo.gender);
            this.showDisPlay.setBaseRoleWeapon(pvo.spo.weapon, pvo.spo.gender);
            IconManager.getInstance().drawVip(this.charVip, pvo.spo.vip);
            if (pvo.spo.title > 0) {
                this._baseUiAtlas.upDataPicToTexture(getUItittleUrl(String(pvo.spo.title)), this.charTitle.skinName);
            }
            else {
                UiDraw.clearUI(this.charTitle);
            }
            //this._baseUiAtlas.upDataPicToTexture(getUItittleUrl(String(1)),this.charTitle.skinName)
        };
        CharInfoPanel.prototype.setNoEquIcon = function ($skinName, $index) {
            var rec = this._baseUiAtlas.getRec($skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, this.partNameAry[$index], 16, 0, 25, TextAlign.CENTER, ColorType.Brownac8965);
            this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        };
        CharInfoPanel.prototype.delread = function ($e) {
            //NetManager.getInstance().protocolos.remove_mail_one_step();
            NetManager.getInstance().protocolos.social_add_friend(this._data.spo.guid);
        };
        CharInfoPanel.prototype.getAll = function ($e) {
            //NetManager.getInstance().protocolos.pick_mail_one_step();
            //send_faction_invite
            if (GuidData.player.getFactionID() == "") {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您还没有加入家族", 99);
                return;
            }
            NetManager.getInstance().protocolos.send_faction_invite(this._data.spo.guid);
        };
        CharInfoPanel.prototype.addPersonChar = function () {
            var $person2DChar = new Person2DChar();
            this.wintopRender.addModel($person2DChar);
            this.showDisPlay = $person2DChar;
            this.resize();
        };
        CharInfoPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = 5.0 * UIData.Scale;
                this.showDisPlay.x = -20 * UIData.Scale;
                this.showDisPlay.y = -130 * UIData.Scale;
            }
        };
        CharInfoPanel.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        CharInfoPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        CharInfoPanel.prototype.show = function (spo) {
            this._data = spo;
            this.draw(spo);
            UIManager.getInstance().addUIContainer(this);
        };
        return CharInfoPanel;
    }(WindowMinUi));
    charbg.CharInfoPanel = CharInfoPanel;
})(charbg || (charbg = {}));
//# sourceMappingURL=CharInfoPanel.js.map