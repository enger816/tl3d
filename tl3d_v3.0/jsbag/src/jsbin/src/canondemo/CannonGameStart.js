var game;
(function (game) {
    var AotuGravityManager = game.GameGravityManager;
    var CannoSoundManager = game.GameSoundManager;
    var GameDataModel = game.GameDataModel;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var LoadManager = Pan3d.LoadManager;
    var Vector3D = Pan3d.Vector3D;
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
    var Physics = canonkey.Physics;
    var CannonGameStart = /** @class */ (function () {
        function CannonGameStart() {
        }
        CannonGameStart.changeFunUrlLocal = function ($bfun) {
            var Pan3d_LoadManager_load = Pan3d.LoadManager.prototype.load;
            Pan3d.LoadManager.prototype.load = function ($url, $type, $fun, $info, $progressFun) {
                if ($info === void 0) { $info = null; }
                if ($progressFun === void 0) { $progressFun = null; }
                $url = GameData.getLoadFileIsLocalUrl($url);
                Pan3d_LoadManager_load.call(this, $url, $type, $fun, $info, $progressFun);
            };
            Pan3d.BaseRes.prototype.readImgLow = function () {
                var _this = this;
                this.imgNum = this._byte.readInt();
                this.imgLoadNum = 0;
                var time = TimeUtil.getTimer();
                var bytes = 0;
                for (var i = 0; i < this.imgNum; i++) {
                    var url = Scene_data.fileRoot + this._byte.readUTF();
                    var imgSize = this._byte.readInt();
                    bytes += imgSize;
                    Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.IMG_TYPE, function ($img) {
                        _this.loadImg($img);
                    });
                }
                this.allImgBytes = bytes;
            };
            console.log("GameData.version", GameData.version);
            GameData.getSeverTime(); //同步服务器时间
            GameData.WEB_SEVER_EVENT_AND_BACK("get_server_info", "version=" + GameData.version, function (res) {
                if (res && res.data && res.data.info) {
                    var $info = res.data.info;
                    if (!GameData.devicetypepc) {
                        Scene_data.fileRoot = $info.fileRoot;
                    }
                    if ($info.hasUpdate == "true") {
                        ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.MINI_GAME_NEED_UPDATA_EVENT));
                    }
                    CannonGameStart.loadWebConfigInfo($bfun, Scene_data.fileRoot + $info.serverinfourl);
                }
                else {
                    Scene_data.fileRoot = "res/";
                    console.log("那就本地配置");
                    CannonGameStart.loadWebConfigInfo($bfun, Scene_data.fileRoot + "serverinfo.json");
                }
            });
        };
        CannonGameStart.loadWebConfigInfo = function ($bfun, $url) {
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE, function ($str) {
                var obj = JSON.parse($str);
                GameData.severinfo = new VesionInfo();
                GameData.severinfo.meshObj(obj);
                GameData.maxLevel = GameData.severinfo.level;
                GameData.changeLocalUrlByArr(obj.localfile); //设置本地资源
                $bfun();
            });
        };
        CannonGameStart.initData = function ($scene) {
            game.ModuleList.startup(); //启动所有模块
            Scene_data.supportBlob = false;
            game.GameDataModel.initData($scene);
            var $gameBgSprite = new cannondis.GameBgSprite();
            $gameBgSprite._scene = GameDataModel.scene;
            GameDataModel.scene.addDisplay($gameBgSprite);
            this.loadDiamondsConfig();
        };
        CannonGameStart.loadDiamondsConfig = function () {
            var _this = this;
            GameData.initGameGetAllSync(function () {
                LoadManager.getInstance().load(Scene_data.fileRoot + "diamondsconfig.txt", LoadManager.XML_TYPE, function ($data) {
                    GameData.diamondsconfigRes = JSON.parse($data);
                    _this.starInGame();
                });
            });
        };
        CannonGameStart.meshWxQuery = function () {
            if (GameData.onLaunchRes) {
                var query = GameData.onLaunchRes.query;
                if (GameData.onLaunchRes.scene == 1104) {
                    console.log("从我的小程序进来的");
                    GameData.setStorageSync("scene1104", true);
                }
                if (query && query.type) {
                    switch (query.type) {
                        case "only_share":
                            if (GameData.getStorageSync("openid") != query.openid) {
                                var $postStr = "";
                                $postStr += "from_openid=" + query.openid; //别人的
                                $postStr += "&openid=" + GameData.getStorageSync("openid"); //自己的
                                if (query.tm && (GameData.getSeverTime() - query.tm) > 0) {
                                    var $useTim = GameData.getSeverTime() - query.tm;
                                    $postStr += "&info=" + GameData.onLaunchRes.scene + "_" + TimeUtil.getDiffTime1(Math.floor($useTim / 1000));
                                }
                                else {
                                    $postStr += "&info=" + GameData.onLaunchRes.scene;
                                }
                                $postStr += "&type=" + Number(query.sharetype);
                                GameData.WEB_SEVER_EVENT_AND_BACK("add_advertise", $postStr, function (res) { });
                            }
                            break;
                        default:
                            console.log("对应类型还没处理好");
                            break;
                    }
                }
            }
        };
        CannonGameStart.starInGame = function () {
            var _this = this;
            //GameData.wxQuery = {}
            //GameData.wxQuery.type = "call_help"
            //GameData.wxQuery.nickName = "1"
            //GameData.wxQuery.avatarUrl = "1"
            //GameData.wxQuery.openid = "1"
            //GameData.wxQuery.level = 1
            GameData.intervalLoginTm = 0;
            GameData.getSeverTime(function () {
                var $lastTime = GameData.getStorageSyncNumber("lasttime");
                if ($lastTime > 0) {
                    GameData.intervalLoginTm = Math.max(Math.floor((GameData.getSeverTime() - $lastTime) / 1000), 0);
                    if (GameData.getStorageSyncNumber("loginnum") >= GameData.severinfo.resetlevel.loginnum || GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) >= GameData.severinfo.resetlevel.minlevel) {
                        // 大于登入次数， 大于最小等级
                        console.log("离上一次间隔时间", GameData.intervalLoginTm, "秒");
                        if (GameData.intervalLoginTm > GameData.severinfo.resetlevel.resettm) {
                            GameData.setStorageSync("gameLevel", 1);
                            _this.iSresetLevel = true;
                        }
                    }
                    GameData.setStorageSync("lasttime", GameData.getSeverTime());
                    var $time = new Date(GameData.getSeverTime());
                    if (($time.getDay() == 6 || $time.getDay() == 7) && GameData.severinfo.aoutSharemode) {
                        GameData.severinfo.adshareModel = 2; //如果是周末就限制改为分享模式
                    }
                }
                var $startLevelNum = GameData.getStorageSyncNumber("gameLevel");
                if (_this.getWindowUrlParam() > 0) {
                    $startLevelNum = _this.getWindowUrlParam();
                }
                _this.meshWxQuery();
                $startLevelNum = Math.max(1, $startLevelNum);
                GameDataModel.levelNum = $startLevelNum;
                Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
                ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.INIT_SCENE_CONFIG));
            });
        };
        CannonGameStart.getWindowUrlParam = function () {
            if (getUrlParam("id")) {
                return Number(getUrlParam("id"));
            }
            else {
                return 0;
            }
        };
        CannonGameStart.addBaseSprite = function () {
            var $dis = new test.TestDisplaySprite();
            $dis.z = -50;
            $dis.y = 0;
            GameDataModel.scene.addDisplay($dis);
        };
        CannonGameStart.upFrame = function () {
            if (GameData.gameType == 1 || GameData.gameType == 2 || GameData.gameType == 5) {
                if (Physics.world && Physics.world.bodies) {
                    //   console.log(Physics.world.bodies.length)
                }
                if (GameData.hasWinPanel) {
                    GameDataModel.lastMainHitTm = TimeUtil.getTimer(); //这是为了更新最后的碰到，
                    return;
                }
                if (Physics.ready) {
                    this.testIsLost();
                    Physics.update();
                    CannoSoundManager.getInstance().upFrame();
                    AotuGravityManager.getInstance().upFrame(GameDataModel.centenBall);
                    GameDataModel.focus3d.y = GameDataModel.centenBall.y;
                    if (GameDataModel.centenBall && GameDataModel.centenBall.body) {
                        while (this.lastPos.length > 3) {
                            this.lastPos.shift();
                        }
                        if (GameData.isHitColone) {
                            if (this.bVector3D) {
                                if (this.skipNum++ > 2) {
                                    GameData.isHitColone = false;
                                    var caVector3D = GameDataModel.centenBall.getPostionV3d();
                                    var ang = this.acccc(this.aVector3D, this.bVector3D, caVector3D);
                                    var $can = Vector3D.distance(this.aVector3D, this.bVector3D) > 1;
                                    var isHight = Math.abs(this.bVector3D.y - caVector3D.y) > 2;
                                    this.aVector3D = null;
                                    this.bVector3D = null;
                                    if ((ang < 140 && $can) || isHight) {
                                        game.GameSoundManager.getInstance().collidehit();
                                    }
                                }
                            }
                            else {
                                this.aVector3D = this.lastPos[0];
                                this.bVector3D = GameDataModel.centenBall.getPostionV3d();
                                this.skipNum = 0;
                            }
                        }
                        else {
                            this.lastPos.push(GameDataModel.centenBall.getPostionV3d());
                        }
                    }
                }
            }
        };
        CannonGameStart.acccc = function ($A, $o, $B) {
            var a = $A.subtract($o);
            var b = $B.subtract($o);
            a.normalize();
            b.normalize();
            return (Math.acos(a.dot(b)) * 180 / Math.PI);
        };
        CannonGameStart.testIsLost = function () {
            if (!GameDataModel.isLevelFinish && GameDataModel.centenBall) {
                var $body = GameDataModel.centenBall.body;
                var $pos = GameDataModel.centenBall.getPostionV3d();
                var $isHitSound = false;
                for (var i = 0; i < Physics.world.contacts.length; i++) {
                    var $vo = Physics.world.contacts[i];
                    if ($vo.bi == $body || $vo.bj == $body) {
                        GameDataModel.lastMainHitTm = TimeUtil.getTimer();
                        GameDataModel.lastMainHitVect = $pos;
                    }
                }
                if (GameDataModel.centenBall.beginGravityVo) {
                    GameDataModel.lastMainHitTm = TimeUtil.getTimer();
                    GameDataModel.lastMainHitVect = $pos;
                }
                var tm = TimeUtil.getTimer() - GameDataModel.lastMainHitTm;
                var $lost = GameDataModel.lastMainHitVect && Vector3D.distance($pos, GameDataModel.lastMainHitVect) > 700;
                $lost = GameDataModel.lastMainHitVect && Vector3D.distance($pos, GameDataModel.lastMainHitVect) > 400;
                if (tm > 2000 || $lost) {
                    Physics.ready = false;
                    GameDataModel.modelRotation.x = 0;
                    GameDataModel.modelRotation.z = 0;
                    game.GameSoundManager.getInstance().playSoundByName(Scene_data.fileRoot + "sound/" + "lost" + ".mp3");
                    game.GameSoundManager.getInstance().playHitSound(1);
                    ModuleEventManager.dispatchEvent(new resetplay.ResetPlayEvent(resetplay.ResetPlayEvent.SHOW_RESET_PLAY_PANEL));
                }
            }
        };
        CannonGameStart.lastPos = [];
        CannonGameStart.skipNum = 0;
        CannonGameStart.kkkkk = 0;
        return CannonGameStart;
    }());
    game.CannonGameStart = CannonGameStart;
})(game || (game = {}));
//# sourceMappingURL=CannonGameStart.js.map