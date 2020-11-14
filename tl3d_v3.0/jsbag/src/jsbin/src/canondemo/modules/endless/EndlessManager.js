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
    var Display3D = Pan3d.Display3D;
    var Vector3D = Pan3d.Vector3D;
    var BaseRes = Pan3d.BaseRes;
    var TimeUtil = Pan3d.TimeUtil;
    var CanonSceneSprite = cannondis.CanonSceneSprite;
    var DirectShadowColorSprite = cannondis.DirectShadowColorSprite;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var EndlessConfigVo = /** @class */ (function () {
        function EndlessConfigVo() {
        }
        return EndlessConfigVo;
    }());
    endless.EndlessConfigVo = EndlessConfigVo;
    var EndlessManager = /** @class */ (function (_super) {
        __extends(EndlessManager, _super);
        function EndlessManager() {
            var _this = _super.call(this) || this;
            _this.selfBestScore = 0;
            _this.layerNum = 1;
            _this.lastSelectSceneId = 0;
            _this.sceneId = 0;
            return _this;
        }
        EndlessManager.getInstance = function () {
            if (!EndlessManager._instance) {
                EndlessManager._instance = new EndlessManager();
            }
            return EndlessManager._instance;
        };
        EndlessManager.prototype.saveEndlessDataToWeb = function () {
            if (this.layerNum > this.selfBestScore) {
                var openid = GameData.getStorageSync("openid");
                var infoUrl;
                if (GameData.userInfo && GameData.userInfo.avatarUrl.length) {
                    infoUrl = GameData.userInfo.avatarUrl;
                }
                else {
                    infoUrl = GameData.emptyiconUrl;
                }
                var $postStr = "";
                $postStr += "level=" + 1;
                $postStr += "&openid=" + openid;
                $postStr += "&score=" + this.layerNum;
                $postStr += "&info=" + infoUrl;
                GameData.WEB_SEVER_EVENT_AND_BACK("add_endless_play", $postStr, function (res) {
                });
            }
        };
        EndlessManager.prototype.clearAllEndless = function () {
            while (this.modelItems && this.modelItems.length) {
                this.removeDisplay(this.modelItems.pop());
            }
            this.modelItems = new Array;
            while (this.frame3dItem && this.frame3dItem.length) {
                var frame3Ddis = this.frame3dItem.pop();
                frame3Ddis.destory();
            }
            this.frame3dItem = new Array;
        };
        EndlessManager.prototype.startGame = function ($bfun) {
            this._backSartFun = $bfun;
            GameData.gameType = 2;
            GameData.setStorageSync("fristShowEndLell", true);
            this._scene = GameDataModel.scene;
            this._cannoSceneManager = game.GameLevelManeger.getInstance()._cannoSceneManager;
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            game.GameLevelManeger.getInstance().makeBaseLevelObj();
            this.clearAllEndless();
            if (!Boolean(this.baseSceneItem)) {
                this.baseSceneItem = new Array();
                var $obj = GameData.severinfo.endless;
                this.endlessConfigVo = new EndlessConfigVo;
                this.endlessConfigVo.levelitem = $obj.levelitem;
                this.endlessConfigVo.addtimeitem = $obj.addtimeitem;
                this.endlessConfigVo.maxtime = $obj.maxtime * 1000;
                this.endlessConfigVo.waitrevivetime = $obj.waitrevivetime * 1000;
                this.endlessConfigVo.timefinishrealplaynum = $obj.timefinishrealplaynum;
                for (var i = 0; i < this.endlessConfigVo.levelitem.length; i++) {
                    var $vo = new endless.EndlessMapSceneVo();
                    $vo.mapuid = this.endlessConfigVo.levelitem[i];
                    this.baseSceneItem.push($vo);
                }
                this.loadAllScene();
            }
            else {
                this.meshAddScene();
            }
        };
        EndlessManager.prototype.getAddLevelBySceneId = function (value) {
            for (var i = 0; i < this.endlessConfigVo.addtimeitem.length; i++) {
                if (this.endlessConfigVo.addtimeitem[i].mapuid == value) {
                    return this.endlessConfigVo.addtimeitem[i].addtime;
                }
            }
            return 0;
        };
        EndlessManager.prototype.failWaitLoadScene = function () {
            var _this = this;
            Pan3d.TimeUtil.addTimeOut(2000, function () {
                _this.startGame(_this._backSartFun);
            });
        };
        EndlessManager.prototype.testLoadFinish = function () {
            var $finish = true;
            for (var i = 0; i < this.baseSceneItem.length; i++) {
                if (!this.baseSceneItem[i].isfinish) {
                    $finish = false;
                }
            }
            if ($finish) {
                this.meshAddScene();
            }
        };
        EndlessManager.prototype.loadAllScene = function () {
            var _this = this;
            for (var i = 0; i < this.baseSceneItem.length; i++) {
                this.baseSceneItem[i].initData(function () {
                    _this.testLoadFinish();
                });
            }
        };
        EndlessManager.prototype.meshAddScene = function () {
            var _this = this;
            GameDataModel.gameAngle = 0;
            this.layerNum = 1;
            game.GameGravityManager.getInstance()._gravityItem = new Array;
            this.nextScenePostion = new Vector3D(0, 0, 0);
            this.meshTempScene(this.baseSceneItem[0]); //初始添加两个场景
            this.meshTempScene(this.baseSceneItem[1]);
            Pan3d.TimeUtil.addTimeOut(100, function () {
                _this._backSartFun({ name: "canplay" });
            });
        };
        EndlessManager.prototype.getNextLevelRanomdId = function () {
            var $id = this.lastSelectSceneId;
            while (this.lastSelectSceneId == $id) {
                $id = random(this.baseSceneItem.length);
            }
            this.lastSelectSceneId = $id;
            return $id;
        };
        EndlessManager.prototype.needAddNewScene = function () {
            this.layerNum++;
            if (this.selfBestScore > this.layerNum) {
                this.layerNum = Math.max(this.layerNum, Math.floor(this.selfBestScore / 2)); //取最大值的一半
            }
            this.saveEndlessDataToWeb();
            var $addScene = this.baseSceneItem[this.getNextLevelRanomdId()];
            GameData.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.MUI_SHOW_ADD_SCENE_TIME), this.nextShowAddTime);
            this.CountdownTm = Math.min(this.CountdownTm + this.nextShowAddTime * 1000, TimeUtil.getTimer() + this.endlessConfigVo.maxtime);
            this.meshTempScene($addScene);
            //     this.meshTempScene(this.baseSceneItem[0]);//初始添加两个场景
        };
        EndlessManager.prototype.saveEndlesreviveTimePos = function () {
            this.nextRevivePostion = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z);
            this.nextReviveTm = this.CountdownTm - TimeUtil.getTimer();
        };
        EndlessManager.prototype.clearLastScene = function () {
            for (var i = (this.modelItems.length - 1); i >= 0; i--) {
                var num = Number(this.modelItems[i].name);
                if (num < this.sceneId - 1) {
                    this.removeDisplay(this.modelItems[i]);
                }
            }
            this.removeLastFrame3d();
        };
        EndlessManager.prototype.removeLastFrame3d = function () {
            for (var i = (this.frame3dItem.length - 1); i >= 0; i--) {
                var num = Number(this.frame3dItem[i].name);
                if (num < this.sceneId - 1) {
                    this.frame3dItem[i].destory();
                }
            }
        };
        EndlessManager.prototype.removeDisplay = function ($display) {
            var index = this.modelItems.indexOf($display);
            if (index != -1) {
                this.modelItems.splice(index, 1);
            }
            $display.destory();
        };
        EndlessManager.prototype.meshTempScene = function ($vo) {
            this.nextShowAddTime = this.getAddLevelBySceneId($vo.mapuid);
            GameDataModel.levelStartTm = TimeUtil.getTimer();
            this.sceneId++;
            var $cloneV3d = this.nextScenePostion.clone();
            var $obj = $vo.sceneRes.sceneData;
            var buildAry = $obj.buildItem;
            var sceneCollisionItem = $obj.sceneCollisionItem;
            for (var j = 0; j < buildAry.length; j++) {
                var itemObj = buildAry[j];
                console.log(itemObj.type);
                if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $jiguan = this._cannoSceneManager.addJIguangse(itemObj);
                    $jiguan.x = itemObj.x + this.nextScenePostion.x;
                    $jiguan.y = itemObj.y + this.nextScenePostion.y;
                    $jiguan.z = itemObj.z + this.nextScenePostion.z;
                    $jiguan.name = String(this.sceneId);
                    this.frame3dItem.push($jiguan);
                }
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    if (itemObj.name != "level_start") {
                        if (itemObj.name == "sign_begin" || itemObj.name == "sign_end") {
                            var $gravityVo = new GravityVo();
                            $gravityVo.x = itemObj.x + this.nextScenePostion.x;
                            $gravityVo.y = itemObj.y + this.nextScenePostion.y;
                            $gravityVo.z = itemObj.z + this.nextScenePostion.z;
                            switch (itemObj.name) {
                                case "sign_begin":
                                    $gravityVo.type = 1;
                                    $cloneV3d.x = $gravityVo.x;
                                    $cloneV3d.y = $gravityVo.y;
                                    $cloneV3d.y -= 600;
                                    $cloneV3d.z = $gravityVo.z;
                                    break;
                                case "sign_end":
                                    $gravityVo.type = 2;
                                    break;
                                default:
                                    console.log("没有这个类型，所以请注意");
                                    break;
                            }
                            game.GameGravityManager.getInstance()._gravityItem.push($gravityVo);
                        }
                        else {
                            this.addModelConlltion(itemObj, sceneCollisionItem, this.nextScenePostion); //场景导出有碰撞体模型
                        }
                    }
                }
            }
            this.nextScenePostion = $cloneV3d.clone();
            console.log(this.nextScenePostion);
        };
        EndlessManager.prototype.addModelConlltion = function (itemObj, sceneCollisionItem, $move) {
            var $base = new DirectShadowColorSprite();
            $base.setModelInfoData(itemObj);
            var $key = this.getSceneCollisionItemByUid(itemObj.id, sceneCollisionItem);
            var $body = new CANNON.Body({ mass: 1 });
            $body.type = CANNON.Body.KINEMATIC;
            if ($key.length) {
                var $collisionItemVo = this._cannoSceneManager.makeBodyByItem($key);
                var $tempDisp = new Display3D();
                $tempDisp.y = itemObj.y;
                $tempDisp.x = itemObj.x;
                $tempDisp.z = itemObj.z;
                $tempDisp.scaleX = itemObj.scaleX;
                $tempDisp.scaleY = itemObj.scaleY;
                $tempDisp.scaleZ = itemObj.scaleZ;
                $tempDisp.rotationX = itemObj.rotationX;
                $tempDisp.rotationY = itemObj.rotationY;
                $tempDisp.rotationZ = itemObj.rotationZ;
                $body = Physics.makeBuildBodyMesh($tempDisp, $collisionItemVo);
            }
            else {
                Physics.bodyAddShape($body, Physics.makeBoxShape(new Vector3D(0.01, 0.01, 0.01)));
            }
            $body.collisionFilterGroup = GameDataModel.GROUP2;
            $body.collisionFilterMask = GameDataModel.GROUP1;
            var $dis = new CanonSceneSprite($body);
            $dis._directShadowDisplay3DSprite = $base;
            $dis.dispList.push($base);
            $dis._scene = this._scene;
            $dis.addToWorld();
            $dis.x = itemObj.x + $move.x;
            ;
            $dis.y = itemObj.y + $move.y;
            ;
            $dis.z = itemObj.z + $move.z;
            ;
            $base.scaleX = itemObj.scaleX;
            $base.scaleY = itemObj.scaleY;
            $base.scaleZ = itemObj.scaleZ;
            $dis.rotationX = -itemObj.rotationX;
            $dis.rotationY = -itemObj.rotationY;
            $dis.rotationZ = -itemObj.rotationZ;
            $dis.name = String(this.sceneId);
            this.modelItems.push($dis);
        };
        EndlessManager.prototype.getSceneCollisionItemByUid = function ($num, _sceneCollisionItem) {
            var $arr = new Array();
            for (var i = 0; i < _sceneCollisionItem.length; i++) {
                if (_sceneCollisionItem[i].uid == "build" + $num) {
                    $arr.push(_sceneCollisionItem[i]);
                }
            }
            return $arr;
        };
        EndlessManager.prototype.revivePlay = function () {
            GameDataModel.centenBall.x = this.nextRevivePostion.x;
            GameDataModel.centenBall.y = this.nextRevivePostion.y;
            GameDataModel.centenBall.z = this.nextRevivePostion.z;
            this.CountdownTm = this.nextReviveTm + TimeUtil.getTimer();
            game.GameDataModel.centenBall.body.sleep();
            game.GameDataModel.centenBall.body.wakeUp();
            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            GameDataModel.levelStartTm = TimeUtil.getTimer();
            GameDataModel.lastMainHitVect = new Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z);
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            Physics.ready = true;
        };
        EndlessManager.endlessKeyLevel88 = 88;
        return EndlessManager;
    }(Display3D));
    endless.EndlessManager = EndlessManager;
})(endless || (endless = {}));
//# sourceMappingURL=EndlessManager.js.map