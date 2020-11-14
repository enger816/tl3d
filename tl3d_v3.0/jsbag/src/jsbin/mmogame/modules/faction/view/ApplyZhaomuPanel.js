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
    var Avo = /** @class */ (function () {
        function Avo() {
        }
        return Avo;
    }());
    faction.Avo = Avo;
    var ApplyZhaomuPanel = /** @class */ (function (_super) {
        __extends(ApplyZhaomuPanel, _super);
        function ApplyZhaomuPanel() {
            var _this = _super.call(this) || this;
            _this._num = 0;
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
        ApplyZhaomuPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.applylist) {
                this.applylist.dispose();
                this.applylist = null;
            }
        };
        ApplyZhaomuPanel.prototype.initUiAtlas = function ($uiAtlas, $winmidRender) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $winmidRender.uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._winmidRender = $winmidRender;
            this.applylist = new faction.ApplyZhaoMuListPanel();
            this.applylist.init($uiAtlas);
            // this.applylist.setDragFun(() => {
            //     UILoading.getInstance().show();
            //     TimeUtil.addTimeOut(1000, () => {
            //         UILoading.getInstance().hide();
            //     })
            // }, () => {
            //     UILoading.getInstance().show();
            //     TimeUtil.addTimeOut(1000, () => {
            //         UILoading.getInstance().hide();
            //     })
            // })
            this.initView();
        };
        ApplyZhaomuPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.addChild(this._bottomRender.getComponent("b_newbg"));
            this.a_left1 = this._topRender.getComponent("a_left1");
            this.a_left1.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.a_right1 = this._topRender.getComponent("a_right1");
            this.a_right1.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this._pagenum = this.addChild(this._topRender.getComponent("a_8_1"));
            this.addChild(renderLevel.getComponent("a_2_1"));
            var xbg1_2 = this.addChild(renderLevel.getComponent("xbg1_2"));
            xbg1_2.isU = true;
            this.addUIList(["f_1_2"], this._topRender);
            this._a_3_1 = this.addChild(this._topRender.getComponent("a_3_1"));
            this.addUIList(["b_bg4", "b_bg5", "a_10", "a_11", "a_12", "a_13", "a_14", "a_17_0", "a_17_1", "a_17_2", "a_17_3", "a_16", "line2", "line4"], renderLevel);
            this.a_18 = this.addChild(renderLevel.getComponent("a_18"));
            var a_15 = this.addChild(renderLevel.getComponent("a_15"));
            this.btn1 = this.addEvntButUp("f_1_0", this._topRender);
            this.b_bg2 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_bg2, "btnBg", renderLevel);
            this.b_01 = this.addEvntBut("b_01", this._topRender);
            this._a_20 = this.addChild(this._topRender.getComponent("a_20")); //name
            this._a_19 = this.addChild(this._topRender.getComponent("a_19")); //描述
            this.BaseUiAry = new Array;
            var cnew_right_bg_top = this.addChild(this._winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", renderLevel);
            var cnew_right_bg_bottom = this.addChild(this._winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", renderLevel);
            this._winmidRender.applyObjData();
            this.BaseUiAry.push(cnew_right_bg_top);
            this.BaseUiAry.push(cnew_right_bg_bottom);
            //初始化当前页数
            this._currentpage = 1;
            this.resetData(new SListItemData());
            this.resize();
        };
        ApplyZhaomuPanel.prototype.setFactionInfo = function ($data) {
            this._selectdata = $data;
            this.resetData($data);
        };
        ApplyZhaomuPanel.prototype.setnum = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._pagenum.skinName, this._currentpage + "/" + this._allpage, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        /**
         * 设置_a_3_1控件的data并绘制
         */
        ApplyZhaomuPanel.prototype.resetData = function ($data) {
            this.setDataToUicompontent(this._a_3_1, $data);
            this.drawSelect();
        };
        ApplyZhaomuPanel.prototype.setvisiableleft_right = function () {
            if (this._allpage == 1) {
                this.setUiListVisibleByItem([this.a_left1, this.a_right1], false);
                return;
            }
            if (this._allpage == this._currentpage) {
                this.setUiListVisibleByItem([this.a_right1], false);
                this.setUiListVisibleByItem([this.a_left1], true);
                return;
            }
            if (this._currentpage == 1 && this._allpage > 1) {
                this.setUiListVisibleByItem([this.a_right1], true);
                this.setUiListVisibleByItem([this.a_left1], false);
                return;
            }
            if (this._currentpage < this._allpage) {
                this.setUiListVisibleByItem([this.a_left1, this.a_right1], true);
                return;
            }
        };
        ApplyZhaomuPanel.prototype.setDataToUicompontent = function ($Ui, $data) {
            $Ui.data = $data;
        };
        ApplyZhaomuPanel.prototype.drawSelect = function () {
            var _this = this;
            var $data = this._a_3_1.data;
            if ($data) {
                var $vo = $data.data;
                if ($vo) {
                    var a = $vo.vo.icon == 0 ? 1 : $vo.vo.icon;
                    IconManager.getInstance().getIcon(getload_FacBuildUrl(String(a + "_c")), function ($img) {
                        var $rec = _this._baseRender.uiAtlas.getRec(_this._a_3_1.skinName);
                        var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                        UiDraw.cxtDrawImg(ctx, PuiData.PropBg100, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                        ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, $img.width, $img.height);
                        _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                    });
                    // var name = $vo.vo.faction_bz.sp lit(",");
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_20.skinName, "[853d07]" + getBaseName($vo.vo.faction_bz), 16, TextAlign.CENTER);
                    LabelTextFont.writeText(this._topRender.uiAtlas, this._a_19.skinName, 10, 0, $vo.vo.faction_gg ? $vo.vo.faction_gg : "四海之内皆兄弟，欢迎加入我们的大家庭", 16, "#853d07", 180, true);
                }
                else {
                    UiDraw.uiAtlasDrawImg(this._topRender.uiAtlas, this._a_3_1.skinName, UIData.publicUi, PuiData.PropBg100);
                }
            }
        };
        ApplyZhaomuPanel.prototype.getList = function () {
            // var tabary: Array<tb.TB_faction_creat> = tb.TB_faction_creat.getItem();
            NetManager.getInstance().protocolos.faction_getlist(this._currentpage, 5, this._num % 2);
        };
        /**
         * 刷新数据
         */
        ApplyZhaomuPanel.prototype.getDataAndRefresh = function ($data) {
            this._allpage = $data.maxpag == 0 ? 1 : $data.maxpag;
            this._currentpage = $data.curpag;
            this.setvisiableleft_right();
            this.setnum();
            this.applylist.refreshDataByNewData($data.list);
        };
        ApplyZhaomuPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.applylist.top = this.a_18.parent.y / UIData.Scale + this.a_18.y + this.a_18.height;
            this.applylist.left = this.a_18.parent.x / UIData.Scale + this.a_18.x;
        };
        ApplyZhaomuPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.setUiListVisibleByItem(this.BaseUiAry, true);
            this.applylist.show();
            //请求数据
            this.getList();
        };
        ApplyZhaomuPanel.prototype.hide = function () {
            this.setUiListVisibleByItem(this.BaseUiAry, false);
            UIManager.getInstance().removeUIContainer(this);
            this.applylist.hide();
        };
        ApplyZhaomuPanel.prototype.applyJoin = function ($guid) {
            NetManager.getInstance().protocolos.faction_join($guid);
        };
        ApplyZhaomuPanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.btn1:
                    // //console.log("快速加入");
                    NetManager.getInstance().protocolos.faction_fast_join();
                    break;
                case this.b_bg2:
                    // //console.log("申请加入");
                    if (this._selectdata && this._selectdata.data) {
                        var $evt = new faction.FactionEvent(faction.FactionEvent.REFRESHAPPLYZHAOMUlISTISOK_EVENT);
                        $evt.data = this._selectdata;
                        ModuleEventManager.dispatchEvent($evt);
                        this.applyJoin(this._selectdata.data.vo.faction_guid);
                    }
                    else {
                        msgtip.MsgTipManager.outStrById(22, 28);
                    }
                    UIManager.popClikNameFun(this.b_bg2.name, SharedDef.MODULE_FACTION);
                    break;
                case this.a_left1:
                    this._currentpage -= 1;
                    this.getList();
                    break;
                case this.a_right1:
                    this._currentpage += 1;
                    this.getList();
                    break;
                case this.b_01:
                    this._num++;
                    this.getList();
                    break;
                default:
                    break;
            }
        };
        return ApplyZhaomuPanel;
    }(UIVirtualContainer));
    faction.ApplyZhaomuPanel = ApplyZhaomuPanel;
})(faction || (faction = {}));
//# sourceMappingURL=ApplyZhaomuPanel.js.map