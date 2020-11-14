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
var game;
(function (game) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameLevelManeger = game.GameLevelManeger;
    var GameDataModel = game.GameDataModel;
    var GameSceneManager = game.GameSceneManager;
    var SceneProcessor = /** @class */ (function (_super) {
        __extends(SceneProcessor, _super);
        function SceneProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastLevelNum = 0;
            return _this;
        }
        SceneProcessor.prototype.getName = function () {
            return "SceneProcessor";
        };
        SceneProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof game.SceneEvent) {
                this.meshSceneEvent($event);
            }
        };
        SceneProcessor.prototype.initConfig = function () {
            GameDataModel.modelRotation = new Pan3d.Vector3D();
            GameDataModel.lastRotation = new Pan3d.Vector3D();
            GameLevelManeger.getInstance()._scene = GameDataModel.scene;
            GameLevelManeger.getInstance().initScene(new GameSceneManager(GameDataModel.scene));
            GameData.dispatchToLevel(GameDataModel.levelNum);
        };
        SceneProcessor.prototype.wxOnShow = function (value) {
            game.GameSoundManager.getInstance().resetAudio();
            if (GameData.onshowRes.scene == 1104) {
                console.log("从我的小程序进来的");
                GameData.setStorageSync("scene1104", true);
            }
        };
        SceneProcessor.prototype.toshareEvet = function (value) {
            var _this = this;
            if (this.lastAllShareMeshVo) {
                if (this.lastAllShareMeshVo.shareTm > Pan3d.TimeUtil.getTimer() - 3000) {
                    console.log("5秒前刚分享过，所以这次不会再发送事件");
                    return;
                }
            }
            this.lastAllShareMeshVo = value;
            this.lastAllShareMeshVo.shareTm = Pan3d.TimeUtil.getTimer();
            var queryStr = "";
            queryStr += "type=" + "only_share";
            queryStr += "&openid=" + GameData.getStorageSync("openid");
            queryStr += "&sharetype=" + value.sharetype;
            queryStr += "&tm=" + GameData.getSeverTime();
            GameData.WX_ON_SHARE_APP_MESSAGE("分享有礼", queryStr, function (res) {
            }, false);
            if (GameData.devicetypepc) {
                Pan3d.TimeUtil.addTimeOut(3000, function () {
                    _this.shareMeshTime();
                });
            }
        };
        SceneProcessor.prototype.shareMeshTime = function () {
            if (this.lastAllShareMeshVo) {
                var $waitTime = GameData.severinfo.sharetime[random(GameData.severinfo.sharetime.length)];
                if (Pan3d.TimeUtil.getTimer() > (this.lastAllShareMeshVo.shareTm + $waitTime)) {
                    if (Pan3d.TimeUtil.getTimer() > this.lastAllShareMeshVo.shareTm + 15 * 1000) {
                        console.log("超过15秒为无效");
                    }
                    else {
                        console.log("分享成功--share=>id->", this.lastAllShareMeshVo.id);
                        this.lastAllShareMeshVo.bfun(1);
                        GameData.addShareToWeb(this.lastAllShareMeshVo.sharetype, this.lastAllShareMeshVo.id);
                    }
                }
                else {
                    console.log("分享不成功");
                    var $tipStr = this.getRandomShareTipstr();
                    if (GameData.severinfo.msgToast < Math.random() || GameData.devicetypepc) {
                        msgalert.OnlyTopTxt.show($tipStr);
                    }
                    else {
                        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_SHOW_TOAST_MSG), $tipStr); //系统提示
                    }
                    this.lastAllShareMeshVo.bfun(0);
                    AllShareMeshVo.shareSkipId = Math.max(0, AllShareMeshVo.shareSkipId - 1); //失败的话分享id减回去
                }
            }
        };
        SceneProcessor.prototype.getRandomShareTipstr = function () {
            var $arr = new Array();
            $arr.push("没有分享成功");
            if (this.lastAllShareMeshVo.id > 2) {
                $arr.push("没有分享成功，请分享到聊天群");
                $arr.push("没分享成功，请换个好友试试");
                $arr.push("没分享成功，换个不同的群试试");
            }
            return $arr[random($arr.length)];
        };
        SceneProcessor.prototype.meshSceneEvent = function (evt) {
            switch (evt.type) {
                case game.SceneEvent.INIT_SCENE_CONFIG:
                    this.initConfig();
                    // ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new topstart.TopStartEvent(topstart.TopStartEvent.SHOW_TOP_START_PANEL));
                    break;
                case game.SceneEvent.SHOW_SPECIAL_EFFECT:
                    this.showSpecialEffect(evt.data);
                    break;
                case game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT:
                    if (GameData.devicetypepc) {
                        Pan3d.TimeUtil.addTimeOut(1000, function () {
                            evt.data && evt.data(1);
                            console.log("视屏看完");
                        });
                    }
                    break;
                case game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT:
                    this.toshareEvet(evt.data);
                    break;
                case game.SceneEvent.WX_ON_SHOW:
                    console.log("WX_ON_SHOW_scene");
                    this.wxOnShow(evt.data);
                    this.shareMeshTime();
                    break;
                case game.SceneEvent.SELECT_SCENE_LEVEL:
                    if (GameLevelManeger.getInstance().canUseLoaderLoad) {
                        if (this.lastLevelNum != evt.data) {
                            this.lastLevelNum = evt.data;
                        }
                        GameDataModel.levelNum = Math.min(GameData.maxLevel, evt.data);
                        var $mapUrl = "";
                        var isEasy = true;
                        $mapUrl = String(1000 + GameDataModel.levelNum);
                        GameLevelManeger.getInstance().initXmlModel($mapUrl, function () {
                            for (var i = 1; i < 5; i++) {
                                if (GameDataModel.levelNum + i < GameData.maxLevel) {
                                    GameLevelManeger.getInstance().loadNextSceneData(String(1000 + GameDataModel.levelNum + i));
                                }
                            }
                        });
                        GameData.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.SET_TOP_TITTLE_TXT), Pan3d.ColorType.Whiteffffff + "第 " + GameDataModel.levelNum + " 关");
                    }
                    break;
                default:
                    break;
            }
        };
        SceneProcessor.prototype.showSpecialEffect = function (value) {
            var $v3d = value.pos;
            var $name = value.name;
            if (Scene_data.supportBlob) {
                $name = $name.replace("_lyf", "");
                this.playLyf("model/" + $name + "_lyf.txt", $v3d);
            }
            else {
                this.playLyf("model/" + $name + "_base.txt", $v3d);
            }
        };
        SceneProcessor.prototype.playLyf = function ($url, $pos, $r) {
            var _this = this;
            if ($r === void 0) { $r = 0; }
            var $scene = GameDataModel.scene;
            $scene.groupDataManager.scene = $scene;
            $scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.scaleX = 3;
                        $particle.scaleY = 3;
                        $particle.scaleZ = 3;
                        $particle.rotationY = $r;
                        $scene.particleManager.addParticle($particle);
                        $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, _this.onPlayCom, _this);
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        SceneProcessor.prototype.onPlayCom = function (value) {
            var $scene = GameDataModel.scene;
            $scene.particleManager.removeParticle((value.target));
        };
        SceneProcessor.prototype.listenModuleEvents = function () {
            return [
                new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL),
                new game.SceneEvent(game.SceneEvent.INIT_SCENE_CONFIG),
                new game.SceneEvent(game.SceneEvent.SHOW_SPECIAL_EFFECT),
                new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT),
                new game.SceneEvent(game.SceneEvent.WX_ON_SHOW),
                new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT),
            ];
        };
        return SceneProcessor;
    }(BaseProcessor));
    game.SceneProcessor = SceneProcessor;
})(game || (game = {}));
//# sourceMappingURL=SceneProcessor.js.map