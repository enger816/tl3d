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
var leftui;
(function (leftui) {
    var LeftUiModule = /** @class */ (function (_super) {
        __extends(LeftUiModule, _super);
        function LeftUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LeftUiModule.prototype.getModuleName = function () {
            return "LeftUiModule";
        };
        LeftUiModule.prototype.listProcessors = function () {
            return [new LeftUiProcessor()];
        };
        return LeftUiModule;
    }(Module));
    leftui.LeftUiModule = LeftUiModule;
    var LeftUiEvent = /** @class */ (function (_super) {
        __extends(LeftUiEvent, _super);
        function LeftUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LeftUiEvent.SHOW_LEFT_UI_PANEL = "SHOW_LEFT_UI_PANEL";
        LeftUiEvent.HIDE_LEFT_UI_PANEL = "HIDE_LEFT_UI_PANEL";
        LeftUiEvent.REFRESH_QUEST_EVENT = "REFRESH_QUEST_EVENT";
        LeftUiEvent.REFRESH_GROUP_EVENT = "REFRESH_GROUP_EVENT";
        LeftUiEvent.LEFT_HANGUP_BASE_REFRESH = "LEFT_HANGUP_BASE_REFRESH"; // 基础挂机数据更新
        return LeftUiEvent;
    }(BaseEvent));
    leftui.LeftUiEvent = LeftUiEvent;
    var LeftUiProcessor = /** @class */ (function (_super) {
        __extends(LeftUiProcessor, _super);
        function LeftUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LeftUiProcessor.prototype.getName = function () {
            return "LeftUiProcessor";
        };
        LeftUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof LeftUiEvent) {
                var $topUiEvent = $event;
                if ($topUiEvent.type == LeftUiEvent.SHOW_LEFT_UI_PANEL) {
                    this.showPanel();
                }
                if ($topUiEvent.type == LeftUiEvent.LEFT_HANGUP_BASE_REFRESH) {
                    //   this.showEffect();
                }
                if ($topUiEvent.type == LeftUiEvent.REFRESH_GROUP_EVENT) {
                    if (this.leftUiPanel) {
                        this.leftUiPanel.refreshGroupPanel();
                    }
                }
                if ($topUiEvent.type == LeftUiEvent.HIDE_LEFT_UI_PANEL) {
                    this.hidePanel();
                }
                if ($topUiEvent.type == LeftUiEvent.REFRESH_QUEST_EVENT) {
                    if (this.leftUiPanel) {
                        this.leftUiPanel.refreshQuestPanel();
                        if (GuidData.map.isBaseMap() || (GuidData.map && GuidData.map.tbMapVo && GuidData.map.tbMapVo.inst_sub_type == 10)) {
                            this.questFinishWalkToNextNpc();
                            quest.QuestModel.getInstance().restNpcQuestTittle();
                        }
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $EngineEvent = $event;
                if ($EngineEvent.type == EngineEvent.MONEY_CHANGE) {
                    if (this.leftUiPanel) {
                        this.leftUiPanel.refreshQuestPanel();
                        //console.log("刷新任务")
                    }
                }
            }
            if ($event instanceof chgfish.ChgfishEvent) {
                var $chgfishevent = $event;
                if ($chgfishevent.type == chgfish.ChgfishEvent.REFRESH_Chgfish_EVENT) {
                    if (this.leftUiPanel) {
                        this.leftUiPanel.showChange();
                    }
                }
            }
        };
        LeftUiProcessor.prototype.showEffect = function () {
            var $data = new msgtip.MsgEffectsMoveData();
            var $pos = new Vector2D(UIData.designWidth / 2, UIData.designHeight / 2);
            $data.startTM = TimeUtil.getTimer() + random(200);
            $data.endTM = $data.startTM + 500;
            $data.pos = $pos;
            $data.MONEY_TYPE = 1;
            $data.bezierPos = new Vector2D($pos.x + Math.random() * 400 - 200, $pos.y + Math.random() * 400 - 200);
            $data.toPos = new Vector2D(150, 178);
            var $MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_EFFECTS_DATA);
            $MsgTipEvent.data = $data;
            ModuleEventManager.dispatchEvent($MsgTipEvent);
        };
        LeftUiProcessor.prototype.questFinishWalkToNextNpc = function () {
            if (GameInstance.questMoveVo) {
                quest.QuestModel.getInstance().walkToNewMainQuest();
            }
        };
        LeftUiProcessor.prototype.hidePanel = function () {
            if (this.leftUiPanel) {
                this.leftUiPanel.hide();
            }
        };
        LeftUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.leftUiPanel) {
                this.leftUiPanel = new leftui.LeftUiPanel();
            }
            this.leftUiPanel.load(function () {
                if (GuidData.map.isFamilyScene()) {
                    //    this.leftUiPanel.tabId = 1;
                }
                else {
                    //     this.leftUiPanel.tabId = 0;
                }
                if (GuidData.map.isAdventureBossScene()) {
                    AotuSkillManager.getInstance().aotuBattle = true;
                }
                _this.leftUiPanel.show();
            }, false);
        };
        LeftUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new LeftUiEvent(LeftUiEvent.SHOW_LEFT_UI_PANEL),
                new LeftUiEvent(LeftUiEvent.HIDE_LEFT_UI_PANEL),
                new LeftUiEvent(LeftUiEvent.LEFT_HANGUP_BASE_REFRESH),
                new LeftUiEvent(LeftUiEvent.REFRESH_QUEST_EVENT),
                new LeftUiEvent(LeftUiEvent.REFRESH_GROUP_EVENT),
                new chgfish.ChgfishEvent(chgfish.ChgfishEvent.REFRESH_Chgfish_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
            ];
        };
        return LeftUiProcessor;
    }(BaseProcessor));
    leftui.LeftUiProcessor = LeftUiProcessor;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftUiProcessor.js.map