import { BaseEvent } from "./BaseEvent";
export declare class EventDispatcher {
    protected _eventsMap: Object;
    addEventListener(types: string, listener: Function, thisObject: any): void;
    removeEventListener(type: string, listener: Function, thisObject: any): void;
    dispatchEvent(event: BaseEvent): boolean;
}
