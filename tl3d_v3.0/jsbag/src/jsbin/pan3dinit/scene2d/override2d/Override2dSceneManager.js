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
var scene2d_me;
(function (scene2d_me) {
    var Override2dSceneManager = /** @class */ (function (_super) {
        __extends(Override2dSceneManager, _super);
        function Override2dSceneManager() {
            return _super.call(this) || this;
        }
        Override2dSceneManager.initConfig = function () {
            Pan3d.SceneManager._instance = new Override2dSceneManager;
        };
        Override2dSceneManager.prototype.update = function () {
            Pan3d.MathClass.getCamView(Pan3d.Scene_data.cam3D, Pan3d.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Pan3d.Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = Pan3d.TimeUtil.getTimer();
            }
            scene2d_me.GroundModel.getInstance().update();
            this.updateMovieFrame();
            if (this._ready) {
                Pan3d.ParticleManager.getInstance().updateTime();
                Pan3d.SkillManager.getInstance().update();
                if (this.render) {
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                    Pan3d.ParticleManager.getInstance().update();
                    Pan3d.BloodManager.getInstance().update();
                    Pan3d.Scene_data.context3D.setBlendParticleFactors(0);
                    Pan3d.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.Scene_data.context3D.setWriteDepth(false);
                }
                Pan3d.Scene_data.context3D.setDepthTest(false);
                Pan3d.UIManager.getInstance().update();
            }
        };
        return Override2dSceneManager;
    }(scene3d_me.OverrideSceneManager));
    scene2d_me.Override2dSceneManager = Override2dSceneManager;
})(scene2d_me || (scene2d_me = {}));
//# sourceMappingURL=Override2dSceneManager.js.map