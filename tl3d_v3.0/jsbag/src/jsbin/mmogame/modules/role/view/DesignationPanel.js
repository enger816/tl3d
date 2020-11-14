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
var role;
(function (role) {
    var DesignationPanel = /** @class */ (function (_super) {
        __extends(DesignationPanel, _super);
        function DesignationPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            return _this;
        }
        DesignationPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this.gdesignationList) {
                this.gdesignationList.dispose();
                this.gdesignationList = null;
            }
        };
        DesignationPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        DesignationPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this._uiAry = new Array;
            this.c_listindex = this.addChild(renderLevel.getComponent("c_listindex"));
            var bg = this.addChild(this._publicRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "c_coffeeBg", renderLevel);
            this.addChild(this._topRender.getComponent("c_forcebg"));
            this.addChild(this._baseRender.getComponent("c_kuang"));
            this._uiAry.push(this._baseRender.getComponent("c_txtbg0"));
            this._uiAry.push(this._baseRender.getComponent("c_txtbg1"));
            this._uiAry.push(this._baseRender.getComponent("c_line"));
            this._uiAry.push(this._topRender.getComponent("c_txt"));
            this._uiAry.push(this._topRender.getComponent("c_forcebg1"));
            // this.addUIList(["c_kuang", "c_txtbg0", "c_txtbg1", "c_line"], this._baseRender);
            // this.addUIList(["c_txt", "c_forcebg", "c_forcebg1"], this._topRender);
            this.c_titleforce = this.addChild(this._topRender.getComponent("c_titleforce"));
            this.c_tab0 = this.addEvntBut("c_tab0", this._topRender);
            this.c_tab1 = this.addEvntBut("c_tab1", this._topRender);
            //---------右侧面板
            this.c_titlename = this.addChild(this._topRender.getComponent("c_titlename"));
            this.c_force = this.addChild(this._topRender.getComponent("c_force"));
            this.c_timetxt = this.addChild(this._topRender.getComponent("c_timetxt"));
            this._uiAry.push(this.c_titlename);
            this._uiAry.push(this.c_force);
            this._uiAry.push(this.c_timetxt);
            this.AttrAry = new Array;
            for (var i = 0; i < 6; i++) {
                this.AttrAry.push(this.addChild(this._topRender.getComponent("c_attr" + i)));
            }
            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);
            this.BtnAry = new Array;
            this.BtnAry.push(this.cnew_btn1);
            this.BtnAry.push(this._topRender.getComponent("c_btntxt"));
            this.CostAry = new Array;
            this.CostAry.push(this._topRender.getComponent("c_propicon"));
            this.CostAry.push(this._topRender.getComponent("c_propnum"));
            this.CostAry.push(this._topRender.getComponent("c_info"));
            this._redPointRender.getRedPointUI(this, 11, new Vector2D(this.c_tab0.x + this.c_tab0.width - 5, this.c_tab0.y));
            this._redPointRender.getRedPointUI(this, 114, new Vector2D(this.c_tab1.x + this.c_tab1.width - 5, this.c_tab1.y));
            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
            this._publicRender.applyObjData();
        };
        DesignationPanel.prototype.selecttype = function ($value) {
            this.setUiListVisibleByItem(this._uiAry, false);
            this.setUiListVisibleByItem(this.AttrAry, false);
            this.setUiListVisibleByItem(this.BtnAry, false);
            this.setUiListVisibleByItem(this.CostAry, false);
            if (!this.gdesignationList) {
                this.gdesignationList = new GDesignationList();
                this.gdesignationList.init(this._baseRender.uiAtlas);
            }
            if ($value == 0) {
                this.c_tab0.selected = true;
                this.c_tab1.selected = false;
                this.gdesignationList.show(role.TabKey.TabAction);
                // this.rechargePanel.hide();
            }
            else if ($value == 1) {
                this.c_tab1.selected = true;
                this.c_tab0.selected = false;
                this.gdesignationList.show(role.TabKey.Tabdesignation);
                // this.rechargePanel.hide();
            }
            this.resize();
        };
        DesignationPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.gdesignationList) {
                this.gdesignationList.left = this.c_listindex.parent.x / UIData.Scale + this.c_listindex.x;
                this.gdesignationList.top = this.c_listindex.parent.y / UIData.Scale + this.c_listindex.y;
            }
        };
        DesignationPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.selecttype(0);
            this.setAllForce();
            this.resize();
        };
        DesignationPanel.prototype.setAllForce = function () {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this.c_titleforce.skinName, Snum(GuidData.player.getTitleForce()), ArtFont.num57);
        };
        DesignationPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.gdesignationList) {
                this.gdesignationList.hide();
            }
        };
        DesignationPanel.prototype.resetData = function ($data) {
            this.setUiListVisibleByItem(this._uiAry, true);
            this.setUiListVisibleByItem(this.AttrAry, true);
            // this.setUiListVisibleByItem(this.BtnAry,false);
            // this.setUiListVisibleByItem(this.CostAry,false);
            this._vo = $data;
            var attr_id = new Array;
            var attr_val = new Array;
            for (var i = 0; i < $data.data.prop.length; i++) {
                attr_id.push($data.data.prop[i][0]);
                attr_val.push($data.data.prop[i][1]);
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_titlename.skinName, $data.data.name, 16, TextAlign.CENTER, getColorQua($data.data.qua));
            ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this.c_force.skinName, Snum(getForceByAtt(attr_id, attr_val)), ArtFont.num56);
            this.drawAttr($data.data.prop);
            this.drawTime($data.data.limtime);
            this.setUiListVisibleByItem(this.BtnAry, !($data.state == 1 && $data.data.unlock_type == 1));
            this.setUiListVisibleByItem(this.CostAry, $data.state == 1);
            if ($data.state == 1) {
                this.BtnAry[1].goToAndStop(2);
            }
            else if ($data.state == 4) {
                this.BtnAry[1].goToAndStop(0);
            }
            else {
                this.BtnAry[1].goToAndStop(1);
            }
            if ($data.data.unlock_type == 1) {
                UiDraw.clearUI(this.CostAry[0]);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.CostAry[1].skinName, "<激活条件>", 16, TextAlign.CENTER, ColorType.color9a683f);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.CostAry[2].skinName, $data.data.getinfo, 16, TextAlign.CENTER, ColorType.color2daa35);
            }
            else {
                UiDraw.clearUI(this.CostAry[2]);
                IconManager.getInstance().drawItemIcon40(this.CostAry[0], $data.data.unlock_cost[0][0]);
                this._canbuy = UiDraw.drawResHasNumAndAllNum(this.CostAry[1], $data.data.unlock_cost[0]);
            }
            //红点逻辑
            if ($data.state == 1 && $data.node.show) {
                this._btnRedPoint.preShow();
            }
            else {
                this._btnRedPoint.preHide();
            }
        };
        DesignationPanel.prototype.drawAttr = function ($attrary) {
            for (var i = 0; i < this.AttrAry.length; i++) {
                if ($attrary.length - 1 < i) {
                    UiDraw.clearUI(this.AttrAry[i]);
                }
                else {
                    UiDraw.drawAttVal(this.AttrAry[i], $attrary[i][0], $attrary[i][1], TextAlign.CENTER);
                }
            }
        };
        DesignationPanel.prototype.drawTime = function ($minutes) {
            if ($minutes == 0) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_timetxt.skinName, "有效时间：无期限", 16, TextAlign.CENTER, ColorType.colorce0a00);
            }
            else {
                this.drawlimtime();
            }
        };
        DesignationPanel.prototype.drawlimtime = function () {
            var str = "";
            if (this._vo.state == 1) {
                //未获得时，显示这个称号的时效
                var a = this.getTimeAry(this._vo.data.limtime);
                str = "有效时间：" + a[0] + "天" + a[1] + "小时" + a[2] + "分钟";
            }
            else {
                //已获得时，显示这个称号剩余时间
                var $ts = GameInstance.getServerNow();
                var $sever = new Date($ts * 1000);
                var time = Math.floor((this._vo.time - Math.floor($sever.getTime() / 1000)) / 60);
                var b = this.getTimeAry(time);
                str = "剩余时间：" + b[0] + "天" + b[1] + "小时" + b[2] + "分钟";
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_timetxt.skinName, str, 14, TextAlign.CENTER, ColorType.colorce0a00);
        };
        DesignationPanel.prototype.getTimeAry = function ($min) {
            var _date;
            var _hour;
            var _min;
            var _ary = new Array;
            var $hour = $min / 60;
            if ($hour >= 24) {
                //大于一天
                _date = Math.floor($hour / 24) + 1;
                // $hour = $hour - (_date * 24);
                // _hour = Math.floor($hour);
                // $hour = $hour - _hour;
                // _min = Math.floor($hour * 60);
                _hour = 0;
                _min = 0;
            }
            else if ($hour < 1) {
                //不足1小时
                _date = 0;
                _hour = 0;
                _min = $min + 1;
            }
            else {
                //显示小时
                _date = 0;
                _hour = Math.floor($hour + 1);
                // $hour = $hour - _hour;
                // _min = Math.floor($hour * 60);
                _min = 0;
            }
            _ary.push(_date);
            _ary.push(_hour);
            _ary.push(_min);
            return _ary;
        };
        DesignationPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_tab0:
                    this.selecttype(0);
                    break;
                case this.c_tab1:
                    this.selecttype(1);
                    break;
                case this.cnew_btn1:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this._vo) {
                        if (this._vo.state == 3 || this._vo.state == 2) {
                            NetManager.getInstance().protocolos.set_title(this._vo.data.id);
                        }
                        else if (this._vo.state == 4) {
                            NetManager.getInstance().protocolos.set_title(0);
                        }
                        else if (this._vo.state == 1) {
                            if (this._canbuy) {
                                NetManager.getInstance().protocolos.unlock_title(this._vo.data.id);
                            }
                            else {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                $aaa.data = this._vo.data.unlock_cost[0][0];
                                ModuleEventManager.dispatchEvent($aaa);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        };
        return DesignationPanel;
    }(UIVirtualContainer));
    role.DesignationPanel = DesignationPanel;
    /**
     * DesignationList
     */
    var GDesignationList = /** @class */ (function (_super) {
        __extends(GDesignationList, _super);
        function GDesignationList() {
            var _this = _super.call(this) || this;
            _this.left = 222;
            _this.top = 83;
            return _this;
        }
        GDesignationList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        GDesignationList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, GDesignationListRender, 400, 422, 200, 85, 5, 512, 1024, 2, 7);
        };
        GDesignationList.prototype.selectDataToIndex = function () {
            this.refreshDataByNewData();
            this.setSelectIndex(this.getCurrentSelectIndex());
        };
        GDesignationList.prototype.refreshDataByNewData = function () {
            //通过type，获得所对应的列表
            this._aryList = role.RoleModel.getInstance().getListByTab(this.type);
            var $sListItemData = this.getData(this._aryList);
            this.refreshData($sListItemData);
        };
        GDesignationList.prototype.getData = function ($ary) {
            var a = this.type == role.TabKey.TabAction ? 12 : 115;
            var nodeList = RedPointManager.getInstance().getNodeByID(a).children;
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                // nodeList[i].data = $ary[i];
                $ary[i].node = nodeList[i];
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        GDesignationList.prototype.show = function ($value) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            // if (this.type == $value) {
            //     return;
            // }
            this.type = $value;
            this.selectDataToIndex();
        };
        GDesignationList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return GDesignationList;
    }(SList));
    role.GDesignationList = GDesignationList;
    var GDesignationListRender = /** @class */ (function (_super) {
        __extends(GDesignationListRender, _super);
        function GDesignationListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GDesignationListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Tab = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tab", 0, 1, 193, 82);
            $container.addChild(this.Tab);
            this.Tab.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.RedPoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RedPoint", 176, 3, 17, 16);
            this.RedPoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RedPoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        Object.defineProperty(GDesignationListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (val) {
                    var bb = new role.RoleUiEvent(role.RoleUiEvent.SHOWVIEW_Designation_EVENT);
                    bb.data = this.itdata;
                    ModuleEventManager.dispatchEvent(bb);
                    var vo = this.itdata.data;
                    if (vo.state == 2) {
                        NetManager.getInstance().protocolos.init_title(vo.data.id);
                    }
                }
                this.applyrender();
            },
            enumerable: true,
            configurable: true
        });
        GDesignationListRender.prototype.drawDesignation = function () {
            var _this = this;
            var vo = this.itdata.data;
            LoadManager.getInstance().load(Scene_data.fileRoot + getUItittleUrl(String(vo.data.id)), LoadManager.IMG_TYPE, function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.Tab.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.TITLEBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                var ratio = Math.min(($rec.pixelWitdh / $img.width), ($rec.pixelHeight / $img.height));
                ctx.drawImage($img, 0, 0, $img.width, $img.height, ($rec.pixelWitdh / 2) - ($img.width * ratio / 2), ($rec.pixelHeight / 2) - ($img.height * ratio / 2), $img.width * ratio, $img.height * ratio);
                // LabelTextFont.writeSingleLabelToCtx(ctx, vo.tabdata.name, 16, $rec.pixelWitdh / 2, $rec.pixelHeight / 2 - 8, TextAlign.CENTER, DesignationModel.getInstance().getColorQua(vo.tabdata.qua));
                if (vo.state == 1) {
                    //遮罩
                    UiDraw.cxtDrawImg(ctx, PuiData.MASK, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                }
                else if (vo.state == 2) {
                    UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(172, 5, 17, 16), UIData.publicUi);
                }
                else if (vo.state == 4) {
                    var baseRec = _this.parentTarget.baseAtlas.getRec("outfit");
                    ctx.drawImage(_this.parentTarget.baseAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, baseRec.pixelWitdh, baseRec.pixelHeight);
                }
                if (_this.selected) {
                    UiDraw.cxtDrawImg(ctx, PuiData.TITLEHIGHT, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                }
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        GDesignationListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                if (this.itdata.data.node) {
                    this.itdata.data.node.bindUI(this.RedPoint);
                }
                this.drawDesignation();
            }
        };
        GDesignationListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        GDesignationListRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        };
        GDesignationListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Tab);
            this.RedPoint.preHide();
        };
        return GDesignationListRender;
    }(SListItem));
    role.GDesignationListRender = GDesignationListRender;
})(role || (role = {}));
//# sourceMappingURL=DesignationPanel.js.map