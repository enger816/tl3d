module Pan3d {
    export class ScaleNoise extends BaseAnim {
        public amplitude: number;

        public coreCalculate(): void {
            this.num = this.amplitude + this.amplitude * Math.sin(this.speed * this.time);
        }
        public set data(value: Array<any>) {
            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = Number(value[1].value);
            }
            this.amplitude = Number(value[2].value);
            this.speed = Number(value[3].value) * 0.01;
        }
        public dataByte(va: Array<any>, arr: Array<any>): void {
            this.beginTime = arr[0]
            if (arr[1] == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = arr[1];
            }
            this.amplitude = arr[2];
            this.speed = arr[3] * 0.01;

        }

        public getAllNum(allTime: number): void {
            this.baseNum = this.amplitude + this.amplitude * Math.sin(this.speed * allTime)
        }

    }

}