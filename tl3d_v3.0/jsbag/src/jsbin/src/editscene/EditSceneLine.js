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
var editscene;
(function (editscene) {
    var Rectangle = Pan3d.Rectangle;
    var Sprite = win.Sprite;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var TempSceneLine = /** @class */ (function (_super) {
        __extends(TempSceneLine, _super);
        function TempSceneLine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hideItemDic = {};
            _this._leftSpeed = 1;
            _this._rightSpeed = 1;
            _this._bottomSpeed = 1;
            _this.leftWidthNum = 300; //左边宽度；
            _this.rightWidthNum = 300; //右边宽度；
            _this.bottomHeightNum = 300; //底下宽度；
            _this.menuHeight = 28;
            return _this;
        }
        TempSceneLine.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.leftLine = this._baseTopRender.getComponent("a_empty");
            this.rightLine = this._baseTopRender.getComponent("a_empty");
            this.bottomLine = this._baseTopRender.getComponent("a_empty");
            this.setUiListVisibleByItem([this.leftLine], true);
            this.setUiListVisibleByItem([this.rightLine], true);
            this.setUiListVisibleByItem([this.bottomLine], true);
            this.leftLineMin = this._baseTopRender.getComponent("b_line_pixe_point");
            this.rightLineMin = this._baseTopRender.getComponent("b_line_pixe_point");
            this.bottomLineMin = this._baseTopRender.getComponent("b_line_pixe_point");
            this.closeLeftBut = this.addEvntButUp("e_left_close_but", this._baseTopRender);
            this.closeRightBut = this.addEvntButUp("e_right_close_but", this._baseTopRender);
            this.closeBottomBut = this.addEvntButUp("e_bottom_close_but", this._baseTopRender);
            //this.closeLeftBut.width = 10
            //this.closeLeftBut.height = 60
            //this.closeRightBut.width = 10
            //this.closeRightBut.height = 60
            //this.closeBottomBut.width = 60
            //this.closeBottomBut.height = 10
            this.setUiListVisibleByItem([this.leftLineMin], true);
            this.setUiListVisibleByItem([this.rightLineMin], true);
            this.setUiListVisibleByItem([this.bottomLineMin], true);
            this.leftLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.rightLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.bottomLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight));
            this.resize();
            //     console.log("ui布局完成")
        };
        TempSceneLine.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.closeLeftBut:
                    this.hideItemDic["left"] = !this.hideItemDic["left"];
                    this.leftSpeed = 0;
                    TweenLite.to(this, 0.2, { leftSpeed: 1 });
                    break;
                case this.closeRightBut:
                    this.hideItemDic["right"] = !this.hideItemDic["right"];
                    this.rightSpeed = 0;
                    TweenLite.to(this, 0.2, { rightSpeed: 1 });
                    break;
                case this.closeBottomBut:
                    this.hideItemDic["bottom"] = !this.hideItemDic["bottom"];
                    this.bottomSpeed = 0;
                    TweenLite.to(this, 0.2, { bottomSpeed: 1 });
                    break;
                default:
            }
        };
        Object.defineProperty(TempSceneLine.prototype, "leftSpeed", {
            get: function () {
                return this._leftSpeed;
            },
            set: function (value) {
                this._leftSpeed = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TempSceneLine.prototype, "rightSpeed", {
            get: function () {
                return this._rightSpeed;
            },
            set: function (value) {
                this._rightSpeed = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TempSceneLine.prototype, "bottomSpeed", {
            get: function () {
                return this._bottomSpeed;
            },
            set: function (value) {
                this._bottomSpeed = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        TempSceneLine.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.bottomLine) {
                var leftNum = this.leftWidthNum;
                var rightNum = this.rightWidthNum;
                var bottomNum = this.bottomHeightNum;
                if (this.hideItemDic["left"]) { //左边关关闭
                    leftNum = (1 - this._leftSpeed) * this.leftWidthNum;
                }
                else {
                    leftNum = this._leftSpeed * this.leftWidthNum;
                }
                if (this.hideItemDic["right"]) { //左边关关闭
                    rightNum = (1 - this._rightSpeed) * this.rightWidthNum;
                }
                else {
                    rightNum = this._rightSpeed * this.rightWidthNum;
                }
                if (this.hideItemDic["bottom"]) { //左边关关闭
                    bottomNum = 20;
                    bottomNum = (1 - this._bottomSpeed) * this.bottomHeightNum + 20;
                }
                else {
                    bottomNum = this._bottomSpeed * this.bottomHeightNum;
                }
                this.leftLine.x = leftNum - 5;
                this.leftLine.y = 0;
                this.leftLine.width = 10;
                this.leftLine.height = Scene_data.stageHeight - bottomNum;
                this.closeLeftBut.x = this.leftLine.x + 4;
                this.closeLeftBut.y = this.leftLine.height / 2 - this.closeLeftBut.height / 2;
                this.rightLine.x = Scene_data.stageWidth - rightNum - 6;
                this.rightLine.y = 0;
                this.rightLine.width = 10;
                this.rightLine.height = Scene_data.stageHeight;
                this.closeRightBut.x = this.rightLine.x - 6;
                this.closeRightBut.y = this.closeLeftBut.y;
                this.bottomLine.x = 0;
                this.bottomLine.y = Scene_data.stageHeight - bottomNum - 5;
                this.bottomLine.width = Scene_data.stageWidth - rightNum;
                this.bottomLine.height = 10;
                this.closeBottomBut.x = leftNum + (this.bottomLine.width - leftNum) / 2 - this.closeBottomBut.width / 2;
                this.closeBottomBut.y = this.bottomLine.y - 5;
                this.leftLineMin.x = this.leftLine.x + 5;
                this.leftLineMin.y = this.leftLine.y;
                this.leftLineMin.width = 2;
                this.leftLineMin.height = this.leftLine.height;
                this.rightLineMin.x = this.rightLine.x + 5;
                this.rightLineMin.y = this.rightLine.y;
                this.rightLineMin.width = 2;
                this.rightLineMin.height = this.rightLine.height;
                this.bottomLineMin.x = this.bottomLine.x;
                this.bottomLineMin.y = this.bottomLine.y + 5;
                this.bottomLineMin.width = this.bottomLine.width;
                this.bottomLineMin.height = 2;
                editscene.EditLeftPanel.leftPanel.y = this.menuHeight;
                AppData.centenPanel.y = this.menuHeight;
                AppData.rightPanel.y = this.menuHeight;
                if (this.hideItemDic["left"]) { //左边关关闭
                    editscene.EditLeftPanel.leftPanel.x = -this.leftWidthNum * this._leftSpeed;
                }
                else {
                    editscene.EditLeftPanel.leftPanel.x = this.leftWidthNum * (this._leftSpeed - 1);
                }
                editscene.EditLeftPanel.leftPanel.height = Scene_data.stageHeight - bottomNum - this.menuHeight;
                editscene.EditLeftPanel.leftPanel.width = this.leftWidthNum;
                editscene.EditLeftPanel.leftPanel.resize();
                AppData.rightPanel.x = Scene_data.stageWidth - rightNum;
                AppData.rightPanel.height = Scene_data.stageHeight - this.menuHeight;
                AppData.rightPanel.width = rightNum;
                AppData.rightPanel.resize();
                AppData.centenPanel.x = leftNum;
                AppData.centenPanel.height = Scene_data.stageHeight - bottomNum - this.menuHeight;
                AppData.centenPanel.width = Scene_data.stageWidth - leftNum - rightNum;
                AppData.centenPanel.width = Scene_data.stageWidth - leftNum - rightNum;
                AppData.centenPanel.resize();
                var rect = new Rectangle(0, Scene_data.stageHeight - bottomNum + 2, Scene_data.stageWidth - rightNum, bottomNum);
                Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect);
                Pan3d.ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.EDITE_SCENE_RESIZE), rect);
                prop.PropModel.getInstance().resize();
            }
        };
        TempSceneLine.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.leftLine:
                case this.rightLine:
                case this.bottomLine:
                    this.lastPagePos = new Vector2D(evt.target.x, evt.target.y);
                    this.lastLaoutVec = new Vector3D(this.leftWidthNum, this.rightWidthNum, this.bottomHeightNum);
                    break;
                default:
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        TempSceneLine.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.leftLine:
                    this.leftWidthNum = this.lastLaoutVec.x + (evt.x - this.lastMousePos.x);
                    this.leftWidthNum = Math.min((Scene_data.stageWidth - this.rightWidthNum) - 100, this.leftWidthNum);
                    this.leftWidthNum = Math.max(300, this.leftWidthNum);
                    break;
                case this.rightLine:
                    this.rightWidthNum = this.lastLaoutVec.y - (evt.x - this.lastMousePos.x);
                    this.rightWidthNum = Math.min((Scene_data.stageWidth - this.leftWidthNum) - 100, this.rightWidthNum);
                    this.rightWidthNum = Math.max(100, this.rightWidthNum);
                    break;
                case this.bottomLine:
                    this.bottomHeightNum = this.lastLaoutVec.z - (evt.y - this.lastMousePos.y);
                    this.bottomHeightNum = Math.min(Scene_data.stageHeight - 100, this.bottomHeightNum);
                    this.bottomHeightNum = Math.max(100, this.bottomHeightNum);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            this.resize();
        };
        return TempSceneLine;
    }(win.BaseWindow));
    editscene.TempSceneLine = TempSceneLine;
    var EditSceneLine = /** @class */ (function (_super) {
        __extends(EditSceneLine, _super);
        function EditSceneLine(has) {
            if (has === void 0) { has = true; }
            var _this = _super.call(this) || this;
            _this.winBg = new TempSceneLine();
            _this.addUIContainer(_this.winBg);
            _this.changeSize();
            return _this;
        }
        return EditSceneLine;
    }(Sprite));
    editscene.EditSceneLine = EditSceneLine;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditSceneLine.js.map