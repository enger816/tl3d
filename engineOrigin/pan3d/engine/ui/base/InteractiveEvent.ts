module Pan3d {
    export class InteractiveEvent extends BaseEvent {
        public static Down: string = "down";
        public static Up: string = "Up";
        public static Move: string = "Move";
        public static PinchStart: string = "PinchStart";
        public static Pinch: string = "Pinch";
        //public static Click: string = "Click";
        public x: number;
        public y: number;
        public data: number;
        public roation: number;
        public target: any;
    }
}