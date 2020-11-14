module Pan3d {
    export class ScaleChange extends BaseAnim {
        public maxNum: number;
        public minNum: number;
        public constructor() {
            super();
            this.num = 1;
        }
        public coreCalculate(): void {
            this.num = 1 + this.speed * this.time + this.baseNum;
            if (this.num < this.minNum) {
                this.num = this.minNum;
            } else if (this.num > this.maxNum) {
                this.num = this.maxNum;
            }
        }
        /**
         * 
         * @param value
         * 
         */
        public set data(value: Array<any>) {
            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = Number(value[1].value);
            }
            this.speed = Number(value[2].value) * 0.001;
            this.minNum = Number(value[3].value) * 0.01;
            this.maxNum = Number(value[4].value) * 0.01;
        }

        public dataByte(va: Array<any>, arr: Array<any>): void {
            this.beginTime = arr[0]
            if (arr[1] == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = arr[1];
            }
            this.speed = arr[2] * 0.001;
            this.minNum = arr[3] * 0.01;
            this.maxNum = arr[4] * 0.01;

        }

        public getAllNum(allTime: number) {
            allTime = Math.min(allTime, this.lastTime);
            allTime = allTime - this.beginTime;

            var num: number = this.speed * allTime;
            this.baseNum += num;
            if (this.baseNum < this.minNum) {
                this.baseNum = this.minNum;
            } else if (num > this.maxNum) {
                this.baseNum = this.maxNum;
            }

        }


        public reset(): void {
            this._isActiva = false;
            this._isDeath = false;


            this.time = 0;
            this.num = 1;
        }
        public depthReset(): void {
            this._isActiva = false;
            this._isDeath = false;

            this.time = 0;
            this.baseNum = 0;
            this.num = 1;
        }

    }
}