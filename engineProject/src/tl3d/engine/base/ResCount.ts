namespace tl3d {
    export class ResCount extends GC {
        protected _useNum: number = 0;
        public idleTime: number = 0;
        //gc四次之后才被释放
        static GCTime: number = 4;

        public get useNum(): number {
            return this._useNum;
        }

        public set useNum(n: number) {
            this._useNum = n;
            // console.log("*设置引用计数：",this._useNum);
            if (this._useNum == 0) {
                this.idleTime = 0;
            }
        }

        public clearUseNum(): void {
            this._useNum--;
            // console.log("-减少引用计数：",this._useNum);
            if (this._useNum <= 0) {
                this.idleTime = ResCount.GCTime;
                // console.log("清空引用计数等待释放：",this.idleTime);
            }
        }
    }
}