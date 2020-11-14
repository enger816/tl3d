module Pan3d {
    export interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
    export  interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }

}