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
var treasure;
(function (treasure) {
    var cilckVo = /** @class */ (function () {
        function cilckVo() {
        }
        return cilckVo;
    }());
    treasure.cilckVo = cilckVo;
    var SlotCell = /** @class */ (function () {
        function SlotCell() {
        }
        SlotCell.prototype.draw = function ($vo) {
            var _this = this;
            this.data = $vo;
            if ($vo.state == 0) {
                this.sloticon.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                //未解锁
                UiDraw.SharedDrawImg(this.uiAtlas, this.uiAtlas, this.sloticon.skinName, "Iconno");
                this.parent.setUiListVisibleByItem([this.slottxt], true);
                var $objslotitem = TableData.getInstance().getData(TableData.tb_talisman_slot, $vo.slotid);
                var $realmbreakobj = TableData.getInstance().getData(TableData.tb_realmbreak_base, $objslotitem["realmbreak_lev"]);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.slottxt.skinName, "境界\n" + $realmbreakobj["name"] + "\n解锁", 16, TextAlign.LEFT, ColorType.Whitefff4d6);
                this.slottxt.x = 29 + this.sloticon.x;
                this.slottxt.y = 18 + this.sloticon.y;
            }
            else {
                this.sloticon.addEventListener(InteractiveEvent.Up, this.equClick, this);
                if ($vo.treasureid > 0) {
                    var $obj = TableData.getInstance().getData(TableData.tb_talisman_base, $vo.treasureid);
                    var $url = "ui/load/treasure/" + $obj["icon"];
                    IconManager.getInstance().getIcon($url + "_c.png", function ($img) {
                        var $rec = _this.uiAtlas.getRec(_this.sloticon.skinName);
                        var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                        var iconok = _this.uiAtlas.getRec("Iconok");
                        ctx.drawImage(_this.uiAtlas.useImg, iconok.pixelX, iconok.pixelY, iconok.pixelWitdh, iconok.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
                        var equ = _this.uiAtlas.getRec("equ" + $obj["quality"]);
                        ctx.drawImage(_this.uiAtlas.useImg, equ.pixelX, equ.pixelY, equ.pixelWitdh, equ.pixelHeight, 8, 8, 72, 72);
                        ctx.drawImage($img, 0, 0, $img.width, $img.height, 15, 15, 60, 60);
                        _this.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                    });
                }
                else {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.uiAtlas, this.sloticon.skinName, "Iconok");
                }
                this.parent.setUiListVisibleByItem([this.slottxt], false);
            }
        };
        SlotCell.prototype.equClick = function ($evt) {
            if (this.data.state > 0 && this.data.treasureid > 0) {
                var vo = new cilckVo;
                vo.id = this.data.treasureid;
                vo.type = 1;
                var bb = new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SHOW_TIPS_EVENT);
                bb.data = vo;
                ModuleEventManager.dispatchEvent(bb);
            }
        };
        SlotCell.prototype.clear = function () {
            this.data = null;
            this.parent.setUiListVisibleByItem([this.sloticon, this.slottxt], false);
        };
        return SlotCell;
    }());
    treasure.SlotCell = SlotCell;
    var TreasureWear = /** @class */ (function (_super) {
        __extends(TreasureWear, _super);
        function TreasureWear() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        TreasureWear.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.wearList) {
                this.wearList.dispose();
                this.wearList = null;
            }
        };
        TreasureWear.prototype.initUiAtlas = function ($uiAtlas, $winRender) {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._publicRender = $winRender;
            this.initView();
        };
        TreasureWear.prototype.initView = function () {
            this.d_listindex = this.addChild(this._bgRender.getComponent("d_listindex"));
            this.addChild(this._bgRender.getComponent("e_listbg"));
            this.addChild(this._baseRender.getComponent("e_title"));
            // this.a_zhanli_all = this.addChild(this._baseRender.getComponent("a_zhanli_all"));
            var ui = this.parent.loadBigPicByUrl("ui/uidata/treasure/wearBg.png");
            this.parent.setSizeForPanelUiCopy(ui, "wearbg", this._baseRender);
            this.slotAry = new Array;
            for (var i = 0; i < 5; i++) {
                var cell = new SlotCell;
                cell.sloticon = this.addChild(this._bgRender.getComponent("e_slot" + i));
                cell.slottxt = this.addChild(this._baseRender.getComponent("e_slottxt" + i));
                cell.parent = this;
                cell.uiAtlas = this._baseRender.uiAtlas;
                this.slotAry.push(cell);
            }
        };
        TreasureWear.prototype.setZhanli = function () {
            // ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_zhanli_all.skinName, String(GuidData.player.gettalismantotalzhanli()), ArtFont.num56)
        };
        TreasureWear.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
            if (this.wearList) {
                this.wearList.left = this.d_listindex.parent.x / UIData.Scale + this.d_listindex.x;
                this.wearList.top = this.d_listindex.parent.y / UIData.Scale + this.d_listindex.y;
            }
        };
        TreasureWear.prototype.chgslot = function () {
            var ary = GuidData.grow.gettalismanslotlist();
            for (var i = 0; i < 5; i++) {
                if (i < ary.length) {
                    this.slotAry[i].draw(ary[i]);
                }
                else {
                    this.slotAry[i].clear();
                }
            }
        };
        TreasureWear.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            // this.setZhanli();
            this.parent.addBigPic();
            if (!this.wearList) {
                this.wearList = new WearList();
                this.wearList.init(this._baseRender.uiAtlas);
            }
            this.wearList.show();
            this.chgslot();
            this.resize();
        };
        TreasureWear.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.parent.removeBigPic();
            if (this.wearList) {
                this.wearList.hide();
            }
        };
        return TreasureWear;
    }(UIVirtualContainer));
    treasure.TreasureWear = TreasureWear;
    /**
     * 已有法宝list
     */
    var WearList = /** @class */ (function (_super) {
        __extends(WearList, _super);
        function WearList() {
            return _super.call(this) || this;
        }
        WearList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        WearList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, WearListRender, 400, 385, 80, 70, 5, 512, 512, 5, 7);
        };
        WearList.prototype.refreshDataByNewData = function () {
            var $arr = treasure.TreasureModel.getInstance().getTreasureList();
            var $sListItemData = this.getData($arr);
            this.refreshData($sListItemData);
        };
        WearList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        WearList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        };
        WearList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return WearList;
    }(SList));
    treasure.WearList = WearList;
    var WearListRender = /** @class */ (function (_super) {
        __extends(WearListRender, _super);
        function WearListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WearListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Dicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dicon", 0, 0, 68, 68);
            $container.addChild(this.Dicon);
            this.Dicon.addEventListener(InteractiveEvent.Up, this.btnChick, this);
        };
        WearListRender.prototype.applyrender = function () {
            var _this = this;
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                var $obj = TableData.getInstance().getData(TableData.tb_talisman_base, $vo.id);
                var $url = "ui/load/treasure/" + $obj["icon"];
                IconManager.getInstance().getIcon($url + "_c.png", function ($img) {
                    var $rec = _this._baseRender.uiAtlas.getRec(_this.Dicon.skinName);
                    var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    // UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    // console.log("---$obj-",$obj["quality"]);
                    var equ = _this.parentTarget.baseAtlas.getRec("equ" + $obj["quality"]);
                    ctx.drawImage(_this.parentTarget.baseAtlas.useImg, equ.pixelX, equ.pixelY, equ.pixelWitdh, equ.pixelHeight, 0, 0, 68, 68);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                    if (_this.selected) {
                        UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    }
                    _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            }
        };
        Object.defineProperty(WearListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata && this.itdata.data) {
                    if (val) {
                        var vo = new cilckVo;
                        vo.id = this.itdata.data.id;
                        vo.type = 0;
                        var bb = new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SHOW_TIPS_EVENT);
                        bb.data = vo;
                        ModuleEventManager.dispatchEvent(bb);
                    }
                    this.applyrender();
                }
            },
            enumerable: true,
            configurable: true
        });
        WearListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        WearListRender.prototype.btnChick = function (evt) {
            UIManager.popClikNameFun("Dicon");
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        };
        WearListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Dicon);
        };
        return WearListRender;
    }(SListItem));
    treasure.WearListRender = WearListRender;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureWear.js.map