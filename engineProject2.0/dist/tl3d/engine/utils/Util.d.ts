import { Vector3D } from "../math/Vector3D";
import { Pan3dByteArray } from "../math/Pan3dByteArray";
export declare class Util {
    static float2int(value: any): number;
    static radian2angle(value: number): number;
    static angle2radian(value: number): number;
    static keyChi: Array<string>;
    /**阿拉伯数字转换成中文数字 */
    static getChiNum($id: number): string;
    static hexToArgb(expColor: number, is32?: boolean, color?: Vector3D): Vector3D;
    static hexToArgbNum(expColor: number, is32?: boolean, color?: Vector3D): Vector3D;
    static getBaseUrl(): string;
    /**描边路径 */
    static strokeFilter(ctx: CanvasRenderingContext2D, width: number, height: number, color: number): void;
    static trim(s: any): String;
    static trimLeft(s: any): String;
    static trimRight(s: any): String;
    static TweenMoveTo(taget: any, t: number, vars: any): void;
    static getScencdStr(timeNum: number): string;
    static random($num: number): number;
    static randomByItem(arr: Array<any>): any;
    static makeArray(a: Array<any>, b: Array<any>): void;
    static unZip($aryBuf: ArrayBuffer): ArrayBuffer;
    static getZipByte($byte: Pan3dByteArray): Pan3dByteArray;
    static getUrlParam(name: string): string;
    static copy2clipboard(val: string): void;
    static getBit($num: number, offset: number): boolean;
}
