import {Vector2D} from "../engine/math/Vector2D"
import {GuidObject} from "../engine/net/obj/GuidObject"
import {SceneChar} from "./SceneChar"

    export class Unit extends GuidObject {
        public path: Array<Vector2D> = new Array;

        public sceneChar: SceneChar;

        public uintGuid: number;

        public isMain: boolean = false;

        private originalRotation: number = 0;


        

    }
