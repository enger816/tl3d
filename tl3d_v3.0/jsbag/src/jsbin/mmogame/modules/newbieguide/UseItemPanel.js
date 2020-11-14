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
var newbieguide;
(function (newbieguide) {
    var UseItemVo = /** @class */ (function () {
        function UseItemVo() {
        }
        return UseItemVo;
    }());
    newbieguide.UseItemVo = UseItemVo;
    var UseItemPanel = /** @class */ (function (_super) {
        __extends(UseItemPanel, _super);
        function UseItemPanel() {
            var _this = _super.call(this) || this;
            _this.KName = ["打开", "装备", "使用"];
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new AlphaUIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        UseItemPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this.layer=300
        };
        UseItemPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseRender.setInfo("ui/uidata/useitem/useitem.xml", "ui/uidata/useitem/useitem.png", function () { _this.loadConfigCom(); });
        };
        UseItemPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            this.initUI();
            this.applyLoadComplete();
        };
        UseItemPanel.prototype.initUI = function () {
            var _this = this;
            var renderLevel = this._baseRender;
            this.addChild(this._bottomRender.getComponent("b_bg"));
            this.useBtn = this.addEvntButUp("a_but", this._baseRender); //使用按钮背景
            this.a_icon = this.addChild(this._baseRender.getComponent("a_icon"));
            this.a_name = this.addChild(this._topRender.getComponent("a_name"));
            this.a_txt = this.addChild(this._topRender.getComponent("a_txt"));
            this._tickFun = function (t) { _this.tickRefreshState(t); };
        };
        UseItemPanel.prototype.tickRefreshState = function (t) {
            var $time = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                if (this._curvo) {
                    var $vo = tb.TB_item_template.get_TB_item_template(this._curvo.itemId);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_txt.skinName, this.KName[this.getType($vo.type)] + " ( " + ($time + 1) + " )", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                    // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, "A_timetxt", String($time + 1), 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                    if ($time < 0) {
                        //回调
                        if ($vo.type == SharedDef.ITEM_TYPE_EQUIP && $vo.Auto == 1) {
                            NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP_BAG, this._curvo.equPos, SharedDef.BAG_TYPE_EQUIP, Number($vo.pos));
                            // } else {
                            //保留，以防日后自动开宝箱
                            //     var $dagItemData: BagItemData = GuidData.bag.getItemByEntryCopy($vo.id)
                            //     if ($dagItemData) {
                            //         NetManager.getInstance().protocolos.bag_item_user($dagItemData.guid, this._num);
                            //     } else {
                            //         alert("背包里没有物品")
                            //     }
                        }
                        this.nextprompt();
                    }
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
                if (this._curvo) {
                    var $vo = tb.TB_item_template.get_TB_item_template(this._curvo.itemId);
                    if ($vo.type == SharedDef.ITEM_TYPE_EQUIP && $vo.Auto == 1) {
                        NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP_BAG, this._curvo.equPos, SharedDef.BAG_TYPE_EQUIP, Number($vo.pos));
                    }
                    this.nextprompt();
                }
            }
        };
        UseItemPanel.prototype.nextprompt = function () {
            var _this = this;
            this._queItemAry.shift();
            // this._aryItems.splice(0, 1);
            this._curvo = null;
            this.hide();
            if (this._queItemAry.length > 0) {
                TimeUtil.addTimeOut(500, function () {
                    // this.selectItem();
                    UIManager.getInstance().addUIContainer(_this);
                });
            }
        };
        UseItemPanel.prototype.refresh = function () {
            this._curvo = this._queItemAry[0];
            var $vo = tb.TB_item_template.get_TB_item_template(this._curvo.itemId);
            // this._midRender.uiAtlas.upDataPicToTexture(geteqiconIconUrl($vo.icon), this.a_icon.skinName);
            this.drawItemIcon(this.a_icon, this._curvo.itemId, this._curvo.num);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_name.skinName, $vo.name, 16, TextAlign.CENTER, getColorQua($vo.quality));
        };
        UseItemPanel.prototype.drawItemIcon = function ($ui, id, num) {
            var obj = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon, function ($img) {
                var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                if (obj.type == 1) {
                    UiDraw.cxtDrawImg(ctx, "A_JJ" + obj.realmbreak_level, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                    // UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                    // ArtFont.getInstance().writeFontToCtxCenten(ctx, String(obj.level), ArtFont.num63, 18, 4, 4);
                }
                else {
                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "x" + num, 16, 64, 45, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                }
                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        UseItemPanel.prototype.getType = function ($num) {
            switch ($num) {
                case 14:
                case 15:
                    return 0;
                case 1:
                    return 1;
                default:
                    return 2;
            }
        };
        UseItemPanel.prototype.selectItem = function () {
            if (this._queItemAry.length > 0) {
                var curtab = tb.TB_item_template.get_TB_item_template(this._queItemAry[0].itemId);
                if (curtab.type == SharedDef.ITEM_TYPE_EQUIP) {
                    //自身装备对象
                    var bagitem = GuidData.bag.getEquByPart(curtab.pos);
                    var test = false;
                    if (bagitem) {
                        if (this._queItemAry[0].force > bagitem.data.propData.force) {
                            test = true;
                        }
                    }
                    else {
                        test = true;
                    }
                    //当前未穿戴装备 或者 穿戴装备评分低时 弹窗
                    if (test) {
                        this._endtime = this._queItemAry[0].time + TimeUtil.getTimer();
                        this.refresh();
                    }
                    else {
                        this.nextprompt();
                    }
                }
                else {
                    this._endtime = this._queItemAry[0].time + TimeUtil.getTimer();
                    this.refresh();
                }
            }
            else {
                this._curvo = null;
                this.hide();
            }
        };
        UseItemPanel.prototype.addData = function ($vo) {
            if (!this._queItemAry) {
                this._queItemAry = new Array;
            }
            for (var i = 0; i < this._queItemAry.length; i++) {
                if (this._queItemAry[i].itemId == $vo.itemId) {
                    return;
                }
            }
            this._queItemAry.push($vo);
            //console.log("_UseItemary------", this._queItemAry);
        };
        UseItemPanel.prototype.onAdd = function () {
            //添加到舞台上时，执行的方法
            this.selectItem();
            TimeUtil.addFrameTick(this._tickFun);
        };
        UseItemPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        UseItemPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.useBtn:
                    if (this._curvo) {
                        this.useProp();
                    }
                    this.nextprompt();
                    break;
                default:
                    break;
            }
        };
        UseItemPanel.prototype.useProp = function () {
            var $vo = tb.TB_item_template.get_TB_item_template(this._curvo.itemId);
            // if (this._isEqu) {
            if ($vo.type == SharedDef.ITEM_TYPE_EQUIP) {
                //console.log("穿", SharedDef.BAG_TYPE_MAIN_BAG, this._curvo.equPos, SharedDef.BAG_TYPE_EQUIP, Number($vo.pos))
                NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP_BAG, this._curvo.equPos, SharedDef.BAG_TYPE_EQUIP, Number($vo.pos));
            }
            else {
                // var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(this._itemId)
                // if ($vo.out_bag == 0) { //在背包里
                var $dagItemData = GuidData.bag.getItemByEntryCopy($vo.id);
                if ($dagItemData) {
                    if ($dagItemData.entryData.type_c == 22) {
                        var $e = new activity.ActivityEvent(activity.ActivityEvent.USEEXPCARD_EVENT);
                        $e.data = $dagItemData.id;
                        ModuleEventManager.dispatchEvent($e);
                    }
                    else {
                        NetManager.getInstance().protocolos.bag_item_user($dagItemData.guid, this._curvo.num);
                    }
                }
                else {
                    alert("背包里没有物品");
                }
                //     //console.log("背包的物品")
                // }
                // if ($vo.out_bag == 1) {  //不在背包
                //     NetManager.getInstance().protocolos.use_virtual_item($vo.id);
                //     //console.log("不在背包")
                // }
            }
        };
        return UseItemPanel;
    }(UIPanel));
    newbieguide.UseItemPanel = UseItemPanel;
})(newbieguide || (newbieguide = {}));
//# sourceMappingURL=UseItemPanel.js.map