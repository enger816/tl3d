var canonkey;
(function (canonkey) {
    var Vector3D = Pan3d.Vector3D;
    var Quaternion = Pan3d.Quaternion;
    var Matrix3D = Pan3d.Matrix3D;
    var CollisionVo = Pan3d.CollisionVo;
    var CollisionType = Pan3d.CollisionType;
    var Physics = /** @class */ (function () {
        function Physics() {
        }
        //创建一个世界
        Physics.creatWorld = function () {
            Physics.world = new CANNON.World();
            Physics.world.gravity = this.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            Physics.materialDic = new Object;
        };
        Physics.makeGround = function ($pos) {
            var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.Body({ mass: 0 });
            Physics.bodyAddShape(groundBody, groundShape);
            Physics.world.addBody(groundBody);
        };
        Physics.bodyAddShape = function ($body, $shape, $pos, $h5q) {
            if ($pos === void 0) { $pos = null; }
            if ($h5q === void 0) { $h5q = null; }
            var $angly = new CANNON.Quaternion();
            var $setPos = new CANNON.Vec3();
            if ($h5q) {
                $angly.x = $h5q.x;
                $angly.y = $h5q.z;
                $angly.z = $h5q.y;
            }
            if ($pos) {
                $setPos = this.Vec3dW2C($pos);
            }
            $body.addShape($shape, $setPos, $angly);
        };
        Physics.Vec3dW2C = function ($pos) {
            return new CANNON.Vec3($pos.x / this.baseScale10, $pos.z / this.baseScale10, $pos.y / this.baseScale10);
        };
        Physics.Vect3dC2W = function ($pos) {
            return new Vector3D($pos.x * this.baseScale10, $pos.z * this.baseScale10, $pos.y * this.baseScale10);
        };
        Physics.QuaternionW2C = function ($q) {
            return new CANNON.Quaternion($q.x, $q.z, $q.y, $q.w);
        };
        Physics.setMatrix3DToBody = function ($body, $m) {
            var q = new Quaternion;
            q.fromMatrix($m);
            $body.quaternion = this.QuaternionW2C(q);
        };
        //只有旋转和位移的矩阵
        Physics.MathBody2WMatrix3D = function ($body, $m) {
            if ($m === void 0) { $m = null; }
            if (!$m) {
                $m = new Matrix3D;
            }
            $m.identity();
            var $pos = Physics.Vect3dC2W($body.position);
            if (true) {
                var mt3 = new CANNON.Mat3();
                var q = new CANNON.Quaternion($body.quaternion.x, $body.quaternion.z, $body.quaternion.y, $body.quaternion.w);
                mt3.setRotationFromQuaternion(q);
                $m.m[0] = mt3.elements[0];
                $m.m[1] = mt3.elements[1];
                $m.m[2] = mt3.elements[2];
                $m.m[4] = mt3.elements[3];
                $m.m[5] = mt3.elements[4];
                $m.m[6] = mt3.elements[5];
                $m.m[8] = mt3.elements[6];
                $m.m[9] = mt3.elements[7];
                $m.m[10] = mt3.elements[8];
                $m.appendTranslation($pos.x, $pos.y, $pos.z);
            }
            return $m;
        };
        Physics.QuaternionSetW2C = function ($q, $x, $y, $z, $w) {
            $q.set($x, $z, $y, $w);
        };
        Physics.Quaternion2W = function ($q) {
            return new Quaternion($q.x, $q.z, $q.y, $q.w);
        };
        //获取多凸边形Shape
        Physics.makePolyhedronShape = function ($hitobj, $scale) {
            var rawVerts = $hitobj.vertices;
            var rawFaces = $hitobj.indexs;
            var verts = [], faces = [];
            var bodySize = 1;
            var collisionSize = Physics.Vec3dW2C($scale);
            for (var j = 0; j < rawVerts.length; j += 3) {
                verts.push(new CANNON.Vec3(rawVerts[j + 0] * collisionSize.x, rawVerts[j + 2] * collisionSize.y, //坐标关联，+2为z.和编辑器出来的顶点数据z,y,兑换
                rawVerts[j + 1] * collisionSize.z));
            }
            for (var j = 0; j < rawFaces.length; j += 3) {
                faces.push([rawFaces[j + 0], rawFaces[j + 1], rawFaces[j + 2]]);
            }
            var $polyhedronShape = new CANNON.ConvexPolyhedron(verts, faces);
            return $polyhedronShape;
        };
        Physics.makeBoxShape = function ($scale) {
            return new CANNON.Box(Physics.Vec3dW2C($scale));
        };
        Physics.makeSphereShape = function ($radius) {
            return new CANNON.Sphere($radius);
        };
        Physics.makeCylinderShape = function ($radius, $height, numSegments) {
            if (numSegments === void 0) { numSegments = 10; }
            return new CANNON.Cylinder($radius, $radius, $height, numSegments);
        };
        Physics.getBodyMesh = function ($pos, $mass) {
            var $body = new CANNON.Body({
                mass: $mass,
                position: Physics.Vec3dW2C($pos)
            });
            Physics.world.addBody($body);
            return $body;
        };
        Physics.addDynamicCapsulePhysics = function ($pos, $radius, $height) {
            var body = Physics.getBodyMesh($pos, 100);
            var sphere = Physics.makeSphereShape($radius);
            //var cylinder: CANNON.Sphere = Physics.makeCylinderShape($radius, $height);
            Physics.bodyAddShape(body, sphere, new Vector3D(0, $radius, 0));
            // Physics.bodyAddShape(body, cylinder, new Vector3D(0, $radius + $height / 2, 0));
            body.material = this.dynamicMaterial;
            body.type = CANNON.Body.DYNAMIC;
            // body.name = "role";
            // body.gameType = this.bodyGameRoleType;
            body.fixedRotation = true;
            body.updateMassProperties();
            Physics.world.addBody(body);
            this.dynamicBodyList.push(body);
            return body;
        };
        Physics.addStaticPhysics = function ($dis, $collisionItemVo) {
            var body = Physics.makeBuildBodyMesh($dis, $collisionItemVo);
            var key = String(float2int($collisionItemVo.friction * 100));
            var $buildMaterial;
            if (this.materialDic[key]) {
                $buildMaterial = this.materialDic[key];
            }
            else {
                $buildMaterial = new CANNON.Material();
                $buildMaterial.friction = $collisionItemVo.friction * 0.001;
                $buildMaterial.restitution = $collisionItemVo.restitution;
                var $contactMaterial = new CANNON.ContactMaterial(this.dynamicMaterial, $buildMaterial, {
                    friction: $collisionItemVo.friction, restitution: $collisionItemVo.restitution,
                    contactEquationStiffness: 1e7, contactEquationRelaxation: 500,
                    frictionEquationStiffness: 1e7, frictionEquationRelaxation: 3
                });
                this.world.addContactMaterial($contactMaterial);
                this.materialDic[key] = $buildMaterial;
            }
            body.material = $buildMaterial;
            body.type = CANNON.Body.KINEMATIC;
            Physics.world.addBody(body);
            return body;
        };
        Physics.removePhysics = function ($body) {
            Physics.world.removeBody($body);
        };
        Physics.removeAll = function () {
            var bodys = this.world.bodies;
            while (bodys.length) {
                this.removePhysics(bodys[0]);
            }
        };
        //通过objs的数据来生存一个body
        Physics.makeBuildBodyMesh = function ($dis, $collisionItemVo, $bBody, $mess) {
            if ($bBody === void 0) { $bBody = null; }
            if ($mess === void 0) { $mess = 100; }
            var $bodyMesh;
            if ($bBody) {
                $bodyMesh = $bBody;
            }
            else {
                $bodyMesh = Physics.getBodyMesh(new Vector3D($dis.x, $dis.y, $dis.z), $mess);
            }
            var m = new Matrix3D;
            //m.appendRotation(-$dis.rotationX, Vector3D.Z_AXIS)
            //m.appendRotation(-$dis.rotationY, Vector3D.Y_AXIS)
            //m.appendRotation(-$dis.rotationZ, Vector3D.Y_AXIS)
            var q = new Quaternion;
            q.fromMatrix(m);
            Physics.QuaternionSetW2C($bodyMesh.quaternion, q.x, q.y, q.z, q.w);
            $bodyMesh.type = CANNON.Body.KINEMATIC;
            for (var i = 0; i < $collisionItemVo.collisionItem.length; i++) {
                var $vo = $collisionItemVo.collisionItem[i];
                var $basePos = new Vector3D($vo.x * $dis.scaleX, $vo.y * $dis.scaleY, $vo.z * $dis.scaleZ);
                var $voM = new Matrix3D;
                //$voM.appendRotation(-$vo.rotationX, Vector3D.X_AXIS);
                //$voM.appendRotation(-$vo.rotationY, Vector3D.Y_AXIS);
                //$voM.appendRotation(-$vo.rotationZ, Vector3D.Z_AXIS);
                var $voQ = new Quaternion;
                $voQ.fromMatrix($voM);
                switch ($vo.type) {
                    case CollisionType.BOX:
                        var $scale = new Vector3D;
                        $scale.x = $vo.scaleX * $dis.scaleX * 100;
                        $scale.y = $vo.scaleY * $dis.scaleY * 100;
                        $scale.z = $vo.scaleZ * $dis.scaleZ * 100;
                        Physics.bodyAddShape($bodyMesh, Physics.makeBoxShape($scale), $basePos, new Vector3D($voQ.x, $voQ.y, $voQ.z));
                        break;
                    case CollisionType.BALL:
                        var radiusNum = ($dis.scaleX + $dis.scaleY + $dis.scaleZ) / 3; //0.17
                        radiusNum = (radiusNum * $vo.radius);
                        Physics.bodyAddShape($bodyMesh, Physics.makeSphereShape(radiusNum), $basePos, new Vector3D($voQ.x, $voQ.y, $voQ.z));
                        break;
                    case CollisionType.Cylinder:
                        Physics.bodyAddShape($bodyMesh, Physics.makeCylinderShape(($vo.scaleX * $dis.scaleX) * 10, ($vo.scaleY * $dis.scaleY) * 10), $basePos, new Vector3D($voQ.x, $voQ.y, $voQ.z));
                        break;
                    case CollisionType.Polygon:
                        var $scaleVec = new Vector3D($dis.scaleX * $vo.scaleX, $dis.scaleY * $vo.scaleY, $dis.scaleZ * $vo.scaleZ);
                        var $polyhed = Physics.makePolyhedronShape($vo.data, $scaleVec);
                        //$bodyMesh.addShape($polyhed, Physics.getPhysicsV3D($basePos))
                        Physics.bodyAddShape($bodyMesh, $polyhed, $basePos, new Vector3D($voQ.x, $voQ.y, $voQ.z));
                        break;
                    default:
                        break;
                }
            }
            return $bodyMesh;
        };
        //创建整个场景的静态碰撞体
        Physics.makeSceneCollision = function (arr) {
            var $bodyItem = new Array();
            for (var i = 0; i < arr.length; i++) {
                var $bodyMesh = Physics.getBodyMesh(new Vector3D(), 100);
                $bodyItem.push($bodyMesh);
                var $buildMaterial;
                /*
                var key: string = String(float2int(Number(arr[i].friction) * 100));
                if (this.materialDic[key]) {
                    $buildMaterial = this.materialDic[key];
                } else {
                    $buildMaterial = new CANNON.Material();
                    $buildMaterial.friction = Number(arr[i].friction)* 0.001;
                    $buildMaterial.restitution = Number(arr[i].restitution);
    
                    var $contactMaterial = new CANNON.ContactMaterial(this.dynamicMaterial, $buildMaterial, {
                        friction: Number(arr[i].friction), restitution: Number(arr[i].restitution),
                        contactEquationStiffness: 1e7, contactEquationRelaxation: 500,
                        frictionEquationStiffness: 1e7, frictionEquationRelaxation: 3
                    });
               
                    this.world.addContactMaterial($contactMaterial);
    
                    this.materialDic[key] = $buildMaterial;
                }
                $bodyMesh.material = $buildMaterial;
                */
                $bodyMesh.type = CANNON.Body.KINEMATIC;
                // $h5CollistionVo.friction = $spriet.objData.friction;
                // $h5CollistionVo.restitution = $spriet.objData.restitution;
                var $dis = new Object;
                $dis.x = Number(arr[i].x);
                $dis.y = Number(arr[i].y);
                $dis.z = Number(arr[i].z);
                $dis.scaleX = Number(arr[i].scale_x);
                $dis.scaleY = Number(arr[i].scale_y);
                $dis.scaleZ = Number(arr[i].scale_z);
                $dis.rotationX = Number(arr[i].rotationX);
                $dis.rotationY = Number(arr[i].rotationY);
                $dis.rotationZ = Number(arr[i].rotationZ);
                $dis.posMatrix = new Matrix3D;
                $dis.posMatrix.appendScale($dis.scaleX, $dis.scaleY, $dis.scaleZ);
                $dis.posMatrix.appendRotation($dis.rotationX, Vector3D.X_AXIS);
                $dis.posMatrix.appendRotation($dis.rotationY, Vector3D.Y_AXIS);
                $dis.posMatrix.appendRotation($dis.rotationZ, Vector3D.Z_AXIS);
                $dis.posMatrix.appendTranslation($dis.x, $dis.y, $dis.z);
                var $vo = arr[i].collisionVo;
                var $collisionVo = new CollisionVo();
                $collisionVo.x = Number($vo.x);
                $collisionVo.y = Number($vo.y);
                $collisionVo.z = Number($vo.z);
                $collisionVo.scaleX = Number($vo.scale_x);
                $collisionVo.scaleY = Number($vo.scale_y);
                $collisionVo.scaleZ = Number($vo.scale_z);
                $collisionVo.rotationX = Number($vo.rotationX);
                $collisionVo.rotationY = Number($vo.rotationY);
                $collisionVo.rotationZ = Number($vo.rotationZ);
                $collisionVo.type = Number($vo.type);
                var $voM = new Matrix3D;
                $voM.appendRotation(-$collisionVo.rotationZ, Vector3D.Z_AXIS);
                $voM.appendRotation(-$collisionVo.rotationY, Vector3D.Y_AXIS);
                $voM.appendRotation(-$collisionVo.rotationX, Vector3D.X_AXIS);
                $voM.appendRotation(-$dis.rotationZ, Vector3D.Z_AXIS);
                $voM.appendRotation(-$dis.rotationY, Vector3D.Y_AXIS);
                $voM.appendRotation(-$dis.rotationX, Vector3D.X_AXIS);
                var $voQ = new Quaternion;
                $voQ.fromMatrix($voM);
                var $basePos = $dis.posMatrix.transformVector(new Vector3D($collisionVo.x, $collisionVo.y, $collisionVo.z));
                $bodyMesh.position = Physics.Vec3dW2C($basePos);
                $bodyMesh.quaternion = Physics.QuaternionW2C($voQ);
                switch ($collisionVo.type) {
                    case CollisionType.BOX:
                        var $scale = new Vector3D;
                        $scale.x = $dis.scaleX * $collisionVo.scaleX * 100;
                        $scale.y = $dis.scaleY * $collisionVo.scaleY * 100;
                        $scale.z = $dis.scaleZ * $collisionVo.scaleZ * 100;
                        Physics.bodyAddShape($bodyMesh, Physics.makeBoxShape($scale));
                        break;
                    case CollisionType.BALL:
                        $collisionVo.radius = $vo.radius;
                        var radiusNum = ($dis.scaleX + $dis.scaleY + $dis.scaleZ) / 3;
                        radiusNum = (radiusNum * $collisionVo.radius);
                        Physics.bodyAddShape($bodyMesh, Physics.makeSphereShape(radiusNum));
                        break;
                    case CollisionType.Cylinder:
                        Physics.bodyAddShape($bodyMesh, Physics.makeCylinderShape(($collisionVo.scaleX * $dis.scaleX) * 100, $collisionVo.scaleY * $dis.scaleY * 100));
                        break;
                    case CollisionType.Cone:
                        //  Physics.bodyAddShape($bodyMesh, Physics.make(($collisionVo.scaleX * $dis.scaleX) * 100, $collisionVo.scaleY * $dis.scaleY * 100), $basePos, $voQ)
                        break;
                    case CollisionType.Polygon:
                        $collisionVo.data = $vo.data;
                        var $scaleVec = new Vector3D($collisionVo.scaleX * $dis.scaleX, $collisionVo.scaleY * $dis.scaleY, $collisionVo.scaleZ * $dis.scaleZ);
                        var $polyhed = Physics.makePolyhedronShape($collisionVo.data, $scaleVec);
                        Physics.bodyAddShape($bodyMesh, $polyhed);
                        break;
                    default:
                        break;
                }
            }
            return $bodyItem;
        };
        Physics.makeFieldForArr = function (posItem, $scaleNum) {
            var sizeX = posItem.length;
            var sizeY = posItem[0].length;
            var num10 = $scaleNum;
            var hfShape = new CANNON.Heightfield(posItem, {
                elementSize: num10
            });
            var hfBody = new CANNON.Body({ mass: 0 });
            var fieldPos = new Vector3D(-(sizeX * num10 / 2) + num10 / 2, 0, -(sizeY * num10 / 2) + num10 / 2);
            //  hfBody.addShape(hfShape, fieldPos);
            hfBody.gameType = 2;
            hfBody.type = CANNON.Body.KINEMATIC;
            Physics.bodyAddShape(hfBody, hfShape, fieldPos);
            Physics.world.addBody(hfBody);
            return hfBody;
        };
        Physics.update = function () {
            if (this.world && this.ready) {
                var $nowData = new Date;
                var $timeNum = $nowData.getTime() - this.cannonLast;
                var dt = $timeNum / 1000;
                var maxSubSteps = 1;
                //Physics.world.step(1 / 60, dt, maxSubSteps);
                Physics.world.step(1 / 60, 1 / 60, maxSubSteps);
                this.cannonLast = $nowData.getTime();
            }
        };
        Physics.cannonLast = 0;
        Physics.gravity980 = 980;
        Physics.bodyGameRoleType = 1;
        Physics.bodyGameGroundType = 2;
        Physics.baseScale10 = 10;
        Physics.ready = false;
        return Physics;
    }());
    canonkey.Physics = Physics;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=Physics.js.map