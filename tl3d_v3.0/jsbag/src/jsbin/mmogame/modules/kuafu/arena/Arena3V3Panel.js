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
    var Arena3V3Panel = /** @class */ (function (_super) {
        __extends(Arena3V3Panel, _super);
        function Arena3V3Panel() {
            var _this = _super.call(this) || this;
            _this._lastTime = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        Arena3V3Panel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
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
        Arena3V3Panel.prototype.initUI = function () {
            this._winUIRenderAry = this.getUIList(["t_bg", "a_role_line", "a_role_line1",
                "a_dz0", "a_dz1", "a_dz2", "a_name_bg0", "a_name_bg1", "a_name_bg2"], this._winMidRender);
            this.addUIList(["a_reward_title", "a_jifen_bg"], this._bgRender);
            this._itemDjRoleAry = new Array;
            for (var i = 0; i < 3; i++) {
                var item = new Item3V3Role;
                item.init(this._bgRender, this._topRender, i, this);
                this._itemDjRoleAry.push(item);
                var frameUI = this.addChild(this._baseRender.getComponent("a_flg_bg" + i));
                frameUI.goToAndStop(i);
            }
            this.rewardAry = new Array;
            for (var i = 0; i < 3; i++) {
                var rewardItem = new RewardItem3V3();
                var robj = TableData.getInstance().getData(TableData.tb_kuafu3v3_day_reward, i + 1);
                rewardItem.init(this._bgRender, this._baseRender, i, this, robj);
                rewardItem.applyState();
                this.rewardAry.push(rewardItem);
            }
            this._helpBtn = this.addEvntButUp("a_help", this._bgRender);
            this._rankBtn = this.addEvntButUp("a_rank_btn", this._bgRender);
            this._rewardBtn = this.addEvntButUp("a_reward_btn", this._bgRender);
            this._autoBtn = this.addEvntButUp("a_aotu_btn", this._bgRender);
            this._teamBtn = this.addEvntButUp("a_team_btn", this._bgRender);
            this._personBtn = this.addEvntButUp("a_person_btn", this._bgRender);
            this._myRank = this.addChild(this._baseRender.getComponent("a_rank"));
            this._myScore = this.addChild(this._baseRender.getComponent("a_score"));
            this._myRate = this.addChild(this._baseRender.getComponent("a_rate"));
            this._timeLab = this.addChild(this._baseRender.getComponent("a_time"));
            var ui = this.addChild(this._baseRender.getComponent("a_rank_reward"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "排名奖励:", 16, TextAlign.LEFT);
            //this.c_vip_add = this.addChild(this._baseRender.getComponent("c_vip_add"));
            //this.challengeLab = this.addChild(this._baseRender.getComponent("a_bottom_lab3"));
            //this.addSelfRole();
            this.drawBaseInfo();
            //this.drawChallengNum();
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_3V3, SharedDef.RANK_TYPE_3V3, 1, 3);
        };
        Arena3V3Panel.prototype.refreshReward = function () {
            if (this.rewardAry) {
                for (var i = 0; i < this.rewardAry.length; i++) {
                    this.rewardAry[i].applyState();
                }
            }
        };
        Arena3V3Panel.prototype.initUpdate = function () {
            var _this = this;
            if (!this._upFun) {
                this._upFun = function () {
                    _this.drawTime();
                };
            }
            var obj = TableData.getInstance().getData(TableData.tb_kuafu3v3_base, 1);
            //obj.day = [3, 5, 6];
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts * 1000);
            var day = $sever.getDay();
            if (obj.day.indexOf(day) == -1) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, ColorType.Brown7a2f21 + "活动未开始", 16, TextAlign.CENTER);
                return;
            }
            var time = obj.activetime[0];
            if (!TimeUtil.compareTime(time[0], time[1]) && TimeUtil.compareTime(time[2], time[3])) {
                var $ts = GameInstance.getServerNow();
                var $play = new Date($ts * 1000);
                $play.setHours(time[2]);
                $play.setMinutes(time[3]);
                $play.setSeconds(0);
                $play.setMilliseconds(0);
                this.targetTime = $play.getTime() / 1000;
                TimeUtil.addTimeTick(1000, this._upFun);
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, ColorType.Brown7a2f21 + "活动未开始", 16, TextAlign.CENTER);
            }
        };
        Arena3V3Panel.prototype.drawBaseInfo = function () {
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myRank.skinName, ColorType.Brown7a2f21 + "我的排名:" + ColorType.Green2ca937 + "90", 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myScore.skinName, ColorType.Brown7a2f21 + "我的积分:" + ColorType.Green2ca937 + GuidData.player.get3V3Score(), 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myRate.skinName, ColorType.Brown7a2f21 + "胜率:" + ColorType.Green2ca937 + GuidData.player.get3V3Wins() + "/" + GuidData.player.get3V3Count(), 16, TextAlign.LEFT);
        };
        Arena3V3Panel.prototype.drawTime = function () {
            var dtime = this.targetTime - GameInstance.getServerNow();
            var timeStr;
            if (dtime > 0) {
                timeStr = ColorType.Brown7a2f21 + "活动剩余：" + ColorType.colorcd2000 + TimeUtil.getLocalTime3(dtime);
            }
            else {
                timeStr = ColorType.Brown7a2f21 + "活动未开始";
                TimeUtil.removeTimeTick(this._upFun);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, timeStr, 16, TextAlign.CENTER);
        };
        Arena3V3Panel.prototype.butClik = function ($e) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize($e.target);
            switch ($e.target) {
                case this._rewardBtn:
                    this.showRewardPanel();
                    break;
                case this._rankBtn:
                    this.showRankPanel();
                    break;
                case this._personBtn:
                    // if (GuidData.team && GuidData.team.getTeamItemAry().length) {
                    //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请先离开队伍", 99);
                    // } else {
                    //     NetManager.getInstance().protocolos.kuafu_3v3_match();
                    // }
                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            //队长
                            msgtip.MsgTipManager.outStr("[ff0000]请点击<队伍进入>按钮进入副本挑战", 99);
                        }
                        else {
                            msgtip.MsgTipManager.outStr("[ff0000]当前处于队伍中，无法操作", 99);
                        }
                        return;
                    }
                    NetManager.getInstance().protocolos.kuafu_3v3_match();
                    break;
                case this._autoBtn:
                    if (GuidData.team) {
                        msgtip.MsgTipManager.outStr("[ff0000]当前已在队伍中", 99);
                    }
                    else {
                        this.gotoTeamModul();
                    }
                    break;
                case this._teamBtn:
                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            //队长
                            if (GuidData.team.getTeamMemberNum() < 3) {
                                msgtip.MsgTipManager.outStr("[ff0000]只有队伍满员状态，才可发起挑战", 99);
                            }
                            else {
                                NetManager.getInstance().protocolos.kuafu_3v3_group_match();
                            }
                        }
                        else {
                            msgtip.MsgTipManager.outStr("[ff0000]只有队长可以发起挑战", 99);
                        }
                    }
                    else {
                        AlertUtil.show("不在队伍中，是否前往创建或寻找队伍？", "提示", function (a) {
                            if (a == 1) {
                                _this.gotoTeamModul();
                            }
                        }, 2, ["是", "否"]);
                    }
                    //     if (GuidData.team && GuidData.team.getTeamItemAry().length) {
                    //         NetManager.getInstance().protocolos.kuafu_3v3_group_match();
                    //     } else {
                    //         msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请先加入队伍", 99);
                    //     }
                    break;
                case this._helpBtn:
                    this.showGG();
                    break;
                default:
                    break;
            }
        };
        Arena3V3Panel.prototype.gotoTeamModul = function () {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_HIDE_ARENA_PANEL_EVENT));
            var tabvo = new team.TabVo;
            // tabvo.id = 0;
            tabvo.tab = team.TeamModel.getInstance().getTabVoByType(5);
            tabvo.maxlev = tabvo.tab.tab.max_lev[1];
            tabvo.minlev = tabvo.tab.tab.min_lev[0];
            ModulePageManager.openPanel(SharedDef.MODULE_TEAM, tabvo);
        };
        Arena3V3Panel.prototype.showRewardPanel = function () {
            var _this = this;
            if (!this._rewardPanel) {
                this._rewardPanel = new Arena3V3Reward();
            }
            this._rewardPanel.load(function () {
                _this._rewardPanel.show(_this._baseUiAtlas);
            });
        };
        Arena3V3Panel.prototype.showRankPanel = function () {
            var _this = this;
            if (!this._rankPanel) {
                this._rankPanel = new Arena3V3Rank();
            }
            this._rankPanel.load(function () {
                _this._rankPanel.show(_this._baseUiAtlas);
            });
        };
        Arena3V3Panel.prototype.showGG = function () {
            var _this = this;
            if (!this.bossGz) {
                this.bossGz = new sboss.BossGz();
            }
            this.bossGz.load(function () {
                _this.bossGz.show("3v3");
            });
        };
        Arena3V3Panel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.c_vip_add.skinName, getvipadd("djtReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            if (this._baseUiAtlas) {
                this.addWinmid();
                //NetManager.getInstance().protocolos.doujiantai_get_enemys_info();
                //this.drawBaseInfo();
                //this.drawChallengNum();
                NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_3V3, SharedDef.RANK_TYPE_3V3, 1, 3);
                this.refreshReward();
                this.drawBaseInfo();
            }
            this.initUpdate();
        };
        Arena3V3Panel.prototype.refresh3v3Info = function ($data) {
            var list = $data.list;
            var selfLev = $data.self;
            //console.log("-----3v3 data---------------")
            var rAry = new Array;
            for (var i = 0; i < list.length; i++) {
                var obj = new Object;
                var rdata = list[i];
                obj.name = rdata.getRankName();
                obj.faction = rdata.getRankFaction();
                obj.coat = rdata.getRankCoat();
                obj.weapon = rdata.getRankWeapon();
                obj.chartype = rdata.getRankGender();
                obj.win = rdata.getRank3v3Win();
                obj.all = rdata.getRank3v3Count();
                obj.score = rdata.getRank3v3Scores();
                obj.rank = rdata.getRank();
                rAry.push(obj);
                ////console.log(obj);
            }
            if (rAry.length == 3 && rAry[0].name != "") {
                for (var i = 0; i < rAry.length; i++) {
                    if (this._itemDjRoleAry[i] && rAry[i].name != "") {
                        this._itemDjRoleAry[i].setData(rAry[i]);
                    }
                }
            }
            else if (rAry.length > 3) {
                if (this._rankPanel && this._rankPanel.hasStage) {
                    this._rankPanel.setRankData(rAry, selfLev, $data.all);
                }
            }
            var selfLevStr;
            if (selfLev > 0) {
                selfLevStr = String(selfLev);
            }
            else {
                selfLevStr = "未上榜";
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myRank.skinName, ColorType.Brown7a2f21 + "我的排名:" + ColorType.Green2ca937 + selfLevStr, 16, TextAlign.LEFT);
        };
        Arena3V3Panel.prototype.addWinmid = function () {
            for (var i = 0; i < this._winUIRenderAry.length; i++) {
                this.addChild(this._winUIRenderAry[i]);
            }
        };
        Arena3V3Panel.prototype.removeWinmid = function () {
            for (var i = 0; i < this._winUIRenderAry.length; i++) {
                this.removeChild(this._winUIRenderAry[i]);
            }
        };
        Arena3V3Panel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
            //this.removeChild(this._mainBg);
            TimeUtil.removeTimeTick(this._upFun);
        };
        return Arena3V3Panel;
    }(UIConatiner));
    kuafu.Arena3V3Panel = Arena3V3Panel;
    var RewardItem3V3 = /** @class */ (function () {
        function RewardItem3V3() {
            this._sta = -1;
        }
        RewardItem3V3.prototype.init = function ($bgRender, $baseRender, $id, $container, $data) {
            this.container = $container;
            this.data = $data;
            this.icon = $container.addChild($bgRender.getComponent("b_icon" + $id));
            if ($id > 0) {
                this.arrui = $container.addChild($bgRender.getComponent("a_reward_f" + $id));
            }
            this.flag = $baseRender.getComponent("a_chuo" + $id);
            this.flag.goToAndStop($id);
            this.getui = $baseRender.getComponent("a_get" + $id);
            this.icon.addEventListener(InteractiveEvent.Up, this.onClick, this);
        };
        RewardItem3V3.prototype.applyState = function () {
            var all = GuidData.player.get3V3Count();
            var hasGet = GuidData.instanceData.get3V3DayRewardState(this.data.id);
            if (hasGet) {
                this.setState(2);
            }
            else if (all >= this.data.num) {
                this.setState(1);
            }
            else {
                this.setState(0);
            }
        };
        RewardItem3V3.prototype.setState = function ($sta) {
            if (this._sta == $sta) {
                return;
            }
            if ($sta == 0) {
                IconManager.getInstance().drawItemIcon40(this.icon, this.data.reward[0][0], this.data.reward[0][1], true);
                this.container.addChild(this.flag);
                if (this.arrui) {
                    this.arrui.goToAndStop(1);
                }
                this.container.removeChild(this.getui);
            }
            else if ($sta == 1) {
                IconManager.getInstance().drawItemIcon40(this.icon, this.data.reward[0][0], this.data.reward[0][1]);
                this.container.addChild(this.flag);
                if (this.arrui) {
                    this.arrui.goToAndStop(0);
                }
                this.container.removeChild(this.getui);
            }
            else if ($sta == 2) {
                IconManager.getInstance().drawItemIcon40(this.icon, this.data.reward[0][0], this.data.reward[0][1]);
                this.container.removeChild(this.flag);
                if (this.arrui) {
                    this.arrui.goToAndStop(0);
                }
                this.container.addChild(this.getui);
            }
            this._sta = $sta;
        };
        RewardItem3V3.prototype.onClick = function ($e) {
            if (this._sta == 1) {
                NetManager.getInstance().protocolos.kuafu_3v3_dayreward(this.data.id);
            }
        };
        return RewardItem3V3;
    }());
    kuafu.RewardItem3V3 = RewardItem3V3;
    var Item3V3Role = /** @class */ (function () {
        function Item3V3Role() {
            this.id = 0;
            this.role = new Person2DChar();
            this.resize();
        }
        Item3V3Role.prototype.resize = function () {
            this.role.scale = 3.5 * UIData.Scale;
            var xoff = this.id;
            if (this.id == 0) {
                xoff = 1;
            }
            else if (this.id == 1) {
                xoff = 0;
            }
            this.role.x = (225 - 125 * xoff) * UIData.Scale;
            this.role.y = (-70 - this.id * 10) * UIData.Scale;
            this.role.resize();
        };
        Item3V3Role.prototype.init = function ($roleRender, $render, $id, $container) {
            $roleRender.addModel(this.role);
            this.id = $id;
            this.nameUI = $container.addChild($render.getComponent("a_r_n" + $id));
            this.factionUI = $container.addChild($render.getComponent("a_r_f" + $id));
            this.scoreUI = $container.addChild($render.getComponent("a_r_s" + $id));
            this.rateUI = $container.addChild($render.getComponent("a_r_r" + $id));
            this.rewardbtn = $container.addChild($render.getComponent("a_rewarditem" + $id));
            this.rewardbtn.addEventListener(InteractiveEvent.Up, this.onClick, this);
            //var obj: any = TableData.getInstance().getData(TableData.tb_doujiantai_base, 1);
            //var str: string = "挑战奖励:" + getResName(obj.tryReward[0][0]) + Snum(obj.tryReward[0][1]);
            //LabelTextFont.writeSingleLabel(this.rateUI.uiRender.uiAtlas, this.rateUI.skinName, str, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            // var temp: any = new Object();
            // temp.name = "虚位以待";
            // temp.faction = "";
            // temp.score = "";
            // temp.rate = "";
            this.rewardAry = new Array;
            var obj = TableData.getInstance().getData(TableData.tb_local3v3_daily_reward, this.id + 1);
            var ary = obj.reward.split(",");
            for (var i = 0; i < ary.length; i += 2) {
                this.rewardAry.push([Number(ary[i]), Number(ary[i + 1])]);
            }
            // this.setData(temp);
            LabelTextFont.writeSingleLabel(this.nameUI.uiRender.uiAtlas, this.nameUI.skinName, "虚位以待", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
        };
        //public data: KuaFu1v1BangData;
        Item3V3Role.prototype.setData = function ($data) {
            //this.data = $data;
            LabelTextFont.writeSingleLabel(this.nameUI.uiRender.uiAtlas, this.nameUI.skinName, getBaseName($data.name), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this.factionUI.uiRender.uiAtlas, this.factionUI.skinName, getBaseName($data.faction), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.scoreUI.uiRender.uiAtlas, this.scoreUI.skinName, ColorType.Brown7a2f21 + "积分:" + ColorType.Green2ca937 + $data.score, 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this.rateUI.uiRender.uiAtlas, this.rateUI.skinName, ColorType.Brown7a2f21 + "胜率:" + ColorType.Green2ca937 + $data.win + "/" + $data.all, 16, TextAlign.CENTER);
            this.role.setBaseRoleAvatar($data.coat, $data.chartype);
            this.role.setBaseRoleWeapon($data.weapon, $data.chartype);
            this.resize();
        };
        Item3V3Role.prototype.onClick = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            var aaa = new pass.BoxVo;
            aaa.rewardary = this.rewardAry;
            aaa.id = -1;
            aaa.title = 0;
            aaa.canbuy = false;
            var $eee = new pass.PassEvent(pass.PassEvent.SHOW_BOXREWARD_PANEL);
            $eee.data = aaa;
            ModuleEventManager.dispatchEvent($eee);
        };
        return Item3V3Role;
    }());
    kuafu.Item3V3Role = Item3V3Role;
    var Arena3V3Reward = /** @class */ (function (_super) {
        __extends(Arena3V3Reward, _super);
        function Arena3V3Reward() {
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
        Arena3V3Reward.prototype.applyLoad = function () {
            this.applyLoadComplete();
        };
        Arena3V3Reward.prototype.initUI = function ($atlas) {
            if (this._slist) {
                return;
            }
            this._slist = new Arena3V3RewardList();
            this._slist.init($atlas);
            this._baseRender.uiAtlas = $atlas;
            this.addUIList(["a_b_title", "a_r_line1", "a_r_line2"], this._baseRender);
            var ui;
            ui = this.addChild(this._baseRender.getComponent("a_b_rank"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "排名", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_b_reward"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        Arena3V3Reward.prototype.onRemove = function () {
            if (this._slist) {
                this._slist.hide();
            }
        };
        Arena3V3Reward.prototype.show = function ($uiatlas) {
            this.initUI($uiatlas);
            UIManager.getInstance().addUIContainer(this);
            this._slist.show();
        };
        Arena3V3Reward.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        Arena3V3Reward.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        return Arena3V3Reward;
    }(WindowMinUi));
    kuafu.Arena3V3Reward = Arena3V3Reward;
    var Arena3V3RewardList = /** @class */ (function (_super) {
        __extends(Arena3V3RewardList, _super);
        function Arena3V3RewardList() {
            return _super.call(this) || this;
        }
        Arena3V3RewardList.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            this.initData();
        };
        Arena3V3RewardList.prototype.initData = function () {
            var ary = this.getDataAry();
            var w = 512;
            var h = 330;
            this.setData(ary, Arena3V3RewardListItemRender, w, h, 500, 85, 4, 512, 512, 1, 6);
            this.center = 0;
            this.middle = 20;
            this.setShowLevel(4);
        };
        Arena3V3RewardList.prototype.getDataAry = function () {
            var ary = new Array();
            var size = TableData.getInstance().getTabMaxID(TableData.tb_local3v3_daily_reward);
            for (var i = 1; i <= size; i++) {
                var data = new SListItemData();
                data.data = TableData.getInstance().getData(TableData.tb_local3v3_daily_reward, i);
                data.id = i;
                ary.push(data);
            }
            //ary.reverse();
            return ary;
        };
        Arena3V3RewardList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
        };
        Arena3V3RewardList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return Arena3V3RewardList;
    }(SList));
    kuafu.Arena3V3RewardList = Arena3V3RewardList;
    var Arena3V3RewardListItemRender = /** @class */ (function (_super) {
        __extends(Arena3V3RewardListItemRender, _super);
        function Arena3V3RewardListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Arena3V3RewardListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "r_bg", 0, 0, 512, 85);
            $container.addChild(this._ibg);
            // this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "r_icon", 33, 8, 66, 70);
            // $container.addChild(this._icon);
            this._nameui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "r_name", 40, 29, 80, 23);
            $container.addChild(this._nameui);
            this._iconAry = new Array;
            for (var i = 0; i < 4; i++) {
                var ui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "r_i" + i, 190 + 76 * i, 8, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }
        };
        Arena3V3RewardListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
        };
        Arena3V3RewardListItemRender.prototype.applyRender = function () {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            var rankStr;
            if (this.itdata.data.rank[0] == 0) {
                rankStr = "未上榜";
            }
            else if (this.itdata.data.rank[0] == this.itdata.data.rank[1]) {
                rankStr = String(this.itdata.data.rank[0]);
            }
            else {
                rankStr = this.itdata.data.rank[0] + "-" + this.itdata.data.rank[1];
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._nameui.skinName, rankStr, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            //UiDraw.clearUI(this._icon);
            //this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png",this._icon.skinName);
            //var rary:Array<number> = this.itdata.data.itemWinKeys;
            //var nary:Array<number> = this.itdata.data.itemWinValues;
            var rnary = this.itdata.data.reward.split(",");
            for (var i = 0; i < this._iconAry.length; i++) {
                IconManager.getInstance().drawItemIcon60(this._iconAry[i], rnary[i * 2], rnary[i * 2 + 1]);
            }
        };
        return Arena3V3RewardListItemRender;
    }(SListItem));
    kuafu.Arena3V3RewardListItemRender = Arena3V3RewardListItemRender;
    var Arena3V3Rank = /** @class */ (function (_super) {
        __extends(Arena3V3Rank, _super);
        function Arena3V3Rank() {
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
        Arena3V3Rank.prototype.applyLoad = function () {
            this.applyLoadComplete();
        };
        Arena3V3Rank.prototype.initUI = function ($atlas) {
            if (this._slist) {
                return;
            }
            this._slist = new Arena3V3RankList();
            this._slist.init($atlas);
            this._baseRender.uiAtlas = $atlas;
            this.addUIList(["a_c_title", "a_c_line1", "a_c_line2", "a_c_line3", "a_c_line", "a_r_line2"], this._baseRender);
            var ui;
            ui = this.addChild(this._baseRender.getComponent("a_c_rank"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "排名", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_c_name"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "名字", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_c_score"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "积分", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_c_rate"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "胜率", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this._myRank = this.addChild(this._baseRender.getComponent("a_c_my_rank"));
            this._myScore = this.addChild(this._baseRender.getComponent("a_c_my_score"));
            this._myRate = this.addChild(this._baseRender.getComponent("a_c_my_rate"));
            //this.drawMyInfo();
        };
        Arena3V3Rank.prototype.drawMyInfo = function ($rank) {
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._myRank.skinName, ColorType.Brown7a2f21 + "我的排名:" + ColorType.Green2ca937 + ($rank < 0 ? "未上榜" : $rank), 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._myScore.skinName, ColorType.Brown7a2f21 + "我的积分:" + ColorType.Green2ca937 + GuidData.player.get3V3Score(), 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._myRate.skinName, ColorType.Brown7a2f21 + "我的胜率:" + ColorType.Green2ca937 + GuidData.player.get3V3Wins() + "/" + GuidData.player.get3V3Count(), 16, TextAlign.LEFT);
        };
        Arena3V3Rank.prototype.onRemove = function () {
            if (this._slist) {
                this._slist.hide();
            }
        };
        Arena3V3Rank.prototype.show = function ($uiatlas, $type) {
            if ($type === void 0) { $type = 0; }
            UIManager.getInstance().addUIContainer(this);
            this.initUI($uiatlas);
            this._slist.show($type);
        };
        Arena3V3Rank.prototype.setRankData = function ($list, self, $all) {
            if (this._slist) {
                this._slist.setRankData($list, $all);
            }
            this.drawMyInfo(self);
        };
        Arena3V3Rank.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        Arena3V3Rank.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        return Arena3V3Rank;
    }(WindowMinUi));
    kuafu.Arena3V3Rank = Arena3V3Rank;
    var Arena3V3RankList = /** @class */ (function (_super) {
        __extends(Arena3V3RankList, _super);
        function Arena3V3RankList() {
            var _this = _super.call(this) || this;
            _this._allPage = 1;
            _this._pageNum = 10;
            return _this;
        }
        Arena3V3RankList.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            this.initData();
        };
        Arena3V3RankList.prototype.initData = function () {
            var _this = this;
            var ary = new Array();
            var w = 590;
            var h = 300;
            this.setData(ary, Arena3V3RankListItemRender, w, h, 512, 60, 5, 512, 256, 1, 9);
            this.center = 0;
            this.middle = 5;
            this.setShowLevel(4);
            this.setDragFun(function () {
                ////console.log("up");
                if (_this._page > 0) {
                    _this._page--;
                    _this.getPageData();
                }
            }, function () {
                ////console.log("down");
                if (_this._page < (_this._allPage - 1)) {
                    _this._page++;
                    _this.getPageData();
                }
            });
        };
        Arena3V3RankList.prototype.show = function ($type) {
            if ($type === void 0) { $type = 0; }
            this._type = $type;
            UIManager.getInstance().addUIContainer(this);
            //var ary: Array<SListItemData> = this.getDataAry();
            //this.refreshData(ary);
            this._page = 0;
            this.getPageData();
        };
        Arena3V3RankList.prototype.getPageData = function () {
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_3V3, SharedDef.RANK_TYPE_3V3, this._page * this._pageNum + 1, (this._page + 1) * this._pageNum);
        };
        Arena3V3RankList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        Arena3V3RankList.prototype.setRankData = function ($list, $all) {
            this._allPage = Math.ceil($all / this._pageNum);
            var ary = new Array();
            for (var i = 0; i < $list.length; i++) {
                if ($list[i].name != "") {
                    var data = new SListItemData();
                    data.data = $list[i];
                    data.id = i;
                    ary.push(data);
                }
            }
            this.refreshData(ary);
        };
        return Arena3V3RankList;
    }(SList));
    kuafu.Arena3V3RankList = Arena3V3RankList;
    var Arena3V3RankListItemRender = /** @class */ (function (_super) {
        __extends(Arena3V3RankListItemRender, _super);
        function Arena3V3RankListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Arena3V3RankListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "q_bg", 0, 0, 590, 60);
            $container.addChild(this._ibg);
            this._rank = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_rank", 30, 20, 70, 25);
            $container.addChild(this._rank);
            this._name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_name", 140, 20, 150, 25);
            $container.addChild(this._name);
            this._score = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_score", 310, 20, 120, 25);
            $container.addChild(this._score);
            this._rate = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_rate", 460, 20, 120, 25);
            $container.addChild(this._rate);
        };
        Arena3V3RankListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.clearRender();
            }
        };
        Arena3V3RankListItemRender.prototype.applyRender = function () {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            else {
                UiDraw.clearUI(this._ibg);
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._rank.skinName, String(this.itdata.data.rank), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, getBaseName(this.itdata.data.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._score.skinName, String(this.itdata.data.score), 16, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._rate.skinName, this.itdata.data.win + "/" + this.itdata.data.all, 16, TextAlign.CENTER, ColorType.Green2ca937);
        };
        Arena3V3RankListItemRender.prototype.clearRender = function () {
            UiDraw.clearUI(this._rank);
            UiDraw.clearUI(this._name);
            UiDraw.clearUI(this._score);
            UiDraw.clearUI(this._rate);
        };
        return Arena3V3RankListItemRender;
    }(SListItem));
    kuafu.Arena3V3RankListItemRender = Arena3V3RankListItemRender;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=Arena3V3Panel.js.map