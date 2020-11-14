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
var CanonModelCheckpoint = /** @class */ (function (_super) {
    __extends(CanonModelCheckpoint, _super);
    function CanonModelCheckpoint() {
        var _this = _super.call(this) || this;
        _this.modelItems = new Array;
        _this._jiguanSpriteItem = new Array;
        return _this;
    }
    CanonModelCheckpoint.getInstance = function () {
        if (!this._instance) {
            this._instance = new CanonModelCheckpoint();
        }
        return this._instance;
    };
    CanonModelCheckpoint.prototype.initScene = function ($cannoSceneManager) {
        this._cannoSceneManager = $cannoSceneManager;
    };
    CanonModelCheckpoint.prototype.addEvents = function () {
        this.centenBall.body.addEventListener("collide", function (evt) {
            var $body = CanonModelCheckpoint.getInstance().centenBall.body;
            //  console.log($body)
            var velocity = new Pan3d.Vector3D($body.velocity.x, $body.velocity.y, $body.velocity.z);
            var $dis = velocity.dot(velocity);
            CannoSoundManager.getInstance().collidehit();
        });
    };
    CanonModelCheckpoint.prototype.addMoveSphereMain = function ($scale) {
        var $sphere = new CANNON.Sphere($scale / canonkey.Physics.baseScale10);
        var $body = new CANNON.Body({ mass: 2 });
        $body.addShape($sphere);
        var $dis = new canonkey.MainCanonPrefabSprite($body);
        $dis._scene = this._scene;
        $dis.addToWorld();
        return $dis;
    };
    CanonModelCheckpoint.prototype.clear = function () {
        console.log("清理场景");
        canonkey.Physics.ready = false;
        canonkey.AotuGravityManager.getInstance().clear();
        while (this.modelItems.length) {
            var dis = this.modelItems.pop();
            dis.destory();
        }
        while (this._jiguanSpriteItem.length) {
            var frame3Ddis = this._jiguanSpriteItem.pop();
            frame3Ddis.destory();
        }
        console.log("等级准备====》", this.levelNum);
    };
    CanonModelCheckpoint.prototype.initXmlModel = function (value, taget) {
        var _this = this;
        canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(new Pan3d.Vector3D(0, -canonkey.Physics.gravity980, 0));
        this.levelNum = Math.max(Math.min(value, 98010), 98001);
        this.clear();
        var mapStr = String(this.levelNum);
        var c;
        if (this.centenBall) {
            c = this.centenBall;
            this.centenBall.body.sleep();
            this.centenBall.body.wakeUp();
        }
        else {
            c = this.addMoveSphereMain(12);
            c.body.mass = 0.98;
            this.centenBall = c;
            this.addEvents();
        }
        switch (mapStr) {
            case "98001":
                c.z = 0;
                c.x = -0;
                c.y = 40;
                break;
            case "98002":
                c.z = 0;
                c.x = 0;
                c.y = 30;
                break;
            case "98003":
                c.z = 0;
                c.x = 0;
                c.y = 25;
                break;
            case "98004":
                c.z = 0;
                c.x = 0;
                c.y = 40;
                break;
            case "98005":
                c.z = 0;
                c.x = 0;
                c.y = 40;
                break;
            case "98007":
                c.z = 0;
                c.x = 0;
                c.y = 40;
                break;
            case "98008":
                c.z = 0;
                c.x = 0;
                c.y = 55;
                break;
            default:
                c.z = 0;
                c.x = 0;
                c.y = 40;
        }
        this.centenBall.resetParticlePos();
        Pan3d.ResManager.getInstance().loadSceneRes(mapStr, this.mainSceneComplete, this.mainSceneProgress, function ($str) {
            _this.loadSceneConfigCom($str);
            canonkey.Physics.ready = true;
        });
    };
    CanonModelCheckpoint.prototype.addModelConlltion = function (itemObj) {
        var $base = new canonkey.DirectShadowColorSprite();
        $base.setModelInfoData(itemObj);
        var $key = this.getSceneCollisionItemByUid(itemObj.id);
        var $body = new CANNON.Body({ mass: 1 });
        $body.type = CANNON.Body.KINEMATIC;
        if ($key.length) {
            var $collisionItemVo = this._cannoSceneManager.makeBodyByItem($key);
            var $tempDisp = new Pan3d.Display3D();
            $tempDisp.y = itemObj.y;
            $tempDisp.x = itemObj.x;
            $tempDisp.z = itemObj.z;
            $tempDisp.scaleX = itemObj.scaleX;
            $tempDisp.scaleY = itemObj.scaleY;
            $tempDisp.scaleZ = itemObj.scaleZ;
            $tempDisp.rotationX = itemObj.rotationX;
            $tempDisp.rotationY = itemObj.rotationY;
            $tempDisp.rotationZ = itemObj.rotationZ;
            $body = canonkey.Physics.makeBuildBodyMesh($tempDisp, $collisionItemVo);
        }
        else {
            canonkey.Physics.bodyAddShape($body, canonkey.Physics.makeBoxShape(new Pan3d.Vector3D(0.01, 0.01, 0.01)));
        }
        var $dis = new canonkey.CanonSceneSprite($body);
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
        $dis.rotationX = itemObj.rotationX;
        $dis.rotationY = itemObj.rotationY;
        $dis.rotationZ = 0;
        this.modelItems.push($dis);
    };
    CanonModelCheckpoint.prototype.getSceneCollisionItemByUid = function ($num) {
        var $arr = new Array();
        for (var i = 0; i < this._sceneCollisionItem.length; i++) {
            if (this._sceneCollisionItem[i].uid == "build" + $num) {
                $arr.push(this._sceneCollisionItem[i]);
            }
        }
        return $arr;
    };
    CanonModelCheckpoint.prototype.loadSceneConfigCom = function (obj) {
        var buildAry = obj.buildItem;
        this._sceneCollisionItem = obj.sceneCollisionItem;
        for (var j = 0; j < buildAry.length; j++) {
            var itemObj = buildAry[j];
            if (itemObj.type == Pan3d.BaseRes.PREFAB_TYPE) {
                if (itemObj.name == "sign_begin" || itemObj.name == "sign_end" || itemObj.name == "level_finish") {
                    canonkey.AotuGravityManager.getInstance().addPointByObj(itemObj);
                }
                else {
                    this.addModelConlltion(itemObj); //场景导出有碰撞体模型
                }
            }
            if (itemObj.type == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                var $jiguan = this._cannoSceneManager.addJIguangse(new Pan3d.Vector3D(itemObj.x, itemObj.y, itemObj.z));
                this._jiguanSpriteItem.push($jiguan);
            }
        }
    };
    CanonModelCheckpoint.prototype.mainSceneComplete = function () {
    };
    CanonModelCheckpoint.prototype.mainSceneProgress = function (num) {
    };
    return CanonModelCheckpoint;
}(Pan3d.Display3D));
//# sourceMappingURL=CanonModelCheckpoint.js.map