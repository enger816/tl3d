module scene2d {
    export class AppDataArpg {
        public static mainChar: Pan3d.SceneChar;
        public static sceneStagePos: Pan3d.Vector2D = new Pan3d.Vector2D
        public static lockMainChar: boolean = true;

        //以下为2D的换算

        public static math3dto2Darpg($p: Pan3d.Vector3D): Pan3d.Vector2D {

            var $point: Pan3d.Vector3D = Pan3d. Scene_data.vpMatrix.transformVector($p)

            var fovw: number = Pan3d.Scene_data.stageWidth / 4 / Override2dEngine.htmlScale;
            var fovh: number = Pan3d. Scene_data.stageHeight / 4 / Override2dEngine.htmlScale;
            var tx: number = fovw + $point.x * fovw;
            var ty: number = fovh - $point.y * fovh;
            return new Pan3d.Vector2D(tx, ty)
        }
        //通过3D坐标计算出2D场景中的坐标
        public static getScene2DBy3Dpostion($v3d: Pan3d.Vector3D): Pan3d.Vector2D {
            var $v2: Pan3d.Vector2D = this.math3dto2Darpg($v3d)
            $v2.x -= AppDataArpg.sceneStagePos.x;
            $v2.y -= AppDataArpg.sceneStagePos.y;
            return $v2
        }

        private static triItem: Array<Pan3d.Vector3D>
        public static math2Dto3DGroundarpg($p: Pan3d.Vector2D): Pan3d. Vector3D {
            this._vpMatrixInver = Pan3d.Scene_data.vpMatrix.clone();
            this._vpMatrixInver.invert()

            var $k0: Pan3d.Vector3D = this.math2dto3Darpg($p, 100);
            var $k1: Pan3d. Vector3D = this.math2dto3Darpg($p, 200);
            if (!this.triItem) {
                this.triItem = new Array
                this.triItem.push(new Pan3d.Vector3D(0, 0, 0))
                this.triItem.push(new Pan3d.Vector3D(-100, 0, 100))
                this.triItem.push(new Pan3d.Vector3D(+100, 0, 100))
            }
            return Pan3d.MathUtil.getLinePlaneInterectPointByTri($k0, $k1, this.triItem)
        }
        private static math2dto3Darpg($p: Pan3d.Vector2D, $deph: number = 100): Pan3d.Vector3D {
            var fovw: number = Pan3d.Scene_data.stageWidth / 4;
            var fovh: number = Pan3d.Scene_data.stageHeight / 4;
            var tx: number = $p.x;
            var ty: number = $p.y;
            var $point: Pan3d.Vector3D = new Pan3d.Vector3D();
            $point.y = (fovh - ty) / fovh;
            $point.x = (tx - fovw) / fovw;
            $point.z = $deph;
            //$point = this._viewMatrixInver.transformVector($point);
            //$point = this._camMatrixInver.transformVector($point);
            $point = this._vpMatrixInver.transformVector($point);
            return $point
        }
        private static _vpMatrixInver: Pan3d.Matrix3D

        public static refrishPos($vec: Pan3d.Vector2D): void {
            AppDataArpg.sceneStagePos.x = $vec.x;
            AppDataArpg.sceneStagePos.y = $vec.y;
            Pan3d.Scene_data.focus3D.x = -AppDataArpg.sceneStagePos.x / 2;
            Pan3d.Scene_data.focus3D.z = AppDataArpg.sceneStagePos.y / 2 / (Math.sin(45 * Math.PI / 180));
           // SceneGroundModel.getInstance().resetViewMatrx3D();
        }

        public static resetSelfPosCenter(): void {

            if (Pan3d.GameInstance.mainChar) {
                var $v2: Pan3d.Vector2D = this.getScene2DBy3Dpostion(new Pan3d.Vector3D(Pan3d.GameInstance.mainChar.x, 0, Pan3d. GameInstance.mainChar.z))
                var $tw: number = Pan3d.Scene_data.stageWidth / 4 / Override2dEngine.htmlScale
                var $th: number = Pan3d.Scene_data.stageHeight / 4 / Override2dEngine.htmlScale
                var $tox: Pan3d.Vector2D = new Pan3d.Vector2D($tw - $v2.x, $th - $v2.y);
                this.refrishPos($tox);
            }

        }

    }
}