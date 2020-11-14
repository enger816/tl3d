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
var ranking;
(function (ranking) {
    var RankingModule = /** @class */ (function (_super) {
        __extends(RankingModule, _super);
        function RankingModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankingModule.prototype.getModuleName = function () {
            return "RankingModule";
        };
        RankingModule.prototype.listProcessors = function () {
            //this.init();
            return [new RankingProcessor()];
        };
        return RankingModule;
    }(Module));
    ranking.RankingModule = RankingModule;
    var RankingEvent = /** @class */ (function (_super) {
        __extends(RankingEvent, _super);
        function RankingEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankingEvent.HIDE_RANKING_EVENT = "HIDE_RANKING_EVENT";
        RankingEvent.SHOW_RANKING_EVENT = "SHOW_RANKING_EVENT";
        RankingEvent.REFRESH_RANKING_RIGHTPANEL_EVENT = "REFRESH_RANKING_RIGHTPANEL_EVENT";
        RankingEvent.RANKING_DATA_EVENT = "ranking_data_event";
        RankingEvent.RANKING_LIKE_CHG_EVENT = "RANKING_LIKE_CHG_EVENT";
        RankingEvent.RANKING_OWN_EVENT = "RANKING_OWN_EVENT";
        RankingEvent.REWARD_RANK_PANLE = "REWARD_RANK_PANLE";
        //排行榜有无数据事件
        RankingEvent.HAS_RANK_DATA_PANLE = "HAS_RANK_DATA_PANLE";
        return RankingEvent;
    }(BaseEvent));
    ranking.RankingEvent = RankingEvent;
    var RankingProcessor = /** @class */ (function (_super) {
        __extends(RankingProcessor, _super);
        function RankingProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankingProcessor.prototype.getName = function () {
            return "RankingProcessor";
        };
        RankingProcessor.prototype.receivedModuleEvent = function ($event) {
            var evt = $event;
            if ($event instanceof RankingEvent) {
                if (evt.type == RankingEvent.SHOW_RANKING_EVENT) {
                    this.showRankingUi(evt.data);
                }
                else if (evt.type == RankingEvent.HIDE_RANKING_EVENT) {
                    this.hideRankingUi();
                }
                else if (evt.type == RankingEvent.REFRESH_RANKING_RIGHTPANEL_EVENT) {
                    //更新右侧面板事件
                    this.refreshRightPanel(evt.data);
                }
                else if (evt.type == RankingEvent.RANKING_DATA_EVENT) {
                    var data = evt.data;
                    this.rankQueryResult(data);
                }
                else if (evt.type == RankingEvent.RANKING_LIKE_CHG_EVENT) {
                    this.rankLikeChg();
                }
                else if (evt.type == RankingEvent.RANKING_OWN_EVENT) {
                    this.rankQueryResult(evt.data);
                    if (this._rankingUiPanel && this._rankingUiPanel.currentServerRanking && this._rankingUiPanel.currentServerRanking.hasStage) {
                        this._rankingUiPanel.currentServerRanking.seInfoState($event.data.allNum <= 0);
                        this._rankingUiPanel.currentServerRanking.currentRankingrightPanel.setVisiable($event.data.allNum);
                    }
                }
                else if (evt.type == RankingEvent.HAS_RANK_DATA_PANLE) {
                }
                else if (evt.type == RankingEvent.REWARD_RANK_PANLE) {
                    this.showRewardPanel(evt.data);
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._rankingUiPanel) {
                    this._rankingUiPanel.dispose();
                    this._rankingUiPanel = null;
                    //console.log("释放面板 _rankingUiPanel")
                }
                if (panelEvent.panel == this._rankReward) {
                    this._rankReward.dispose();
                    this._rankReward = null;
                    //console.log("释放面板 _rankReward")
                }
            }
        };
        RankingProcessor.prototype.showRewardPanel = function ($type) {
            var _this = this;
            //console.log("===222",$type);
            if (!this._rankReward) {
                this._rankReward = new ranking.RankReward();
            }
            this._rankReward.load(function () {
                _this._rankReward.show($type);
            }, false);
        };
        RankingProcessor.prototype.rankLikeChg = function () {
            if (this._rankingUiPanel
                && this._rankingUiPanel.currentServerRanking
                && this._rankingUiPanel.currentServerRanking.currentRankingrightPanel) {
                this._rankingUiPanel.currentServerRanking.currentRankingrightPanel.setNum(this._rankingUiPanel.currentServerRanking.currentRankingrightPanel.likenum + 1);
            }
        };
        RankingProcessor.prototype.rankQueryResult = function (data) {
            //自己的排行结果
            if (this._rankingUiPanel
                && this._rankingUiPanel.currentServerRanking
                && this._rankingUiPanel.currentServerRanking.currentRankingCenterPanel
                && this._rankingUiPanel.currentServerRanking.currentRankingCenterPanel.currentServerRankingList) {
                this._rankingUiPanel.currentServerRanking.currentRankingCenterPanel.resetData(data);
            }
        };
        RankingProcessor.prototype.refreshRightPanel = function ($data) {
            if (this._rankingUiPanel
                && this._rankingUiPanel.currentServerRanking
                && this._rankingUiPanel.currentServerRanking.currentRankingrightPanel) {
                this._rankingUiPanel.currentServerRanking.currentRankingrightPanel.resetData($data);
            }
        };
        RankingProcessor.prototype.hideRankingUi = function () {
            if (this._rankingUiPanel) {
                this._rankingUiPanel.hide();
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        RankingProcessor.prototype.showRankingUi = function ($data) {
            var _this = this;
            if (!this._rankingUiPanel) {
                this._rankingUiPanel = new ranking.RankingUiPanel();
            }
            this._rankingUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                if (!$data) {
                    $data = 0;
                }
                if ($data instanceof Array) {
                    $data = $data[0];
                }
                // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                console.log("=---$data-", $data);
                _this._rankingUiPanel.show($data);
            });
        };
        RankingProcessor.prototype.listenModuleEvents = function () {
            return [
                new RankingEvent(RankingEvent.SHOW_RANKING_EVENT),
                new RankingEvent(RankingEvent.HIDE_RANKING_EVENT),
                new RankingEvent(RankingEvent.REFRESH_RANKING_RIGHTPANEL_EVENT),
                new RankingEvent(RankingEvent.RANKING_DATA_EVENT),
                new RankingEvent(RankingEvent.RANKING_LIKE_CHG_EVENT),
                new RankingEvent(RankingEvent.RANKING_OWN_EVENT),
                new RankingEvent(RankingEvent.REWARD_RANK_PANLE),
                new RankingEvent(RankingEvent.HAS_RANK_DATA_PANLE),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return RankingProcessor;
    }(BaseProcessor));
    ranking.RankingProcessor = RankingProcessor;
    var RankQueryData = /** @class */ (function () {
        function RankQueryData() {
        }
        return RankQueryData;
    }());
    ranking.RankQueryData = RankQueryData;
    var RankItemData = /** @class */ (function () {
        function RankItemData() {
        }
        return RankItemData;
    }());
    ranking.RankItemData = RankItemData;
})(ranking || (ranking = {}));
//# sourceMappingURL=RankingProcessor.js.map