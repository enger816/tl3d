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
    var RecruitingPanel = /** @class */ (function (_super) {
        __extends(RecruitingPanel, _super);
        function RecruitingPanel() {
            var _this = _super.call(this) || this;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._AtopRender1 = new UIRenderComponent;
            _this._BtopRender1 = new UIRenderComponent;
            _this._BtopRender2 = new UIRenderComponent;
            _this._BtopRender3 = new UIRenderComponent;
            _this.ARenderList = new Array;
            _this.ARenderList.push(_this._AtopRender1);
            _this.BRenderList = new Array;
            _this.BRenderList.push(_this._BtopRender1);
            _this.BRenderList.push(_this._BtopRender2);
            _this.BRenderList.push(_this._BtopRender3);
            return _this;
        }
        RecruitingPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            if (this.shengpiPanel) {
                this.shengpiPanel.dispose();
                this.shengpiPanel = null;
            }
            if (this.zhaomuSettingPanel) {
                this.zhaomuSettingPanel.dispose();
                this.zhaomuSettingPanel = null;
            }
            if (this.applyFactionList) {
                this.applyFactionList.dispose();
                this.applyFactionList = null;
            }
            _super.prototype.dispose.call(this);
        };
        RecruitingPanel.prototype.applyLoad = function () {
            var _this = this;
            this._bgRender.uiAtlas = new UIAtlas();
            this._bgRender.uiAtlas.setInfo("ui/uidata/faction/zhaomu/recruiting.xml", "ui/uidata/faction/zhaomu/recruiting.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
        };
        RecruitingPanel.prototype.loadConfigCom = function () {
            this._AtopRender1.uiAtlas = this._bgRender.uiAtlas;
            this._BtopRender1.uiAtlas = this._bgRender.uiAtlas;
            this._BtopRender2.uiAtlas = this._bgRender.uiAtlas;
            this._BtopRender3.uiAtlas = this._bgRender.uiAtlas;
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this.tab_shenpi = this.addEvntBut("tab_shenpi", this._bgRender);
            this.tab_zhaosetting = this.addEvntBut("tab_zhaomu", this._bgRender);
            this.addChild(this._bgRender.getComponent("a_5"));
            this.no = this.addChild(this._bgRender.getComponent("no"));
            var bg3 = this.addChild(this._publicbgRender.getComponent("cnew_infobg"));
            this.setSizeForPanelUiCopy(bg3, "g_bg_2", this._bgRender);
            //审批列表
            this.shengpiPanel = new ShenpiPanel();
            this.shengpiPanel.setRender(this._AtopRender1, this._publicbgRender);
            this.addVirtualContainer(this.shengpiPanel);
            //招募设置
            this.zhaomuSettingPanel = new ZhaomuSettingPanel();
            this.zhaomuSettingPanel.setRender(this._BtopRender1, this._BtopRender2, this._BtopRender3, this._publicbgRender);
            this.zhaomuSettingPanel.parent = this;
            this.addVirtualContainer(this.zhaomuSettingPanel);
            this.applyLoadComplete();
        };
        RecruitingPanel.prototype.selecttype = function ($value) {
            if ($value == 0) {
                this.tab_shenpi.selected = true;
                this.tab_zhaosetting.selected = false;
                this.renderSetVisibel(this.ARenderList, true);
                this.renderSetVisibel(this.BRenderList, false);
                if (!this.applyFactionList) {
                    this.applyFactionList = new faction.ApplyFactionList();
                    this.applyFactionList.init(this._bgRender.uiAtlas);
                }
                this.applyFactionList.show();
            }
            else {
                this.tab_zhaosetting.selected = true;
                this.tab_shenpi.selected = false;
                this.renderSetVisibel(this.BRenderList, true);
                this.renderSetVisibel(this.ARenderList, false);
                if (this.applyFactionList) {
                    this.applyFactionList.hide();
                }
            }
            this.selectdata($value);
        };
        RecruitingPanel.prototype.selectdata = function ($value) {
            if (this._type == $value)
                return;
            this._type = $value;
            //处理逻辑
            if (this.shengpiPanel) {
                this.shengpiPanel.setSelect(!$value);
            }
            if (this.zhaomuSettingPanel) {
                this.zhaomuSettingPanel.setSelect($value != 0);
            }
            this.resize();
        };
        RecruitingPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.applyFactionList) {
                this.applyFactionList.left = this.no.parent.x / UIData.Scale + this.no.x;
                this.applyFactionList.top = this.no.parent.y / UIData.Scale + this.no.y;
            }
        };
        RecruitingPanel.prototype.show = function () {
            //console.log("-----招募页面");
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.selecttype(0);
        };
        RecruitingPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
                this.applyFactionList.hide();
            }
            // var $factionPersonPanel: FactionPersonPanel = <FactionPersonPanel>this.parent;
            // $factionPersonPanel.show();
        };
        RecruitingPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
                case this.tab_shenpi:
                    this.selecttype(0);
                    break;
                case this.tab_zhaosetting:
                    this.selecttype(1);
                    break;
                default:
                    break;
            }
        };
        //服务端限制等级
        RecruitingPanel.ServerMaxLev = 60;
        return RecruitingPanel;
    }(WindowCentenMin));
    faction.RecruitingPanel = RecruitingPanel;
    var ShenpiPanel = /** @class */ (function (_super) {
        __extends(ShenpiPanel, _super);
        function ShenpiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            return _this;
        }
        ShenpiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
        };
        ShenpiPanel.prototype.setRender = function ($bgRender, $publicbgUiAtlas) {
            this._bgRender = $bgRender;
            this._publicRender = $publicbgUiAtlas;
            this.loadConfigCom();
        };
        ShenpiPanel.prototype.loadConfigCom = function () {
            this.addUIList(["a_19", "a_20", "a_18", "a_17", "line_4", "line_2_7", "line_2_8", "line_2_9", "a_23", "a_22"], this._bgRender);
            this._uiAry = new Array;
            this.b_btnbg_no = this.addEvntBut("cnew_but_no", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_no, "b_btnbg_no", this._bgRender);
            this._uiAry.push(this.b_btnbg_no);
            this.b_btnbg_ok = this.addEvntBut("cnew_but_yes", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_ok, "b_btnbg_ok", this._bgRender);
            this._uiAry.push(this.b_btnbg_ok);
        };
        ShenpiPanel.prototype.setSelect = function ($flag) {
            this.setUiListVisibleByItem(this._uiAry, $flag);
        };
        ShenpiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_btnbg_no:
                    // //console.log("全部拒绝");
                    NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_REFUSE_JOIN_ALL, 0, 0, "", "");
                    break;
                case this.b_btnbg_ok:
                    // //console.log("全部同意");
                    NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_AGREE_JOIN_ALL, 0, 0, "", "");
                    break;
                default:
                    break;
            }
        };
        return ShenpiPanel;
    }(UIVirtualContainer));
    faction.ShenpiPanel = ShenpiPanel;
    var ZhaomuSettingPanel = /** @class */ (function (_super) {
        __extends(ZhaomuSettingPanel, _super);
        function ZhaomuSettingPanel() {
            var _this = _super.call(this) || this;
            //控件a_17的偏移量
            _this._tx1 = 3;
            //控件b_txt的偏移量
            _this._tx2 = 0;
            _this._lastMouseX = 0;
            _this._lastMcX = 0;
            _this._percentage = 0;
            _this._msgTxt = "在此输入文字（50）";
            _this._type = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            return _this;
        }
        ZhaomuSettingPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
        };
        ZhaomuSettingPanel.prototype.setRender = function ($bgRender, $bottomRender, $base, $publicbgUiAtlas) {
            this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._baseRender = $base;
            this._publicRender = $publicbgUiAtlas;
            this.loadConfigCom();
        };
        ZhaomuSettingPanel.prototype.loadConfigCom = function () {
            var renderLevel = this._baseRender;
            this.b_selectbtn = this.addChild(renderLevel.getComponent("b_selectbtn"));
            this.a_33 = this.addChild(renderLevel.getComponent("a_33"));
            this.a_25 = this.addEvntBut("a_25", renderLevel);
            this.a_37 = this.addChild(renderLevel.getComponent("a_37"));
            this.minlev = this.addChild(renderLevel.getComponent("a_35"));
            this.maxlev = this.addChild(renderLevel.getComponent("a_36"));
            this.a_26 = this.addChild(this._bottomRender.getComponent("a_26"));
            this.a_27 = this.addChild(this._bgRender.getComponent("a_27"));
            this.a_32 = this.addChild(this._bgRender.getComponent("a_32"));
            this.addUIList(["c_4", "c_3"], this._bottomRender);
            this.addUIList(["a_24_1", "a_24_2"], this._bgRender);
            this.addUIList(["a_28", "a_29", "a_34", "a_30"], renderLevel);
            this._aryUI = new Array;
            this.b_bg5 = this.addEvntBut("cnew_txtbg", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_bg5, "b_bg5", this._bottomRender);
            this._aryUI.push(this.b_bg5);
            this.b_btnbg_sure = this.addEvntBut("cnew_but_yes", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_sure, "b_btnbg_sure", this._bottomRender);
            this._aryUI.push(this.b_btnbg_sure);
            // this.initData();
        };
        ZhaomuSettingPanel.prototype.initData = function () {
            // ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.minlev.skinName, String(1), ArtFont.num10, TextAlign.CENTER);
            // ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.maxlev.skinName, String(RecruitingPanel.ServerMaxLev), ArtFont.num10, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.minlev.skinName, String(1), 16, TextAlign.CENTER, ColorType.Orange853d07);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.maxlev.skinName, String(RecruitingPanel.ServerMaxLev), 16, TextAlign.CENTER, ColorType.Orange853d07);
            //初始化宣言面板
            var zmgg = GuidData.faction.getZhaomuGG();
            if (zmgg && zmgg.length > 0) {
                this._msgTxt = zmgg;
                this._type = true;
            }
            this.refreshInputBfun(this._msgTxt, this._type);
            //初始化审批按钮
            this.b_selectbtn.selected = GuidData.faction.getAutoJoin();
            //初始化进度条
            this._currentLev = GuidData.faction.getJoinLimtLev();
            this._percentage = GuidData.faction.getJoinLimtLev() / RecruitingPanel.ServerMaxLev;
            this.drawProbar(this._percentage);
            this.setPercentage(this._currentLev);
            this.setcoordinates();
        };
        ZhaomuSettingPanel.prototype.setSelect = function ($flag) {
            this.setUiListVisibleByItem(this._aryUI, $flag);
            this.initData();
        };
        ZhaomuSettingPanel.prototype.setcoordinates = function () {
            //最大宽度
            var $w2 = this.a_27.width - this.a_25.width;
            this.a_25.x = this._percentage * $w2 + this.a_27.x;
            this.a_32.x = this.a_25.x - this._tx1;
            this.a_33.x = this.a_25.x - this._tx2;
        };
        ZhaomuSettingPanel.prototype.A_left_bg_MouseDown = function (evt) {
            this._lastMouseX = evt.x;
            this._lastMcX = this.a_25.x;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        ZhaomuSettingPanel.prototype.A_left_bg_MouseMove = function (evt) {
            //移动的时候重绘圆形的坐标，但是要判断其是否超出范围
            //起始位置
            var $posx = this.a_27.x;
            //终点位置
            var $disx = this.a_27.x + this.a_27.width - this.a_25.width;
            //按钮当前位置
            var $distion = this._lastMcX + (evt.x - this._lastMouseX) / UIData.Scale;
            //最大宽度
            var $w2 = this.a_27.width - this.a_25.width;
            if ($disx > $distion
                && $posx < $distion) {
                this.a_25.x = $distion;
                this.a_32.x = $distion - this._tx1;
                this.a_33.x = $distion - this._tx2;
            }
            else {
                if (this.a_25.x < $posx) {
                    this.a_25.x = $posx;
                    this.a_32.x = $posx - this._tx1;
                    this.a_33.x = $posx - this._tx2;
                }
                if (this.a_25.x > $disx) {
                    this.a_25.x = $disx;
                    this.a_32.x = $disx - this._tx1;
                    this.a_33.x = $disx - this._tx2;
                }
            }
            //绘制进度
            this._percentage = (this.a_25.x - this.a_27.x) / $w2;
            this.drawProbar(this._percentage);
            this._currentLev = Math.ceil(this._percentage * RecruitingPanel.ServerMaxLev);
            this.setPercentage(this._currentLev);
        };
        ZhaomuSettingPanel.prototype.drawProbar = function ($ratio) {
            if ($ratio == 0) {
                $ratio = 0.01;
            }
            this.a_26.uvScale = $ratio;
            // var $rec: UIRectangle = this._bottomRender.uiAtlas.getRec(this.a_26.skinName);
            // var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            // var progress_bar: UIRectangle = this._bottomRender.uiAtlas.getRec("progress_bar")
            // ctx.drawImage(this._bottomRender.uiAtlas.useImg, progress_bar.pixelX, progress_bar.pixelY, progress_bar.pixelWitdh * $ratio, progress_bar.pixelHeight, 0, 0, 329 * $ratio, 11);
            // this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        ZhaomuSettingPanel.prototype.A_left_bg_MouseUp = function (evt) {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        ZhaomuSettingPanel.prototype.setPercentage = function ($num) {
            // ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_33.skinName, $num == 0 ? String(1) : String($num), ArtFont.num3, TextAlign.CENTER)
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_33.skinName, $num == 0 ? String(1) : String($num), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
        };
        ZhaomuSettingPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.a_25:
                    //拖动条事件
                    this.A_left_bg_MouseDown(evt);
                    break;
                case this.b_bg5:
                    //文本框监听事件  
                    InputPanel.show(function ($str) { _this.inputBfun($str); }, this._type ? this._msgTxt : "", 0, 50);
                    break;
                case this.b_btnbg_sure:
                    //提交按钮事件
                    if (this.dataChangFlag()) {
                        //设置改变，则提交，否则不提交
                        var str;
                        if (this._msgTxt == "在此处输入文字（50）" || this._msgTxt == "") {
                            str = "";
                        }
                        else {
                            str = this._msgTxt;
                        }
                        var byte = new ByteArray();
                        byte.writeUTF(str);
                        if (byte.length > 100) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "字符太长", 99);
                            return;
                        }
                        NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_RECRUIT, this.b_selectbtn.selected ? 1 : 0, this._currentLev, str, "");
                    }
                    var $recruitingPanel = this.parent;
                    $recruitingPanel.hide();
                    break;
                default:
                    break;
            }
        };
        ZhaomuSettingPanel.prototype.dataChangFlag = function () {
            if (this.b_selectbtn.selected != GuidData.faction.getAutoJoin()) {
                return true;
            }
            if (this._msgTxt != GuidData.faction.getZhaomuGG()) {
                return true;
            }
            if (GuidData.faction.getJoinLimtLev() != this._currentLev) {
                return true;
            }
            return false;
        };
        ZhaomuSettingPanel.prototype.inputBfun = function ($str) {
            if ($str.length > 0) {
                this._type = true;
                this._msgTxt = $str;
            }
            else {
                this._type = false;
                this._msgTxt = "在此处输入文字（50）";
            }
            this.refreshInputBfun(this._msgTxt, this._type);
        };
        ZhaomuSettingPanel.prototype.refreshInputBfun = function ($str, $type) {
            LabelTextFont.writeText(this._bgRender.uiAtlas, this.a_37.skinName, 10, 5, $str, 16, $type ? "#853d07" : "#853d07", 320, true);
        };
        return ZhaomuSettingPanel;
    }(UIVirtualContainer));
    faction.ZhaomuSettingPanel = ZhaomuSettingPanel;
})(faction || (faction = {}));
//# sourceMappingURL=RecruitingPanel.js.map