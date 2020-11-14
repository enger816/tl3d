import { TextureRes } from "./TextureRes";
export declare class TexItem {
    private _id;
    url: string;
    textureRes: TextureRes;
    isDynamic: boolean;
    paramName: string;
    isParticleColor: boolean;
    isMain: boolean;
    /**
     * 0 为默认
     * 1 lightmap
     * 2 lutmap
     * 3 cubemap
     * 4 heightMap;
     */
    type: number;
    name: string;
    wrap: number;
    filter: number;
    mipmap: number;
    permul: boolean;
    destory(): void;
    set id(value: number);
    get id(): number;
    get texture(): WebGLTexture;
    static LIGHTMAP: number;
    static LTUMAP: number;
    static CUBEMAP: number;
    static HEIGHTMAP: number;
    static REFRACTIONMAP: number;
}
