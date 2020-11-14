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
var rightpanda;
(function (rightpanda) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SceneEvent = game.SceneEvent;
    var PandaMeshData = rightpanda.PandaMeshData;
    var RightPandaEvent = /** @class */ (function (_super) {
        __extends(RightPandaEvent, _super);
        function RightPandaEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightPandaEvent.SHOW_RIGHT_PANDA_PANEL = "SHOW_RIGHT_PANDA_PANEL";
        RightPandaEvent.HIDE_RIGHT_PANDA_PANEL = "HIDE_RIGHT_PANDA_PANEL";
        RightPandaEvent.SHOW_PANDA_INFO = "SHOW_PANDA_INFO";
        RightPandaEvent.CLEAR_PANDA_INFO = "CLEAR_PANDA_INFO";
        return RightPandaEvent;
    }(BaseEvent));
    rightpanda.RightPandaEvent = RightPandaEvent;
    var RightPandaModule = /** @class */ (function (_super) {
        __extends(RightPandaModule, _super);
        function RightPandaModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightPandaModule.prototype.getModuleName = function () {
            return "RightPandaModule";
        };
        RightPandaModule.prototype.listProcessors = function () {
            return [
                new RightPandaProcessor()
            ];
        };
        return RightPandaModule;
    }(Module));
    rightpanda.RightPandaModule = RightPandaModule;
    var RightPandaProcessor = /** @class */ (function (_super) {
        __extends(RightPandaProcessor, _super);
        function RightPandaProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightPandaProcessor.prototype.initData = function () {
        };
        RightPandaProcessor.prototype.getName = function () {
            return "RightPandaProcessor";
        };
        RightPandaProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case SceneEvent.INIT_SCENE_CONFIG:
                    this.initData();
                    break;
                case RightPandaEvent.SHOW_RIGHT_PANDA_PANEL:
                    if (!this._rightPandaPanel) {
                        this._rightPandaPanel = new rightpanda.RightPandaPanel();
                    }
                    this._rightPandaPanel.showPanel();
                    break;
                case RightPandaEvent.HIDE_RIGHT_PANDA_PANEL:
                    if (this._rightPandaPanel) {
                        this._rightPandaPanel.hidePanel();
                    }
                    break;
                case RightPandaEvent.SHOW_PANDA_INFO:
                    if (this._rightPandaPanel) {
                        var $pandaMeshData = $event.data;
                        if ($pandaMeshData.type == PandaMeshData.type1) {
                            this._rightPandaPanel.pushPandaInfo($pandaMeshData);
                        }
                    }
                    break;
            }
        };
        /*
        private textcheck_advertise_reward(): void {
            GameData.WEB_SEVER_EVENT_AND_BACK("check_advertise_reward", "openid=" + GameData.getStorageSync("openid"), (res: any) => {
                if (res && res.data && res.data.reward > 0) {
                    console.log("有奖励", res.data.reward);
                    PandaMeshData.showRightPanda(PandaMeshData.key9, Scene_data.fileRoot + "ui/panda/9.png", null)
                }
            })
        }
        */
        RightPandaProcessor.prototype.listenModuleEvents = function () {
            return [
                new SceneEvent(SceneEvent.INIT_SCENE_CONFIG),
                new RightPandaEvent(RightPandaEvent.SHOW_RIGHT_PANDA_PANEL),
                new RightPandaEvent(RightPandaEvent.HIDE_RIGHT_PANDA_PANEL),
                new RightPandaEvent(RightPandaEvent.SHOW_PANDA_INFO),
            ];
        };
        return RightPandaProcessor;
    }(BaseProcessor));
    rightpanda.RightPandaProcessor = RightPandaProcessor;
})(rightpanda || (rightpanda = {}));
//# sourceMappingURL=RightPandaProcessor.js.map