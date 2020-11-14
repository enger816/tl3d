module Pan3d {
    export
        class BaseAnim {
        public baseNum: number = 0;
        public num: number = 0;
        public time: number = 0;
        public speed: number = 0;
        public aSpeed: number = 0;
        public beginTime: number = 0;
        public lastTime: number = 0;
        public baseTime: number = 0;
        protected _isActiva: boolean;
        protected _isDeath: boolean;

        public BaseAnim() {
        }
        public update(t: number): void {
            if (this._isDeath) {
                return;
            }
            this.time = t - this.baseTime;
            if (this._isActiva) {
                this.time = this.time - this.beginTime;
                if (this.time > this.lastTime) {
                    this.time = this.lastTime - this.beginTime;
                    this._isDeath = true;
                }
                this.coreCalculate();
            } else {
                if (this.time >= this.beginTime) {
                    if (this.time >= this.lastTime) {
                        this.time = this.lastTime - this.beginTime;
                        this.coreCalculate();
                        this._isDeath = true;
                    } else {
                        this.time = this.time - this.beginTime;
                        this.coreCalculate();
                    }
                    this._isActiva = true;
                }
            }

        }
        public coreCalculate(): void {
            this.num = this.speed * this.time + this.aSpeed * this.time * this.time + this.baseNum;
        }
        public reset(): void {
            this._isActiva = false;
            this._isDeath = false;

            //time = 0;
            //baseNum = num;
            this.time = 0;
            this.num = 0;
        }
        public depthReset(): void {
            this._isActiva = false;
            this._isDeath = false;

            this.time = 0;
            this.baseNum = 0;
            this.num = 0;
        }
        public set data(value: Array<any>) {

        }

        public get isDeath(): boolean {
            return this._isDeath;
        }

        public set isDeath(value: boolean) {
            this._isDeath = value;
        }

        public getAllNum(allTime: number): void {
            allTime = Math.min(allTime, this.lastTime);
            allTime = allTime - this.beginTime;
            var num: number = this.speed * allTime + this.aSpeed * allTime * allTime;
            this.baseNum += num;
        }

    }
}