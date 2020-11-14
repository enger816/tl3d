import { TexItem } from "./TexItem";
import { TextureRes } from "./TextureRes";
export declare class DynamicBaseTexItem {
    target: TexItem;
    paramName: string;
    textureRes: TextureRes;
    destory(): void;
    get texture(): WebGLTexture;
}
