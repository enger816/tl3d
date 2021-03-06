﻿import { Vector3D } from "../../math/Vector3D";
import { Matrix3D } from "../../math/Matrix3D";

    export interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
        getSunType(): number;
        getIsShadow():boolean;
    }
    export  interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }