namespace tl3d {
    export class GroupDataManager extends ResGC {
        protected _loadDic: Object = new Object;
        public scene:SceneManager;
        public constructor(scene:SceneManager){
            super();
            this.scene=scene;
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

         public perLoadData($url: string, $fun: Function) {
            if (this._dic[$url]) {
                if ($fun) {
                    $fun();
                }
                return;
            }

            if (this._loadDic[$url]) {
                this._loadDic[$url].push($fun);
                return;
            }

            this._loadDic[$url] = new Array;
            this._loadDic[$url].push($fun);

            var group: GroupRes = new GroupRes();
            group.scene = this.scene;
            group.load($url, () => {
                this._dic[$url] = group;
                delete this._loadDic[$url];
                group.initReg();
                if ($fun) {
                    $fun();
                }
            })
        }

    }
}