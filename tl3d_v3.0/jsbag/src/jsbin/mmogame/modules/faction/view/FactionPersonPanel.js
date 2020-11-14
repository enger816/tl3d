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
    var BtnVo = /** @class */ (function () {
        function BtnVo() {
        }
        return BtnVo;
    }());
    faction.BtnVo = BtnVo;
    var FactionPersonPanel = /** @class */ (function (_super) {
        __extends(FactionPersonPanel, _super);
        function FactionPersonPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            return _this;
        }
        FactionPersonPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            // this._bottomRender.dispose();
            // this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            // this.noticePanel.dispose();
            // this.noticePanel = null;
            // this.recruitingPanel.dispose();
            // this.recruitingPanel = null;
            if (this.personListPanel) {
                this.personListPanel.dispose();
                this.personListPanel = null;
            }
        };
        FactionPersonPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            var renderLevel = this._topRender;
            this.personListPanel = new faction.PersonListPanel();
            this.personListPanel.init($uiAtlas);
            this.initView(renderLevel);
        };
        FactionPersonPanel.prototype.initView = function (renderLevel) {
            var renderLevel = this._topRender;
            this.line_3 = this.addChild(renderLevel.getComponent("line1"));
            this.addUIList(["a_16", "a_15", "line4A1", "line4A2", "line4A3", "line4A4", "line4A5", "line4A6"], renderLevel);
            this.title_2 = this.addEvntButUp("a_zhanli", this._baseRender);
            this.title_0 = this.addEvntButUp("a_zhiwu", this._baseRender);
            this.title_1 = this.addEvntButUp("a_lev", this._baseRender);
            this.title_3 = this.addEvntButUp("a_gx", this._baseRender);
            this.title_4 = this.addEvntButUp("a_huoyue", this._baseRender);
            this.a_paihang = this.addEvntButUp("a_paihang", this._baseRender);
            this.arrayUIcomponent = new Array();
            this.arrayUIcomponent.push(this.title_0);
            this.arrayUIcomponent.push(this.title_1);
            this.arrayUIcomponent.push(this.title_2);
            this.arrayUIcomponent.push(this.title_3);
            this.arrayUIcomponent.push(this.title_4);
            this.refreshUIdata();
            this.arraySelectButton = new Array();
            for (var i = 0; i < 5; i++) {
                var select = this.addChild(renderLevel.getComponent("j_" + i));
                this.arraySelectButton.push(select);
            }
            //右下对齐子面板
            this.bottomLeftPanel = new BottomLeftPanel();
            this.bottomLeftPanel.setRender(this._bgRender, this._bottomRender, this._baseRender, this._topRender);
            this.addVirtualContainer(this.bottomLeftPanel);
            //右对齐面板
            this.rightPanel = new RightPanel();
            this.rightPanel.setRender(this._bgRender, this._bottomRender, this._baseRender, this._topRender, this._redPointRender);
            this.rightPanel.parent = this;
            this.addVirtualContainer(this.rightPanel);
            //任命页面
            // this.appointmentPanel = new AppointmentPanel();
            // this.appointmentPanel.init(this._baseRender.uiAtlas);
            // this.appointmentPanel.parent = this
            //公告页面
            // this.noticePanel = new NoticePanel();
            // this.noticePanel.init(this._baseRender.uiAtlas);
            //招募页面
            // this.recruitingPanel = new RecruitingPanel();
            // this.recruitingPanel.init(this._baseRender.uiAtlas);
            // this.recruitingPanel.parent = this;
            this.resize();
        };
        FactionPersonPanel.prototype.refreshUIdata = function () {
            for (var i = 0; i < this.arrayUIcomponent.length; i++) {
                var btnVo = new BtnVo();
                btnVo.indexselect = false;
                btnVo.index = i;
                this.arrayUIcomponent[i].data = btnVo;
            }
        };
        FactionPersonPanel.prototype.resetUiState = function ($index, $isfirst) {
            var $selectbtn = this.arraySelectButton[$index];
            if (this._lastselect == $index) {
                //点击了同一个
                this.arrayUIcomponent[$index].data.indexselect = !this.arrayUIcomponent[$index].data.indexselect;
            }
            else {
                this._lastselect = $index;
                this.SortType = $index;
                this.setUiListVisibleByItem(this.arraySelectButton, false);
                if (!$selectbtn.parent) {
                    this.addChild($selectbtn);
                }
                this.arrayUIcomponent[$index].data.indexselect = false;
                for (var i = 0; i < 5; i++) {
                    var $ui = this.arrayUIcomponent[i];
                    var aa = "t_" + i + "_0";
                    if ($index == i) {
                        aa = "t_" + i + "_1";
                    }
                    UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this._baseRender.uiAtlas, $ui.skinName, aa);
                }
            }
            $selectbtn.selected = this.arrayUIcomponent[$index].data.indexselect;
            this.SortFlag = $selectbtn.selected;
            this.personListPanel.refreshDataByNewData(GuidData.faction.getFactionListBySortType($index, $selectbtn.selected), $isfirst);
        };
        FactionPersonPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.personListPanel.top = this.line_3.parent.y / UIData.Scale + this.line_3.y + 6;
            this.personListPanel.left = this.line_3.parent.x / UIData.Scale + this.line_3.x - 4;
        };
        FactionPersonPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.personListPanel.show();
            this._lastselect = -1;
            this.rightPanel.resetData();
            this.resetUiState(0, true);
        };
        FactionPersonPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.personListPanel.hide();
        };
        FactionPersonPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.title_0:
                case this.title_1:
                case this.title_2:
                case this.title_3:
                case this.title_4:
                    this.resetUiState(evt.target.data.index, false);
                    break;
                case this.a_paihang:
                    ModulePageManager.openPanel(SharedDef.MODULE_RANK, 2);
                    break;
                default:
                    break;
            }
        };
        return FactionPersonPanel;
    }(UIVirtualContainer));
    faction.FactionPersonPanel = FactionPersonPanel;
    var BottomLeftPanel = /** @class */ (function (_super) {
        __extends(BottomLeftPanel, _super);
        function BottomLeftPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        BottomLeftPanel.prototype.setRender = function ($bgRender, $bottomRender, $base, $topRender) {
            this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._topRender = $topRender;
            this._baseRender = $base;
            this.loadConfigCom();
        };
        BottomLeftPanel.prototype.loadConfigCom = function () {
            this.addChild(this._topRender.getComponent("a_1"));
            this._a_10 = this.addChild(this._topRender.getComponent("a_10")); //在线人数
            this.addChild(this._baseRender.getComponent("b_bg3A1")); //在线人数
            this.initData();
        };
        BottomLeftPanel.prototype.initData = function () {
            this.resetData();
        };
        BottomLeftPanel.prototype.resetData = function () {
            var list = GuidData.faction.getFactionList();
            var isonlinenum = this.getOnlineNum(list);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_10.skinName, isonlinenum + "/" + list.length, 16, TextAlign.CENTER, "#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_10.skinName, , ArtFont.num1, TextAlign.CENTER);
        };
        BottomLeftPanel.prototype.getOnlineNum = function ($list) {
            var num = 0;
            for (var i = 0; i < $list.length; i++) {
                if ($list[i].isOnline) {
                    num++;
                }
            }
            return num;
        };
        BottomLeftPanel.prototype.butClik = function (evt) {
            switch (evt.target.name) {
                default:
                    break;
            }
        };
        return BottomLeftPanel;
    }(UIVirtualContainer));
    faction.BottomLeftPanel = BottomLeftPanel;
    var RightPanel = /** @class */ (function (_super) {
        __extends(RightPanel, _super);
        function RightPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        RightPanel.prototype.setRender = function ($bgRender, $bottomRender, $base, $topRender, $redRender) {
            this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._topRender = $topRender;
            this._baseRender = $base;
            this._redRender = $redRender;
            this.loadConfigCom();
        };
        RightPanel.prototype.loadConfigCom = function () {
            this.addChild(this._bgRender.getComponent("b_bg1"));
            this.addChild(this._topRender.getComponent("x_bg1A1"));
            var x_bg1A2 = this.addChild(this._topRender.getComponent("x_bg1A2"));
            x_bg1A2.isU = true;
            this.addChild(this._baseRender.getComponent("b_bg4"));
            this.addChild(this._baseRender.getComponent("b_bg5"));
            this.addUIList(["a_4", "a_5", "a_6", "a_7", "a_8"], this._topRender);
            this.addUIList(["b_bg3A2", "b_bg3A3", "b_bg3A4", "b_bg3A5"], this._baseRender);
            this.a_3 = this.addChild(this._topRender.getComponent("a_3"));
            this.a_2 = this.addChild(this._topRender.getComponent("a_2")); //name
            this.a_9 = this.addChild(this._topRender.getComponent("a_9")); //公告
            this._a_13 = this.addChild(this._topRender.getComponent("a_13")); //贡献
            this._a_12 = this.addChild(this._topRender.getComponent("a_12")); //资金
            this._a_14 = this.addChild(this._topRender.getComponent("a_14")); //成员数
            this._a_11 = this.addChild(this._topRender.getComponent("a_11")); //等级
            this.b_exit = this.addChild(this._topRender.getComponent("b_exit"));
            this.b_exit.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.aryUIcompenent = new Array();
            this.b_edit = this._topRender.getComponent("b_edit");
            this.b_edit.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.aryUIcompenent.push(this.b_edit);
            this.b_btnbg_zhoamu = this._baseRender.getComponent("b_btnbg_zhoamu");
            this.b_btnbg_zhoamu.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.aryUIcompenent.push(this.b_btnbg_zhoamu);
            // this.aryUIcompenent.push(<UICompenent>this._topRender.getComponent("b_zhaomu"));
            this._redRender.getRedPointUI(this, 62, new Vector2D(this.b_btnbg_zhoamu.x + this.b_btnbg_zhoamu.width, this.b_btnbg_zhoamu.y));
            this.resize();
        };
        RightPanel.prototype.resetFactionLev = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_11.skinName, String(GuidData.faction.getLev()), 16, TextAlign.LEFT, "#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_11.skinName, String(GuidData.faction.getLev()), ArtFont.num3);
        };
        RightPanel.prototype.resetFactionMoney = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_12.skinName, Snum(GuidData.faction.getMoney()), 16, TextAlign.LEFT, "#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_12.skinName, getNumToUnit(GuidData.faction.getMoney()), ArtFont.num3);
        };
        RightPanel.prototype.resetFactionContribution = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_13.skinName, String(GuidData.faction.getFactionForce()), 16, TextAlign.LEFT, "#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_13.skinName, String(GuidData.player.getFactionBG()), ArtFont.num3);
        };
        RightPanel.prototype.resetFactionPlayerNum = function () {
            var lev = GuidData.faction.getLev();
            var tablevo = tb.Tb_faction_base.get_Tb_faction_baseById(lev);
            var list = GuidData.faction.getFactionList();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_14.skinName, list.length + "/" + tablevo.maxnum, 16, TextAlign.LEFT, "#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_14.skinName, list.length + "/" + tablevo.maxnum, ArtFont.num3);
        };
        RightPanel.prototype.resetFactionIcon = function () {
            var _this = this;
            var b = GuidData.faction.getIcon() == 0 ? 1 : GuidData.faction.getIcon();
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String(b)), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.a_3.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_2.skinName, "[853d07]" + getBaseName(GuidData.faction.getName()), 16, TextAlign.CENTER);
        };
        RightPanel.prototype.resetFactionNotice = function () {
            var str = GuidData.faction.getNotice();
            if (str) {
                var ary = str.split("\1");
                if (ary[1].length == 0) {
                    ary[1] = "";
                }
                else {
                    ary[1] = "QQ:" + ary[1];
                }
                if (ary[2].length == 0) {
                    ary[2] = "";
                }
                else {
                    ary[2] = "微信:" + ary[2];
                }
                LabelTextFont.writeText(this._topRender.uiAtlas, this.a_9.skinName, 0, 0, str ? ary[0] + "\n" + ary[1] + "\n" + ary[2] : "", 14, "#853d07", 200, true);
            }
        };
        RightPanel.prototype.resetFactionIdentity = function () {
            if (GuidData.faction.playerIdentity < 4) {
                this.setUiListVisibleByItem(this.aryUIcompenent, true);
            }
            else {
                this.setUiListVisibleByItem(this.aryUIcompenent, false);
            }
            if (GuidData.faction.playerIdentity == 1) {
                this.b_exit.goToAndStop(1);
            }
            else {
                this.b_exit.goToAndStop(0);
            }
        };
        RightPanel.prototype.resetData = function () {
            this.resetFactionIcon();
            this.resetFactionLev();
            this.resetFactionPlayerNum();
            this.resetFactionMoney();
            this.resetFactionContribution();
            this.resetFactionNotice();
            this.resetFactionIdentity();
        };
        RightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        RightPanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.b_btnbg_zhoamu:
                    //点击招募按钮
                    var $factionPersonPanel = this.parent;
                    // $factionPersonPanel.hide();
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONRECRUITING_EVENT));
                    //console.log("--已经发送--");
                    // var $indexUrl: string = window.location.toString();
                    // var $d: number = $indexUrl.indexOf("?");
                    // if ($d != -1) {
                    //     $indexUrl = $indexUrl.substring(0, $d)
                    // }
                    // var $url: string = $indexUrl + "?inviteGuid=" + GuidData.faction.getGuid();
                    // $url = $url.replace("index.html", "login.html");
                    // //console.log("outUrl", $url)
                    // copy2clipboard($url);
                    // alert($url)
                    break;
                case this.b_edit:
                    //点击公告按钮
                    var $factionPersonPanel = this.parent;
                    // $factionPersonPanel.noticePanel.show();
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONNOTICE_EVENT));
                    break;
                case this.b_exit:
                    var $strmsg;
                    if (GuidData.faction.playerIdentity == 1) {
                        $strmsg = "是否解散家族";
                    }
                    else {
                        $strmsg = "是否退出家族";
                    }
                    AlertUtil.show($strmsg, "提示", function (a) {
                        if (a == 1) {
                            NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_QUIT, 0, 0, "", "");
                        }
                    });
                    break;
                default:
                    break;
            }
        };
        RightPanel.prototype.backFun = function (a) {
            if (a == 1) {
                NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_LEVEL_UP, 0, 0, "", "");
            }
        };
        return RightPanel;
    }(UIVirtualContainer));
    faction.RightPanel = RightPanel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionPersonPanel.js.map