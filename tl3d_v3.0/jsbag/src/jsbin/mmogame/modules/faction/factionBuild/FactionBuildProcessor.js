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
    var FactionBuildEvent = /** @class */ (function (_super) {
        __extends(FactionBuildEvent, _super);
        function FactionBuildEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionBuildEvent.SHOW_BUILD_EVENT = "SHOW_BUILD_EVENT";
        FactionBuildEvent.HIDE_BUILD_EVENT = "HIDE_BUILD_EVENT";
        FactionBuildEvent.CLICK_BUILD_ITEM = "CLICK_BUILD_ITEM";
        FactionBuildEvent.BUILD_STATE = "BUILD_STATE";
        FactionBuildEvent.BUILD_ENDTIME = "BUILD_ENDTIME";
        return FactionBuildEvent;
    }(BaseEvent));
    faction.FactionBuildEvent = FactionBuildEvent;
    var FactionBuildProcessor = /** @class */ (function (_super) {
        __extends(FactionBuildProcessor, _super);
        function FactionBuildProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionBuildProcessor.prototype.getName = function () {
            return "FactionBuildProcessor";
        };
        FactionBuildProcessor.prototype.receivedModuleEvent = function ($event) {
            var evt = $event;
            if ($event instanceof FactionBuildEvent) {
                if (evt.type == FactionBuildEvent.SHOW_BUILD_EVENT) {
                    this.showFactionUi();
                }
                else if (evt.type == FactionBuildEvent.CLICK_BUILD_ITEM) {
                    this.clickbossitem(evt.data);
                }
                else if (evt.type == FactionBuildEvent.HIDE_BUILD_EVENT) {
                    this.hideFactionBossUi();
                }
                else if (evt.type == FactionBuildEvent.BUILD_STATE) {
                    this.buildstate();
                }
                else if (evt.type == FactionBuildEvent.BUILD_ENDTIME) {
                    this.buildendtime();
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.MONEY_TYPE_SILVER
                    || $engineEvent.type == EngineEvent.MONEY_TYPE_GOLD_INGOT) {
                    // if (this._factionBossUiPanel && this._factionBossUiPanel.factionTreasurePanel) {
                    //     this._factionBossUiPanel.factionTreasurePanel.treasureTopPanel.resetMoney();
                    // }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._factionBuildUiPanel) {
                    this._factionBuildUiPanel.dispose();
                    this._factionBuildUiPanel = null;
                    //console.log("释放面板 _factionBuildUiPanel")
                }
            }
        };
        FactionBuildProcessor.prototype.buildendtime = function () {
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.hasStage) {
                this._factionBuildUiPanel.resetData();
            }
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.factionBuildRightPanel && this._factionBuildUiPanel.factionBuildRightPanel.buildlist && this._factionBuildUiPanel.factionBuildRightPanel.buildlist.hasStage) {
                this._factionBuildUiPanel.factionBuildRightPanel.buildlist.refreshAndselectIndex();
            }
        };
        FactionBuildProcessor.prototype.buildstate = function () {
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.hasStage) {
                this._factionBuildUiPanel.Needrefresh();
                this._factionBuildUiPanel.resetData();
            }
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.factionBuildRightPanel && this._factionBuildUiPanel.factionBuildRightPanel.buildlist && this._factionBuildUiPanel.factionBuildRightPanel.buildlist.hasStage) {
                this._factionBuildUiPanel.factionBuildRightPanel.buildlist.refreshDataByNewData();
            }
        };
        FactionBuildProcessor.prototype.clickbossitem = function ($data) {
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.factionBuildRightPanel && this._factionBuildUiPanel.factionBuildRightPanel.hasStage) {
                this._factionBuildUiPanel.factionBuildRightPanel.resetData($data);
            }
        };
        FactionBuildProcessor.prototype.hideFactionBossUi = function () {
            if (this._factionBuildUiPanel) {
                this._factionBuildUiPanel.hide();
            }
            // SceneManager.getInstance().render = true;
            // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        FactionBuildProcessor.prototype.showFactionUi = function () {
            var _this = this;
            if (GuidData.faction) {
                if (!this._factionBuildUiPanel) {
                    this._factionBuildUiPanel = new faction.FactionBuildUiPanel();
                }
                this._factionBuildUiPanel.load(function () {
                    //停止绘制前面的ui
                    // SceneManager.getInstance().render = false;
                    // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                    // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                    _this._factionBuildUiPanel.show();
                });
            }
            else {
                ModulePageManager.openPanel(SharedDef.MODULE_FACTION);
            }
        };
        FactionBuildProcessor.prototype.showfactionBossEndPanel = function ($data) {
            var _this = this;
            if (!this._factionBossEnd) {
                this._factionBossEnd = new faction.FactionBossEnd();
            }
            this._factionBossEnd.load(function () {
                _this._factionBossEnd.show($data);
            }, false);
        };
        FactionBuildProcessor.prototype.listenModuleEvents = function () {
            return [
                new FactionBuildEvent(FactionBuildEvent.SHOW_BUILD_EVENT),
                new FactionBuildEvent(FactionBuildEvent.HIDE_BUILD_EVENT),
                new FactionBuildEvent(FactionBuildEvent.CLICK_BUILD_ITEM),
                new FactionBuildEvent(FactionBuildEvent.BUILD_STATE),
                new FactionBuildEvent(FactionBuildEvent.BUILD_ENDTIME),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        FactionBuildProcessor.prototype.getHanderMap = function () {
            var obj = new Object;
            // obj[Protocols.SMSG_FACTION_BOSS_SEND_RESULT] = ($byte: ByteArray) => { this.getNewList($byte) };
            return obj;
        };
        return FactionBuildProcessor;
    }(BaseProcessor));
    faction.FactionBuildProcessor = FactionBuildProcessor;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBuildProcessor.js.map