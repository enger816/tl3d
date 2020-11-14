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
    var GravityVo = game.GravityVo;
    var EndlessManager = /** @class */ (function (_super) {
        __extends(EndlessManager, _super);
        function EndlessManager() {
            var _this = _super.call(this) || this;
            _this.sceneId = 0;
            return _this;
        }
        EndlessManager.getInstance = function () {
            if (!EndlessManager._instance) {
                EndlessManager._instance = new EndlessManager();
            }
            return EndlessManager._instance;
        };
        EndlessManager.prototype.startGame = function () {
            this.isPlayEndless = true;
            this._scene = GameDataModel.scene;
            this._cannoSceneManager = game.GameLevelManeger.getInstance()._cannoSceneManager;
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            game.GameLevelManeger.getInstance().makeBaseLevelObj();
            this.baseSceneItem = new Array();
            this.modelItems = new Array;
            for (var i = 0; i < 3; i++) {
                var $vo = new endless.EndlessMapSceneVo();
                $vo.mapuid = String(10001 + i);
                this.baseSceneItem.push($vo);
            }
            this.oneByoneLoad();
        };
        EndlessManager.prototype.oneByoneLoad = function () {
            var _this = this;
            var nextLoadVo;
            for (var i = 0; i < this.baseSceneItem.length; i++) {
                if (!this.baseSceneItem[i].isfinish) {
                    nextLoadVo = this.baseSceneItem[i];
                }
            }
            if (nextLoadVo) {
                nextLoadVo.initData(function () {
                    _this.oneByoneLoad();
                });
            }
            else {
                this.meshAddScene();
            }
        };
        EndlessManager.prototype.meshAddScene = function () {
            var _this = this;
            GameDataModel.gameAngle = 0;
            game.GameGravityManager.getInstance()._gravityItem = new Array;
            this.nextScenePostion = new Vector3D(0, 0, 0);
            this.meshTempScene(this.baseSceneItem[0]); //初始添加两个场景
            this.meshTempScene(this.baseSceneItem[1]);
            Pan3d.TimeUtil.addTimeOut(100, function () {
                GameDataModel.lastMainHitTm = TimeUtil.getTimer();
                GameDataModel.levelStartTm = TimeUtil.getTimer();
                GameDataModel.lastMainHitVect = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z);
                Physics.ready = true;
                _this.CountdownTm = TimeUtil.getTimer() + 20 * 1000;
            });
        };
        EndlessManager.prototype.needAddNewScene = function () {
            if (this.isPlayEndless) {
                this.CountdownTm += 10 * 1000;
                this.meshTempScene(this.baseSceneItem[random(this.baseSceneItem.length)]);
            }
        };
        EndlessManager.prototype.clearLastScene = function () {
            if (this.isPlayEndless) {
                for (var i = (this.modelItems.length - 1); i >= 0; i--) {
                    var num = Number(this.modelItems[i].name);
                    if (num < this.sceneId - 1) {
                        this.removeDisplay(this.modelItems[i]);
                    }
                }
                GameDataModel.gameAngle = random(360);
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
            GameDataModel.levelStartTm = TimeUtil.getTimer();
            this.sceneId++;
            var $cloneV3d = this.nextScenePostion.clone();
            var $obj = $vo.sceneRes.sceneData;
            var buildAry = $obj.buildItem;
            var sceneCollisionItem = $obj.sceneCollisionItem;
            for (var j = 0; j < buildAry.length; j++) {
                var itemObj = buildAry[j];
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
        return EndlessManager;
    }(Display3D));
    endless.EndlessManager = EndlessManager;
})(endless || (endless = {}));
//# sourceMappingURL=EndlessManager.js.map