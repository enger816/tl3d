namespace tl3d {
    export class BaseEvent {
        public type: string;
        public target: EventDispatcher;

        public constructor($type: string) {
            this.type = $type;
        }

        static COMPLETE: string = "complete";
    }
}