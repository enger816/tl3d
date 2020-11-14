module Pan3d {
    export class LightVo {
        public sunDirect: Array<number> = new Array(0, 1, 0);
        public sunColor: Array<number> = new Array(2, 0, 0);
        public ambientColor: Array<number> = new Array(0, 0, 0);

        public setData(sd: any, sc: any, ac: any): void {
            this.sunDirect[0] = sd.x;
            this.sunDirect[1] = sd.y;
            this.sunDirect[2] = sd.z;

            this.sunColor[0] = sc.x;
            this.sunColor[1] = sc.y;
            this.sunColor[2] = sc.z;

            this.ambientColor[0] = ac.x;
            this.ambientColor[1] = ac.y;
            this.ambientColor[2] = ac.z;
        }


    }
}