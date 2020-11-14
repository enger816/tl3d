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
var endless;
(function (endless) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Physics = canonkey.Physics;
    var SceneEvent = game.SceneEvent;
    var GameDataModel = game.GameDataModel;
    var EndLessEvent = /** @class */ (function (_super) {
        __extends(EndLessEvent, _super);
        function EndLessEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessEvent.ENDLESS_MODEL_START = "ENDLESS_MODEL_START";
        EndLessEvent.ENDLESS_NEED_ADD_SCENE = "ENDLESS_NEED_ADD_SCENE";
        EndLessEvent.ENDLESS_CLEAR_LAST_SCENE = "ENDLESS_CLEAR_LAST_SCENE";
        EndLessEvent.HIDE_ALL_ENDLESS_PANEL = "RETEN_BASE_LEVEL_SCENE";
        EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS = "SAVE_ENDLESS_REVIVE_TIME_POS";
        EndLessEvent.MUI_TIME_ADD_START = "MUI_TIME_ADD_START";
        EndLessEvent.MUI_SHOW_ADD_SCENE_TIME = "MUI_SHOW_ADD_SCENE_TIME";
        EndLessEvent.SHOW_ENDLESS_TOP_PANEL = "SHOW_ENDLESS_TOP_PANEL";
        EndLessEvent.SHOW_ENDLESS_LEFT_RANK_PANEL = "SHOW_ENDLESS_LEFT_RANK_PANEL";
        EndLessEvent.SHOW_ENDLESS_FINISH_PANEL = "SHOW_ENDLESS_FINISH_PANEL";
        EndLessEvent.SHOW_ENDLESS_REVIVE_PANEL = "SHOW_ENDLESS_REVIVE_PANEL";
        return EndLessEvent;
    }(BaseEvent));
    endless.EndLessEvent = EndLessEvent;
    var EndLessModule = /** @class */ (function (_super) {
        __extends(EndLessModule, _super);
        function EndLessModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessModule.prototype.getModuleName = function () {
            return "EndLessModule";
        };
        EndLessModule.prototype.listProcessors = function () {
            return [new EndLessProcessor()
            ];
        };
        return EndLessModule;
    }(Module));
    endless.EndLessModule = EndLessModule;
    var EndLessProcessor = /** @class */ (function (_super) {
        __extends(EndLessProcessor, _super);
        function EndLessProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessProcessor.prototype.getName = function () {
            return "EndLessProcessor";
        };
        EndLessProcessor.prototype.playEndLessGame = function () {
            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            GameDataModel.levelStartTm = TimeUtil.getTimer();
            GameDataModel.lastMainHitVect = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z);
            Physics.ready = true;
            endless.EndlessManager.getInstance().CountdownTm = TimeUtil.getTimer() + endless.EndlessManager.getInstance().endlessConfigVo.maxtime; //存开始游戏时间
            ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS));
            ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.MUI_TIME_ADD_START));
            //  EndlessManager.getInstance().saveEndlessDataToWeb()
        };
        EndLessProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            switch ($event.type) {
                case EndLessEvent.ENDLESS_MODEL_START:
                    endless.EndlessManager.getInstance().startGame(function (res) {
                        if (res.name = "canplay") {
                            game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                            _this.playEndLessGame();
                        }
                    });
                    break;
                case EndLessEvent.MUI_TIME_ADD_START:
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.muiTimeAddStart();
                    }
                    break;
                case EndLessEvent.MUI_SHOW_ADD_SCENE_TIME:
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.showAddSceneTime($event.data);
                    }
                    break;
                case EndLessEvent.ENDLESS_NEED_ADD_SCENE:
                    endless.EndlessManager.getInstance().needAddNewScene();
                    if (this._endLessLeftRankPanel) {
                        this._endLessLeftRankPanel.rifrishData();
                    }
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.refristLayerNum();
                    }
                    break;
                case EndLessEvent.ENDLESS_CLEAR_LAST_SCENE:
                    endless.EndlessManager.getInstance().clearLastScene();
                    break;
                case EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS:
                    endless.EndlessManager.getInstance().saveEndlesreviveTimePos();
                    break;
                case EndLessEvent.HIDE_ALL_ENDLESS_PANEL:
                    if (this._endlessFinishPanel) {
                        this._endlessFinishPanel.hidePanel();
                    }
                    if (this._endLessLeftRankPanel) {
                        this._endLessLeftRankPanel.hidePanel();
                    }
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.hidePanel();
                    }
                    if (this._endLessRevivePanel) {
                        this._endLessRevivePanel.hidePanel();
                    }
                    break;
                case EndLessEvent.SHOW_ENDLESS_TOP_PANEL:
                    if (!this._endLessTopPanel) {
                        this._endLessTopPanel = new endless.EndLessTopPanel();
                    }
                    this._endLessTopPanel.showPanel();
                    break;
                case EndLessEvent.SHOW_ENDLESS_LEFT_RANK_PANEL:
                    if (!this._endLessLeftRankPanel) {
                        this._endLessLeftRankPanel = new endless.EndLessLeftRankPanel();
                    }
                    this._endLessLeftRankPanel.showPanel();
                    break;
                case EndLessEvent.SHOW_ENDLESS_FINISH_PANEL:
                    if (!this._endlessFinishPanel) {
                        this._endlessFinishPanel = new endless.EndlessFinishPanel();
                    }
                    this._endlessFinishPanel.showPanel();
                    break;
                case resetplay.ResetPlayEvent.SHOW_RESET_PLAY_PANEL:
                    if (GameData.gameType == 2) {
                        if (!this._endLessRevivePanel) {
                            this._endLessRevivePanel = new endless.EndLessRevivePanel();
                        }
                        this._endLessRevivePanel.showPanel();
                    }
                    break;
                default:
                    break;
            }
        };
        EndLessProcessor.prototype.listenModuleEvents = function () {
            return [
                new EndLessEvent(EndLessEvent.ENDLESS_MODEL_START),
                new EndLessEvent(EndLessEvent.ENDLESS_NEED_ADD_SCENE),
                new EndLessEvent(EndLessEvent.ENDLESS_CLEAR_LAST_SCENE),
                new EndLessEvent(EndLessEvent.HIDE_ALL_ENDLESS_PANEL),
                new EndLessEvent(EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS),
                new EndLessEvent(EndLessEvent.MUI_TIME_ADD_START),
                new EndLessEvent(EndLessEvent.MUI_SHOW_ADD_SCENE_TIME),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_TOP_PANEL),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_LEFT_RANK_PANEL),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_FINISH_PANEL),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_REVIVE_PANEL),
                new resetplay.ResetPlayEvent(resetplay.ResetPlayEvent.SHOW_RESET_PLAY_PANEL),
                new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT),
            ];
        };
        return EndLessProcessor;
    }(BaseProcessor));
    endless.EndLessProcessor = EndLessProcessor;
})(endless || (endless = {}));
//# sourceMappingURL=EndLessProcessor.js.map