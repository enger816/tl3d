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
var reward;
(function (reward) {
    var RewardPanel = /** @class */ (function (_super) {
        __extends(RewardPanel, _super);
        function RewardPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas;
            return _this;
        }
        RewardPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        RewardPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/reward/reward.xml", "ui/uidata/reward/reward.png", function () { _this.loadConfigCom(); });
        };
        RewardPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.b_close = this.addEvntBut("b_close", this._topRender);
            this.addChild(this._baseRender.getComponent("a_win_bg"));
            this.addChild(this._topRender.getComponent("a_line"));
            this.addChild(this._topRender.getComponent("a_tittle_txt"));
            this.iconList = new Array;
            for (var i = 0; i < 8; i++) {
                this.iconList.push(this.addChild(this._topRender.getComponent("b_icon" + i)));
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();
            this.resize();
        };
        RewardPanel.prototype.resize = function () {
            if (this.a_bg) {
                this.a_bg.top = 0;
                this.a_bg.left = 0;
                this.a_bg.width = Scene_data.stageWidth / UIData.Scale;
                this.a_bg.height = Scene_data.stageHeight / UIData.Scale;
            }
            _super.prototype.resize.call(this);
        };
        RewardPanel.prototype.butClik = function (evt) {
            switch (evt.target.name) {
                case "a_bg":
                    break;
                case "b_close":
                    this.close();
                    break;
                default:
                    break;
            }
        };
        RewardPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                for (var i = 0; i < this.iconList.length; i++) {
                    var $ui = this.iconList[i];
                    if (this.rewardVo.list[i]) {
                        //this.drawRewardIconCtx($ui, this.rewardVo.list[i].item_id, this.rewardVo.list[i].num)
                        IconManager.getInstance().drawItemIcon60($ui, this.rewardVo.list[i].item_id, this.rewardVo.list[i].num);
                    }
                    else {
                        IconManager.getInstance().drawItemIcon60($ui, 0, 0);
                    }
                }
            }
        };
        // protected drawRewardIconCtx($ui: UICompenent, $id: number, $num: number): void {
        //     var $key: string = $ui.skinName
        //     IconManager.getInstance().getIcon(GameData.getIconCopyUrl($id),
        //         ($img: any) => {
        //             var $skillrec: UIRectangle = this._baseRender.uiAtlas.getRec($key);
        //             var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
        //             UiDraw.cxtDrawImg($ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 60, 60), UIData.publicUi);
        //             $ctx.drawImage($img, 2, 2, 56, 56);
        //             ArtFont.getInstance().writeFontToCtxRight($ctx, String($num), ArtFont.num1, 58, 40)
        //             this._baseRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
        //         });
        // }
        RewardPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return RewardPanel;
    }(UIPanel));
    reward.RewardPanel = RewardPanel;
})(reward || (reward = {}));
//# sourceMappingURL=RewardPanel.js.map