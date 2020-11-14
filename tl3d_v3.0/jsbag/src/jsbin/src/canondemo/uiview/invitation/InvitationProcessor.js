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
var invitation;
(function (invitation) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var InvitationEvent = /** @class */ (function (_super) {
        __extends(InvitationEvent, _super);
        function InvitationEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvitationEvent.SHOW_INVITATIOIN_PANEL = "SHOW_TASK_PANEL";
        return InvitationEvent;
    }(BaseEvent));
    invitation.InvitationEvent = InvitationEvent;
    var InvitationModule = /** @class */ (function (_super) {
        __extends(InvitationModule, _super);
        function InvitationModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvitationModule.prototype.getModuleName = function () {
            return "InvitationModule";
        };
        InvitationModule.prototype.listProcessors = function () {
            return [
                new InvitationProcessor()
            ];
        };
        return InvitationModule;
    }(Module));
    invitation.InvitationModule = InvitationModule;
    var InvitationProcessor = /** @class */ (function (_super) {
        __extends(InvitationProcessor, _super);
        function InvitationProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvitationProcessor.prototype.getName = function () {
            return "InvitationProcessor";
        };
        InvitationProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof InvitationEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case InvitationEvent.SHOW_INVITATIOIN_PANEL:
                        if (!this._invitationPanel) {
                            this._invitationPanel = new invitation.InvitationPanel();
                        }
                        this._invitationPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        InvitationProcessor.prototype.listenModuleEvents = function () {
            return [
                new InvitationEvent(InvitationEvent.SHOW_INVITATIOIN_PANEL),
            ];
        };
        return InvitationProcessor;
    }(BaseProcessor));
    invitation.InvitationProcessor = InvitationProcessor;
})(invitation || (invitation = {}));
//# sourceMappingURL=InvitationProcessor.js.map