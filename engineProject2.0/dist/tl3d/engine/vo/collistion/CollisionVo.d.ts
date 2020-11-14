import { Object3D } from "../../base/Object3D";
export declare class CollisionVo extends Object3D {
    type: number;
    name: string;
    polygonUrl: string;
    data: any;
    radius: number;
    colorInt: number;
    constructor($x?: number, $y?: number, $z?: number);
}
export declare class CollisionItemVo {
    friction: number;
    restitution: number;
    isField: boolean;
    collisionItem: Array<CollisionVo>;
}
export declare class CollisionType {
    static Polygon: number;
    static BOX: number;
    static BALL: number;
    static Cylinder: number;
    static Cone: number;
}
