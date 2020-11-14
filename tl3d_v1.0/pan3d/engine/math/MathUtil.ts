module Pan3d {
    export class MathUtil {


        /**
         * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
         * @param $point  2d位置是场景的坐标，
         * @param $depht  默认深度为500,
         * @return  3D的坐标
         * 
         */
        public static mathDisplay2Dto3DWorldPos($point: Vector2D, $depht: number = 300): Vector3D {
            var $disNum: number = $depht / (Scene_data.sceneViewHW / 2)

            var $far: number = Scene_data.sceneViewHW / 2 * $disNum
            var fovw: number = Scene_data.stageWidth
            var fovh: number = Scene_data.stageHeight
            var m: Matrix3D = new Matrix3D;
            m.prependRotation(-Scene_data.cam3D.rotationY, Vector3D.Y_AXIS);
            m.prependRotation(-Scene_data.cam3D.rotationX, Vector3D.X_AXIS);

            var uc: Vector3D = Scene_data.viewMatrx3D.transformVector(new Vector3D(500, 0, 500))
            var zScale: number = uc.x / uc.w
            var fw: number = (fovw / 2 / zScale) * $disNum
            var fh: number = (fovh / 2 / zScale) * $disNum


            var tx: number = (($point.x / fovw) * fw) * 2
            var ty: number = (($point.y / fovh) * fh) * 2

            var p: Vector3D = this.gettempPos(new Vector3D(-fw + tx, +fh - ty, $far), m)
            return p

        }
        //计算出鼠标与地面Y为0的坐标点
        public static getGroundPanelPos($evt: any): Vector3D {
            var pos: Vector3D = MathClass.mathDisplay2Dto3DWorldPos(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight), new Vector2D($evt.x, $evt.y), 300)
            var triItem: Array<Vector3D> = new Array
            triItem.push(new Vector3D(0, 0, 0))
            triItem.push(new Vector3D(-100, 0, 100))
            triItem.push(new Vector3D(+100, 0, 100))
            var camPos: Vector3D = new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z)
            return this.getLinePlaneInterectPointByTri(camPos, pos, triItem)
        }
        private static gettempPos(a: Vector3D, m): Vector3D {
            var b = m.transformVector(a)
            b = b.add(new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z))
            return b
        }
        //3d坐标转换成场景像素坐标
        public static math3DWorldtoDisplay2DPos($pos: Vector3D): Vector2D {
            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone();
            m.append(Scene_data.viewMatrx3D.clone());
            var fovw: number = Scene_data.stageWidth
            var fovh: number = Scene_data.stageHeight
            var p: Vector3D = m.transformVector($pos);
            var b: Vector2D = new Vector2D;
            b.x = ((p.x / p.w) + 1) * (fovw / 2)
            b.y = ((-p.y / p.w) + 1) * (fovh / 2)
            return b;
        }

        public static argbToHex(a: number, r: number, g: number, b: number): number {
            // 转换颜色
            var color: number = a << 24 | r << 16 | g << 8 | b;
            return color;
        }

        public static hexToArgb(expColor: number): Vector3D {
            var color: Vector3D = new Vector3D();
            color.w = (expColor >> 24) & 0xFF;
            color.x = (expColor >> 16) & 0xFF;
            color.y = (expColor >> 8) & 0xFF;
            color.z = (expColor) & 0xFF;
            return color;
        }

        /**
     * 
     * @param linePoint_a  线起点
     * @param linePoint_b  线结点
     * @param planePoint  构成面的三个点
     * @return 交点坐标
     * 
     */
        public static getLinePlaneInterectPointByTri(linePoint_a: Vector3D, linePoint_b: Vector3D, planePoint: Array<Vector3D>): Vector3D {
            if (planePoint.length < 3) return null;
            var nomal: Vector3D = new Vector3D(0, 2000, 0)
            return this.getLineAndPlaneIntersectPoint(linePoint_a, linePoint_b, planePoint[0], nomal);
        }
        /**
         * 空间一条射线和平面的交点 
         * @param linePoint_a  过直线的一点
         * @param linePoint_b  过直线另一点
         * @param planePoint   过平面一点
         * @param planeNormal  平面的法线
         * @return 
         * 
         */
        private static getLineAndPlaneIntersectPoint(linePoint_a: Vector3D, linePoint_b: Vector3D, planePoint: Vector3D, planeNormal: Vector3D): Vector3D {
            var lineVector: Vector3D = new Vector3D(linePoint_a.x - linePoint_b.x, linePoint_a.y - linePoint_b.y, linePoint_a.z - linePoint_b.z);
            lineVector.normalize();
            var pt: number = lineVector.x * planeNormal.x + lineVector.y * planeNormal.y + lineVector.z * planeNormal.z;
            var t: number = ((planePoint.x - linePoint_a.x) * planeNormal.x + (planePoint.y - linePoint_a.y) * planeNormal.y + (planePoint.z - linePoint_a.z) * planeNormal.z) / pt;
            var aPro1: Vector3D = new Vector3D;
            aPro1.setTo(linePoint_a.x + lineVector.x * t, linePoint_a.y + lineVector.y * t, linePoint_a.z + lineVector.z * t);
            return aPro1;
        }


        public static lookAt(eyePos: Vector3D, lookAt: Vector3D): Matrix3D {
            var matr: Matrix3D = new Matrix3D();
            matr.buildLookAtLH(eyePos, lookAt, Vector3D.Y_AXIS)
            return matr

        }

    }
}