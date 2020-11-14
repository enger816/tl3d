module Pan3d {
    export class ResManager extends ResGC {
        //private _resDic: Object;
        //private _loadDic: Object;

        //constructor() {
        //this._resDic = new Object;
        //this._loadDic = new Object;
        //}

        private static _instance: ResManager;
        public static getInstance(): ResManager {
            if (!this._instance) {
                this._instance = new ResManager();
            }
            return this._instance;
        }

        public loadRoleRes(url: string, $fun: Function, $meshBatchNum: number): void {
            //if (this._resDic[url]){
            //    $fun(this._resDic[url]);
            //    return;
            //}

            // if (this._loadDic[url]){
            //     this._loadDic[url].push($fun);
            //     return;
            // }

            // this._loadDic[url] = new Array;
            // this._loadDic[url].push($fun);

            var roleRes: RoleRes = new RoleRes();
            roleRes.meshBatchNum = $meshBatchNum;

            roleRes.load(url, () => {
                $fun(roleRes);

                // for (var i: number = 0; i < this._loadDic[url].length; i++){
                //     this._loadDic[url][i](roleRes);
                // }
                // delete this._loadDic[url];

                //this._resDic[url] = roleRes;
            });


        }

        public loadSkillRes(url: string, $fun: Function): void {
            //if (this._resDic[url]) {
            //    $fun(this._resDic[url]);
            //    return;
            //}

            // if (this._loadDic[url]) {
            //     this._loadDic[url].push($fun);
            //     return;
            // }

            // this._loadDic[url] = new Array;
            // this._loadDic[url].push($fun);

            var skillRes: SkillRes = new SkillRes();

            skillRes.load(url, () => {
                $fun(skillRes);
                // for (var i: number = 0; i < this._loadDic[url].length; i++) {
                //     this._loadDic[url][i](skillRes);
                // }
                // delete this._loadDic[url];

                //this._resDic[url] = skillRes;
            });

        }

        public loadSceneRes($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): SceneRes {
            var sceneRes: SceneRes;

            //if (this._resDic[$url]) {
            //    sceneRes = this._resDic[$url];
            //} else {

            //    this._resDic[$url] = sceneRes;
            //}

            if (this._dic[$url]) {
                sceneRes = this._dic[$url];
            } else {
                sceneRes = new SceneRes();
                this._dic[$url] = sceneRes;
            }

            sceneRes.load($url, $completeFun, $progressFun, $readDataFun);

            this.clearSceneUse(sceneRes);



            return sceneRes;
        }

        public clearSceneUse(curRes: SceneRes): void {
            for (var key in this._dic) {
                var rc: ResCount = this._dic[key];

                if (rc.useNum > 0 && rc != curRes) {
                    rc.useNum = 0;
                }

            }
            curRes.useNum = 1;
        }

        public gc(): void {
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