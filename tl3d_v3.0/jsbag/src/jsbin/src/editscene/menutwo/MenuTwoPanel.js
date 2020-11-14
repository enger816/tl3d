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
var menutwo;
(function (menutwo) {
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var TextureManager = Pan3d.TextureManager;
    var Rectangle = Pan3d.Rectangle;
    var Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    var MenuListData = /** @class */ (function () {
        function MenuListData($label, $key) {
            if ($key === void 0) { $key = null; }
            this.select = false;
            this.label = $label;
            this.key = $key;
        }
        return MenuListData;
    }());
    menutwo.MenuListData = MenuListData;
    var LabelTxtVo = /** @class */ (function (_super) {
        __extends(LabelTxtVo, _super);
        function LabelTxtVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LabelTxtVo.prototype.makeData = function () {
            if (this.rightTabInfoVo) {
                var $menuListData = this.rightTabInfoVo;
                var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                var colorBg = $menuListData.select ? "#6c6c6c" : "#555555";
                var colorFont = $menuListData.select ? "[ffffff]" : "[9c9c9c]";
                this.parent.uiAtlas.ctx.fillStyle = colorBg; // text color
                this.parent.uiAtlas.ctx.fillRect(0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, colorFont + $menuListData.label, 12, 5, 5, TextAlign.LEFT);
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }
        };
        return LabelTxtVo;
    }(Disp2DBaseText));
    menutwo.LabelTxtVo = LabelTxtVo;
    var MenuTwoPanel = /** @class */ (function (_super) {
        __extends(MenuTwoPanel, _super);
        function MenuTwoPanel() {
            var _this = _super.call(this, LabelTxtVo, new Rectangle(0, 0, 70, 20), 50) || this;
            _this.skipNum = 0;
            return _this;
        }
        MenuTwoPanel.prototype.initMenuData = function (value) {
            for (var $key in value.info) {
                this[$key] = value.info[$key];
            }
            this.menuXmlItem = value.menuXmlItem;
            meshFunSon(this.menuXmlItem, 0);
            function meshFunSon(subMenu, level) {
                for (var i = 0; subMenu && i < subMenu.length; i++) {
                    subMenu[i].level = level;
                    meshFunSon(subMenu[i].subMenu, level + 1);
                }
            }
        };
        MenuTwoPanel.prototype.showMainUi = function () {
            this.clearAll();
            Pan3d.Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            this.showSon(this.menuXmlItem, 0);
        };
        MenuTwoPanel.prototype.onStageMouseUp = function (evt) {
            this.clearAll();
        };
        MenuTwoPanel.prototype.showTempMenu = function ($data, i, ty) {
            var temp = _super.prototype.showTemp.call(this, $data);
            temp.ui.x = $data.level * 70;
            temp.ui.y = i * 20 + ty;
            temp.ui.addEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.addEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            return temp;
        };
        //清理单元内的内容并需要将对象移出显示队例
        MenuTwoPanel.prototype.clearTemp = function ($data) {
            var temp = this.getVoByData($data);
            temp.ui.removeEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.removeEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            _super.prototype.clearTemp.call(this, $data);
        };
        MenuTwoPanel.prototype.setColorByLevel = function (value) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var menuListData = this._uiItem[i].rightTabInfoVo;
                if (menuListData && menuListData.level == value) {
                    menuListData.select = false;
                    this._uiItem[i].makeData();
                }
            }
        };
        MenuTwoPanel.prototype.removeOtherSonMenu = function (level) {
            for (var i = this._uiItem.length - 1; i >= 0; i--) {
                var $menuListData = this._uiItem[i].rightTabInfoVo;
                if ($menuListData && $menuListData.level > level) {
                    this.clearTemp($menuListData);
                }
            }
        };
        MenuTwoPanel.prototype.butMove = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.rightTabInfoVo) {
                var menuListData = temp.rightTabInfoVo;
                this.setColorByLevel(menuListData.level);
                this.removeOtherSonMenu(menuListData.level);
                menuListData.select = true;
                temp.makeData();
                this.showSon(menuListData.subMenu, temp.ui.y);
            }
        };
        MenuTwoPanel.prototype.onMouseUp = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.rightTabInfoVo) {
                this.bfun(temp.rightTabInfoVo, evt);
                this.clearAll();
            }
        };
        MenuTwoPanel.prototype.showSon = function (subMenu, ty) {
            for (var i = 0; subMenu && i < subMenu.length; i++) {
                var labelTxtVo = this.getVoByData(subMenu[i]);
                if (!labelTxtVo) {
                    this.showTempMenu(subMenu[i], i, ty);
                }
            }
        };
        return MenuTwoPanel;
    }(Dis2DUIContianerPanel));
    menutwo.MenuTwoPanel = MenuTwoPanel;
})(menutwo || (menutwo = {}));
//# sourceMappingURL=MenuTwoPanel.js.map