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
    var KaifuRewardPanel = /** @class */ (function (_super) {
        __extends(KaifuRewardPanel, _super);
        function KaifuRewardPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        KaifuRewardPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
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
            this.initUI();
        };
        KaifuRewardPanel.prototype.initUI = function () {
            var _this = this;
            this._baseTabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            this._activeTabObj = TableData.getInstance().getData(TableData.tb_activity_limit_gift_base, this._baseTabObj.params[0]);
            this.addChild(this._banner.getComponent("t_banner"));
            this._banner.setImgUrl(getKaifuIconUrl("b0"));
            var ui;
            this._timeUI = this.addChild(this._baseRender.getComponent("t_lb_time"));
            ui = this.addChild(this._baseRender.getComponent("t_lb_info"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "活动说明：" + this._activeTabObj.desc, 16, TextAlign.LEFT);
            this._slist = new KaiFuRewardList();
            this._slist.init(this._baseUiAtlas, this._activeTabObj, this._activeID, this._baseTabObj.category);
            this.initEndTime();
            this._drawTimeFun = function () {
                _this.drawTime();
            };
        };
        KaifuRewardPanel.prototype.initEndTime = function () {
            var startTime;
            if (this._baseTabObj.startTime == -1) {
                startTime = TimeUtil.getZeroTime(GameInstance.serverOpenTime);
            }
            else {
                startTime = this._baseTabObj.startTime;
            }
            this._activeEndTime = startTime + (this._baseTabObj.delayDays + this._baseTabObj.lastDays) * 24 * 60 * 60;
        };
        KaifuRewardPanel.prototype.drawTime = function () {
            var lastTime = this._activeEndTime - GameInstance.getServerNow();
            var str = TimeUtil.getDiffTime1(lastTime);
            str = ColorType.Brown7a2f21 + "剩余时间：" + ColorType.colorcd2000 + str;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeUI.skinName, str, 16, TextAlign.LEFT);
        };
        KaifuRewardPanel.prototype.refresh = function () {
            if (this._slist) {
                this._slist.reGetData();
            }
        };
        KaifuRewardPanel.prototype.show = function () {
            //UIManager.getInstance().addUIContainer(this);
            //super.show($activeID);
            _super.prototype.show.call(this);
            //this.addChild(this._bg);
            //this.draw();
            this._slist.show();
            TimeUtil.addTimeTick(1000, this._drawTimeFun);
            NetManager.getInstance().protocolos.activity_opt_get_rank_list(this._activeID);
        };
        KaifuRewardPanel.prototype.hide = function () {
            //UIManager.getInstance().removeUIContainer(this);
            _super.prototype.hide.call(this);
            //this.removeChild(this._bg);
            this._slist.hide();
            TimeUtil.removeTimeTick(this._drawTimeFun);
        };
        return KaifuRewardPanel;
    }(kaifu.KaifuBaseContainer));
    kaifu.KaifuRewardPanel = KaifuRewardPanel;
    var KaiFuRewardList = /** @class */ (function (_super) {
        __extends(KaiFuRewardList, _super);
        function KaiFuRewardList() {
            return _super.call(this) || this;
        }
        KaiFuRewardList.prototype.init = function ($atlas, $activeTabObj, $activeTabID, $dataOffset) {
            this._activeTabObj = $activeTabObj;
            this.baseAtlas = $atlas;
            this._activeTabID = $activeTabID;
            this._dataOffset = $dataOffset;
            this.initData();
        };
        KaiFuRewardList.prototype.initData = function () {
            var ary = this.getDataAry();
            var w = 695;
            var h = 300;
            this.setData(ary, KaiFuRewardListItemRender, w, h, 692, 128, 2, 512, 512, 1, 3, 1);
            this.center = 80;
            this.middle = 80;
            this.setShowLevel(4);
        };
        KaiFuRewardList.prototype.getDataAry = function () {
            var ary = new Array();
            var pdata = GuidData.grow.getActivePlayerData(this._dataOffset);
            for (var i = 0; i < 3; i++) {
                var data = new SListItemData();
                var gift = this._activeTabObj.gift_list[i];
                var vo = new KaiFuRewardItemVo();
                vo.tabObj = TableData.getInstance().getData(TableData.tb_activity_limit_gift, gift);
                vo.hasBuy = getBit(pdata[1], i);
                data.data = vo;
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        KaiFuRewardList.prototype.reGetData = function () {
            var pdata = GuidData.grow.getActivePlayerData(this._dataOffset);
            for (var i = 0; i < this._dataAry.length; i++) {
                this._dataAry[i].data.hasBuy = getBit(pdata[1], i);
            }
            this.refreshDraw();
        };
        KaiFuRewardList.prototype.getRandomAry = function ($src, $num) {
            var desAry = [].concat($src);
            desAry.sort(function (a, b) { return Math.random() > .5 ? -1 : 1; });
            desAry.length = $num;
            return desAry;
        };
        KaiFuRewardList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
        };
        KaiFuRewardList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        KaiFuRewardList.prototype.buyGift = function ($idx) {
            NetManager.getInstance().protocolos.activity_opt_buy_limitgift(this._activeTabID, $idx);
        };
        return KaiFuRewardList;
    }(SList));
    kaifu.KaiFuRewardList = KaiFuRewardList;
    var KaiFuRewardItemVo = /** @class */ (function () {
        function KaiFuRewardItemVo() {
        }
        return KaiFuRewardItemVo;
    }());
    kaifu.KaiFuRewardItemVo = KaiFuRewardItemVo;
    var KaiFuRewardListItemRender = /** @class */ (function (_super) {
        __extends(KaiFuRewardListItemRender, _super);
        function KaiFuRewardListItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._iconAry = new Array;
            return _this;
        }
        KaiFuRewardListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "l_s_bg", 0, 0, 692, 128, 10, 10);
            $container.addChild(this._ibg);
            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_id", 4, 2, 504, 33);
            $container.addChild(this._icon);
            this._lab1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_lab1", 271, 53, 150, 20);
            $container.addChild(this._lab1);
            this._lab2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_lab2", 337, 87, 80, 20);
            $container.addChild(this._lab2);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab2.skinName, "战力暴涨", 16, TextAlign.RIGHT, ColorType.Brown7a2f21);
            this._lab3 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_lab3", 418, 85, 90, 25);
            $container.addChild(this._lab3);
            this._cost1 = this.creatSUI($customizeRenderAry[0], this.parentTarget.baseAtlas, "l_s_cost0", 361, 2, 160, 30);
            $container.addChild(this._cost1);
            this._cost2 = this.creatSUI($customizeRenderAry[0], this.parentTarget.baseAtlas, "l_s_cost1", 522, 2, 160, 30);
            $container.addChild(this._cost2);
            this._btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_btn", 520, 42, 157, 60);
            $container.addChild(this._btn);
            this._btn.addEventListener(InteractiveEvent.Up, this.onclick, this);
            for (var i = 0; i < 3; i++) {
                var ui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_icon" + i, 28 + i * 76, 45, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }
        };
        KaiFuRewardListItemRender.prototype.onclick = function ($e) {
            if (!this.itdata.data.hasBuy) {
                var tabObj = this.itdata.data.tabObj;
                if (!hasEnoughRes(tabObj.cost[0])) {
                    //msgtip.MsgTipManager.outStr("元宝不足", 99);
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = tabObj.cost[0][0];
                    ModuleEventManager.dispatchEvent($aaa);
                    return;
                }
                this.parentTarget.buyGift(this.itdata.id);
            }
            else {
                msgtip.MsgTipManager.outStr("已购买", 99);
            }
        };
        KaiFuRewardListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
        };
        KaiFuRewardListItemRender.prototype.refreshDraw = function () {
            this.drawBuy();
        };
        KaiFuRewardListItemRender.prototype.applyRender = function () {
            //var vo: KaiFuDayTargetItemVo = this.itdata.data;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.ITEMBIGBG);
            UiDraw.drawUseImg(this._icon, this.parentTarget.baseAtlas, "u_l_t" + this.itdata.id);
            var tabObj = this.itdata.data.tabObj;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab1.skinName, tabObj.desc, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab3.skinName, tabObj.force, 20, TextAlign.LEFT, ColorType.Green2ca937);
            for (var i = 0; i < this._iconAry.length; i++) {
                if (tabObj.item[i]) {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], tabObj.item[i][0], tabObj.item[i][1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 0);
                }
            }
            this.drawKillPrice(this._cost1, "原价：", tabObj.fake_cost, true);
            this.drawKillPrice(this._cost2, "现价：", tabObj.cost, false);
            this.drawBuy();
        };
        KaiFuRewardListItemRender.prototype.drawBuy = function () {
            if (this.itdata.data.hasBuy) {
                UiDraw.drawUseImg(this._btn, this.parentTarget.baseAtlas, "u_l_btn2");
            }
            else {
                UiDraw.drawUseImg(this._btn, this.parentTarget.baseAtlas, "u_l_btn1");
            }
        };
        KaiFuRewardListItemRender.prototype.drawKillPrice = function ($ui, str, $cost, $kill) {
            var $rec = this.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            //UiDraw.drawUseImg(this._btn, KaiFuRewardListItemRender.baseAtlas, "u_l_btn1");
            var useRec = this.parentTarget.baseAtlas.getRec("u_l_cost");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, useRec.pixelX, useRec.pixelY, useRec.pixelWitdh, useRec.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
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
            this.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        return KaiFuRewardListItemRender;
    }(SListItem));
    kaifu.KaiFuRewardListItemRender = KaiFuRewardListItemRender;
})(kaifu || (kaifu = {}));
//# sourceMappingURL=KaifuRewardPanel.js.map