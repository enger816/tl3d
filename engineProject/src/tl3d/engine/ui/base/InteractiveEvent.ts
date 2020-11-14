namespace tl3d {
    export class InteractiveEvent extends BaseEvent {
        static Down: string = "down";
        static Up: string = "Up";
        static Move: string = "Move";
        static PinchStart: string = "PinchStart";
        static Pinch: string = "Pinch";
        //static Click: string = "Click";
        public x: number;
        public y: number;
        public data: number;
        public roation: number;
        public target: any;
    }
}