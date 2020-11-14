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
var selectlevel;
(function (selectlevel) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SelectLevelEvent = /** @class */ (function (_super) {
        __extends(SelectLevelEvent, _super);
        function SelectLevelEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectLevelEvent.SHOW_SELECT_LEVEL = "SHOW_SELECT_LEVEL";
        return SelectLevelEvent;
    }(BaseEvent));
    selectlevel.SelectLevelEvent = SelectLevelEvent;
    var SelectLevelModule = /** @class */ (function (_super) {
        __extends(SelectLevelModule, _super);
        function SelectLevelModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectLevelModule.prototype.getModuleName = function () {
            return "SelectLevelModule";
        };
        SelectLevelModule.prototype.listProcessors = function () {
            return [
                new SelectLevelProcessor()
            ];
        };
        return SelectLevelModule;
    }(Module));
    selectlevel.SelectLevelModule = SelectLevelModule;
    var SelectLevelProcessor = /** @class */ (function (_super) {
        __extends(SelectLevelProcessor, _super);
        function SelectLevelProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectLevelProcessor.prototype.getName = function () {
            return "SelectLevelProcessor";
        };
        SelectLevelProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SelectLevelEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case SelectLevelEvent.SHOW_SELECT_LEVEL:
                        if (!this._selectLevelPanel) {
                            this._selectLevelPanel = new selectlevel.SelectLevelPanel();
                        }
                        this._selectLevelPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        SelectLevelProcessor.prototype.listenModuleEvents = function () {
            return [
                new SelectLevelEvent(SelectLevelEvent.SHOW_SELECT_LEVEL),
            ];
        };
        return SelectLevelProcessor;
    }(BaseProcessor));
    selectlevel.SelectLevelProcessor = SelectLevelProcessor;
})(selectlevel || (selectlevel = {}));
//# sourceMappingURL=SelectLevelProcessor.js.map