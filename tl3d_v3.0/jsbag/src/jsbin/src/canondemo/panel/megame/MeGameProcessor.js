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
var megame;
(function (megame) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var MeGameEvent = /** @class */ (function (_super) {
        __extends(MeGameEvent, _super);
        function MeGameEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeGameEvent.SHOW_ME_GAME_PANEL = "SHOW_ME_GAME_PANEL";
        MeGameEvent.HIDE_ME_GAME_PANEL = "HIDE_ME_GAME_PANEL";
        return MeGameEvent;
    }(BaseEvent));
    megame.MeGameEvent = MeGameEvent;
    var MeGameModule = /** @class */ (function (_super) {
        __extends(MeGameModule, _super);
        function MeGameModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeGameModule.prototype.getModuleName = function () {
            return "MeGameModule";
        };
        MeGameModule.prototype.listProcessors = function () {
            return [
                new MeGameProcessor()
            ];
        };
        return MeGameModule;
    }(Module));
    megame.MeGameModule = MeGameModule;
    var MeGameProcessor = /** @class */ (function (_super) {
        __extends(MeGameProcessor, _super);
        function MeGameProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeGameProcessor.prototype.getName = function () {
            return "MeGameProcessor";
        };
        MeGameProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case MeGameEvent.SHOW_ME_GAME_PANEL:
                    var $isUseMeGame = GameData.getStorageSync("scene1104");
                    if (!$isUseMeGame) {
                        if (!this.meGamePanel) {
                            this.meGamePanel = new megame.MeGamePanel();
                            this.meGamePanel.showPanel();
                        }
                        else {
                            if ($event.data) {
                                this.meGamePanel.showPanel();
                            }
                        }
                    }
                    /*
                    if (!this.isOnly && GameDataModel.levelNum > GameData.severinfo.addmingamelevel) {
                        var $isUseMeGame = GameData.getStorageSync("scene1104")
                        if (!$isUseMeGame) {
                            var $rect: Pan3d.Rectangle = GameData.severinfo.getMegameRect()
                            if ($rect) {
                              
                            } else {
                                console.log("还没有适配机型", GameData.SystemInfo);
                            }
                        } else {
                            console.log("已添加过我的小程序")
                        }
                        //this.isOnly = true
                    } else {
                        console.log("打开过一次添加小程序")
                    }
                    */
                    break;
                case MeGameEvent.HIDE_ME_GAME_PANEL:
                    this.meGamePanel && this.meGamePanel.hidePanel();
                    break;
                default:
                    break;
            }
        };
        MeGameProcessor.prototype.listenModuleEvents = function () {
            return [
                new MeGameEvent(MeGameEvent.SHOW_ME_GAME_PANEL),
                new MeGameEvent(MeGameEvent.HIDE_ME_GAME_PANEL),
            ];
        };
        return MeGameProcessor;
    }(BaseProcessor));
    megame.MeGameProcessor = MeGameProcessor;
})(megame || (megame = {}));
//# sourceMappingURL=MeGameProcessor.js.map