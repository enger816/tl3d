import {Matrix3D} from "../../math/Matrix3D"
import {Vector3D} from "../../math/Vector3D"

    export interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
        getSunType(): number;
    }
    export  interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }

