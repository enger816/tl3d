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
var win;
(function (win) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Rectangle = Pan3d.Rectangle;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var Scene_data = Pan3d.Scene_data;
    var LayBaseTab = /** @class */ (function (_super) {
        __extends(LayBaseTab, _super);
        function LayBaseTab() {
            var _this = _super.call(this) || this;
            _this.left = 0;
            _this._pageRect = new Rectangle(0, 0, 300, 300);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/basewin/basewin.txt", "ui/basewin/basewin.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LayBaseTab.prototype.mouseDown = function (evt) {
            this.mouseIsDown = true;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        LayBaseTab.prototype.stageMouseMove = function (evt) {
            this.mouseIsDown = false;
        };
        LayBaseTab.prototype.mouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        LayBaseTab.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender);
            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.a_left_line = this.addChild(this._topRender.getComponent("a_rigth_line"));
            this.a_rigth_line = this.addChild(this._topRender.getComponent("a_rigth_line"));
            this.a_bottom_line = this.addChild(this._topRender.getComponent("a_bottom_line"));
            this.a_right_bottom = this.addChild(this._topRender.getComponent("a_right_bottom"));
            this.loadFinish = true;
            this.refrishSize();
        };
        LayBaseTab.prototype.butClik = function (evt) {
            console.log(evt.target);
        };
        Object.defineProperty(LayBaseTab.prototype, "pageRect", {
            get: function () {
                return this._pageRect;
            },
            set: function (value) {
                this._pageRect = value;
                if (this.loadFinish) {
                    this.refrishSize();
                }
            },
            enumerable: true,
            configurable: true
        });
        LayBaseTab.prototype.refrishSize = function () {
            this.left = this._pageRect.x;
            this.top = this._pageRect.y;
            this._pageRect.width = Math.max(100, this._pageRect.width);
            this._pageRect.height = Math.max(100, this._pageRect.height);
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this._pageRect.width;
            this.a_bg.x = 0;
            this.a_bg.y = 0;
            this.a_bg.width = this._pageRect.width;
            this.a_bg.height = this._pageRect.height;
            this.a_left_line.x = 0;
            this.a_left_line.y = this.a_win_tittle.height;
            this.a_left_line.height = this._pageRect.height - this.a_win_tittle.height - this.a_right_bottom.height;
            this.a_rigth_line.x = this._pageRect.width - this.a_rigth_line.width;
            this.a_rigth_line.y = this.a_win_tittle.height;
            this.a_rigth_line.height = this._pageRect.height - this.a_win_tittle.height - this.a_right_bottom.height;
            this.a_bottom_line.x = 0;
            this.a_bottom_line.y = this._pageRect.height - this.a_bottom_line.height;
            this.a_bottom_line.width = this._pageRect.width - this.a_right_bottom.width;
            this.a_right_bottom.x = this._pageRect.width - this.a_right_bottom.width;
            this.a_right_bottom.y = this._pageRect.height - this.a_right_bottom.height;
            this.resize();
        };
        return LayBaseTab;
    }(UIConatiner));
    win.LayBaseTab = LayBaseTab;
})(win || (win = {}));
//# sourceMappingURL=LayBaseTab.js.map