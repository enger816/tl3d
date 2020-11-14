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
var rightpanda;
(function (rightpanda) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var FrameUIRender = Pan3d.FrameUIRender;
    var UIManager = Pan3d.UIManager;
    var Scene_data = Pan3d.Scene_data;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameDataModel = game.GameDataModel;
    var PandaMeshData = rightpanda.PandaMeshData;
    var RightPandaPanel = /** @class */ (function (_super) {
        __extends(RightPandaPanel, _super);
        function RightPandaPanel() {
            var _this = _super.call(this) || this;
            _this._sortId = 0;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.right = 0;
            _this.top = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/rightpanda/rightpanda.txt", "panelui/rightpanda/rightpanda.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        RightPandaPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._frameItem = new Array;
            this.waitTipsItem = new Array;
            for (var i = 0; i < 5; i++) {
                var $temp = this._topRender.getComponent("a_panda_icon_frame");
                $temp.addEventListener(InteractiveEvent.Down, this.butDown, this);
                $temp.addEventListener(InteractiveEvent.Up, this.butClik, this);
                $temp.goToAndStop(i);
                this._frameItem.push($temp);
            }
            this.uiLoadComplte = true;
            //  this.showExpEff()
            this.showPanel();
            if (Scene_data.stageHeight / Scene_data.stageWidth > 2) {
            }
            else {
                this.top = -40;
            }
        };
        RightPandaPanel.prototype.butDown = function (evt) {
            this.lastDownTm = Pan3d.TimeUtil.getTimer();
        };
        RightPandaPanel.prototype.removeFrameUi = function (ui) {
            this.removeChild(ui);
            this.resizeUi();
        };
        RightPandaPanel.prototype.butClik = function (evt) {
            if (GameDataModel.isLevelFinish) {
                return;
            }
            if (GameData.gameType == 2) {
                msgalert.AlertUtil.show("点左上角返回关卡", "提示", function (value) {
                }, 2);
                return;
            }
            if (Math.abs(Pan3d.TimeUtil.getTimer() - this.lastDownTm) < 1000) {
                var ui = evt.target;
                var $vo = ui.data;
                GameData.saveUseClikInfo(String($vo.key));
                if ($vo.data instanceof Pan3d.BaseEvent) {
                    ModuleEventManager.dispatchEvent($vo.data);
                }
                if ($vo.data instanceof Function) {
                    $vo.data && $vo.data();
                }
                switch ($vo.key) {
                    case PandaMeshData.key4:
                    case PandaMeshData.key14:
                    case PandaMeshData.key7:
                        break;
                    default:
                        this.removeFrameUi(ui);
                        break;
                }
            }
        };
        RightPandaPanel.prototype.pushPandaInfo = function ($vo) {
            if (!this.uiLoadComplte) {
                return;
            }
            if (this.isCanAddByKey($vo.key)) {
                var $temp = this.getCanUseUi();
                if ($temp) {
                    $temp.data = $vo;
                    $temp.name = String(this._sortId++);
                    this.addChild($temp);
                    this.drawPicToUi($temp);
                }
                else {
                    console.log("提示信息不够");
                }
            }
            this.waitTipsItem.push($vo);
            this.resizeUi();
        };
        RightPandaPanel.prototype.getCanUseUi = function () {
            for (var i = 0; i < this._frameItem.length; i++) {
                if (!Boolean(this._frameItem[i].parent)) {
                    return this._frameItem[i];
                }
            }
            return null;
        };
        RightPandaPanel.prototype.resizeUi = function () {
            var $ty = 0;
            this._frameItem.sort(function (a, b) {
                return Number(a.name) - Number(b.name);
            });
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    $ty += 85;
                    var $toy = this._frameItem[i].baseRec.y + $ty;
                    TweenLite.to(this._frameItem[i], 0.3, { y: $toy });
                }
            }
        };
        RightPandaPanel.prototype.clearPandaInfo = function (value) {
            console.log("清理pandata");
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo = this._frameItem[i].data;
                    if ($vo.key == value.key) {
                        this.removeChild(this._frameItem[i]);
                        this.resizeUi();
                    }
                }
            }
        };
        RightPandaPanel.prototype.isCanAddByKey = function ($key) {
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo = this._frameItem[i].data;
                    if ($vo.key == $key) {
                        return false;
                    }
                }
            }
            return true;
        };
        RightPandaPanel.prototype.clearFrameCompenent = function ($temp) {
            var $toRect = $temp.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var context = $ctx;
            context.fillStyle = "rgba(66,66,66,0)";
            context.fillRect(0, 0, $toRect.width, $toRect.width);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        RightPandaPanel.prototype.drawEmpetBlack = function ($temp) {
            var $toRect = $temp.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var context = $ctx;
            context.fillStyle = "rgba(66,66,66,1)";
            console.log($toRect.width, $toRect.width);
            context.fillRect(0, 0, $toRect.width, $toRect.width);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        RightPandaPanel.prototype.drawPicToUi = function ($temp) {
            var _this = this;
            this.clearFrameCompenent($temp);
            var $vo = $temp.data;
            if ($vo.url.indexOf("https://wx") != -1) {
                this.drawEmpetBlack($temp);
            }
            GameData.loadImgByPicUrl($vo.url, function ($img) {
                var $toRect = $temp.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                var context = $ctx;
                context.fillStyle = "rgba(66,66,66,0)";
                context.fillRect(0, 0, $toRect.width, $toRect.width);
                if ($vo.url.indexOf("panda") == -1) {
                    ($img.width / $toRect.width);
                    $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.width);
                    console.log($img.width, $img.height);
                    $ctx.fillStyle = "rgba(255,255,255,1)";
                    $ctx.fillRect(0, 0, 5, $toRect.width);
                    $ctx.fillRect(0, 0, $toRect.width, 5);
                    $ctx.fillRect(0, $toRect.width - 5, $toRect.width, 5);
                    $ctx.fillRect($toRect.width - 5, 0, 5, $toRect.width);
                }
                else {
                    $ctx.drawImage($img, 0, 0, $toRect.width, $img.height / ($img.width / $toRect.width));
                }
                $temp.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        RightPandaPanel.prototype.showExpEff = function () {
            var _this = this;
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_qh"), 4, 4, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.speed = 1;
                    _this.expEff.playOne(_this);
                    _this.expEff.play();
                });
            }
        };
        RightPandaPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                TweenLite.to(this, 0.3, {
                    right: 0, ease: Back.easeInOut, onComplete: function () {
                    }
                });
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        RightPandaPanel.prototype.hidePanel = function () {
            var _this = this;
            TweenLite.to(this, 0.3, { right: -100, ease: Back.easeInOut, onComplete: function () {
                    Pan3d.UIManager.getInstance().removeUIContainer(_this);
                }
            });
        };
        return RightPandaPanel;
    }(H5UIConatiner));
    rightpanda.RightPandaPanel = RightPandaPanel;
})(rightpanda || (rightpanda = {}));
//# sourceMappingURL=RightPandaPanel.js.map