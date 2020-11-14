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
var Pan3d;
(function (Pan3d) {
    var UIConatiner = /** @class */ (function () {
        function UIConatiner() {
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            this._left = 0;
            this._right = 0;
            this._center = 0;
            this._xType = 0;
            this._top = 0;
            this._bottom = 0;
            this._middle = 0;
            this._yType = 0;
            this._list = new Array;
            this.renderList = new Array;
            this._hasStage = false;
            this._hasLoad = false;
            this._isLoading = false;
            this._needShowLoading = true;
            this._interfaceUI = false;
            this._layer = 100;
            this._uiScale = 1;
        }
        Object.defineProperty(UIConatiner.prototype, "uiScale", {
            get: function () {
                return this._uiScale;
            },
            set: function (val) {
                this._uiScale = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "layer", {
            get: function () {
                return this._layer;
            },
            set: function (val) {
                this._layer = val;
                for (var i = 0; i < this.renderList.length; i++) {
                    this.renderList[i].sortnum = this._layer;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "interfaceUI", {
            get: function () {
                return this._interfaceUI;
            },
            set: function (val) {
                this._interfaceUI = val;
                if (val) {
                    this.layer = 0;
                }
                else {
                    this.layer = 100;
                }
            },
            enumerable: true,
            configurable: true
        });
        UIConatiner.prototype.load = function ($complateFun, $needShowLoading) {
            if ($needShowLoading === void 0) { $needShowLoading = true; }
            if (this._isLoading) {
                return;
            }
            this._completeFun = $complateFun;
            this._needShowLoading = $needShowLoading;
            if (this._hasLoad) {
                $complateFun();
            }
            else {
                this._isLoading = true;
                if (this._needShowLoading) {
                    Pan3d.UILoading.getInstance().show();
                }
                this.makeBaseWinUi();
            }
        };
        Object.defineProperty(UIConatiner.prototype, "hasLoad", {
            get: function () {
                return this._hasLoad;
            },
            enumerable: true,
            configurable: true
        });
        UIConatiner.prototype.makeBaseWinUi = function () {
            this.applyLoad();
        };
        UIConatiner.prototype.applyLoad = function () {
        };
        UIConatiner.prototype.applyLoadComplete = function () {
            this._isLoading = false;
            this._completeFun();
            if (this._needShowLoading) {
                Pan3d.UILoading.getInstance().hide();
            }
            this._hasLoad = true;
        };
        Object.defineProperty(UIConatiner.prototype, "hasStage", {
            get: function () {
                return this._hasStage;
            },
            set: function (val) {
                this._hasStage = val;
                if (val) {
                    this.onAdd();
                }
                else {
                    this.onRemove();
                }
            },
            enumerable: true,
            configurable: true
        });
        UIConatiner.prototype.setUiListVisibleByItem = function ($arr, $flag) {
            try {
                for (var i = 0; i < $arr.length; i++) {
                    if ($flag) {
                        if (!$arr[i].parent) {
                            this.addChild($arr[i]);
                        }
                    }
                    else {
                        if ($arr[i].parent) {
                            this.removeChild($arr[i]);
                        }
                    }
                }
            }
            catch (err) {
                //console.log("在此处理错误3");
            }
        };
        UIConatiner.prototype.onAdd = function () { };
        UIConatiner.prototype.onRemove = function () { };
        UIConatiner.prototype.addChild = function ($ui) {
            if (!$ui) {
                //console.log("ui cuo ")
                throw new Error("ui cuo");
            }
            if ($ui.parent) {
                return;
            }
            this._list.push($ui);
            $ui.parent = this;
            $ui.addStage();
            return $ui;
        };
        UIConatiner.prototype.addVirtualContainer = function ($con) {
            if (!this.virtualContainerList) {
                this.virtualContainerList = new Array;
            }
            $con.parent = this;
            this.virtualContainerList.push($con);
        };
        UIConatiner.prototype.removeVirtualContainer = function ($con) {
        };
        UIConatiner.prototype.addUIList = function ($ary, $uiRender) {
            var $arr = new Array();
            for (var i = 0; i < $ary.length; i++) {
                var ui = $uiRender.getComponent($ary[i]);
                this.addChild(ui);
                $arr.push(ui);
            }
            return $arr;
        };
        UIConatiner.prototype.getUIList = function ($ary, $uiRender) {
            var $arr = new Array();
            for (var i = 0; i < $ary.length; i++) {
                var ui = $uiRender.getComponent($ary[i]);
                $arr.push(ui);
            }
            return $arr;
        };
        /*
        *添加事件UI
        */
        UIConatiner.prototype.addEvntBut = function ($name, $uiRender) {
            var $temp = this.addChild($uiRender.getComponent($name));
            $temp.addEventListener(Pan3d.InteractiveEvent.Down, this.butClik, this);
            return $temp;
        };
        UIConatiner.prototype.addEvntButUp = function ($name, $uiRender) {
            var $temp = this.addChild($uiRender.getComponent($name));
            $temp.addEventListener(Pan3d.InteractiveEvent.Up, this.butClik, this);
            return $temp;
        };
        /*
        *移除事件UI
        */
        UIConatiner.prototype.removeEvntBut = function ($ui) {
            $ui.removeEventListener(Pan3d.InteractiveEvent.Down, this.butClik, this);
            this.removeChild($ui);
        };
        UIConatiner.prototype.butClik = function (evt) {
        };
        /*
        *设置显示层的显示列表
        */
        UIConatiner.prototype.renderSetVisibel = function ($list, value) {
            for (var i = 0; i < $list.length; i++) {
                if (value) {
                    if (!$list[i].rendering) {
                        this.addRender($list[i]);
                    }
                }
                else {
                    if ($list[i].rendering) {
                        this.removeRender($list[i]);
                    }
                }
            }
        };
        UIConatiner.prototype.removeChild = function ($ui) {
            var index = this._list.indexOf($ui);
            if (index != -1) {
                this._list.splice(index, 1);
            }
            else {
                return;
            }
            $ui.parent = null;
            $ui.removeStage();
        };
        UIConatiner.prototype.removeAll = function () {
            while (this._list.length) {
                this.removeChild(this._list[0]);
            }
            while (this._maskList.length) {
                this.removeMaks(this._maskList[0]);
            }
        };
        UIConatiner.prototype.addMask = function ($mask) {
            if (!this._maskList) {
                this._maskList = new Array;
            }
            $mask.parent = this;
            $mask.applyAbsolutePoint();
            this._maskList.push($mask);
        };
        UIConatiner.prototype.removeMaks = function ($mask) {
            if (this._maskList) {
                var index = this._maskList.indexOf($mask);
                if (index != -1) {
                    this._maskList.splice(index, 1);
                }
            }
        };
        UIConatiner.prototype.addRender = function ($uiRender) {
            var index = this.renderList.indexOf($uiRender);
            if (index != -1) {
                return;
            }
            $uiRender.container = this;
            $uiRender.sortnum = this._layer;
            this.renderList.push($uiRender);
            if (this.hasStage) {
                this.perent.addUI($uiRender);
            }
        };
        UIConatiner.prototype.addRenderAt = function ($uiRender, $idx) {
            var index = this.renderList.indexOf($uiRender);
            if (index != -1) {
                return;
            }
            $uiRender.container = this;
            $uiRender.sortnum = this._layer;
            this.renderList.splice($idx, 0, $uiRender);
            if (this.hasStage) {
                Pan3d.UIManager.getInstance().addUI($uiRender);
            }
        };
        UIConatiner.prototype.removeRender = function ($uiRender) {
            var index = this.renderList.indexOf($uiRender);
            if (index != -1) {
                this.renderList.splice(index, 1);
            }
            else {
                return;
            }
            if (this.hasStage) {
                Pan3d.UIManager.getInstance().removeUI($uiRender);
            }
        };
        Object.defineProperty(UIConatiner.prototype, "panelScale", {
            get: function () {
                return this.uiScale * Pan3d.UIData.Scale;
            },
            enumerable: true,
            configurable: true
        });
        UIConatiner.prototype.resize = function () {
            if (this._xType == 0) {
                this._x = this._left * this.panelScale;
            }
            else if (this._xType == 1) {
                this._x = Pan3d.Scene_data.stageWidth - this._right * this.panelScale - this.width * this.panelScale;
            }
            else if (this._xType == 2) {
                this._x = this._center * this.panelScale + Pan3d.Scene_data.stageWidth / 2 - this.width * this.panelScale / 2;
            }
            if (this._yType == 0) {
                this._y = this._top * this.panelScale;
            }
            else if (this._yType == 1) {
                this._y = Pan3d.Scene_data.stageHeight - this._bottom * this.panelScale - this.height * this.panelScale;
            }
            else if (this._yType == 2) {
                this._y = this._middle * this.panelScale + Pan3d.Scene_data.stageHeight / 2 - this.height * this.panelScale / 2;
            }
            this.applyChild();
            this.resizeVirtualList();
        };
        UIConatiner.prototype.resizeVirtualList = function () {
            if (!this.virtualContainerList) {
                return;
            }
            for (var i = 0; i < this.virtualContainerList.length; i++) {
                this.virtualContainerList[i].resize();
            }
        };
        Object.defineProperty(UIConatiner.prototype, "left", {
            get: function () {
                return this._left;
            },
            set: function (value) {
                this._left = value;
                this._xType = 0;
                this._x = this._left * this.panelScale;
                this.applyChild();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "right", {
            get: function () {
                return this._right;
            },
            set: function (value) {
                this._right = value;
                this._xType = 1;
                this._x = Pan3d.Scene_data.stageWidth - this._right * this.panelScale - this.width * this.panelScale;
                this.applyChild();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "center", {
            set: function (value) {
                this._center = value;
                this._xType = 2;
                this._x = this._center * this.panelScale + Pan3d.Scene_data.stageWidth / 2 - this.width * this.panelScale / 2;
                this.applyChild();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (value) {
                this._top = value;
                this._yType = 0;
                this._y = this._top * this.panelScale;
                this.applyChild();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "bottom", {
            get: function () {
                return this._bottom;
            },
            set: function (value) {
                this._bottom = value;
                this._yType = 1;
                this._y = Pan3d.Scene_data.stageHeight - this._bottom * this.panelScale - this.height * this.panelScale;
                this.applyChild();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "middle", {
            set: function (value) {
                this._middle = value;
                this._yType = 2;
                this._y = this._middle * this.panelScale + Pan3d.Scene_data.stageHeight / 2 - this.height * this.panelScale / 2;
                this.applyChild();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "width", {
            get: function () {
                if (this._width != 0) {
                    return this._width;
                }
                var num = 0;
                for (var i = 0; i < this._list.length; i++) {
                    num = Math.max(this._list[i].width);
                }
                return num;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "height", {
            get: function () {
                if (this._height != 0) {
                    return this._height;
                }
                var num = 0;
                for (var i = 0; i < this._list.length; i++) {
                    num = Math.max(this._list[i].height);
                }
                return num;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        UIConatiner.prototype.applyChild = function () {
            for (var i = 0; i < this._list.length; i++) {
                this._list[i].applyAbsolutePoint();
            }
            if (this._maskList) {
                for (var i = 0; i < this._maskList.length; i++) {
                    this._maskList[i].applyAbsolutePoint();
                }
            }
        };
        Object.defineProperty(UIConatiner.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIConatiner.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        UIConatiner.prototype.dispose = function () {
            //console.log("忘了重写disposepanel");
        };
        UIConatiner.prototype.setSizeForPanelUiCopy = function ($ui, $uiName, $uiRender) {
            var temp = $uiRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        };
        UIConatiner.prototype.makeBaseUiatlas = function (w, h) {
            var $uiAtlas = new Pan3d.UIAtlas();
            $uiAtlas.configData = [];
            var kkwA = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)));
            var kkhB = Math.pow(2, Math.ceil(Math.log(h) / Math.log(2)));
            $uiAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D(kkwA, kkhB, false);
            $uiAtlas.textureRes = Pan3d.TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx);
            $uiAtlas.configData.push($uiAtlas.getObject("temp_ui", 0, 0, w, h, kkwA, kkhB));
            return $uiAtlas;
        };
        return UIConatiner;
    }());
    Pan3d.UIConatiner = UIConatiner;
    var Dis2DUIContianerBase = /** @class */ (function (_super) {
        __extends(Dis2DUIContianerBase, _super);
        function Dis2DUIContianerBase() {
            return _super.call(this) || this;
        }
        Dis2DUIContianerBase.prototype.update = function (t) {
        };
        Dis2DUIContianerBase.prototype.clearOneTemp = function () {
        };
        return Dis2DUIContianerBase;
    }(UIConatiner));
    Pan3d.Dis2DUIContianerBase = Dis2DUIContianerBase;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIContainer.js.map