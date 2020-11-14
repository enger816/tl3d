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
    var FactionLeaguEvent = /** @class */ (function (_super) {
        __extends(FactionLeaguEvent, _super);
        function FactionLeaguEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionLeaguEvent.SHOW_LEAGUE_EVENT = "SHOW_LEAGUE_EVENT";
        FactionLeaguEvent.HIDE_LEAGUE_EVENT = "HIDE_LEAGUE_EVENT";
        FactionLeaguEvent.SHOW_GZ_EVENT = "SHOW_GZ_EVENT";
        FactionLeaguEvent.SHOW_LS_EVENT = "SHOW_LS_EVENT";
        FactionLeaguEvent.REFRESH_STAGE_EVENT = "REFRESH_STAGE_EVENT";
        FactionLeaguEvent.REFRESH_SESSION_EVENT = "REFRESH_SESSION_EVENT";
        return FactionLeaguEvent;
    }(BaseEvent));
    faction.FactionLeaguEvent = FactionLeaguEvent;
    var FactionLeagueProcessor = /** @class */ (function (_super) {
        __extends(FactionLeagueProcessor, _super);
        function FactionLeagueProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionLeagueProcessor.prototype.getName = function () {
            return "FactionLeagueProcessor";
        };
        FactionLeagueProcessor.prototype.receivedModuleEvent = function ($event) {
            var evt = $event;
            if ($event instanceof FactionLeaguEvent) {
                if (evt.type == FactionLeaguEvent.SHOW_LEAGUE_EVENT) {
                    this.showFactionUi();
                }
                else if (evt.type == FactionLeaguEvent.HIDE_LEAGUE_EVENT) {
                    this.hideFactionBossUi();
                }
                else if (evt.type == FactionLeaguEvent.SHOW_GZ_EVENT) {
                    this.showgz();
                }
                else if (evt.type == FactionLeaguEvent.SHOW_LS_EVENT) {
                    this.showls();
                }
                else if (evt.type == FactionLeaguEvent.REFRESH_STAGE_EVENT) {
                    if (this._factionLeagueUiPanel && this._factionLeagueUiPanel.hasStage) {
                        this._factionLeagueUiPanel.selecModul();
                        this._factionLeagueUiPanel.sendmsg();
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent = $event;
                if ($engineEvent.type == EngineEvent.MONEY_TYPE_SILVER
                    || $engineEvent.type == EngineEvent.MONEY_TYPE_GOLD_INGOT) {
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._factionLeagueUiPanel) {
                    this._factionLeagueUiPanel.dispose();
                    this._factionLeagueUiPanel = null;
                    //console.log("释放面板 _factionBuildUiPanel")
                }
                if (panelEvent.panel == this.leaguegz) {
                    this.leaguegz.dispose();
                    this.leaguegz = null;
                    //console.log("释放面板 leaguegz")
                }
                if (panelEvent.panel == this.leaguels) {
                    this.leaguels.dispose();
                    this.leaguels = null;
                    //console.log("释放面板 leaguegz")
                }
            }
        };
        FactionLeagueProcessor.prototype.showls = function () {
            var _this = this;
            if (!this.leaguels) {
                this.leaguels = new faction.LeagueLs();
            }
            this.leaguels.load(function () {
                //停止绘制前面的ui
                _this.leaguels.show();
            });
        };
        FactionLeagueProcessor.prototype.showgz = function () {
            var _this = this;
            if (!this.leaguegz) {
                this.leaguegz = new faction.LeagueGz();
            }
            this.leaguegz.load(function () {
                //停止绘制前面的ui
                _this.leaguegz.show();
            });
        };
        FactionLeagueProcessor.prototype.hideFactionBossUi = function () {
            if (this._factionLeagueUiPanel) {
                this._factionLeagueUiPanel.hide();
            }
        };
        FactionLeagueProcessor.prototype.showFactionUi = function () {
            var _this = this;
            if (!this._factionLeagueUiPanel) {
                this._factionLeagueUiPanel = new faction.FactionLeagueUiPanel();
            }
            this._factionLeagueUiPanel.load(function () {
                //停止绘制前面的ui
                _this._factionLeagueUiPanel.show();
            });
        };
        FactionLeagueProcessor.prototype.listenModuleEvents = function () {
            return [
                new FactionLeaguEvent(FactionLeaguEvent.SHOW_LEAGUE_EVENT),
                new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT),
                new FactionLeaguEvent(FactionLeaguEvent.SHOW_GZ_EVENT),
                new FactionLeaguEvent(FactionLeaguEvent.SHOW_LS_EVENT),
                new FactionLeaguEvent(FactionLeaguEvent.REFRESH_STAGE_EVENT),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        FactionLeagueProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SHOW_FACTION_MATCH_INFO_LIST] = function ($byte) { _this.getNewList($byte); };
            return obj;
        };
        FactionLeagueProcessor.prototype.getNewList = function ($byte) {
            var $vo = new s2c_show_faction_match_info_list;
            s2c_show_faction_match_info_list.read($vo, $byte);
            //console.log("---faction_match_info---",$vo);
            //数据先传至model层
            faction.FactionLeagueModel.getInstance().writeData($vo);
            //通知面板获取到新数据
            if (this._factionLeagueUiPanel && this._factionLeagueUiPanel.hasStage) {
                this._factionLeagueUiPanel.drawData();
            }
            // var evttt = new faction.FactionLeaguEvent(faction.FactionLeaguEvent.SHOW_END_PANEL);
            // evttt.data = $vo;
            // ModuleEventManager.dispatchEvent(evttt);
        };
        return FactionLeagueProcessor;
    }(BaseProcessor));
    faction.FactionLeagueProcessor = FactionLeagueProcessor;
})(faction || (faction = {}));
//# sourceMappingURL=FactionLeagueProcessor.js.map