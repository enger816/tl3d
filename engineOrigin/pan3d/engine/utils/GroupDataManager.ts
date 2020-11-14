module Pan3d {
    export class GroupDataManager extends ResGC {
        protected _loadDic: Object = new Object;
        private static _instance: GroupDataManager;
        public static getInstance(): GroupDataManager {
            if (!this._instance) {
                this._instance = new GroupDataManager();
            }
            return this._instance;
        }

        public getGroupData($url: string, $fun: Function): void {

            if (this._dic[$url]) {
                var gr: GroupRes = this._dic[$url];
                gr.useNum++;
                $fun(gr);
                return;
            }

            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);

            var group: GroupRes = new GroupRes();
            group.load($url, () => {
                var ary: Array<Function> = this._loadDic[$url];
                for (var i: number = 0; i < ary.length; i++) {
                    var fun: Function = ary[i];
                    fun(group);
                }
                this._dic[$url] = group;
                delete this._loadDic[$url];
                group.initReg();
            })




        }

    }
}