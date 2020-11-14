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
var kaifu;
(function (kaifu) {
    var KaifuVIPRewardPanel = /** @class */ (function (_super) {
        __extends(KaifuVIPRewardPanel, _super);
        function KaifuVIPRewardPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        KaifuVIPRewardPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._banner = new UIRenderOnlyPicComponent();
            this._banner.uiAtlas = $uiatlas;
            this.addRender(this._banner);
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);
            this.initUI();
        };
        KaifuVIPRewardPanel.prototype.initUI = function () {
            var _this = this;
            this._baseTabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            this._activeTabObj = TableData.getInstance().getData(TableData.tb_activity_daily_gift_base, this._baseTabObj.params[0]);
            this.addChild(this._banner.getComponent("t_banner1"));
            this._banner.setImgUrl(getKaifuIconUrl("b1"));
            var ui;
            this._timeUI = this.addChild(this._baseRender.getComponent("t_vr_time"));
            //ui = this.addChild(this._baseRender.getComponent("t_lb_info"));
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "活动说明：" + this._activeTabObj.desc, 16, TextAlign.LEFT);
            this.addBg();
            this.addItems();
            this.initEndTime();
            this._drawTimeFun = function () {
                _this.drawTime();
            };
        };
        KaifuVIPRewardPanel.prototype.addBg = function () {
            var bgStr = ["t_vr_t0", "t_vr_t1", "t_vr_t2", "t_vr_y0", "t_vr_y1", "t_vr_y2", "t_vr_j0", "t_vr_j1", "t_vr_j2"];
            this.addUIList(bgStr, this._bgRender);
            for (var i = 0; i < bgStr.length; i++) {
                var sname = bgStr[i] + "c";
                var ui = this._bgRender.getComponent(sname);
                ui.isU = true;
                this.addChild(ui);
            }
        };
        KaifuVIPRewardPanel.prototype.addItems = function () {
            this.items = new Array;
            for (var i = 0; i < 3; i++) {
                var item = new KaifuVipRewardItem();
                item.create(this._baseRender, this._topRender, i, this);
                var tabObj = TableData.getInstance().getData(TableData.tb_activity_daily_gift, this._activeTabObj.gift_list[i]);
                item.drawBase(tabObj);
                this.items.push(item);
            }
        };
        KaifuVIPRewardPanel.prototype.refresh = function () {
            var pdata = GuidData.grow.getActivePlayerData(this._baseTabObj.category);
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].drawBtn(pdata[i + 1] == 1);
            }
        };
        KaifuVIPRewardPanel.prototype.initEndTime = function () {
            var startTime;
            if (this._baseTabObj.startTime == -1) {
                startTime = TimeUtil.getZeroTime(GameInstance.serverOpenTime);
            }
            else {
                startTime = this._baseTabObj.startTime;
            }
            this._activeEndTime = startTime + (this._baseTabObj.delayDays + this._baseTabObj.lastDays) * 24 * 60 * 60;
        };
        KaifuVIPRewardPanel.prototype.drawTime = function () {
            var lastTime = this._activeEndTime - GameInstance.getServerNow();
            var str = TimeUtil.getDiffTime1(lastTime);
            str = ColorType.Brown7a2f21 + "剩余时间：" + ColorType.colorcd2000 + str;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeUI.skinName, str, 16, TextAlign.LEFT);
        };
        KaifuVIPRewardPanel.prototype.show = function () {
            //UIManager.getInstance().addUIContainer(this);
            //super.show($activeID);
            _super.prototype.show.call(this);
            //this.addChild(this._bg);
            this.refresh();
            TimeUtil.addTimeTick(1000, this._drawTimeFun);
            //NetManager.getInstance().protocolos.activity_opt_get_rank_list(this._activeID);
        };
        KaifuVIPRewardPanel.prototype.hide = function () {
            //UIManager.getInstance().removeUIContainer(this);
            _super.prototype.hide.call(this);
            //this.removeChild(this._bg);
            TimeUtil.removeTimeTick(this._drawTimeFun);
        };
        KaifuVIPRewardPanel.prototype.buyGift = function ($id) {
            NetManager.getInstance().protocolos.activity_opt_buy_dailygift(this._activeID, $id);
        };
        return KaifuVIPRewardPanel;
    }(kaifu.KaifuBaseContainer));
    kaifu.KaifuVIPRewardPanel = KaifuVIPRewardPanel;
    var KaifuVipRewardItem = /** @class */ (function () {
        function KaifuVipRewardItem() {
        }
        KaifuVipRewardItem.prototype.create = function ($render, $topRender, $id, $container) {
            this.title = $container.addChild($render.getComponent("t_vr_title" + $id));
            this.vip = $container.addChild($render.getComponent("t_vr_vip" + $id));
            this.icon = $container.addChild($render.getComponent("t_vr_icon" + $id));
            this.cost1 = $container.addChild($render.getComponent("t_vr_co" + $id));
            this.cost2 = $container.addChild($render.getComponent("t_vr_po" + $id));
            this.btn = $render.getComponent("t_vr_btn" + $id);
            this.btnLab = $container.addChild($topRender.getComponent("t_vr_btnlab" + $id));
            this.btn.addEventListener(InteractiveEvent.Up, this.onclick, this);
            this.root = $container;
            this.id = $id;
        };
        KaifuVipRewardItem.prototype.onclick = function ($e) {
            if (this.minVip > GuidData.player.getVipLevel()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "VIP等级不够", 99);
                return;
            }
            if (this.dataInfo) {
                if (!hasEnoughRes(this.dataInfo.cost[0])) {
                    //msgtip.MsgTipManager.outStr("元宝不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = this.dataInfo.cost[0][0];
                    ModuleEventManager.dispatchEvent($aaa);
                    return;
                }
            }
            this.root.buyGift(this.id);
        };
        KaifuVipRewardItem.prototype.drawBase = function (tabObj) {
            this.dataInfo = tabObj;
            var uiAtlas = this.title.uiRender.uiAtlas;
            LabelTextFont.writeSingleLabel(uiAtlas, this.title.skinName, tabObj.title, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(uiAtlas, this.vip.skinName, "VIP" + tabObj.vip + "可购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.minVip = tabObj.vip;
            IconManager.getInstance().drawItemIcon60(this.icon, tabObj.item[0][0], tabObj.item[0][1]);
            this.drawKillPrice(this.cost1, "原价：", tabObj.fake_cost, true);
            this.drawKillPrice(this.cost2, "现价：", tabObj.cost, false);
        };
        KaifuVipRewardItem.prototype.drawBtn = function ($hasBuy) {
            if ($hasBuy) {
                this.root.removeChild(this.btn);
                LabelTextFont.writeSingleLabel(this.btnLab.uiRender.uiAtlas, this.btnLab.skinName, "已购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            else {
                this.root.addChild(this.btn);
                LabelTextFont.writeSingleLabel(this.btnLab.uiRender.uiAtlas, this.btnLab.skinName, "购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        };
        KaifuVipRewardItem.prototype.drawKillPrice = function ($ui, str, $cost, $kill) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
            var xoff = 20;
            var yoff = 3;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, xoff, yoff, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.drawCost(ctx, xoff, yoff - 10, getresIdByreward($cost[0][0]));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, String($cost[0][1]), 16, xoff, yoff, TextAlign.LEFT, ColorType.Brown7a2f21);
            if ($kill) {
                ctx.strokeStyle = "#cd2000";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(10, 10);
                ctx.lineTo(xoff + 5, 10 + yoff);
                ctx.stroke();
                ctx.closePath();
            }
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return KaifuVipRewardItem;
    }());
    kaifu.KaifuVipRewardItem = KaifuVipRewardItem;
})(kaifu || (kaifu = {}));
//# sourceMappingURL=KaifuVIPRewardPanel.js.map