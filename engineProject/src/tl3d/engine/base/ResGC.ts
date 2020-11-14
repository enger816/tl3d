namespace tl3d {
    export class ResGC {
        public _dic: Object;

        public constructor() {
            this._dic = new Object();
            let randTime=Util.getRandomNumAssgin(1,30000,35000)[0];
            Laya.timer.loop(randTime, this,() => { this.gc(); });
        }

        public gc(): void {
            // console.log("gc清理");
            var keys=[];
            for (var key in this._dic) {
                keys.push(key);
                var rc: ResCount = this._dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;
                    if (rc.idleTime >= ResCount.GCTime) {
                        // console.log("清理 -" + key);
                        rc.destory();
                        delete this._dic[key];
                    }
                }
            }
            // console.log("keys:",keys);
        }

    }
}