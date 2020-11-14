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
    var Rectangle = Pan3d.Rectangle;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var TexItem = Pan3d.TexItem;
    var LaterOtherDiplay3dSprite = /** @class */ (function (_super) {
        __extends(LaterOtherDiplay3dSprite, _super);
        function LaterOtherDiplay3dSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LaterOtherDiplay3dSprite.prototype.setMaterialTexture = function ($material, $mp) {
            if ($mp === void 0) { $mp = null; }
            _super.prototype.setMaterialTexture.call(this, $material, $mp);
            var texVec = $material.texList;
            for (var i = 0; this.outTexture && i < texVec.length; i++) {
                if (texVec[i].texture && texVec[i].isDynamic) {
                    if (texVec[i].type != TexItem.CUBEMAP) {
                        Scene_data.context3D.setRenderTexture($material.shader, texVec[i].name, this.outTexture, texVec[i].id);
                    }
                }
            }
        };
        LaterOtherDiplay3dSprite.prototype.maketRectMaterial = function (temp) {
            var cloneMaterialTree = temp.clone();
            var $buildShader = new left.BuildMaterialShader();
            $buildShader.fragment = temp.modelShader.fragment;
            $buildShader.paramAry = temp.modelShader.paramAry;
            //需要换定点着色器
            var agalStr = "attribute vec3 v3Position;\n" +
                "attribute vec2 v2CubeTexST;\n" +
                "varying vec2 v0;\n" +
                "uniform mat4 vpMatrix3D;\n" +
                "uniform mat4 posMatrix3D;\n" +
                "uniform mat3 rotationMatrix3D;\n" +
                "varying highp vec3 vPos;\n" +
                "void main(void){\n" +
                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n" +
                "gl_Position = vec4(v3Position, 1.0);\n" +
                "vPos = v3Position;\n" +
                "} ";
            $buildShader.encode(agalStr);
            cloneMaterialTree.modelShader = $buildShader;
            this.material = cloneMaterialTree;
        };
        LaterOtherDiplay3dSprite.prototype.makeRectObjData = function () {
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            var scale = 1;
            this.objData.vertices.push(-1 * scale, -1 * scale, 0.0);
            this.objData.vertices.push(1 * scale, -1 * scale, 0.0);
            this.objData.vertices.push(1 * scale, 1 * scale, 0.0);
            this.objData.vertices.push(-1 * scale, 1 * scale, 0.0);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 2, 1);
            this.objData.indexs.push(0, 3, 2);
            this.objData.treNum = this.objData.indexs.length;
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        };
        return LaterOtherDiplay3dSprite;
    }(left.MaterialModelSprite));
    prop.LaterOtherDiplay3dSprite = LaterOtherDiplay3dSprite;
    var MeshMaterialLfetView2DUI = /** @class */ (function (_super) {
        __extends(MeshMaterialLfetView2DUI, _super);
        function MeshMaterialLfetView2DUI(value) {
            var _this = _super.call(this, value) || this;
            _this.defFileUrl = "assets/objs/ball.objs";
            return _this;
        }
        MeshMaterialLfetView2DUI.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.iconItem = [];
            for (var i = 0; i < 5; i++) {
                var tempUi = new prop.TexturePicUi(24, 24);
                this.propPanle.addBaseMeshUi(tempUi);
                this.drawUrlImgToUi(tempUi.ui, "icon/modelicon/" + (i + 1) + ".png");
                tempUi.ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
                this.iconItem.push(tempUi);
            }
        };
        MeshMaterialLfetView2DUI.prototype.butClik = function (evt) {
            _super.prototype.butClik.call(this, evt);
            for (var i = 0; i < this.iconItem.length; i++) {
                if (this.iconItem[i].ui == evt.target) {
                    switch (i) {
                        case 0:
                            this.setObjUrlToSprite("assets/objs/box.objs");
                            break;
                        case 1:
                            this.setObjUrlToSprite("assets/objs/cylinder.objs");
                            break;
                        case 2:
                            this.setObjUrlToSprite("assets/objs/plant.objs");
                            break;
                        case 3:
                            this.setObjUrlToSprite("assets/objs/ball.objs");
                            break;
                        case 4:
                            this.setObjUrlToSprite("assets/objs/tuzhi.objs");
                            break;
                        default:
                            break;
                    }
                }
            }
        };
        Object.defineProperty(MeshMaterialLfetView2DUI.prototype, "x", {
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 100000;
                this.texturePicUi.x = this._x + 10;
                this.textureUrlText.x = this._x + 10000;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        MeshMaterialLfetView2DUI.prototype.resize = function () {
            if (this._width && this.texturePicUi) {
                //this._x = (this._width - 200) / 2;
                //this.texturePicUi.x = this._x;
                //this.texturePicUi.y = this._y + 5
                this._height = this._width;
                var showSize = this._width - 2;
                this.texturePicUi.ui.width = showSize;
                this.texturePicUi.ui.height = showSize;
                this._x = (this._width - showSize) / 2;
                this.texturePicUi.x = this._x + 0;
                this.texturePicUi.y = this._y + 0;
                for (var i = 0; i < this.iconItem.length; i++) {
                    this.iconItem[i].x = this._x + 3 + 30 * i;
                    this.iconItem[i].y = this._y + 2;
                }
            }
            this.destory;
        };
        MeshMaterialLfetView2DUI.prototype.destory = function () {
            while (this.iconItem.length) {
                var tempUi = this.iconItem.pop();
                tempUi.destory();
            }
            _super.prototype.destory.call(this);
        };
        MeshMaterialLfetView2DUI.prototype.texturePicUiChange = function ($evt) {
            var temp = this.target[this.FunKey];
            temp.showurl = this.texturePicUi.url;
            this.refrishShowMaterialModel(temp);
        };
        MeshMaterialLfetView2DUI.prototype.refrishShowMaterialModel = function (material) {
            var _this = this;
            var fileUrl = material.showurl;
            if (!fileUrl) {
                fileUrl = this.defFileUrl;
            }
            var tempArr = fileUrl.split(".");
            var stuffstr = tempArr[tempArr.length - 1];
            switch (stuffstr) {
                case "prefab":
                    pack.PackPrefabManager.getInstance().getPrefabByUrl(fileUrl, function (prefabStaticMesh) {
                        _this.setObjUrlToSprite(prefabStaticMesh.objsurl);
                    });
                    break;
                case "objs":
                    this.setObjUrlToSprite(fileUrl);
                    break;
                default:
                    console.log("没有处理的类型", stuffstr);
                    this.setZzwUrlToRole(fileUrl);
                    break;
            }
        };
        MeshMaterialLfetView2DUI.prototype.initScene = function () {
            _super.prototype.initScene.call(this);
            this.latersceneManager = new maineditor.EdItorSceneManager();
            this.latersceneManager.ready = true;
            this.latersceneManager.cam3D.cavanRect = new Rectangle(0, 0, 256, 256);
            this.ktvSprite = new LaterOtherDiplay3dSprite();
            this.latersceneManager.addDisplay(this.ktvSprite);
        };
        MeshMaterialLfetView2DUI.prototype.setZzwUrlToRole = function (zzwUrl) {
            var _this = this;
            if (!this.roleSprite) {
                this.roleSprite = new left.MaterialRoleSprite();
                this.sceneManager.addMovieDisplay(this.roleSprite);
            }
            pack.PackRoleManager.getInstance().getRoleZzwByUrl(zzwUrl, function (value) {
                _this.roleSprite.animDic = value.animDic;
                _this.roleSprite.skinMesh = value.skinMesh.clone();
                var temp = _this.target[_this.FunKey];
                for (var i = 0; i < _this.roleSprite.skinMesh.meshAry.length; i++) {
                    _this.roleSprite.skinMesh.meshAry[i].material = temp;
                    _this.roleSprite.skinMesh.meshAry[i].materialParam = null;
                }
                _this.roleSprite.curentAction = "walk";
                _this.roleSprite.sceneVisible = true;
                if (_this.modelSprite) {
                    _this.modelSprite.sceneVisible = false;
                }
            });
        };
        MeshMaterialLfetView2DUI.prototype.oneByFrame = function () {
            if (this.texturePicUi && this.texturePicUi.textureContext && this.texturePicUi.textureContext.hasStage) {
                var $uiRender = this.texturePicUi.textureContext.ui.uiRender;
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                this.sceneManager.renderToTexture();
                $uiRender.uiAtlas.textureRes.texture = this.sceneManager.fbo.texture;
                if (this.ktvSprite.material) { //如果有后期材质，
                    this.ktvSprite.outTexture = this.sceneManager.fbo.texture;
                    this.latersceneManager.renderToTexture();
                    $uiRender.uiAtlas.textureRes.texture = this.latersceneManager.fbo.texture;
                    this.latersceneManager.cam3D.cavanRect = this.sceneManager.cam3D.cavanRect.clone();
                }
                var maxNum = Math.min(this.texturePicUi.textureContext.ui.width, this.texturePicUi.textureContext.ui.height);
                this.sceneManager.cam3D.cavanRect = new Rectangle(0, 0, maxNum, maxNum);
            }
        };
        Object.defineProperty(MeshMaterialLfetView2DUI.prototype, "width", {
            set: function (value) {
                this._width = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        MeshMaterialLfetView2DUI.prototype.setObjUrlToSprite = function (objurl) {
            var _this = this;
            if (!this.modelSprite) {
                this.modelSprite = new left.MaterialModelSprite();
                this.sceneManager.addDisplay(this.modelSprite);
            }
            this.lastObjUrl = objurl;
            pack.PackObjDataManager.getInstance().getObjDataByUrl(objurl, function (value) {
                console.log("更新模型", objurl);
                if (!_this.modelSprite.objData || _this.lastObjUrl == objurl) {
                    _this.modelSprite.objData = value;
                    _this.modelSprite.scale = 10 / _this.modelSprite.objData.getMaxSize();
                }
                _this.modelSprite.sceneVisible = true;
                if (_this.roleSprite) {
                    _this.roleSprite.sceneVisible = false;
                }
            });
        };
        MeshMaterialLfetView2DUI.prototype.refreshViewValue = function () {
            var _this = this;
            var temp = this.target[this.FunKey];
            this.texturePicUi.url = "icon/base.jpg";
            this.setObjUrlToSprite(this.defFileUrl); //选给默认对象
            this.modelSprite.material = temp;
            this.refrishShowMaterialModel(temp);
            if (temp.laterTextureurl) {
                pack.PackMaterialManager.getInstance().getMaterialByUrl(temp.laterTextureurl, function ($laterTexture) {
                    _this.ktvSprite.makeRectObjData();
                    _this.ktvSprite.maketRectMaterial($laterTexture);
                });
            }
            else {
                this.ktvSprite.material = null;
            }
        };
        return MeshMaterialLfetView2DUI;
    }(prop.MeshSceneView2DUI));
    prop.MeshMaterialLfetView2DUI = MeshMaterialLfetView2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=MeshMaterialLfetView2DUI.js.map