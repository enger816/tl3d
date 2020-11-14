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
var adventuresettlement;
(function (adventuresettlement) {
    var AdventureSettlementModule = /** @class */ (function (_super) {
        __extends(AdventureSettlementModule, _super);
        function AdventureSettlementModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureSettlementModule.prototype.getModuleName = function () {
            return "AdventureSettlementModule";
        };
        AdventureSettlementModule.prototype.listProcessors = function () {
            return [new AdventureSettlementProcessor()];
        };
        return AdventureSettlementModule;
    }(Module));
    adventuresettlement.AdventureSettlementModule = AdventureSettlementModule;
    var AdventureSettlementEvent = /** @class */ (function (_super) {
        __extends(AdventureSettlementEvent, _super);
        function AdventureSettlementEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL = "SHOW_ADVENTURE_SETTLEMENT_UI_PANEL";
        AdventureSettlementEvent.HIDE_ADVENTURE_SETTLEMENT_UI_PANEL = "HIDE_ADVENTURE_SETTLEMENT_UI_PANEL";
        return AdventureSettlementEvent;
    }(BaseEvent));
    adventuresettlement.AdventureSettlementEvent = AdventureSettlementEvent;
    var AdventureSettlementProcessor = /** @class */ (function (_super) {
        __extends(AdventureSettlementProcessor, _super);
        function AdventureSettlementProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureSettlementProcessor.prototype.getName = function () {
            return "AdventureSettlementProcessor";
        };
        AdventureSettlementProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof AdventureSettlementEvent) {
                var evt = $event;
                if (evt.type == AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL) {
                    if (GuidData.map.isAdventureScene()) {
                        this.showPanel();
                        ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_BOSS_PROCESS_FINISH));
                    }
                    else {
                        this.hidePanel();
                    }
                }
                if (this.adventurePanel) {
                    if (evt.type == AdventureSettlementEvent.HIDE_ADVENTURE_SETTLEMENT_UI_PANEL) {
                        this.hidePanel();
                    }
                }
            }
        };
        AdventureSettlementProcessor.prototype.hidePanel = function () {
            if (this.adventurePanel) {
                this.adventurePanel.hide();
            }
        };
        AdventureSettlementProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.adventurePanel) {
                this.adventurePanel = new adventuresettlement.AdventureSettlementPanel();
            }
            var $time = GameInstance.getGameSecond(GuidData.map.getMapIntFieldEndTM());
            this.adventurePanel.endTime = TimeUtil.getTimer() + $time * 1000; //结束时间
            //console.log("结束时间", $time)
            this.adventurePanel.load(function () {
                _this.adventurePanel.show();
            }, false);
        };
        AdventureSettlementProcessor.prototype.listenModuleEvents = function () {
            return [
                new AdventureSettlementEvent(AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL),
                new AdventureSettlementEvent(AdventureSettlementEvent.HIDE_ADVENTURE_SETTLEMENT_UI_PANEL),
            ];
        };
        return AdventureSettlementProcessor;
    }(BaseProcessor));
    adventuresettlement.AdventureSettlementProcessor = AdventureSettlementProcessor;
})(adventuresettlement || (adventuresettlement = {}));
//# sourceMappingURL=AdventureSettlementProcessor.js.map