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
    var Rectangle = Pan3d.Rectangle;
    var Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    var ComboTwoBoxMenu = /** @class */ (function (_super) {
        __extends(ComboTwoBoxMenu, _super);
        function ComboTwoBoxMenu() {
            return _super.call(this, menutwo.LabelTxtVo, new Rectangle(0, 0, 70, 20), 20) || this;
        }
        ComboTwoBoxMenu.prototype.showComboBoxList = function ($comboxData, $comBoxFun) {
            this._comboxData = $comboxData;
            this._comBoxFun = $comBoxFun;
            this.clearAll();
            for (var i = 0; i < this._comboxData.length; i++) {
                // console.log(this._comboxData)
                var vo = new menutwo.MenuListData(String(this._comboxData[i].name), String(this._comboxData[i].type));
                this.showTempMenu(vo, i);
            }
        };
        ComboTwoBoxMenu.prototype.showTempMenu = function ($data, i) {
            var temp = _super.prototype.showTemp.call(this, $data);
            temp.ui.x = 0;
            temp.ui.y = i * 20;
            temp.ui.addEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            return temp;
        };
        ComboTwoBoxMenu.prototype.butMove = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.rightTabInfoVo) {
                var menuListData = temp.rightTabInfoVo;
                this.setColorByLevel(menuListData.level);
                menuListData.select = true;
                temp.makeData();
            }
        };
        ComboTwoBoxMenu.prototype.setColorByLevel = function (value) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var menuListData = this._uiItem[i].rightTabInfoVo;
                if (menuListData && menuListData.level == value) {
                    menuListData.select = false;
                    this._uiItem[i].makeData();
                }
            }
        };
        ComboTwoBoxMenu.prototype.clearAll = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].rightTabInfoVo) {
                    this.clearTemp(this._uiItem[i].rightTabInfoVo);
                }
            }
        };
        //清理单元内的内容并需要将对象移出显示队例
        ComboTwoBoxMenu.prototype.clearTemp = function ($data) {
            var temp = this.getVoByData($data);
            temp.ui.removeEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.removeEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            _super.prototype.clearTemp.call(this, $data);
        };
        ComboTwoBoxMenu.prototype.onMouseUp = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.rightTabInfoVo) {
                // console.log(temp.data, evt)
                this._comBoxFun(Number(temp.rightTabInfoVo.key));
                this.clearAll();
            }
        };
        return ComboTwoBoxMenu;
    }(Dis2DUIContianerPanel));
    menutwo.ComboTwoBoxMenu = ComboTwoBoxMenu;
})(menutwo || (menutwo = {}));
//# sourceMappingURL=ComboTwoBoxMenu.js.map