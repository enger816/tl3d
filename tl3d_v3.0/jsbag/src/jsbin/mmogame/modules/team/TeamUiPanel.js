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
var team;
(function (team) {
    var TeamUiPanel = /** @class */ (function (_super) {
        __extends(TeamUiPanel, _super);
        function TeamUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        TeamUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            _super.prototype.dispose.call(this);
            if (this.teamList) {
                this.teamList.dispose();
                this.teamList = null;
            }
        };
        TeamUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._roleRender.uiAtlas.setInfo("ui/uidata/team/team.xml", "ui/uidata/team/team.png", function () { _this.loadConfigCom(); }, "ui/uidata/team/teampc.png");
        };
        TeamUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        TeamUiPanel.prototype.initData = function () {
            //添加UI控件初始化
            this.a_index = this.addChild(this._bgRender.getComponent("a_index"));
            this.a_target = this.addChild(this._roleRender.getComponent("a_target"));
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._roleRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._roleRender);
            this.winmidRender.applyObjData();
            this.addUIList(["a_targettitle", "a_title", "a_basebg", "a_cutline", "a_cutline1"], this._bgRender);
            this.addUIList(["a_txt0", "a_txt6"], this._roleRender);
            this.invitationBtn = this.addEvntButUp("a_btnw0", this._bgRender);
            this.a_membernum = this.addChild(this._roleRender.getComponent("a_membernum"));
            this.a_exptxt = this.addChild(this._roleRender.getComponent("a_exptxt"));
            this.unteamUi = new Array;
            this.leaderUi = new Array;
            this.memberUi = new Array;
            //没有队伍时的ui初始化
            this.unteamUi.push(this._topRender.getComponent("a_autotxt"));
            var a_btnchgtarget = this._roleRender.getComponent("a_btnchgtarget"); //更换目标
            a_btnchgtarget.addEventListener(InteractiveEvent.Up, this.chgTargetEvent, this);
            this.unteamUi.push(a_btnchgtarget);
            this.unteamUi.push(this._topRender.getComponent("a_txt1"));
            var convenientteam = this._roleRender.getComponent("a_btnw1"); //便捷组队
            convenientteam.addEventListener(InteractiveEvent.Up, this.convenientEvent, this);
            this.unteamUi.push(convenientteam);
            var autoplay = this._roleRender.getComponent("a_btnauto"); //自动匹配
            autoplay.addEventListener(InteractiveEvent.Up, this.autoEvent, this);
            this.unteamUi.push(autoplay);
            var buildteam = this._roleRender.getComponent("a_btny"); //创建队伍
            buildteam.addEventListener(InteractiveEvent.Up, this.buildEvent, this);
            this.unteamUi.push(buildteam);
            this.unteamUi.push(this._topRender.getComponent("a_txt5"));
            //队长时候的ui
            this.leaderUi.push(this._topRender.getComponent("a_autotxt"));
            var a_btnchgtarget = this._roleRender.getComponent("a_btnchgtarget"); //更换目标
            a_btnchgtarget.addEventListener(InteractiveEvent.Up, this.chgTargetEvent, this);
            this.leaderUi.push(a_btnchgtarget);
            this.leaderUi.push(this._topRender.getComponent("a_txt2"));
            var applybtn = this._roleRender.getComponent("a_btnw1"); //申请列表
            applybtn.addEventListener(InteractiveEvent.Up, this.applyEvent, this);
            this.leaderUi.push(applybtn);
            var speak = this._roleRender.getComponent("a_btnw2"); //世界喊话
            speak.addEventListener(InteractiveEvent.Up, this.speakEvent, this);
            this.leaderUi.push(speak);
            this.leaderUi.push(this._topRender.getComponent("a_txt3"));
            var autoplay = this._roleRender.getComponent("a_btnauto"); //自动匹配
            autoplay.addEventListener(InteractiveEvent.Up, this.autoEvent, this);
            this.leaderUi.push(autoplay);
            var enterbtn = this._roleRender.getComponent("a_btny"); //进入副本
            enterbtn.addEventListener(InteractiveEvent.Up, this.enterEvent, this);
            this.leaderUi.push(enterbtn);
            this.leaderUi.push(this._topRender.getComponent("a_txt4"));
        };
        TeamUiPanel.prototype.enterEvent = function ($evt) {
            if (this.PopautoMacth()) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($evt.target);
            team.TeamModel.getInstance().enterTask(this._curTypeVo);
        };
        TeamUiPanel.prototype.applyEvent = function ($evt) {
            UiTweenScale.getInstance().changeButSize($evt.target);
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.APPLY_TEAM_PANEL));
        };
        TeamUiPanel.prototype.buildEvent = function ($evt) {
            if ($evt === void 0) { $evt = null; }
            if (this.PopautoMacth()) {
                return;
            }
            if ($evt) {
                UiTweenScale.getInstance().changeButSize($evt.target);
            }
            NetManager.getInstance().protocolos.group_create(this._curTypeVo.tab.tab.id, this._curTypeVo.minlev, this._curTypeVo.maxlev, 1);
        };
        TeamUiPanel.prototype.speakEvent = function ($evt) {
            UiTweenScale.getInstance().changeButSize($evt.target);
            var $str = ColorType.Green20a200 + "邀请组队" + "[]" + "{\"T\":3,\"G\":" + "\"" + GuidData.team.guid + "\"" + "}";
            NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_WORLD, $str);
        };
        TeamUiPanel.prototype.autoEvent = function ($evt) {
            UiTweenScale.getInstance().changeButSize($evt.target);
            console.log("-----自动匹配---");
            var flag = false;
            if (GuidData.team) {
                if (GuidData.team.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            }
            else {
                if (GuidData.player.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            }
            if (flag) {
                //取消匹配
                NetManager.getInstance().protocolos.cancel_auto_group_match();
            }
            else {
                //自动匹配
                NetManager.getInstance().protocolos.auto_group_match(this._curTypeVo.tab.tab.id);
            }
        };
        TeamUiPanel.prototype.chgTargetEvent = function ($evt) {
            if (this.PopautoMacth()) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($evt.target);
            var $teamtype = new team.TeamEvent(team.TeamEvent.SHOW_TEAMTYPE_PANEL);
            $teamtype.data = this._curTypeVo;
            ModuleEventManager.dispatchEvent($teamtype);
        };
        TeamUiPanel.prototype.convenientEvent = function ($evt) {
            if (this.PopautoMacth()) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($evt.target);
            var $teamtype = new team.TeamEvent(team.TeamEvent.CONVENIENT_TEAM_PANEL);
            $teamtype.data = this._curTypeVo;
            ModuleEventManager.dispatchEvent($teamtype);
        };
        TeamUiPanel.prototype.PopautoMacth = function () {
            var flag = false;
            if (GuidData.team) {
                if (GuidData.team.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            }
            else {
                if (GuidData.player.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            }
            if (flag) {
                AlertUtil.show("您正处于自动匹配中,是否中断?", "提示", function (a) {
                    if (a == 1) {
                        NetManager.getInstance().protocolos.cancel_auto_group_match();
                    }
                }, 2, ["是", "否"]);
            }
            return flag;
        };
        TeamUiPanel.prototype.resize = function () {
            // if (this.UnlockAry[6] && this.UnlockAry[6].parent) {
            //     this.UnlockAry[6].top = 0
            //     this.UnlockAry[6].left = 0
            //     this.UnlockAry[6].y = 0;
            //     this.UnlockAry[6].x = 0;
            //     this.UnlockAry[6].height = Scene_data.stageHeight / UIData.Scale;
            //     this.UnlockAry[6].width = Scene_data.stageWidth / UIData.Scale;
            // }
            _super.prototype.resize.call(this);
            if (this.teamList) {
                this.teamList.left = this.a_index.parent.x / UIData.Scale + this.a_index.x;
                this.teamList.top = this.a_index.parent.y / UIData.Scale + this.a_index.y;
            }
        };
        TeamUiPanel.prototype.chgTeam = function () {
            var hasteam = false;
            var isleader = false;
            if (GuidData.team) {
                hasteam = true;
                //有队伍
                if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                    //我是队长
                    isleader = true;
                }
            }
            this.setUiListVisibleByItem(this.unteamUi, !hasteam);
            this.setUiListVisibleByItem(this.leaderUi, hasteam && isleader);
            this.setAutoState();
        };
        TeamUiPanel.prototype.setAutoState = function () {
            if (GuidData.team) {
                this.leaderUi[0].goToAndStop(GuidData.team.getTeamAutoMatch() == 0 ? 0 : 1);
            }
            else {
                this.unteamUi[0].goToAndStop(GuidData.player.getTeamAutoMatch() == 0 ? 0 : 1);
            }
        };
        TeamUiPanel.prototype.refreshType = function ($vo) {
            this._curTypeVo = $vo;
            var str = $vo.tab.tab.name + "(" + $vo.minlev + "-" + $vo.maxlev + ")";
            LabelTextFont.writeTextAutoCenter(this._bgRender.uiAtlas, this.a_target.skinName, str, 16, ColorType.Brown7a2f21, 200, true);
        };
        TeamUiPanel.prototype.drawExp = function () {
            var membernum = 0;
            if (GuidData.team) {
                membernum = GuidData.team.getTeamMemberNum();
            }
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_exptxt.skinName, ColorType.Brown7a2f21 + "经验加成: " + ColorType.Green2ca937 + team.TeamModel.getInstance().getExp() + "%", 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_membernum.skinName, ColorType.Brown7a2f21 + "队员: " + ColorType.Green2ca937 + "x" + membernum, 16, TextAlign.LEFT);
        };
        TeamUiPanel.prototype.show = function ($tabvo) {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.chgTeam();
            if (!this.teamList) {
                this.teamList = new TeamList;
                this.teamList.init(this._bgRender.uiAtlas);
            }
            this.teamList.show();
            this.refreshType($tabvo);
            this.drawExp();
            this.resize();
        };
        TeamUiPanel.prototype.hide = function () {
            if (this.teamList) {
                this.teamList.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        };
        TeamUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.w_close:
                    if (this.PopautoMacth()) {
                        return;
                    }
                    ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.HIDE_TEAM_PANEL));
                    break;
                case this.invitationBtn:
                    if (this.PopautoMacth()) {
                        return;
                    }
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.INVITATION_LIST_TEAM_PANEL));
                    break;
                // case this.left_arrow:
                //     this.curchapterId--;
                //     break;
                default:
                    break;
            }
        };
        return TeamUiPanel;
    }(WindowUi));
    team.TeamUiPanel = TeamUiPanel;
    /**
     * 组队list
     */
    var TeamList = /** @class */ (function (_super) {
        __extends(TeamList, _super);
        function TeamList() {
            return _super.call(this) || this;
        }
        TeamList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        TeamList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, TeamListRender, 570, 291, 0, 97, 3, 256, 512, 1, 3, 1);
        };
        TeamList.prototype.refreshDataByNewData = function () {
            var hasteam = false;
            if (GuidData.team) {
                hasteam = true;
                //有队伍
            }
            var teammemberary = team.TeamModel.getInstance().getAutoList();
            if (hasteam) {
                teammemberary = GuidData.team.getTeamItemAry();
                var isleader = GuidData.player.getGuid() == GuidData.team.getTeamLeaderGuid();
                for (var i = 0; i < teammemberary.length; i++) {
                    if (teammemberary[i].guid != GuidData.player.getGuid()) {
                        if (isleader) {
                            teammemberary[i].items = [0, 12];
                        }
                        else {
                            teammemberary[i].items = [0];
                        }
                    }
                }
            }
            var $sListItemData = this.getData(teammemberary, hasteam);
            this.refreshData($sListItemData);
        };
        TeamList.prototype.getData = function ($data, $hasteam) {
            var autonum = GuidData.player.getTeamAutoMatch();
            if ($hasteam) {
                autonum = GuidData.team.getTeamAutoMatch();
            }
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = autonum; //是否自动匹配中
                ary.push(item);
            }
            return ary;
        };
        TeamList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        };
        TeamList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return TeamList;
    }(SList));
    team.TeamList = TeamList;
    var TeamListRender = /** @class */ (function (_super) {
        __extends(TeamListRender, _super);
        function TeamListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TeamListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var topRender = $customizeRenderAry[0];
            this.Asicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asicon", 24, 11, 68, 68);
            $container.addChild(this.Asicon);
            this.Asicon.addEventListener(InteractiveEvent.Up, this.iconClick, this);
            this.Ashuawen = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ashuawen", 409, 9, 156, 80);
            $container.addChild(this.Ashuawen);
            this.Asleader = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Asleader", 0, 0, 33, 54);
            $container.addChild(this.Asleader);
            this.Aswaittxt = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Aswaittxt", 229, 36, 126, 22);
            $container.addChild(this.Aswaittxt);
            this.Asbtn = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Asbtn", 430, 19, 114, 46);
            $container.addChild(this.Asbtn);
            this.Asbtn.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Asname = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Asname", 111, 19, 100, 20);
            $container.addChild(this.Asname);
            this.Aslev = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Aslev", 111, 49, 100, 20);
            $container.addChild(this.Aslev);
            this.Asbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Asbg", 0, 0, 570, 94, 22, 20);
            $container.addChild(this.Asbg);
        };
        TeamListRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            if (this.itdata.id == 0 && vo.guid == "") {
                this.setnull();
            }
            else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Asbg.skinName, UIData.publicUi, PuiData.TEAMLISTBG);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Ashuawen.skinName, "Huawen");
                if (vo.guid != "") {
                    var isleader = GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid(); //我是不是队长
                    team.TeamModel.getInstance().loadRolePic(vo.icon, this.Asicon, vo.state != SharedDef.GROUP_MEMBER_STATE_OFFLINE);
                    UiDraw.clearUI(this.Aswaittxt);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Asname.skinName, getBaseName(vo.name), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Aslev.skinName, vo.lev + "级", 16, TextAlign.LEFT, ColorType.Green2ca937);
                    if (GuidData.team.getTeamLeaderGuid() == vo.guid) {
                        UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asleader.skinName, "Leader");
                    }
                    else {
                        UiDraw.clearUI(this.Asleader);
                    }
                    //按钮逻辑处理
                    if (isleader) {
                        if (GuidData.player.getGuid() == vo.guid) {
                            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asbtn.skinName, "Btnexit");
                        }
                        else {
                            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asbtn.skinName, "BtnKick");
                        }
                    }
                    else {
                        if (GuidData.player.getGuid() == vo.guid) {
                            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asbtn.skinName, "Btnexit");
                        }
                        else {
                            UiDraw.clearUI(this.Asbtn);
                        }
                    }
                }
                else {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asicon.skinName, "Iconwait");
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Aswaittxt.skinName, "Txtwait");
                    UiDraw.clearUI(this.Asbtn);
                    UiDraw.clearUI(this.Asleader);
                    UiDraw.clearUI(this.Aslev);
                    UiDraw.clearUI(this.Asname);
                }
            }
        };
        TeamListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                //如果对象不存在就setnull
                this.setnull();
            }
        };
        TeamListRender.prototype.iconClick = function (evt) {
            var _this = this;
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                if ($vo.guid != GuidData.player.getGuid()) {
                    // this.showPop(evt);
                    PopMenuUtil.show(this.itdata, function (value) { _this.popBackFun(value); }, evt.x, evt.y);
                }
            }
        };
        TeamListRender.prototype.popBackFun = function (value) {
            if (value == 0) {
                //查看信息
                NetManager.getInstance().protocolos.get_player_overview(this.itdata.data.guid);
            }
            else if (value == 12) {
                NetManager.getInstance().protocolos.group_give_captain(this.itdata.data.posidx);
            }
        };
        TeamListRender.prototype.equClick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                var isleader = false;
                if (GuidData.team) {
                    isleader = GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid(); //我是不是队长
                }
                if (GuidData.player.getGuid() == vo.guid) {
                    //退出队伍
                    NetManager.getInstance().protocolos.group_quit();
                }
                else {
                    if (isleader) {
                        //踢出队伍
                        NetManager.getInstance().protocolos.group_kick(vo.posidx);
                    }
                }
            }
        };
        TeamListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Asbg);
            UiDraw.clearUI(this.Asicon);
            UiDraw.clearUI(this.Ashuawen);
            UiDraw.clearUI(this.Asleader);
            UiDraw.clearUI(this.Aswaittxt);
            UiDraw.clearUI(this.Asbtn);
            UiDraw.clearUI(this.Asname);
            UiDraw.clearUI(this.Aslev);
        };
        return TeamListRender;
    }(SListItem));
    team.TeamListRender = TeamListRender;
})(team || (team = {}));
//# sourceMappingURL=TeamUiPanel.js.map