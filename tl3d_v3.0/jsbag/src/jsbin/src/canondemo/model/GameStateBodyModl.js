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
    var Vector3D = Pan3d.Vector3D;
    var CollisionItemVo = Pan3d.CollisionItemVo;
    var CollisionVo = Pan3d.CollisionVo;
    var Display3D = Pan3d.Display3D;
    var Matrix3D = Pan3d.Matrix3D;
    var Quaternion = Pan3d.Quaternion;
    var Physics = canonkey.Physics;
    var GameStateBody = /** @class */ (function (_super) {
        __extends(GameStateBody, _super);
        function GameStateBody() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GameStateBody;
    }(CANNON.Body));
    game.GameStateBody = GameStateBody;
    var GameStateBodyModl = /** @class */ (function () {
        function GameStateBodyModl() {
            this.stateBodyItems = new Array;
        }
        GameStateBodyModl.getInstance = function () {
            if (!GameStateBodyModl._instance) {
                GameStateBodyModl._instance = new GameStateBodyModl();
            }
            return GameStateBodyModl._instance;
        };
        GameStateBodyModl.prototype.clear = function () {
            while (this.stateBodyItems.length) {
                Physics.world.removeBody(this.stateBodyItems.pop());
            }
        };
        GameStateBodyModl.prototype.getFloadNum = function (value) {
            return Math.floor(value * 1000) / 1000;
        };
        GameStateBodyModl.prototype.makeBodyByItem = function ($arr) {
            var $collisionItemVo = new CollisionItemVo;
            $collisionItemVo.collisionItem = new Array();
            for (var i = 0; i < $arr.length; i++) {
                var $collisionVo = new CollisionVo();
                var $xmlcollisionVo = $arr[i].collisionVo;
                $collisionVo.scaleX = $xmlcollisionVo.scale_x;
                $collisionVo.scaleY = $xmlcollisionVo.scale_y;
                $collisionVo.scaleZ = $xmlcollisionVo.scale_z;
                $collisionVo.x = $xmlcollisionVo.x;
                $collisionVo.y = $xmlcollisionVo.y;
                $collisionVo.z = $xmlcollisionVo.z;
                $collisionVo.rotationX = $xmlcollisionVo.rotationX;
                $collisionVo.rotationY = $xmlcollisionVo.rotationY;
                $collisionVo.rotationZ = $xmlcollisionVo.rotationZ;
                $collisionVo.scaleX = this.getFloadNum($collisionVo.scaleX);
                $collisionVo.scaleY = this.getFloadNum($collisionVo.scaleY);
                $collisionVo.scaleZ = this.getFloadNum($collisionVo.scaleZ);
                $collisionVo.rotationX = this.getFloadNum($collisionVo.rotationX);
                $collisionVo.rotationY = this.getFloadNum($collisionVo.rotationY);
                $collisionVo.rotationZ = this.getFloadNum($collisionVo.rotationZ);
                $collisionVo.type = $xmlcollisionVo.type;
                $collisionVo.colorInt = $xmlcollisionVo.colorInt;
                $collisionVo.data = $xmlcollisionVo.data;
                $collisionItemVo.collisionItem.push($collisionVo);
            }
            return $collisionItemVo;
        };
        GameStateBodyModl.prototype.addToStateBodyItem = function ($buildObj, $key) {
            //将静态的碰撞体分组织，为了
            var $tempDisp = new Display3D();
            $tempDisp.y = $buildObj.y;
            $tempDisp.x = $buildObj.x;
            $tempDisp.z = $buildObj.z;
            $tempDisp.scaleX = $buildObj.scaleX;
            $tempDisp.scaleY = $buildObj.scaleY;
            $tempDisp.scaleZ = $buildObj.scaleZ;
            $tempDisp.rotationX = $buildObj.rotationX;
            $tempDisp.rotationY = $buildObj.rotationY;
            $tempDisp.rotationZ = $buildObj.rotationZ;
            var $collisionItemVo = this.makeBodyByItem($key);
            this.makeMultipleBody($tempDisp, $collisionItemVo);
            //    this.addTempBody($tempDisp, $collisionItemVo)
        };
        GameStateBodyModl.prototype.makeMultipleBody = function ($tempDisp, $collisionItemVo) {
            var $dis = {};
            for (var i = 0; i < $collisionItemVo.collisionItem.length; i++) {
                var $colorInt = $collisionItemVo.collisionItem[i].colorInt;
                var $vo;
                if (!$dis[$colorInt]) {
                    $vo = new CollisionItemVo;
                    $vo.collisionItem = new Array();
                    $vo.friction = $collisionItemVo.friction;
                    $vo.restitution = $collisionItemVo.restitution;
                    $dis[$colorInt] = $vo;
                }
                $vo = $dis[$colorInt];
                $vo.collisionItem.push($collisionItemVo.collisionItem[i]);
            }
            for (var $key in $dis) {
                var $vo = $dis[$key];
                var $colorVect = Pan3d.MathUtil.hexToArgb(Number($key));
                var $isWall = $colorVect.x > $colorVect.y && $colorVect.x > $colorVect.z;
                this.addTempBody($tempDisp, $vo, $isWall);
            }
        };
        GameStateBodyModl.prototype.addTempBody = function ($tempDisp, $collisionItemVo, $isWall) {
            var $body = new GameStateBody({ mass: 1 });
            $body.iswall = $isWall;
            $body.type = CANNON.Body.KINEMATIC;
            Physics.makeBuildBodyMesh($tempDisp, $collisionItemVo, $body);
            Physics.world.addBody($body);
            $body.collisionFilterGroup = game.GameDataModel.GROUP1;
            $body.collisionFilterMask = game.GameDataModel.GROUP1 | game.GameDataModel.GROUP2;
            this.stateBodyItems.push($body);
            $body.position = Physics.Vec3dW2C(new Vector3D($tempDisp.x, $tempDisp.y, $tempDisp.z));
            var $m = new Matrix3D();
            $m.appendRotation(-$tempDisp.rotationZ, Vector3D.Z_AXIS);
            $m.appendRotation(-$tempDisp.rotationY, Vector3D.Y_AXIS);
            $m.appendRotation(-$tempDisp.rotationX, Vector3D.X_AXIS);
            var $q = new Quaternion();
            $q.fromMatrix($m);
            $body.quaternion = Physics.QuaternionW2C($q);
        };
        return GameStateBodyModl;
    }());
    game.GameStateBodyModl = GameStateBodyModl;
})(game || (game = {}));
//# sourceMappingURL=GameStateBodyModl.js.map