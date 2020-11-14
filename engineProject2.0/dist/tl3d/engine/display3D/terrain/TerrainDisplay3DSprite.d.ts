import { Display3DSprite } from "../Display3DSprite";
import { BitMapData } from "../../base/BitMapData";
import { Pan3dByteArray } from "../../math/Pan3dByteArray";
export declare class GroundDataMesh {
    tx: number;
    ty: number;
    idBitmap: BitMapData;
    infoBitmap: BitMapData;
    sixurl: string;
    private mekeUseTexture;
    calibration(): void;
    static meshAllgroundData($byte: Pan3dByteArray): Array<GroundDataMesh>;
}
export declare class TerrainDisplay3DSprite extends Display3DSprite {
    private groundShader;
    private baseSixteenRes;
    private idMapPicDataTexture;
    private infoMapPicDataTexture;
    constructor();
    update(): void;
    private upDataToDraw;
    setGrounDataMesh($groundDataMesh: GroundDataMesh): void;
}
