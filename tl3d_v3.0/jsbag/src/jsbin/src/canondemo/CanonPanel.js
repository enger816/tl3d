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
var CanonPanel = /** @class */ (function (_super) {
    __extends(CanonPanel, _super);
    function CanonPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new Laya.Sprite();
        _this.addChild(_this.ape);
        _this.ape.pos(0, 0);
        _this.layaSceneLevel = new ShadowLaya3dSprite();
        _this.layaSceneLevel.camDistance = 350;
        _this.layaSceneLevel.camRotationY = 0;
        _this.layaSceneLevel.camAotuMove = false;
        _this.addChild(_this.layaSceneLevel);
        _this.layaSceneLevel.addMaskUi(mainpan3d.canvas.width, mainpan3d.canvas.height);
        Pan3d.Scene_data.supportBlob = false;
        GunqiuModel.initData(_this);
        var $gameBgSprite = new bet.GameBgSprite();
        $gameBgSprite._scene = _this.layaSceneLevel.scene;
        _this.layaSceneLevel.scene.addDisplay($gameBgSprite);
        _this.initModel();
        _this.addEvents();
        Pan3d.UIManager.getInstance().addUIContainer(uiview.TopMenuView.getInstance());
        return _this;
    }
    CanonPanel.prototype.initModel = function () {
        this.modelRotation = new Pan3d.Vector3D();
        this.lastRotation = new Pan3d.Vector3D();
        this._cannoSceneManager = new canonkey.CannoSceneManager(this.layaSceneLevel.scene);
        CanonModelCheckpoint.getInstance()._scene = this.layaSceneLevel.scene;
        CanonModelCheckpoint.getInstance().initScene(this._cannoSceneManager);
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        CanonModelCheckpoint.getInstance().initXmlModel(this.getFristLevelNum(), this);
    };
    CanonPanel.prototype.getFristLevelNum = function () {
        if (getUrlParam("id")) {
            return Number(getUrlParam("id"));
        }
        else {
            return 98001;
        }
    };
    CanonPanel.prototype.addEvents = function () {
        Laya.stage.on(Pan3d.MouseType.MouseDown, this, this.onMouseDown);
        Laya.stage.on(Pan3d.MouseType.MouseUp, this, this.onMouseUp);
        Laya.stage.on(Pan3d.MouseType.MouseMove, this, this.onMouseMove);
        Laya.stage.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
    };
    CanonPanel.prototype.onMouseDown = function (e) {
        this.show_log_txt("onMouseDown");
        this.mouseDownPosint = new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY);
        this.lastRotation.x = this.modelRotation.x;
        this.lastRotation.y = this.modelRotation.y;
        this.lastRotation.z = this.modelRotation.z;
        Pan3d.UIManager.getInstance().mouseEvetData(new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down), new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY));
    };
    CanonPanel.prototype.onMouseUp = function (e) {
        this.mouseDownPosint = null;
        this.show_log_txt("onMouseUp");
    };
    CanonPanel.prototype.compassChangeFun = function (value) {
    };
    CanonPanel.prototype.show_log_txt = function (value) {
        uiview.TopMenuView.getInstance().show_log_txt(value);
    };
    CanonPanel.prototype.onAccelerometerChange = function (value) {
        this.show_log_txt("x:" + Math.floor(value.x * 100) / 100 + "y:" + Math.floor(value.y * 100) / 100 + "z:" + Math.floor(value.z * 100) / 100);
        this.modelRotation.x = this.modelRotation.x + (value.x * 50 - this.modelRotation.x) / 5;
        this.modelRotation.z = this.modelRotation.z + ((value.z + 0.45) * 50 - this.modelRotation.z) / 5;
        var $maxRoation45 = 40;
        this.modelRotation.x = Math.min($maxRoation45, Math.max(this.modelRotation.x, -$maxRoation45));
        this.modelRotation.z = Math.min($maxRoation45, Math.max(this.modelRotation.z, -$maxRoation45));
        if (!canonkey.AotuGravityManager.getInstance().isAotuTrue) {
            var bindMatrix3D = new Pan3d.Matrix3D;
            bindMatrix3D.appendRotation(this.modelRotation.z, Pan3d.Vector3D.X_AXIS);
            bindMatrix3D.appendRotation(this.modelRotation.x, Pan3d.Vector3D.Z_AXIS);
            var ddd = bindMatrix3D.transformVector(new Pan3d.Vector3D(0, -canonkey.Physics.gravity980, 0));
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(ddd);
        }
        this.layaSceneLevel.camRotationX = -35 - this.modelRotation.z;
        this.layaSceneLevel.camRotationZ = -this.modelRotation.x;
    };
    CanonPanel.prototype.onMouseMove = function (e) {
        if (this.mouseDownPosint) {
            this.show_log_txt("mouseMove");
            var $k = new Pan3d.Vector2D(Laya.stage.mouseX, Laya.stage.mouseY);
            $k = $k.subtract(this.mouseDownPosint);
            this.modelRotation.x = this.lastRotation.x + $k.x / 15;
            this.modelRotation.z = this.lastRotation.z + $k.y / 15;
            var $maxRoation45 = 40;
            this.modelRotation.x = Math.min($maxRoation45, Math.max(this.modelRotation.x, -$maxRoation45));
            this.modelRotation.z = Math.min($maxRoation45, Math.max(this.modelRotation.z, -$maxRoation45));
            if (!canonkey.AotuGravityManager.getInstance().isAotuTrue) {
                var bindMatrix3D = new Pan3d.Matrix3D;
                bindMatrix3D.appendRotation(this.modelRotation.z, Pan3d.Vector3D.X_AXIS);
                bindMatrix3D.appendRotation(this.modelRotation.x, Pan3d.Vector3D.Z_AXIS);
                var ddd = bindMatrix3D.transformVector(new Pan3d.Vector3D(0, -canonkey.Physics.gravity980, 0));
                canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(ddd);
            }
            this.layaSceneLevel.camRotationX = -35 - this.modelRotation.z;
            this.layaSceneLevel.camRotationZ = -this.modelRotation.x;
        }
    };
    CanonPanel.prototype.onMouseWheel = function (e) {
        this.layaSceneLevel.camDistance += e.delta;
    };
    CanonPanel.prototype.addGridLineSprite = function () {
        Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
        var $GridLineSprite = new Pan3d.GridLineSprite();
        this.layaSceneLevel.scene.addDisplay($GridLineSprite);
    };
    CanonPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
        this.layaSceneLevel.focus3d.x = CanonModelCheckpoint.getInstance().centenBall.x;
        this.layaSceneLevel.focus3d.y = CanonModelCheckpoint.getInstance().centenBall.y;
        this.layaSceneLevel.focus3d.z = CanonModelCheckpoint.getInstance().centenBall.z;
        if (canonkey.Physics.ready) {
            CannoSoundManager.getInstance().updata();
            if (CanonModelCheckpoint.getInstance().centenBall.y < -3000 && canonkey.Physics.ready) {
                this.modelRotation.x = 0;
                this.modelRotation.z = 0;
                this.layaSceneLevel.camRotationX = -35 - this.modelRotation.z;
                this.layaSceneLevel.camRotationZ = -this.modelRotation.x;
                canonkey.Physics.ready = false;
                uiview.TopMenuView.getInstance().showLevelLost();
            }
            canonkey.Physics.update();
            canonkey.AotuGravityManager.getInstance().upFrame(CanonModelCheckpoint.getInstance().centenBall);
        }
    };
    return CanonPanel;
}(Laya.Sprite));
//# sourceMappingURL=CanonPanel.js.map