var game;
(function (game) {
    var Vector3D = Pan3d.Vector3D;
    var CollisionItemVo = Pan3d.CollisionItemVo;
    var CollisionVo = Pan3d.CollisionVo;
    var CanonPrefabSprite = canonkey.CanonPrefabSprite;
    var Physics = canonkey.Physics;
    var CanonFrame3DSprite = frame3d.CanonFrame3DSprite;
    var GameSceneManager = /** @class */ (function () {
        function GameSceneManager($scene) {
            this._scene = $scene;
            this.initData();
        }
        GameSceneManager.prototype.initData = function () {
            Physics.world = new CANNON.World();
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            Physics.world.defaultContactMaterial.restitution = 0.01;
            Physics.world.defaultContactMaterial.friction = 0.01;
            Physics.world.broadphase = new CANNON.NaiveBroadphase();
        };
        GameSceneManager.prototype.makeGround = function ($pos) {
            var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.Body({ mass: 0 });
            groundBody.addShape(groundShape);
            groundBody.position = Physics.Vec3dW2C($pos);
            groundBody.gameType = 2;
            Physics.world.addBody(groundBody);
        };
        GameSceneManager.prototype.addMoveSphere = function ($scale) {
            if ($scale === void 0) { $scale = 10; }
            var $sphere = new CANNON.Sphere($scale / Physics.baseScale10);
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($sphere);
            //         $body.linearDamping = $body.angularDamping = 0.1; //阻尼系数
            var $dis = new CanonPrefabSprite($body);
            $dis._scene = this._scene;
            $dis.addToWorld();
            return $dis;
        };
        GameSceneManager.prototype.addMoveCylinder = function ($scaleVec) {
            var kkk = Physics.Vec3dW2C($scaleVec);
            var $box = new CANNON.Cylinder(kkk.x, kkk.y, kkk.z, 20);
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //      $body.linearDamping = $body.angularDamping = 0.5;//阻尼系数
            var $dis = new CanonPrefabSprite($body);
            $dis._scene = this._scene;
            $dis.addToWorld();
            return $dis;
        };
        GameSceneManager.prototype.addJIguangse = function (value) {
            var canonFrame3DSprite = new CanonFrame3DSprite();
            canonFrame3DSprite._scene = this._scene;
            canonFrame3DSprite.x = value.x;
            canonFrame3DSprite.y = value.y;
            canonFrame3DSprite.z = value.z;
            canonFrame3DSprite.rotationY = 0;
            canonFrame3DSprite.setInfo(value);
            return canonFrame3DSprite;
        };
        GameSceneManager.prototype.addMoveBox = function ($scaleVec) {
            var $box = new CANNON.Box(Physics.Vec3dW2C($scaleVec));
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //  $body.linearDamping = $body.angularDamping = 0.1;//阻尼系数
            var $dis = new CanonPrefabSprite($body);
            $dis._scene = this._scene;
            $dis.addToWorld();
            return $dis;
        };
        GameSceneManager.prototype.getFloadNum = function (value) {
            return Math.floor(value * 1000) / 1000;
        };
        GameSceneManager.prototype.makeBodyByItem = function ($arr) {
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
                $collisionVo.radius = $xmlcollisionVo.radius / 10;
                $collisionVo.scaleX = this.getFloadNum($collisionVo.scaleX);
                $collisionVo.scaleY = this.getFloadNum($collisionVo.scaleY);
                $collisionVo.scaleZ = this.getFloadNum($collisionVo.scaleZ);
                $collisionVo.rotationX = this.getFloadNum($collisionVo.rotationX);
                $collisionVo.rotationY = this.getFloadNum($collisionVo.rotationY);
                $collisionVo.rotationZ = this.getFloadNum($collisionVo.rotationZ);
                $collisionVo.type = $xmlcollisionVo.type;
                $collisionVo.data = $xmlcollisionVo.data;
                $collisionItemVo.collisionItem.push($collisionVo);
            }
            return $collisionItemVo;
        };
        return GameSceneManager;
    }());
    game.GameSceneManager = GameSceneManager;
})(game || (game = {}));
//# sourceMappingURL=GameSceneManager.js.map