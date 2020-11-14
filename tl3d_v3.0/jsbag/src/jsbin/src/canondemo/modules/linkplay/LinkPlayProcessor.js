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
var linkplay;
(function (linkplay) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var LinkPlayEvent = /** @class */ (function (_super) {
        __extends(LinkPlayEvent, _super);
        function LinkPlayEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LinkPlayEvent.SHOW_LINK_PLAY_MAIN_PANEL = "SHOW_LINK_PLAY_MAIN_PANEL";
        LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL = "CLEAR_LINKPLAY_SCENE_ALL";
        LinkPlayEvent.HIDE_LINK_PLAY_START_PANEL = "HIDE_LINK_PLAY_START_PANEL";
        LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT = "MS_JOIN_ROOM_RESPONSE_EVENT";
        LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT = "MS_LEAVE_ROOM_NOTIFY_EVENT";
        LinkPlayEvent.MS_START_ENTER_SCENE_EVET = "MS_START_ENTER_SCENE_EVET";
        LinkPlayEvent.MS_CATCH_EVENT_NOTIFY = "MS_CATCH_EVENT_NOTIFY";
        LinkPlayEvent.SHOW_RECONNECT_TXT = "SHOW_RECONNECT_TXT";
        return LinkPlayEvent;
    }(BaseEvent));
    linkplay.LinkPlayEvent = LinkPlayEvent;
    var LinkPlayModule = /** @class */ (function (_super) {
        __extends(LinkPlayModule, _super);
        function LinkPlayModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LinkPlayModule.prototype.getModuleName = function () {
            return "LinkPlayModule";
        };
        LinkPlayModule.prototype.listProcessors = function () {
            return [
                new LinkPlayProcessor()
            ];
        };
        return LinkPlayModule;
    }(Module));
    linkplay.LinkPlayModule = LinkPlayModule;
    var LinkPlayProcessor = /** @class */ (function (_super) {
        __extends(LinkPlayProcessor, _super);
        function LinkPlayProcessor() {
            var _this = _super.call(this) || this;
            _this.frameFun = function () { _this.upFrame(); };
            return _this;
        }
        LinkPlayProcessor.prototype.getName = function () {
            return "LinkPlayProcessor";
        };
        LinkPlayProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            switch ($event.type) {
                case LinkPlayEvent.SHOW_LINK_PLAY_MAIN_PANEL:
                    if (!this._linkPlayMainUiPanel) {
                        this._linkPlayMainUiPanel = new linkplay.LinkPlayMainUiPanel();
                    }
                    this._linkPlayMainUiPanel.showPanel();
                    break;
                case LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL:
                    console.log("清理");
                    Physics.ready = false;
                    this.removeEvens();
                    linkplay.LinkPlayManager.getInstance().clearAllOnline();
                    linkplay.LinkUserListModel.getInstance().clearUser();
                    this._linkPlayMainUiPanel.hidePanel();
                    ;
                    //将世界属性设置回去
                    GameData.gameType = 1;
                    Physics.world.defaultContactMaterial.restitution = 0.01;
                    Physics.world.defaultContactMaterial.friction = 0.01;
                    GameData.dispatchToLevel(GameDataModel.levelNum);
                    break;
                case LinkPlayEvent.HIDE_LINK_PLAY_START_PANEL:
                    if (this._linkPlayStartPanel) {
                        this._linkPlayStartPanel.hidePanel();
                    }
                    break;
                case LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT:
                    if (!this._linkPlayStartPanel) {
                        this._linkPlayStartPanel = new linkplay.LinkPlayStartPanel();
                    }
                    this._linkPlayStartPanel.showPanel();
                    break;
                case LinkPlayEvent.SHOW_RECONNECT_TXT:
                    if (this._linkPlayMainUiPanel) {
                        this._linkPlayMainUiPanel.showReconnectTxt();
                    }
                    break;
                case LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT:
                    this._linkPlayStartPanel.refrishUserData();
                    break;
                case LinkPlayEvent.MS_CATCH_EVENT_NOTIFY:
                    linkplay.LinkUserListModel.getInstance().setEventNotyfy($event.data);
                    break;
                case LinkPlayEvent.MS_START_ENTER_SCENE_EVET:
                    MsEngine.linkplayGamestatus = 2;
                    this._linkPlayStartPanel.hidePanel();
                    Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL));
                    linkplay.LinkPlayManager.getInstance().startGame(function (res) {
                        if (res.name = "canplay") {
                            linkplay.LinkUserListModel.getInstance().makeUserListBall();
                            game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                            ModuleEventManager.dispatchEvent(new LinkPlayEvent(LinkPlayEvent.SHOW_LINK_PLAY_MAIN_PANEL));
                            GameDataModel.levelStartTm = TimeUtil.getTimer();
                            MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 1, tm: 0 }));
                            TimeUtil.addTimeOut(2000, function () {
                                linkplay.LinkPlayManager.getInstance().playOnlineGame();
                            });
                            _this.addEvets();
                        }
                    });
                    break;
                default:
                    break;
            }
        };
        LinkPlayProcessor.prototype.addEvets = function () {
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(new Pan3d.Vector3D(0, -Physics.gravity980, 0));
            console.log(canonkey.Physics.world.gravity);
            TimeUtil.addFrameTick(this.frameFun);
        };
        LinkPlayProcessor.prototype.removeEvens = function () {
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            TimeUtil.removeFrameTick(this.frameFun);
        };
        LinkPlayProcessor.prototype.onMouseMove = function ($evt) {
            var $v2d = new Pan3d.Vector2D($evt.x, $evt.y);
            if (GameData.gameType == 4) {
                if (GameDataModel.mouseDownPosint) {
                    var $k = $v2d;
                    $k = $k.subtract(GameDataModel.mouseDownPosint);
                    GameDataModel.modelRotation.x = GameDataModel.lastRotation.x + $k.x / 15;
                    GameDataModel.modelRotation.z = GameDataModel.lastRotation.z + $k.y / 15;
                    var $maxRoation45 = 40;
                    GameDataModel.modelRotation.x = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.x, -$maxRoation45));
                    GameDataModel.modelRotation.z = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.z, -$maxRoation45));
                    GameDataModel.setWorldGravityByModelRotatioin();
                }
            }
        };
        LinkPlayProcessor.prototype.onMouseDown = function ($evt) {
            var $v2d = new Pan3d.Vector2D($evt.x, $evt.y);
            if (!GameData.hasWinPanel) {
                GameDataModel.mouseDownPosint = $v2d;
                GameDataModel.lastRotation.x = GameDataModel.modelRotation.x;
                GameDataModel.lastRotation.y = GameDataModel.modelRotation.y;
                GameDataModel.lastRotation.z = GameDataModel.modelRotation.z;
            }
            else {
            }
        };
        LinkPlayProcessor.prototype.onMouseUp = function ($evt) {
            GameDataModel.mouseDownPosint = null;
        };
        LinkPlayProcessor.prototype.upFrame = function () {
            if (GameData.gameType == 4) {
                if (linkplay.LinkUserListModel.getInstance().lastSendTm < TimeUtil.getTimer() && Physics.ready) {
                    linkplay.LinkUserListModel.getInstance().sendMoveToSocket();
                }
                linkplay.LinkPlayManager.getInstance().upFrame();
            }
        };
        LinkPlayProcessor.prototype.listenModuleEvents = function () {
            return [
                new LinkPlayEvent(LinkPlayEvent.SHOW_LINK_PLAY_MAIN_PANEL),
                new LinkPlayEvent(LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL),
                new LinkPlayEvent(LinkPlayEvent.SHOW_RECONNECT_TXT),
                new LinkPlayEvent(LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT),
                new LinkPlayEvent(LinkPlayEvent.MS_START_ENTER_SCENE_EVET),
                new LinkPlayEvent(LinkPlayEvent.MS_CATCH_EVENT_NOTIFY),
                new LinkPlayEvent(LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT),
            ];
        };
        return LinkPlayProcessor;
    }(BaseProcessor));
    linkplay.LinkPlayProcessor = LinkPlayProcessor;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayProcessor.js.map