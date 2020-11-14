import { BaseEvent } from "../engine/events/BaseEvent";
export declare class Processor {
    constructor();
    getName(): string;
    /**
    * 解析事件，之后交给处理函数
    * @param $notification
    */
    protected receivedModuleEvent($event: BaseEvent): void;
    /**
    * 监听的事件类的集合
    * 请注意：返回为事件的CLASS(这些CLASS必须继承自ModuleEvent)的数组
    * @return
    *
    */
    protected listenModuleEvents(): Array<BaseEvent>;
    registerEvents(): void;
    getHanderMap(): Object;
}
