module Pan3d {
    export class ResGC {
        public _dic: Object;

        public constructor() {
            this._dic = new Object();
            TimeUtil.addTimeTick(60000, () => { this.gc(); });
        }

        public gc(): void {
            //var a:number = 1;
            for (var key in this._dic) {
                var rc: ResCount = this._dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;

                    if (rc.idleTime >= ResCount.GCTime) {
                        //console.log("清理 -" + key);
                        rc.destory();
                        delete this._dic[key];
                    }

                }
            }
        }

    }
}