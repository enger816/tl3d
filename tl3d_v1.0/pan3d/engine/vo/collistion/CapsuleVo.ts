module Pan3d {
    export class CapsuleVo {
        public radius: number;
        public height: number;
        public constructor($radius: number, $height: number) {
            this.radius = $radius;
            this.height = $height;
        }
    }
}