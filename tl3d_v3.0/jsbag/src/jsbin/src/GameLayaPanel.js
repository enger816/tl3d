var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gamelaya;
(function (gamelaya) {
    var GameDataModel = game.GameDataModel;
    var GameLayaPanel = /** @class */ (function (_super) {
        __extends(GameLayaPanel, _super);
        function GameLayaPanel() {
            var _this = _super.call(this) || this;
            _this.ape = new Laya.Sprite();
            _this.addChild(_this.ape);
            _this.ape.pos(0, 0);
            _this.layaSceneLevel = new ShadowLaya3dSprite();
            _this.layaSceneLevel.camDistance = 350;
            _this.layaSceneLevel.camAotuMove = false;
            _this.addChild(_this.layaSceneLevel);
            _this.layaSceneLevel.addMaskUi(mainpan3d.canvas.width, mainpan3d.canvas.height);
            game.CannonGameStart.initData(_this.layaSceneLevel.scene);
            _this.addEvents();
            return _this;
        }
        GameLayaPanel.prototype.addEvents = function () {
            Laya.stage.on(Pan3d.MouseType.MouseDown, this, this.onMouseDown);
            Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        };
        GameLayaPanel.prototype.onKeyDown = function (e) {
            console.log("ee");
            if (game.GameDataModel.centenBall) {
                var $pos = new Pan3d.Vector3D(Math.floor(game.GameDataModel.centenBall.x), Math.floor(game.GameDataModel.centenBall.y), Math.floor(game.GameDataModel.centenBall.z));
                console.log("球位置", $pos);
            }
        };
        GameLayaPanel.prototype.onMouseDown = function (e) {
            this.show_log_txt("onMouseDown");
            console.log("Laya", new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
            GameDataModel.onMouseDown(new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
            Pan3d.UIManager.getInstance().mouseEvetData(new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down), new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
        };
        GameLayaPanel.prototype.onMouseUp = function (e) {
            GameDataModel.mouseDownPosint = null;
            this.show_log_txt("onMouseUp");
            Pan3d.UIManager.getInstance().mouseEvetData(new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up), new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
        };
        GameLayaPanel.prototype.onMouseMove = function (e) {
            GameDataModel.onMouseMove(new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
            this.show_log_txt("onMouseMove");
            Pan3d.UIManager.getInstance().mouseEvetData(new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move), new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
        };
        GameLayaPanel.prototype.compassChangeFun = function (value) {
        };
        GameLayaPanel.prototype.show_log_txt = function (value) {
            //var $evt: uiview.TopUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_LOG_TXT)
            //$evt.data = value
            //ModuleEventManager.dispatchEvent($evt);
        };
        GameLayaPanel.prototype.onAccelerometerChange = function (value) {
        };
        GameLayaPanel.prototype.render = function (context, x, y) {
            _super.prototype.render.call(this, context, x, y);
            this.layaSceneLevel.x = this.ape.x;
            this.layaSceneLevel.y = this.ape.y;
            game.CannonGameStart.upFrame();
            if (GameDataModel.centenBall) {
                this.layaSceneLevel.focus3d.x = GameDataModel.centenBall.x;
                this.layaSceneLevel.focus3d.y = GameDataModel.centenBall.y;
                this.layaSceneLevel.focus3d.z = GameDataModel.centenBall.z;
            }
            this.layaSceneLevel.camRotationY = GameDataModel.gameAngle;
            if (GameDataModel.modelRotation) {
                this.layaSceneLevel.camRotationX = -35 - GameDataModel.modelRotation.z;
                this.layaSceneLevel.camRotationZ = -GameDataModel.modelRotation.x;
            }
        };
        return GameLayaPanel;
    }(Laya.Sprite));
    gamelaya.GameLayaPanel = GameLayaPanel;
})(gamelaya || (gamelaya = {}));
//# sourceMappingURL=GameLayaPanel.js.map