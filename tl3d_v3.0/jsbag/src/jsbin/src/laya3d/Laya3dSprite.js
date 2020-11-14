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
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var GridLineSprite = Pan3d.GridLineSprite;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    var Camera3D = Pan3d.Camera3D;
    var Rectangle = Pan3d.Rectangle;
    var FBO = Pan3d.FBO;
    var MaterialRoleSprite = left.MaterialRoleSprite;
    var ModelSprite = maineditor.ModelSprite;
    var SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    var LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    var EdItorSceneManager = maineditor.EdItorSceneManager;
    var Laya3dSprite = /** @class */ (function (_super) {
        __extends(Laya3dSprite, _super);
        function Laya3dSprite(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this) || this;
            _this.initScene();
            Laya.loader.load(value, Laya.Handler.create(_this, function (aa) {
                _this.texture = aa;
                _this.texture.bitmap.enableMerageInAtlas = false;
                _this.texture.uv = [0, 1, 1, 1, 1, 0, 0, 0];
                _this.width = _this.texture.width;
                _this.height = _this.texture.height;
                _this.resizeRect();
                bfun && bfun();
            }));
            _this.frameLoop(1, _this, _this.upData);
            return _this;
        }
        Laya3dSprite.prototype.scale = function (scaleX, scaleY, speedMode) {
            if (speedMode === void 0) { speedMode = null; }
            var sp = _super.prototype.scale.call(this, scaleX, scaleY, speedMode);
            this.resizeRect();
            return sp;
        };
        Laya3dSprite.prototype.resizeRect = function () {
            if (this.texture) {
                var tw = this.scaleX * this.width;
                var th = this.scaleY * this.height;
                this.sceneManager.cam3D.cavanRect.width = tw;
                this.sceneManager.cam3D.cavanRect.height = th;
            }
        };
        Laya3dSprite.prototype.initScene = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new EdItorSceneManager();
            var temp = new GridLineSprite();
            this.sceneManager.addDisplay(temp);
            this.sceneManager.addDisplay(new BaseDiplay3dSprite());
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 512, 512);
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;
        };
        Object.defineProperty(Laya3dSprite.prototype, "bgColor", {
            set: function (value) {
                if (!this.sceneManager.fbo) {
                    this.sceneManager.fbo = new FBO;
                }
                this.sceneManager.fbo.color.x = value.x;
                this.sceneManager.fbo.color.y = value.y;
                this.sceneManager.fbo.color.z = value.z;
                this.sceneManager.fbo.color.w = value.w;
            },
            enumerable: true,
            configurable: true
        });
        Laya3dSprite.prototype.addDisplay = function () {
            var prefabSprite = new ModelSprite();
            prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
            prefabSprite.scale = 2;
            prefabSprite.x = -100;
            this.sceneManager.addDisplay(prefabSprite);
        };
        Laya3dSprite.prototype.addRole = function () {
            var roleSprite = new MaterialRoleSprite();
            //   roleSprite.setRoleZwwUrl("pefab/德川家康/德川家康.zzw")
            roleSprite.setRoleZwwUrl("pefab/上杉谦信/ssqx.zzw");
            // roleSprite.setRoleZwwUrl("pefab/野猪/野猪.zzw")
            roleSprite.scale = 0.5;
            roleSprite.x = 50;
            this.sceneManager.addMovieDisplay(roleSprite);
        };
        //
        Laya3dSprite.prototype.addSkillRole = function () {
            var skillsprite = new SkillSpriteDisplay();
            skillsprite.addSkillByUrl("pefab/技能/上杉谦信技能.skill");
            skillsprite.x = -30;
            this.sceneManager.addDisplay(skillsprite);
        };
        Laya3dSprite.prototype.addLyfSprite = function () {
            var lyfSprite = new LyfSpriteDisplay();
            lyfSprite.addLyfByUrl("pan/model/denglong_lyf.lyf");
            lyfSprite.y = 100;
            this.sceneManager.addDisplay(lyfSprite);
        };
        Laya3dSprite.prototype.upData = function () {
            if (this.sceneManager && this.parent) {
                if (this.sceneManager.fbo && this.texture && this.texture.bitmap) {
                    this.texture.bitmap._source = this.sceneManager.fbo.texture;
                }
                this.renderToTexture();
                Laya.BaseShader.activeShader = null;
                Laya.BaseShader.bindShader = null;
            }
        };
        Laya3dSprite.prototype.renderToTexture = function () {
            this.sceneManager.renderToTexture();
        };
        return Laya3dSprite;
    }(Laya.Image));
    LayaPan3D.Laya3dSprite = Laya3dSprite;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=Laya3dSprite.js.map