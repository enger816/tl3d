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
var Camand;
(function (Camand) {
    var ComandEvent = /** @class */ (function (_super) {
        __extends(ComandEvent, _super);
        function ComandEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComandEvent.SHOW_COMMAND_EVENT = "show_command_event"; //显示面板
        ComandEvent.SHOW_ASTAR_LINE = "SHOW_ASTAR_LINE"; //显示面板
        return ComandEvent;
    }(BaseEvent));
    Camand.ComandEvent = ComandEvent;
    var CommandModule = /** @class */ (function (_super) {
        __extends(CommandModule, _super);
        function CommandModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CommandModule.prototype.getModuleName = function () {
            return "CommandModule";
        };
        CommandModule.prototype.listProcessors = function () {
            return [new CommandProcessor()];
        };
        return CommandModule;
    }(Module));
    Camand.CommandModule = CommandModule;
    var CommandProcessor = /** @class */ (function (_super) {
        __extends(CommandProcessor, _super);
        function CommandProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CommandProcessor.prototype.getName = function () {
            return "CommandProcessor";
        };
        CommandProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ComandEvent) {
                var $comandEvent = $event;
                if ($comandEvent.type == ComandEvent.SHOW_COMMAND_EVENT) {
                    this.showCommandEvent();
                }
                if ($comandEvent.type == ComandEvent.SHOW_ASTAR_LINE) {
                    this.showAstarLine();
                }
            }
            if ($event instanceof EngineEvent) {
            }
        };
        CommandProcessor.prototype.showAstarLine = function () {
            if (!this._cammandPanel) {
                this._cammandPanel = new Camand.CammandPanel();
            }
            this._cammandPanel.showAstarLine();
        };
        CommandProcessor.prototype.showCommandEvent = function () {
            if (!this._cammandPanel) {
                this._cammandPanel = new Camand.CammandPanel();
            }
            this._cammandPanel.show();
        };
        CommandProcessor.prototype.listenModuleEvents = function () {
            return [
                new ComandEvent(ComandEvent.SHOW_COMMAND_EVENT),
                new ComandEvent(ComandEvent.SHOW_ASTAR_LINE),
            ];
        };
        return CommandProcessor;
    }(BaseProcessor));
    Camand.CommandProcessor = CommandProcessor;
})(Camand || (Camand = {}));
//# sourceMappingURL=CommandProcessor.js.map