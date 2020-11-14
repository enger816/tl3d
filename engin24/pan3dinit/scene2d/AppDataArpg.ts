import {Vector2D} from "../../pan3d/engine/math/Vector2D"
import {Vector3D} from "../../pan3d/engine/math/Vector3D"
import {Matrix3D} from "../../pan3d/engine/math/Matrix3D"
import {SceneChar} from "../../pan3d/baseprite/SceneChar"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {Override2dEngine} from "./override2d/Override2dEngine"
import {MathUtil} from "../../pan3d/engine/math/MathUtil"
import {GameInstance} from "../../pan3d/baseprite/GameInstance"

    export class AppDataArpg {
        public static mainChar: SceneChar;
        public static sceneStagePos: Vector2D = new Vector2D
        public static lockMainChar: boolean = true;

        //以下为2D的换算

        public static math3dto2Darpg($p: Vector3D): Vector2D {

            var $point: Vector3D =  Scene_data.vpMatrix.transformVector($p)

            var fovw: number = Scene_data.stageWidth / 4 / Override2dEngine.htmlScale;
            var fovh: number =  Scene_data.stageHeight / 4 / Override2dEngine.htmlScale;
            var tx: number = fovw + $point.x * fovw;
            var ty: number = fovh - $point.y * fovh;
            return new Vector2D(tx, ty)
        }
        //通过3D坐标计算出2D场景中的坐标
        public static getScene2DBy3Dpostion($v3d: Vector3D): Vector2D {
            var $v2: Vector2D = this.math3dto2Darpg($v3d)
            $v2.x -= AppDataArpg.sceneStagePos.x;
            $v2.y -= AppDataArpg.sceneStagePos.y;
            return $v2
        }

        private static triItem: Array<Vector3D>
        public static math2Dto3DGroundarpg($p: Vector2D):  Vector3D {
            this._vpMatrixInver = Scene_data.vpMatrix.clone();
            this._vpMatrixInver.invert()

            var $k0: Vector3D = this.math2dto3Darpg($p, 100);
            var $k1:  Vector3D = this.math2dto3Darpg($p, 200);
            if (!this.triItem) {
                this.triItem = new Array
                this.triItem.push(new Vector3D(0, 0, 0))
                this.triItem.push(new Vector3D(-100, 0, 100))
                this.triItem.push(new Vector3D(+100, 0, 100))
            }
            return MathUtil.getLinePlaneInterectPointByTri($k0, $k1, this.triItem)
        }
        private static math2dto3Darpg($p: Vector2D, $deph: number = 100): Vector3D {
            var fovw: number = Scene_data.stageWidth / 4;
            var fovh: number = Scene_data.stageHeight / 4;
            var tx: number = $p.x;
            var ty: number = $p.y;
            var $point: Vector3D = new Vector3D();
            $point.y = (fovh - ty) / fovh;
            $point.x = (tx - fovw) / fovw;
            $point.z = $deph;
            //$point = this._viewMatrixInver.transformVector($point);
            //$point = this._camMatrixInver.transformVector($point);
            $point = this._vpMatrixInver.transformVector($point);
            return $point
        }
        private static _vpMatrixInver: Matrix3D

        public static refrishPos($vec: Vector2D): void {
            AppDataArpg.sceneStagePos.x = $vec.x;
            AppDataArpg.sceneStagePos.y = $vec.y;
            Scene_data.focus3D.x = -AppDataArpg.sceneStagePos.x / 2;
            Scene_data.focus3D.z = AppDataArpg.sceneStagePos.y / 2 / (Math.sin(45 * Math.PI / 180));
           // SceneGroundModel.getInstance().resetViewMatrx3D();
        }

        public static resetSelfPosCenter(): void {

            if (GameInstance.mainChar) {
                var $v2: Vector2D = this.getScene2DBy3Dpostion(new Vector3D(GameInstance.mainChar.x, 0,  GameInstance.mainChar.z))
                var $tw: number = Scene_data.stageWidth / 4 / Override2dEngine.htmlScale
                var $th: number = Scene_data.stageHeight / 4 / Override2dEngine.htmlScale
                var $tox: Vector2D = new Vector2D($tw - $v2.x, $th - $v2.y);
                this.refrishPos($tox);
            }

        }

    }
