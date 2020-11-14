module Pan3d {
    export class Unit extends GuidObject {
        public path: Array<Vector2D> = new Array;

        public sceneChar: SceneChar;

        public uintGuid: number;

        public isMain: boolean = false;

        private originalRotation: number = 0;


        

    }
}