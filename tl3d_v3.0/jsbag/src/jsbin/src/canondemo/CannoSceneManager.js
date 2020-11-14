var canonkey;
(function (canonkey) {
    var Vector3D = Pan3d.Vector3D;
    var CannoSceneManager = /** @class */ (function () {
        function CannoSceneManager($scene) {
            this._scene = $scene;
            this.initData();
        }
        CannoSceneManager.prototype.initData = function () {
            canonkey.Physics.world = new CANNON.World();
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(new Vector3D(0, -canonkey.Physics.gravity980, 0));
            console.log("Physics.world.defaultContactMaterial.restitution", canonkey.Physics.world.defaultContactMaterial.restitution);
            canonkey.Physics.world.defaultContactMaterial.restitution = 0;
            canonkey.Physics.world.defaultContactMaterial.friction = 0;
            //   Physics.world.broadphase = new CANNON.NaiveBroadphase();
            //   
        };
        CannoSceneManager.prototype.makeGround = function ($pos) {
            var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.Body({ mass: 0 });
            groundBody.addShape(groundShape);
            groundBody.position = canonkey.Physics.Vec3dW2C($pos);
            groundBody.gameType = 2;
            canonkey.Physics.world.addBody(groundBody);
        };
        CannoSceneManager.prototype.addMoveSphere = function ($scale) {
            if ($scale === void 0) { $scale = 10; }
            var $sphere = new CANNON.Sphere($scale / canonkey.Physics.baseScale10);
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($sphere);
            //         $body.linearDamping = $body.angularDamping = 0.1; //阻尼系数
            var $dis = new canonkey.CanonPrefabSprite($body);
            $dis._scene = this._scene;
            $dis.addToWorld();
            return $dis;
        };
        CannoSceneManager.prototype.addMoveCylinder = function ($scaleVec) {
            var kkk = canonkey.Physics.Vec3dW2C($scaleVec);
            var $box = new CANNON.Cylinder(kkk.x, kkk.y, kkk.z, 20);
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //      $body.linearDamping = $body.angularDamping = 0.5;//阻尼系数
            var $dis = new canonkey.CanonPrefabSprite($body);
            $dis._scene = this._scene;
            $dis.addToWorld();
            return $dis;
        };
        CannoSceneManager.prototype.addJIguangse = function ($pos) {
            var canonFrame3DSprite = new canonkey.CanonFrame3DSprite();
            canonFrame3DSprite._scene = this._scene;
            canonFrame3DSprite.x = $pos.x;
            canonFrame3DSprite.y = $pos.y;
            canonFrame3DSprite.z = $pos.z;
            canonFrame3DSprite.loadJiguanByName("jiguan001");
            return canonFrame3DSprite;
        };
        CannoSceneManager.prototype.addMoveBox = function ($scaleVec) {
            var $box = new CANNON.Box(canonkey.Physics.Vec3dW2C($scaleVec));
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //  $body.linearDamping = $body.angularDamping = 0.1;//阻尼系数
            var $dis = new canonkey.CanonPrefabSprite($body);
            $dis._scene = this._scene;
            $dis.addToWorld();
            return $dis;
        };
        CannoSceneManager.prototype.getFloadNum = function (value) {
            return Math.floor(value * 1000) / 1000;
        };
        CannoSceneManager.prototype.makeBodyByItem = function ($arr) {
            var $collisionItemVo = new Pan3d.CollisionItemVo;
            $collisionItemVo.collisionItem = new Array();
            for (var i = 0; i < $arr.length; i++) {
                var $collisionVo = new Pan3d.CollisionVo();
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
                $collisionVo.data = $xmlcollisionVo.data;
                $collisionItemVo.collisionItem.push($collisionVo);
            }
            return $collisionItemVo;
        };
        return CannoSceneManager;
    }());
    canonkey.CannoSceneManager = CannoSceneManager;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=CannoSceneManager.js.map