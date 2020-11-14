import { DynamicBaseTexItem } from "./DynamicBaseTexItem";
import { Curve } from "../utils/curves/Curve";
export declare class DynamicTexItem extends DynamicBaseTexItem {
    url: string;
    private _textureDynamic;
    isParticleColor: boolean;
    curve: Curve;
    private _life;
    constructor();
    destory(): void;
    initCurve($type: number): void;
    get texture(): WebGLTexture;
    creatTextureByCurve(): void;
    get life(): number;
    set life(value: number);
}
