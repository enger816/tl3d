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
    var Disp2DBaseText = /** @class */ (function () {
        function Disp2DBaseText() {
            this.dtime = -1;
            this.time = 0;
            this.oldPos = new Pan3d.Vector2D();
        }
        Disp2DBaseText.prototype.needUpData = function ($pos) {
            if (this.oldPos.x != $pos.x || this.oldPos.y != $pos.y || Pan3d.Scene_data.cam3D.needChange) {
                this.oldPos.x = $pos.x;
                this.oldPos.y = $pos.y;
                return true;
            }
            return false;
        };
        Object.defineProperty(Disp2DBaseText.prototype, "rightTabInfoVo", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.makeData();
                this.time = 0;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Disp2DBaseText.prototype.makeData = function () {
        };
        Disp2DBaseText.prototype.update = function () {
        };
        //这需要优化矩阵不必要每次都更新
        Disp2DBaseText.prototype.Vector3DToVector2D = function ($pos) {
            var m = Pan3d.Scene_data.cam3D.cameraMatrix.clone();
            m.append(Pan3d.Scene_data.viewMatrx3D.clone());
            var p = m.transformVector($pos);
            var v2d = new Pan3d.Vector2D();
            v2d.x = ((p.x / p.w) + 1) * (Pan3d.Scene_data.stageWidth / 2) / Pan3d.UIData.Scale - this.ui.width / 2;
            v2d.y = ((-p.y / p.w) + 1) * (Pan3d.Scene_data.stageHeight / 2) / Pan3d.UIData.Scale - this.ui.height / 2;
            return v2d;
        };
        Disp2DBaseText.prototype.isEqualLastKey = function (value) {
            return false;
        };
        return Disp2DBaseText;
    }());
    Pan3d.Disp2DBaseText = Disp2DBaseText;
    //用于显示同屏2D容器，
    var Dis2DUIContianerPanel = /** @class */ (function (_super) {
        __extends(Dis2DUIContianerPanel, _super);
        function Dis2DUIContianerPanel($classVo, $rect, $num) {
            var _this = _super.call(this) || this;
            _this.width = Pan3d.UIData.designWidth;
            _this.height = Pan3d.UIData.designHeight;
            _this.creatBaseRender();
            _this.addRender(_this._baseRender);
            _this.mathSize($rect, $num);
            _this.initData($classVo, $rect, $num);
            return _this;
        }
        Dis2DUIContianerPanel.prototype.creatBaseRender = function () {
            this._baseRender = new Pan3d.UIRenderComponent;
        };
        //显示单元类, 尺寸，数量
        Dis2DUIContianerPanel.prototype.initData = function ($classVo, $rect, $num) {
            this._voNum = Math.floor($num);
            this._voRect = $rect;
            var kkwA = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)));
            var kkhB = Math.pow(2, Math.ceil(Math.log($rect.x * $rect.width) / Math.log(2)));
            this._textureRect = new Pan3d.Rectangle(0, 0, kkwA, kkhB);
            this._baseRender.uiAtlas = new Pan3d.UIAtlas();
            var $uiAtlas = this._baseRender.uiAtlas;
            $uiAtlas.configData = new Array();
            $uiAtlas.ctx = Pan3d.UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            $uiAtlas.textureRes = Pan3d.TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx, 0, 1, 0);
            this.makeBaseUi($classVo);
            ;
        };
        Dis2DUIContianerPanel.prototype.mathSize = function ($rect, $num) {
            $rect.x = 0;
            $rect.y = 0;
            while ($rect.x * $rect.y < $num) {
                if ($rect.x * $rect.width > $rect.y * $rect.height) {
                    $rect.y++;
                }
                else {
                    $rect.x++;
                }
            }
        };
        //根据数量创建单元格UICompenent 并存在数组中，待需要时应用
        Dis2DUIContianerPanel.prototype.makeBaseUi = function ($classVo) {
            var $uiAtlas = this._baseRender.uiAtlas;
            this._uiItem = new Array();
            this._lostItem = new Array();
            for (var i = 0; i < this._voRect.x; i++) {
                for (var j = 0; j < this._voRect.y; j++) {
                    var $disp2DBaseText = new $classVo();
                    this._uiItem.push($disp2DBaseText);
                    $disp2DBaseText.parent = this._baseRender;
                    $disp2DBaseText.voRect = this._voRect;
                    $disp2DBaseText.textureStr = "id_" + i + "_" + j;
                    $uiAtlas.configData.push($uiAtlas.getObject($disp2DBaseText.textureStr, i * this._voRect.width, j * this._voRect.height, this._voRect.width, this._voRect.height, this._textureRect.width, this._textureRect.height));
                    $disp2DBaseText.ui = this._baseRender.creatBaseComponent($disp2DBaseText.textureStr);
                    $disp2DBaseText.ui.baseRec = this._voRect.clone();
                }
            }
        };
        //找到可用的单元 找到后赋值并添加ui到显示队列
        Dis2DUIContianerPanel.prototype.showTemp = function ($data) {
            this.clearLostItem();
            var empty;
            //找到上一个数据和现在是一样的对象.避免重复更新纹理
            for (var j = 0; j < this._uiItem.length; j++) {
                if (this._uiItem[j].rightTabInfoVo == null && this._uiItem[j].isEqualLastKey($data)) {
                    empty = this._uiItem[j];
                    break;
                }
            }
            if (!empty) {
                for (var i = 0; i < this._uiItem.length; i++) {
                    if (this._uiItem[i].rightTabInfoVo == null) {
                        empty = this._uiItem[i];
                        break;
                    }
                }
            }
            if (empty) {
                empty.rightTabInfoVo = $data;
                this.addChild(empty.ui);
            }
            else {
                this._lostItem.push($data);
            }
            return empty;
        };
        Dis2DUIContianerPanel.prototype.clearLostItem = function () {
            for (var i = (this._lostItem.length - 1); i > 0; i--) {
                if (this._lostItem[i].clear) {
                    this._lostItem.splice(i, 1);
                }
            }
        };
        Dis2DUIContianerPanel.prototype.playLost = function () {
            if (this._lostItem.length) {
                this.showTemp(this._lostItem.pop());
            }
        };
        Dis2DUIContianerPanel.prototype.clearOneTemp = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (!this._uiItem[i].rightTabInfoVo) {
                    return;
                }
            }
            this._lostItem.length = 0;
            this.clearTemp(this._uiItem[0].rightTabInfoVo);
        };
        //清理单元内的内容并需要将对象移出显示队例
        Dis2DUIContianerPanel.prototype.clearTemp = function ($data) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo == $data) {
                    this._uiItem[i].rightTabInfoVo = null;
                    this.removeChild(this._uiItem[i].ui);
                    break;
                }
            }
            this.playLost();
        };
        Dis2DUIContianerPanel.prototype.getVoByData = function (value) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo == value) {
                    return this._uiItem[i];
                }
            }
        };
        Dis2DUIContianerPanel.prototype.getVoByUi = function ($ui) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    if (this._uiItem[i].ui == $ui) {
                        return this._uiItem[i];
                    }
                }
            }
        };
        Dis2DUIContianerPanel.prototype.clearAll = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    this.clearTemp(this._uiItem[i].rightTabInfoVo);
                }
            }
        };
        Dis2DUIContianerPanel.prototype.update = function (t) {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    this._uiItem[i].update();
                }
            }
            /*
            if (this.getUiItemLen() <( this._uiItem.length-1)) {
                this.playLost()
            }
            */
        };
        Dis2DUIContianerPanel.prototype.getUiItemLen = function () {
            var $num = 0;
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    $num++;
                }
            }
            return $num;
        };
        return Dis2DUIContianerPanel;
    }(Pan3d.Dis2DUIContianerBase));
    Pan3d.Dis2DUIContianerPanel = Dis2DUIContianerPanel;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Dis2DUIContianerPanel.js.map