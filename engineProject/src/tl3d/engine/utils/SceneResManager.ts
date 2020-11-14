namespace tl3d {
    export class SceneResManager extends ResGC {

        private static _instance: SceneResManager;
        static getInstance(): SceneResManager {
            if (!this._instance) {
                this._instance = new SceneResManager();
            }
            return this._instance;
        }

        //加载场景
        public loadSceneRes($url: string, $completeFun: Function, $progressFun: Function, $readDataFun: Function): SceneRes {
            var sceneRes: SceneRes;
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

        //获取场景资源对象
        public getRes($url):SceneRes{
            return this._dic[$url];
        }

        //通过id清理引用
        public clearSceneUseById(id):void
        {
            var sceneRes: SceneRes= this._dic[id];
            if(sceneRes){
                sceneRes.clearUseNum();
            }
        }

        //清理场景使用
        private clearSceneUse(curRes: SceneRes): void {
            for (var key in this._dic) {
                var rc: SceneRes = this._dic[key];
                if (rc.useNum > 0 && rc != curRes) {
                    rc.useNum = 0;
                }
            }
            curRes.useNum = 1;
        }
    }
}