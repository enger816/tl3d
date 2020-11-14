module Pan3d {
    export class UIStage extends EventDispatcher {

        public interactiveEvent(e: InteractiveEvent): boolean {
            var evtType: string = e.type;

            var eventMap: Object = this._eventsMap;
            if (!eventMap) {
                return false;
            }

            var list: Array<any> = eventMap[evtType];
            if (!list) {
                return false;
            }

            var length: number = list.length;
            if (length == 0) {
                return false;
            }

            //for (var i: number = 0; i < length; i++) {
            //    var eventBin: any = list[i];
            //    eventBin.listener.call(eventBin.thisObject, e);
            //}

            for (var i: number = length - 1; i >= 0; i--) {
                var eventBin: any = list[i];
                eventBin.listener.call(eventBin.thisObject, e);
            }
            return true;
        }

    }
}