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
var linkplay;
(function (linkplay) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var LinkPlayRoomEvent = /** @class */ (function (_super) {
        __extends(LinkPlayRoomEvent, _super);
        function LinkPlayRoomEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL = "SHOW_LINK_PLAY_ROOM_PANEL";
        LinkPlayRoomEvent.CREAT_LINK_PLAY_PANEL = "CREAT_LINK_PLAY_PANEL";
        LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT = "ROOM_LIST_PESONSE_EVENT";
        LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT = "SELECT_ROOM_LIST_EVENT";
        return LinkPlayRoomEvent;
    }(BaseEvent));
    linkplay.LinkPlayRoomEvent = LinkPlayRoomEvent;
    var LinkRoomModule = /** @class */ (function (_super) {
        __extends(LinkRoomModule, _super);
        function LinkRoomModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LinkRoomModule.prototype.getModuleName = function () {
            return "LinkRoomModule";
        };
        LinkRoomModule.prototype.listProcessors = function () {
            return [
                new LinkPlayRoomProcessor()
            ];
        };
        return LinkRoomModule;
    }(Module));
    linkplay.LinkRoomModule = LinkRoomModule;
    var LinkPlayRoomProcessor = /** @class */ (function (_super) {
        __extends(LinkPlayRoomProcessor, _super);
        function LinkPlayRoomProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LinkPlayRoomProcessor.prototype.getName = function () {
            return "LinkPlayRoomProcessor";
        };
        LinkPlayRoomProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL:
                    if (!this._linkPlayRoomPanel) {
                        this._linkPlayRoomPanel = new linkplay.LinkPlayRoomPanel();
                    }
                    this._linkPlayRoomPanel.showPanel();
                    break;
                case LinkPlayRoomEvent.CREAT_LINK_PLAY_PANEL:
                    if (!this._linkPlayCreatPanel) {
                        this._linkPlayCreatPanel = new linkplay.LinkPlayCreatPanel();
                    }
                    this._linkPlayCreatPanel.showPanel();
                    break;
                case LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT:
                    this._linkPlayRoomPanel.roomListPesonse($event.data);
                    break;
                case LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT:
                    this._linkPlayRoomPanel.selectRoomVo = $event.data;
                    break;
                default:
                    break;
            }
        };
        LinkPlayRoomProcessor.prototype.listenModuleEvents = function () {
            return [
                new LinkPlayRoomEvent(LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL),
                new LinkPlayRoomEvent(LinkPlayRoomEvent.CREAT_LINK_PLAY_PANEL),
                new LinkPlayRoomEvent(LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT),
                new LinkPlayRoomEvent(LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT),
            ];
        };
        return LinkPlayRoomProcessor;
    }(BaseProcessor));
    linkplay.LinkPlayRoomProcessor = LinkPlayRoomProcessor;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayRoomProcessor.js.map