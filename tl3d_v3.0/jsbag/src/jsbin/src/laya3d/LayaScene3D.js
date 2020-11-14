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
var LayaPan3D;
(function (LayaPan3D) {
    var Vector2D = Pan3d.Vector2D;
    var Object3D = Pan3d.Object3D;
    var LayaScene3D = /** @class */ (function (_super) {
        __extends(LayaScene3D, _super);
        function LayaScene3D(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this, value, bfun) || this;
            _this.addEvents();
            _this.addSceneModel();
            _this.bgColor = new Vector3D(0.2, 0.2, 0.2, 1);
            return _this;
        }
        LayaScene3D.prototype.addEvents = function () {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
            Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
        };
        LayaScene3D.prototype.addSceneModel = function () {
            this.addDisplay();
            // this.addRole();
            this.addSkillRole();
            //  this.addLyfSprite();
        };
        LayaScene3D.prototype.onMouseWheel = function (e) {
            this.sceneManager.cam3D.distance += e.delta;
        };
        LayaScene3D.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.lastMouseVec2d = new Vector2D(this.mouseX, this.mouseY);
                this.lastfocus3D = new Object3D();
                this.lastfocus3D.rotationY = this.sceneManager.focus3D.rotationY;
                this.lastfocus3D.rotationX = this.sceneManager.focus3D.rotationX;
            }
        };
        LayaScene3D.prototype.onMouseUp = function (e) {
            this.lastMouseVec2d = null;
        };
        LayaScene3D.prototype.onMouseMove = function (e) {
            if (this.lastMouseVec2d) {
                this.sceneManager.focus3D.rotationY = this.lastfocus3D.rotationY - (this.mouseX - this.lastMouseVec2d.x);
                this.sceneManager.focus3D.rotationX = this.lastfocus3D.rotationX - (this.mouseY - this.lastMouseVec2d.y) / 10;
            }
        };
        LayaScene3D.prototype.upData = function () {
            if (this.sceneManager) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        return LayaScene3D;
    }(LayaPan3D.Laya3dSprite));
    LayaPan3D.LayaScene3D = LayaScene3D;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=LayaScene3D.js.map