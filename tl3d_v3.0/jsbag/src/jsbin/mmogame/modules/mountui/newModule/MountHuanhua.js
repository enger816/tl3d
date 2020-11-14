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
    var MountHuanhua = /** @class */ (function (_super) {
        __extends(MountHuanhua, _super);
        function MountHuanhua() {
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
        MountHuanhua.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
        };
        MountHuanhua.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        MountHuanhua.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.attrary = new Array;
            for (var i = 0; i < 7; i++) {
                this.attrary.push(this.addChild(this._topRender.getComponent("h_attr" + i)));
            }
            this.h_btntxt = this.addChild(this._topRender.getComponent("h_btntxt"));
            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);
            this._publicRender.applyObjData();
            this.actionary = new Array;
            this.actionary.push(renderLevel.getComponent("h_item"));
            this.actionary.push(renderLevel.getComponent("h_itemname"));
            this.actionary.push(renderLevel.getComponent("h_itemnum1"));
            this.addUIList(["h_line2", "h_titlebg"], renderLevel);
            this.addUIList(["h_forcetxt", "h_title"], this._topRender);
            this.h_force = this.addChild(this._topRender.getComponent("h_force"));
            this.h_listadjust = this.addChild(renderLevel.getComponent("h_listadjust"));
            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
        };
        MountHuanhua.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.huanhuaList) {
                this.huanhuaList.left = this.h_listadjust.parent.x / UIData.Scale + this.h_listadjust.x;
                this.huanhuaList.top = this.h_listadjust.parent.y / UIData.Scale + this.h_listadjust.y;
            }
        };
        MountHuanhua.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.huanhuaList) {
                this.huanhuaList = new HuanhuaList();
                this.huanhuaList.init(this._baseRender.uiAtlas);
            }
            this.huanhuaList.show();
            this.resize();
        };
        MountHuanhua.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.huanhuaList) {
                this.huanhuaList.hide();
            }
        };
        MountHuanhua.prototype.resetData = function ($data) {
            this._data = $data;
            this.drawResItem();
            this.showAttr();
            var force = getForceByAtt($data.tab.prosKeys, $data.tab.prosValues);
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.h_force.skinName, Snum(force), ArtFont.num56);
            var srt;
            if (this._data.state == 1) {
                srt = 0;
            }
            else if (this._data.state == 0) {
                srt = 1;
            }
            else {
                srt = 2;
            }
            //console.log("---srt---", srt);
            this.h_btntxt.goToAndStop(srt);
            this.parent.setHuanHuaAvatar($data.tab.mountID, $data.tab.name);
            if ($data.node.show) {
                this._btnRedPoint.preShow();
            }
            else {
                this._btnRedPoint.preHide();
            }
        };
        MountHuanhua.prototype.drawResItem = function () {
            this.setUiListVisibleByItem(this.actionary, this._data.state == 1);
            if (this._data.state == 1) {
                var itemary;
                if (this._data.tab.costItem && this._data.tab.costItem.length > 0) {
                    itemary = this._data.tab.costItem;
                }
                if (this._data.tab.costResource && this._data.tab.costResource.length > 0) {
                    itemary = this._data.tab.costResource;
                }
                IconManager.getInstance().drawItemIcon60(this.actionary[0], itemary[0][0]);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.actionary[1].skinName, GameData.getPropName(itemary[0][0]), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this._canbuy = UiDraw.drawResHasNumAndAllNum(this.actionary[2], itemary[0]);
            }
        };
        MountHuanhua.prototype.showAttr = function () {
            //绘制当前属性
            for (var i = 0; i < this.attrary.length; i++) {
                if (this._data.tab.prosKeys.length - 1 < i) {
                    this.setUiListVisibleByItem([this.attrary[i]], false);
                }
                else {
                    UiDraw.drawAttVal(this.attrary[i], this._data.tab.prosKeys[i], this._data.tab.prosValues[i]);
                }
            }
        };
        MountHuanhua.prototype.butClik = function (evt) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.cnew_btn1:
                    if (this._data.state == 1) {
                        //未激活
                        var flag;
                        var itemary;
                        if (this._data.tab.costItem && this._data.tab.costItem.length > 0) {
                            itemary = this._data.tab.costItem;
                            flag = false;
                        }
                        if (this._data.tab.costResource && this._data.tab.costResource.length > 0) {
                            itemary = this._data.tab.costResource;
                            flag = true;
                        }
                        //flag:true 为消耗资源
                        if (flag) {
                            costRes(itemary[0], function () {
                                NetManager.getInstance().protocolos.illusion_mount_active(_this._data.tab.id);
                            }, function () {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                            });
                        }
                        else {
                            //flag:true 为消耗道具
                            if (this._canbuy) {
                                NetManager.getInstance().protocolos.illusion_mount_active(this._data.tab.id);
                            }
                            else {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                                var itemary;
                                if (this._data.tab.costItem && this._data.tab.costItem.length > 0) {
                                    itemary = this._data.tab.costItem;
                                }
                                if (this._data.tab.costResource && this._data.tab.costResource.length > 0) {
                                    itemary = this._data.tab.costResource;
                                }
                                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                $aaa.data = itemary[0][0];
                                ModuleEventManager.dispatchEvent($aaa);
                            }
                        }
                    }
                    else {
                        //已激活
                        NetManager.getInstance().protocolos.illusion_mount(this._data.tab.id);
                    }
                    break;
                default:
                    break;
            }
        };
        return MountHuanhua;
    }(UIVirtualContainer));
    mountui.MountHuanhua = MountHuanhua;
    var HuanhuaList = /** @class */ (function (_super) {
        __extends(HuanhuaList, _super);
        function HuanhuaList() {
            var _this = _super.call(this) || this;
            _this.left = 147;
            _this.top = 425;
            return _this;
        }
        HuanhuaList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        HuanhuaList.prototype.initData = function () {
            var ary = new Array();
            this.setData(ary, HuanhuaListRender, 365, 95, 81, 0, 4, 1024, 128, 8, 1);
        };
        HuanhuaList.prototype.refreshDataByNewData = function () {
            // var $sListItemData: Array<SListItemData> = this.getData(NewMountModel.getInstance().getHuanhuaVO());
            // this._ItemDataList = this.getData(NewMountModel.getInstance().getHuanhuaVO());
            var nodeList = RedPointManager.getInstance().getNodeByID(35).children;
            var $data = mountui.NewMountModel.getInstance().getHuanhuaVO();
            for (var i = 0; i < this._ItemDataList.length; i++) {
                nodeList[i].data = $data[i];
                $data[i].node = nodeList[i];
                this._ItemDataList[i].data = $data[i];
            }
            this.refreshDraw();
            this.scrollAndselect();
        };
        HuanhuaList.prototype.getData = function ($data) {
            var nodeList = RedPointManager.getInstance().getNodeByID(35).children;
            var ary = new Array;
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
        HuanhuaList.prototype.setSelect = function ($item) {
            _super.prototype.setSelect.call(this, $item);
            this._lastTid = $item.itdata.data.id;
        };
        HuanhuaList.prototype.getSelectIdByTid = function ($tid) {
            //console.log("---表id---", $tid);
            for (var i = 0; i < this._ItemDataList.length; i++) {
                if (this._ItemDataList[i].data.id == $tid) {
                    return this._ItemDataList[i].id;
                }
            }
            //console.log("--没有符合的项", $tid);
            return 0;
        };
        HuanhuaList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._ItemDataList = this.getData(mountui.NewMountModel.getInstance().getHuanhuaVO());
            // this.refreshDraw();
            // this.refreshDataByNewData();
            this.refreshData(this._ItemDataList);
            this._lastTid = mountui.NewMountModel.getInstance().getHuanhuaIndex();
            this.scrollAndselect();
        };
        HuanhuaList.prototype.scrollAndselect = function () {
            var selid = this.getSelectIdByTid(this._lastTid);
            this.scrollIdx(selid);
            this.setSelectIndex(selid);
        };
        HuanhuaList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return HuanhuaList;
    }(TransverseSList));
    mountui.HuanhuaList = HuanhuaList;
    var HuanhuaListRender = /** @class */ (function (_super) {
        __extends(HuanhuaListRender, _super);
        function HuanhuaListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        HuanhuaListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Spic = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Spic", 0, 0, 74, 74);
            $container.addChild(this.Spic);
            this.Spic.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.ScurHuanhua = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ScurHuanhua", 2, 70, 70, 24);
            $container.addChild(this.ScurHuanhua);
            this.Sredpoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sredpoint", 57, 3, 17, 16);
            this.Sredpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sredpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        Object.defineProperty(HuanhuaListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyrender();
                }
                if (val) {
                    var $evt = new mountui.MountUiEvent(mountui.MountUiEvent.HUANHUA_SELECT_ITEM_EVENT);
                    $evt.data = this.itdata;
                    ModuleEventManager.dispatchEvent($evt);
                }
            },
            enumerable: true,
            configurable: true
        });
        HuanhuaListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                // this.drawIcon();
                // if (this.selected) {
                //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ScurHuanhua.skinName, UIData.publicUi, PuiData.A_HIGHT_C);
                // } else {
                //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ScurHuanhua.skinName, UIData.publicUi, PuiData.Slist_nselect);
                // }
                IconManager.getInstance().drawMountIcon(this.Spic, $vo.tab.mountID, $vo.state == 1, this.selected);
                if ($vo.state == 2) {
                    this.drawCurHuanhua();
                }
                else {
                    UiDraw.clearUI(this.ScurHuanhua);
                }
                // if ($vo.state == 3) {
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.limLev + "级解锁", 16, TextAlign.RIGHT, ColorType.Brown7a2f21);
                //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.UnlockBg.skinName, UIData.publicUi, PuiData.MASK);
                //     LabelTextFont.clearLabel(this.uiAtlas, this.Slev.skinName);
                //     LabelTextFont.clearLabel(this.uiAtlas, this.Spass.skinName);
                // } else {
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                //     LabelTextFont.clearLabel(this.uiAtlas, this.UnlockBg.skinName);
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Slev.skinName, $vo.tabvo.limLev + "级", 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                //     var passstr: string = "已通关";
                //     var passcolor: string = ColorType.Green2ca937;
                //     if ($vo.state == 1) {
                //         passstr = "未通关"
                //         passcolor = ColorType.colorcd2000
                //     }
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Spass.skinName, passstr, 14, TextAlign.RIGHT, passcolor);
                // }
                if ($vo.node) {
                    $vo.node.bindUI(this.Sredpoint);
                }
            }
        };
        HuanhuaListRender.prototype.drawCurHuanhua = function () {
            var $uiRec = this.uiAtlas.getRec(this.ScurHuanhua.skinName);
            var ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
            var imgUseRect = this.parentTarget.baseAtlas.getRec("CurHuanhua");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);
            this.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
        };
        HuanhuaListRender.prototype.drawIcon = function () {
            var _this = this;
            IconManager.getInstance().getIcon("ui/skillicon/zuoqi.png", function ($img) {
                var $uiRec = _this.uiAtlas.getRec(_this.Spic.skinName);
                var ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                //绘制坐骑头像的底色
                UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_BASE, new Rectangle(1, 1, 48, 48), UIData.publicUi);
                //绘制坐骑头像
                ctx.drawImage($img, 0, 0, 65, 65, 3, 3, 44, 44);
                // //选中高亮绘制
                // if (this.hasLight) {
                //     UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_C, new Rectangle(14, 17, 75, 75), UIData.publicUi);
                // }
                // //是否可激活红点绘制
                // if (this.canctxredpoint($vo)) {
                //     UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(67, 22, 17, 16), UIData.publicUi);
                // }
                // // LabelTextFont.writeText(ctx, 0, 90, $vo.name, 16, "#FFD700", true);
                // //绘制名字
                // LabelTextFont.writeSingleLabelToCtx(ctx, "[d5e7ff]" + $vo.name, 16, 102 / 2, 80)
                _this.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
            });
        };
        HuanhuaListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        HuanhuaListRender.prototype.refreshDraw = function () {
            this.render(this.itdata);
        };
        HuanhuaListRender.prototype.equClick = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
            }
        };
        HuanhuaListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Spic);
            UiDraw.clearUI(this.ScurHuanhua);
            this.Sredpoint.preHide();
        };
        return HuanhuaListRender;
    }(SListItem));
    mountui.HuanhuaListRender = HuanhuaListRender;
})(mountui || (mountui = {}));
//# sourceMappingURL=MountHuanhua.js.map