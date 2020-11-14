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
var faction;
(function (faction) {
    var FactionHonorPanel = /** @class */ (function (_super) {
        __extends(FactionHonorPanel, _super);
        function FactionHonorPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._baseUiAtlas = new UIAtlas();
            return _this;
        }
        FactionHonorPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            _super.prototype.dispose.call(this);
        };
        FactionHonorPanel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                this.hide();
            }
        };
        FactionHonorPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/faction/factionhonor/factionhonor.xml", "ui/uidata/faction/factionhonor/factionhonor.png", function () { _this.loadConfigCom(); });
        };
        FactionHonorPanel.prototype.loadConfigCom = function () {
            this.applyLoadComplete();
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            this.layer = 500;
            this.resize();
        };
        FactionHonorPanel.prototype.initUI = function () {
            this.addUIList(["t_bg", "t_info"], this.winmidRender);
            this._nocharUI = this._bgRender.getComponent("t_xuwei");
            this.addUIList(["t_ls_bg", "t_title"], this._baseRender);
            this._heroNameBg = this._bgRender.getComponent("t_name_bg");
            this._btn1 = this.addChild(this._bgRender.getComponent("t_btn1"));
            this._btn1.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this._btn2 = this.addChild(this._bgRender.getComponent("t_btn2"));
            this._btn2.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this._lsLab = this.addChild(this._topRender.getComponent("t_ls_lab"));
            this._lsBtn = this.addChild(this._topRender.getComponent("t_reward"));
            this._heroName = this.addChild(this._topRender.getComponent("t_name"));
            this._lsBtn.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this._factionName = this.addChild(this._baseRender.getComponent("t_lab1"));
            var ui;
            ui = this.addChild(this._baseRender.getComponent("t_lab2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "王者盟主特权", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            ui = this.addChild(this._baseRender.getComponent("t_lab3"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "王者家族成员每日俸禄", 16, TextAlign.LEFT, ColorType.Whitefff4d6);
            //this._rewardList = new Array;
            //this._rewardDayList = new Array;
            var obj = TableData.getInstance().getData(TableData.tb_faction_match_champion, 1);
            for (var i = 0; i < 2; i++) {
                var ui = this.addChild(this._baseRender.getComponent("t_r" + i));
                var item = obj.championReward[i];
                if (item) {
                    IconManager.getInstance().drawItemIcon40(ui, item[0], item[1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon40(ui, 0, 0);
                }
            }
            for (var i = 0; i < 3; i++) {
                var ui = this.addChild(this._baseRender.getComponent("t_ri" + i));
                var item = obj.dailyReward[i];
                if (item) {
                    IconManager.getInstance().drawItemIcon40(ui, item[0], item[1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon40(ui, 0, 0);
                }
            }
            this.refreshInfo();
        };
        //
        FactionHonorPanel.prototype.btnClick = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            if ($e.target == this._btn1) {
                this.hide();
                if (GuidData.globelValue.getFactionLeagueSession() > 0) {
                    ModulePageManager.openPanel(SharedDef.MODULE_FACTION, SharedDef.MODULE_FACTION_WAR);
                }
                else {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "开服第三天开启", 99);
                }
                //ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.SHOW_LEAGUE_EVENT));
            }
            else if ($e.target == this._btn2) {
                NetManager.getInstance().protocolos.pick_faction_match_champion_daily_reward();
                this.removeChild(this._btn2);
            }
            else if ($e.target == this._lsBtn) {
                this.showRewardPanel();
            }
        };
        FactionHonorPanel.prototype.refreshInfo = function () {
            var data = GuidData.globelValue.getFactionHonorInfo();
            var facName = getBaseName(data.name);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._factionName.skinName, facName, 18, TextAlign.CENTER, ColorType.Whitefff4d6);
            var lsStr = ColorType.Whitefff4d6 + "连胜次数：" + ColorType.colorff7200 + data.ls + "次";
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._lsLab.skinName, lsStr, 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._heroName.skinName, getBaseName(data.hname), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            if (data.guid != "") {
                if (this._nocharUI.parent) {
                    this.removeChild(this._nocharUI);
                }
                this.addPersonChar();
                this.addChild(this._heroName);
                this.addChild(this._heroNameBg);
                this.showDisPlay.setBaseRoleAvatar(data.coat, data.char);
                this.showDisPlay.setBaseRoleWeapon(data.weapon, data.char);
                if (data.wing > 0) {
                    this.wingDisplay.setAvatar(GuidData.grow.getWingModelByID(data.wing));
                }
            }
            else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._factionName.skinName, "虚席以待", 18, TextAlign.CENTER, ColorType.Whitefff4d6);
                this.addChild(this._nocharUI);
            }
            if (GuidData.faction && data.guid == GuidData.faction.getGuid() && GuidData.player.getFactionHonorReward()) {
                this.addChild(this._btn2);
            }
            else {
                this.removeChild(this._btn2);
            }
        };
        FactionHonorPanel.prototype.addPersonChar = function () {
            if (this.showDisPlay) {
                return;
            }
            this.showDisPlay = new Person2DChar();
            this.winmidRender.addModel(this.showDisPlay);
            this.wingDisplay = new Person2DChar();
            this.wingDisplay.needUIUrl = false;
            this.winmidRender.addModel(this.wingDisplay);
            this.wingDisplay.setBind(this.showDisPlay, SceneChar.WING_SLOT);
            //this.setWing();
            this.resize();
        };
        FactionHonorPanel.prototype.showRewardPanel = function () {
            var _this = this;
            if (!this._rewardPanel) {
                this._rewardPanel = new FactionHonorRewardPanel();
            }
            this._rewardPanel.load(function () {
                _this._rewardPanel.show();
            });
        };
        FactionHonorPanel.prototype.show = function () {
            this.layer = 600;
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 6]);
            SceneManager.getInstance().render = false;
            if (this._baseRender.uiAtlas) {
                this.refreshInfo();
            }
            var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        };
        FactionHonorPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        FactionHonorPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = 4.5 * UIData.Scale;
                this.showDisPlay.x = -80 * UIData.Scale;
                this.showDisPlay.y = -100 * UIData.Scale;
            }
            if (this.wingDisplay) {
                this.wingDisplay.resize();
                this.wingDisplay.scale = 4.5 * UIData.Scale;
            }
        };
        return FactionHonorPanel;
    }(WindowUi));
    faction.FactionHonorPanel = FactionHonorPanel;
    var FactionHonorRewardPanel = /** @class */ (function (_super) {
        __extends(FactionHonorRewardPanel, _super);
        //private _topRender: UIRenderComponent;
        //private uiAtlasComplet: boolean = false
        function FactionHonorRewardPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new UIAtlas;
            return _this;
        }
        FactionHonorRewardPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/faction/factionhonor/factionhonorreward.xml", "ui/uidata/faction/factionhonor/factionhonorreward.png", function () { _this.loadConfigCom(); });
        };
        FactionHonorRewardPanel.prototype.loadConfigCom = function () {
            this.addChild(this._baseRender.getComponent("t_title"));
            this.addChild(this._baseRender.getComponent("t_line"));
            this._txt = this.addChild(this._baseRender.getComponent("t_txt"));
            var num = GuidData.globelValue.getFactionHonorLS();
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._txt.skinName, ColorType.Brownd662c0d + "当前连胜次数:" + ColorType.Green2ca937 + num + "次", 16, TextAlign.CENTER);
            this.initList();
            this.applyLoadComplete();
        };
        FactionHonorRewardPanel.prototype.initList = function () {
            this._rlist = new FactionHonorRewardList();
            this._rlist.init(this._baseRender.uiAtlas);
            if (this.hasStage) {
                this._rlist.show();
            }
        };
        FactionHonorRewardPanel.prototype.show = function () {
            this.layer = 602;
            UIManager.getInstance().addUIContainer(this);
            if (this._rlist) {
                this._rlist.layer = 603;
                this._rlist.show();
            }
        };
        FactionHonorRewardPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
            }
        };
        FactionHonorRewardPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this._rlist) {
                this._rlist.hide();
            }
        };
        return FactionHonorRewardPanel;
    }(WindowCentenMin));
    faction.FactionHonorRewardPanel = FactionHonorRewardPanel;
    var FactionHonorRewardList = /** @class */ (function (_super) {
        __extends(FactionHonorRewardList, _super);
        function FactionHonorRewardList() {
            return _super.call(this) || this;
        }
        FactionHonorRewardList.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            // ArenaDjRewardListItemRender.baseAtlas = $atlas;
            this.initData();
        };
        FactionHonorRewardList.prototype.initData = function () {
            var ary = new Array();
            var w = 420;
            var h = 345;
            this.setData(ary, FactionHonorRewardListItemRender, w, h, 400, 86, 4, 256, 512, 1, 7);
            this.center = 35;
            this.middle = -5;
            this.setShowLevel(4);
            this.resize();
        };
        FactionHonorRewardList.prototype.reget = function () {
            this.refreshData(this.getDataAry());
        };
        FactionHonorRewardList.prototype.getDataAry = function () {
            var ary = new Array();
            var obj = TableData.getInstance().getTableByName(TableData.tb_faction_match_winstrike);
            obj = obj.data;
            var i = 0;
            for (var key in obj) {
                var data = new SListItemData();
                data.data = obj[key];
                data.id = i;
                ary.push(data);
                i++;
            }
            return ary;
        };
        FactionHonorRewardList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.reget();
        };
        FactionHonorRewardList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return FactionHonorRewardList;
    }(SList));
    faction.FactionHonorRewardList = FactionHonorRewardList;
    var FactionHonorRewardListItemRender = /** @class */ (function (_super) {
        __extends(FactionHonorRewardListItemRender, _super);
        function FactionHonorRewardListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionHonorRewardListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "s_bg", 0, 0, 346, 83);
            $container.addChild(this._ibg);
            this._name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_lab", 18, 32, 120, 22);
            $container.addChild(this._name);
            this._iconAry = new Array;
            var ui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon0", 159, 10, 68, 68);
            $container.addChild(ui);
            this._iconAry.push(ui);
            var ui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon1", 229, 10, 68, 68);
            $container.addChild(ui);
            this._iconAry.push(ui);
            //UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.STATEUP_LISTBG);
        };
        FactionHonorRewardListItemRender.prototype.onclick = function ($e) {
            //NetManager.getInstance().protocolos.doujiantai_first_reward(this.itdata.data.data.id);
        };
        FactionHonorRewardListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && this.itdata.data) {
                this.applyRender();
            }
        };
        FactionHonorRewardListItemRender.prototype.applyRender = function () {
            var bd = this.itdata.data;
            if (this.itdata.id % 2 == 0) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            else {
                UiDraw.clearUI(this._ibg);
            }
            //IconManager.getInstance().drawItemIcon60(this._icon, 2, 2);
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, this.itdata.data.name, 16, TextAlign.CENTER,ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, ColorType.Brownd662c0d + "连胜" + bd.id + "次奖励", 16, TextAlign.LEFT);
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._btn.skinName, "按钮" + bd.state, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            // UiDraw.clearUI(this._btn);
            // this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png",this._btn.skinName);
            var rary = bd.winReward;
            for (var i = 0; i < this._iconAry.length; i++) {
                if (rary[i]) {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], rary[i][0], rary[i][1]);
                }
                else {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 1);
                }
            }
        };
        return FactionHonorRewardListItemRender;
    }(SListItem));
    faction.FactionHonorRewardListItemRender = FactionHonorRewardListItemRender;
})(faction || (faction = {}));
//# sourceMappingURL=FactionHonorPanel.js.map