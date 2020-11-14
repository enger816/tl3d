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
var frame3d;
(function (frame3d) {
    var Object3D = Pan3d.Object3D;
    var Matrix3D = Pan3d.Matrix3D;
    var TimeUtil = Pan3d.TimeUtil;
    var Scene_data = Pan3d.Scene_data;
    var ObjDataManager = Pan3d.ObjDataManager;
    var MainDirectShadowDisplay3DSprite = cannondis.MainDirectShadowDisplay3DSprite;
    var CanonPrefabSprite = canonkey.CanonPrefabSprite;
    var Physics = canonkey.Physics;
    var BaseVo = /** @class */ (function () {
        function BaseVo() {
        }
        return BaseVo;
    }());
    frame3d.BaseVo = BaseVo;
    var FrameCanonPrefabSprite = /** @class */ (function (_super) {
        __extends(FrameCanonPrefabSprite, _super);
        function FrameCanonPrefabSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.lastSysTm = 0;
            _this.frameFileNode = new frame3d.FrameFileNode;
            _this.frameFileNode.sprite = new Object3D;
            _this.maxTime = 0;
            _this.x = 0;
            _this.y = 0;
            _this.z = 0;
            _this._frmeNumItemDic = new Pan3d.Dictionary([]);
            return _this;
        }
        FrameCanonPrefabSprite.prototype.update = function () {
            if (FrameCanonPrefabSprite.isMove) {
                var useTim = TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
                if (this.isStop) {
                    this.delayedTm += TimeUtil.getTimer() - this.lastSysTm;
                }
                this.lastSysTm = TimeUtil.getTimer();
                useTim = Math.max(useTim - this.delayedTm, 0);
                var $f = useTim / 60;
                var $frameTime = $f % this.maxTime;
                $frameTime = Math.floor($frameTime * 5) / 5;
                var $obj;
                if (!this._frmeNumItemDic[$frameTime]) {
                    $obj = new BaseVo();
                    this.frameFileNode.update($frameTime);
                    var $m = new Matrix3D();
                    $m.appendTranslation(this.frameFileNode.sprite.x * 10, this.frameFileNode.sprite.y * 10, this.frameFileNode.sprite.z * 10);
                    var tempM = this.bindMatrix.clone();
                    tempM.prepend($m);
                    $obj.x = tempM.position.x;
                    $obj.y = tempM.position.y;
                    $obj.z = tempM.position.z;
                    $obj.rotationX = -this.frameFileNode.sprite._rotationX;
                    $obj.rotationY = -this.frameFileNode.sprite._rotationY;
                    $obj.rotationZ = -this.frameFileNode.sprite._rotationZ;
                    this._x = $obj.x;
                    this._y = $obj.y;
                    this._z = $obj.z;
                    this._rotationX = $obj.rotationX;
                    this._rotationY = $obj.rotationY;
                    this._rotationZ = $obj.rotationZ;
                    this.updateMatrix();
                    $obj.tx = this.body.position.x;
                    $obj.ty = this.body.position.y;
                    $obj.tz = this.body.position.z;
                    $obj.rx = this.body.quaternion.x;
                    $obj.ry = this.body.quaternion.y;
                    $obj.rz = this.body.quaternion.z;
                    $obj.rw = this.body.quaternion.w;
                    this._frmeNumItemDic[$frameTime] = $obj;
                }
                else {
                    $obj = this._frmeNumItemDic[$frameTime];
                    this._x = $obj.x;
                    this._y = $obj.y;
                    this._z = $obj.z;
                    this._rotationX = $obj.rotationX;
                    this._rotationY = $obj.rotationY;
                    this._rotationZ = $obj.rotationZ;
                    this.body.position.x = $obj.tx;
                    this.body.position.y = $obj.ty;
                    this.body.position.z = $obj.tz;
                    this.body.quaternion.x = $obj.rx;
                    this.body.quaternion.y = $obj.ry;
                    this.body.quaternion.z = $obj.rz;
                    this.body.quaternion.w = $obj.rw;
                }
                if (game.GameDataModel.centenBall && Math.abs(this.y - game.GameDataModel.centenBall.y) < 400) {
                    _super.prototype.update.call(this);
                }
            }
        };
        FrameCanonPrefabSprite.prototype.destory = function () {
            Physics.world.removeBody(this._body);
            while (this.dispList.length) {
                this._scene.removeDisplay(this.dispList.pop());
            }
            this._scene.removeDisplay(this);
            _super.prototype.destory.call(this);
        };
        FrameCanonPrefabSprite.prototype.makeSpriteByData = function ($vo) {
            this.frameFileNode.setFrameNodeVo($vo);
            var $base = new MainDirectShadowDisplay3DSprite();
            $base._scene = this._scene;
            $base.groupItem = new Array();
            var $dis = new Pan3d.Display3DSprite();
            $dis.setObjUrl($vo.resurl);
            $dis._rotationData = new Float32Array(9);
            if ($vo.materialInfoArr && $vo.materialInfoArr.length) {
                $base.setPicUrl($vo.materialInfoArr[0].url);
            }
            else {
                console.log("没有指定贴图");
            }
            $base.groupItem.push($dis);
            $base.scaleX = $vo.pointitem[0].scaleX * 10;
            $base.scaleY = $vo.pointitem[0].scaleY * 10;
            $base.scaleZ = $vo.pointitem[0].scaleZ * 10;
            $base.x = 10000; //先设定一个很大的值 
            this._scene.addDisplay($base);
            this._directShadowDisplay3DSprite = $base;
            this.dispList.push($base);
            this.makeBodyByObjData($vo.resurl);
            //加上渲染模式
            if ($vo.receiveShadow) {
                $base.renderType = 1;
            }
            else {
                $base.renderType = 0;
            }
        };
        FrameCanonPrefabSprite.prototype.makeBodyByObjData = function ($objUrl) {
            var _this = this;
            ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + $objUrl, function ($objData) {
                /*
                for (var i: number = 0; i < $objData.collision.collisionItem.length && i < 1; i++) {
                    var $vo: CollisionVo = $objData.collision.collisionItem[i];

                    var $scale: Vector3D = new Vector3D;
                    var $base: Display3DSprite = this._directShadowDisplay3DSprite
                    $scale.x = $vo.scaleX * $base.scaleX * 100;
                    $scale.y = $vo.scaleY * $base.scaleY * 100;
                    $scale.z = $vo.scaleZ * $base.scaleZ * 100;
                    $scale.x = 1
                    $scale.y = 1
                    $scale.z=1
                    console.log($scale)
                    Physics.bodyAddShape(this.body, Physics.makeBoxShape($scale))

                }
                */
                Physics.makeBuildBodyMesh(_this._directShadowDisplay3DSprite, $objData.collision, _this.body);
                _this.body.position.x = 100000; //设置一个很远的位置
            });
        };
        FrameCanonPrefabSprite.prototype.mathBodyScale = function () {
        };
        FrameCanonPrefabSprite.isMove = true;
        FrameCanonPrefabSprite.skipNum = 0;
        return FrameCanonPrefabSprite;
    }(CanonPrefabSprite));
    frame3d.FrameCanonPrefabSprite = FrameCanonPrefabSprite;
})(frame3d || (frame3d = {}));
//# sourceMappingURL=FrameCanonPrefabSprite.js.map