var prop;
(function (prop) {
    var MetaDataView = /** @class */ (function () {
        function MetaDataView(value) {
            this.x = 0;
            this.y = 0;
            this._top = 0;
            this._width = 100;
            this._height = 100;
            this.categoryKey = {};
            this.hideCategoryKey = {};
            this.propPanle = value;
            this.creat(this.getView());
        }
        MetaDataView.prototype.getMeshInfo = function () {
            var obj = {};
            obj.class = this;
            obj.data = this.data;
            return obj;
        };
        MetaDataView.prototype.onAdd = function () {
            console.log("onRemove");
            for (var i = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].visible = true;
            }
        };
        MetaDataView.prototype.onRemove = function () {
            console.log("onRemove");
            for (var i = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].visible = false;
            }
        };
        Object.defineProperty(MetaDataView.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (value) {
                this._top = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MetaDataView.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MetaDataView.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        MetaDataView.prototype.replayUiList = function () {
            this.destory(); //复活UI
            this.creat(this.getView());
        };
        MetaDataView.prototype.getView = function () {
            var ary = [];
            return ary;
        };
        Object.defineProperty(MetaDataView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        MetaDataView.prototype.creat = function (data) {
            this.ui = new Array;
            this.categoryKey = {};
            for (var i = 0; i < data.length; i++) {
                if (data[i].Category && !this.categoryKey[data[i].Category]) {
                    if (!this.hideCategory) {
                        this.hideCategory = data[i].Category;
                    }
                    if (this.hideCategory != data[i].Category) {
                        this.categoryKey[data[i].Category] = true;
                        var tempCategory2DUI = this.getCategoryUI(data[i].Category);
                        tempCategory2DUI.data = this.hideCategoryKey[data[i].Category];
                        this.ui.push(tempCategory2DUI);
                    }
                }
                if (!Boolean(this.hideCategoryKey[data[i].Category])) {
                    var tempUi = this.creatComponent(data[i]);
                    tempUi.Category = data[i].Category;
                    this.ui.push(tempUi);
                }
            }
            this.resize();
        };
        MetaDataView.prototype.categoryClikUp = function (value) {
            this.hideCategoryKey[value] = !this.hideCategoryKey[value];
            if (this.hideCategoryKey[value]) {
                for (var i = this.ui.length - 1; i >= 0; i--) {
                    var $ui = this.ui[i];
                    if ($ui.Category == value) {
                        $ui.destory();
                        this.ui.splice(i, 1);
                    }
                }
            }
            else {
                var data = this.getView();
                var indx = this.getUiIndxByCategory(value);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Category == value) {
                        if (!Boolean(this.hideCategoryKey[data[i].Category])) {
                            var tempUi = this.creatComponent(data[i]);
                            tempUi.Category = data[i].Category;
                            this.ui.splice(indx++, 0, tempUi);
                            tempUi.refreshViewValue();
                        }
                    }
                }
            }
            this.resize();
            this.categoryFun && this.categoryFun();
        };
        MetaDataView.prototype.getUiIndxByCategory = function (value) {
            for (var i = 0; i < this.ui.length; i++) {
                var $ui = this.ui[i];
                if ($ui instanceof prop.Category2DUI) {
                    if ($ui.label == value) {
                        return i + 1;
                    }
                }
            }
            console.log("必须找到标签，显示这行说明就错。不应该到这里");
        };
        MetaDataView.prototype.resize = function () {
            var ty = this._top;
            for (var i = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].y = ty;
                this.ui[i].x = 20;
                this.ui[i].width = this.width;
                this.ui[i].resize();
                ty += this.ui[i].height;
            }
            this._height = ty - this._top;
        };
        MetaDataView.prototype.eventKey = function (value) {
        };
        MetaDataView.prototype.creatComponent = function (obj) {
            var type = obj[prop.ReflectionData.Key_Type];
            if (type == prop.ReflectionData.NumberInput) {
                return this.getNumComponent(obj);
            }
            if (type == prop.ReflectionData.AgalFunUI) {
                return this.getAgalFunComponent(obj);
            }
            if (type == prop.ReflectionData.Texturue2DUI) {
                return this.getTexturue2DUI(obj);
            }
            if (type == prop.ReflectionData.MaterialPicUi) {
                return this.getMaterialPicUi(obj);
            }
            if (type == prop.ReflectionData.RoleMesh2DUI) {
                return this.getRoleMesh2DUI(obj);
            }
            if (type == prop.ReflectionData.RoleAnim2DUI) {
                return this.getRoleAnimi2DUI(obj);
            }
            if (type == prop.ReflectionData.ComboBox) {
                return this.getComboBox(obj);
            }
            if (type == prop.ReflectionData.CheckBox) {
                return this.getCheckBox(obj);
            }
            if (type == prop.ReflectionData.Vec3Color) {
                return this.getVec3Color(obj);
            }
            if (type == prop.ReflectionData.Vec3) {
                return this.getVec3(obj);
            }
            if (type == prop.ReflectionData.Vec2) {
                return this.getVec2(obj);
            }
            if (type == prop.ReflectionData.TEXT) {
                return this.getTextField2DUI(obj);
            }
            if (type == prop.ReflectionData.MeshScene2DUI) {
                return this.getMeshScene2DUI(obj);
            }
            if (type == prop.ReflectionData.MeshMaterialLeft2DUI) {
                return this.getMeshMaterialLeft2DUI(obj);
            }
            if (type == prop.ReflectionData.MaterialFunContentUI) {
                return this.getMaterialFunContentUI(obj);
            }
            return null;
        };
        MetaDataView.prototype.getMaterialFunContentUI = function ($obj) {
            var temp = new prop.MaterialFunContentUI(this.propPanle);
            temp.label = $obj[prop.ReflectionData.Key_Label];
            temp.FunKey = $obj[prop.ReflectionData.FunKey];
            temp.target = this;
            return temp;
        };
        MetaDataView.prototype.getMeshMaterialLeft2DUI = function ($obj) {
            var temp = new prop.MeshMaterialLfetView2DUI(this.propPanle);
            temp.label = $obj[prop.ReflectionData.Key_Label];
            temp.FunKey = $obj[prop.ReflectionData.FunKey];
            temp.suffix = $obj[prop.ReflectionData.Key_Suffix];
            temp.target = this;
            return temp;
        };
        MetaDataView.prototype.getMeshScene2DUI = function ($obj) {
            var temp = new prop.MeshSceneView2DUI(this.propPanle);
            temp.label = $obj[prop.ReflectionData.Key_Label];
            temp.FunKey = $obj[prop.ReflectionData.FunKey];
            temp.target = this;
            return temp;
        };
        MetaDataView.prototype.getCategoryUI = function (value) {
            var _this = this;
            var $category2DUI = new prop.Category2DUI(this.propPanle);
            $category2DUI.label = value;
            $category2DUI.changFun = function (value) { _this.categoryClikUp(value); };
            return $category2DUI;
        };
        MetaDataView.prototype.getTextField2DUI = function ($obj) {
            var $textCtrlInput = new prop.TextField2DUI(this.propPanle);
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            $textCtrlInput.clikEvent = $obj[prop.ReflectionData.ClikEventKey];
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getVec3 = function ($obj) {
            var $textCtrlInput = new prop.Vec3dCtrlUI(this.propPanle);
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            if ($obj[prop.ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            }
            else {
                $textCtrlInput.KeyStep = 1;
            }
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getVec2 = function ($obj) {
            var $textCtrlInput = new prop.Vec2PrameCtrlUI(this.propPanle);
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            if ($obj[prop.ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            }
            else {
                $textCtrlInput.KeyStep = 1;
            }
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getVec3Color = function ($obj) {
            var $textCtrlInput = new prop.Vec3ColorCtrlUI(this.propPanle);
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            if ($obj[prop.ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            }
            else {
                $textCtrlInput.KeyStep = 0.01;
            }
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getComboBox = function ($obj) {
            var $ComBoBoxCtrl2D = new prop.ComBoBoxCtrl2D(this.propPanle);
            $ComBoBoxCtrl2D.label = $obj[prop.ReflectionData.Key_Label];
            $ComBoBoxCtrl2D.FunKey = $obj[prop.ReflectionData.FunKey];
            $ComBoBoxCtrl2D.data = $obj[prop.ReflectionData.Key_Data];
            $ComBoBoxCtrl2D.target = this;
            return $ComBoBoxCtrl2D;
        };
        MetaDataView.prototype.getCheckBox = function ($obj) {
            var $ComBoBoxCtrl2D = new prop.CheckBox2DUI(this.propPanle);
            $ComBoBoxCtrl2D.label = $obj[prop.ReflectionData.Key_Label];
            $ComBoBoxCtrl2D.FunKey = $obj[prop.ReflectionData.FunKey];
            $ComBoBoxCtrl2D.target = this;
            return $ComBoBoxCtrl2D;
        };
        MetaDataView.prototype.getTexturue2DUI = function ($obj) {
            var $texturue2DUI = new prop.Texturue2DUI(this.propPanle);
            $texturue2DUI.label = $obj[prop.ReflectionData.Key_Label];
            $texturue2DUI.suffix = $obj[prop.ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[prop.ReflectionData.FunKey];
            $texturue2DUI.target = this;
            return $texturue2DUI;
        };
        MetaDataView.prototype.getMaterialPicUi = function ($obj) {
            var $texturue2DUI = new prop.Material2DUI(this.propPanle);
            $texturue2DUI.label = $obj[prop.ReflectionData.Key_Label];
            $texturue2DUI.suffix = $obj[prop.ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[prop.ReflectionData.FunKey];
            $texturue2DUI.changFun = $obj["changFun"];
            $texturue2DUI.target = this;
            return $texturue2DUI;
        };
        MetaDataView.prototype.getRoleMesh2DUI = function ($obj) {
            var $texturue2DUI = new prop.RoleMesh2DUI(this.propPanle);
            $texturue2DUI.label = $obj[prop.ReflectionData.Key_Label];
            //   $texturue2DUI.suffix = $obj[ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[prop.ReflectionData.FunKey];
            $texturue2DUI.changFun = $obj["changFun"];
            $texturue2DUI.target = this;
            return $texturue2DUI;
        };
        MetaDataView.prototype.getRoleAnimi2DUI = function ($obj) {
            var $roleAnimi2DUI = new prop.RoleAnimi2DUI(this.propPanle);
            $roleAnimi2DUI.label = $obj[prop.ReflectionData.Key_Label];
            //   $texturue2DUI.suffix = $obj[ReflectionData.Key_Suffix];
            $roleAnimi2DUI.FunKey = $obj[prop.ReflectionData.FunKey];
            $roleAnimi2DUI.changFun = $obj["changFun"];
            $roleAnimi2DUI.target = this;
            return $roleAnimi2DUI;
        };
        MetaDataView.prototype.getNumComponent = function ($obj) {
            var $textCtrlInput = new prop.TextCtrlInput(this.propPanle);
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getAgalFunComponent = function ($obj) {
            var $textCtrlInput = new prop.AgalFunUI(this.propPanle);
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.refreshViewValue = function () {
            for (var i = 0; i < this.ui.length; i++) {
                this.ui[i].refreshViewValue();
            }
            this.resize();
        };
        MetaDataView.prototype.destory = function () {
            while (this.ui.length) {
                var $ui = this.ui.pop();
                $ui.destory();
            }
        };
        return MetaDataView;
    }());
    prop.MetaDataView = MetaDataView;
})(prop || (prop = {}));
//# sourceMappingURL=MetaDataView.js.map