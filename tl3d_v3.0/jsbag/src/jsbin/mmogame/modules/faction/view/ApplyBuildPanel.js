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
var faction;
(function (faction) {
    var ApplyBuildPanel = /** @class */ (function (_super) {
        __extends(ApplyBuildPanel, _super);
        function ApplyBuildPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        ApplyBuildPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        ApplyBuildPanel.prototype.initUiAtlas = function ($uiAtlas, $winmidRender) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $winmidRender.uiAtlas;
            this._winmidRender = $winmidRender;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            var renderLevel = this._topRender;
            this.initView(renderLevel);
        };
        ApplyBuildPanel.prototype.initView = function (renderLevel) {
            var renderLevel = this._baseRender;
            this.addChild(this._bottomRender.getComponent("b_newbg"));
            this.addChild(renderLevel.getComponent("a_1"));
            this.a_left = this._topRender.getComponent("a_left");
            this.a_left.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.a_right = this._topRender.getComponent("a_right");
            this.a_right.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(renderLevel.getComponent("a_2"));
            this._a_3 = this.addChild(this._topRender.getComponent("a_3"));
            this._a_9 = this.addChild(this._topRender.getComponent("a_9"));
            this.addChild(this._topRender.getComponent("a_4"));
            this.addEvntBut("a_6", renderLevel);
            this.a_5 = this.addChild(this._topRender.getComponent("a_5"));
            this.addChild(renderLevel.getComponent("a_7"));
            var b_bg2 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(b_bg2, "btnBg", renderLevel);
            this.addChild(this._topRender.getComponent("f_1_1"));
            this._pagenum = this.addChild(this._topRender.getComponent("a_8"));
            this._btncompentent = new Array;
            for (var i = 0; i < 15; i++) {
                var pbtn = this.addEvntBut("p_" + i, this._topRender);
                this._btncompentent.push(pbtn);
            }
            this.BaseUiAry = new Array;
            var cnew_right_bg_top = this.addChild(this._winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", renderLevel);
            var cnew_right_bg_bottom = this.addChild(this._winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", renderLevel);
            this._winmidRender.applyObjData();
            this.BaseUiAry.push(cnew_right_bg_top);
            this.BaseUiAry.push(cnew_right_bg_bottom);
            this.resize();
            this.initData();
        };
        ApplyBuildPanel.prototype.initData = function () {
            this._faction_icon_ary = tb.Tb_faction_icon.getTempByID();
            this._allpage = Math.floor(this._faction_icon_ary.length / 15) + 1;
            this._currentpage = 1;
            this._msgTxt = "名字3-6个汉字";
            this._type = false;
            this.refreshInputBfun(this._msgTxt, this._type);
        };
        ApplyBuildPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        ApplyBuildPanel.prototype.set_a_9 = function () {
            var aa = tb.TB_faction_creat.getItemById(1);
            // this._moneytype = aa.cost[0][0];
            // this._needmoney = aa.cost[0][1];
            // strengthgem.EquDrawUtil.drawResourceIconAndtxt(this._topRender.uiAtlas, this._a_9.skinName, aa.cost[0][1], aa.cost[0][0], TextAlign.CENTER);
            this._canbuy = UiDraw.drawRewardIconAndtxt(this._a_9, aa.cost[0], true, TextAlign.LEFT, 10);
        };
        ApplyBuildPanel.prototype.setvisiableleft_right = function () {
            if (this._allpage == 1) {
                this.setUiListVisibleByItem([this.a_left, this.a_right], false);
                return;
            }
            if (this._allpage == this._currentpage) {
                this.setUiListVisibleByItem([this.a_right], false);
                this.setUiListVisibleByItem([this.a_left], true);
                return;
            }
            if (this._currentpage == 1 && this._allpage > 1) {
                this.setUiListVisibleByItem([this.a_right], true);
                this.setUiListVisibleByItem([this.a_left], false);
                return;
            }
            if (this._currentpage < this._allpage) {
                this.setUiListVisibleByItem([this.a_left, this.a_right], true);
                return;
            }
        };
        ApplyBuildPanel.prototype.setnum = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._pagenum.skinName, this._currentpage + "/" + this._allpage, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        ApplyBuildPanel.prototype.drawPicAll = function () {
            var a = this._currentpage - 1;
            this.defaultData();
            for (var i = 0; i < this._btncompentent.length; i++) {
                var b = (a * 15 + i);
                if (b < this._faction_icon_ary.length) {
                    var $data = this._faction_icon_ary[b];
                    $data.isvisiable = true;
                    this.btnSetData(this._btncompentent[i], $data);
                    this.drawPic(this._btncompentent[i]);
                }
                else {
                    this.btnSetData(this._btncompentent[i]);
                    this.setnull(this._btncompentent[i]);
                    // UiDraw.clearUI(this._btncompentent[i]);
                }
            }
        };
        ApplyBuildPanel.prototype.defaultData = function () {
            for (var i = 0; i < this._faction_icon_ary.length; i++) {
                this._faction_icon_ary[i].isvisiable = false;
            }
        };
        ApplyBuildPanel.prototype.btnSetData = function ($ui, $data) {
            if ($data === void 0) { $data = null; }
            $ui.data = $data;
            $ui.enable = true;
        };
        ApplyBuildPanel.prototype.setnull = function ($ui) {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $ui.skinName, "", 16, TextAlign.LEFT);
            $ui.enable = false;
        };
        ApplyBuildPanel.prototype.drawPic = function ($ui) {
            var _this = this;
            var $data = $ui.data;
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String($data.icon)), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);
                if ($data.isactivityflag) {
                    UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(3, 3, 62, 62), UIData.publicUi);
                }
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        ApplyBuildPanel.prototype.drawPicProp100 = function ($ui) {
            var _this = this;
            var $data = $ui.data;
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String($data.icon) + "_c"), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg100, new Rectangle(0, 0, 108, 108), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 100, 100);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        ApplyBuildPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.setUiListVisibleByItem(this.BaseUiAry, true);
            this.resetData();
            this.setselect(this._btncompentent[0]);
        };
        ApplyBuildPanel.prototype.hide = function () {
            this.setUiListVisibleByItem(this.BaseUiAry, false);
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        ApplyBuildPanel.prototype.resetData = function () {
            this.drawPicAll();
            this.setnum();
            this.set_a_9();
            this.setvisiableleft_right();
        };
        /**
         * 设置选中状态和索引位置
         */
        ApplyBuildPanel.prototype.setselect = function ($selectUi) {
            if (this._lastData) {
                //将上一个控件状态置回
                var data = this._lastData;
                data.isactivityflag = false;
                //如果data存在，则更新UI
                for (var i = 0; i < this._btncompentent.length; i++) {
                    var uidata = this._btncompentent[i].data;
                    if (uidata && uidata.id && uidata.id == data.id) {
                        this.btnSetData(this._btncompentent[i], data);
                        this.drawPic(this._btncompentent[i]);
                        break;
                    }
                }
            }
            var $data = $selectUi.data;
            $data.isactivityflag = true;
            this.btnSetData($selectUi, $data);
            this.drawPic($selectUi);
            this._a_3.data = $data;
            this.drawPicProp100(this._a_3);
            this._lastData = $selectUi.data;
            //重置data
            for (var j = 0; j < this._faction_icon_ary.length; j++) {
                if (this._faction_icon_ary[j].id == $data.id) {
                    this._faction_icon_ary.splice(j, 1, $data);
                    break;
                }
            }
        };
        ApplyBuildPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target.name) {
                case "cnew_btn1":
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this._lastData && this._canbuy && this._type && this._msgTxt.length >= 3 && this._msgTxt.length <= 6) {
                        this.createFaction(this._lastData.icon);
                    }
                    else if (!this._canbuy) {
                        var aa = tb.TB_faction_creat.getItemById(1);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = aa.cost[0][0];
                        ModuleEventManager.dispatchEvent($aaa);
                    }
                    else {
                        msgtip.MsgTipManager.outStrById(22, 27);
                    }
                    break;
                case "p_0":
                case "p_1":
                case "p_2":
                case "p_3":
                case "p_4":
                case "p_5":
                case "p_6":
                case "p_7":
                case "p_8":
                case "p_9":
                case "p_10":
                case "p_11":
                case "p_12":
                case "p_13":
                case "p_14":
                    this.setselect(evt.target);
                    break;
                case "a_left":
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this._currentpage -= 1;
                    this.resetData();
                    break;
                case "a_right":
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this._currentpage += 1;
                    this.resetData();
                    break;
                case "a_6":
                    InputPanel.show(function ($str) { _this.inputBfun($str); }, this._type ? this._msgTxt : "", 2, 12);
                    break;
                default:
                    break;
            }
        };
        ApplyBuildPanel.prototype.inputBfun = function ($str) {
            if ($str.length > 0) {
                this._type = true;
                this._msgTxt = $str;
            }
            else {
                this._type = false;
                this._msgTxt = "名字3-6个汉字";
            }
            this.refreshInputBfun(this._msgTxt, this._type);
        };
        /**
         * $type:false 默认文案
         */
        ApplyBuildPanel.prototype.refreshInputBfun = function ($str, $type) {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_5.skinName, $str, 16, TextAlign.CENTER, ColorType.colorb96d49);
        };
        ApplyBuildPanel.prototype.createFaction = function ($icon) {
            // var str: string = GuidData.player.getBaseName() + "的帮派"
            NetManager.getInstance().protocolos.create_faction(this._msgTxt, $icon);
        };
        return ApplyBuildPanel;
    }(UIVirtualContainer));
    faction.ApplyBuildPanel = ApplyBuildPanel;
})(faction || (faction = {}));
//# sourceMappingURL=ApplyBuildPanel.js.map