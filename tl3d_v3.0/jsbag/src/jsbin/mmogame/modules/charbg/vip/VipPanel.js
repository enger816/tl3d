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
    var VipPanel = /** @class */ (function (_super) {
        __extends(VipPanel, _super);
        function VipPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this._currentShowVip = 0;
            _this._currentVip = 0;
            _this._maxVip = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.setBlackBg();
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        VipPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/charbg/vip.xml", "ui/uidata/charbg/vip.png", function () { _this.loadConfigCom(); });
        };
        VipPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this._midRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.addUIList(["t_title_bg", "t_main_bg"], this.winmidRender);
            this.addUIList(["t_bg1", "t_bg", "t_pro_bg", "t_vip_big", "t_win_title"], this._bgRender);
            this.addUIList(["t_yun1", "t_yun", "t_vip_min", "t_chongzhi_lab1"], this._midRender);
            this.addUIList(["t_lab_bg1", "t_lab_bg"], this._baseRender);
            var ui;
            this.leftBtn = this.addChild(this._bgRender.getComponent("t_arr1"));
            this.leftBtn.isU = true;
            this.leftBtn.addEventListener(InteractiveEvent.Up, this.leftclick, this);
            this.rightBtn = this.addChild(this._bgRender.getComponent("t_arr2"));
            this.rightBtn.addEventListener(InteractiveEvent.Up, this.rightclick, this);
            // ui.addEventListener(InteractiveEvent.Down, this.delread, this);
            this.vipNum = this.addChild(this._baseRender.getComponent("t_vip_big_num"));
            this.buyBtn = this._baseRender.getComponent("t_btn_bg");
            this.buyBtn.addEventListener(InteractiveEvent.Up, this.buyGift, this);
            this.czBtn = this.addChild(this._baseRender.getComponent("t_cz_btn"));
            this.czBtn.addEventListener(InteractiveEvent.Up, this.czClick, this);
            this.chongzhiLab1 = this.addChild(this._midRender.getComponent("t_chongzhi_lab2"));
            this.chongzhiLab2 = this.addChild(this._midRender.getComponent("t_chongzhi_lab3"));
            this.chongzhiLab3 = this.addChild(this._midRender.getComponent("t_chongzhi_lab4"));
            this.chongzhiProgre = this.addChild(this._midRender.getComponent("t_pro"));
            this.chongzhiExp = this.addChild(this._baseRender.getComponent("t_chongzhi_pro"));
            this.giftTitle = this.addChild(this._midRender.getComponent("t_gift_title"));
            this.giftIconAry = new Array;
            for (var i = 0; i < 6; i++) {
                this.giftIconAry.push(this.addChild(this._baseRender.getComponent("t_icon" + i)));
            }
            this.giftLab1 = this.addChild(this._topRender.getComponent("t_gift_lab1"));
            this.giftLab2 = this.addChild(this._topRender.getComponent("t_gift_lab2"));
            this.giftBtnLab = this.addChild(this._topRender.getComponent("t_btn_lab"));
            this.infoLab1 = this.addChild(this._baseRender.getComponent("t_vip_min_num"));
            this.infoLab2 = this.addChild(this._baseRender.getComponent("t_vip_min_lab"));
            this.infoTitle = this.addChild(this._baseRender.getComponent("t_tq_title"));
            this.infoContent = this.addChild(this._baseRender.getComponent("t_tq_content"));
            // this.addChild(this.winmidRender.getComponent("t_bg"));
            // this.addUIList(["t_win_title", "t_title_bg"], this._bgRender);
            // 
            // ui = this.addChild(this._baseRender.getComponent("t_btn1"));
            // ui.addEventListener(InteractiveEvent.Down, this.delread, this);
            // ui = this.addChild(this._baseRender.getComponent("t_btn2"));
            // ui.addEventListener(InteractiveEvent.Down, this.getAll, this);
            // this.charName = this.addChild(this._baseRender.getComponent("t_name"));
            // this.charVip = this.addChild(this._baseRender.getComponent("t_vip"));
            // this.charTitle = this.addChild(this._baseRender.getComponent("t_title"));
            this.uiAtlasComplet = true;
            this.draw();
            this.applyLoadComplete();
        };
        VipPanel.prototype.buyGift = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.buy_vipgift(this._currentShowVip);
        };
        VipPanel.prototype.draw = function () {
            var vip = GuidData.player.getVipLevel();
            this._currentShowVip = vip;
            this.drawBaseVip();
            this.drawVipInfo(vip);
            this.setBtnVisible();
        };
        VipPanel.prototype.redrawVipInfo = function () {
            this.drawVipInfo(this._currentShowVip);
        };
        VipPanel.prototype.drawBaseVip = function () {
            var vip = GuidData.player.getVipLevel();
            this._currentVip = vip;
            var nextVipLev;
            if (GuidData.player.getVipLevel() == TableData.getInstance().getTabMaxID(TableData.tb_vip_base)) {
                nextVipLev = GuidData.player.getVipLevel();
            }
            else {
                nextVipLev = GuidData.player.getVipLevel() + 1;
            }
            var vipData = TableData.getInstance().getData(TableData.tb_vip_base, vip);
            var nextVipData = TableData.getInstance().getData(TableData.tb_vip_base, nextVipLev);
            var czNum = GuidData.player.getChongZhiSum();
            this._maxVip = TableData.getInstance().getTabSize(TableData.tb_vip_base) - 1;
            this._maxVip = Math.min(vip + 8, this._maxVip);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.chongzhiExp.skinName, czNum + "/" + nextVipData.chongzhi, 16, TextAlign.CENTER, ColorType.Whiteffffff);
            this.chongzhiProgre.uvScale = czNum / nextVipData.chongzhi;
            ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.vipNum.skinName, String(vip), ArtFont.num60);
            var needNum = nextVipData.chongzhi - czNum;
            var xoff = ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.chongzhiLab1.skinName, String(needNum), ArtFont.num59);
            this.chongzhiLab2.x = this.chongzhiLab2.baseRec.x + xoff;
            this.chongzhiLab3.x = this.chongzhiLab3.baseRec.x + xoff;
            ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.chongzhiLab3.skinName, String(vip + 1), ArtFont.num59);
        };
        VipPanel.prototype.drawVipInfo = function (vip) {
            var vipData = TableData.getInstance().getData(TableData.tb_vip_base, vip);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftTitle.skinName, "VIP" + vip + "特权礼包", 16, TextAlign.CENTER, ColorType.colorb96d49);
            for (var i = 0; i < this.giftIconAry.length; i++) {
                if (vipData.gift[i]) {
                    IconManager.getInstance().drawItemIcon60(this.giftIconAry[i], vipData.gift[i][0], vipData.gift[i][1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon60(this.giftIconAry[i], 0, 1);
                }
            }
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftLab1.skinName, "原价：" + vipData.fake_cost[0][1], 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawPrice(this.giftLab1, "原价：", vipData.fake_cost, true);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftLab2.skinName, "现价：" + vipData.cost[0][1], 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawPrice(this.giftLab2, "现价：", vipData.cost, false);
            if (vip == 0) {
                UiDraw.clearUI(this.giftBtnLab);
                this.removeChild(this.buyBtn);
            }
            else if (GuidData.player.getVIPBuyGift(vip)) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftBtnLab.skinName, "已购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.removeChild(this.buyBtn);
            }
            else if (this._currentVip < vip) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftBtnLab.skinName, "VIP" + vip + "可购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.removeChild(this.buyBtn);
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftBtnLab.skinName, "购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.addChild(this.buyBtn);
            }
            var xoff = ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.infoLab1.skinName, String(vip), ArtFont.num58);
            this.infoLab2.x = this.infoLab2.baseRec.x + xoff;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.infoTitle.skinName, "【充" + vipData.chongzhi + "元可升级到该级VIP】", 16, TextAlign.CENTER, ColorType.colorb96d49);
            var desc = String(vipData.desc).replace(/\\n/g, "\n");
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.infoContent.skinName, desc, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        };
        VipPanel.prototype.drawPrice = function ($ui, str, $cost, $kill) {
            if ($cost.length == 0) {
                UiDraw.clearUI($ui);
                return;
            }
            var $rec = this._baseUiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var xoff = 20;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.drawCost(ctx, xoff, 0, getresIdByreward($cost[0][0]));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, String($cost[0][1]), 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);
            if ($kill) {
                ctx.strokeStyle = "#cd2000";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(5, 17);
                ctx.lineTo(xoff + 5, 17);
                ctx.stroke();
                ctx.closePath();
            }
            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        VipPanel.prototype.czClick = function ($e) {
            ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
        };
        VipPanel.prototype.rightclick = function ($e) {
            if (this._currentShowVip == this._maxVip) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($e.target);
            this._currentShowVip++;
            this.drawVipInfo(this._currentShowVip);
            this.setBtnVisible();
        };
        VipPanel.prototype.leftclick = function ($e) {
            if (this._currentShowVip == 0) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($e.target);
            this._currentShowVip--;
            this.drawVipInfo(this._currentShowVip);
            this.setBtnVisible();
        };
        VipPanel.prototype.setBtnVisible = function () {
            if (this._currentShowVip <= 0) {
                this.removeChild(this.leftBtn);
            }
            else {
                this.addChild(this.leftBtn);
            }
            if (this._currentShowVip >= this._maxVip) {
                this.removeChild(this.rightBtn);
            }
            else {
                this.addChild(this.rightBtn);
            }
        };
        VipPanel.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        VipPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        VipPanel.prototype.show = function () {
            // this._data = spo;
            // this.draw(spo);
            this.draw();
            UIManager.getInstance().addUIContainer(this);
            var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
            $scenePange.data = SharedDef.MODULE_REALM;
            ModuleEventManager.dispatchEvent($scenePange);
        };
        return VipPanel;
    }(WindowMinUi));
    charbg.VipPanel = VipPanel;
})(charbg || (charbg = {}));
//# sourceMappingURL=VipPanel.js.map