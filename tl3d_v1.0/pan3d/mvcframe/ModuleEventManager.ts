module Pan3d {
    export class ModuleEventManager {
        private static _instance: EventDispatcher = new EventDispatcher();
        public static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void {

            for (var i: number = 0; i < ary.length; i++) {
                ModuleEventManager._instance.addEventListener(ary[i].type, $fun, $thisObj);
            }

        }

        public static dispatchEvent($event: BaseEvent): void {
            ModuleEventManager._instance.dispatchEvent($event);
        }

    }
}