module Pan3d {
    export class ScaleAnim extends BaseAnim {
        public scaleAry: Array<any>;
        public beginScale: number;
        public scaleNum: number;
        private _currentTarget: any;
        private flag: number;

        private numAry: Array<number>;

        public constructor() {
            super();
            this.num = 1;
        }
        public update(t: number): void {
            if (this._isDeath) {
                return;
            }
            this.time = t - this.baseTime;
            if (this._isActiva) {
                this.coreCalculate();
                if (this.time > this.lastTime) {
                    this._isDeath = true;
                }
            } else {
                if (this.time >= this.beginTime) {
                    //this.time = this.time-this.beginTime;
                    this._isActiva = true;
                }
            }

        }

        public coreCalculate(): void {
            var frameNum: number = float2int(this.time / Scene_data.frameTime);
            if (frameNum >= this.numAry.length) {
                this.num = this.numAry[this.numAry.length - 1];
            } else {
                this.num = this.numAry[frameNum];
            }
        }

        public reset(): void {
            super.reset();
            this.num = 1;
        }

        public depthReset(): void {
            super.depthReset();
            this.num = 1;
        }

        public set data(value: Array<any>) {

            this.numAry = new Array;

            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = Number(value[1].value);
            }
            this.beginScale = Number(value[2].value);
            this.scaleNum = Number(value[3].value);

            this.scaleAry = new Array;
            var addTime: number = 0;
            for (var i: number = 4; i < 4 + this.scaleNum * 2; i += 2) {
                var obj: any = new Object;
                obj.value = Number(value[i].value);
                obj.time = Number(value[i + 1].value);
                addTime += obj.time;
                obj.beginTime = this.beginTime + addTime;
                this.scaleAry.push(obj);
            }

            var frameNum: number;

            var btime: number = 0;
            var aTime: number = 1;
            if (this.scaleAry.length) {
                frameNum = (this.scaleAry[this.scaleAry.length - 1].beginTime + this.scaleAry[this.scaleAry.length - 1].time) / Scene_data.frameTime;
                aTime = this.scaleAry[0].beginTime;
                this._currentTarget = this.scaleAry[0];
            } else {
                frameNum = 0;
            }

            var flag: number = 0;
            for (i = 0; i < frameNum; i++) {
                var ctime: number = Scene_data.frameTime * i;
                if (ctime >= this._currentTarget.beginTime) {
                    this.beginScale = this._currentTarget.value;
                    btime = this._currentTarget.beginTime;
                    if (flag == this.scaleAry.length - 1) {
                        this._currentTarget = this.scaleAry[this.scaleAry.length - 1];
                    } else {
                        flag++;
                        this._currentTarget = this.scaleAry[flag];
                    }
                    aTime = this._currentTarget.time;
                }
                var cNum: number = (ctime - btime) / aTime * (this._currentTarget.value - this.beginScale) + this.beginScale;

                this.numAry.push(cNum);
            }

            this._currentTarget = this.scaleAry[0];


        }

        public dataByte(va: Array<any>, arr: Array<any>): void {
            this.numAry = new Array;

            this.beginTime = arr[0];
            if (arr[1] == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = arr[1];
            }
            this.beginScale = arr[2];
            this.scaleNum = arr[3];

            this.scaleAry = new Array;
            var addTime: number = 0;
            for (var i: number = 4; i < 4 + this.scaleNum * 2; i += 2) {
                var obj: any = new Object;
                obj.value = arr[i];
                obj.time = arr[i + 1];
                addTime += obj.time;
                obj.beginTime = this.beginTime + addTime;
                this.scaleAry.push(obj);
            }

            var frameNum: number;

            var btime: number = 0;
            var aTime: number = 1;
            if (this.scaleAry.length) {
                frameNum = (this.scaleAry[this.scaleAry.length - 1].beginTime + this.scaleAry[this.scaleAry.length - 1].time) / Scene_data.frameTime;
                aTime = this.scaleAry[0].beginTime;
                this._currentTarget = this.scaleAry[0];
            } else {
                frameNum = 0;
            }

            var flag: number = 0;
            for (i = 0; i < frameNum; i++) {
                var ctime: number = Scene_data.frameTime * i;
                if (ctime >= this._currentTarget.beginTime) {
                    this.beginScale = this._currentTarget.value;
                    btime = this._currentTarget.beginTime;
                    if (flag == this.scaleAry.length - 1) {
                        this._currentTarget = this.scaleAry[this.scaleAry.length - 1];
                    } else {
                        flag++;
                        this._currentTarget = this.scaleAry[flag];
                    }
                    aTime = this._currentTarget.time;
                }
                var cNum: number = (ctime - btime) / aTime * (this._currentTarget.value - this.beginScale) + this.beginScale;

                this.numAry.push(cNum);
            }

            this._currentTarget = this.scaleAry[0];


        }

        public getAllNum(allTime: number): void {
            allTime = Math.min(allTime, this.lastTime + this.beginTime);

            var target: any = this.scaleAry[this.scaleAry.length - 1];
            if (allTime >= (target.beginTime + target.time)) {
                this.baseNum = target.value;
                return;
            }

            var flag: number;
            for (var i: number = 0; i < this.scaleAry.length; i++) {
                if (allTime > this.scaleAry[i].this.beginTime) {
                    this._currentTarget = this.scaleAry[i];
                    this.beginTime = this._currentTarget.this.beginTime;
                    this.beginScale = this._currentTarget.value;
                    flag = i;
                }
            }

            flag++;
            this._currentTarget = this.scaleAry[flag];

            this.baseNum = (this._currentTarget.value - this.beginScale) / this._currentTarget.this.time * (allTime - this.beginTime) + this.beginScale;

        }

    }
}