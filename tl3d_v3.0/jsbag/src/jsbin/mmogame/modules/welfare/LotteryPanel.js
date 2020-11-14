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
var welfare;
(function (welfare) {
    var LotteryPanel = /** @class */ (function (_super) {
        __extends(LotteryPanel, _super);
        function LotteryPanel() {
            var _this = _super.call(this) || this;
            //
            _this.lock = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._rotationRender = new RoationUIRenderComponent();
            _this.addRender(_this._rotationRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._baseUiAtlas = new UIAtlas();
            return _this;
        }
        LotteryPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            _super.prototype.dispose.call(this);
        };
        LotteryPanel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                this.hide();
            }
        };
        LotteryPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/welfare/lottery.xml", "ui/uidata/welfare/lottery.png", function () { _this.loadConfigCom(); }, "ui/uidata/welfare/lotterynum.png");
        };
        LotteryPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this._rotationRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            this.applyLoadComplete();
        };
        LotteryPanel.prototype.initUI = function () {
            this.addUIList(["t_bg", "t_txtbg", "t_labbg"], this.winmidRender);
            this.addUIList(["t_txtitem0", "t_txtitem1", "t_txtitem2", "t_title"], this._bgRender);
            this._btn1 = this.addChild(this._bgRender.getComponent("t_btn"));
            this._btn1.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this._infoAry = new Array;
            var ui;
            for (var i = 0; i < 6; i++) {
                ui = this.addChild(this._bgRender.getComponent("t_txt" + i));
                this._infoAry.push(ui);
            }
            this._lab1 = this.addChild(this._bgRender.getComponent("t_add_num"));
            this._lab2 = this.addChild(this._bgRender.getComponent("t_num"));
            this._iAry = new Array;
            this._lAry = new Array;
            for (var i = 0; i < 8; i++) {
                ui = this.addChild(this._bgRender.getComponent("t_i" + i));
                this._iAry.push(ui);
                ui = this.addChild(this._bgRender.getComponent("t_l" + i));
                this._lAry.push(ui);
            }
            this._jianUI = this.addChild(this._rotationRender.getComponent("t_jian"));
            this._cjBtn = this.addChild(this._baseRender.getComponent("t_cj_bg"));
            this._cjBtn.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this._costUI = this.addChild(this._topRender.getComponent("t_cost"));
            // ui = this.addChild(this._baseRender.getComponent("t_lab2"));
            // LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "王者盟主特权", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            // ui = this.addChild(this._baseRender.getComponent("t_lab3"));
            // LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "王者家族成员每日俸禄", 16, TextAlign.LEFT, ColorType.Whitefff4d6);
            this.refreshInfo();
            //this.drawBase();
            this._jianUI.paix.y = 0.9;
        };
        LotteryPanel.prototype.run = function ($id) {
            var _this = this;
            //console.log($id);
            var num = this.info.muls[$id - 1];
            //console.log(num);
            var idx = this.ary.indexOf(num);
            //console.log(this.ary);
            //console.log(idx);
            this._jianUI.rotation = 0;
            var s = idx * 45 + 360 * 5;
            TweenLite.to(this._jianUI, 3, { rotation: s, onComplete: function () { _this.runFinish(); } });
        };
        LotteryPanel.prototype.runFinish = function () {
            var _this = this;
            ModulePageManager.refreshResTitle();
            TimeUtil.addTimeOut(2000, function () {
                _this.lock = false;
                _this.refreshInfo();
            });
        };
        LotteryPanel.prototype.btnClick = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            if ($e.target == this._btn1) {
                ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                //ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.SHOW_LEAGUE_EVENT));
            }
            else if ($e.target == this._cjBtn) {
                //this.run();
                if ((this.dataAry[1] - this.dataAry[0]) <= 0) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "抽奖次数不足", 99);
                    return;
                }
                if (!hasEnoughRes(this.info.cost[0])) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "元宝不足", 99);
                    return;
                }
                if (this.lock) {
                    return;
                }
                ModulePageManager.lockResTitle();
                NetManager.getInstance().protocolos.lottery_recharge();
                this.lock = true;
            }
        };
        LotteryPanel.prototype.drawBase = function () {
            this.dataAry = GuidData.player.getLotteryData();
            var sum = GuidData.player.getChongZhiSum();
            var maxID = TableData.getInstance().getTabMaxID(TableData.tb_recharge_wheel);
            for (var i = 1; i <= maxID; i++) {
                var obj = TableData.getInstance().getData(TableData.tb_recharge_wheel, i);
                if (sum < obj.recharges) {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._lab1.skinName, ColorType.White9A683F + "再充值" + ColorType.Green2ca937 + (obj.recharges - sum) + ColorType.White9A683F + "元宝抽奖次数" + ColorType.Green2ca937 + "+1", 16, TextAlign.CENTER);
                    break;
                }
            }
            if (i > maxID) {
                UiDraw.clearUI(this._lab1);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._lab2.skinName, ColorType.Brown7a2f21 + "剩余抽奖次数：" + ColorType.Green2ca937 + (this.dataAry[1] - this.dataAry[0]) + ColorType.Brown7a2f21 + "次", 14, TextAlign.CENTER, ColorType.Whitefff4d6);
            this.drawYb(this._costUI, 1, this.info.cost[0][1]);
        };
        LotteryPanel.prototype.drawpan = function () {
            this.ary = [];
            for (var i = 0; i < this.info.muls.length; i++) {
                this.ary.push(this.info.muls[i]);
            }
            this.ary.sort(function (a, b) { return Math.random() > 0.5 ? 1 : -1; });
            for (var i = 0; i < this._iAry.length; i++) {
                var num = this.info;
                this.drawBei(this._iAry[i], (this.ary[i] / 100) + "倍");
                this.drawYb(this._lAry[i], 2, float2int(this.ary[i] * this.info.cost[0][1] / 100));
            }
        };
        LotteryPanel.prototype.drawBei = function (ui, str) {
            var rec = this._baseUiAtlas.getRec(ui.skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var flag = 0;
            for (var i = 0; i < str.length; i++) {
                var key = this.getUk(str[i]);
                var src = this._baseUiAtlas.getRec(key);
                flag += src.pixelWitdh;
            }
            flag = (rec.pixelWitdh - flag) / 2;
            for (var i = 0; i < str.length; i++) {
                var key = this.getUk(str[i]);
                var src = this._baseUiAtlas.getRec(key);
                ctx.drawImage(this._baseUiAtlas.useImg, src.pixelX, src.pixelY, src.pixelWitdh, src.pixelHeight, flag, 0, src.pixelWitdh, src.pixelHeight);
                flag += src.pixelWitdh;
            }
            this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        };
        LotteryPanel.prototype.drawYb = function ($ui, type, num) {
            var $rec = this._baseUiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var xoff = 6;
            UiDraw.drawCost(ctx, xoff, 0, getresIdByreward(type));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, String(num), 18, xoff, 10, TextAlign.LEFT, ColorType.color73301c);
            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        LotteryPanel.prototype.getUk = function (str) {
            if (str == "倍") {
                return "ub";
            }
            else if (str == ".") {
                return "ud";
            }
            else {
                return "u" + str;
            }
        };
        LotteryPanel.prototype.refreshInfo = function () {
            this.dataAry = GuidData.player.getLotteryData();
            var idx = this.dataAry[0] + 1;
            var maxID = TableData.getInstance().getTabMaxID(TableData.tb_recharge_wheel);
            if (idx > maxID) {
                idx = maxID;
            }
            this.info = TableData.getInstance().getData(TableData.tb_recharge_wheel, idx);
            this.drawBase();
            //this.drawInfo();
            this.drawpan();
        };
        LotteryPanel.prototype.refeshLog = function (ary) {
            for (var i = 0; i < this._infoAry.length; i++) {
                var data = ary[i];
                if (data) {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._infoAry[i].skinName, ColorType.White9A683F + "玩家" + ColorType.Green2ca937 + data[0] + " " + ColorType.White9A683F + "投资" + data[1] + "元宝获得" + data[2] + "倍奖励," + ColorType.colorff7200 + data[3] + "绑定元宝", 14, TextAlign.LEFT);
                }
                else {
                    UiDraw.clearUI(this._infoAry[i]);
                }
            }
        };
        LotteryPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            ModulePageManager.lockResTitle();
            SceneManager.getInstance().render = false;
            if (this._baseRender.uiAtlas) {
                this.refreshInfo();
            }
            this.lock = false;
            var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        };
        LotteryPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            SceneManager.getInstance().render = true;
            ModulePageManager.unlockResTitle();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        return LotteryPanel;
    }(WindowUi));
    welfare.LotteryPanel = LotteryPanel;
})(welfare || (welfare = {}));
//# sourceMappingURL=LotteryPanel.js.map