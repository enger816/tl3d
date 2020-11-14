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
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Rectangle = Pan3d.Rectangle;
    var EndlessManager = endless.EndlessManager;
    var EndLessLeftRankPanel = /** @class */ (function (_super) {
        __extends(EndLessLeftRankPanel, _super);
        function EndLessLeftRankPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        EndLessLeftRankPanel.prototype.getlevelRankList = function () {
            var _this = this;
            var arr = ["2222", "3333", "444"];
            var $postStr = "";
            $postStr += "level=" + 1;
            $postStr += "&openid=" + GameData.getStorageSync("openid");
            GameData.WEB_SEVER_EVENT_AND_BACK("get_endless_rank_list ", $postStr, function (res) {
                console.log("回来的list", res.data);
                if (res && res.data) {
                    var selfRank = res.data.rank;
                    EndlessManager.getInstance().selfBestScore = res.data.score;
                    GameData.setStorageSync("endlessMaxLevel", EndlessManager.getInstance().selfBestScore);
                    var $sortid = 0;
                    for (var j = 0; j < res.data.list.length; j++) {
                        if (res.data.list[j].rank == selfRank) {
                            $sortid = j;
                        }
                    }
                    var frameId = 0;
                    for (var i = 0; i < res.data.list.length; i++) {
                        if (i >= $sortid - 2 && i <= $sortid + 2) {
                            var $ui = _this.uiItem[frameId++];
                            if (res.data.list[i]) {
                                _this.drawRankInofToUi($ui, res.data.list[i], selfRank);
                            }
                        }
                    }
                }
            });
        };
        EndLessLeftRankPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiItem = new Array();
            for (var i = 0; i < 5; i++) {
                var $ui = this.addChild(this._topRender.getComponent("r_rank_frame_txt"));
                $ui.goToAndStop(i);
                $ui.y = $ui.baseRec.y + i * 30;
                this.uiItem.push($ui);
            }
            this.uiLoadComplte = true;
            this.showPanel();
        };
        EndLessLeftRankPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.rifrishData();
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        EndLessLeftRankPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        EndLessLeftRankPanel.prototype.drawRankInofToUi = function ($temp, $data, selfRank) {
            var _this = this;
            var $url = $data.info;
            GameData.loadImgByPicUrl($url, function ($img) {
                var $toRect = $temp.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                var $imgWh = new Rectangle(5, 0, 30, 30);
                var $num5 = 5;
                $ctx.drawImage($img, $imgWh.x, $imgWh.y, $imgWh.width, $imgWh.height);
                $ctx.fillStyle = "rgba(255,255,255,1)";
                $ctx.fillRect($imgWh.x, $imgWh.y, $num5, $imgWh.width);
                $ctx.fillRect($imgWh.x, $imgWh.y, $imgWh.width, $num5);
                $ctx.fillRect($imgWh.x, $imgWh.y + $imgWh.height - $num5, $imgWh.width, $num5);
                $ctx.fillRect($imgWh.x + $imgWh.width - $num5, $imgWh.y, $num5, $imgWh.height);
                var $outTxt = "";
                if (selfRank == $data.rank) {
                    $outTxt = Pan3d.ColorType.Redd92200 + "第" + $data.best_score + "层";
                    $outTxt += Pan3d.ColorType.Redd92200 + "->排名" + selfRank;
                }
                else {
                    $outTxt = Pan3d.ColorType.Whiteffffff + "第" + $data.best_score + "层";
                }
                LabelTextFont.writeSingleLabelToCtx($ctx, $outTxt, 20, 40, 5, Pan3d.TextAlign.LEFT);
                $temp.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        EndLessLeftRankPanel.prototype.rifrishData = function () {
            if (this.uiLoadComplte) {
                this.getlevelRankList();
            }
        };
        return EndLessLeftRankPanel;
    }(H5UIConatiner));
    endless.EndLessLeftRankPanel = EndLessLeftRankPanel;
})(endless || (endless = {}));
//# sourceMappingURL=EndLessLeftRankPanel.js.map