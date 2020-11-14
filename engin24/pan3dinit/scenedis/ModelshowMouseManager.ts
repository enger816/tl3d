import {Vector2D} from "../../pan3d/engine/math/Vector2D"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {MouseType} from "../../pan3d/engine/utils/KeyControl"
import {InteractiveEvent} from "../../pan3d/engine/ui/base/InteractiveEvent"
import {UIManager} from "../../pan3d/engine/ui/UIManager"




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
            if (Scene_data.isPc) {
                document.addEventListener(MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
            } else {
                document.addEventListener(MouseType.TouchMove, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
                document.addEventListener(MouseType.TouchEnd, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
                document.addEventListener(MouseType.TouchStart, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
            }

        }



        public onMouseWheel($evt: MouseWheelEvent): void {

        }
        private onMouse($e: MouseEvent): void {
            var evt: InteractiveEvent;
            var point: Vector2D = new Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type ==  MouseType.MouseDown) {
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                } else if ($e.type == MouseType.MouseUp) {
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                } else if ($e.type == MouseType.MouseMove) {
                    evt = new InteractiveEvent(InteractiveEvent.Move);
                } else if ($e.type == MouseType.MouseClick) {

                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            this.makeMouseEvent(evt, point);
        }
        private mouseToEvent($touchEvent: TouchEvent): void {
            var evt: InteractiveEvent;
            var point: Vector2D = new Vector2D();
            if ($touchEvent.type == MouseType.TouchStart) {
                evt = new InteractiveEvent(InteractiveEvent.Down);
            } else if ($touchEvent.type ==  MouseType.TouchEnd) {
                evt = new InteractiveEvent(InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            } else if ($touchEvent.type == MouseType.TouchMove) {
                evt = new InteractiveEvent(InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);
        }
        private makeMouseEvent(evt: InteractiveEvent, point: Vector2D): void {
            var temp: boolean = UIManager.getInstance().mouseEvetData(evt, point);

            if (!temp) {
                if (evt.type == InteractiveEvent.Up) {

                    this.clikSceneGround(point)

                }

            }

        }

        private clikSceneGround($pos: Vector2D): void {



        }
        public walkPathComplete(): void {


        }





    }

