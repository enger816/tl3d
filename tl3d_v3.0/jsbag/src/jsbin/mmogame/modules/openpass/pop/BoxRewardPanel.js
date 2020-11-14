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
var pass;
(function (pass) {
    var BoxVo = /** @class */ (function () {
        function BoxVo() {
        }
        return BoxVo;
    }());
    pass.BoxVo = BoxVo;
    var BoxRewardPanel = /** @class */ (function (_super) {
        __extends(BoxRewardPanel, _super);
        function BoxRewardPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        BoxRewardPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            _super.prototype.dispose.call(this);
        };
        BoxRewardPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.uiAtlas.setInfo("ui/uidata/openpass/popbox.xml", "ui/uidata/openpass/popbox.png", function () { _this.loadConfigCom(); });
        };
        BoxRewardPanel.prototype.loadConfigCom = function () {
            this.b_index = this.addChild(this._baseRender.getComponent("b_index"));
            this.b_title = this.addChild(this._baseRender.getComponent("b_title"));
            this.b_btn = this.addEvntButUp("b_btn", this._baseRender);
            this.resize();
            this.applyLoadComplete();
        };
        BoxRewardPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.rewardList) {
                this.rewardList.left = this.b_index.parent.x / UIData.Scale + this.b_index.x;
                this.rewardList.top = this.b_index.parent.y / UIData.Scale + this.b_index.y;
            }
        };
        BoxRewardPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    ModuleEventManager.dispatchEvent(new pass.PassEvent(pass.PassEvent.HIDE_BOXREWARD_PANEL));
                    break;
                case this.b_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this._curvo.canbuy) {
                        this.seletEvent.SubmitFun();
                        ModuleEventManager.dispatchEvent(new pass.PassEvent(pass.PassEvent.HIDE_BOXREWARD_PANEL));
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "条件未达成，暂不可领", 99);
                    }
                    break;
                default:
                    break;
            }
        };
        BoxRewardPanel.prototype.show = function ($vo) {
            UIManager.getInstance().addUIContainer(this);
            this.seletEvent = $vo;
            this._curvo = $vo.data;
            if (this._curvo.canbuy) {
                //不可领取
                this.b_btn.goToAndStop(1);
            }
            else {
                this.b_btn.goToAndStop(0);
            }
            this.b_title.goToAndStop($vo.data.title);
            if (this._curvo.id >= 0) {
                this.addChild(this.b_btn);
            }
            else {
                this.removeChild(this.b_btn);
            }
            if (!this.rewardList) {
                this.rewardList = new RewardList();
                this.rewardList.init(this._baseRender.uiAtlas);
            }
            this.rewardList.show(this._curvo.rewardary);
            this.resize();
        };
        BoxRewardPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.rewardList) {
                this.rewardList.hide();
            }
        };
        return BoxRewardPanel;
    }(WindowCentenMin));
    pass.BoxRewardPanel = BoxRewardPanel;
    /**
     * 奖励list
     */
    var RewardList = /** @class */ (function (_super) {
        __extends(RewardList, _super);
        function RewardList() {
            return _super.call(this) || this;
        }
        RewardList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        RewardList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, RewardListRender, 348, 321, 0, 84, 3, 256, 512, 1, 6);
        };
        RewardList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        RewardList.prototype.show = function ($vo) {
            UIManager.getInstance().addUIContainer(this);
            var $sListItemData = this.getData($vo);
            this.refreshData($sListItemData);
        };
        RewardList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return RewardList;
    }(SList));
    pass.RewardList = RewardList;
    var RewardListRender = /** @class */ (function (_super) {
        __extends(RewardListRender, _super);
        function RewardListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RewardListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Cicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cicon", 9, 9, 68, 68);
            $container.addChild(this.Cicon);
            this.Cname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cname", 97, 9, 100, 20);
            $container.addChild(this.Cname);
            this.Cnum = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cnum", 97, 47, 100, 20);
            $container.addChild(this.Cnum);
            this.Cbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Cbg", 0, 0, 348, 84, 10);
            $container.addChild(this.Cbg);
        };
        RewardListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                //奖励
                var vo = this.itdata.data;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Cname.skinName, getResName(vo[0]), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Cnum.skinName, "x " + vo[1], 16, TextAlign.LEFT, ColorType.Green20a200);
                IconManager.getInstance().drawItemIcon60(this.Cicon, vo[0]);
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Cbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
            }
        };
        RewardListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        RewardListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Cicon);
            UiDraw.clearUI(this.Cname);
            UiDraw.clearUI(this.Cnum);
            UiDraw.clearUI(this.Cbg);
            IconManager.getInstance().clearItemEvent(this.Cicon);
        };
        return RewardListRender;
    }(SListItem));
    pass.RewardListRender = RewardListRender;
})(pass || (pass = {}));
//# sourceMappingURL=BoxRewardPanel.js.map