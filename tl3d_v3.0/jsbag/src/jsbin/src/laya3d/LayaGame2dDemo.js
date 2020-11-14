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
    var Vector3D = Pan3d.Vector3D;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var LayaGame2dDemo = /** @class */ (function (_super) {
        __extends(LayaGame2dDemo, _super);
        function LayaGame2dDemo(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            return _super.call(this, value, bfun) || this;
        }
        LayaGame2dDemo.prototype.initScene = function () {
            _super.prototype.initScene.call(this);
            this.addEvents();
            this.addSceneModel();
            this.bgColor = new Vector3D(0.1, 0.1, 0.1, 1);
        };
        LayaGame2dDemo.prototype.addSceneModel = function () {
            this.sceneManager.cam3D.scene2dScale = 4;
            var $baseChar = new LayaPan3D.LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100);
            $baseChar.rotationY = 180;
            this.mainChar = $baseChar;
            var rect100 = new Pan3d.Rectangle(0, 0, 200, 200);
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 4; j++) {
                    if (i == j) {
                        this.addGrouandPic("map/5/maps/" + j + "_" + i + ".jpg", new Pan3d.Rectangle(i * rect100.width, j * rect100.height, rect100.width, rect100.height));
                    }
                }
            }
        };
        LayaGame2dDemo.prototype.addFramePartice = function (v2d) {
            var pathname = "pan/atlas";
            var effictname = "10101_1";
            var info = {};
            info.timeLen = 1000;
            info.frameScale = 0.1;
            info.loop = false;
            info.isShow = true; //是否在最上层
            var combineParticle = layapan_me.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + pathname + "/", effictname, info);
            this.sceneManager.particleManager.addParticle(combineParticle);
            var v3d = this.getPos3dBy2D(v2d.x, v2d.y);
            combineParticle.x = v3d.x;
            combineParticle.y = 0;
            combineParticle.z = v3d.z;
        };
        LayaGame2dDemo.prototype.addGrouandPic = function (value, rect) {
            var tempPic = new LayaPan3D.LayaScene2dPicSprit(value);
            tempPic.set2dPos(rect.x, rect.y);
            tempPic.width = rect.width;
            tempPic.height = rect.height;
            this.sceneManager.addDisplay(tempPic);
            return tempPic;
        };
        LayaGame2dDemo.prototype.addEvents = function () {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
            this.rootpos = new Vector2D(-100, -100);
        };
        LayaGame2dDemo.prototype.upData = function () {
            _super.prototype.upData.call(this);
        };
        LayaGame2dDemo.prototype.onMouseWheel = function (e) {
            if (!this.rootpos) {
                this.rootpos = new Vector2D();
            }
            this.rootpos.x += e.delta;
            this.rootpos.y += e.delta;
            console.log(this.rootpos);
        };
        LayaGame2dDemo.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                var v2d = this.getMousePos(this.mouseX, this.mouseY);
                this.addFramePartice(v2d);
                console.log("mouseX----", this.mouseX, "mouseY", this.mouseY, "mouseDown", v2d);
                this.mainChar.set2dPos(v2d.x, v2d.y);
            }
        };
        return LayaGame2dDemo;
    }(LayaPan3D.LayaScene2D));
    LayaPan3D.LayaGame2dDemo = LayaGame2dDemo;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=LayaGame2dDemo.js.map