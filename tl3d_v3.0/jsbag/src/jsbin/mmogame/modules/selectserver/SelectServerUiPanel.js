var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var selectserver;
(function (selectserver) {
    var SelectServerUiPanel = /** @class */ (function (_super) {
        __extends(SelectServerUiPanel, _super);
        function SelectServerUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baImg = new UIBackImg();
            _this._baImg.alpha = 0.5;
            _this._baImg.setImgInfo("ui/load/001.jpg", 1024, 512);
            _this.addRender(_this._baImg);
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._middleRender = new UIRenderComponent;
            _this.addRender(_this._middleRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        SelectServerUiPanel.prototype.dispose = function () {
            this._baImg.dispose();
            this._baImg = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._middleRender.dispose();
            this._middleRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.ssgonggao) {
                this.ssgonggao.dispose();
                this.ssgonggao = null;
            }
            if (this.ssxuanfu) {
                this.ssxuanfu.dispose();
                this.ssxuanfu = null;
            }
        };
        SelectServerUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/selectserver/selectserver.xml", "ui/uidata/selectserver/selectserver.png", function () { _this.loadConfigCom(); }, "ui/uidata/selectserver/selectserverpc.png");
        };
        SelectServerUiPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this._middleRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.addChild(this._topRender.getComponent("t_1"));
            var t_titlebg1 = this.addChild(this._middleRender.getComponent("t_titlebg1"));
            t_titlebg1.isU = true;
            var t_leftline1 = this.addChild(this._middleRender.getComponent("t_leftline1"));
            t_leftline1.isU = true;
            var t_angel1 = this.addChild(this._middleRender.getComponent("t_angel1"));
            t_angel1.isU = true;
            var t_towel1 = this.addChild(renderLevel.getComponent("t_towel1"));
            t_towel1.isU = true;
            this.addChild(this._bgRender.getComponent("t_leaf2_2"));
            this.addChild(this._bgRender.getComponent("t_leaf3_1"));
            this.addChild(this._bgRender.getComponent("t_bg"));
            this.addChild(this._middleRender.getComponent("t_titlebg"));
            this.addChild(this._middleRender.getComponent("t_leftline"));
            this.addChild(this._middleRender.getComponent("t_angel"));
            this.addChild(this._middleRender.getComponent("t_bottomline"));
            this.addChild(renderLevel.getComponent("t_towel"));
            this.addChild(this._topRender.getComponent("t_leaf2_1"));
            this.addChild(this._topRender.getComponent("t_leaf1_0"));
            this.addChild(this._topRender.getComponent("t_leaf2_0"));
            this.addChild(this._topRender.getComponent("t_leaf3_0"));
            this.t_but = this.addEvntButUp("t_but", this._topRender);
            this.resize();
            LoadManager.getInstance().load("tb_server_list.txt", LoadManager.XML_TYPE, function ($str) {
                var obj = JSON.parse($str);
                selectserver.SelectServerModel.getInstance().convertObj(obj);
                _this.applyLoadComplete();
                // //console.log("--公告---", obj["aaa"]);
            });
        };
        SelectServerUiPanel.prototype.showgg = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.ssgonggao) {
                this.ssgonggao = new selectserver.Ssgonggao();
                this.ssgonggao.initUiAtlas(this._baseRender.uiAtlas);
            }
            this.ssgonggao.show();
        };
        SelectServerUiPanel.prototype.hidegg = function () {
            if (this.ssgonggao) {
                this.ssgonggao.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
        };
        SelectServerUiPanel.prototype.showss = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.ssxuanfu) {
                this.ssxuanfu = new selectserver.Ssxuanfu();
                this.ssxuanfu.initUiAtlas(this._baseRender.uiAtlas);
            }
            this.ssxuanfu.show();
        };
        SelectServerUiPanel.prototype.hidess = function () {
            if (this.ssxuanfu) {
                this.ssxuanfu.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
        };
        SelectServerUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        SelectServerUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.t_but:
                    if (this.ssxuanfu && this.ssxuanfu.hasStage) {
                        this.hidess();
                        ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
                    }
                    if (this.ssgonggao && this.ssgonggao.hasStage) {
                        this.hidegg();
                    }
                    break;
                default:
                    break;
            }
        };
        return SelectServerUiPanel;
    }(UIPanel));
    selectserver.SelectServerUiPanel = SelectServerUiPanel;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=SelectServerUiPanel.js.map