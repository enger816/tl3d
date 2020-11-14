module Pan3d {
    export class Processor {

        public constructor() {

        }

        public getName(): string {
            throw new Error("process必须复写命名");
            //return "";
        }

        /**
        * 解析事件，之后交给处理函数
        * @param $notification
        */
        protected receivedModuleEvent($event: BaseEvent): void {

        }

        /**
        * 监听的事件类的集合
        * 请注意：返回为事件的CLASS(这些CLASS必须继承自ModuleEvent)的数组
        * @return 
        * 
        */
        protected listenModuleEvents(): Array<BaseEvent> {
            return null;
        }

        public registerEvents(): void {
            //注册消息监听
            var meClassArr: Array<BaseEvent> = this.listenModuleEvents();
            if (meClassArr != null && meClassArr.length > 0) {
                ModuleEventManager.addEvents(meClassArr, this.receivedModuleEvent, this);
            }
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            return obj;
        }


    }
}