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
    var UILoading = /** @class */ (function (_super) {
        __extends(UILoading, _super);
        function UILoading() {
            var _this = _super.call(this) || this;
            _this.width = Pan3d.UIData.designWidth;
            _this.height = Pan3d.UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this.initData();
            return _this;
        }
        UILoading.getInstance = function () {
            if (!this._instance) {
                this._instance = new UILoading();
            }
            return this._instance;
        };
        UILoading.prototype.initData = function () {
            var _this = this;
            //var render:UIRenderComponent = new UIRenderComponent();
            this.atls = new Pan3d.UIAtlas();
            this.atls.configData = new Array;
            this.atls.configData.push(this.atls.getObject("load", 0, 0, 256, 256, 256, 256, 4, 4));
            this.atls.loadImgUrl("ui/load/ui_loding.png", function () { _this.loadCom(); });
        };
        UILoading.prototype.loadCom = function () {
            this._render = new Pan3d.UIRenderComponent();
            this._render.uiAtlas = this.atls;
            var ui = this._render.createFrame("load");
            this.addChild(ui);
            ui.speed = 1;
            ui.width = 100;
            ui.height = 100;
            ui.x = (Pan3d.UIData.designWidth - ui.width) / 2;
            ui.y = (Pan3d.UIData.designHeight - ui.height) / 2;
            // this.addRender(this._render);
        };
        UILoading.prototype.show = function () {
            //  UIManager.getInstance().addUIContainer(this);
        };
        UILoading.prototype.hide = function () {
            //    UIManager.getInstance().removeUIContainer(this);
        };
        return UILoading;
    }(Pan3d.UIConatiner));
    Pan3d.UILoading = UILoading;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UILoading.js.map