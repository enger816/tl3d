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
var adventurebossnotice;
(function (adventurebossnotice) {
    var AdventureBossNoticeModule = /** @class */ (function (_super) {
        __extends(AdventureBossNoticeModule, _super);
        function AdventureBossNoticeModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureBossNoticeModule.prototype.getModuleName = function () {
            return "AdventureBossNoticeModule";
        };
        AdventureBossNoticeModule.prototype.listProcessors = function () {
            return [new AdventureBossNoticeProcessor()];
        };
        return AdventureBossNoticeModule;
    }(Module));
    adventurebossnotice.AdventureBossNoticeModule = AdventureBossNoticeModule;
    var AdventureBossNoticeEvent = /** @class */ (function (_super) {
        __extends(AdventureBossNoticeEvent, _super);
        function AdventureBossNoticeEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL = "SHOW_Adventure_Notice_UI_PANEL";
        AdventureBossNoticeEvent.HIDE_Adventure_Notice_UI_PANEL = "HIDE_Adventure_Notice_UI_PANEL";
        return AdventureBossNoticeEvent;
    }(BaseEvent));
    adventurebossnotice.AdventureBossNoticeEvent = AdventureBossNoticeEvent;
    var AdventureBossNoticeProcessor = /** @class */ (function (_super) {
        __extends(AdventureBossNoticeProcessor, _super);
        function AdventureBossNoticeProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdventureBossNoticeProcessor.prototype.getName = function () {
            return "AdventureBossNoticeProcessor";
        };
        AdventureBossNoticeProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof AdventureBossNoticeEvent) {
                var evt = $event;
                if (evt.type == AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL) {
                    if (GuidData.map.isAdventureScene()) {
                        this.showPanel();
                    }
                    else {
                        this.hidePanel();
                    }
                }
                if (this.adventurePanel) {
                    if (evt.type == AdventureBossNoticeEvent.HIDE_Adventure_Notice_UI_PANEL) {
                        this.hidePanel();
                    }
                }
            }
        };
        AdventureBossNoticeProcessor.prototype.hidePanel = function () {
            if (this.adventurePanel) {
                this.adventurePanel.hide();
            }
        };
        AdventureBossNoticeProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.adventurePanel) {
                this.adventurePanel = new adventurebossnotice.AdventureBossNoticePanel();
            }
            this.adventurePanel.load(function () {
                _this.adventurePanel.show();
                //var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                //$scenePange.data = 901
                //ModuleEventManager.dispatchEvent($scenePange);
            }, false);
        };
        AdventureBossNoticeProcessor.prototype.listenModuleEvents = function () {
            return [
                new AdventureBossNoticeEvent(AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL),
                new AdventureBossNoticeEvent(AdventureBossNoticeEvent.HIDE_Adventure_Notice_UI_PANEL),
            ];
        };
        return AdventureBossNoticeProcessor;
    }(BaseProcessor));
    adventurebossnotice.AdventureBossNoticeProcessor = AdventureBossNoticeProcessor;
})(adventurebossnotice || (adventurebossnotice = {}));
//# sourceMappingURL=AdventureBossNoticeProcessor.js.map