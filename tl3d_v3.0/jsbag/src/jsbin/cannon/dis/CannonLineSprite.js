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
var canonkey;
(function (canonkey) {
    var LineDisplaySprite = Pan3d.LineDisplaySprite;
    var Vector3D = Pan3d.Vector3D;
    var Vector2D = Pan3d.Vector2D;
    var Matrix3D = Pan3d.Matrix3D;
    var CollisionType = Pan3d.CollisionType;
    var ObjData = Pan3d.ObjData;
    var CannonLineSprite = /** @class */ (function (_super) {
        __extends(CannonLineSprite, _super);
        function CannonLineSprite() {
            var _this = _super.call(this) || this;
            _this.visible = true;
            _this.changeBodyPosion = false;
            if (!CannonLineSprite.ballLineSprite) {
                _this.mathBallSptre();
            }
            if (!CannonLineSprite.boxLineSprite) {
                _this.mathBoxSprite();
            }
            if (!CannonLineSprite.cylinderLineSprite) {
                _this.mathCylinderSprite();
            }
            if (!CannonLineSprite.coneLineSprite) {
                _this.mathConeSprite();
            }
            return _this;
        }
        CannonLineSprite.prototype.mathConeSprite = function () {
            var tempSprite = new LineDisplaySprite();
            tempSprite.clear();
            tempSprite.baseColor = new Vector3D(1, 0, 1, 1);
            var w = 100;
            var h = 100;
            this.clear();
            var jindu = 12;
            var lastA;
            var i;
            for (i = 0; i < jindu; i++) {
                var a = new Vector3D(w, -h / 2, 0);
                var m = new Matrix3D;
                m.appendRotation(i * (360 / jindu), Vector3D.Y_AXIS);
                var A = m.transformVector(a);
                tempSprite.makeLineMode(A, new Vector3D(0, -h / 2, 0));
                tempSprite.makeLineMode(A, new Vector3D(0, +h / 2, 0));
                if (i == (jindu - 1)) {
                    tempSprite.makeLineMode(A, a);
                }
                if (lastA) {
                    tempSprite.makeLineMode(A, lastA);
                }
                lastA = A.clone();
            }
            tempSprite.upToGpu();
            CannonLineSprite.coneLineSprite = tempSprite;
        };
        CannonLineSprite.prototype.mathCylinderSprite = function () {
            var tempSprite = new LineDisplaySprite();
            tempSprite.clear();
            tempSprite.baseColor = new Vector3D(0, 0, 1, 1);
            var w = 100;
            var h = 100;
            var jindu = 12;
            var lastA;
            var lastB;
            var i;
            for (i = 0; i < jindu; i++) {
                var a = new Vector3D(w, -h / 2, 0);
                var b = new Vector3D(w, +h / 2, 0);
                var m = new Matrix3D;
                m.appendRotation(i * (360 / jindu), Vector3D.Y_AXIS);
                var A = m.transformVector(a);
                var B = m.transformVector(b);
                tempSprite.makeLineMode(A, B);
                tempSprite.makeLineMode(A, new Vector3D(0, -h / 2, 0));
                tempSprite.makeLineMode(B, new Vector3D(0, +h / 2, 0));
                if (i == (jindu - 1)) {
                    tempSprite.makeLineMode(A, a);
                    tempSprite.makeLineMode(B, b);
                }
                if (lastA || lastB) {
                    tempSprite.makeLineMode(A, lastA);
                    tempSprite.makeLineMode(B, lastB);
                }
                lastA = A.clone();
                lastB = B.clone();
            }
            tempSprite.upToGpu();
            CannonLineSprite.cylinderLineSprite = tempSprite;
        };
        CannonLineSprite.prototype.mathBoxSprite = function () {
            var tempSprite = new LineDisplaySprite();
            tempSprite.clear();
            tempSprite.baseColor = new Vector3D(0, 1, 0, 1);
            var p = new Vector3D(100, 100, 100);
            tempSprite.makeLineMode(new Vector3D(-p.x, -p.y, -p.z), new Vector3D(+p.x, -p.y, -p.z));
            tempSprite.makeLineMode(new Vector3D(+p.x, -p.y, -p.z), new Vector3D(+p.x, -p.y, +p.z));
            tempSprite.makeLineMode(new Vector3D(+p.x, -p.y, +p.z), new Vector3D(-p.x, -p.y, +p.z));
            tempSprite.makeLineMode(new Vector3D(-p.x, -p.y, +p.z), new Vector3D(-p.x, -p.y, -p.z));
            tempSprite.makeLineMode(new Vector3D(-p.x, +p.y, -p.z), new Vector3D(+p.x, +p.y, -p.z));
            tempSprite.makeLineMode(new Vector3D(+p.x, +p.y, -p.z), new Vector3D(+p.x, +p.y, +p.z));
            tempSprite.makeLineMode(new Vector3D(+p.x, +p.y, +p.z), new Vector3D(-p.x, +p.y, +p.z));
            tempSprite.makeLineMode(new Vector3D(-p.x, +p.y, +p.z), new Vector3D(-p.x, +p.y, -p.z));
            tempSprite.makeLineMode(new Vector3D(-p.x, -p.y, -p.z), new Vector3D(-p.x, +p.y, -p.z));
            tempSprite.makeLineMode(new Vector3D(+p.x, -p.y, -p.z), new Vector3D(+p.x, +p.y, -p.z));
            tempSprite.makeLineMode(new Vector3D(+p.x, -p.y, +p.z), new Vector3D(+p.x, +p.y, +p.z));
            tempSprite.makeLineMode(new Vector3D(-p.x, -p.y, +p.z), new Vector3D(-p.x, +p.y, +p.z));
            tempSprite.upToGpu();
            CannonLineSprite.boxLineSprite = tempSprite;
        };
        CannonLineSprite.prototype.mathBallSptre = function () {
            var tempSprite = new LineDisplaySprite();
            var radiusNum100 = 100;
            tempSprite.clear();
            tempSprite.baseColor = new Vector3D(1, 0, 0, 1);
            var num = 12;
            var p;
            var m;
            var lastPos;
            var i;
            var j;
            var bm;
            var bp;
            for (j = 0; j <= num; j++) {
                lastPos = null;
                for (i = 0; i < num; i++) {
                    p = new Vector3D(radiusNum100, 0, 0);
                    m = new Matrix3D;
                    m.appendRotation((360 / num) * i, Vector3D.Z_AXIS);
                    p = m.transformVector(p);
                    bm = new Matrix3D;
                    bm.appendRotation((360 / num) * j, Vector3D.Y_AXIS);
                    p = bm.transformVector(p);
                    if (lastPos) {
                        tempSprite.makeLineMode(lastPos, p);
                    }
                    lastPos = p.clone();
                }
            }
            for (j = 0; j <= 4; j++) {
                bm = new Matrix3D;
                bm.appendRotation(j * 20, Vector3D.Z_AXIS);
                bp = bm.transformVector(new Vector3D(radiusNum100, 0, 0));
                lastPos = null;
                for (i = 0; i < num; i++) {
                    p = bp.clone();
                    m = new Matrix3D;
                    m.appendRotation((360 / num) * i, Vector3D.Y_AXIS);
                    p = m.transformVector(p);
                    if (lastPos) {
                        tempSprite.makeLineMode(lastPos, p);
                    }
                    if (i == num - 1) {
                        tempSprite.makeLineMode(bp, p);
                    }
                    lastPos = p.clone();
                }
            }
            for (j = 1; j <= 4; j++) {
                bm = new Matrix3D;
                bm.appendRotation(j * -20, Vector3D.Z_AXIS);
                bp = bm.transformVector(new Vector3D(radiusNum100, 0, 0));
                lastPos = null;
                for (i = 0; i < num; i++) {
                    p = bp.clone();
                    m = new Matrix3D;
                    m.appendRotation((360 / num) * i, Vector3D.Y_AXIS);
                    p = m.transformVector(p);
                    if (lastPos) {
                        tempSprite.makeLineMode(lastPos, p);
                    }
                    if (i == num - 1) {
                        tempSprite.makeLineMode(bp, p);
                    }
                    lastPos = p.clone();
                }
            }
            tempSprite.upToGpu();
            CannonLineSprite.ballLineSprite = tempSprite;
        };
        CannonLineSprite.prototype.setCollsionType = function ($collisionVo) {
            switch ($collisionVo.type) {
                case CollisionType.BOX:
                    this.objData = CannonLineSprite.boxLineSprite.objData;
                    break;
                case CollisionType.BALL:
                    this.objData = CannonLineSprite.ballLineSprite.objData;
                    break;
                case CollisionType.Cylinder:
                    this.objData = CannonLineSprite.cylinderLineSprite.objData;
                    break;
                case CollisionType.Cone:
                    this.objData = CannonLineSprite.coneLineSprite.objData;
                    break;
                case CollisionType.Polygon:
                    this.objData = this.makePolygonObjData($collisionVo.data);
                    break;
                default:
                    break;
            }
        };
        CannonLineSprite.prototype.update = function () {
            if (this.visible && CannonLineSprite.showCollisionLine) {
                if (this.body) {
                    var $ma = new Matrix3D;
                    canonkey.Physics.MathBody2WMatrix3D(this.body, $ma);
                    this.posMatrix.m = $ma.m;
                    this.posMatrix.prependScale(this.scaleX, this.scaleY, this.scaleZ);
                    /*
                    var mt3: CANNON.Mat3 = new CANNON.Mat3();
                    mt3.setRotationFromQuaternion(this.body.quaternion);
                    this.posMatrix.identity()
                    this.posMatrix.m[0] = mt3.elements[0]
                    this.posMatrix.m[1] = mt3.elements[1]
                    this.posMatrix.m[2] = mt3.elements[2]
                    this.posMatrix.m[4] = mt3.elements[3]
                    this.posMatrix.m[5] = mt3.elements[4]
                    this.posMatrix.m[6] = mt3.elements[5]
                    this.posMatrix.m[8] = mt3.elements[6]
                    this.posMatrix.m[9] = mt3.elements[7]
                    this.posMatrix.m[10] = mt3.elements[8]
    
                    var $pos: Vector3D = Physics.getV3D(this.body.position);
                    this.posMatrix.appendTranslation($pos.x, $pos.y, $pos.z);
                    this.posMatrix.prependScale(this.scaleX, this.scaleY, this.scaleZ);
                    */
                }
                if (CannonLineSprite.drawLineVisible) {
                    _super.prototype.update.call(this);
                }
            }
        };
        CannonLineSprite.prototype.makePolygonObjData = function ($data) {
            var tempSprite = new LineDisplaySprite();
            tempSprite.clear();
            tempSprite.baseColor = new Vector3D(0, 1, 1, 1);
            var a;
            var b;
            var c;
            var A;
            var B;
            var C;
            for (var i = 0; i < $data.indexs.length / 3; i++) {
                a = $data.indexs[i * 3 + 0];
                b = $data.indexs[i * 3 + 1];
                c = $data.indexs[i * 3 + 2];
                A = new Vector3D($data.vertices[a * 3 + 0], $data.vertices[a * 3 + 1], $data.vertices[a * 3 + 2]);
                B = new Vector3D($data.vertices[b * 3 + 0], $data.vertices[b * 3 + 1], $data.vertices[b * 3 + 2]);
                C = new Vector3D($data.vertices[c * 3 + 0], $data.vertices[c * 3 + 1], $data.vertices[c * 3 + 2]);
                tempSprite.makeLineMode(A, B);
                tempSprite.makeLineMode(B, C);
                tempSprite.makeLineMode(C, A);
            }
            tempSprite.upToGpu();
            return tempSprite.objData;
        };
        CannonLineSprite.prototype.setBody = function ($body) {
            this.changeBodyPosion = true;
            this.body = $body;
            var tempSprite = this;
            tempSprite.clear();
            var arr = null;
            for (var i = 0; i < $body.shapes.length; i++) {
                var $shapePos = canonkey.Physics.Vect3dC2W($body.shapeOffsets[i]);
                var $shapeQua = canonkey.Physics.Quaternion2W($body.shapeOrientations[i]);
                switch ($body.shapes[i].type) {
                    case 1:
                        var $sphere = $body.shapes[i];
                        $shapePos.scaleBy($sphere.radius);
                        this.drawSphereConvexPolyh($sphere.radius, $shapePos, $shapeQua);
                        break;
                    case 4:
                        var $box = $body.shapes[i];
                        var $boxSize = canonkey.Physics.Vect3dC2W($box.halfExtents);
                        this.drawBoxConvexPolyh($boxSize, $shapePos, $shapeQua);
                        break;
                    case 16:
                        var $cylinder = $body.shapes[i];
                        this.drawCylinderConvexPolyh($cylinder, $shapePos, $shapeQua);
                        break;
                    case 32:
                        var $heightField = $body.shapes[i];
                        this.drawFieldPolyh($heightField, $shapePos, $shapeQua);
                        break;
                    default:
                        console.log($body.shapes[i].type);
                        break;
                }
            }
            tempSprite.upToGpu();
        };
        CannonLineSprite.prototype.drawFieldPolyh = function ($heightField, $pos, $qua) {
            var tempSprite = this;
            var m = new Matrix3D;
            $qua.toMatrix3D(m);
            m.invert();
            m.appendTranslation($pos.x, $pos.y, $pos.z);
            var posItem = $heightField.data;
            var $scaleNum = $heightField.elementSize;
            var sizeX = posItem.length;
            var sizeY = posItem[0].length;
            var num10 = $scaleNum * 10;
            var $objData = new ObjData;
            $objData.vertices = new Array;
            $objData.uvs = new Array;
            $objData.lightuvs = new Array;
            $objData.normals = new Array;
            $objData.indexs = new Array;
            // console.log(posItem)
            for (var i = 0; i < sizeX - 1; i++) {
                for (var j = 0; j < sizeY - 1; j++) {
                    var a = new Vector2D(i + 0, j + 0);
                    var b = new Vector2D(i + 1, j + 0);
                    var c = new Vector2D(i + 1, j + 1);
                    var d = new Vector2D(i + 0, j + 1);
                    var A = new Vector3D(a.x * num10, posItem[a.x][a.y] * 10, a.y * num10);
                    var B = new Vector3D(b.x * num10, posItem[b.x][b.y] * 10, b.y * num10);
                    var C = new Vector3D(c.x * num10, posItem[c.x][c.y] * 10, c.y * num10);
                    var D = new Vector3D(d.x * num10, posItem[d.x][d.y] * 10, d.y * num10);
                    A = m.transformVector(A);
                    B = m.transformVector(B);
                    C = m.transformVector(C);
                    D = m.transformVector(D);
                    tempSprite.makeLineMode(A, B);
                    tempSprite.makeLineMode(A, D);
                    tempSprite.makeLineMode(C, B);
                    tempSprite.makeLineMode(C, D);
                }
            }
            //  tempSprite.upToGpu()
        };
        CannonLineSprite.prototype.drawCylinderConvexPolyh = function ($cylinder, $pos, $qua) {
            var tempSprite = this;
            var m = new Matrix3D;
            $qua.toMatrix3D(m);
            m.invert();
            m.appendTranslation($pos.x, $pos.y, $pos.z);
            // m.appendScale(1 / Physics.baseScale10, 1 / Physics.baseScale10, 1 / Physics.baseScale10)
            for (var i = 0; i < $cylinder.faces.length; i++) {
                var a = $cylinder.faces[i][0];
                var b = $cylinder.faces[i][1];
                var c = $cylinder.faces[i][2];
                var d = $cylinder.faces[i][3];
                var A = canonkey.Physics.Vect3dC2W($cylinder.vertices[a]);
                var B = canonkey.Physics.Vect3dC2W($cylinder.vertices[b]);
                var C = canonkey.Physics.Vect3dC2W($cylinder.vertices[c]);
                var D = canonkey.Physics.Vect3dC2W($cylinder.vertices[d]);
                A = m.transformVector(A);
                B = m.transformVector(B);
                C = m.transformVector(C);
                D = m.transformVector(D);
                tempSprite.makeLineMode(A, B);
                tempSprite.makeLineMode(A, D);
                tempSprite.makeLineMode(C, B);
                tempSprite.makeLineMode(C, D);
            }
        };
        CannonLineSprite.prototype.drawSphereConvexPolyh = function ($radius, $pos, $qua) {
            var tempSprite = this;
            var m = new Matrix3D;
            $qua.toMatrix3D(m);
            m.invert();
            m.appendTranslation($pos.x, $pos.y, $pos.z);
            var $LineDisplaySprite = CannonLineSprite.ballLineSprite;
            for (var i = 0; i < $LineDisplaySprite.lineVecPos.length / 6; i++) {
                var a = new Vector3D($LineDisplaySprite.lineVecPos[i * 6 + 0], $LineDisplaySprite.lineVecPos[i * 6 + 1], $LineDisplaySprite.lineVecPos[i * 6 + 2]);
                var b = new Vector3D($LineDisplaySprite.lineVecPos[i * 6 + 3], $LineDisplaySprite.lineVecPos[i * 6 + 4], $LineDisplaySprite.lineVecPos[i * 6 + 5]);
                a.scaleBy($radius * canonkey.Physics.baseScale10 / 100);
                b.scaleBy($radius * canonkey.Physics.baseScale10 / 100);
                a = m.transformVector(a);
                b = m.transformVector(b);
                tempSprite.makeLineMode(a, b);
            }
        };
        CannonLineSprite.prototype.drawBoxConvexPolyh = function ($size, $pos, $qua) {
            var tempSprite = this;
            var m = new Matrix3D;
            $qua.toMatrix3D(m);
            m.invert();
            m.appendTranslation($pos.x, $pos.y, $pos.z);
            var $LineDisplaySprite = CannonLineSprite.boxLineSprite;
            for (var i = 0; i < $LineDisplaySprite.lineVecPos.length / 6; i++) {
                var a = new Vector3D($LineDisplaySprite.lineVecPos[i * 6 + 0], $LineDisplaySprite.lineVecPos[i * 6 + 1], $LineDisplaySprite.lineVecPos[i * 6 + 2]);
                var b = new Vector3D($LineDisplaySprite.lineVecPos[i * 6 + 3], $LineDisplaySprite.lineVecPos[i * 6 + 4], $LineDisplaySprite.lineVecPos[i * 6 + 5]);
                a.x = a.x * $size.x / 100;
                a.y = a.y * $size.y / 100;
                a.z = a.z * $size.z / 100;
                b.x = b.x * $size.x / 100;
                b.y = b.y * $size.y / 100;
                b.z = b.z * $size.z / 100;
                a = m.transformVector(a);
                b = m.transformVector(b);
                tempSprite.makeLineMode(a, b);
            }
        };
        CannonLineSprite.showCollisionLine = true;
        CannonLineSprite.drawLineVisible = true;
        return CannonLineSprite;
    }(LineDisplaySprite));
    canonkey.CannonLineSprite = CannonLineSprite;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=CannonLineSprite.js.map