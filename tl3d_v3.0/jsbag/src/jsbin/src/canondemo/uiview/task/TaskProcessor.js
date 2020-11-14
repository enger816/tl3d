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
var task;
(function (task) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TaskEvent = /** @class */ (function (_super) {
        __extends(TaskEvent, _super);
        function TaskEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TaskEvent.SHOW_TASK_PANEL = "SHOW_TASK_PANEL";
        return TaskEvent;
    }(BaseEvent));
    task.TaskEvent = TaskEvent;
    var TaskModule = /** @class */ (function (_super) {
        __extends(TaskModule, _super);
        function TaskModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TaskModule.prototype.getModuleName = function () {
            return "TaskModule";
        };
        TaskModule.prototype.listProcessors = function () {
            return [
                new TaskProcessor()
            ];
        };
        return TaskModule;
    }(Module));
    task.TaskModule = TaskModule;
    var TaskProcessor = /** @class */ (function (_super) {
        __extends(TaskProcessor, _super);
        function TaskProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TaskProcessor.prototype.getName = function () {
            return "TaskProcessor";
        };
        TaskProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TaskEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case TaskEvent.SHOW_TASK_PANEL:
                        if (!this._invitationPanel) {
                            this._invitationPanel = new task.TaskPanel();
                        }
                        this._invitationPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        TaskProcessor.prototype.listenModuleEvents = function () {
            return [
                new TaskEvent(TaskEvent.SHOW_TASK_PANEL),
            ];
        };
        return TaskProcessor;
    }(BaseProcessor));
    task.TaskProcessor = TaskProcessor;
})(task || (task = {}));
//# sourceMappingURL=TaskProcessor.js.map