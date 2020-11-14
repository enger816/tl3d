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
var endless;
(function (endless) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var TimeUtil = Pan3d.TimeUtil;
    var Physics = canonkey.Physics;
    var GameDataModel = game.GameDataModel;
    var EndLessTopPanel = /** @class */ (function (_super) {
        __extends(EndLessTopPanel, _super);
        function EndLessTopPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.top = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.frameFun = function () { _this.upFrame(); };
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        EndLessTopPanel.prototype.upFrame = function () {
            if (Physics.ready && GameData.gameType == 2) {
                var $n = endless.EndlessManager.getInstance().CountdownTm - TimeUtil.getTimer();
                if ($n > 0) {
                    this.drawTimeTime($n);
                }
                else {
                    Physics.ready = false;
                    Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.SHOW_ENDLESS_FINISH_PANEL));
                }
            }
        };
        EndLessTopPanel.prototype.drawTimeTime = function (value) {
            var s = Math.floor(value / 1000);
            var m = Math.floor((value % 1000 / 1000) * 60);
            var str = (s < 10 ? "0" : "") + s + ":" + (m < 10 ? "0" : "") + m;
            if (this.a_endless_time.data != str) {
                this.a_endless_time.data = str;
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_endless_time.skinName, str, "NUM44", TextAlign.CENTER);
            }
        };
        EndLessTopPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_back_to_base:
                    GameData.dispatchToLevel(GameDataModel.levelNum);
                    break;
                default:
                    break;
            }
        };
        EndLessTopPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.a_back_to_base = this.addEvntButUp("a_back_to_base", this._topRender);
            this.a_back_to_base.left = 30;
            this.addChild(this._topRender.getComponent("a_layer_bg"));
            this.a_endless_time = this.addChild(this._topRender.getComponent("a_endless_time"));
            this.addChild(this._topRender.getComponent("a_layer_Left_txt"));
            this.a_layer_num_txt = this.addChild(this._topRender.getComponent("a_layer_num_txt"));
            this.addChild(this._topRender.getComponent("a_layer_right_txt"));
            this.addChild(this._topRender.getComponent("a_diamond_icon"));
            this.a_diamond_num_txt = this.addChild(this._topRender.getComponent("a_diamond_num_txt"));
            this.a_add_scene_time_tip = this.addChild(this._topRender.getComponent("a_add_scene_time_tip"));
            this._endLessLeftRankPanel = new endless.EndLessLeftRankPanel();
            this._endLessLeftRankPanel.setRender(this._midRender, this._midRender, this._topRender);
            this.uiLoadComplte = true;
            this.showPanel();
            this.drawTimeTime(endless.EndlessManager.getInstance().endlessConfigVo.maxtime);
        };
        EndLessTopPanel.prototype.showAddSceneTime = function (value) {
            var _this = this;
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, "A_add_scene_time_num", String(value), "NUM41", TextAlign.CENTER);
            this.a_add_scene_time_tip.y = this.a_add_scene_time_tip.baseRec.y;
            var $ty = this.a_add_scene_time_tip.baseRec.y - 100;
            TweenLite.to(this.a_add_scene_time_tip, 0.3, {
                y: $ty, onComplete: function () {
                    TimeUtil.addTimeOut(1000, function () {
                        _this.a_add_scene_time_tip.y = -1000;
                    });
                }
            });
        };
        EndLessTopPanel.prototype.refrishDiamondNum = function () {
            if (this.uiLoadComplte) {
                var $num = GameData.hasdiamondsHavenum;
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_diamond_num_txt.skinName, String($num), "NUM10", TextAlign.CENTER);
            }
        };
        EndLessTopPanel.prototype.refristLayerNum = function () {
            if (this.uiLoadComplte) {
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_layer_num_txt.skinName, String(endless.EndlessManager.getInstance().layerNum), "NUM41", TextAlign.CENTER);
                this._endLessLeftRankPanel.rifrishData();
            }
        };
        EndLessTopPanel.prototype.muiTimeAddStart = function () {
            TimeUtil.addFrameTick(this.frameFun);
        };
        EndLessTopPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refristLayerNum();
                this.refrishDiamondNum();
                this.a_add_scene_time_tip.y = -1000;
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        EndLessTopPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeFrameTick(this.frameFun);
            tips.PandaMeshData.hideCentenTxtInfoType2(tips.PandaMeshData.key101);
        };
        EndLessTopPanel.prototype.refrishData = function (value) {
        };
        return EndLessTopPanel;
    }(H5UIConatiner));
    endless.EndLessTopPanel = EndLessTopPanel;
})(endless || (endless = {}));
//# sourceMappingURL=EndLessTopPanel.js.map