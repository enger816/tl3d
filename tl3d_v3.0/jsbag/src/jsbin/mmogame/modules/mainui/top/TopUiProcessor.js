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
var topui;
(function (topui) {
    var TopUiModule = /** @class */ (function (_super) {
        __extends(TopUiModule, _super);
        function TopUiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiModule.prototype.getModuleName = function () {
            return "TopUiModule";
        };
        TopUiModule.prototype.listProcessors = function () {
            return [new TopUiProcessor()];
        };
        return TopUiModule;
    }(Module));
    topui.TopUiModule = TopUiModule;
    var TopUiEvent = /** @class */ (function (_super) {
        __extends(TopUiEvent, _super);
        function TopUiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiEvent.SHOW_TOP_UI_PANEL = "SHOW_TOP_UI_PANEL";
        TopUiEvent.HIDE_TOP_UI_PANEL = "HIDE_TOP_UI_PANEL";
        TopUiEvent.REFRESH_TOP_LEFT_BUFF = "REFRESH_TOP_LEFT_BUFF";
        TopUiEvent.REFRESH_TOP_LEFT_BLOOD = "REFRESH_TOP_LEFT_BLOOD";
        TopUiEvent.REFRESH_TOP_PANDA = "REFRESH_TOP_PANDA";
        TopUiEvent.REFRESH_TOP_PANDA_TIP = "REFRESH_TOP_PANDA_TIP";
        TopUiEvent.UNIT_FIELD_NOTORIETY = "UNIT_FIELD_NOTORIETY"; // 战斗模式换
        TopUiEvent.SHOW_TOP_PANDA_LIST = "SHOW_TOP_PANDA_LIST";
        TopUiEvent.SHOW_REFILL_POP_PANDA = "SHOW_REFILL_POP_PANDA";
        return TopUiEvent;
    }(BaseEvent));
    topui.TopUiEvent = TopUiEvent;
    var TopUiProcessor = /** @class */ (function (_super) {
        __extends(TopUiProcessor, _super);
        function TopUiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiProcessor.prototype.getName = function () {
            return "TopUiProcessor";
        };
        TopUiProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TopUiEvent) {
                var $topUiEvent = $event;
                if ($topUiEvent.type == TopUiEvent.SHOW_TOP_UI_PANEL) {
                    this.showPanel();
                }
                if ($topUiEvent.type == TopUiEvent.UNIT_FIELD_NOTORIETY) {
                    //console.log("战斗模式换了");
                    RelationManager.getInstance().refresh();
                    if (this.topUiPanel && this.topUiPanel.topHeadPanel && GuidData.map) {
                        this.topUiPanel.topHeadPanel.refresh();
                    }
                }
                if (this.topUiPanel) {
                    if ($topUiEvent.type == TopUiEvent.REFRESH_TOP_PANDA) {
                        if (this.topUiPanel.topPandaPanel) {
                            this.topUiPanel.topPandaPanel.refresh();
                        }
                    }
                    if ($topUiEvent.type == TopUiEvent.HIDE_TOP_UI_PANEL) {
                        this.hidePanel();
                    }
                    if ($topUiEvent.type == TopUiEvent.SHOW_TOP_PANDA_LIST) {
                        if (this.topUiPanel.topPandaPanel) {
                            this.topUiPanel.topPandaPanel.changePandaVisible($topUiEvent.data);
                        }
                    }
                    if ($topUiEvent.type == TopUiEvent.REFRESH_TOP_LEFT_BLOOD) {
                        if (this.topUiPanel.topHeadPanel) {
                            this.topUiPanel.topHeadPanel.refreshBloodBar();
                        }
                    }
                    if ($topUiEvent.type == TopUiEvent.REFRESH_TOP_PANDA_TIP) {
                        this.toppandarefesh($topUiEvent.data);
                    }
                    if ($topUiEvent.type == TopUiEvent.SHOW_REFILL_POP_PANDA) {
                        if (this.topUiPanel && this.topUiPanel.topPandaPanel) {
                            this.topUiPanel.topPandaPanel.getRefillPos();
                        }
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL || $engineEvent.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL || $engineEvent.type == EngineEvent.PLAYER_FIELD_FORCE) {
                    if (this.topUiPanel && this.topUiPanel.topHeadPanel) {
                        this.topUiPanel.topHeadPanel.refresh();
                    }
                }
            }
            if ($event instanceof Hangup.HangupUiEvent) {
                var $hangupEvent = $event;
                if ($hangupEvent.type == Hangup.HangupUiEvent.SETTING_VOLUME_EVENT) {
                    if (this.topUiPanel && this.topUiPanel.topHeadPanel) {
                        this.topUiPanel.topHeadPanel.setSound();
                    }
                }
            }
        };
        TopUiProcessor.prototype.toppandarefesh = function ($data) {
            if (this.topUiPanel.topPandaPanel) {
                this.topUiPanel.topPandaPanel.setTipsData($data);
            }
        };
        TopUiProcessor.prototype.hidePanel = function () {
            if (this.topUiPanel) {
                UIManager.getInstance().removeUIContainer(this.topUiPanel);
            }
        };
        TopUiProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.topUiPanel) {
                this.topUiPanel = new topui.TopUiPanel();
            }
            this.topUiPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.topUiPanel);
                _this.topUiPanel.refresh();
            }, false);
        };
        TopUiProcessor.prototype.listenModuleEvents = function () {
            return [
                new TopUiEvent(TopUiEvent.SHOW_TOP_UI_PANEL),
                new TopUiEvent(TopUiEvent.HIDE_TOP_UI_PANEL),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_LEFT_BUFF),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_LEFT_BLOOD),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_PANDA),
                new TopUiEvent(TopUiEvent.SHOW_TOP_PANDA_LIST),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_PANDA_TIP),
                new TopUiEvent(TopUiEvent.SHOW_REFILL_POP_PANDA),
                new TopUiEvent(TopUiEvent.UNIT_FIELD_NOTORIETY),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new Hangup.HangupUiEvent(Hangup.HangupUiEvent.SETTING_VOLUME_EVENT),
            ];
        };
        return TopUiProcessor;
    }(BaseProcessor));
    topui.TopUiProcessor = TopUiProcessor;
})(topui || (topui = {}));
//# sourceMappingURL=TopUiProcessor.js.map