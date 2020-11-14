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
    var Display3D = Pan3d.Display3D;
    var Vector3D = Pan3d.Vector3D;
    var ResManager = Pan3d.ResManager;
    var BaseRes = Pan3d.BaseRes;
    var TimeUtil = Pan3d.TimeUtil;
    var CanonSceneSprite = cannondis.CanonSceneSprite;
    var DirectShadowColorSprite = cannondis.DirectShadowColorSprite;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var GameSoundManager = game.GameSoundManager;
    var LinkPlayUserVo = /** @class */ (function () {
        function LinkPlayUserVo() {
            this.num = 0;
        }
        return LinkPlayUserVo;
    }());
    linkplay.LinkPlayUserVo = LinkPlayUserVo;
    var LinkPlayManager = /** @class */ (function (_super) {
        __extends(LinkPlayManager, _super);
        function LinkPlayManager() {
            return _super.call(this) || this;
            //this.makeBaseUser()
        }
        LinkPlayManager.getInstance = function () {
            if (!LinkPlayManager._instance) {
                LinkPlayManager._instance = new LinkPlayManager();
            }
            return LinkPlayManager._instance;
        };
        LinkPlayManager.prototype.clearAllOnline = function () {
            Physics.ready = false;
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
        LinkPlayManager.prototype.removeDisplay = function ($display) {
            var index = this.modelItems.indexOf($display);
            if (index != -1) {
                this.modelItems.splice(index, 1);
            }
            $display.destory();
        };
        LinkPlayManager.prototype.getSelfOnlineUserVo = function () {
            for (var i = 0; i < this.onleuserlist.length; i++) {
                if (this.onleuserlist[i].openid == GameData.getStorageSync("openid")) {
                    return this.onleuserlist[i];
                }
            }
            return null;
        };
        LinkPlayManager.prototype.startGame = function ($bfun) {
            var _this = this;
            this.loadFinish = false;
            Physics.world.defaultContactMaterial.restitution = 0.5;
            Physics.world.defaultContactMaterial.friction = 1;
            this._backSartFun = $bfun;
            GameData.gameType = 4;
            this._scene = GameDataModel.scene;
            this._cannoSceneManager = game.GameLevelManeger.getInstance()._cannoSceneManager;
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            game.GameLevelManeger.getInstance().clear();
            linkplay.LinkPlayGravityManager.getInstance().clear();
            this.clearAllOnline();
            var $url = JSON.parse(MsEngine.getInstance().roomInfo.roomProperty).mapname;
            ResManager.getInstance().loadSceneRes($url, this.mainSceneComplete, this.mainSceneProgress, function ($str) {
                _this.loadSceneConfigCom($str);
                _this.loadFinish = true;
                _this._backSartFun({ name: "canplay" });
            });
        };
        LinkPlayManager.prototype.playOnlineGame = function () {
            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            GameDataModel.lastMainHitVect = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z);
            Physics.ready = true;
        };
        LinkPlayManager.prototype.mainSceneComplete = function () {
        };
        LinkPlayManager.prototype.mainSceneProgress = function (num) {
        };
        LinkPlayManager.prototype.addModelConlltion = function (itemObj) {
            var $base = new DirectShadowColorSprite();
            $base.setModelInfoData(itemObj);
            var $key = this.getSceneCollisionItemByUid(itemObj.id);
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
            $dis.x = itemObj.x;
            $dis.y = itemObj.y;
            $dis.z = itemObj.z;
            $base.scaleX = itemObj.scaleX;
            $base.scaleY = itemObj.scaleY;
            $base.scaleZ = itemObj.scaleZ;
            $dis.rotationX = -itemObj.rotationX;
            $dis.rotationY = -itemObj.rotationY;
            $dis.rotationZ = -itemObj.rotationZ;
            this.modelItems.push($dis);
        };
        //public cenetForce: Vector3D
        LinkPlayManager.prototype.upFrame = function () {
            if (canonkey.Physics.ready) {
                GameDataModel.focus3d.y = GameDataModel.centenBall.y;
                canonkey.Physics.update();
                linkplay.LinkPlayGravityManager.getInstance().upFrame(GameDataModel.centenBall);
                GameSoundManager.getInstance().upFrame();
            }
        };
        LinkPlayManager.prototype.getSceneCollisionItemByUid = function ($num) {
            var $arr = new Array();
            for (var i = 0; i < this._sceneCollisionItem.length; i++) {
                if (this._sceneCollisionItem[i].uid == "build" + $num) {
                    $arr.push(this._sceneCollisionItem[i]);
                }
            }
            return $arr;
        };
        LinkPlayManager.prototype.loadSceneConfigCom = function (obj) {
            GameDataModel.gameAngle = Number(obj.gameAngle); //场景角度
            var buildAry = obj.buildItem;
            this._sceneCollisionItem = obj.sceneCollisionItem;
            for (var j = 0; j < buildAry.length; j++) {
                var itemObj = buildAry[j];
                if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $jiguan = this._cannoSceneManager.addJIguangse(itemObj);
                    $jiguan.x = itemObj.x;
                    $jiguan.y = itemObj.y;
                    $jiguan.z = itemObj.z;
                    $jiguan.name = itemObj.name;
                    this.frame3dItem.push($jiguan);
                }
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    if (itemObj.name != "level_start") {
                        if (itemObj.name == "sign_begin" || itemObj.name == "sign_end" || itemObj.name == "level_finish") {
                            linkplay.LinkPlayGravityManager.getInstance().addPointByObj(itemObj);
                        }
                        else {
                            this.addModelConlltion(itemObj); //场景导出有碰撞体模型
                        }
                    }
                }
            }
        };
        return LinkPlayManager;
    }(Display3D));
    linkplay.LinkPlayManager = LinkPlayManager;
})(linkplay || (linkplay = {}));
//# sourceMappingURL=LinkPlayManager.js.map