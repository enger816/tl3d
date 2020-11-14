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
    var KaifuDayTargetPanel = /** @class */ (function (_super) {
        __extends(KaifuDayTargetPanel, _super);
        function KaifuDayTargetPanel() {
            var _this = _super.call(this) || this;
            _this.canGet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        KaifuDayTargetPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
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
        KaifuDayTargetPanel.prototype.initUI = function () {
            var _this = this;
            this._baseTabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            this._activeTabObj = TableData.getInstance().getData(TableData.tb_activity_rank_base, this._baseTabObj.params[0]);
            this.addChild(this._banner.getComponent("t_banner"));
            this._banner.setImgUrl(getKaifuIconUrl("b0"));
            this._bg = this._winMidRender.getComponent("t_qt_bg2");
            this.addChild(this._bgRender.getComponent("t_title_bg"));
            var ui;
            ui = this.addChild(this._bgRender.getComponent("t_base_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.btn1Click, this);
            this._btnLab = this.addChild(this._baseRender.getComponent("t_qt_lab5"));
            ui = this.addChild(this._baseRender.getComponent("t_qt_lab4"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "我的进度", 14, TextAlign.CENTER, ColorType.colorb96d49);
            this._timeUI = this.addChild(this._baseRender.getComponent("t_qt_time"));
            this._infoDescUI = this.addChild(this._baseRender.getComponent("t_qt_info"));
            this.drawDesc();
            this._targetLab1 = this.addChild(this._baseRender.getComponent("t_qt_lab1"));
            this._targetVal1 = this.addChild(this._baseRender.getComponent("t_qt_lab2"));
            this._myLab1 = this.addChild(this._baseRender.getComponent("t_qt_lab3"));
            this._rewardIcon0 = this.addChild(this._baseRender.getComponent("t_qt_icon1"));
            this._rewardIcon1 = this.addChild(this._baseRender.getComponent("t_qt_icon2"));
            this._slist = new KaiFuDayTargetList();
            this._slist.init(this._baseUiAtlas, this._activeID);
            this.initEndTime();
            this._drawTimeFun = function () {
                _this.drawTime();
            };
            // this.draw();
        };
        KaifuDayTargetPanel.prototype.drawDesc = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._infoDescUI.skinName, ColorType.Brown7a2f21 + "活动说明：" + this._activeTabObj.desc, 16, TextAlign.LEFT);
        };
        KaifuDayTargetPanel.prototype.setActiveID = function ($val) {
            if (this._activeID == $val) {
                return;
            }
            this._activeID = $val;
            if (!this._baseUiAtlas) {
                return;
            }
            this.drawDesc();
            this.refresh();
            this.initEndTime();
        };
        KaifuDayTargetPanel.prototype.btn1Click = function ($e) {
            if (this.canGet) {
                NetManager.getInstance().protocolos.activity_opt_get_rank_process_reward(this._activeID, this.processRewardID);
            }
        };
        KaifuDayTargetPanel.prototype.btn2Click = function ($e) {
            NetManager.getInstance().protocolos.draw_lottery(this._activeID, 2);
        };
        KaifuDayTargetPanel.prototype.initEndTime = function () {
            var startTime;
            if (this._baseTabObj.startTime == -1) {
                startTime = TimeUtil.getZeroTime(GameInstance.serverOpenTime);
            }
            else {
                startTime = this._baseTabObj.startTime;
            }
            this._activeEndTime = startTime + (this._baseTabObj.delayDays + this._baseTabObj.lastDays) * 24 * 60 * 60;
        };
        KaifuDayTargetPanel.prototype.draw = function () {
            //this.drawTime();
            this.refresh();
        };
        KaifuDayTargetPanel.prototype.drawTime = function () {
            var lastTime = this._activeEndTime - GameInstance.getServerNow();
            var str = TimeUtil.getDiffTime1(lastTime);
            str = ColorType.Brown7a2f21 + "剩余时间：" + ColorType.colorcd2000 + str;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeUI.skinName, str, 16, TextAlign.LEFT);
        };
        KaifuDayTargetPanel.prototype.refresh = function () {
            var dataAry = GuidData.grow.getActivePlayerData(this._baseTabObj.category);
            var maxLev = false;
            if (dataAry[2] > 5) {
                dataAry[2] = 5;
                maxLev = true;
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._targetLab1.skinName, "达到目标(" + (dataAry[2] + 1) + "/6)", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var targetNum = this._activeTabObj.process[dataAry[2]];
            var dataStr;
            dataStr = this.getDataStr(this._activeTabObj.type, targetNum);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._targetVal1.skinName, ColorType.colorb96d49 + this._activeTabObj.title + ":" + ColorType.Brown7a2f21 + dataStr, 16, TextAlign.CENTER);
            var rewardObj = TableData.getInstance().getData(TableData.tb_activity_rank_process_reward, this._activeTabObj.process_reward[dataAry[2]]);
            if (rewardObj.item[0]) {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon0, rewardObj.item[0][0], rewardObj.item[0][1]);
            }
            else {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon0, 0, 0);
            }
            if (rewardObj.item[1]) {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon1, rewardObj.item[1][0], rewardObj.item[1][1]);
            }
            else {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon1, 0, 0);
            }
            dataStr = this.getDataStr(this._activeTabObj.type, dataAry[1]);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myLab1.skinName, ColorType.colorb96d49 + this._activeTabObj.title + ":" + ColorType.Brown7a2f21 + dataStr, 16, TextAlign.CENTER);
            this.processRewardID = dataAry[2] + 1;
            if (dataAry[1] >= targetNum) {
                if (maxLev) {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "已领取", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                    this.canGet = false;
                }
                else {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "领取奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                    this.canGet = true;
                }
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "未达到", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.canGet = false;
            }
        };
        KaifuDayTargetPanel.prototype.setListData = function (saosrl) {
            ////console.log(saosrl);
            if (saosrl.act_id != this._activeID) {
                return;
            }
            var ary = new Array();
            for (var i = 0; i < 3; i++) {
                var data = new SListItemData();
                if (saosrl.list[i]) {
                    var vo = new KaiFuDayTargetItemVo();
                    vo.name = saosrl.list[i].name;
                    vo.value = saosrl.list[i].value;
                    vo.dataStr = [this._activeTabObj.title, this.getDataStr(this._activeTabObj.type, vo.value)];
                    vo.reward = TableData.getInstance().getData(TableData.tb_activity_rank_rank_reward, i + 1);
                    vo.rank = i + 1;
                    data.data = vo;
                    data.id = i;
                    ary.push(data);
                }
            }
            this._slist.refreshData(ary);
        };
        KaifuDayTargetPanel.prototype.getDataStr = function ($type, $data) {
            if ($type == 0) {
                return String($data);
            }
            else if ($type == 1) {
                return String($data);
            }
            else if ($type == 2) {
                return String($data);
            }
            else if ($type == 3) {
                return String($data);
            }
            else if ($type == 4) {
                var jie = float2int($data / 1000) + 10;
                var start = $data % 1000;
                return (jie + "阶" + start + "星");
            }
            else if ($type == 5) {
                var jie = float2int($data / 1000);
                var start = $data % 1000;
                return (jie + "阶" + start + "星");
            }
            else if ($type == 6) {
                return String($data);
            }
            else if ($type == 7) {
                var jie = float2int($data / 1000);
                var start = $data % 1000;
                return (jie + "阶" + start + "星");
            }
            else if ($type == 8) {
                return String($data);
            }
            else if ($type == 9) {
                return Snum($data);
            }
            return "";
        };
        KaifuDayTargetPanel.prototype.show = function () {
            //UIManager.getInstance().addUIContainer(this);
            //super.show($activeID);
            _super.prototype.show.call(this);
            this.addChild(this._bg);
            this.draw();
            this._slist.show();
            TimeUtil.addTimeTick(1000, this._drawTimeFun);
            NetManager.getInstance().protocolos.activity_opt_get_rank_list(this._activeID);
        };
        KaifuDayTargetPanel.prototype.hide = function () {
            //UIManager.getInstance().removeUIContainer(this);
            _super.prototype.hide.call(this);
            this.removeChild(this._bg);
            this._slist.hide();
            TimeUtil.removeTimeTick(this._drawTimeFun);
        };
        return KaifuDayTargetPanel;
    }(kaifu.KaifuBaseContainer));
    kaifu.KaifuDayTargetPanel = KaifuDayTargetPanel;
    var KaiFuDayTargetItemVo = /** @class */ (function () {
        function KaiFuDayTargetItemVo() {
        }
        return KaiFuDayTargetItemVo;
    }());
    kaifu.KaiFuDayTargetItemVo = KaiFuDayTargetItemVo;
    var KaiFuDayTargetList = /** @class */ (function (_super) {
        __extends(KaiFuDayTargetList, _super);
        function KaiFuDayTargetList() {
            return _super.call(this) || this;
        }
        KaiFuDayTargetList.prototype.init = function ($atlas, $activeID) {
            this._activeID = $activeID;
            this.baseAtlas = $atlas;
            this.initData();
        };
        KaiFuDayTargetList.prototype.initData = function () {
            var ary = new Array;
            var w = 458;
            var h = 322;
            this.setData(ary, KaiFuDayTargetListItemRender, w, h, 453, 105, 3, 256, 512, 1, 3);
            this.center = -35;
            this.middle = 95;
            this.setShowLevel(4);
        };
        // public getDataAry(): Array<SListItemData> {
        //     var ary: Array<SListItemData> = new Array<SListItemData>();
        //     for (var i: number = 0; i < 3; i++) {
        //         var data: SListItemData = new SListItemData();
        //         data.data = null;
        //         data.id = i;
        //         ary.push(data);
        //     }
        //     return ary;
        // }
        KaiFuDayTargetList.prototype.getRandomAry = function ($src, $num) {
            var desAry = [].concat($src);
            desAry.sort(function (a, b) { return Math.random() > .5 ? -1 : 1; });
            desAry.length = $num;
            return desAry;
        };
        KaiFuDayTargetList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
        };
        KaiFuDayTargetList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return KaiFuDayTargetList;
    }(SList));
    kaifu.KaiFuDayTargetList = KaiFuDayTargetList;
    var KaiFuDayTargetListItemRender = /** @class */ (function (_super) {
        __extends(KaiFuDayTargetListItemRender, _super);
        function KaiFuDayTargetListItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._iconAry = new Array;
            return _this;
        }
        KaiFuDayTargetListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "q_s_bg", 0, 0, 450, 105, 10, 10);
            $container.addChild(this._ibg);
            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_rank", 8, 0, 76, 94);
            $container.addChild(this._icon);
            this._nameui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_lab1", 115, 23, 140, 20);
            $container.addChild(this._nameui);
            this._infoui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_lab2", 115, 54, 180, 20);
            $container.addChild(this._infoui);
            for (var i = 0; i < 2; i++) {
                var ui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_icon" + i, 290 + i * 76, 18, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }
        };
        KaiFuDayTargetListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
        };
        KaiFuDayTargetListItemRender.prototype.applyRender = function () {
            var vo = this.itdata.data;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.ITEMBIGBG);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._nameui.skinName, getBaseName(vo.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._infoui.skinName, ColorType.colorb96d49 + vo.dataStr[0] + ":" + ColorType.Brown7a2f21 + vo.dataStr[1], 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.uiAtlas.upDataPicToTexture(getKaifuIconUrl("d" + vo.rank), this._icon.skinName);
            for (var i = 0; i < this._iconAry.length; i++) {
                if (vo.reward.item[i]) {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], vo.reward.item[i][0], vo.reward.item[i][1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 0);
                }
            }
        };
        return KaiFuDayTargetListItemRender;
    }(SListItem));
    kaifu.KaiFuDayTargetListItemRender = KaiFuDayTargetListItemRender;
})(kaifu || (kaifu = {}));
//# sourceMappingURL=KaifuDayTargetPanel.js.map