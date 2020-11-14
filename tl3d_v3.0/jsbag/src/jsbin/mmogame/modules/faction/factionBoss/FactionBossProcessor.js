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
    var FactionBossEvent = /** @class */ (function (_super) {
        __extends(FactionBossEvent, _super);
        function FactionBossEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionBossEvent.SHOW_BOSS_EVENT = "SHOW_BOSS_EVENT";
        FactionBossEvent.HIDE_BOSS_EVENT = "HIDE_BOSS_EVENT";
        FactionBossEvent.CLICK_BOSS_ITEM = "CLICK_BOSS_ITEM";
        FactionBossEvent.SHOW_END_PANEL = "SHOW_END_PANEL";
        FactionBossEvent.CHANGE_BOSS_CURRENTNUM = "CHANGE_BOSS_CURRENTNUM";
        FactionBossEvent.CHANGE_BOSS_INTEGRAL = "CHANGE_BOSS_INTEGRAL";
        FactionBossEvent.CHANGE_BOSS_RESIDUE = "CHANGE_BOSS_RESIDUE";
        FactionBossEvent.CHANGE_BOSS_CURRENTID = "CHANGE_BOSS_CURRENTID";
        FactionBossEvent.BOSS_NEED_REDPOINT = "BOSS_NEED_REDPOINT";
        return FactionBossEvent;
    }(BaseEvent));
    faction.FactionBossEvent = FactionBossEvent;
    var FactionBossProcessor = /** @class */ (function (_super) {
        __extends(FactionBossProcessor, _super);
        function FactionBossProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionBossProcessor.prototype.getName = function () {
            return "FactionBossProcessor";
        };
        FactionBossProcessor.prototype.receivedModuleEvent = function ($event) {
            var evt = $event;
            if ($event instanceof FactionBossEvent) {
                if (evt.type == FactionBossEvent.SHOW_BOSS_EVENT) {
                    this.showFactionUi();
                }
                else if (evt.type == FactionBossEvent.CLICK_BOSS_ITEM) {
                    this.clickbossitem(evt.data);
                }
                else if (evt.type == FactionBossEvent.SHOW_END_PANEL) {
                    this.showfactionBossEndPanel(evt.data);
                }
                else if (evt.type == FactionBossEvent.HIDE_BOSS_EVENT) {
                    this.hideFactionBossUi();
                }
                else if (evt.type == FactionBossEvent.CHANGE_BOSS_CURRENTNUM) {
                    this.bosscurnum();
                }
                else if (evt.type == FactionBossEvent.CHANGE_BOSS_INTEGRAL) {
                    this.bossintegral();
                }
                else if (evt.type == FactionBossEvent.CHANGE_BOSS_RESIDUE) {
                    this.bossresidue();
                }
                else if (evt.type == FactionBossEvent.CHANGE_BOSS_CURRENTID) {
                    this.bosscurrentid();
                }
                else if (evt.type == FactionBossEvent.BOSS_NEED_REDPOINT) {
                    this.needredpoint();
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
                if (panelEvent.panel == this._factionBossUiPanel) {
                    this._factionBossUiPanel.dispose();
                    this._factionBossUiPanel = null;
                    //console.log("释放面板 _factionBossUiPanel")
                }
                if (panelEvent.panel == this._factionBossEnd) {
                    this._factionBossEnd.dispose();
                    this._factionBossEnd = null;
                    //console.log("释放面板 _factionBossEnd")
                }
            }
        };
        FactionBossProcessor.prototype.needredpoint = function () {
            if (this._factionBossUiPanel && this._factionBossUiPanel.factionBossRightPanel && this._factionBossUiPanel.factionBossRightPanel.hasStage) {
                this._factionBossUiPanel.factionBossRightPanel.Isneedredpoint();
            }
        };
        FactionBossProcessor.prototype.bosscurrentid = function () {
            if (this._factionBossUiPanel && this._factionBossUiPanel.factionBossRightPanel && this._factionBossUiPanel.factionBossRightPanel.hasStage) {
                this._factionBossUiPanel.factionBossRightPanel.Needrefresh();
            }
        };
        FactionBossProcessor.prototype.bosscurnum = function () {
            if (this._factionBossUiPanel && this._factionBossUiPanel.hasStage) {
                this._factionBossUiPanel.refreshCurrentNum();
            }
        };
        FactionBossProcessor.prototype.bossintegral = function () {
            if (this._factionBossUiPanel && this._factionBossUiPanel.hasStage) {
                this._factionBossUiPanel.refreshCurrentIntegral();
            }
        };
        FactionBossProcessor.prototype.bossresidue = function () {
            if (this._factionBossUiPanel && this._factionBossUiPanel.hasStage) {
                this._factionBossUiPanel.refreshCurrentResidue();
            }
        };
        FactionBossProcessor.prototype.clickbossitem = function ($data) {
            if (this._factionBossUiPanel && this._factionBossUiPanel.factionBossRightPanel && this._factionBossUiPanel.factionBossRightPanel.hasStage) {
                this._factionBossUiPanel.factionBossRightPanel.resetData($data);
            }
        };
        FactionBossProcessor.prototype.hideFactionBossUi = function () {
            if (this._factionBossUiPanel) {
                this._factionBossUiPanel.hide();
            }
            // SceneManager.getInstance().render = true;
            // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        FactionBossProcessor.prototype.showFactionUi = function () {
            var _this = this;
            if (!this._factionBossUiPanel) {
                this._factionBossUiPanel = new faction.FactionBossUiPanel();
            }
            this._factionBossUiPanel.load(function () {
                //停止绘制前面的ui
                // SceneManager.getInstance().render = false;
                // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                _this._factionBossUiPanel.show();
            });
        };
        FactionBossProcessor.prototype.showfactionBossEndPanel = function ($data) {
            var _this = this;
            if (!this._factionBossEnd) {
                this._factionBossEnd = new faction.FactionBossEnd();
            }
            this._factionBossEnd.load(function () {
                _this._factionBossEnd.show($data);
            }, false);
        };
        FactionBossProcessor.prototype.listenModuleEvents = function () {
            return [
                new FactionBossEvent(FactionBossEvent.SHOW_BOSS_EVENT),
                new FactionBossEvent(FactionBossEvent.HIDE_BOSS_EVENT),
                new FactionBossEvent(FactionBossEvent.CLICK_BOSS_ITEM),
                new FactionBossEvent(FactionBossEvent.SHOW_END_PANEL),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_CURRENTNUM),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_INTEGRAL),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_RESIDUE),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_CURRENTID),
                new FactionBossEvent(FactionBossEvent.BOSS_NEED_REDPOINT),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        FactionBossProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_FACTION_BOSS_SEND_RESULT] = function ($byte) { _this.getNewList($byte); };
            return obj;
        };
        FactionBossProcessor.prototype.getNewList = function ($byte) {
            var $vo = new s2c_faction_boss_send_result;
            s2c_faction_boss_send_result.read($vo, $byte);
            var evttt = new faction.FactionBossEvent(faction.FactionBossEvent.SHOW_END_PANEL);
            evttt.data = $vo;
            ModuleEventManager.dispatchEvent(evttt);
        };
        return FactionBossProcessor;
    }(BaseProcessor));
    faction.FactionBossProcessor = FactionBossProcessor;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBossProcessor.js.map