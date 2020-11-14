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
    var LoadManager = Pan3d.LoadManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var RoleMesh2DUI = /** @class */ (function (_super) {
        __extends(RoleMesh2DUI, _super);
        function RoleMesh2DUI() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectMeshId = 0;
            return _this;
        }
        RoleMesh2DUI.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.textLabelUI = new prop.TextLabelUI();
            this.comboBoxUi = new prop.ComboBoxUi();
            this.deleIcon = new prop.BaseMeshUi(16, 16);
            this.md5meshUrlText = new prop.TextLabelUI(200, 16);
            this.md5meshPicUi = new prop.TexturePicUi();
            this.md5meshPicUi.suffix = "md5mesh";
            this.md5meshPicUi.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.drawInMeshUrl, this);
            this.md5searchIcon = new prop.BaseMeshUi(20, 20);
            this.textureUrlText = new prop.TextLabelUI(200, 16);
            this.texturePicUi = new prop.TexturePicUi();
            this.texturePicUi.suffix = "material";
            this.texturePicUi.addEventListener(prop.ReflectionEvet.CHANGE_DATA, this.drawInTextureUrl, this);
            this.texturesearchIcon = new prop.BaseMeshUi(20, 20);
            this.propPanle.addBaseMeshUi(this.textLabelUI);
            this.propPanle.addBaseMeshUi(this.comboBoxUi);
            this.propPanle.addBaseMeshUi(this.deleIcon);
            this.propPanle.addBaseMeshUi(this.md5meshUrlText);
            this.propPanle.addBaseMeshUi(this.md5meshPicUi);
            this.propPanle.addBaseMeshUi(this.md5searchIcon);
            this.propPanle.addBaseMeshUi(this.textureUrlText);
            this.propPanle.addBaseMeshUi(this.texturePicUi);
            this.propPanle.addBaseMeshUi(this.texturesearchIcon);
            this.drawUrlImgToUi(this.md5searchIcon.ui, "icon/search.png");
            this.drawUrlImgToUi(this.texturesearchIcon.ui, "icon/search.png");
            this.drawUrlImgToUi(this.deleIcon.ui, "icon/deleticon.png");
            this.comboBoxUi.addEventListener(InteractiveEvent.Down, this.comboBoxUiDown, this);
            this.deleIcon.ui.addEventListener(InteractiveEvent.Down, this.deleIconDown, this);
            this.height = 200;
        };
        RoleMesh2DUI.prototype.deleIconDown = function ($evt) {
            this._skinMesh.meshAry.splice(this.selectMeshId, 1);
            this.changFun();
        };
        RoleMesh2DUI.prototype.drawInTextureUrl = function () {
            var tempObj = this._skinMesh.meshAry[this.selectMeshId];
            if (tempObj) {
                console.log(tempObj);
                tempObj.materialUrl = this.texturePicUi.url;
                this.refreshViewValue();
                this.changFun();
            }
        };
        RoleMesh2DUI.prototype.drawInMeshUrl = function () {
            var _this = this;
            var meshUrl = this.md5meshPicUi.url;
            LoadManager.getInstance().load(Scene_data.fileRoot + meshUrl, LoadManager.XML_TYPE, function ($meshstr) {
                var $md5Srite = new left.LocalMd5MoveSprite();
                $md5Srite.addLocalMeshByStr($meshstr);
                var rolesprite = new left.MaterialRoleSprite();
                rolesprite.changeRoleWeb($md5Srite);
                var tempMesh = rolesprite.skinMesh.meshAry[0];
                tempMesh.materialUrl = "base.material"; //设计默认
                tempMesh.md5meshurl = meshUrl;
                pack.PackMaterialManager.getInstance().getMaterialByUrl(tempMesh.materialUrl, function ($materialTree) {
                    $materialTree.shader = $materialTree.roleShader;
                    // $materialTree.program = $materialTree.shader.program;
                    tempMesh.material = $materialTree;
                    _this._skinMesh.meshAry.push(tempMesh);
                    _this.refreshViewValue();
                });
            });
        };
        RoleMesh2DUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.comboBoxUi.destory();
            this.deleIcon.destory();
            this.md5meshUrlText.destory();
            this.md5meshPicUi.destory();
            this.md5searchIcon.destory();
            this.textureUrlText.destory();
            this.texturePicUi.destory();
            this.texturesearchIcon.destory();
            if (this._materialTreeMc) {
                this._materialTreeMc.destory();
            }
            _super.prototype.destory.call(this);
        };
        Object.defineProperty(RoleMesh2DUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.comboBoxUi.x = this._x + 75;
                this.deleIcon.x = this._x + 150;
                this.md5meshUrlText.x = this._x + 60;
                this.md5meshPicUi.x = this._x + 60;
                this.md5searchIcon.x = this._x + 150;
                this.texturePicUi.x = this._x + 60;
                this.textureUrlText.x = this._x + 60;
                this.texturesearchIcon.x = this._x + 150;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMesh2DUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y + 4;
                this.comboBoxUi.y = this._y + 6;
                this.deleIcon.y = this._y + 6;
                this.md5meshUrlText.y = this._y + 100;
                this.md5meshPicUi.y = this._y + 35;
                this.md5searchIcon.y = this._y + 40;
                this.texturePicUi.y = this._y + 35 + 110;
                this.textureUrlText.y = this._y + 105 + 110;
                this.texturesearchIcon.y = this._y + 40 + 110;
            },
            enumerable: true,
            configurable: true
        });
        RoleMesh2DUI.prototype.comboBoxUiDown = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_COMBOX_MENU);
            $rightMenuEvet.posv2d = new Vector2D(this.comboBoxUi.ui.absoluteX, this.comboBoxUi.ui.absoluteY + 20);
            var arrItem = [];
            for (var i = 0; i < this._skinMesh.meshAry.length; i++) {
                arrItem.push({ name: "mesh_" + i, type: i });
            }
            $rightMenuEvet.comboxData = arrItem;
            $rightMenuEvet.comboxFun = function (value) { _this.selectFun(value); };
            ModuleEventManager.dispatchEvent($rightMenuEvet);
        };
        RoleMesh2DUI.prototype.selectFun = function (value) {
            this.selectMeshId = value;
            this.refreshViewValue();
        };
        Object.defineProperty(RoleMesh2DUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        RoleMesh2DUI.prototype.refreshViewValue = function () {
            if (this.FunKey) {
                this._skinMesh = this.target[this.FunKey];
                this.textLabelUI.label = "部分";
                this.comboBoxUi.text = "mesh_" + this.selectMeshId;
                this.md5meshPicUi.url = "icon/txt_64x.png";
                var tempObj = this._skinMesh.meshAry[this.selectMeshId];
                if (tempObj) {
                    this.md5meshUrlText.label = tempObj.md5meshurl;
                    this.texturePicUi.url = tempObj.materialUrl;
                    this.textureUrlText.label = tempObj.materialUrl;
                    this.textureTree = tempObj.material;
                    this.showMaterialParamUi();
                }
            }
        };
        RoleMesh2DUI.prototype.paramChange = function (item) {
            var tempObj = this._skinMesh.meshAry[this.selectMeshId];
            if (tempObj) {
                tempObj.paramInfo = item;
            }
            this.changFun(item);
        };
        RoleMesh2DUI.prototype.showMaterialParamUi = function () {
            var _this = this;
            if (!this._materialTreeMc) {
                this._materialTreeMc = new prop.MaterialParamUi(prop.PropModel.getInstance().propPanle);
                this._materialTreeMc.changFun = function (value) { _this.paramChange(value); };
            }
            this._materialTreeMc.setData(this.makeTempInfo(this.textureTree));
            this._materialTreeMc.y = this._y + 240;
            this.height = 240 + this._materialTreeMc.height;
        };
        RoleMesh2DUI.prototype.getParamItem = function (value) {
            var tempObj = this._skinMesh.meshAry[this.selectMeshId];
            if (tempObj) {
                for (var i = 0; tempObj.paramInfo && i < tempObj.paramInfo.length; i++) {
                    if (tempObj.paramInfo[i].paramName == value) {
                        return tempObj.paramInfo[i].data;
                    }
                }
            }
            return null;
        };
        RoleMesh2DUI.prototype.makeTempInfo = function ($materialTree) {
            var item = [];
            for (var i = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic) {
                    var temp;
                    if ($materialTree.data[i].type == materialui.NodeTree.TEX) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.url;
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.VEC3) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue;
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.FLOAT) {
                        temp = {};
                        temp.data = $materialTree.data[i].data.constValue;
                    }
                    if (temp) {
                        temp.type = $materialTree.data[i].type;
                        temp.paramName = $materialTree.data[i].data.paramName;
                        var tempValue = this.getParamItem(temp.paramName); //如果有对象替换纹理中的
                        if (tempValue) {
                            temp.data = tempValue;
                        }
                        item.push(temp);
                    }
                }
            }
            return item;
        };
        return RoleMesh2DUI;
    }(prop.BaseReflComponent));
    prop.RoleMesh2DUI = RoleMesh2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=RoleMesh2DUI.js.map