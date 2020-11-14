module Pan3d {
    export class GuidObject extends SyncEventRecorder {

        //引用计数
        protected _ref: number = 0;

        /**
            * 增加引用计数 
            * @param r 计数变量,1/-1
            */
        public add_ref(r: number): void {
            this._ref = this._ref + r;
        }

        /**
            * 当引用计数小于等于0的时候就可以从对象表中被释放了 
            */
        public get ref(): number {
            return this._ref;
        }

        public constructor(g: string = "") {
            super();
            this.guid = g;
        }

        public getName(): string {
            return "ccav";
        }

        public getGuid(): string {
            return "991199";
        }
    }
}