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
var mountui;
(function (mountui) {
    var MountSkill = /** @class */ (function (_super) {
        __extends(MountSkill, _super);
        function MountSkill() {
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
            return _this;
        }
        MountSkill.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        MountSkill.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        MountSkill.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.t_listadjust = this.addChild(renderLevel.getComponent("t_listadjust"));
        };
        MountSkill.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
            if (this.mountSkillList) {
                this.mountSkillList.left = this.t_listadjust.parent.x / UIData.Scale + this.t_listadjust.x;
                this.mountSkillList.top = this.t_listadjust.parent.y / UIData.Scale + this.t_listadjust.y;
            }
        };
        MountSkill.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.parent.setAvatar();
            if (!this.mountSkillList) {
                this.mountSkillList = new MountSkillList();
                this.mountSkillList.init(this._baseRender.uiAtlas);
            }
            this.mountSkillList.show();
            this.resize();
        };
        MountSkill.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.mountSkillList) {
                this.mountSkillList.hide();
            }
        };
        MountSkill.prototype.resetData = function () {
        };
        MountSkill.prototype.butClik = function (evt) {
            switch (evt.target) {
                default:
                    break;
            }
        };
        return MountSkill;
    }(UIVirtualContainer));
    mountui.MountSkill = MountSkill;
    var MountSkillList = /** @class */ (function (_super) {
        __extends(MountSkillList, _super);
        function MountSkillList() {
            var _this = _super.call(this) || this;
            _this.left = 608;
            _this.top = 83;
            return _this;
        }
        MountSkillList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        MountSkillList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, MountSkillListRender, 254, 432, 0, 90, 4, 512, 512, 1, 7, 2);
        };
        MountSkillList.prototype.refreshDataByNewData = function () {
            var nodeList = RedPointManager.getInstance().getNodeByID(33).children;
            var a = mountui.NewMountModel.getInstance().getSkillList();
            for (var i = 0; i < this._itemDataList.length; i++) {
                nodeList[i].data = a[i];
                a[i].node = nodeList[i];
                this._itemDataList[i].data = a[i];
            }
            this.refreshDraw();
            // this.setSelectIndexCopy(this.getCurrentSelectIndex());
            this.setSelectIndex(this.getCurrentSelectIndex());
        };
        MountSkillList.prototype.getData = function ($data) {
            var ary = new Array;
            var nodeList = RedPointManager.getInstance().getNodeByID(33).children;
            for (var i = 0; i < $data.length; i++) {
                nodeList[i].data = $data[i];
                $data[i].node = nodeList[i];
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        MountSkillList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._itemDataList = this.getData(mountui.NewMountModel.getInstance().getSkillList());
            this.refreshData(this._itemDataList);
            // this.setSelectIndexCopy(this.getCurrentSelectIndex());
            this.setSelectIndex(this.getCurrentSelectIndex());
        };
        MountSkillList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return MountSkillList;
    }(SList));
    mountui.MountSkillList = MountSkillList;
    var MountSkillListRender = /** @class */ (function (_super) {
        __extends(MountSkillListRender, _super);
        function MountSkillListRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._canclick = true;
            return _this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        MountSkillListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var cententRender = this._customRenderAry[0];
            var topRender = this._customRenderAry[1];
            this.UnlockBg = this.creatGrid9SUI(cententRender, this.parentTarget.baseAtlas, "UnlockBg", 0, 0, 254, 86, 15, 15);
            $container.addChild(this.UnlockBg);
            this.Sname = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Sname", 94, 18, 120, 20);
            $container.addChild(this.Sname);
            this.Scost = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Scost", 94, 41, 110, 35);
            $container.addChild(this.Scost);
            this.Sselect1 = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Sselect1", 0, 0, 254, 86, 15, 15);
            $container.addChild(this.Sselect1);
            this.Sselect1.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Sbtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sbtn", 217, 28, 30, 30);
            $container.addChild(this.Sbtn);
            this.Sbtn.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Sicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sicon", 13, 9, 68, 68);
            $container.addChild(this.Sicon);
            this.Redpoint = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Redpoint", 237, 0, 17, 16);
            this.Redpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Redpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        Object.defineProperty(MountSkillListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            // private drawIcon(): void {
            //     var $vo: MountSkillData = this.itdata.data
            //     IconManager.getInstance().getIcon(getSkillIconUrl(String($vo.tab.icon)),
            //         ($img: any) => {
            //             var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Sicon.skinName);
            //             var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            //             ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            //             this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            //         });
            // }
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyrender();
                }
                if (val) {
                    // var $evt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SELECT_ITEM_EVENT);
                    // $evt.data = this.itdata;
                    // ModuleEventManager.dispatchEvent($evt);
                }
            },
            enumerable: true,
            configurable: true
        });
        MountSkillListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                if ($vo.node) {
                    $vo.node.bindUI(this.Redpoint);
                }
                if (this.selected) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect1.skinName, UIData.publicUi, PuiData.Slist_select);
                }
                else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect1.skinName, UIData.publicUi, PuiData.Slist_nselect);
                }
                // this.drawIcon();
                var skilllev = 1;
                if ($vo.state == 2) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, "坐骑" + $vo.lev + "阶解锁", 16, TextAlign.RIGHT, ColorType.Yellowffecc6);
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.UnlockBg.skinName, UIData.publicUi, PuiData.MASK);
                    LabelTextFont.clearLabel(this.uiAtlas, this.Sbtn.skinName);
                    LabelTextFont.clearLabel(this.uiAtlas, this.Scost.skinName);
                }
                else {
                    skilllev = $vo.lev;
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tab.name + "  Lv" + $vo.lev, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                    LabelTextFont.clearLabel(this.uiAtlas, this.UnlockBg.skinName);
                    if ($vo.state == 1) {
                        LabelTextFont.clearLabel(this.uiAtlas, this.Sbtn.skinName);
                        LabelTextFont.writeSingleLabel(this.uiAtlas, this.Scost.skinName, "技能等级已满", 14, TextAlign.LEFT, ColorType.Green2ca937);
                    }
                    else {
                        this._canbuy = UiDraw.drawRewardIconAndtxt(this.Scost, $vo.tabskill_uplev.uplevel_cost[0], true, TextAlign.LEFT, 10);
                        UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sbtn.skinName, UIData.publicUi, PuiData.BTNADD);
                    }
                }
                IconManager.getInstance().drawCircleIcon(this.Sicon, 2, $vo.tab.id, false, skilllev);
            }
        };
        MountSkillListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        MountSkillListRender.prototype.refreshDraw = function () {
            this.render(this.itdata);
        };
        MountSkillListRender.prototype.equClick = function (evt) {
            var _this = this;
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                switch (evt.target) {
                    case this.Sselect1:
                        //选中，事件派发
                        this.setSelect();
                        break;
                    case this.Sbtn:
                        UiTweenScale.getInstance().changeButSize(evt.target);
                        if (this.itdata.data.state == 0) {
                            if (this._canclick) {
                                this._canclick = false;
                                TimeUtil.addTimeOut(btnClickTime, function () {
                                    _this._canclick = true;
                                });
                                if (this._canbuy) {
                                    if (GuidData.player.getLevel() <= this.itdata.data.lev) {
                                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不能大于人物等级", 99);
                                        return;
                                    }
                                    NetManager.getInstance().protocolos.raise_base_spell(SharedDef.RAISE_MOUNT_SKILL, this.itdata.data.tab.id);
                                }
                                else {
                                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                    $aaa.data = this.itdata.data.tabskill_uplev.uplevel_cost[0][0];
                                    ModuleEventManager.dispatchEvent($aaa);
                                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                                }
                            }
                            else {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        MountSkillListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.UnlockBg);
            UiDraw.clearUI(this.Sname);
            UiDraw.clearUI(this.Scost);
            UiDraw.clearUI(this.Sbtn);
            UiDraw.clearUI(this.Sselect1);
            UiDraw.clearUI(this.Sicon);
            this.Redpoint.preHide();
        };
        return MountSkillListRender;
    }(SListItem));
    mountui.MountSkillListRender = MountSkillListRender;
})(mountui || (mountui = {}));
//# sourceMappingURL=MountSkill.js.map