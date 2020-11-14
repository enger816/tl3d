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
var gift;
(function (gift) {
    var GiftModule = /** @class */ (function (_super) {
        __extends(GiftModule, _super);
        function GiftModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GiftModule.prototype.getModuleName = function () {
            return "GiftModule";
        };
        GiftModule.prototype.listProcessors = function () {
            return [new GiftProcessor()];
        };
        return GiftModule;
    }(Module));
    gift.GiftModule = GiftModule;
    var GiftEvent = /** @class */ (function (_super) {
        __extends(GiftEvent, _super);
        function GiftEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GiftEvent.SHOW_GIFT_PANEL = "SHOW_GIFT_PANEL";
        GiftEvent.HIDE_GIFT_PANEL = "HIDE_GIFT_PANEL";
        GiftEvent.REFRISH_CHANGE_CELL_DATA = "REFRISH_CHANGE_CELL_DATA";
        return GiftEvent;
    }(BaseEvent));
    gift.GiftEvent = GiftEvent;
    var GiftProcessor = /** @class */ (function (_super) {
        __extends(GiftProcessor, _super);
        function GiftProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GiftProcessor.prototype.getName = function () {
            return "GiftProcessor";
        };
        GiftProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof GiftEvent) {
                var evt = $event;
                if (evt.type == GiftEvent.SHOW_GIFT_PANEL) {
                    this.showPanel();
                }
                if (this.giftPanel) {
                    if (evt.type == GiftEvent.HIDE_GIFT_PANEL) {
                        this.hidePanel();
                    }
                    if (evt.type == GiftEvent.REFRISH_CHANGE_CELL_DATA) {
                        this.giftPanel.refreshCellData();
                    }
                }
            }
            else if ($event instanceof charbg.CharBgEvent) {
                if (this.giftPanel && this.giftPanel.hasStage) {
                    //   this.giftPanel.refresh();
                }
            }
        };
        GiftProcessor.prototype.hidePanel = function () {
            this.giftPanel.hide();
        };
        GiftProcessor.prototype.showPanel = function () {
            var _this = this;
            if (!this.giftPanel) {
                this.giftPanel = new gift.GiftPanel();
            }
            this.giftPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.giftPanel);
                _this.giftPanel.refresh();
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_FACTION;
                ModuleEventManager.dispatchEvent($scenePange);
            }, false);
        };
        GiftProcessor.prototype.listenModuleEvents = function () {
            return [
                new GiftEvent(GiftEvent.SHOW_GIFT_PANEL),
                new GiftEvent(GiftEvent.HIDE_GIFT_PANEL),
                new GiftEvent(GiftEvent.REFRISH_CHANGE_CELL_DATA),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
            ];
        };
        return GiftProcessor;
    }(BaseProcessor));
    gift.GiftProcessor = GiftProcessor;
})(gift || (gift = {}));
//# sourceMappingURL=GiftProcessor.js.map