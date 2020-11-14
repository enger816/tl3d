namespace tl3d {
    export class EventDispatcher {

        protected _eventsMap: Object = null;

        public addEventListener(types: string, listener: Function, thisObject: any): void {
            if (!this._eventsMap) {
                this._eventsMap = new Object;
            }

            let list: Array<any> = this._eventsMap[types];
            if (!list) {
                list = this._eventsMap[types] = [];
            }

            let eventBin: any = { listener: listener, thisObject: thisObject };

            for (let i: number = 0; i < list.length; i++) {
                let bin: any = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject) {
                    return;
                }
            }

            list.push(eventBin);

        }

        //是否存在监听
        public hasEventListener(type: string):boolean{
            return this._eventsMap&&this._eventsMap[type]!=null;
        }

        public removeEventListener(type: string, listener: Function, thisObject: any): void {
            if (this._eventsMap == null) {
                return;
            }
            let list: Array<any> = this._eventsMap[type];
            for (let i: number = 0; list && i < list.length; i++) {
                let bin: any = list[i];
                if (bin.listener == listener && bin.thisObject == thisObject) {
                    list.splice(i, 1);
                    return;
                }
            }
        }

        public removeEventListenerByName(type: string): void {
            if (this._eventsMap == null) {
                return;
            }
            let list: Array<any> = this._eventsMap[type];
            if(list){
                list.length = 0;
            }
        }

        public removeEventListenerByTarget(thisObject: any): void {
            if (this._eventsMap == null) {
                return;
            }
            for(let type in this._eventsMap) {
                let list: Array<any> = this._eventsMap[type];
                if(list){
                    for (let i: number = 0; list && i < list.length; i++) {
                        let bin: any = list[i];
                        if (bin.thisObject == thisObject) {
                            list.splice(i, 1);
                            return;
                        }
                    }
                }
            }
        }

        public removeEventListenerByNameAndTarget(type: string, thisObject: any): void {
            if (this._eventsMap == null) {
                return;
            }
            let list: Array<any> = this._eventsMap[type];
            if(list){
                for (let i: number = 0; list && i < list.length; i++) {
                    let bin: any = list[i];
                    if (bin.thisObject == thisObject) {
                        list.splice(i, 1);
                        return;
                    }
                }
            }
        }

        public dispatchEvent(event: BaseEvent): boolean {
            let eventMap: Object = this._eventsMap;
            if (!eventMap) {
                return true;
            }
            let list: Array<any> = eventMap[event.type];
            if (!list) {
                return true;
            }
            let length: number = list.length;
            if (length == 0) {
                return true;
            }
            event.target = this;
            let copyList = [].concat(...list);
            for (let i: number = 0; i < length; i++) {
                let eventBin: any = copyList[i];
                if(eventBin) {
                    eventBin.listener.call(eventBin.thisObject, event);
                }
            }
        }

    }
}