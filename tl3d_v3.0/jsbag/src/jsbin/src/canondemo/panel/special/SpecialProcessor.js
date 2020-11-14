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
var special;
(function (special) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneEvent = game.SceneEvent;
    var GameDataModel = game.GameDataModel;
    var GameLevelManeger = game.GameLevelManeger;
    var TopMenuEvent = topmenu.TopMenuEvent;
    var SpecialEvent = /** @class */ (function (_super) {
        __extends(SpecialEvent, _super);
        function SpecialEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpecialEvent.SHOW_SPECIAL_PANEL = "SHOW_SPECIAL_PANEL";
        SpecialEvent.SHOW_SPECIAL_FAIL_PANEL = "SHOW_SPECIAL_FAIL_PANEL";
        SpecialEvent.HIDE_SPECIAL_PANEL = "HIDE_SPECIAL_PANEL";
        SpecialEvent.SELECT_SPECIAL_LEVEL = "SELECT_SPECIAL_LEVEL";
        SpecialEvent.FINISH_LIST_SPECIAL = "FINISH_LIST_SPECIAL";
        return SpecialEvent;
    }(BaseEvent));
    special.SpecialEvent = SpecialEvent;
    var SpecialModule = /** @class */ (function (_super) {
        __extends(SpecialModule, _super);
        function SpecialModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpecialModule.prototype.getModuleName = function () {
            return "SpecialModule";
        };
        SpecialModule.prototype.listProcessors = function () {
            return [
                new SpecialProcessor()
            ];
        };
        return SpecialModule;
    }(Module));
    special.SpecialModule = SpecialModule;
    var SpecialProcessor = /** @class */ (function (_super) {
        __extends(SpecialProcessor, _super);
        function SpecialProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lookAtFinishVideoTm = 0;
            return _this;
        }
        SpecialProcessor.prototype.getName = function () {
            return "SpecialProcessor";
        };
        SpecialProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            switch ($event.type) {
                case SpecialEvent.SHOW_SPECIAL_PANEL:
                    if (!this._specialPanel) {
                        this._specialPanel = new special.SpecialPanel();
                    }
                    if ($event.data) {
                        this._specialPanel.showItem = null; //这表示需要更新
                    }
                    this._specialPanel.showPanel();
                    break;
                case SpecialEvent.HIDE_SPECIAL_PANEL:
                    if (this._specialPanel) {
                        this._specialPanel.hidePanel();
                    }
                    break;
                case SpecialEvent.FINISH_LIST_SPECIAL:
                    if (this._specialPanel) {
                        this._specialPanel.toBeFinishAll();
                    }
                    break;
                case SpecialEvent.SHOW_SPECIAL_FAIL_PANEL:
                    GameData.sendFailToWeb(this.selectSpecialMeshVo.levelnum);
                    msgalert.AlertUtil.show("失败了，请继续进行", "提示", function (value) {
                        if (value == 1) {
                            GameData.dispatchEvent(new SpecialEvent(SpecialEvent.SELECT_SPECIAL_LEVEL), _this.selectSpecialMeshVo);
                        }
                        else {
                            GameData.dispatchToLevel(GameDataModel.levelNum);
                        }
                    }, 2);
                    break;
                case SpecialEvent.SELECT_SPECIAL_LEVEL:
                    if (GameLevelManeger.getInstance().canUseLoaderLoad) {
                        if ($event.data) {
                            this.selectSpecialMeshVo = $event.data;
                        }
                        GameData.gameType = 5;
                        if (!this._specialLevelTopPanel) {
                            this._specialLevelTopPanel = new special.SpecialLevelTopPanel();
                        }
                        this._specialLevelTopPanel.rankeList = this.selectSpecialMeshVo.ranklist;
                        this._specialLevelTopPanel.showPanel();
                        //GameDataModel.changeSceneColor(this.selectSpecialMeshVo.colorid);
                        GameLevelManeger.getInstance().initXmlModel(this.selectSpecialMeshVo.mapname, function () {
                            console.log("场景加载完成准备开始游戏");
                        });
                        var $tittlename = "";
                        if (this.selectSpecialMeshVo.name.length > 0) {
                            $tittlename = this.selectSpecialMeshVo.name;
                        }
                        else {
                            $tittlename = String(this.selectSpecialMeshVo.levelnum);
                        }
                        GameData.dispatchEvent(new TopMenuEvent(TopMenuEvent.SET_TOP_TITTLE_TXT), Pan3d.ColorType.Whiteffffff + $tittlename);
                    }
                    else {
                        console.log("上个场景还没加载完");
                    }
                    break;
                case SceneEvent.SELECT_SCENE_LEVEL:
                    if (this._specialLevelTopPanel) {
                        this._specialLevelTopPanel.hiedPanel();
                    }
                    break;
                case SceneEvent.INIT_SCENE_CONFIG:
                    break;
                case leveluppan.LevelUpEvent.SHOW_LEVEL_UP_PANEL:
                    if (GameData.gameType == 5) {
                        this.showFinishEfict();
                        TimeUtil.addTimeOut(1500, function () {
                            msgalert.AlertUtil.show("恭喜你完成了" + _this.selectSpecialMeshVo.name + "\n自动返回关卡模式", "提示", function (value) {
                                GameData.dispatchToLevel(GameDataModel.levelNum);
                                ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                                GameData.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL), true);
                            }, 2);
                        });
                        this.sendFinishTmToWeb(this.selectSpecialMeshVo.levelnum);
                    }
                    break;
                default:
                    break;
            }
        };
        SpecialProcessor.prototype.sendFinishTmToWeb = function ($level) {
            var $specialdata = GameData.getStorageSync(special.SpecialPanel.SPECIAL_DATA_SYNC_STR);
            if (!$specialdata) {
                $specialdata = {};
            }
            if (!$specialdata[$level]) {
                $specialdata[$level] = {};
            }
            if (!$specialdata[$level].ispass) {
                console.log("记录今天有完成");
                $specialdata[$level].ispass = true;
                var specialLeveladd = GameData.getEveryDataSyncByName("specialLeveladd");
                specialLeveladd.num += 1;
                GameData.setEveryDataSyncByName("specialLeveladd", specialLeveladd.num);
            }
            GameData.setStorageSync(special.SpecialPanel.SPECIAL_DATA_SYNC_STR, $specialdata);
            var useTim = TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
            var $postStr = "";
            $postStr += "level=" + $level;
            $postStr += "&openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + useTim;
            if (GameData.isOtherPlay()) {
                if (GameData.userInfo && GameData.userInfo.nickName) {
                    $postStr += "&info=" + GameData.userInfo.nickName;
                }
                else {
                    $postStr += "&info=" + "没名";
                }
                GameData.WEB_SEVER_EVENT_AND_BACK("add_success", $postStr, function (res) {
                    console.log("add_success", res);
                });
            }
        };
        SpecialProcessor.prototype.showFinishEfict = function () {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SHOW_SPECIAL_EFFECT), { pos: GameDataModel.centenBall.getPostionV3d(), name: "levelup" });
            game.GameSoundManager.getInstance().playSoundByName(Pan3d.Scene_data.fileRoot + "sound/" + "pass" + ".mp3");
        };
        SpecialProcessor.prototype.listenModuleEvents = function () {
            return [
                new SpecialEvent(SpecialEvent.SHOW_SPECIAL_PANEL),
                new SpecialEvent(SpecialEvent.HIDE_SPECIAL_PANEL),
                new SpecialEvent(SpecialEvent.SHOW_SPECIAL_FAIL_PANEL),
                new SpecialEvent(SpecialEvent.SELECT_SPECIAL_LEVEL),
                new SpecialEvent(SpecialEvent.FINISH_LIST_SPECIAL),
                new SceneEvent(SceneEvent.SELECT_SCENE_LEVEL),
                new SceneEvent(SceneEvent.INIT_SCENE_CONFIG),
                new leveluppan.LevelUpEvent(leveluppan.LevelUpEvent.SHOW_LEVEL_UP_PANEL),
            ];
        };
        return SpecialProcessor;
    }(BaseProcessor));
    special.SpecialProcessor = SpecialProcessor;
})(special || (special = {}));
//# sourceMappingURL=SpecialProcessor.js.map