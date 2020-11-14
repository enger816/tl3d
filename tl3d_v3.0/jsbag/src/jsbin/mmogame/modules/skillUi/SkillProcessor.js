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
var skillUi;
(function (skillUi) {
    var SkillUiModule = /** @class */ (function (_super) {
        __extends(SkillUiModule, _super);
        function SkillUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillUiModule.prototype.getModuleName = function () {
            return "SkillUiModule";
        };
        SkillUiModule.prototype.listProcessors = function () {
            return [new SkillUiProcessor()];
        };
        return SkillUiModule;
    }(Module));
    skillUi.SkillUiModule = SkillUiModule;
    var SkillUiEvent = /** @class */ (function (_super) {
        __extends(SkillUiEvent, _super);
        function SkillUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示技能面板
        SkillUiEvent.SHOW_SKILLUI_EVENT = "SHOW_SKILLUI_EVENT";
        //隐藏技能面板
        SkillUiEvent.HIDE_SKILLUI_EVENT = "HIDE_SKILLUI_EVENT";
        //技能列表事件
        SkillUiEvent.SELECT_SKILLUI_TYPE_EVENT = "SELECT_SKILLUI_TYPE_EVENT";
        //显示“技能的详细信息”事件
        SkillUiEvent.SELECT_SKILLCONTENT_TYPE_EVENT = "SELECT_SKILLCONTENT_TYPE_EVENT";
        //打开获取真气面板
        SkillUiEvent.SHOW_MAXVPPANEL_EVENT = "SHOW_MAXVPPANEL_EVENT";
        //关闭获取真气面板
        SkillUiEvent.HIDE_MAXVPPANEL_EVENT = "HIDE_MAXVPPANEL_EVENT";
        //技能有更新，当页面有打开时，需要更新数据
        SkillUiEvent.RESET_SKILL_UI_DATA = "RESET_SKILL_UI_DATA";
        SkillUiEvent.SKILL_UP_EVENT = "SKILL_UP_EVENT";
        return SkillUiEvent;
    }(BaseEvent));
    skillUi.SkillUiEvent = SkillUiEvent;
    var SkillUiProcessor = /** @class */ (function (_super) {
        __extends(SkillUiProcessor, _super);
        function SkillUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _skillUiPanel: SkillUiPanel
        SkillUiProcessor.prototype.getName = function () {
            return "SkillUiProcessor";
        };
        SkillUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SkillUiEvent) {
                var $skillUIEvent = $event;
                if ($skillUIEvent.type == SkillUiEvent.SHOW_SKILLUI_EVENT) {
                    this.showNewUI();
                    //this.showUi();
                }
                else if ($skillUIEvent.type == SkillUiEvent.HIDE_SKILLUI_EVENT) {
                    //this.hideUi()
                }
                else if ($skillUIEvent.type == SkillUiEvent.SKILL_UP_EVENT) {
                    this.showSkillUpEff();
                }
                else if ($skillUIEvent.type == SkillUiEvent.RESET_SKILL_UI_DATA) {
                    this.refreshNode();
                    this.resetSkillUiData();
                }
            }
            else if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.MONEY_CHANGE || $engineEvent.type == EngineEvent.SYSTEM_OPEN_EVENT || $engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    this.refreshNode();
                }
                else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.initNode();
                }
            }
            else if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._skillPanel) {
                    this._skillPanel.dispose();
                    this._skillPanel = null;
                    //console.log("释放面板 _skillUiPanel")
                }
            }
        };
        SkillUiProcessor.prototype.resetSkillUiData = function () {
            //    if (this._skillUiPanel) {
            //         this._skillUiPanel.refresh()
            //    }
            if (this._skillPanel && this._skillPanel.hasStage) {
                this._skillPanel.refreshLev();
            }
        };
        SkillUiProcessor.prototype.showNewUI = function () {
            var _this = this;
            if (!this._skillPanel) {
                this._skillPanel = new skillUi.SkillPanel();
            }
            this._skillPanel.load(function () {
                var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);
                _this._skillPanel.show();
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_SPELL;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        SkillUiProcessor.prototype.showSkillUpEff = function () {
            if (this._skillPanel) {
                this._skillPanel.showSkillUpEff();
            }
        };
        SkillUiProcessor.prototype.initNode = function () {
            var $obj = TableData.getInstance().getData(TableData.tb_skill_show, GuidData.player.getCharType());
            var zhudongList = $obj.zhudong_list;
            var beidongList = $obj.passive_list;
            var pnode = RedPointManager.getInstance().getNodeByID(15);
            for (var i = 0; i < zhudongList.length; i++) {
                var node = new RedPointNode();
                node.data = zhudongList[i];
                pnode.addChild(node);
            }
            pnode = RedPointManager.getInstance().getNodeByID(16);
            for (var i = 0; i < beidongList.length; i++) {
                var node = new RedPointNode();
                node.data = beidongList[i];
                pnode.addChild(node);
            }
            this.refreshNode();
        };
        SkillUiProcessor.prototype.refreshNode = function () {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_SPELL, SharedDef.MODULE_SPELL_ALL)) {
                if (GuidData.player.isOpenSystemNeedShow(SharedDef.MODULE_SPELL)) {
                    this.refreshNodeByID(15);
                    this.refreshNodeByID(16);
                }
                if (this._skillPanel) {
                    this._skillPanel.showRedPoint();
                }
            }
        };
        SkillUiProcessor.prototype.refreshNodeByID = function ($id) {
            var flag = false;
            var ary = RedPointManager.getInstance().getNodeByID($id).children;
            var plev = GuidData.player.getLevel();
            for (var i = 0; i < ary.length; i++) {
                var id = ary[i].data;
                var lev = GuidData.grow.getSkillLev(id);
                var baseData = TableData.getInstance().getData(TableData.tb_skill_base, id);
                if ((baseData.uplevel_id[1] - baseData.uplevel_id[0]) < lev) {
                    ary[i].show = false;
                    continue;
                }
                var levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, baseData.uplevel_id[0] + lev - 1);
                if (lev > 0 && hasEnoughRes(levData.uplevel_cost[0]) && levData.need_level <= plev) {
                    ary[i].show = true;
                    flag = true;
                }
                else {
                    ary[i].show = false;
                }
            }
            return flag;
        };
        SkillUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new SkillUiEvent(SkillUiEvent.SHOW_SKILLUI_EVENT),
                new SkillUiEvent(SkillUiEvent.HIDE_SKILLUI_EVENT),
                new SkillUiEvent(SkillUiEvent.SELECT_SKILLUI_TYPE_EVENT),
                new SkillUiEvent(SkillUiEvent.SELECT_SKILLCONTENT_TYPE_EVENT),
                new SkillUiEvent(SkillUiEvent.SHOW_MAXVPPANEL_EVENT),
                new SkillUiEvent(SkillUiEvent.HIDE_MAXVPPANEL_EVENT),
                new SkillUiEvent(SkillUiEvent.RESET_SKILL_UI_DATA),
                new SkillUiEvent(SkillUiEvent.SKILL_UP_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return SkillUiProcessor;
    }(BaseProcessor));
    skillUi.SkillUiProcessor = SkillUiProcessor;
})(skillUi || (skillUi = {}));
//# sourceMappingURL=SkillProcessor.js.map