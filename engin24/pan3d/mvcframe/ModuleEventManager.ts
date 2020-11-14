import {EventDispatcher} from "../engine/events/EventDispatcher"
import {BaseEvent} from "../engine/events/Event"

    export class ModuleEventManager {
        private static _instance: EventDispatcher = new EventDispatcher();
        public static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void {

            for (let i: number = 0; i < ary.length; i++) {
                ModuleEventManager._instance.addEventListener(ary[i].type, $fun, $thisObj);
            }

        }

        public static dispatchEvent($event: BaseEvent): void {
            ModuleEventManager._instance.dispatchEvent($event);
        }

        public static addEvent(type: string, listener: Function, thisObject: any):void {
            ModuleEventManager._instance.addEventListener(type, listener, thisObject);
        }

        public static removeEvent(type: string, listener: Function, thisObject: any):void {
            ModuleEventManager._instance.removeEventListener(type,listener,thisObject);
        }

        public static removeEventByName(type: string):void {
            ModuleEventManager._instance.removeEventListenerByName(type);
        }

        public static removeEventByNameAndTarget(type: string, thisObject: any):void {
            ModuleEventManager._instance.removeEventListenerByNameAndTarget(type,thisObject);
        }
        
        public static removeEventByTarget(thisObject: any):void {
            ModuleEventManager._instance.removeEventListenerByTarget(thisObject);
        }
    }
