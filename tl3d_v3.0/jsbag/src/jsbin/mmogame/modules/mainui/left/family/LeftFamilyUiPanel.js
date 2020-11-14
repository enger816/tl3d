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
var leftui;
(function (leftui) {
    var LeftFamilyUiPanel = /** @class */ (function (_super) {
        __extends(LeftFamilyUiPanel, _super);
        function LeftFamilyUiPanel() {
            var _this = _super.call(this) || this;
            _this._lastMouseY = 0;
            _this._lastFriendTy = 0;
            _this._isMoveBar = false;
            _this.mouseTy = 0;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.left = 40;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            _this._tickFun = function () { _this.upTimeFrame(); };
            return _this;
        }
        LeftFamilyUiPanel.prototype.upTimeFrame = function () {
            if (this.hasStage) {
                if (this.left >= 0 && GuidData.faction) {
                    for (var k = 0; k < this.showItemVo.length; k++) {
                        this.showItemVo[k].refresh();
                    }
                }
            }
            else {
                TimeUtil.removeTimeTick(this._tickFun);
            }
        };
        LeftFamilyUiPanel.prototype.loadAtlas = function ($bfun) {
            var _this = this;
            this.bFun = $bfun;
            this._topRender.uiAtlas.setInfo("ui/uidata/mainui/left/familyleft/familyleft.xml", "ui/uidata/mainui/left/familyleft/familyleft.png", function () { _this.loadConfigCom(); });
        };
        LeftFamilyUiPanel.prototype.loadConfigCom = function () {
            this.uiVoItem = new Array;
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this.mask_mc = this.addEvntBut("mask_mc", this._bottomRender);
            this.familyLinPai = new leftui.FamilyLinPai(this, this._bottomRender, this._topRender, 0);
            this.familyBoss = new leftui.FamilyBoss(this, this._bottomRender, this._topRender, 1);
            this.boosChallenge = new leftui.BoosChallenge(this, this._bottomRender, this._topRender, 2);
            this.familyPk = new leftui.FamilyPk(this, this._bottomRender, this._topRender, 3);
            this.uiVoItem.push(this.familyLinPai);
            this.uiVoItem.push(this.familyBoss);
            this.uiVoItem.push(this.boosChallenge);
            this.uiVoItem.push(this.familyPk);
            this._listMask = new UIMask();
            this._listMask.x = this.mask_mc.x;
            this._listMask.y = this.mask_mc.y;
            this._listMask.width = this.mask_mc.width;
            this._listMask.height = this.mask_mc.height;
            this.addMask(this._listMask);
            this._bottomRender.mask = this._listMask;
            this._topRender.mask = this._listMask;
            if (this.bFun) {
                this.bFun();
            }
        };
        LeftFamilyUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.mask_mc:
                    this.taskListMouseDown(evt);
                    break;
                default:
                    break;
            }
        };
        LeftFamilyUiPanel.prototype.taskListMouseDown = function (evt) {
            this._isMoveBar = false;
            this._lastMouseY = evt.y;
            this._lastFriendTy = this.mouseTy;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
        };
        LeftFamilyUiPanel.prototype.onStageMouseMove = function (evt) {
            this._isMoveBar = true;
            this.mouseTy = this._lastFriendTy + (evt.y - this._lastMouseY);
            this.tureTy();
        };
        LeftFamilyUiPanel.prototype.onStageMouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            this._isMoveBar = false;
            if (this._lastMouseY == evt.y) {
                this.clikUi(evt);
            }
        };
        LeftFamilyUiPanel.prototype.clikUi = function (evt) {
            for (var k = 0; k < this.showItemVo.length; k++) {
                this.showItemVo[k].clik(evt);
            }
        };
        LeftFamilyUiPanel.prototype.refresh = function () {
            this.showItemVo = this.getShowItemVo();
            this.maxShowRect = new Rectangle();
            for (var i = 0; i < this.showItemVo.length; i++) {
                this.showItemVo[i].rect.y = this.maxShowRect.height;
                this.maxShowRect.height += this.showItemVo[i].rect.height;
            }
            this.tureTy();
        };
        LeftFamilyUiPanel.prototype.getShowItemVo = function () {
            var $arr = new Array;
            var $showData = [0, 1];
            for (var i = 0; i < this.uiVoItem.length; i++) {
                var $has = false;
                for (var j = 0; j < $showData.length; j++) {
                    if ($showData[j] == this.uiVoItem[i].id) {
                        $arr.push(this.uiVoItem[i]);
                        $has = true;
                    }
                }
                if ($has) {
                    this.uiVoItem[i].show();
                }
                else {
                    this.uiVoItem[i].hide();
                }
            }
            return $arr;
        };
        LeftFamilyUiPanel.prototype.tureTy = function () {
            this.mouseTy = Math.min(this.mouseTy, 0);
            if (this.maxShowRect.height > this._listMask.height) {
                this.mouseTy = Math.max(this.mouseTy, this._listMask.height - this.maxShowRect.height);
            }
            else {
                this.mouseTy = 0;
            }
            for (var k = 0; k < this.showItemVo.length; k++) {
                this.showItemVo[k].y = this.showItemVo[k].rect.y + this._listMask.y + this.mouseTy;
            }
        };
        LeftFamilyUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addTimeTick(1000, this._tickFun);
        };
        LeftFamilyUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return LeftFamilyUiPanel;
    }(UIPanel));
    leftui.LeftFamilyUiPanel = LeftFamilyUiPanel;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftFamilyUiPanel.js.map