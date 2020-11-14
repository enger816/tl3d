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
var store;
(function (store) {
    var ShopList = /** @class */ (function (_super) {
        __extends(ShopList, _super);
        function ShopList() {
            var _this = _super.call(this) || this;
            _this.left = 216;
            _this.top = 89;
            return _this;
        }
        ShopList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        ShopList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, ShopListRender, 428, 421, 214, 91, 4, 256, 1024, 2, 7, 1);
        };
        ShopList.prototype.refreshDataByNewData = function () {
            //通过type，获得所对应的列表
            this._aryList = store.StoreModel.getInstance().getList(this._type);
            var $sListItemData = this.getData(this._aryList);
            this.refreshData($sListItemData);
            this.setSelectIndex(this.getCurrentSelectIndex());
        };
        ShopList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                $ary[i].type = this._type;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            //console.log("--选中的数据--", ary);
            return ary;
        };
        ShopList.prototype.show = function ($value) {
            this._type = $value;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        };
        ShopList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return ShopList;
    }(SList));
    store.ShopList = ShopList;
    var ShopListRender = /** @class */ (function (_super) {
        __extends(ShopListRender, _super);
        function ShopListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShopListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var customRender = this._customRenderAry[0];
            this.I_icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_icon", 0, 0, 80, 78);
            this.I_icon.addEventListener(InteractiveEvent.Up, this.onTip, this);
            $container.addChild(this.I_icon);
            this.I_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_name", 89, 20, 100, 20);
            $container.addChild(this.I_name);
            this.I_money = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_money", 86, 42, 109, 35);
            $container.addChild(this.I_money);
            this.I_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "I_bg", 0, 0, 205, 88, 10, 10);
            $container.addChild(this.I_bg);
            this.I_selects = this.creatGrid9SUI(customRender, this.parentTarget.baseAtlas, "I_selects", 0, 0, 205, 88, 14, 14);
            $container.addChild(this.I_selects);
            this.I_bg.addEventListener(InteractiveEvent.Up, this.equClick, this);
        };
        ShopListRender.prototype.onTip = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                var itemid;
                if (vo.type == 1) {
                    var $tabelvo = tb.Tb_faction_shop.get_Tb_faction_shopById(vo.data1.id);
                    itemid = $tabelvo.itemId;
                }
                else {
                    itemid = vo.data.itemId;
                }
                var obj = tb.TB_item_template.get_TB_item_template(itemid);
                var bag = new BagItemData();
                bag.entryData = obj;
                var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                aa.data = bag;
                aa.buttonType = -1;
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        Object.defineProperty(ShopListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata && this.itdata.data) {
                    if (val) {
                        var bb = new store.StoreEvent(store.StoreEvent.SELECT_PROP_EVENT);
                        bb.data = this.itdata;
                        ModuleEventManager.dispatchEvent(bb);
                    }
                    this.applyrender();
                }
            },
            enumerable: true,
            configurable: true
        });
        ShopListRender.prototype.drawIconAndRecommend = function ($data) {
            var _this = this;
            var itemid;
            //1代表家族商店  特殊
            if ($data.type == 1) {
                var $tabelvo = tb.Tb_faction_shop.get_Tb_faction_shopById($data.data1.id);
                itemid = $tabelvo.itemId;
            }
            else {
                itemid = $data.data.itemId;
            }
            var $vo = tb.TB_item_template.get_TB_item_template(itemid);
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.I_icon.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(12, 10, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(12, 10, 68, 68), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, 60, 60, 16, 14, 60, 60);
                if ($data.type == 1) {
                    if ($tabelvo.discount_flag < 100) {
                        var imgUseRect = _this.parentTarget.baseAtlas.getRec("Discount");
                        ctx.drawImage(_this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                    }
                    if ($data.data1.num == $data.data2.num) {
                        var imgUseRect = _this.parentTarget.baseAtlas.getRec("SoldOut");
                        ctx.drawImage(_this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 30, 28, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                        // } else {
                    }
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($tabelvo.itemNum), 16, 75, 54, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                }
                else {
                    if ($data.data.discount < 10) {
                        //显示打折信息
                        var imgUseRect = _this.parentTarget.baseAtlas.getRec("Discount");
                        ctx.drawImage(_this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                    }
                    else if ($data.data.recommend) {
                        //显示推荐信息
                        var imgUseRect = _this.parentTarget.baseAtlas.getRec("Recommend");
                        ctx.drawImage(_this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                    }
                    else if ($data.isnewprop) {
                        //显示新物品信息
                        var imgUseRect = _this.parentTarget.baseAtlas.getRec("New");
                        ctx.drawImage(_this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                    }
                    var aa = $data.getNum();
                    if (aa != -1) {
                        if (aa == 0) {
                            //售罄
                            var imgUseRect = _this.parentTarget.baseAtlas.getRec("SoldOut");
                            ctx.drawImage(_this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 30, 28, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                            // } else {
                        }
                    }
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($data.data.count), 16, 75, 54, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                }
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        ShopListRender.prototype.drawName = function ($data) {
            var $rec = this._baseRender.uiAtlas.getRec(this.I_name.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var itemid;
            if ($data.type == 1) {
                var $tabelvo = tb.Tb_faction_shop.get_Tb_faction_shopById($data.data1.id);
                itemid = $tabelvo.itemId;
            }
            else {
                itemid = $data.data.itemId;
            }
            var $obj = TableData.getInstance().getData(TableData.tb_item_template, itemid);
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, $obj.name, 16, 0, 0, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        ShopListRender.prototype.getpriceMoney = function () {
            var price = Math.ceil(this.itdata.data.data.discount / 10 * this.itdata.data.data.costResource[0][1]);
            return price;
        };
        ShopListRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            if (this.selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I_selects.skinName, UIData.publicUi, PuiData.TITLEHIGHT);
            }
            else {
                UiDraw.clearUI(this.I_selects);
            }
            this.drawIconAndRecommend(vo);
            this.drawName(vo);
            var price;
            var ptype;
            if (vo.type == 1) {
                var $tabelvo = tb.Tb_faction_shop.get_Tb_faction_shopById(vo.data1.id);
                price = $tabelvo.costResource[0][1];
                ptype = $tabelvo.costResource[0][0];
            }
            else {
                price = this.getpriceMoney();
                ptype = vo.data.costResource[0][0];
            }
            // this.drawDiscountPrice(price, ptype);
            UiDraw.drawRewardIconAndtxt(this.I_money, [ptype, price], true, TextAlign.LEFT, 10);
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I_bg.skinName, UIData.publicUi, PuiData.Slist_select);
        };
        ShopListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        ShopListRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        };
        ShopListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.I_selects);
            UiDraw.clearUI(this.I_icon);
            UiDraw.clearUI(this.I_name);
            UiDraw.clearUI(this.I_money);
            UiDraw.clearUI(this.I_bg);
        };
        return ShopListRender;
    }(SListItem));
    store.ShopListRender = ShopListRender;
})(store || (store = {}));
//# sourceMappingURL=ShopList.js.map