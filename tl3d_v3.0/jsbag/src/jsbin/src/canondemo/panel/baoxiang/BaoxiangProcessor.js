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
var baoxiang;
(function (baoxiang) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaoxiangEvent = /** @class */ (function (_super) {
        __extends(BaoxiangEvent, _super);
        function BaoxiangEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaoxiangEvent.SHOW_BAOXIANG_PANEL = "SHOW_BAOXIANG_PANEL";
        return BaoxiangEvent;
    }(BaseEvent));
    baoxiang.BaoxiangEvent = BaoxiangEvent;
    var BaoxiangModule = /** @class */ (function (_super) {
        __extends(BaoxiangModule, _super);
        function BaoxiangModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaoxiangModule.prototype.getModuleName = function () {
            return "BaoxiangModule";
        };
        BaoxiangModule.prototype.listProcessors = function () {
            return [
                new BaoxiangProcessor()
            ];
        };
        return BaoxiangModule;
    }(Module));
    baoxiang.BaoxiangModule = BaoxiangModule;
    var BaoxiangProcessor = /** @class */ (function (_super) {
        __extends(BaoxiangProcessor, _super);
        function BaoxiangProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaoxiangProcessor.prototype.getName = function () {
            return "BaoxiangProcessor";
        };
        BaoxiangProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case BaoxiangEvent.SHOW_BAOXIANG_PANEL:
                    if (!this._resetPlayPanel) {
                        this._resetPlayPanel = new baoxiang.BaoxiangPanel();
                    }
                    this._resetPlayPanel.refrishData($event.data);
                    this._resetPlayPanel.showPanel();
                    break;
                default:
                    break;
            }
        };
        BaoxiangProcessor.prototype.listenModuleEvents = function () {
            return [
                new BaoxiangEvent(BaoxiangEvent.SHOW_BAOXIANG_PANEL),
            ];
        };
        return BaoxiangProcessor;
    }(BaseProcessor));
    baoxiang.BaoxiangProcessor = BaoxiangProcessor;
})(baoxiang || (baoxiang = {}));
//# sourceMappingURL=BaoxiangProcessor.js.map