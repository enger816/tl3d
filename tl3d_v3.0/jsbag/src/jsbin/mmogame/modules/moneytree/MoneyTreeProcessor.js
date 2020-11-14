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
var moneytree;
(function (moneytree) {
    var MoneyTreeModule = /** @class */ (function (_super) {
        __extends(MoneyTreeModule, _super);
        function MoneyTreeModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoneyTreeModule.prototype.getModuleName = function () {
            return "MoneyTreeModule";
        };
        MoneyTreeModule.prototype.listProcessors = function () {
            //this.init();
            return [new MoneyTreeProcessor()];
        };
        return MoneyTreeModule;
    }(Module));
    moneytree.MoneyTreeModule = MoneyTreeModule;
    var MoneyTreeEvent = /** @class */ (function (_super) {
        __extends(MoneyTreeEvent, _super);
        function MoneyTreeEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoneyTreeEvent.HIDE_MoneyTree_EVENT = "HIDE_MoneyTree_EVENT";
        MoneyTreeEvent.SHOW_MoneyTree_EVENT = "SHOW_MoneyTree_EVENT";
        MoneyTreeEvent.CHG_MoneyTree_REWARD_EVENT = "CHG_MoneyTree_REWARD_EVENT";
        MoneyTreeEvent.SHOW_EFF_MoneyTree_EVENT = "SHOW_EFF_MoneyTree_EVENT";
        MoneyTreeEvent.EFF_EVENT = "EFF_EVENT";
        return MoneyTreeEvent;
    }(BaseEvent));
    moneytree.MoneyTreeEvent = MoneyTreeEvent;
    var MoneyTreeProcessor = /** @class */ (function (_super) {
        __extends(MoneyTreeProcessor, _super);
        function MoneyTreeProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoneyTreeProcessor.prototype.getName = function () {
            return "MoneyTreeProcessor";
        };
        MoneyTreeProcessor.prototype.receivedModuleEvent = function ($event) {
            var evt = $event;
            if ($event instanceof MoneyTreeEvent) {
                if (evt.type == MoneyTreeEvent.SHOW_MoneyTree_EVENT) {
                    this.showRankingUi();
                }
                else if (evt.type == MoneyTreeEvent.HIDE_MoneyTree_EVENT) {
                    this.hideRankingUi();
                }
                else if (evt.type == MoneyTreeEvent.CHG_MoneyTree_REWARD_EVENT) {
                    this.chgreward();
                }
                else if (evt.type == MoneyTreeEvent.SHOW_EFF_MoneyTree_EVENT) {
                    if (this._moneyTree) {
                        this._moneyTree.showSkillUpEff();
                    }
                }
                else if (evt.type == MoneyTreeEvent.EFF_EVENT) {
                    if (this._moneyTree) {
                        this._moneyTree.showflyword(evt.data);
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._moneyTree) {
                    this._moneyTree.dispose();
                    this._moneyTree = null;
                    //console.log("释放面板 _rankingUiPanel")
                }
            }
            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.MONEY_CHANGE) {
                    this.moneyChg();
                }
            }
        };
        MoneyTreeProcessor.prototype.chgreward = function () {
            if (this._moneyTree) {
                this._moneyTree.drawReward();
            }
        };
        MoneyTreeProcessor.prototype.moneyChg = function () {
            if (this._moneyTree) {
                this._moneyTree.resetData();
            }
        };
        MoneyTreeProcessor.prototype.showRankingUi = function () {
            var _this = this;
            if (!this._moneyTree) {
                this._moneyTree = new moneytree.MoneyTree();
            }
            this._moneyTree.load(function () {
                _this._moneyTree.show();
            }, false);
        };
        MoneyTreeProcessor.prototype.hideRankingUi = function () {
            if (this._moneyTree) {
                this._moneyTree.hide();
            }
        };
        MoneyTreeProcessor.prototype.listenModuleEvents = function () {
            return [
                new MoneyTreeEvent(MoneyTreeEvent.SHOW_MoneyTree_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.HIDE_MoneyTree_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.CHG_MoneyTree_REWARD_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.SHOW_EFF_MoneyTree_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.EFF_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE)
            ];
        };
        return MoneyTreeProcessor;
    }(BaseProcessor));
    moneytree.MoneyTreeProcessor = MoneyTreeProcessor;
})(moneytree || (moneytree = {}));
//# sourceMappingURL=MoneyTreeProcessor.js.map