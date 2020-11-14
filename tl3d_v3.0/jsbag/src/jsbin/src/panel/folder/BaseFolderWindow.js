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
var basefolderwin;
(function (basefolderwin) {
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var BaseFolderWindow = /** @class */ (function (_super) {
        __extends(BaseFolderWindow, _super);
        function BaseFolderWindow() {
            var _this = _super.call(this) || this;
            _this.percentNum = 0.2;
            return _this;
        }
        BaseFolderWindow.prototype.setRect = function (value) {
            this.pageRect = value;
            this.setLinePos();
            this.resize();
            this.refrishWinSize();
        };
        BaseFolderWindow.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete && this.pathUrlBg) {
                this.pathUrlBg.x = this.pageRect.width * this.percentNum + 3;
                this.pathUrlBg.y = 11;
                this.pathUrlBg.height = 28;
                this.pathUrlBg.width = this.pageRect.width - this.pathUrlBg.x;
                this._baseMidRender.applyObjData();
            }
        };
        BaseFolderWindow.prototype.getPageRect = function () {
            return this.pageRect;
        };
        BaseFolderWindow.prototype.setLinePos = function () {
            if (this.moveLine) {
                this.moveLine.x = this.pageRect.width * this.percentNum;
                this.moveLine.y = 13;
                this.moveLine.width = 5;
                this.moveLine.height = this.pageRect.height;
                // console.log("设置位置")
            }
        };
        BaseFolderWindow.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.setUiListVisibleByItem([this.c_tittle_bg, this.c_win_bg], false);
            this.setUiListVisibleByItem([this.e_panel_1], true);
            this.pathUrlBg = this.addChild(this._baseMidRender.getComponent("e_file_list_path_bg"));
            this.moveLine = this.addChild(this._baseMidRender.getComponent("e_line_vertical"));
            this.moveLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.setLinePos();
            this.resize();
        };
        BaseFolderWindow.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.moveLine:
                    this.lastPagePos = new Vector2D(this.moveLine.x, this.moveLine.y);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        BaseFolderWindow.prototype.refrishWinSize = function () {
            Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.RESET_FOLDE_WIN_SIZE));
        };
        BaseFolderWindow.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.moveLine:
                    this.moveLine.x = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    this.moveLine.x = Math.min(this.moveLine.x, this.pageRect.width * 0.6);
                    this.moveLine.x = Math.max(this.moveLine.x, this.pageRect.width * 0.2);
                    this.percentNum = this.moveLine.x / this.pageRect.width;
                    this.refrishWinSize();
                default:
                    console.log("nonono");
                    break;
            }
            this.resize();
        };
        return BaseFolderWindow;
    }(win.BaseWindow));
    basefolderwin.BaseFolderWindow = BaseFolderWindow;
})(basefolderwin || (basefolderwin = {}));
//# sourceMappingURL=BaseFolderWindow.js.map