import { Vector3D } from "./Vector3D";
import { Matrix3D } from "./Matrix3D";
import { Vector2D } from "./Vector2D";
export declare class MathUtil {
    /**
     * 2D坐标转换成3D坐标，当然要给一个相离镜头的深度
     * @param $point  2d位置是场景的坐标，
     * @param $depht  默认深度为500,
     * @return  3D的坐标
     *
     */
    static mathDisplay2Dto3DWorldPos($point: Vector2D, $depht?: number): Vector3D;
    private static gettempPos;
    static math3DWorldtoDisplay2DPos($pos: Vector3D): Vector2D;
    static argbToHex(a: number, r: number, g: number, b: number): number;
    static hexToArgb(expColor: number): Vector3D;
    /**
     * 空间一条射线和平面的交点
     * @param linePoint_a  过直线的一点
     * @param linePoint_b  过直线另一点
     * @param planePoint   过平面一点
     * @param planeNormal  平面的法线
     * @return
     *
     */
    private static getLineAndPlaneIntersectPoint;
    static lookAt(eyePos: Vector3D, lookAt: Vector3D): Matrix3D;
    /**
     *  功能:根据两个点返回角度
     *  参数:
     **/
    static getTowPointsAngle2(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * 返回两点的夹角
     * @param $p0
     * @param $p1
     * @return
     */
    static getTowPointsAngle($p0: Laya.Point, $p1: Laya.Point): number;
    /** 返回两个点的距离
     *  **/
    static getDisSquare(x1: number, y1: number, x2: number, y2: number): number;
}
