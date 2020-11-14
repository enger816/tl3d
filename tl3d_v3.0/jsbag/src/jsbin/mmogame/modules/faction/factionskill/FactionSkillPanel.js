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
    var FactionSkillPanel = /** @class */ (function (_super) {
        __extends(FactionSkillPanel, _super);
        function FactionSkillPanel() {
            var _this = _super.call(this) || this;
            _this._levelLimit = 0;
            _this._lastSkillID = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._slist = new FactionSkillList();
            _this._slist.mainPanel = _this;
            _this._baseUiAtlas = new UIAtlas();
            return _this;
        }
        FactionSkillPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            if (this._slist) {
                this._slist.dispose();
                this._slist = null;
            }
            _super.prototype.dispose.call(this);
        };
        FactionSkillPanel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                this.hide();
            }
        };
        FactionSkillPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/faction/factionskill/factionskill.xml", "ui/uidata/faction/factionskill/factionskill.png", function () { _this.loadConfigCom(); });
        };
        FactionSkillPanel.prototype.loadConfigCom = function () {
            this.applyLoadComplete();
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            this._slist.init(this._baseUiAtlas);
            this.resize();
        };
        FactionSkillPanel.prototype.initUI = function () {
            this.addUIList(["t_win_bg1", "t_win_bg2"], this.winmidRender);
            this.addUIList(["t_win_title", "t_line1", "t_line2", "t_lab_bg0", "t_lab_bg1"], this._bgRender);
            this._skillIcon = this.addChild(this._baseRender.getComponent("t_icon"));
            this._skillName = this.addChild(this._baseRender.getComponent("t_lab1"));
            this._skillLev = this.addChild(this._baseRender.getComponent("t_lab2"));
            var ui;
            ui = this.addChild(this._baseRender.getComponent("t_lab3"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "当前效果", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._skillCurLevDesc = this.addChild(this._baseRender.getComponent("t_lab4"));
            ui = this.addChild(this._baseRender.getComponent("t_lab5"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "下级效果", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._skillNextLevDesc = this.addChild(this._baseRender.getComponent("t_lab6"));
            ui = this.addChild(this._baseRender.getComponent("t_lab7"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "升级消耗", 16, TextAlign.CENTER, ColorType.colorb96d49);
            this._skillCost0 = this.addChild(this._baseRender.getComponent("t_lab8"));
            this._skillCost1 = this.addChild(this._baseRender.getComponent("t_lab13"));
            this.costIcon0 = this.addChild(this._baseRender.getComponent("t_cost_icon1"));
            this.costIcon1 = this.addChild(this._baseRender.getComponent("t_cost_icon2"));
            ui = this.addChild(this._baseRender.getComponent("t_cost_lab"));
            ui = this.addChild(this._baseRender.getComponent("t_cost_lab1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "消耗:", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._skillMax = this.addChild(this._baseRender.getComponent("t_lab9"));
            ui = this.addChild(this._baseRender.getComponent("t_lab10"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "(提高技能坊等级可以提高技能等级上限)", 14, TextAlign.CENTER, ColorType.colorcd2000);
            ui = this.addChild(this._baseRender.getComponent("t_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.upLev, this);
            this._factionLev = this.addChild(this._baseRender.getComponent("t_lab11"));
            this._factionGong = this.addChild(this._baseRender.getComponent("t_lab12"));
            //this.drawSkill();
            this.drawBase();
            this.drawMax();
        };
        FactionSkillPanel.prototype.upLev = function ($e) {
            if (this.curData) {
                if (this.curData.lev >= this._levelLimit) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "技能等级已达上限", 99);
                    return;
                }
                var idx = 10000 * this.curData.id + this.curData.lev + 1;
                var tabObj = TableData.getInstance().getData(TableData.tb_faction_skill_lvup, idx);
                if (tabObj) {
                    if (!hasEnoughRes(tabObj.cost[0])) {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前家族贡献不足，无法升级", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = 6;
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }
                }
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_SKILL_LVUP, this.curData.id, 0, "", "");
            }
        };
        FactionSkillPanel.prototype.dataChg = function () {
            this._slist.dataChg();
        };
        FactionSkillPanel.prototype.drawMax = function () {
            var vo = faction.FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_SKILL);
            var tabObj = TableData.getInstance().getData(TableData.tb_faction_skill_building, vo.level);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillMax.skinName, ColorType.Brown7a2f21 + "当前技能等级上限：" + ColorType.colorff7200 + tabObj.level_limit, 16, TextAlign.LEFT);
            UiDraw.drawTxtLab(this._factionLev, ColorType.Brown7a2f21 + "家族技能坊Lv:" + vo.level, 16, TextAlign.CENTER);
            this._levelLimit = tabObj.level_limit;
        };
        FactionSkillPanel.prototype.drawSkill = function ($data) {
            var objskill = tb.TB_skill_base.get_TB_skill_base($data.skillID);
            if (this._lastSkillID != $data.skillID) {
                IconManager.getInstance().drawCircleIcon(this._skillIcon, 2, $data.skillID);
                this._lastSkillID = $data.skillID;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillName.skinName, objskill.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillLev.skinName, "LV" + $data.lev, 16, TextAlign.LEFT, ColorType.colorff7200);
            if ($data.lev == 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillCurLevDesc.skinName, "无", 16, TextAlign.LEFT, ColorType.Green2ca937);
            }
            else {
                var desc = tb.SkillDataVo.getSkillDesc($data.skillID, $data.lev);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillCurLevDesc.skinName, desc, 16, TextAlign.LEFT, ColorType.Green2ca937);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillNextLevDesc.skinName, tb.SkillDataVo.getSkillDesc($data.skillID, $data.lev + 1), 16, TextAlign.LEFT, ColorType.Green2ca937);
            var idx = 10000 * $data.id + $data.lev + 1;
            var tabObj = TableData.getInstance().getData(TableData.tb_faction_skill_lvup, idx);
            if (tabObj) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillCost0.skinName, ColorType.color4392ff + tabObj.cost[0][1], 16, TextAlign.CENTER);
                //UiDraw.drawCost($ctx, UIuitl.getInstance().costtype($vo.typeId), new Rectangle(0, 0, 35, 35), UIData.publicUi);
                UiDraw.drawCostUI(this.costIcon0, 0, 0, tabObj.cost[0][0]);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillCost1.skinName, ColorType.color4392ff + tabObj.cost[1][1], 16, TextAlign.CENTER);
                UiDraw.drawCostUI(this.costIcon1, 0, 0, tabObj.cost[1][0]);
            }
            else {
                //console.log("---家族技能等级无----",tabObj,idx,$data.id,$data.lev);
                UiDraw.clearUI(this._skillCost0);
                UiDraw.clearUI(this._skillCost1);
            }
        };
        FactionSkillPanel.prototype.drawBase = function () {
            UiDraw.drawTxtLab(this._factionGong, ColorType.Brown7a2f21 + "家族贡献:" + GuidData.player.getResTypeStr(6), 16, TextAlign.CENTER);
        };
        FactionSkillPanel.prototype.setData = function ($data) {
            this.drawSkill($data);
            this.curData = $data;
        };
        FactionSkillPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 6]);
            SceneManager.getInstance().render = false;
            this._slist.show();
            if (this._baseRender.uiAtlas) {
                this.drawMax();
            }
            var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        };
        FactionSkillPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            SceneManager.getInstance().render = true;
            this._slist.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        return FactionSkillPanel;
    }(WindowUi));
    faction.FactionSkillPanel = FactionSkillPanel;
    var FactionSkillList = /** @class */ (function (_super) {
        __extends(FactionSkillList, _super);
        function FactionSkillList() {
            var _this = _super.call(this) || this;
            _this._hasInit = false;
            return _this;
        }
        FactionSkillList.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            this.initData();
        };
        FactionSkillList.prototype.initData = function () {
            var ary = this.getDataAry();
            var w = 536;
            var h = 380;
            this.setData(ary, FactionSkillListItemRender, w, h, 270, 95, 4, 512, 512, 2, 6, 2);
            this.center = -150;
            this.middle = 5;
            this.setShowLevel(4);
            this._hasInit = true;
            this.setSelectIndex(1);
        };
        FactionSkillList.prototype.refreshAll = function () {
            if (this._hasInit) {
                var ary = this.getDataAry();
                this.refreshData(ary);
            }
        };
        FactionSkillList.prototype.getDataAry = function () {
            var ary = new Array();
            var vo = faction.FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_SKILL);
            var size = TableData.getInstance().getTabSize(TableData.tb_faction_skill_base);
            for (var i = 1; i <= size; i++) {
                var tabObj = TableData.getInstance().getData(TableData.tb_faction_skill_base, i);
                var idata = new Object;
                idata.skillID = tabObj.skill_id;
                idata.lock = vo.level < tabObj.unlock_level;
                idata.lockLev = tabObj.unlock_level;
                idata.lev = GuidData.player.getFactionSkillLv(i);
                idata.id = i;
                var data = new SListItemData();
                data.data = idata;
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        FactionSkillList.prototype.dataChg = function () {
            for (var i = 0; i < this._dataAry.length; i++) {
                var cur = GuidData.player.getFactionSkillLv(i + 1);
                if (this._dataAry[i].data.lev != cur) {
                    this._dataAry[i].data.lev = cur;
                    this._itemList[i].refreshDraw();
                }
            }
        };
        FactionSkillList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //var ary: Array<SListItemData> = this.getDataAry();
            //this.refreshData(ary);
            this.refreshAll();
        };
        FactionSkillList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return FactionSkillList;
    }(SList));
    faction.FactionSkillList = FactionSkillList;
    var FactionSkillListItemRender = /** @class */ (function (_super) {
        __extends(FactionSkillListItemRender, _super);
        function FactionSkillListItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionSkillListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "s_bg", 0, 0, 256, 88, 10, 10);
            $container.addChild(this._ibg);
            this._ibg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this._itme0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon", 15, 10, 68, 68);
            $container.addChild(this._itme0);
            this._imask = this.creatGrid9SUI($customizeRenderAry[0], this.parentTarget.baseAtlas, "s_mask", 0, 0, 256, 88, 10, 10);
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._imask.skinName, UIData.publicUi, PuiData.MASK);
            this._iitem1 = this.creatSUI($customizeRenderAry[1], this.parentTarget.baseAtlas, "s_name", 100, 20, 140, 20);
            $container.addChild(this._iitem1);
            this._iitem2 = this.creatSUI($customizeRenderAry[1], this.parentTarget.baseAtlas, "s_lev", 100, 50, 140, 20);
            $container.addChild(this._iitem2);
            this._container = $container;
        };
        FactionSkillListItemRender.prototype.butClik = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && !this.itdata.data.lock) {
                this.setSelect();
            }
        };
        Object.defineProperty(FactionSkillListItemRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyRender();
                }
                if (val) {
                    this.parentTarget.mainPanel.setData(this.itdata.data);
                }
            },
            enumerable: true,
            configurable: true
        });
        FactionSkillListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyRender();
            }
        };
        FactionSkillListItemRender.prototype.refreshDraw = function () {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, "Lv" + this.itdata.data.lev, 16, TextAlign.LEFT, ColorType.colorff7200);
            if (this._selected) {
                this.parentTarget.mainPanel.setData(this.itdata.data);
            }
        };
        FactionSkillListItemRender.prototype.applyRender = function () {
            if (this.selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_select);
            }
            else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_nselect);
            }
            var lock = this.itdata.data.lock;
            if (lock) {
                if (!this._imask.parent) {
                    this._container.addChild(this._imask);
                }
            }
            else {
                if (this._imask.parent) {
                    this._container.removeChild(this._imask);
                }
            }
            IconManager.getInstance().drawCircleIcon(this._itme0, 2, this.itdata.data.skillID);
            var objskill = tb.TB_skill_base.get_TB_skill_base(this.itdata.data.skillID);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem1.skinName, objskill.name, 16, TextAlign.LEFT, lock ? ColorType.Whitefff4d6 : ColorType.Brown7a2f21);
            if (lock) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, "技能坊等级" + this.itdata.data.lockLev + "级解锁", 16, TextAlign.LEFT, ColorType.Whitefff4d6);
            }
            else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, "Lv" + this.itdata.data.lev, 16, TextAlign.LEFT, ColorType.colorff7200);
            }
        };
        return FactionSkillListItemRender;
    }(SListItem));
    faction.FactionSkillListItemRender = FactionSkillListItemRender;
})(faction || (faction = {}));
//# sourceMappingURL=FactionSkillPanel.js.map