import { BaseEvent } from "../engine/events/BaseEvent";
export declare class ModuleEventManager {
    private static _instance;
    static addEvents(ary: Array<BaseEvent>, $fun: Function, $thisObj: any): void;
    static dispatchEvent($event: BaseEvent): void;
}
