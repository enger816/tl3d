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
var kuafu;
(function (kuafu) {
    var ArenaQualifying = /** @class */ (function (_super) {
        __extends(ArenaQualifying, _super);
        function ArenaQualifying() {
            var _this = _super.call(this) || this;
            _this._lastQdt = -1;
            _this._lastQs = -1;
            _this._extraFlag = [-1, -1, -1];
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        ArenaQualifying.prototype.dispose = function () {
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
        };
        ArenaQualifying.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this._middleRender = new UIRenderComponent();
            this._middleRender.uiAtlas = $uiatlas;
            this.addRender(this._middleRender);
            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);
            this.initUI();
        };
        ArenaQualifying.prototype.initUI = function () {
            this._shopBtn = this.addChild(this._baseRender.getComponent("t_icon1"));
            this._shopBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._rankBtn = this.addChild(this._baseRender.getComponent("t_icon4"));
            this._rankBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._rewardBtn = this.addChild(this._baseRender.getComponent("t_icon2"));
            this._rewardBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._logBtn = this.addChild(this._baseRender.getComponent("t_icon3"));
            this._logBtn.addEventListener(InteractiveEvent.Up, this.itemIconClick, this);
            this._mainBg = this._winMidRender.getComponent("t_main_bg");
            this.addUIList(["t_bg0", "t_bg2", "t_bg3", "t_bg4", "t_bg5", "t_bg6", "t_bg7"], this._bgRender);
            var ui = this._bgRender.getComponent("t_bg01");
            ui.isU = true;
            this.addChild(ui);
            ui = this._bgRender.getComponent("t_bg21");
            ui.isU = true;
            this.addChild(ui);
            this._mainImg = this.addChild(this._baseRender.getComponent("t_main_icon"));
            this.addUIList(["t_r_l", "t_r_c", "t_r_c1", "t_r_r"], this._baseRender);
            ui = this.addChild(this._baseRender.getComponent("t_time_lab"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "活动时间", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var timeAry = this.getTimeStr();
            ui = this.addChild(this._baseRender.getComponent("t_time_val1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, timeAry[0], 16, TextAlign.CENTER, ColorType.color9a683f);
            ui = this.addChild(this._baseRender.getComponent("t_time_val2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, timeAry[1], 16, TextAlign.CENTER, ColorType.color9a683f);
            this._rankLab = this.addChild(this._baseRender.getComponent("t_rank"));
            this._timeNumVal = this.addChild(this._baseRender.getComponent("t_num_val"));
            var btn = this.addChild(this._baseRender.getComponent("t_btn"));
            btn.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this.addChild(this._topRender.getComponent("t_btn_name1"));
            this.addChild(this._middleRender.getComponent("t_bg1"));
            ui = this._middleRender.getComponent("t_bg11");
            ui.isU = true;
            this.addChild(ui);
            this._rewardAry = new Array;
            for (var i = 0; i < 3; i++) {
                var obj = TableData.getInstance().getData(TableData.tb_single_pvp_extra, i + 1);
                ui = this._middleRender.getComponent("t_reward_icon" + i);
                ui.addEventListener(InteractiveEvent.Up, this.getReward, this);
                this.addChild(ui);
                this._rewardAry.push(ui);
                //IconManager.getInstance().drawItemIcon60(ui, obj.show, 1, true);
                ui = this._middleRender.getComponent("t_re_lab" + i);
                this.addChild(ui);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, (obj.wins) + "胜奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            this._rewardLineAry = new Array;
            for (var i = 0; i < 2; i++) {
                var frameui = this._middleRender.getComponent("t_reward_f" + i);
                this.addChild(frameui);
                frameui.goToAndStop(1);
                this._rewardLineAry.push(frameui);
            }
            var addBtn = this.addChild(this._middleRender.getComponent("t_add_btn"));
            addBtn.addEventListener(InteractiveEvent.Up, this.showBuyMeshBoss, this);
            this._rewardFlagAry = new Array;
            for (var i = 0; i < 3; i++) {
                ui = this._topRender.getComponent("t_reward_get" + i);
                this._rewardFlagAry.push(ui);
            }
            ui = this.addChild(this._topRender.getComponent("t_pingfen_lab"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "当前积分", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            this.a_vip_add = this.addChild(this._baseRender.getComponent("a_vip_add"));
            this._jifenLab = this.addChild(this._topRender.getComponent("t_pingfen_val"));
            this.draw();
            this.buildFram();
        };
        ArenaQualifying.prototype.itemIconClick = function ($e) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize($e.target);
            if ($e.target == this._logBtn) {
                if (!this._logPanel) {
                    this._logPanel = new ArenaQualifyingLog();
                }
                this._logPanel.load(function () {
                    _this._logPanel.show(_this._baseUiAtlas);
                });
            }
            else if ($e.target == this._rewardBtn) {
                if (!this._rewardPanel) {
                    this._rewardPanel = new ArenaQualifyingReward();
                }
                this._rewardPanel.load(function () {
                    _this._rewardPanel.show(_this._baseUiAtlas);
                });
            }
            else if ($e.target == this._shopBtn) {
                ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_SCORE]);
            }
            else if ($e.target == this._rankBtn) {
                ModulePageManager.openPanel(SharedDef.MODULE_RANK, 5);
            }
        };
        ArenaQualifying.prototype.btnClick = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            var $vo = new s2c_kuafu_match_wait();
            $vo.type = SharedDef.MATCH_TYPE_LOCAL_SINGLE_PVP;
            var $evtt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_WAITJOIN_PANEL);
            $evtt.data = $vo;
            ModuleEventManager.dispatchEvent($evtt);
            NetManager.getInstance().protocolos.match_single_pvp();
        };
        ArenaQualifying.prototype.showBuyMeshBoss = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            var $a = GuidData.instanceData.getQualifyDailyTimes();
            var $b = TableData.getInstance().getData(TableData.tb_single_pvp_base, 1)["dailyTimes"];
            if ($a >= $b) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前挑战次数已满，请消耗一些再来购买", 99);
                return;
            }
            var $evt = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL);
            $evt.resoureItem = new Array;
            var curNum = GuidData.instanceData.getQualifyBuyTimes();
            var tbSize = TableData.getInstance().getTabSize(TableData.tb_single_pvp_times);
            for (var i = curNum; i < tbSize && i < (curNum + ($b - $a)); i++) {
                var obj = TableData.getInstance().getData(TableData.tb_single_pvp_times, i + 1);
                $evt.resoureItem.push(obj.cost[0]);
            }
            // $evt.Type = popbuy.PopBuyType.ARENA_QUALIFY;
            $evt.Info1 = "排位赛剩余可购买";
            $evt.cutNum = $evt.resoureItem.length;
            if ($evt.cutNum > 0) {
                $evt.SubmitFun = function (value) {
                    NetManager.getInstance().protocolos.buy_match_single_pvp_times(value);
                };
                ModuleEventManager.dispatchEvent($evt);
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "购买次数满了", 99);
            }
        };
        ArenaQualifying.prototype.getReward = function ($e) {
            var idx = this._rewardAry.indexOf($e.target);
            if (this.pickFlagAry[idx]) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "该奖励已领取！", 99);
                return;
            }
            if (!this._extraFlag[idx]) {
                return;
            }
            idx++;
            NetManager.getInstance().protocolos.pick_match_single_pvp_extra_reward(idx);
        };
        ArenaQualifying.prototype.buildFram = function () {
            var _this = this;
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, function ($ary) {
                    _this.effAry = $ary;
                    for (var i = 0; i < _this.effAry.length; i++) {
                        _this.effAry[i].x = _this._rewardAry[i].x - 30;
                        _this.effAry[i].y = _this._rewardAry[i].y - 30;
                        // this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        // this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        _this.effAry[i].speed = 3;
                    }
                    _this.playEff();
                }, this._rewardAry.length);
            }
        };
        ArenaQualifying.prototype.playEff = function () {
            if (!this.effAry) {
                return;
            }
            for (var i = 0; i < this._rewardAry.length; i++) {
                if (this._extraFlag[i] && !this.pickFlagAry[i]) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                }
                else {
                    this.removeChild(this.effAry[i]);
                }
            }
        };
        ArenaQualifying.prototype.getTimeStr = function () {
            var obj = TableData.getInstance().getData(TableData.tb_single_pvp_base, 1);
            var ary = obj.opentime;
            var str1 = this.nt(ary[0][0]) + ":" + this.nt(ary[0][1]) + "-" + this.nt(ary[0][2]) + ":" + this.nt(ary[0][3]);
            var str2 = this.nt(ary[1][0]) + ":" + this.nt(ary[1][1]) + "-" + this.nt(ary[1][2]) + ":" + this.nt(ary[1][3]);
            return [str1, str2];
        };
        ArenaQualifying.prototype.nt = function ($num) {
            if ($num == 0) {
                return "00";
            }
            else {
                return String($num);
            }
        };
        ArenaQualifying.prototype.drawDayNum = function () {
            var qdt = GuidData.instanceData.getQualifyDailyTimes();
            if (this._lastQdt != qdt) {
                var obj = TableData.getInstance().getData(TableData.tb_single_pvp_base, 1);
                UiDraw.drawTxtLab(this._timeNumVal, ColorType.Brown7a2f21 + "今日次数：" + qdt + "/" + obj.dailyTimes, 16, TextAlign.CENTER, -15, 6);
                this._lastQdt = qdt;
            }
        };
        ArenaQualifying.prototype.draw = function () {
            this.drawDayNum();
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_SINGLE_PVP, SharedDef.RANK_TYPE_SINGLE_PVP, 1, 1);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._rankLab.skinName, "2000+", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var qs = GuidData.player.getQualifyScore();
            if (this._lastQs != qs) {
                var grade = this.getGrade(qs);
                this._baseUiAtlas.upDataPicToTexture("ui/load/arena/" + grade + ".png", this._mainImg.skinName);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._baseUiAtlas, this._jifenLab.skinName, Snum(qs), ArtFont.num57);
                this._lastQs = qs;
            }
            this.drawReward();
            this.drawRewardPick();
            this.playEff();
        };
        ArenaQualifying.prototype.getGrade = function ($score) {
            for (var i = 1; i <= 8; i++) {
                var obj = TableData.getInstance().getData(TableData.tb_single_pvp_grade, i);
                if ($score >= obj.range[0] && $score < obj.range[1]) {
                    return i;
                }
            }
            return 1;
        };
        ArenaQualifying.prototype.drawReward = function () {
            var flagAry = GuidData.instanceData.getQualifyExtra();
            for (var i = 0; i < 3; i++) {
                if (flagAry[i] != this._extraFlag[i]) {
                    var obj = TableData.getInstance().getData(TableData.tb_single_pvp_extra, i + 1);
                    IconManager.getInstance().drawItemIcon60(this._rewardAry[i], obj.show, 1, !flagAry[i]);
                    this._extraFlag[i] = flagAry[i];
                    if (i > 0) {
                        if (flagAry[i]) {
                            this._rewardLineAry[i - 1].goToAndStop(0);
                        }
                        else {
                            this._rewardLineAry[i - 1].goToAndStop(1);
                        }
                    }
                }
            }
        };
        ArenaQualifying.prototype.drawRank = function ($rank) {
            var str;
            if ($rank < 0) {
                str = "2000+";
            }
            else {
                str = String($rank);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._rankLab.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        ArenaQualifying.prototype.dataChg = function () {
            this.drawDayNum();
            this.drawRewardPick();
            this.playEff();
        };
        ArenaQualifying.prototype.drawRewardPick = function () {
            this.pickFlagAry = GuidData.instanceData.getQualifyExtraPicked();
            for (var i = 0; i < 3; i++) {
                if (this.pickFlagAry[i]) {
                    if (!this._rewardFlagAry[i].parent) {
                        this.addChild(this._rewardFlagAry[i]);
                    }
                }
                else {
                    if (this._rewardFlagAry[i].parent) {
                        this.removeChild(this._rewardFlagAry[i]);
                    }
                }
            }
        };
        ArenaQualifying.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            // for(var i:number=0;i<this.midAry.length;i++){
            //     this.addChild(this.midAry[i]);
            // }
            this.addChild(this._mainBg);
            // LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_vip_add.skinName, getvipadd("qualifyReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            if (this._baseUiAtlas) {
                this.draw();
            }
        };
        ArenaQualifying.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            // for(var i:number=0;i<this.midAry.length;i++){
            //     this.removeChild(this.midAry[i]);
            // }
            this.removeChild(this._mainBg);
        };
        return ArenaQualifying;
    }(UIConatiner));
    kuafu.ArenaQualifying = ArenaQualifying;
    var ArenaQualifyingReward = /** @class */ (function (_super) {
        __extends(ArenaQualifyingReward, _super);
        function ArenaQualifyingReward() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            return _this;
        }
        ArenaQualifyingReward.prototype.applyLoad = function () {
            this.applyLoadComplete();
        };
        ArenaQualifyingReward.prototype.initUI = function ($atlas) {
            if (this._slist) {
                return;
            }
            this._slist = new ArenaQualifyingRewardList();
            this._slist.init($atlas);
            this._baseRender.uiAtlas = $atlas;
            this.addUIList(["t_r_title", "t_r_lab1", "t_r_lab2", "t_r_lab3", "t_r_line1", "t_r_line2"], this._baseRender);
        };
        ArenaQualifyingReward.prototype.onRemove = function () {
            if (this._slist) {
                this._slist.hide();
            }
        };
        ArenaQualifyingReward.prototype.show = function ($uiatlas) {
            this.initUI($uiatlas);
            UIManager.getInstance().addUIContainer(this);
            this._slist.show();
        };
        ArenaQualifyingReward.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        ArenaQualifyingReward.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        return ArenaQualifyingReward;
    }(WindowMinUi));
    kuafu.ArenaQualifyingReward = ArenaQualifyingReward;
    var ArenaQualifyingRewardList = /** @class */ (function (_super) {
        __extends(ArenaQualifyingRewardList, _super);
        function ArenaQualifyingRewardList() {
            return _super.call(this) || this;
        }
        ArenaQualifyingRewardList.prototype.init = function ($atlas) {
            ArenaQualifyingRewardListItemRender.baseAtlas = $atlas;
            this.initData();
        };
        ArenaQualifyingRewardList.prototype.initData = function () {
            var ary = this.getDataAry();
            var w = 512;
            var h = 330;
            this.setData(ary, ArenaQualifyingRewardListItemRender, w, h, 500, 85, 4, 512, 512, 1, 6);
            this.center = 0;
            this.middle = 20;
            this.setShowLevel(4);
        };
        ArenaQualifyingRewardList.prototype.getDataAry = function () {
            var ary = new Array();
            for (var i = 1; i <= 8; i++) {
                var data = new SListItemData();
                data.data = TableData.getInstance().getData(TableData.tb_single_pvp_grade, i);
                data.id = i;
                ary.push(data);
            }
            ary.reverse();
            return ary;
        };
        ArenaQualifyingRewardList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
        };
        ArenaQualifyingRewardList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return ArenaQualifyingRewardList;
    }(SList));
    kuafu.ArenaQualifyingRewardList = ArenaQualifyingRewardList;
    var ArenaQualifyingRewardListItemRender = /** @class */ (function (_super) {
        __extends(ArenaQualifyingRewardListItemRender, _super);
        function ArenaQualifyingRewardListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArenaQualifyingRewardListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, ArenaQualifyingRewardListItemRender.baseAtlas, "r_bg", 0, 0, 512, 85);
            $container.addChild(this._ibg);
            this._icon = this.creatSUI($baseRender, ArenaQualifyingRewardListItemRender.baseAtlas, "r_icon", 33, 8, 66, 70);
            $container.addChild(this._icon);
            this._nameui = this.creatSUI($baseRender, ArenaQualifyingRewardListItemRender.baseAtlas, "r_name", 105, 29, 80, 23);
            $container.addChild(this._nameui);
            this._iconAry = new Array;
            for (var i = 0; i < 4; i++) {
                var ui = this.creatSUI($baseRender, ArenaQualifyingRewardListItemRender.baseAtlas, "r_i" + i, 190 + 76 * i, 8, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }
        };
        ArenaQualifyingRewardListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
        };
        ArenaQualifyingRewardListItemRender.prototype.applyRender = function () {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._nameui.skinName, this.itdata.data.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            UiDraw.clearUI(this._icon);
            this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png", this._icon.skinName);
            //var rary:Array<number> = this.itdata.data.itemWinKeys;
            //var nary:Array<number> = this.itdata.data.itemWinValues;
            var rnary = this.itdata.data.weekRewards.split(",");
            for (var i = 0; i < this._iconAry.length; i++) {
                IconManager.getInstance().drawItemIcon60(this._iconAry[i], rnary[i * 2], rnary[i * 2 + 1]);
            }
        };
        return ArenaQualifyingRewardListItemRender;
    }(SListItem));
    kuafu.ArenaQualifyingRewardListItemRender = ArenaQualifyingRewardListItemRender;
    var ArenaQualifyingLog = /** @class */ (function (_super) {
        __extends(ArenaQualifyingLog, _super);
        function ArenaQualifyingLog() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this.setBlackBg();
            return _this;
        }
        ArenaQualifyingLog.prototype.applyLoad = function () {
            this.applyLoadComplete();
        };
        ArenaQualifyingLog.prototype.initUI = function ($atlas) {
            if (this._slist) {
                return;
            }
            this._slist = new ArenaQualifyingLogList();
            this._slist.init($atlas);
            this._baseRender.uiAtlas = $atlas;
            this.addUIList(["t_l_title"], this._baseRender);
        };
        ArenaQualifyingLog.prototype.onRemove = function () {
            if (this._slist) {
                this._slist.hide();
            }
        };
        ArenaQualifyingLog.prototype.show = function ($uiatlas, $type) {
            if ($type === void 0) { $type = 0; }
            UIManager.getInstance().addUIContainer(this);
            this.initUI($uiatlas);
            this._slist.show($type);
        };
        ArenaQualifyingLog.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        ArenaQualifyingLog.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        return ArenaQualifyingLog;
    }(WindowMinUi));
    kuafu.ArenaQualifyingLog = ArenaQualifyingLog;
    var ArenaQualifyingLogList = /** @class */ (function (_super) {
        __extends(ArenaQualifyingLogList, _super);
        function ArenaQualifyingLogList() {
            return _super.call(this) || this;
        }
        ArenaQualifyingLogList.prototype.init = function ($atlas) {
            ArenaQualifyingLogListItemRender.baseAtlas = $atlas;
            this.initData();
        };
        ArenaQualifyingLogList.prototype.initData = function () {
            var ary = new Array();
            var w = 512;
            var h = 380;
            this.setData(ary, ArenaQualifyingLogListItemRender, w, h, 512, 34, 10, 512, 512, 1, 14);
            this.center = 0;
            this.middle = 30;
            this.setShowLevel(4);
        };
        ArenaQualifyingLogList.prototype.getDataAry = function () {
            var ary = new Array();
            var strAry;
            if (this._type == 0) {
                strAry = GuidData.instanceData.getQualify1Log();
            }
            else {
                strAry = GuidData.instanceData.get1v1Records();
            }
            for (var i = 0; i < strAry.length; i++) {
                var data = new SListItemData();
                data.data = { type: this._type, str: strAry[i] };
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        ArenaQualifyingLogList.prototype.show = function ($type) {
            if ($type === void 0) { $type = 0; }
            this._type = $type;
            UIManager.getInstance().addUIContainer(this);
            var ary = this.getDataAry();
            this.refreshData(ary);
        };
        ArenaQualifyingLogList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return ArenaQualifyingLogList;
    }(SList));
    kuafu.ArenaQualifyingLogList = ArenaQualifyingLogList;
    var ArenaQualifyingLogListItemRender = /** @class */ (function (_super) {
        __extends(ArenaQualifyingLogListItemRender, _super);
        function ArenaQualifyingLogListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArenaQualifyingLogListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, ArenaQualifyingLogListItemRender.baseAtlas, "s_bg", 0, 0, 512, 34);
            $container.addChild(this._ibg);
            this._itme0 = this.creatSUI($baseRender, ArenaQualifyingLogListItemRender.baseAtlas, "s_item0", 10, 7, 184, 20);
            $container.addChild(this._itme0);
            this._iitem1 = this.creatSUI($baseRender, ArenaQualifyingLogListItemRender.baseAtlas, "s_item1", 207, 7, 180, 20);
            $container.addChild(this._iitem1);
            this._iitem2 = this.creatSUI($baseRender, ArenaQualifyingLogListItemRender.baseAtlas, "s_item2", 399, 7, 100, 20);
            $container.addChild(this._iitem2);
        };
        ArenaQualifyingLogListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
        };
        ArenaQualifyingLogListItemRender.prototype.applyRender = function () {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            if (this.itdata.data.type == 0) {
                this.drawQulify();
            }
            else {
                this.drawDj();
            }
        };
        ArenaQualifyingLogListItemRender.prototype.drawQulify = function () {
            var str = this.itdata.data.str;
            var strAry = str.split("|");
            var result = Number(strAry[1]) == 1;
            var resultStr = result ? (ColorType.Green2ca937 + "胜  ") : (ColorType.colorcd2000 + "败  ");
            var nameStr = ColorType.Brown7a2f21 + "您遭遇 " + ColorType.Browndf9a68 + getBaseName(strAry[0]);
            var sfStr = result ? (ColorType.Green2ca937 + "您胜利了  ") : (ColorType.colorcd2000 + "您失败了  ");
            var jifenStr = ColorType.Brown7a2f21 + "积分 " + (result ? (ColorType.Green2ca937 + "+" + strAry[2]) : (ColorType.colorcd2000 + "-" + strAry[2]));
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._itme0.skinName, resultStr + nameStr, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem1.skinName, sfStr + jifenStr, 16, TextAlign.LEFT);
            var hourtime = GameInstance.getServerNow() - Number(strAry[3]);
            var timeStr = TimeUtil.getDelayTimeStr(hourtime);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, timeStr, 14, TextAlign.LEFT, ColorType.Orange9a683f);
        };
        ArenaQualifyingLogListItemRender.prototype.drawDj = function () {
            var str = this.itdata.data.str;
            var strAry = str.split("|");
            var result = Number(strAry[4]) == 1;
            var resultStr = result ? (ColorType.Green2ca937 + "胜  ") : (ColorType.colorcd2000 + "败  ");
            var nameStr = ColorType.Brown7a2f21 + "您遭遇 " + ColorType.Browndf9a68 + getBaseName(strAry[0]);
            var selfName = getBaseName(GuidData.player.getName());
            if (selfName == strAry[0]) {
                nameStr = ColorType.Browndf9a68 + getBaseName(strAry[1]) + ColorType.Brown7a2f21 + "挑战您 ";
            }
            else {
                nameStr = ColorType.Brown7a2f21 + "您挑战 " + ColorType.Browndf9a68 + getBaseName(strAry[1]);
            }
            var sfStr = result ? (ColorType.Green2ca937 + "您胜利了  ") : (ColorType.colorcd2000 + "您失败了  ");
            var aaa = Number(strAry[2]);
            var bbb = Number(strAry[3]);
            var jifenStr;
            if (aaa == bbb) {
                jifenStr = ColorType.Brown7a2f21 + "排名保持不变";
            }
            else {
                aaa = Math.abs(bbb - aaa);
                jifenStr = ColorType.Brown7a2f21 + "排名 " + (result ? (ColorType.Green2ca937 + "+" + aaa) : (ColorType.colorcd2000 + "-" + aaa));
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._itme0.skinName, resultStr + nameStr, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem1.skinName, sfStr + jifenStr, 16, TextAlign.LEFT);
            var hourtime = GameInstance.getServerNow() - Number(strAry[5]);
            var timeStr = TimeUtil.getDelayTimeStr(hourtime);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, timeStr, 14, TextAlign.LEFT, ColorType.Orange9a683f);
        };
        return ArenaQualifyingLogListItemRender;
    }(SListItem));
    kuafu.ArenaQualifyingLogListItemRender = ArenaQualifyingLogListItemRender;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=ArenaQualifying.js.map