
module scenedis {


    export class ModelshowMouseManager {
        private static _instance: ModelshowMouseManager;
        public static getInstance(): ModelshowMouseManager {
            if (!this._instance) {
                this._instance = new ModelshowMouseManager();
            }
            return this._instance;
        }
        public constructor() {
        }
        public addMouseEvent(): void {
            if (Pan3d.Scene_data.isPc) {
                document.addEventListener(Pan3d.MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(Pan3d.MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(Pan3d.MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(Pan3d.MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
            } else {
                document.addEventListener(Pan3d.MouseType.TouchMove, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
                document.addEventListener(Pan3d.MouseType.TouchEnd, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
                document.addEventListener(Pan3d.MouseType.TouchStart, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
            }

        }



        public onMouseWheel($evt: MouseWheelEvent): void {

        }
        private onMouse($e: MouseEvent): void {
            var evt: Pan3d.InteractiveEvent;
            var point: Pan3d.Vector2D = new Pan3d.Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == Pan3d. MouseType.MouseDown) {
                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
                } else if ($e.type == Pan3d.MouseType.MouseUp) {
                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
                } else if ($e.type == Pan3d.MouseType.MouseMove) {
                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
                } else if ($e.type == Pan3d.MouseType.MouseClick) {

                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            this.makeMouseEvent(evt, point);
        }
        private mouseToEvent($touchEvent: TouchEvent): void {
            var evt: Pan3d.InteractiveEvent;
            var point: Pan3d.Vector2D = new Pan3d.Vector2D();
            if ($touchEvent.type == Pan3d.MouseType.TouchStart) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
            } else if ($touchEvent.type == Pan3d. MouseType.TouchEnd) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            } else if ($touchEvent.type == Pan3d.MouseType.TouchMove) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);
        }
        private makeMouseEvent(evt: Pan3d.InteractiveEvent, point: Pan3d.Vector2D): void {
            var temp: boolean = Pan3d.UIManager.getInstance().mouseEvetData(evt, point);

            if (!temp) {
                if (evt.type == Pan3d.InteractiveEvent.Up) {

                    this.clikSceneGround(point)

                }

            }

        }

        private clikSceneGround($pos: Pan3d.Vector2D): void {



        }
        public walkPathComplete(): void {


        }





    }

}