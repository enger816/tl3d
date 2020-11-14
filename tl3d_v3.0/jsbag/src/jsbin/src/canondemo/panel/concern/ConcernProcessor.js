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
var concern;
(function (concern) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var ConcernEvent = /** @class */ (function (_super) {
        __extends(ConcernEvent, _super);
        function ConcernEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcernEvent.SHOW_CONCERN_PANEL = "SHOW_CONCERN_PANEL";
        return ConcernEvent;
    }(BaseEvent));
    concern.ConcernEvent = ConcernEvent;
    var ConcernModule = /** @class */ (function (_super) {
        __extends(ConcernModule, _super);
        function ConcernModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcernModule.prototype.getModuleName = function () {
            return "ConcernModule";
        };
        ConcernModule.prototype.listProcessors = function () {
            return [
                new ConcernProcessor()
            ];
        };
        return ConcernModule;
    }(Module));
    concern.ConcernModule = ConcernModule;
    var ConcernProcessor = /** @class */ (function (_super) {
        __extends(ConcernProcessor, _super);
        function ConcernProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcernProcessor.prototype.getName = function () {
            return "ConcernProcessor";
        };
        ConcernProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ConcernEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case ConcernEvent.SHOW_CONCERN_PANEL:
                        if (!this._ConcernPanel) {
                            this._ConcernPanel = new concern.ConcernPanel();
                        }
                        this._ConcernPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        ConcernProcessor.prototype.listenModuleEvents = function () {
            return [
                new ConcernEvent(ConcernEvent.SHOW_CONCERN_PANEL),
            ];
        };
        return ConcernProcessor;
    }(BaseProcessor));
    concern.ConcernProcessor = ConcernProcessor;
})(concern || (concern = {}));
//# sourceMappingURL=ConcernProcessor.js.map