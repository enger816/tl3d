var game;
(function (game) {
    var Vector3D = Pan3d.Vector3D;
    var Vector2D = Pan3d.Vector2D;
    var MathUtil = Pan3d.MathUtil;
    var Rectangle = Pan3d.Rectangle;
    var TestTriangle = Pan3d.TestTriangle;
    var MouseClikModel = /** @class */ (function () {
        function MouseClikModel() {
        }
        MouseClikModel.getInstance = function () {
            if (!MouseClikModel._instance) {
                MouseClikModel._instance = new MouseClikModel();
            }
            return MouseClikModel._instance;
        };
        MouseClikModel.prototype.mouseClik = function (v2d) {
            var $a = Pan3d.Scene_data.cam3D.postion;
            var $rect = new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight);
            Scene_data.viewMatrx3D = game.GameDataModel.scene.viewMatrx3D.clone();
            var $b = MouseClikModel.getGroundPos(v2d.x, v2d.y, Scene_data.cam3D, $rect);
            var jiguanSpriteItem = game.GameLevelManeger.getInstance().jiguanSpriteItem;
            for (var i = 0; i < jiguanSpriteItem.length; i++) {
                var $spriteItem = jiguanSpriteItem[i].spriteItem;
                for (var j = 0; j < $spriteItem.length; j++) {
                    if ($spriteItem[j].frameFileNode.frameNodeVo.name.indexOf("startup") != -1) {
                        var $paretDis = $spriteItem[j]._directShadowDisplay3DSprite;
                        var groupItem = $spriteItem[j]._directShadowDisplay3DSprite.groupItem;
                        for (var k = 0; k < groupItem.length; k++) {
                            var $dis = groupItem[k];
                            $dis.posMatrix = $paretDis.posMatrix;
                            var $isHit = this.clikSprite($dis, $a, $b);
                            if ($isHit) {
                                jiguanSpriteItem[i].clik(true);
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        MouseClikModel.prototype.clikModelItems = function ($a, $b) {
            var modelItems = game.GameLevelManeger.getInstance().modelItems;
            for (var i = 0; i < modelItems.length; i++) {
                var $paretDis = modelItems[i]._directShadowDisplay3DSprite;
                var groupItem = modelItems[i]._directShadowDisplay3DSprite.groupItem;
                for (var j = 0; j < groupItem.length; j++) {
                    var $dis = groupItem[j];
                    $dis.posMatrix = $paretDis.posMatrix;
                    var $isHit = this.clikSprite($dis, $a, $b);
                    if ($isHit) {
                        return true;
                    }
                }
            }
            return false;
        };
        MouseClikModel.getGroundPos = function ($x, $y, $cam3D, $rect) {
            this.cam3D = $cam3D;
            this.windowRect = $rect;
            var $ty = -0;
            if (!this._plantObjectMath) {
                var A = new Pan3d.Vector3D(0, $ty, 500);
                var B = new Pan3d.Vector3D(-500, $ty, 0);
                var C = new Pan3d.Vector3D(500, $ty, 0);
                this._plantObjectMath = Pan3d.Calculation._PanelEquationFromThreePt(A, B, C);
                this._plantnormal = new Pan3d.Vector3D(this._plantObjectMath.a, this._plantObjectMath.b, this._plantObjectMath.c);
                this._plantnormal.normalize();
                this._plane_a = new Pan3d.Vector3D(A.x, A.y, A.z);
            }
            //计算直线与平面交点
            var line_a = this.getLookAtPosByCamDistance(new Pan3d.Vector2D($x, $y));
            var line_b = new Pan3d.Vector3D(this.cam3D.x, this.cam3D.y, this.cam3D.z);
            var crossPoint = Pan3d.Calculation.calPlaneLineIntersectPoint(this._plantnormal, this._plane_a, line_a, line_b);
            return crossPoint;
        };
        MouseClikModel.getLookAtPosByCamDistance = function ($point) {
            var distance350 = 350 * (GameData.pixelRatio / 2);
            var viewMatrx3D = game.GameDataModel.scene.viewMatrx3D.clone();
            var camMatrx3d = game.GameDataModel.scene.cameraMatrix.clone();
            var fovw = this.windowRect.width;
            var fovh = this.windowRect.height;
            var $basePos = new Vector2D($point.x - (fovw / 2), -($point.y - (fovh / 2)));
            $basePos.x = $basePos.x / (fovw / 2) * distance350;
            $basePos.y = $basePos.y / (fovh / 2) * distance350;
            var buildPos = new Pan3d.Vector3D($basePos.x, $basePos.y, distance350);
            var uc = viewMatrx3D.transformVector(buildPos);
            uc.x = $basePos.x;
            uc.y = $basePos.y;
            var $viewMatrx3DInvert = viewMatrx3D.clone();
            $viewMatrx3DInvert.invert();
            var $camMatrx3dInvert = camMatrx3d.clone();
            $camMatrx3dInvert.invert();
            var eeee = $viewMatrx3DInvert.transformVector(uc);
            var p = $camMatrx3dInvert.transformVector(new Vector3D(eeee.x, eeee.y, distance350));
            return p;
        };
        MouseClikModel.prototype.clikSprite = function ($dis, $a, $b) {
            var hitVec2 = MathUtil.math3DWorldtoDisplay2DPos($b);
            if ($dis.objData && $dis.objData.indexs) {
                var $objdata = $dis.objData;
                if (!$objdata.vertices || $objdata.vertices.length <= 0) {
                    $objdata.vertices = new Array;
                    var dd = $objdata.baseDataView;
                    var $len = dd.byteLength / $objdata.stride;
                    for (var i = 0; i < $len; i++) {
                        $objdata.vertices.push(dd.getFloat32($objdata.stride * i + 0, true));
                        $objdata.vertices.push(dd.getFloat32($objdata.stride * i + 4, true));
                        $objdata.vertices.push(dd.getFloat32($objdata.stride * i + 8, true));
                    }
                }
                var hitBox2DItem = new Array;
                for (var j = 0; j < $objdata.vertices.length / 3; j++) {
                    var temppp = $dis.posMatrix.transformVector(new Vector3D($objdata.vertices[j * 3 + 0], $objdata.vertices[j * 3 + 1], $objdata.vertices[j * 3 + 2]));
                    hitBox2DItem.push(MathUtil.math3DWorldtoDisplay2DPos(temppp));
                }
                for (var i = 0; i < $objdata.indexs.length / 3; i++) {
                    TestTriangle.baseTri.p1 = hitBox2DItem[$objdata.indexs[i * 3 + 0]];
                    TestTriangle.baseTri.p2 = hitBox2DItem[$objdata.indexs[i * 3 + 1]];
                    TestTriangle.baseTri.p3 = hitBox2DItem[$objdata.indexs[i * 3 + 2]];
                    if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
                        return true;
                    }
                }
            }
            return false;
        };
        return MouseClikModel;
    }());
    game.MouseClikModel = MouseClikModel;
})(game || (game = {}));
//# sourceMappingURL=MouseClikModel.js.map