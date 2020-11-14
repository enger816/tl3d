import { EventDispatcher } from "./EventDispatcher";
export declare class BaseEvent {
    type: string;
    target: EventDispatcher;
    constructor($type: string);
    static COMPLETE: string;
}
