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
var lottery;
(function (lottery) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var SceneEvent = game.SceneEvent;
    var LotteryEvent = /** @class */ (function (_super) {
        __extends(LotteryEvent, _super);
        function LotteryEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LotteryEvent.SHOW_LOTTERY_PANEL = "SHOW_LOTTERY_PANEL";
        return LotteryEvent;
    }(BaseEvent));
    lottery.LotteryEvent = LotteryEvent;
    var LotteryModule = /** @class */ (function (_super) {
        __extends(LotteryModule, _super);
        function LotteryModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LotteryModule.prototype.getModuleName = function () {
            return "LotteryModule";
        };
        LotteryModule.prototype.listProcessors = function () {
            return [
                new LotteryProcessor()
            ];
        };
        return LotteryModule;
    }(Module));
    lottery.LotteryModule = LotteryModule;
    var LotteryProcessor = /** @class */ (function (_super) {
        __extends(LotteryProcessor, _super);
        function LotteryProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LotteryProcessor.prototype.getName = function () {
            return "LotteryProcessor";
        };
        LotteryProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            switch ($event.type) {
                case LotteryEvent.SHOW_LOTTERY_PANEL:
                    if (!this._lotteryPanel) {
                        this._lotteryPanel = new lottery.LotteryPanel();
                    }
                    var maxData = GameData.getEveryDataSyncByName("oneDayMaxLotteryNum");
                    if (maxData.num < 10) {
                        this._lotteryPanel.showPanel();
                    }
                    break;
                case SceneEvent.INIT_SCENE_CONFIG:
                    TimeUtil.addTimeOut(1000 * 7, function () { _this.timeOut(); });
                    break;
                default:
                    break;
            }
        };
        LotteryProcessor.prototype.timeOut = function () {
        };
        LotteryProcessor.prototype.listenModuleEvents = function () {
            return [
                new LotteryEvent(LotteryEvent.SHOW_LOTTERY_PANEL),
                new SceneEvent(SceneEvent.INIT_SCENE_CONFIG),
            ];
        };
        return LotteryProcessor;
    }(BaseProcessor));
    lottery.LotteryProcessor = LotteryProcessor;
})(lottery || (lottery = {}));
//# sourceMappingURL=LotteryProcessor.js.map