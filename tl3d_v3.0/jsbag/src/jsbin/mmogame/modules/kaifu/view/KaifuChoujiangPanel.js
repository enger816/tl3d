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
    var KaifuChoujiangPanel = /** @class */ (function (_super) {
        __extends(KaifuChoujiangPanel, _super);
        function KaifuChoujiangPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        KaifuChoujiangPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this.initUI();
        };
        KaifuChoujiangPanel.prototype.initUI = function () {
            var _this = this;
            this._bg = this._winMidRender.getComponent("t_cj_bg");
            this.addChild(this._bgRender.getComponent("t_cj_bg1"));
            var ui;
            ui = this.addChild(this._bgRender.getComponent("t_cj_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.btn1Click, this);
            ui = this.addChild(this._bgRender.getComponent("t_cj_btn1"));
            ui.addEventListener(InteractiveEvent.Up, this.btn2Click, this);
            ui = this.addChild(this._baseRender.getComponent("t_cj_btn_lab1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "买一次", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_cj_btn_lab2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "买10次", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this._contentTxt = this.addChild(this._baseRender.getComponent("t_cj_content"));
            this._timeUI = this.addChild(this._baseRender.getComponent("t_cj_time"));
            ui = this.addChild(this._baseRender.getComponent("t_cj_info"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "买" + ColorType.Green56da35 + "10" + ColorType.Brown7a2f21 + "次必得" + ColorType.colorb759ff + "紫色" + ColorType.Brown7a2f21 + "以上装备", 14);
            this._cost1 = this.addChild(this._baseRender.getComponent("t_cj_cost_lab1"));
            this._cost2 = this.addChild(this._baseRender.getComponent("t_cj_cost_lab2"));
            this._slist = new KaiFuChoujiangList();
            this._slist.init(this._baseUiAtlas, this._activeID);
            this.initEndTime();
            this._drawTimeFun = function () {
                _this.drawTime();
            };
            this.draw();
        };
        KaifuChoujiangPanel.prototype.btn1Click = function ($e) {
            if (this._canbuy1) {
                NetManager.getInstance().protocolos.draw_lottery(this._activeID, 1);
            }
            else {
            }
        };
        KaifuChoujiangPanel.prototype.btn2Click = function ($e) {
            if (this._canbuy2) {
                NetManager.getInstance().protocolos.draw_lottery(this._activeID, 2);
            }
            else {
            }
        };
        KaifuChoujiangPanel.prototype.initEndTime = function () {
            var tabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            var startTime;
            if (tabObj.startTime == -1) {
                startTime = TimeUtil.getZeroTime(GameInstance.serverOpenTime);
            }
            else {
                startTime = tabObj.startTime;
            }
            this._activeEndTime = startTime + (tabObj.delayDays + tabObj.lastDays) * 24 * 60 * 60;
            var pm = tabObj.params;
            tabObj = TableData.getInstance().getData(TableData.tb_activity_lottery_base, pm);
            this._canbuy1 = UiDraw.drawRewardIconAndtxt(this._cost1, tabObj.costs[0], true, TextAlign.CENTER, 5);
            this._canbuy2 = UiDraw.drawRewardIconAndtxt(this._cost2, tabObj.costs[1], true, TextAlign.CENTER, 5);
        };
        KaifuChoujiangPanel.prototype.draw = function () {
            //this.drawTime();
            this.drawReward();
        };
        KaifuChoujiangPanel.prototype.drawTime = function () {
            var lastTime = this._activeEndTime - GameInstance.getServerNow();
            //var day: number = float2int(lastTime / 24 / 60 / 60);
            var str = TimeUtil.getDiffTime1(lastTime);
            str = ColorType.Brown7a2f21 + "宝库将在" + ColorType.colorcd2000 + str + ColorType.Brown7a2f21 + "后关闭";
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeUI.skinName, str, 14);
        };
        KaifuChoujiangPanel.prototype.drawReward = function () {
            var tabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            var ary = GuidData.globelValue.getLotteryRecord(tabObj.offset);
            //console.log(ary.length);
            var resultStr = "";
            for (var i = 0; i < ary.length; i++) {
                var strAry = ary[i].split("#");
                var item = tb.TB_item_template.get_TB_item_template(Number(strAry[1]));
                resultStr += ColorType.Brown7a2f21 + getBaseName(strAry[0]) + ColorType.colorb96d49 + " 获得 "
                    + getColorQua(item.quality) + item.name + "*" + strAry[2] + "\n";
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._contentTxt.skinName, resultStr, 16, TextAlign.LEFT);
        };
        KaifuChoujiangPanel.prototype.show = function () {
            //UIManager.getInstance().addUIContainer(this);
            _super.prototype.show.call(this);
            this.addChild(this._bg);
            this.draw();
            this._slist.show();
            TimeUtil.addTimeTick(1000, this._drawTimeFun);
        };
        KaifuChoujiangPanel.prototype.hide = function () {
            //UIManager.getInstance().removeUIContainer(this);
            _super.prototype.hide.call(this);
            this.removeChild(this._bg);
            this._slist.hide();
            TimeUtil.removeTimeTick(this._drawTimeFun);
        };
        return KaifuChoujiangPanel;
    }(kaifu.KaifuBaseContainer));
    kaifu.KaifuChoujiangPanel = KaifuChoujiangPanel;
    var KaiFuChoujiangList = /** @class */ (function (_super) {
        __extends(KaiFuChoujiangList, _super);
        function KaiFuChoujiangList() {
            return _super.call(this) || this;
        }
        KaiFuChoujiangList.prototype.init = function ($atlas, $activeID) {
            this._activeID = $activeID;
            //KaifuChoujiangListItemRender.baseAtlas = $atlas;
            this.baseAtlas = $atlas;
            this.initData();
        };
        KaiFuChoujiangList.prototype.initData = function () {
            var ary = this.getDataAry();
            var w = 450;
            var h = 430;
            this.setData(ary, KaifuChoujiangListItemRender, w, h, 150, 150, 3, 512, 256, 3, 3);
            this.center = -35;
            this.middle = 25;
            this.setShowLevel(4);
        };
        KaiFuChoujiangList.prototype.getDataAry = function () {
            var ary = new Array();
            var tabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            var pm = tabObj.params;
            tabObj = TableData.getInstance().getData(TableData.tb_activity_lottery_base, pm);
            var resultAry = new Array;
            var randomAry;
            randomAry = this.getRandomAry(tabObj.low, 3);
            for (var i = 0; i < randomAry.length; i++) {
                var itemObj = TableData.getInstance().getData(TableData.tb_activity_lottery_low, randomAry[i]);
                resultAry.push(itemObj.item);
            }
            randomAry = this.getRandomAry(tabObj.middle, 3);
            for (var i = 0; i < randomAry.length; i++) {
                var itemObj = TableData.getInstance().getData(TableData.tb_activity_lottery_middle, randomAry[i]);
                resultAry.push(itemObj.item);
            }
            randomAry = this.getRandomAry(tabObj.high, 3);
            for (var i = 0; i < randomAry.length; i++) {
                var itemObj = TableData.getInstance().getData(TableData.tb_activity_lottery_high, randomAry[i]);
                resultAry.push(itemObj.item);
            }
            for (var i = 0; i < resultAry.length; i++) {
                var data = new SListItemData();
                data.data = resultAry[i];
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        KaiFuChoujiangList.prototype.getRandomAry = function ($src, $num) {
            var desAry = [].concat($src);
            desAry.sort(function (a, b) { return Math.random() > .5 ? -1 : 1; });
            desAry.length = $num;
            return desAry;
        };
        KaiFuChoujiangList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
        };
        KaiFuChoujiangList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return KaiFuChoujiangList;
    }(SList));
    kaifu.KaiFuChoujiangList = KaiFuChoujiangList;
    var KaifuChoujiangListItemRender = /** @class */ (function (_super) {
        __extends(KaifuChoujiangListItemRender, _super);
        function KaifuChoujiangListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KaifuChoujiangListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "k_s_bg", 0, 0, 133, 133, 10, 10);
            $container.addChild(this._ibg);
            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "k_s_icon", 30, 18, 68, 68);
            $container.addChild(this._icon);
            this._nameui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "k_s_lab", 17, 98, 100, 20);
            $container.addChild(this._nameui);
        };
        KaifuChoujiangListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
        };
        KaifuChoujiangListItemRender.prototype.applyRender = function () {
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.ITEMBIGBG);
            var item = tb.TB_item_template.get_TB_item_template(this.itdata.data[0][0]);
            IconManager.getInstance().drawItemIcon60(this._icon, this.itdata.data[0][0], this.itdata.data[0][1]);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._nameui.skinName, item.name, 16, TextAlign.CENTER, getColorQua(item.quality));
        };
        return KaifuChoujiangListItemRender;
    }(SListItem));
    kaifu.KaifuChoujiangListItemRender = KaifuChoujiangListItemRender;
})(kaifu || (kaifu = {}));
//# sourceMappingURL=KaifuChoujiangPanel.js.map