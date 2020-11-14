namespace tl3d {
    export class ModuleEventManager {
        private static _instance: EventDispatcher = new EventDispatcher();
        static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void {

            for (let i: number = 0; i < ary.length; i++) {
                ModuleEventManager._instance.addEventListener(ary[i].type, $fun, $thisObj);
            }

        }

        static dispatchEvent($event: BaseEvent): void {
            ModuleEventManager._instance.dispatchEvent($event);
        }

        static addEvent(type: string, listener: Function, thisObject: any):void {
            ModuleEventManager._instance.addEventListener(type, listener, thisObject);
        }

        static removeEvent(type: string, listener: Function, thisObject: any):void {
            ModuleEventManager._instance.removeEventListener(type,listener,thisObject);
        }

        static removeEventByName(type: string):void {
            ModuleEventManager._instance.removeEventListenerByName(type);
        }

        static removeEventByNameAndTarget(type: string, thisObject: any):void {
            ModuleEventManager._instance.removeEventListenerByNameAndTarget(type,thisObject);
        }
        
        static removeEventByTarget(thisObject: any):void {
            ModuleEventManager._instance.removeEventListenerByTarget(thisObject);
        }
    }
}