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
var prop;
(function (prop) {
    var Scene_data = Pan3d.Scene_data;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TimeUtil = Pan3d.TimeUtil;
    var MouseType = Pan3d.MouseType;
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var GridLineSprite = Pan3d.GridLineSprite;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Camera3D = Pan3d.Camera3D;
    var Rectangle = Pan3d.Rectangle;
    //import MaterialRoleSprite = left.MaterialRoleSprite;
    //import ModelSprite = maineditor.ModelSprite;
    //import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    //import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    //import EdItorSceneManager = maineditor.EdItorSceneManager;
    var MeshSceneView2DUI = /** @class */ (function (_super) {
        __extends(MeshSceneView2DUI, _super);
        function MeshSceneView2DUI() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.modelKey = {};
            return _this;
        }
        MeshSceneView2DUI.prototype.initView = function () {
            var _this = this;
            this.textLabelUI = new prop.TextLabelUI(64, 16);
            this.textureUrlText = new prop.TextLabelUI(200, 16);
            this.texturePicUi = new prop.TexturePicUi(128, 128);
            this.texturePicUi.haveDoubleCilk = false;
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.propPanle.addBaseMeshUi(this.textureUrlText);
            this.propPanle.addBaseMeshUi(this.texturePicUi);
            //  this.texturePicUi.textureContext.ui.isU = true
            this.texturePicUi.textureContext.ui.isV = true;
            this.texturePicUi.textureContext.ui.uiRender.applyObjData();
            // this.texturePicUi.url = "icon/base.jpg"
            this.texturePicUi.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.wheelEventFun = function ($evt) { _this.onMouseWheel($evt); };
            document.addEventListener(MouseType.MouseWheel, this.wheelEventFun);
            this.height = 220;
            this.texturePicUi.ui.width = 200;
            this.texturePicUi.ui.height = 200;
            this.texturePicUi.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.texturePicUiChange, this);
            this.initScene();
        };
        MeshSceneView2DUI.prototype.texturePicUiChange = function ($evt) {
        };
        Object.defineProperty(MeshSceneView2DUI.prototype, "suffix", {
            get: function () {
                return this._suffix;
            },
            set: function (value) {
                this._suffix = value;
                this.texturePicUi.suffix = value;
            },
            enumerable: true,
            configurable: true
        });
        MeshSceneView2DUI.prototype.onMouseWheel = function ($evt) {
            if (this.texturePicUi.ui.testPoint($evt.x, $evt.y)) {
                this.sceneManager.cam3D.distance += ($evt.wheelDelta * Scene_data.cam3D.distance) / 1000;
            }
        };
        MeshSceneView2DUI.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.texturePicUi.ui:
                    this.lastRotationY = this.sceneManager.focus3D.rotationY;
                    this.mouseDonwPos = new Vector2D(evt.x, evt.y);
                    this.addStagetMouseMove();
                    break;
                default:
                    break;
            }
        };
        MeshSceneView2DUI.prototype.addStagetMouseMove = function () {
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);
        };
        MeshSceneView2DUI.prototype.removeStagetMouseMove = function () {
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);
        };
        MeshSceneView2DUI.prototype.onStageMouseMove = function ($evt) {
            console.log("move");
            if (this.mouseDonwPos) {
                this.sceneManager.focus3D.rotationY = this.lastRotationY - ($evt.x - this.mouseDonwPos.x);
            }
        };
        MeshSceneView2DUI.prototype.onStageMouseUp = function ($evt) {
            console.log("up");
            this.removeStagetMouseMove();
        };
        MeshSceneView2DUI.prototype.initScene = function () {
            var _this = this;
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            this.sceneManager = new maineditor.EdItorSceneManager();
            this.sceneManager.addDisplay(new GridLineSprite());
            //  this.sceneManager.addDisplay(new BaseDiplay3dSprite())
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Camera3D();
            this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, 256, 256);
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationX = -45;
            this.upDataFun = function () { _this.oneByFrame(); };
            TimeUtil.addFrameTick(this.upDataFun);
        };
        MeshSceneView2DUI.prototype.oneByFrame = function () {
            if (this.texturePicUi && this.texturePicUi.textureContext && this.texturePicUi.textureContext.hasStage) {
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                this.sceneManager.renderToTexture();
                var $uiRender = this.texturePicUi.textureContext.ui.uiRender;
                $uiRender.uiAtlas.textureRes.texture = this.sceneManager.fbo.texture;
                var maxNum = Math.min(this.texturePicUi.textureContext.ui.width, this.texturePicUi.textureContext.ui.height);
                this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, maxNum, maxNum);
            }
        };
        MeshSceneView2DUI.prototype.destory = function () {
            this.texturePicUi.ui.removeEventListener(InteractiveEvent.Down, this.butClik, this);
            document.removeEventListener(MouseType.MouseWheel, this.wheelEventFun);
            this.textLabelUI.destory();
            this.textureUrlText.destory();
            this.texturePicUi.destory();
            this.texturePicUi = null;
            this.sceneManager.clearScene();
            TimeUtil.removeTimeTick(this.upDataFun);
        };
        Object.defineProperty(MeshSceneView2DUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        MeshSceneView2DUI.prototype.addUrlToView = function (value) {
            if (!this.modelKey[value]) {
                if (value.indexOf(".prefab") != -1) {
                    var prefabSprite_1 = new maineditor.ModelSprite();
                    prefabSprite_1.setPreFabUrl(value, function () {
                        prefabSprite_1.scale = 10 / prefabSprite_1.prefab.objData.getMaxSize();
                    });
                    this.sceneManager.addDisplay(prefabSprite_1);
                }
                if (value.indexOf(".zzw") != -1) {
                    var roleSprite = new left.MaterialRoleSprite();
                    roleSprite.setRoleZwwUrl(value);
                    this.sceneManager.addMovieDisplay(roleSprite);
                }
                if (value.indexOf(".skill") != -1) {
                    var skillsprite = new maineditor.SkillSpriteDisplay();
                    skillsprite.addSkillByUrl(value);
                    this.sceneManager.addDisplay(skillsprite);
                }
                if (value.indexOf(".lyf") != -1) {
                    var lyfSprite = new maineditor.LyfSpriteDisplay();
                    lyfSprite.addLyfByUrl(value);
                    this.sceneManager.addDisplay(lyfSprite);
                }
                if (value.indexOf(".objs") != -1) {
                    var objsSprite_1 = new maineditor.ModelSprite();
                    this.sceneManager.addDisplay(objsSprite_1);
                    var tempPrefab = new pack.PrefabStaticMesh();
                    tempPrefab.url = value;
                    tempPrefab.objsurl = value;
                    tempPrefab.textureurl = "assets/base/base.material";
                    objsSprite_1.prefab = tempPrefab;
                    pack.PackObjDataManager.getInstance().getObjDataByUrl(tempPrefab.objsurl, function (value) {
                        objsSprite_1.scale = 10 / value.getMaxSize();
                    });
                }
                this.modelKey[value] = true;
            }
        };
        MeshSceneView2DUI.prototype.refreshViewValue = function () {
            var $url = String(this.target[this.FunKey]);
            this.texturePicUi.url = "icon/base.jpg";
            this.addUrlToView($url);
            var $arr = $url.split("/");
            this.textureUrlText.label = $arr[$arr.length - 1];
        };
        Object.defineProperty(MeshSceneView2DUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.texturePicUi.x = this._x + 50;
                this.textureUrlText.x = this._x + 60;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MeshSceneView2DUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y;
                this.texturePicUi.y = this._y + 0;
                this.textureUrlText.y = this._y + 200;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MeshSceneView2DUI.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
                this.textLabelUI.label = value;
            },
            enumerable: true,
            configurable: true
        });
        return MeshSceneView2DUI;
    }(prop.BaseReflComponent));
    prop.MeshSceneView2DUI = MeshSceneView2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=MeshSceneView2DUI.js.map