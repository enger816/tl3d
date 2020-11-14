import { Display3dShadow } from "../../display3D/Display3dShadow";
export declare class Shadow {
    _visible: boolean;
    display: Display3dShadow;
    data: Array<number>;
    constructor();
    set visible(value: boolean);
    get visible(): boolean;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    set size(value: number);
    get size(): number;
}
