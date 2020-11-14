module Pan3d {
    export class CollisionVo extends Object3D {

        public type: number;
        public name: string
        public polygonUrl: string;
        public data: any;
        public radius: number
        public colorInt: number
        constructor($x: number = 0, $y: number = 0, $z: number = 0) {
            super();
        }
    }

    export  class CollisionItemVo {

        public friction: number
        public restitution: number
        public isField: boolean
        public collisionItem: Array<CollisionVo>;
    }

    export class CollisionType {

        public static Polygon: number = 0
        public static BOX: number = 1
        public static BALL: number = 2    //球体
        public static Cylinder: number = 3  //圆柱
        public static Cone: number = 4     //圆锥
    }
}