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
var online;
(function (online) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var OnlineEvent = /** @class */ (function (_super) {
        __extends(OnlineEvent, _super);
        function OnlineEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OnlineEvent.SHOW_ONLINE_START_PANEL = "SHOW_ONLINE_START_PANEL";
        OnlineEvent.SHOW_ONLINE_MAIN_PANEL = "SHOW_ONLINE_MAIN_PANEL";
        OnlineEvent.SHOW_ONLINE_FINISH_PANEL = "SHOW_ONLINE_FINISH_PANEL";
        OnlineEvent.PLAY_ONLINE_SCENE_START = "PLAY_ONLINE_SCENE_START";
        OnlineEvent.CLEAR_ONLINE_SCENE_ALL = "CLEAR_ONLINE_SCENE_ALL";
        OnlineEvent.TEST_FRIST_TIP_ONLINE_PLAY = "TEST_FRIST_TIP_ONLINE_PLAY";
        return OnlineEvent;
    }(BaseEvent));
    online.OnlineEvent = OnlineEvent;
    var OnlineModule = /** @class */ (function (_super) {
        __extends(OnlineModule, _super);
        function OnlineModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OnlineModule.prototype.getModuleName = function () {
            return "OnlineModule";
        };
        OnlineModule.prototype.listProcessors = function () {
            return [
                new OnlineProcessor()
            ];
        };
        return OnlineModule;
    }(Module));
    online.OnlineModule = OnlineModule;
    var OnlineProcessor = /** @class */ (function (_super) {
        __extends(OnlineProcessor, _super);
        function OnlineProcessor() {
            var _this = _super.call(this) || this;
            _this.frameFun = function () { _this.upFrame(); };
            return _this;
        }
        OnlineProcessor.prototype.getName = function () {
            return "OnlineProcessor";
        };
        OnlineProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if (!GameData.severinfo.onlinegame.open) {
                return;
            }
            if ($event instanceof OnlineEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case OnlineEvent.SHOW_ONLINE_START_PANEL:
                        if (!this._invitationPanel) {
                            this._invitationPanel = new online.OnlineStartPanel();
                        }
                        this._invitationPanel.showPanel();
                        break;
                    case OnlineEvent.SHOW_ONLINE_MAIN_PANEL:
                        if (!this._onlineMainPanel) {
                            this._onlineMainPanel = new online.OnlineMainPanel();
                        }
                        this._onlineMainPanel.showPanel();
                        break;
                    case OnlineEvent.TEST_FRIST_TIP_ONLINE_PLAY:
                        this.textToOnlineScene();
                        break;
                    case OnlineEvent.SHOW_ONLINE_FINISH_PANEL:
                        if (!this._onlineFinishPanel) {
                            this._onlineFinishPanel = new online.OnlineFinishPanel();
                        }
                        Physics.ready = false;
                        this._onlineFinishPanel.showPanel();
                        break;
                    case OnlineEvent.PLAY_ONLINE_SCENE_START:
                        online.OnlineManager.getInstance().startGame(function (res) {
                            if (res.name = "canplay") {
                                game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                                _this.addEvets();
                            }
                        });
                        ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.REFRISH_MAIN_UI));
                        break;
                    case OnlineEvent.CLEAR_ONLINE_SCENE_ALL:
                        Physics.ready = false;
                        this.removeEvens();
                        online.OnlineManager.getInstance().clearAllOnline();
                        this._onlineMainPanel.hidePanel();
                        ;
                        //将世界属性设置回去
                        GameData.gameType = 1;
                        Physics.world.defaultContactMaterial.restitution = 0.01;
                        Physics.world.defaultContactMaterial.friction = 0.01;
                        GameData.dispatchToLevel(GameDataModel.levelNum);
                        break;
                    default:
                        break;
                }
            }
        };
        OnlineProcessor.prototype.textToOnlineScene = function () {
            var _this = this;
            var maxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
            if (maxLevel > 14) {
                Pan3d.TimeUtil.addTimeOut(1000, function () {
                    var $tm = GameData.getSeverTime() - GameData.getStorageSyncNumber("onlineTm");
                    if ($tm > GameData.severinfo.onlinegame.intervaltime * 1000) {
                        _this.showDuobaoPanda();
                    }
                });
            }
        };
        OnlineProcessor.prototype.showDuobaoPanda = function () {
            var obj = new tips.PandaMeshData();
            obj.url = Scene_data.fileRoot + "ui/panda/13.png";
            obj.type = tips.PandaMeshData.type1;
            obj.key = tips.PandaMeshData.key13;
            obj.data = new online.OnlineEvent(online.OnlineEvent.SHOW_ONLINE_START_PANEL);
            var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
            $topUiViewEvent.data = obj;
            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
        };
        OnlineProcessor.prototype.addEvets = function () {
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(new Pan3d.Vector3D(0, -Physics.gravity980, 0));
            TimeUtil.addFrameTick(this.frameFun);
        };
        OnlineProcessor.prototype.upFrame = function () {
            if (GameData.gameType == 3) {
                online.OnlineManager.getInstance().upFrame();
                online.OnlineUserAiModel.getInstance().upFrame();
            }
        };
        OnlineProcessor.prototype.removeEvens = function () {
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            TimeUtil.removeFrameTick(this.frameFun);
        };
        OnlineProcessor.prototype.onMouseMove = function ($evt) {
            var $v2d = new Pan3d.Vector2D($evt.x, $evt.y);
            if (GameData.gameType == 3) {
                if (GameDataModel.mouseDownPosint) {
                    var $k = $v2d;
                    $k = $k.subtract(GameDataModel.mouseDownPosint);
                    GameDataModel.modelRotation.x = GameDataModel.lastRotation.x + $k.x / 15;
                    GameDataModel.modelRotation.z = GameDataModel.lastRotation.z + $k.y / 15;
                    var $maxRoation45 = 40;
                    GameDataModel.modelRotation.x = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.x, -$maxRoation45));
                    GameDataModel.modelRotation.z = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.z, -$maxRoation45));
                    this.setWorldGravityByModelRotatioin();
                }
            }
        };
        OnlineProcessor.prototype.onMouseDown = function ($evt) {
            var $v2d = new Pan3d.Vector2D($evt.x, $evt.y);
            var $play = true;
            for (var i = 0; i < Pan3d.UIManager.getInstance()._containerList.length; i++) {
                if (Pan3d.UIManager.getInstance()._containerList[i].interfaceUI == false) {
                    $play = false;
                }
            }
            if ($play) {
                GameDataModel.mouseDownPosint = $v2d;
                GameDataModel.lastRotation.x = GameDataModel.modelRotation.x;
                GameDataModel.lastRotation.y = GameDataModel.modelRotation.y;
                GameDataModel.lastRotation.z = GameDataModel.modelRotation.z;
            }
            else {
                traceLog("UI面板有不是主UI的");
            }
        };
        OnlineProcessor.prototype.onMouseUp = function ($evt) {
            GameDataModel.mouseDownPosint = null;
        };
        OnlineProcessor.prototype.setWorldGravityByModelRotatioin = function () {
            var bindMatrix3D = new Pan3d.Matrix3D;
            bindMatrix3D.appendRotation(GameDataModel.modelRotation.z, Pan3d.Vector3D.X_AXIS);
            bindMatrix3D.appendRotation(GameDataModel.modelRotation.x, Pan3d.Vector3D.Z_AXIS);
            bindMatrix3D.appendRotation(-GameDataModel.gameAngle, Pan3d.Vector3D.Y_AXIS);
            if (!online.OnlineManager.getInstance().isAotuPaly) {
                var ddd = bindMatrix3D.transformVector(new Pan3d.Vector3D(0, -Physics.gravity980 / 2, 0));
                GameDataModel.centenBall.bodyfouce = ddd;
            }
        };
        OnlineProcessor.prototype.listenModuleEvents = function () {
            return [
                new OnlineEvent(OnlineEvent.SHOW_ONLINE_START_PANEL),
                new OnlineEvent(OnlineEvent.SHOW_ONLINE_MAIN_PANEL),
                new OnlineEvent(OnlineEvent.SHOW_ONLINE_FINISH_PANEL),
                new OnlineEvent(OnlineEvent.PLAY_ONLINE_SCENE_START),
                new OnlineEvent(OnlineEvent.CLEAR_ONLINE_SCENE_ALL),
                new OnlineEvent(OnlineEvent.TEST_FRIST_TIP_ONLINE_PLAY),
            ];
        };
        return OnlineProcessor;
    }(BaseProcessor));
    online.OnlineProcessor = OnlineProcessor;
})(online || (online = {}));
//# sourceMappingURL=OnlineProcessor.js.map