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
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
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
            TimeUtil.addTimeOut(1 * 1000, function () {
                _this.tipRankTip();
            });
            return _this;
        }
        RankProcessor.prototype.tipRankTip = function () {
            if (GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) > 10) {
                var obj = new tips.PandaMeshData();
                obj.url = Scene_data.fileRoot + "ui/panda/12.png";
                obj.type = tips.PandaMeshData.type1;
                obj.key = tips.PandaMeshData.key12;
                obj.data = new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL);
                var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
                $topUiViewEvent.data = obj;
                Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
            }
        };
        RankProcessor.prototype.getName = function () {
            return "RankProcessor";
        };
        RankProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof RankEvent) {
                var $rankEvent = $event;
                switch ($rankEvent.type) {
                    case RankEvent.SHOW_RANK_PANEL:
                        if (!this._rankPanel) {
                            this._rankPanel = new rank.RankPanel();
                        }
                        this._rankPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        RankProcessor.prototype.listenModuleEvents = function () {
            return [
                new RankEvent(RankEvent.SHOW_RANK_PANEL),
            ];
        };
        return RankProcessor;
    }(BaseProcessor));
    rank.RankProcessor = RankProcessor;
})(rank || (rank = {}));
//# sourceMappingURL=RankProcessor.js.map