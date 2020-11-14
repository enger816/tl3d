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
var rank;
(function (rank) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SceneEvent = game.SceneEvent;
    var RankEvent = /** @class */ (function (_super) {
        __extends(RankEvent, _super);
        function RankEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankEvent.SHOW_RANK_PANEL = "SHOW_RANK_PANEL";
        return RankEvent;
    }(BaseEvent));
    rank.RankEvent = RankEvent;
    var RankModule = /** @class */ (function (_super) {
        __extends(RankModule, _super);
        function RankModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RankModule.prototype.getModuleName = function () {
            return "RankModule";
        };
        RankModule.prototype.listProcessors = function () {
            return [
                new RankProcessor()
            ];
        };
        return RankModule;
    }(Module));
    rank.RankModule = RankModule;
    var RankProcessor = /** @class */ (function (_super) {
        __extends(RankProcessor, _super);
        function RankProcessor() {
            var _this = _super.call(this) || this;
            _this.nextCanShowTm = 0;
            _this.lastShowLevel = 0;
            return _this;
        }
        RankProcessor.prototype.getName = function () {
            return "RankProcessor";
        };
        RankProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case RankEvent.SHOW_RANK_PANEL:
                    if (!this._rankPanel) {
                        this._rankPanel = new rank.RankPanel();
                    }
                    this._rankPanel.showPanel();
                    break;
                case SceneEvent.SELECT_SCENE_LEVEL:
                    break;
                default:
                    break;
            }
            //  
        };
        RankProcessor.prototype.listenModuleEvents = function () {
            return [
                new RankEvent(RankEvent.SHOW_RANK_PANEL),
                new SceneEvent(SceneEvent.SELECT_SCENE_LEVEL),
            ];
        };
        return RankProcessor;
    }(BaseProcessor));
    rank.RankProcessor = RankProcessor;
})(rank || (rank = {}));
//# sourceMappingURL=RankProcessor.js.map