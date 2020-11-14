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
var timegift;
(function (timegift) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeGiftEvent = /** @class */ (function (_super) {
        __extends(TimeGiftEvent, _super);
        function TimeGiftEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeGiftEvent.SHOW_TIME_GIFT_PANEL = "SHOW_TIME_GIFT_PANEL";
        return TimeGiftEvent;
    }(BaseEvent));
    timegift.TimeGiftEvent = TimeGiftEvent;
    var TimeGiftModule = /** @class */ (function (_super) {
        __extends(TimeGiftModule, _super);
        function TimeGiftModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeGiftModule.prototype.getModuleName = function () {
            return "TimeGiftModule";
        };
        TimeGiftModule.prototype.listProcessors = function () {
            return [
                new TimeGiftProcessor()
            ];
        };
        return TimeGiftModule;
    }(Module));
    timegift.TimeGiftModule = TimeGiftModule;
    var TimeGiftProcessor = /** @class */ (function (_super) {
        __extends(TimeGiftProcessor, _super);
        function TimeGiftProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeGiftProcessor.prototype.getName = function () {
            return "TimeGiftProcessor";
        };
        TimeGiftProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case TimeGiftEvent.SHOW_TIME_GIFT_PANEL:
                    if (!this._timeGiftPanel) {
                        this._timeGiftPanel = new timegift.TimeGiftPanel();
                    }
                    this._timeGiftPanel.showPanel();
                    break;
                default:
                    break;
            }
        };
        TimeGiftProcessor.prototype.listenModuleEvents = function () {
            return [
                new TimeGiftEvent(TimeGiftEvent.SHOW_TIME_GIFT_PANEL),
            ];
        };
        return TimeGiftProcessor;
    }(BaseProcessor));
    timegift.TimeGiftProcessor = TimeGiftProcessor;
})(timegift || (timegift = {}));
//# sourceMappingURL=TimeGiftProcessor.js.map