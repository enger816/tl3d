import {Vector2D} from "../../pan3d/engine/math/Vector2D"
import {Scene_data} from "../../pan3d/engine/context/Scene_data"
import {InteractiveEvent} from "../../pan3d/engine/ui/base/InteractiveEvent"
import {MouseType} from "../../pan3d/engine/utils/KeyControl"




    export class SceneMouseEventModel {
        private static _instance: SceneMouseEventModel;
        public static getInstance(): SceneMouseEventModel {
            if (!this._instance) {
                this._instance = new SceneMouseEventModel();
            }
            return this._instance;
        }
        public constructor() {
        }
        public initSceneFocueEvent(): void {
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
        }
        public onMouseWheel($evt: MouseWheelEvent): void {
            throw "onMouseWheel notImplement";
            // Scene_data.cam3D.distance += $evt.wheelDelta / 10
        }

        private lastRotationY: number = 0;
        private lastRotationX: number = 0;


        private _lastMousePos: Vector2D = new Vector2D();
        private _isMouseDown: boolean;
        private onMouseMove($evt: InteractiveEvent): void {
            if (this._isMouseDown) {
                var $addx: number = $evt.x - this._lastMousePos.x;
                Scene_data.focus3D.rotationY = this.lastRotationY - $addx;

                var $addy: number = $evt.y - this._lastMousePos.y;
                  Scene_data.focus3D.rotationX = this.lastRotationX - $addy;
            }
        }
        private onMouseDown($evt:  InteractiveEvent): void {

            this._lastMousePos.x = $evt.x;
            this._lastMousePos.y = $evt.y;
            this.lastRotationY = Scene_data.focus3D.rotationY;
            this.lastRotationX =  Scene_data.focus3D.rotationX;
            this._isMouseDown = true;
        }
        private onMouseUp($evt: InteractiveEvent): void {
            this._isMouseDown = false;
        }
    }
