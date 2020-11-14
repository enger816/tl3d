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
var leveluppan;
(function (leveluppan) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var SceneEvent = game.SceneEvent;
    var GameDataModel = game.GameDataModel;
    var LevelUpEvent = /** @class */ (function (_super) {
        __extends(LevelUpEvent, _super);
        function LevelUpEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LevelUpEvent.SHOW_LEVEL_UP_PANEL = "SHOW_LEVEL_UP_PANEL";
        LevelUpEvent.SHOW_BEST_FRIEND_PANEL = "SHOW_BEST_FRIEND_PANEL";
        return LevelUpEvent;
    }(BaseEvent));
    leveluppan.LevelUpEvent = LevelUpEvent;
    var LevelUpModule = /** @class */ (function (_super) {
        __extends(LevelUpModule, _super);
        function LevelUpModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LevelUpModule.prototype.getModuleName = function () {
            return "LevelUpModule";
        };
        LevelUpModule.prototype.listProcessors = function () {
            return [
                new LevelUpProcessor()
            ];
        };
        return LevelUpModule;
    }(Module));
    leveluppan.LevelUpModule = LevelUpModule;
    var LevelUpProcessor = /** @class */ (function (_super) {
        __extends(LevelUpProcessor, _super);
        function LevelUpProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LevelUpProcessor.prototype.getName = function () {
            return "LevelUpProcessor";
        };
        LevelUpProcessor.prototype.testTipHelp = function () {
            if (GameData.helpinfo) {
                if (GameData.helpinfo.level == GameDataModel.levelNum) {
                    GameData.clearPandaOrInof(1, 5); //清理求助
                    GameData.dispatchEvent(new help.HelpEvent(help.HelpEvent.SHOW_HELP_OTHER_PANEL), GameData.helpinfo);
                    return true;
                }
            }
            return false;
        };
        LevelUpProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if (GameData.gameType != 1) {
                return;
            }
            switch ($event.type) {
                case LevelUpEvent.SHOW_LEVEL_UP_PANEL:
                    this.showFinishEfict();
                    ;
                    var isquestHelp = this.testTipHelp();
                    if (!isquestHelp) {
                        this.showLevelUpPanel();
                        this.sendBestSrouce();
                        GameData.sendSuccessToWeb(GameDataModel.levelNum);
                    }
                    GameData.clearPandaOrInof(1, 8); //清理录像
                    if (Math.random() < 0.3) {
                        Pan3d.ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.CHANGE_BOTTOM_PANEL_AD));
                    }
                    break;
                case LevelUpEvent.SHOW_BEST_FRIEND_PANEL:
                    if (GameDataModel.levelNum % 3 == 1 || GameDataModel.levelNum > 15) {
                        Pan3d.TimeUtil.addTimeOut(1000, function () {
                            if (!_this._bestFriendPanel) {
                                _this._bestFriendPanel = new leveluppan.BestFriendPanel();
                            }
                            _this._bestFriendPanel.showPanel();
                        });
                    }
                    break;
                default:
                    break;
            }
        };
        LevelUpProcessor.prototype.showLevelUpPanel = function () {
            var _this = this;
            TimeUtil.addTimeOut(1000, function () {
                var $isFrist = GameData.saveFristLevelUp(GameDataModel.levelNum);
                if ($isFrist) {
                    if (!_this._fristLevelUpPanel) {
                        _this._fristLevelUpPanel = new leveluppan.FristLevelUpPanel();
                    }
                    _this._fristLevelUpPanel.showPanel();
                }
                else {
                    TimeUtil.addTimeOut(600, function () {
                        game.GameLevelManeger.getInstance().clear();
                        GameDataModel.centenBall.x = 0;
                        GameDataModel.centenBall.y = 20;
                        GameDataModel.centenBall.z = 0;
                        GameDataModel.centenBall.resetParticlePos();
                        TimeUtil.addTimeOut(10, function () {
                            GameData.dispatchToLevel(GameDataModel.levelNum + 1);
                        });
                    });
                }
            });
        };
        LevelUpProcessor.prototype.sendBestSrouce = function () {
            GameData.dispatchEvent(new SceneEvent(SceneEvent.SEND_TO_APPER_DATA), { key: "显示最佳", data: { level: game.GameDataModel.levelNum } });
            if (GameDataModel.levelNum > GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)) {
                GameData.setStorageSync(GameData.SELF_MAX_LEVEL, GameDataModel.levelNum);
            }
        };
        LevelUpProcessor.prototype.showFinishEfict = function () {
            GameData.dispatchEvent(new SceneEvent(SceneEvent.SHOW_SPECIAL_EFFECT), { pos: GameDataModel.centenBall.getPostionV3d(), name: "levelup" });
            game.GameSoundManager.getInstance().playSoundByName(Pan3d.Scene_data.fileRoot + "sound/" + "pass" + ".mp3");
        };
        LevelUpProcessor.prototype.listenModuleEvents = function () {
            return [
                new LevelUpEvent(LevelUpEvent.SHOW_BEST_FRIEND_PANEL),
                new LevelUpEvent(LevelUpEvent.SHOW_LEVEL_UP_PANEL),
            ];
        };
        return LevelUpProcessor;
    }(BaseProcessor));
    leveluppan.LevelUpProcessor = LevelUpProcessor;
})(leveluppan || (leveluppan = {}));
//# sourceMappingURL=LevelUpProcessor.js.map