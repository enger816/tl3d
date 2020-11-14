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
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var EndLessEvent = /** @class */ (function (_super) {
        __extends(EndLessEvent, _super);
        function EndLessEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessEvent.ENDLESS_MODEL_START = "ENDLESS_MODEL_START";
        EndLessEvent.ENDLESS_NEED_ADD_SCENE = "ENDLESS_NEED_ADD_SCENE";
        EndLessEvent.ENDLESS_CLEAR_LAST_SCENE = "ENDLESS_CLEAR_LAST_SCENE";
        EndLessEvent.RETEN_BASE_LEVEL_SCENE = "RETEN_BASE_LEVEL_SCENE";
        EndLessEvent.SHOW_ENDLEST_START_PANEL = "SHOW_ENDLEST_START_PANEL";
        EndLessEvent.SHOW_ENDLESS_TOP_PANEL = "SHOW_ENDLESS_TOP_PANEL";
        EndLessEvent.SHOW_ENDLESS_FINISH_PANEL = "SHOW_ENDLESS_FINISH_PANEL";
        EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS = "SAVE_ENDLESS_REVIVE_TIME_POS";
        EndLessEvent.MUI_TIME_ADD_START = "MUI_TIME_ADD_START";
        EndLessEvent.MUI_SHOW_ADD_SCENE_TIME = "MUI_SHOW_ADD_SCENE_TIME";
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
        EndLessProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof EndLessEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case EndLessEvent.ENDLESS_MODEL_START:
                        endless.EndlessManager.getInstance().startGame(function (res) {
                            if (res.name = "canplay") {
                                if (!_this._endLessTopPanel) {
                                    _this._endLessTopPanel = new endless.EndLessTopPanel();
                                }
                                _this._endLessTopPanel.showPanel();
                                game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                                ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SHOW_ENDLEST_START_PANEL));
                            }
                        });
                        ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.REFRISH_MAIN_UI));
                        break;
                    case EndLessEvent.SHOW_ENDLEST_START_PANEL:
                        if (!this._endLessStartPanel) {
                            this._endLessStartPanel = new endless.EndLessStartPanel();
                        }
                        this._endLessStartPanel.showPanel();
                        break;
                    case EndLessEvent.MUI_TIME_ADD_START:
                        this._endLessTopPanel.muiTimeAddStart();
                        break;
                    case EndLessEvent.MUI_SHOW_ADD_SCENE_TIME:
                        this._endLessTopPanel.showAddSceneTime($endLessEvent.data);
                        break;
                    case EndLessEvent.ENDLESS_NEED_ADD_SCENE:
                        endless.EndlessManager.getInstance().needAddNewScene();
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
                    case EndLessEvent.SHOW_ENDLESS_FINISH_PANEL:
                        if (!this._endlessFinishPanel) {
                            this._endlessFinishPanel = new endless.EndlessFinishPanel();
                        }
                        this._endlessFinishPanel.showPanel();
                        break;
                    case EndLessEvent.RETEN_BASE_LEVEL_SCENE:
                        if (this._endLessTopPanel) {
                            this._endLessTopPanel.hidePanel();
                        }
                        if (this._endLessStartPanel) {
                            this._endLessStartPanel.hidePanel();
                        }
                        if (this._endLessRevivePanel) {
                            this._endLessRevivePanel.hidePanel();
                        }
                        if (this._endlessFinishPanel) {
                            this._endlessFinishPanel.hidePanel();
                        }
                        break;
                    default:
                        break;
                }
            }
            if ($event instanceof uiview.TopUiViewEvent) {
                var $topUiViewEvent = $event;
                switch ($topUiViewEvent.type) {
                    case uiview.TopUiViewEvent.SHOW_LEVEL_LOSET_VIEW:
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
            }
            if ($event instanceof SceneEvent) {
                var $sceneEvent = $event;
                switch ($sceneEvent.type) {
                    case SceneEvent.DIAMONDS_SPRITE_HIT_EVENT:
                        if (this._endLessTopPanel) {
                            this._endLessTopPanel.refrishDiamondNum();
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        EndLessProcessor.prototype.listenModuleEvents = function () {
            return [
                new EndLessEvent(EndLessEvent.ENDLESS_MODEL_START),
                new EndLessEvent(EndLessEvent.ENDLESS_NEED_ADD_SCENE),
                new EndLessEvent(EndLessEvent.ENDLESS_CLEAR_LAST_SCENE),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_FINISH_PANEL),
                new EndLessEvent(EndLessEvent.SHOW_ENDLEST_START_PANEL),
                new EndLessEvent(EndLessEvent.RETEN_BASE_LEVEL_SCENE),
                new EndLessEvent(EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS),
                new EndLessEvent(EndLessEvent.MUI_TIME_ADD_START),
                new EndLessEvent(EndLessEvent.MUI_SHOW_ADD_SCENE_TIME),
                new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT),
                new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_LEVEL_LOSET_VIEW),
            ];
        };
        return EndLessProcessor;
    }(BaseProcessor));
    endless.EndLessProcessor = EndLessProcessor;
})(endless || (endless = {}));
//# sourceMappingURL=EndLessProcessor.js.map