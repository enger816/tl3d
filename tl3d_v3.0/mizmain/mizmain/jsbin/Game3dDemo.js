var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var base;
(function (base) {
    var Vector2D = Pan3d.Vector2D;
    var Object3D = Pan3d.Object3D;
    var MouseType = Pan3d.MouseType;
    var Laya3dSprite = LayaPan3D.Laya3dSprite;
    var LayaSceneChar = layapan_me.LayaSceneChar;
    var Game3dDemo = /** @class */ (function (_super) {
        __extends(Game3dDemo, _super);
        function Game3dDemo(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            var _this = _super.call(this, w, h) || this;
            _this.addEvents();
            var $baseChar = new LayaSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            _this.sceneManager.addMovieDisplay($baseChar);
            return _this;
        }
        Game3dDemo.prototype.addEvents = function () {
            this.on(MouseType.MouseDown, this, this.onStartDrag);
            this.on(MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(MouseType.MouseMove, this, this.onMouseMove);
        };
        Game3dDemo.prototype.onMouseWheel = function (e) {
            this.sceneManager.cam3D.distance += e.delta;
        };
        Game3dDemo.prototype.onStartDrag = function (e) {
            if (this.mouseY < 30) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY);
                this.lastfocus3D = new Object3D();
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY;
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX;
            }
        };
        Game3dDemo.prototype.onMouseUp = function (e) {
            this.lastMouseVec2d = null;
        };
        Game3dDemo.prototype.onMouseMove = function (e) {
            if (this.lastMouseVec2d) {
                this.sceneManager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x);
                this.sceneManager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10;
            }
        };
        Game3dDemo.prototype.upData = function () {
            if (this.sceneManager) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        return Game3dDemo;
    }(Laya3dSprite));
    base.Game3dDemo = Game3dDemo;
})(base || (base = {}));
//# sourceMappingURL=Game3dDemo.js.map