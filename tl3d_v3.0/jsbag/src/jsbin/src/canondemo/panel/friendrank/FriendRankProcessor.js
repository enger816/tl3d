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
var friendrank;
(function (friendrank) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var FriendRankEvent = /** @class */ (function (_super) {
        __extends(FriendRankEvent, _super);
        function FriendRankEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendRankEvent.SHOW_FRIEND_RANK_PANEL = "SHOW_FRIEND_RANK_PANEL";
        return FriendRankEvent;
    }(BaseEvent));
    friendrank.FriendRankEvent = FriendRankEvent;
    var FriendRankModule = /** @class */ (function (_super) {
        __extends(FriendRankModule, _super);
        function FriendRankModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendRankModule.prototype.getModuleName = function () {
            return "FriendRankModule";
        };
        FriendRankModule.prototype.listProcessors = function () {
            return [
                new FriendRankProcessor()
            ];
        };
        return FriendRankModule;
    }(Module));
    friendrank.FriendRankModule = FriendRankModule;
    var FriendRankProcessor = /** @class */ (function (_super) {
        __extends(FriendRankProcessor, _super);
        function FriendRankProcessor() {
            return _super.call(this) || this;
        }
        FriendRankProcessor.prototype.getName = function () {
            return "FriendRankProcessor";
        };
        FriendRankProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof FriendRankEvent) {
                var $rankEvent = $event;
                switch ($rankEvent.type) {
                    case FriendRankEvent.SHOW_FRIEND_RANK_PANEL:
                        break;
                    default:
                        break;
                }
            }
        };
        FriendRankProcessor.prototype.listenModuleEvents = function () {
            return [
                new FriendRankEvent(FriendRankEvent.SHOW_FRIEND_RANK_PANEL),
            ];
        };
        return FriendRankProcessor;
    }(BaseProcessor));
    friendrank.FriendRankProcessor = FriendRankProcessor;
})(friendrank || (friendrank = {}));
//# sourceMappingURL=FriendRankProcessor.js.map