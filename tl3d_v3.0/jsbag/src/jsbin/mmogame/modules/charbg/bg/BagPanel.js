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
var charbg;
(function (charbg) {
    var BagItemRender = /** @class */ (function (_super) {
        __extends(BagItemRender, _super);
        function BagItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.equUpDown = false;
            _this.disableEqu = false;
            return _this;
        }
        BagItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.baseui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_item", 0, 0, 68, 68);
            $container.addChild(this.baseui);
            this.baseui.addEventListener(InteractiveEvent.Up, this.equClick, this);
        };
        BagItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            this.draw();
        };
        BagItemRender.prototype.drawUpDown = function () {
            if (!this.itdata) {
                return;
            }
            var $EquMeshVo = this.itdata.data;
            if (!$EquMeshVo) {
                return;
            }
            var test = false;
            if ($EquMeshVo.entryData.type == 1) {
                var bagitem = GuidData.bag.getEquByPart($EquMeshVo.entryData.pos);
                if (bagitem) {
                    if ($EquMeshVo.data.propData.force > bagitem.data.propData.force) {
                        test = true;
                    }
                }
                else {
                    test = true;
                }
            }
            if (test != this.equUpDown) {
                this.draw();
            }
        };
        BagItemRender.prototype.draw = function () {
            if (this.itdata && this.itdata.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        BagItemRender.prototype.testGender = function ($obj) {
            if ($obj.availableGender) {
                var idx = $obj.availableGender.indexOf(GuidData.player.getCharType());
                return (idx != -1);
            }
            return false;
        };
        BagItemRender.prototype.setnull = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.baseui.skinName);
            var ctx = UIManager.getInstance().getContext2D(68, 68, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        BagItemRender.prototype.applyrender = function () {
            var _this = this;
            var $EquMeshVo = this.itdata.data;
            if (!$EquMeshVo) {
                var $rec = this._baseRender.uiAtlas.getRec(this.baseui.skinName);
                var ctx = UIManager.getInstance().getContext2D(68, 68, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                return;
            }
            if ($EquMeshVo.entryData.type == 1) {
                var bagitem = GuidData.bag.getEquByPart($EquMeshVo.entryData.pos);
                this.equUpDown = false;
                if (bagitem) {
                    if ($EquMeshVo.data.propData.force > bagitem.data.propData.force) {
                        this.equUpDown = true;
                    }
                }
                else {
                    this.equUpDown = true;
                }
                this.disableEqu = !this.testGender($EquMeshVo.entryData);
            }
            IconManager.getInstance().getIcon(geteqiconIconUrl($EquMeshVo.entryData.icon), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.baseui.skinName);
                var ctx = UIManager.getInstance().getContext2D(68, 68, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($EquMeshVo.entryData.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                if ($EquMeshVo.entryData.type == 1) {
                    UiDraw.cxtDrawImg(ctx, "A_JJ" + $EquMeshVo.entryData.realmbreak_level, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                    //ArtFont.getInstance().writeFontToCtxCenten(ctx, String($EquMeshVo.entryData.level), ArtFont.num63, 18, 4, 4);
                    if (_this.disableEqu) {
                        UiDraw.cxtDrawImg(ctx, PuiData.EQUBG, new Rectangle(4, 4, 60, 60), UIData.publicUi);
                    }
                    else {
                        //if($EquMeshVo.entryData.level > GuidData.player.getLevel()){
                        if ($EquMeshVo.entryData.realmbreak_level > GuidData.player.getStateLev()) {
                            UiDraw.cxtDrawImg(ctx, PuiData.DISABLE, new Rectangle(42, 40, 23, 23), UIData.publicUi);
                        }
                        else {
                            UiDraw.cxtDrawImg(ctx, _this.equUpDown ? PuiData.ARROWUP : PuiData.ARROWDOWN, new Rectangle(45, 40, 17, 21), UIData.publicUi);
                        }
                    }
                }
                else if ($EquMeshVo.count > 1) {
                    //ArtFont.getInstance().writeFontToCtxRight(ctx, String($EquMeshVo.count), ArtFont.GARY_TXT, 60, 40);
                    var strNum = String($EquMeshVo.count);
                    LabelTextFont.writeSingleLabelToCtx(ctx, strNum, 16, 55 - ctx.measureText(strNum).width, 43, TextAlign.LEFT, ColorType.Whitefff4d6, "#27262e");
                }
                if (_this.selected) {
                    UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(2, 2, 64, 64), UIData.publicUi);
                }
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        BagItemRender.prototype.equClick = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
                var itemevt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                itemevt.data = this.itdata.data;
                itemevt.buttonType = 2;
                ModuleEventManager.dispatchEvent(itemevt);
            }
        };
        Object.defineProperty(BagItemRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyrender();
                }
            },
            enumerable: true,
            configurable: true
        });
        BagItemRender.prototype.refreshDraw = function () {
            this.draw();
        };
        return BagItemRender;
    }(SListItem));
    charbg.BagItemRender = BagItemRender;
    var BagList = /** @class */ (function (_super) {
        __extends(BagList, _super);
        function BagList() {
            var _this = _super.call(this) || this;
            _this.center = 205;
            _this.middle = 0;
            return _this;
        }
        BagList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, BagItemRender, 350, 350, 70, 70, 5, 512, 1024, 5, 10);
        };
        BagList.prototype.refreshDrawUpDow = function () {
            for (var i = 0; i < this._itemList.length; i++) {
                var item = this._itemList[i];
                item.drawUpDown();
            }
        };
        return BagList;
    }(SList));
    charbg.BagList = BagList;
    var BagPanel = /** @class */ (function (_super) {
        __extends(BagPanel, _super);
        function BagPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.nextTime = 0;
            _this.lasttime = 0;
            _this.selcetTabId = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent();
            _this._baseRender = new UIRenderComponent();
            _this._topRender = new UIRenderComponent();
            //this._listRender = new UIListRenderComponent();
            _this.addRender(_this._bgRender);
            //this.addRender(this._listRender);
            _this.addRender(_this._baseRender);
            _this.addRender(_this._topRender);
            //this.addList();
            _this._bgList = new BagList();
            return _this;
            // this._bgList.x = 512;
            // this._bgList.y = 90;
        }
        BagPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            //this._listRender.dispose();
            //this._listRender = null;
        };
        BagPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            UIManager.getInstance().addUIContainer(this._bgList);
            var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
            $scenePange.data = SharedDef.MODULE_BAG;
            ModuleEventManager.dispatchEvent($scenePange);
            //整理刷新时间
            this.refreshTime();
            var setime = this.getserveTime();
            if (setime < this.nextTime) {
                var num = TableData.getInstance().getData(TableData.tb_item_sort_cd, 1)["cd"];
                TimeUtil.addFrameTick(this.upDataFun);
                this._flag = false;
            }
            else {
                this._flag = true;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_zhenglitxt.skinName, "整理", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        };
        BagPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            UIManager.getInstance().removeUIContainer(this._bgList);
        };
        BagPanel.prototype.setUIAtlas = function ($us) {
            this._baseRender.uiAtlas = $us;
            this._bgRender.uiAtlas = $us;
            this._topRender.uiAtlas = $us;
            this._bgList.baseAtlas = $us;
            this._bgList.initData();
            this.loadConfigCom();
        };
        BagPanel.prototype.loadConfigCom = function () {
            var _this = this;
            var renderLevel = this._bgRender;
            this.b_tab0 = renderLevel.getComponent("b_tab0");
            this.addChild(this.b_tab0);
            this.b_tab0.data = BagData.TYPE_EQU_BG;
            this.b_tab0.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.b_tab1 = renderLevel.getComponent("b_tab1");
            this.addChild(this.b_tab1);
            this.b_tab1.data = BagData.TYPE_BAG;
            this.b_tab1.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.b_tab2 = renderLevel.getComponent("b_tab2");
            this.addChild(this.b_tab2);
            this.b_tab2.data = BagData.TYPE_GEM;
            this.b_tab2.addEventListener(InteractiveEvent.Down, this.butClik, this);
            var b_zhengli = this._baseRender.getComponent("b_zhengli");
            this.addChild(b_zhengli);
            b_zhengli.addEventListener(InteractiveEvent.Down, this.onZhengli, this);
            this.b_zhenglitxt = this.addChild(this._topRender.getComponent("b_zhenglitxt"));
            this.addChild(this._baseRender.getComponent("a_win_line2"));
            this._bagNum = this._baseRender.getComponent("b_bag_num");
            this.addChild(this._bagNum);
            this.uiAtlasComplet = true;
            this.selectTab(this.b_tab0);
            this.upDataFun = function (t) { _this.update(t); };
        };
        BagPanel.prototype.getserveTime = function () {
            return GameInstance.getServerNow();
            // var $ts: number = GameInstance.getServerNow();
            // var $sever: Date = new Date($ts * 1000);
            // return $sever.getTime()
        };
        BagPanel.prototype.update = function (t) {
            var setime = this.getserveTime();
            // var currentnum: number = Math.ceil((this.nextTime - setime) / 1000);
            var currentnum = this.nextTime - setime;
            if (this.lasttime != currentnum) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_zhenglitxt.skinName, "整理(" + currentnum + "秒)", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.lasttime = currentnum;
            }
            if (setime >= this.nextTime) {
                this._flag = true;
                TimeUtil.removeFrameTick(this.upDataFun);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_zhenglitxt.skinName, "整理", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            }
        };
        BagPanel.prototype.refreshTime = function () {
            var num = TableData.getInstance().getData(TableData.tb_item_sort_cd, 1)["cd"];
            // this.nextTime = TimeUtil.getTimer() + num * 1000
            this.nextTime = (GuidData.player.getBagTime() + num);
        };
        BagPanel.prototype.onZhengli = function ($e) {
            if (this._flag) {
                this._flag = false;
                TimeUtil.addFrameTick(this.upDataFun);
                var $type;
                if (this.selcetTabId == BagData.TYPE_BAG) {
                    $type = 0;
                }
                else if (this.selcetTabId == BagData.TYPE_EQU_BG) {
                    $type = 2;
                }
                else if (this.selcetTabId == BagData.TYPE_GEM) {
                    $type = 3;
                }
                NetManager.getInstance().protocolos.bag_item_sort($type);
            }
        };
        BagPanel.prototype.refreshNum = function (size, allSize) {
            var str = size + "/" + allSize;
            UiDraw.drawTxtLab(this._bagNum, ColorType.Brown7a2f21 + str, 14, TextAlign.CENTER);
        };
        BagPanel.prototype.drawUpDown = function () {
            this._bgList.refreshDrawUpDow();
        };
        BagPanel.prototype.drawEquDis = function () {
            this._bgList.refreshDraw();
        };
        BagPanel.prototype.bgDataChg = function ($data, type) {
            if (type != this.selcetTabId) {
                return;
            }
            for (var i = 0; i < $data.length; i++) {
                var bgData = GuidData.bag.getBgItemData($data[i], type);
                if (bgData) {
                    this._bgList.setItemData(bgData, bgData.pos);
                    // if (!tf) {
                    //     this._bgList.setGridItemFun(($listItemData: ListItemData) => { this.itemDataClick($listItemData) }, bgData.pos);
                    // }
                }
                else {
                    this._bgList.clearItemByPos($data[i]);
                }
            }
            this.refreshNum(GuidData.bag.getBagNum(this.selcetTabId), GuidData.bag.getBagSize(this.selcetTabId));
        };
        BagPanel.prototype.refreshListData = function (idx) {
            var ary = new Array;
            var bgData;
            var bagSize = GuidData.bag.getBagSize(idx);
            if (idx == BagData.TYPE_BAG) {
                bgData = GuidData.bag.getAllBgData();
            }
            else if (idx == BagData.TYPE_EQU_BG) {
                bgData = GuidData.bag.getEquBgData();
            }
            else if (idx == BagData.TYPE_GEM) {
                bgData = GuidData.bag.getGemBgData();
            }
            else {
                return;
            }
            for (var i = 0; i < bagSize; i++) {
                var listItemData = new SListItemData();
                listItemData.data = bgData[i];
                // if (listItemData.data) {
                //     listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                // }
                ary.push(listItemData);
            }
            //this._bgList.contentY = 0;
            //this._bgList.setGridData(ary, BgRender, 5, 70, 70, 512, 512, 360, 350);
            this._bgList.refreshData(ary);
            this.refreshNum(GuidData.bag.getBagNum(idx), bagSize);
        };
        BagPanel.prototype.refreshItem = function () {
        };
        BagPanel.prototype.itemDataClick = function ($listItemData) {
            /* UIManager.popClikNameFun("beibaowupinlan");

            var _listItemArr: Array<ListItemData> = this._bgList.data;
            var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
            evt.data = $listItemData.data;
            evt.buttonType = 2;
            ModuleEventManager.dispatchEvent(evt);

            for (var i: number = 0; _listItemArr && i < _listItemArr.length; i++) {
                if (_listItemArr[i] == $listItemData) {
                    _listItemArr[i].itemRender.selected = true;
                } else {
                    _listItemArr[i].itemRender.selected = false
                }
            } */
        };
        BagPanel.prototype.butClik = function (evt) {
            this.selectTab(evt.target);
        };
        BagPanel.prototype.selectTab = function ($ui) {
            if ($ui == this.b_tab0) {
                this.b_tab0.selected = true;
                this.b_tab1.selected = false;
                this.b_tab2.selected = false;
            }
            else if ($ui == this.b_tab1) {
                this.b_tab0.selected = false;
                this.b_tab1.selected = true;
                this.b_tab2.selected = false;
            }
            else if ($ui == this.b_tab2) {
                this.b_tab0.selected = false;
                this.b_tab1.selected = false;
                this.b_tab2.selected = true;
            }
            this.refreshData($ui.data);
        };
        BagPanel.prototype.refreshData = function (idx) {
            this.selcetTabId = idx;
            if (this.uiAtlasComplet) {
                this.refreshListData(idx);
            }
        };
        return BagPanel;
    }(UIConatiner));
    charbg.BagPanel = BagPanel;
})(charbg || (charbg = {}));
//# sourceMappingURL=BagPanel.js.map