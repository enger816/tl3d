var scene2d_me;
(function (scene2d_me) {
    var CanvasPostionModel = /** @class */ (function () {
        function CanvasPostionModel() {
            this.lastPostionV2d = new Pan3d.Vector2D;
            this._lastMousePos = new Pan3d.Vector2D();
            this.tureMoveV2d = new Pan3d.Vector2D(0, 0);
            this.initSceneFocueEvent();
        }
        CanvasPostionModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new CanvasPostionModel();
            }
            return this._instance;
        };
        CanvasPostionModel.prototype.initSceneFocueEvent = function () {
            Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Down, this.onMouseDown, this);
            Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Up, this.onMouseUp, this);
            Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Move, this.onMouseMove, this);
        };
        CanvasPostionModel.prototype.onMouseMove = function ($evt) {
            if (this._isMouseDown) {
                this.tureMoveV2d.x = this.lastPostionV2d.x + $evt.x - this._lastMousePos.x;
                this.tureMoveV2d.y = this.lastPostionV2d.y + $evt.y - this._lastMousePos.y;
                this.resetSize();
            }
        };
        CanvasPostionModel.prototype.onMouseDown = function ($evt) {
            this._lastMousePos.x = $evt.x;
            this._lastMousePos.y = $evt.y;
            this.lastPostionV2d = new Pan3d.Vector2D(this.tureMoveV2d.x, this.tureMoveV2d.y);
            this._isMouseDown = true;
        };
        CanvasPostionModel.prototype.onMouseUp = function ($evt) {
            this._isMouseDown = false;
        };
        CanvasPostionModel.prototype.resetSize = function () {
            var $nScale = (0.25 / scene2d_me.Override2dEngine.htmlScale);
            Pan3d.Scene_data.focus3D.x = 0 + Pan3d.Scene_data.stageWidth / 2 * $nScale;
            Pan3d.Scene_data.focus3D.z = 0 - Pan3d.Scene_data.stageHeight / 2 * $nScale / (Math.sin(45 * Math.PI / 180));
            Pan3d.Scene_data.focus3D.x -= this.tureMoveV2d.x * $nScale;
            Pan3d.Scene_data.focus3D.z += this.tureMoveV2d.y * $nScale / (Math.sin(45 * Math.PI / 180));
            scene2d_me.Ground2dBaseSprite.perentpos = this.tureMoveV2d;
        };
        return CanvasPostionModel;
    }());
    scene2d_me.CanvasPostionModel = CanvasPostionModel;
})(scene2d_me || (scene2d_me = {}));
//# sourceMappingURL=CanvasPostionModel.js.map