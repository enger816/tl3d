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
var quest;
(function (quest) {
    var QuestEvent = /** @class */ (function (_super) {
        __extends(QuestEvent, _super);
        function QuestEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tabType = 0;
            return _this;
        }
        QuestEvent.SHOW_DAILY_QUEST_EVENT = "SHOW_DAILY_QUEST_EVENT"; //显示日常任务面板
        QuestEvent.HIDE_DAILY_QUEST_EVENT = "HIDE_DAILY_QUEST_EVENT"; //隐藏日常任务面板
        QuestEvent.REFRESH_DAILY_QUEST_EVENT = "REFRESH_DAILY_QUEST_EVENT"; //更新日常任务面板
        return QuestEvent;
    }(BaseEvent));
    quest.QuestEvent = QuestEvent;
    var QuestModule = /** @class */ (function (_super) {
        __extends(QuestModule, _super);
        function QuestModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QuestModule.prototype.getModuleName = function () {
            return "QuestModule";
        };
        QuestModule.prototype.listProcessors = function () {
            return [new QuestProcessor()];
        };
        return QuestModule;
    }(Module));
    quest.QuestModule = QuestModule;
    var QuestProcessor = /** @class */ (function (_super) {
        __extends(QuestProcessor, _super);
        function QuestProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QuestProcessor.prototype.getName = function () {
            return "QuestProcessor";
        };
        QuestProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof QuestEvent) {
                var $QuestEvent = $event;
                if ($QuestEvent.type == QuestEvent.SHOW_DAILY_QUEST_EVENT) {
                    this.showDailyQuestPanel();
                }
                else if ($QuestEvent.type == QuestEvent.HIDE_DAILY_QUEST_EVENT) {
                    if (this._dailyquestpanel) {
                        this._dailyquestpanel.close();
                    }
                }
                else if ($QuestEvent.type == QuestEvent.REFRESH_DAILY_QUEST_EVENT) {
                    if (this._dailyquestpanel && this._dailyquestpanel.hasStage) {
                        this._dailyquestpanel.refrish();
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._dailyquestpanel) {
                    this._dailyquestpanel.dispose();
                    this._dailyquestpanel = null;
                    //console.log("释放面板 _questPanel")
                }
            }
        };
        QuestProcessor.prototype.showDailyQuestPanel = function () {
            var _this = this;
            if (!this._dailyquestpanel) {
                this._dailyquestpanel = new quest.QuestDailyPanel();
            }
            this._dailyquestpanel.load(function () {
                if (!_this._dailyquestpanel.hasStage) {
                    UIManager.getInstance().addUIContainer(_this._dailyquestpanel);
                    _this._dailyquestpanel.refrish();
                }
            });
        };
        QuestProcessor.prototype.listenModuleEvents = function () {
            return [
                new QuestEvent(QuestEvent.SHOW_DAILY_QUEST_EVENT),
                new QuestEvent(QuestEvent.HIDE_DAILY_QUEST_EVENT),
                new QuestEvent(QuestEvent.REFRESH_DAILY_QUEST_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return QuestProcessor;
    }(BaseProcessor));
    quest.QuestProcessor = QuestProcessor;
})(quest || (quest = {}));
//# sourceMappingURL=QuestProcessor.js.map