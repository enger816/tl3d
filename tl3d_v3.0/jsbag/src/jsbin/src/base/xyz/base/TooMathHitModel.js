var xyz;
(function (xyz) {
    var Vector2D = Pan3d.Vector2D;
    var Matrix3D = Pan3d.Matrix3D;
    var TestTriangle = Pan3d.TestTriangle;
    var Engine = Pan3d.Engine;
    var TooMathHitModel = /** @class */ (function () {
        function TooMathHitModel() {
        }
        TooMathHitModel.getViewMatrx3D = function (cam) {
            var viewMatrx3D = new Matrix3D;
            viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, 1000);
            viewMatrx3D.appendScale(1, cam.cavanRect.width / cam.cavanRect.height, 1);
            return viewMatrx3D;
        };
        TooMathHitModel.testHitModel = function (display3D, scene, mouseV2) {
            if (!display3D || !display3D.objData) {
                return 0;
            }
            var objData = display3D.objData;
            var clik3dVect = TooMathHitModel.getCamFontDistent(scene, mouseV2, 100); //鼠标前面的3D坐标
            var mat = scene.cam3D.cameraMatrix.clone();
            var viewMatrx3D = scene.viewMatrx3D.clone();
            mat.append(viewMatrx3D);
            for (var i = 0; i < objData.indexs.length / 3; i++) {
                var a = objData.indexs[i * 3 + 0];
                var b = objData.indexs[i * 3 + 1];
                var c = objData.indexs[i * 3 + 2];
                var A = new Vector3D(objData.vertices[a * 3 + 0], objData.vertices[a * 3 + 1], objData.vertices[a * 3 + 2]);
                var B = new Vector3D(objData.vertices[b * 3 + 0], objData.vertices[b * 3 + 1], objData.vertices[b * 3 + 2]);
                var C = new Vector3D(objData.vertices[c * 3 + 0], objData.vertices[c * 3 + 1], objData.vertices[c * 3 + 2]);
                A = display3D.posMatrix.transformVector(A);
                B = display3D.posMatrix.transformVector(B);
                C = display3D.posMatrix.transformVector(C);
                if (Vector3D.distance(A, B) == 0 || Vector3D.distance(A, C) == 0 || Vector3D.distance(B, C) == 0) {
                    console.log("有为零的点");
                    continue;
                }
                TestTriangle.baseTri.p1 = this.math3DWorldtoDisplay2DPos(A, mat, scene.cam3D.cavanRect);
                TestTriangle.baseTri.p2 = this.math3DWorldtoDisplay2DPos(B, mat, scene.cam3D.cavanRect);
                TestTriangle.baseTri.p3 = this.math3DWorldtoDisplay2DPos(C, mat, scene.cam3D.cavanRect);
                if (TestTriangle.baseTri.checkPointIn(mouseV2)) {
                    var camPos = new Vector3D(scene.cam3D.x, scene.cam3D.y, scene.cam3D.z);
                    var hitPos = Pan3d.MathUtil.getLinePlaneInterectPointByTri(camPos, clik3dVect, [A, B, C]);
                    A = scene.cam3D.cameraMatrix.transformVector(A);
                    B = scene.cam3D.cameraMatrix.transformVector(B);
                    C = scene.cam3D.cameraMatrix.transformVector(C);
                    if (A.z < 0 || B.z < 0 || C.z < 0) {
                        continue;
                    }
                    hitPos = scene.cam3D.cameraMatrix.transformVector(hitPos);
                    var deph = hitPos.z;
                    if (deph > 0) {
                        return deph;
                    }
                }
            }
            return 0;
        };
        //获取镜头前指定距离3D坐标点
        TooMathHitModel.getCamFontDistent = function (scene, mouseV2, $depht) {
            var mat = scene.cam3D.cameraMatrix.clone();
            var viewMatrx3D = scene.viewMatrx3D.clone();
            mat.append(viewMatrx3D);
            var v3d = this.mathDisplay2Dto3DWorldPos(mouseV2, scene);
            var camv3d = new Vector3D(scene.cam3D.x, scene.cam3D.y, scene.cam3D.z);
            var nrmV3d = v3d.subtract(camv3d);
            nrmV3d.normalize();
            nrmV3d.scaleBy($depht);
            camv3d = camv3d.add(nrmV3d);
            return camv3d;
        };
        TooMathHitModel.math3DWorldtoDisplay2DPos = function ($pos, mat, rect) {
            var p = mat.transformVector($pos);
            var b = new Vector2D;
            b.x = ((p.x / p.w) + 1) * (rect.width / 2);
            b.y = ((-p.y / p.w) + 1) * (rect.height / 2);
            return b;
        };
        TooMathHitModel.mathDisplay2Dto3DWorldPos = function ($point, scene) {
            var cameraMatrixInvert = scene.cam3D.cameraMatrix.clone();
            var viewMatrx3DInvert = scene.viewMatrx3D.clone();
            cameraMatrixInvert.invert();
            viewMatrx3DInvert.invert();
            var a = new Vector3D();
            a.x = $point.x;
            a.y = $point.y;
            a.x = a.x * 2 / scene.cam3D.cavanRect.width - 1;
            a.y = 1 - a.y * 2 / scene.cam3D.cavanRect.height;
            a.w = 1;
            a.x = a.x * a.w;
            a.y = a.y * a.w;
            a = viewMatrx3DInvert.transformVector(a);
            a.z = 1;
            a = cameraMatrixInvert.transformVector(a);
            return a;
        };
        return TooMathHitModel;
    }());
    xyz.TooMathHitModel = TooMathHitModel;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooMathHitModel.js.map