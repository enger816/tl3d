module scene2d {
    export  class CanvasPostionModel {
        private static _instance: CanvasPostionModel;
        public static getInstance(): CanvasPostionModel {
            if (!this._instance) {
                this._instance = new CanvasPostionModel();
            }
            return this._instance;
        }
        constructor() {
            this.tureMoveV2d = new Pan3d.Vector2D(0,0)

            this.initSceneFocueEvent()
        }

        public initSceneFocueEvent(): void {
            Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Down, this.onMouseDown, this);
            Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Up, this.onMouseUp, this);
            Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Move, this.onMouseMove, this);

        }
    

        private lastPostionV2d: Pan3d.Vector2D = new Pan3d.Vector2D;
        private _lastMousePos: Pan3d.Vector2D = new Pan3d.Vector2D();
        private _isMouseDown: boolean;
        private onMouseMove($evt: Pan3d. InteractiveEvent): void {
            if (this._isMouseDown) {
    
                this.tureMoveV2d.x = this.lastPostionV2d.x + $evt.x - this._lastMousePos.x;
                this.tureMoveV2d.y = this.lastPostionV2d.y + $evt.y - this._lastMousePos.y;
  
            
                this.resetSize()
            }
        }
        private onMouseDown($evt: Pan3d.InteractiveEvent): void {
   
            this._lastMousePos.x = $evt.x;
            this._lastMousePos.y = $evt.y;
            this.lastPostionV2d = new Pan3d.Vector2D(this.tureMoveV2d.x, this.tureMoveV2d.y)

            this._isMouseDown = true;
        }
        private onMouseUp($evt: Pan3d.InteractiveEvent): void {
            this._isMouseDown = false;
        }
        public tureMoveV2d: Pan3d.Vector2D;
        public static scene2dRotation45: number=45
        public resetSize(): void {

            var $nScale: number = (0.25 / Override2dEngine.htmlScale)

            Pan3d.Scene_data.focus3D.x = 0 + Pan3d.Scene_data.stageWidth / 2 * $nScale
            Pan3d.Scene_data.focus3D.z = 0 - Pan3d.Scene_data.stageHeight / 2 * $nScale / (Math.sin(CanvasPostionModel.scene2dRotation45 * Math.PI / 180))

            Pan3d.Scene_data.focus3D.x -= this.tureMoveV2d.x * $nScale;
            Pan3d.Scene_data.focus3D.z += this.tureMoveV2d.y * $nScale / (Math.sin(CanvasPostionModel.scene2dRotation45 * Math.PI / 180));
      
            Ground2dBaseSprite.perentpos = this.tureMoveV2d
   
        }
    }
}