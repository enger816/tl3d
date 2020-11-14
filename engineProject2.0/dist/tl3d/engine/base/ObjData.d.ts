import { ResCount } from "./ResCount";
import { CollisionItemVo } from "../vo/collistion/CollisionVo";
export declare class ObjData extends ResCount {
    vertices: Array<number>;
    uvs: Array<number>;
    indexs: Array<number>;
    lightuvs: Array<number>;
    normals: Array<number>;
    tangents: Array<number>;
    bitangents: Array<number>;
    collision: CollisionItemVo;
    treNum: number;
    vertexBuffer: WebGLBuffer;
    uvBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    lightUvBuffer: WebGLBuffer;
    normalsBuffer: WebGLBuffer;
    tangentBuffer: WebGLBuffer;
    bitangentBuffer: WebGLBuffer;
    /**顶点 uv lightuv normal 合成一个 va */
    compressBuffer: boolean;
    uvsOffsets: number;
    lightuvsOffsets: number;
    normalsOffsets: number;
    tangentsOffsets: number;
    bitangentsOffsets: number;
    stride: number;
    hasdispose: boolean;
    constructor();
    destory(): void;
}
