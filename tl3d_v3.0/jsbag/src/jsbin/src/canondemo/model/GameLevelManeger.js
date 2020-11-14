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
    var Display3D = Pan3d.Display3D;
    var Vector3D = Pan3d.Vector3D;
    var ResManager = Pan3d.ResManager;
    var BaseRes = Pan3d.BaseRes;
    var TimeUtil = Pan3d.TimeUtil;
    var SceneRes = Pan3d.SceneRes;
    var Physics = canonkey.Physics;
    var CanonFrame3DSprite = frame3d.CanonFrame3DSprite;
    var LevelMainCanonPrefabSprite = cannondis.LevelMainCanonPrefabSprite;
    var BaoxiangDisplay3DSprite = baoxiang.BaoxiangDisplay3DSprite;
    var ReviveModelSprite = revive.ReviveModelSprite;
    var CanonSceneSprite = cannondis.CanonSceneSprite;
    var DirectShadowColorSprite = cannondis.DirectShadowColorSprite;
    var DynamicDirectShadowColorSprite = cannondis.DynamicDirectShadowColorSprite;
    var DiamondsDisplay3DSprite = cannondis.DiamondsDisplay3DSprite;
    var GameLevelManeger = /** @class */ (function (_super) {
        __extends(GameLevelManeger, _super);
        function GameLevelManeger() {
            var _this = _super.call(this) || this;
            _this.canHitTm = 0;
            _this.canUseLoaderLoad = true; //是否可以用场景加载下一张场景
            _this.modelItems = new Array;
            _this.jiguanSpriteItem = new Array;
            _this.modelRevives = new Array;
            _this.modelDiamods = new Array();
            _this.modelBaoxiangs = new Array();
            return _this;
        }
        GameLevelManeger.getInstance = function () {
            if (!GameLevelManeger._instance) {
                GameLevelManeger._instance = new GameLevelManeger();
            }
            return GameLevelManeger._instance;
        };
        GameLevelManeger.prototype.initScene = function ($cannoSceneManager) {
            this._cannoSceneManager = $cannoSceneManager;
        };
        GameLevelManeger.prototype.addEvents = function () {
            var _this = this;
            game.GameDataModel.centenBall.body.addEventListener("collide", function (evt) {
                var $hitBody = evt.body;
                var $mainBody = game.GameDataModel.centenBall.body;
                var $pos = game.GameDataModel.centenBall.getPostionV3d();
                var $highHit = false;
                if (_this.lastHitPos && Math.abs(_this.lastHitPos.y - $pos.y) > 2) {
                    $highHit = true;
                }
                _this.lastHitPos = $pos;
                if (($hitBody && $hitBody.iswall || $highHit) && _this.canHitTm < TimeUtil.getTimer()) {
                    GameData.isHitColone = true;
                    _this.canHitTm = TimeUtil.getTimer() + 100;
                }
            });
        };
        GameLevelManeger.prototype.addMoveSphereMain = function ($scale) {
            var $sphere = new CANNON.Sphere($scale / Physics.baseScale10);
            var $body = new CANNON.Body({ mass: 1.00 });
            $body.collisionFilterGroup = game.GameDataModel.GROUP1;
            $body.collisionFilterMask = game.GameDataModel.GROUP1 | game.GameDataModel.GROUP2 | game.GameDataModel.GROUP3;
            $body.addShape($sphere);
            var $dis = new LevelMainCanonPrefabSprite($body);
            $dis._scene = this._scene;
            $dis.addToWorld();
            return $dis;
        };
        GameLevelManeger.prototype.clear = function () {
            Physics.ready = false;
            game.GameDataModel.modelRotation.x = 0;
            game.GameDataModel.modelRotation.z = 0;
            game.GameDataModel.mouseDownPosint = null;
            game.GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            game.GameGravityManager.getInstance().clear();
            while (this.modelItems.length) {
                var dis = this.modelItems.pop();
                dis.destory();
            }
            game.GameStateBodyModl.getInstance().clear();
            while (this.jiguanSpriteItem.length) {
                var frame3Ddis = this.jiguanSpriteItem.pop();
                frame3Ddis.destory();
            }
            while (this.modelDiamods.length) {
                var diamondSprite = this.modelDiamods.pop();
                game.GameDataModel.scene.removeDisplay(diamondSprite);
                diamondSprite.destory();
            }
            while (this.modelRevives.length) {
                var riviveSprite = this.modelRevives.pop();
                game.GameDataModel.scene.removeDisplay(riviveSprite);
                riviveSprite.destory();
            }
            while (this.modelBaoxiangs.length) {
                var baoxiangSprite = this.modelBaoxiangs.pop();
                game.GameDataModel.scene.removeDisplay(baoxiangSprite);
                baoxiangSprite.destory();
            }
            if (Physics.world && Physics.world.bodies) {
                console.log("清理完场景后剩下的body数量", Physics.world.bodies.length);
            }
        };
        GameLevelManeger.prototype.makeBaseLevelObj = function () {
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            this.clear();
            var $mainBall;
            if (game.GameDataModel.centenBall) {
                $mainBall = game.GameDataModel.centenBall;
                game.GameDataModel.centenBall.body.sleep();
                game.GameDataModel.centenBall.body.wakeUp();
            }
            else {
                $mainBall = this.addMoveSphereMain(12);
                game.GameDataModel.centenBall = $mainBall;
                game.GameDataModel.changeMainEffict();
                this.addEvents();
            }
            game.GameDataModel.centenBall.x = 0;
            game.GameDataModel.centenBall.y = 20;
            game.GameDataModel.centenBall.z = 0;
            game.GameDataModel.centenBall.bodyfouce.x = 0;
            game.GameDataModel.centenBall.bodyfouce.y = 0;
            game.GameDataModel.centenBall.bodyfouce.z = 0;
            game.GameDataModel.centenBall.resetParticlePos();
        };
        GameLevelManeger.prototype.mainSceneComplete = function () {
            console.log("加载完成");
        };
        GameLevelManeger.prototype.initXmlModel = function (value, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            if (!this.canUseLoaderLoad) {
                return;
            }
            else {
                this.canUseLoaderLoad = false;
            }
            // value="1059"
            this.nowSelectLevelUrl = value;
            this.makeBaseLevelObj();
            this.loadSceneByName(this.nowSelectLevelUrl, $bfun);
        };
        GameLevelManeger.prototype.loadSceneByName = function ($mapname, $bfun) {
            var _this = this;
            if (ResManager.getInstance()._dic[$mapname]) {
                if (ResManager.getInstance()._dic[$mapname].sceneData) {
                    this.setSceneData(ResManager.getInstance()._dic[$mapname].sceneData, $bfun);
                }
                else {
                    ResManager.getInstance()._dic[$mapname] = null;
                    this.failWaitLoadScene($bfun);
                }
            }
            else {
                ResManager.getInstance().loadSceneRes($mapname, this.mainSceneComplete, this.mainSceneProgress, function ($data) {
                    _this.setSceneData($data, $bfun);
                }, {
                    failfun: function () {
                        _this.failWaitLoadScene($bfun);
                    }
                });
            }
        };
        GameLevelManeger.prototype.setSceneData = function ($data, $bfun) {
            var _this = this;
            game.GameDataModel.centenBall.resetParticlePos();
            this.loadSceneConfigCom($data);
            Pan3d.TimeUtil.addTimeOut(100, function () {
                game.GameDataModel.lastMainHitTm = TimeUtil.getTimer();
                game.GameDataModel.levelStartTm = TimeUtil.getTimer();
                game.GameDataModel.lastMainHitVect = new Pan3d.Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z);
                Physics.ready = true;
                _this.canUseLoaderLoad = true;
                $bfun && $bfun();
            });
        };
        GameLevelManeger.prototype.loadNextSceneData = function (mapStr) {
            if (!ResManager.getInstance()._dic[mapStr]) {
                var sceneRes = new SceneRes;
                sceneRes.load(mapStr, function () { }, function () { }, function ($data) {
                    if (!ResManager.getInstance()._dic[mapStr]) {
                        ResManager.getInstance()._dic[mapStr] = sceneRes;
                        for (var j = 0; j < sceneRes.sceneData.buildItem.length; j++) {
                            var itemObj = sceneRes.sceneData.buildItem[j];
                            if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                                var canonFrame3DSprite = new CanonFrame3DSprite();
                                canonFrame3DSprite.setInfo(itemObj);
                            }
                        }
                    }
                });
            }
        };
        GameLevelManeger.prototype.failWaitLoadScene = function ($bfun) {
            var _this = this;
            if ($bfun === void 0) { $bfun = null; }
            Pan3d.TimeUtil.addTimeOut(2000, function () {
                _this.canUseLoaderLoad = true;
                _this.initXmlModel(_this.nowSelectLevelUrl, $bfun);
            });
        };
        GameLevelManeger.prototype.makeBodyByKey = function (itemObj, $key) {
            var $body = new CANNON.Body({ mass: 1.0 });
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
                Physics.makeBuildBodyMesh($tempDisp, $collisionItemVo, $body, 0.5);
            }
            else {
                console.log("有错的模型");
                Physics.bodyAddShape($body, Physics.makeBoxShape(new Vector3D(0.01, 0.01, 0.01)));
            }
            return $body;
        };
        GameLevelManeger.prototype.addModelConlltion = function (itemObj) {
            var $base = new DirectShadowColorSprite();
            var $key = this.getSceneCollisionItemByUid(itemObj.id);
            var $body = this.makeBodyByKey(itemObj, $key);
            //显示对象上的碰撞无效
            if (String(itemObj.materialurl).indexOf("freetesture.txt") == -1) {
                $body.collisionFilterGroup = game.GameDataModel.GROUP3;
                $body.collisionFilterMask = game.GameDataModel.GROUP3;
                //需要添加场景静态碰撞
                game.GameStateBodyModl.getInstance().addToStateBodyItem(itemObj, $key);
                $body = null;
            }
            else {
                //自由物件就不要加静态的碰撞
                $base = new DynamicDirectShadowColorSprite();
                console.log($body.mass, $body.mass);
                $body.collisionFilterGroup = game.GameDataModel.GROUP1;
                $body.collisionFilterMask = game.GameDataModel.GROUP1 | game.GameDataModel.GROUP2;
                $body.type = CANNON.Body.DYNAMIC;
            }
            $base.setModelInfoData(itemObj);
            var $dis = new CanonSceneSprite($body);
            $dis._directShadowDisplay3DSprite = $base;
            $dis.dispList.push($base);
            $dis._scene = this._scene;
            $dis.addToWorld();
            $dis.x = itemObj.x;
            $dis.y = itemObj.y;
            $dis.z = itemObj.z;
            $dis.rotationX = -itemObj.rotationX;
            $dis.rotationY = -itemObj.rotationY;
            $dis.rotationZ = -itemObj.rotationZ;
            $base.scaleX = itemObj.scaleX;
            $base.scaleY = itemObj.scaleY;
            $base.scaleZ = itemObj.scaleZ;
            if (!$body) {
                $base.x = itemObj.x;
                $base.y = itemObj.y;
                $base.z = itemObj.z;
                $base.rotationX = itemObj.rotationX;
                $base.rotationY = itemObj.rotationY;
                $base.rotationZ = itemObj.rotationZ;
            }
            this.modelItems.push($dis);
        };
        GameLevelManeger.prototype.getSceneCollisionItemByUid = function ($num) {
            var $arr = new Array();
            for (var i = 0; i < this._sceneCollisionItem.length; i++) {
                if (this._sceneCollisionItem[i].uid == "build" + $num) {
                    $arr.push(this._sceneCollisionItem[i]);
                }
            }
            return $arr;
        };
        GameLevelManeger.prototype.loadSceneConfigCom = function (obj) {
            game.GameDataModel.gameAngle = Number(obj.gameAngle); //场景角度
            var buildAry = obj.buildItem;
            this._sceneCollisionItem = obj.sceneCollisionItem;
            for (var j = 0; j < buildAry.length; j++) {
                var itemObj = buildAry[j];
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    if (String(itemObj.name).indexOf("revive") != -1) {
                        this.addReviveModel(itemObj);
                    }
                    else {
                        switch (itemObj.name) {
                            case "level_start":
                                break;
                            case "sign_begin":
                            case "sign_end":
                            case "level_finish":
                                game.GameGravityManager.getInstance().addPointByObj(itemObj);
                                break;
                            default:
                                this.addModelConlltion(itemObj); //场景导出有碰撞体模型
                                break;
                        }
                    }
                }
                if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $jiguan = this._cannoSceneManager.addJIguangse(itemObj);
                    this.jiguanSpriteItem.push($jiguan);
                }
            }
            this.addDiamodsConfig();
            this.addBaoxiangConfig();
        };
        GameLevelManeger.prototype.addReviveModel = function (itemObj) {
            var $dis = new ReviveModelSprite;
            $dis.x = itemObj.x;
            $dis.y = itemObj.y;
            $dis.z = itemObj.z;
            $dis._scene = game.GameDataModel.scene;
            game.GameDataModel.scene.addDisplay($dis);
            $dis.setReviveTemp(itemObj);
            this.modelRevives.push($dis);
        };
        GameLevelManeger.prototype.addDiamodsConfig = function () {
            var $str = GameData.getStorageSync("hasDiamonds");
            var hasStorageArr;
            if ($str) {
                hasStorageArr = JSON.parse($str);
            }
            var $isNum = Number(this.nowSelectLevelUrl);
            if ($isNum > 1000) {
                $isNum = $isNum - 1000;
                var $arr = GameData.getDiamodsConfigByLevel($isNum);
                for (var i = 0; $arr && i < $arr.length; i++) {
                    var $name = $isNum + "_" + $arr[i].id;
                    var $needAdd = true;
                    for (var j = 0; hasStorageArr && j < hasStorageArr.length; j++) {
                        if (hasStorageArr[j].name == $name) {
                            $needAdd = false;
                        }
                    }
                    if ($needAdd) {
                        var disDiaMonds = new DiamondsDisplay3DSprite();
                        disDiaMonds.name = $name;
                        disDiaMonds.x = $arr[i].x;
                        disDiaMonds.y = $arr[i].y;
                        disDiaMonds.z = $arr[i].z;
                        disDiaMonds.setModelById("zhuanshi");
                        disDiaMonds._scene = game.GameDataModel.scene;
                        game.GameDataModel.scene.addDisplay(disDiaMonds);
                        this.modelDiamods.push(disDiaMonds);
                    }
                }
            }
        };
        GameLevelManeger.prototype.addBaoxiangConfig = function () {
            if (GameData.severinfo.wxcloudModel == 1) {
                return;
            }
            var $str = GameData.getStorageSync("hasBaoxiang");
            var hasStorageArr;
            if ($str) {
                hasStorageArr = JSON.parse($str);
            }
            var mapid = this.nowSelectLevelUrl;
            var $arr = GameData.getBaoxiangConfigByLevelStr(mapid);
            for (var i = 0; $arr && i < $arr.length; i++) {
                var vo = new baoxiang.BaoxiangMeshVo();
                vo.meshObj($arr[i]);
                vo.name = mapid + "_" + vo.id;
                var $needAdd = true;
                for (var j = 0; hasStorageArr && j < hasStorageArr.length; j++) {
                    if (hasStorageArr[j].name == vo.name) {
                        $needAdd = false;
                    }
                }
                if (vo.type == 1) {
                    if (Math.random() < vo.random) {
                        $needAdd = true;
                    }
                }
                if ($needAdd) {
                    var baoxiangDis = new BaoxiangDisplay3DSprite();
                    baoxiangDis.baoxiangMeshVo = vo;
                    baoxiangDis.x = vo.x;
                    baoxiangDis.y = vo.y;
                    baoxiangDis.z = vo.z;
                    baoxiangDis.rotationY = vo.rotation;
                    baoxiangDis.setModelById("baoxiang001");
                    baoxiangDis._scene = game.GameDataModel.scene;
                    game.GameDataModel.scene.addDisplay(baoxiangDis);
                    this.modelBaoxiangs.push(baoxiangDis);
                }
            }
        };
        GameLevelManeger.prototype.mainSceneProgress = function (num) {
        };
        return GameLevelManeger;
    }(Display3D));
    game.GameLevelManeger = GameLevelManeger;
})(game || (game = {}));
//# sourceMappingURL=GameLevelManeger.js.map