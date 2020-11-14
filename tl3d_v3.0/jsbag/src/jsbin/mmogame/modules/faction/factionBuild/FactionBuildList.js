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
    var FactionBuildList = /** @class */ (function (_super) {
        __extends(FactionBuildList, _super);
        function FactionBuildList() {
            var _this = _super.call(this) || this;
            _this.left = 54;
            _this.top = 88;
            return _this;
        }
        FactionBuildList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        FactionBuildList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, FactionBuildRender, 152, 421, 0, 50, 6, 256, 512, 1, 8);
        };
        /**
         * refreshData
         */
        FactionBuildList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        };
        FactionBuildList.prototype.getData = function () {
            var ary = new Array;
            var listary = faction.FactionBuildModel.getInstance().getList();
            for (var i = 0; i < listary.length; i++) {
                var item = new SListItemData;
                item.data = listary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        FactionBuildList.prototype.show = function ($type) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            // this.refreshAndselectIndex();
        };
        FactionBuildList.prototype.refreshAndselectIndex = function () {
            this.refreshDataByNewData();
            this.setSelectIndex(this.getCurrentSelectIndex());
        };
        FactionBuildList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return FactionBuildList;
    }(SList));
    faction.FactionBuildList = FactionBuildList;
    var FactionBuildRender = /** @class */ (function (_super) {
        __extends(FactionBuildRender, _super);
        function FactionBuildRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionBuildRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.ItemBg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ItemBg", 0, 0, 152, 50);
            this.ItemBg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            $container.addChild(this.ItemBg);
        };
        Object.defineProperty(FactionBuildRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
                if (val) {
                    var bb = new faction.FactionBuildEvent(faction.FactionBuildEvent.CLICK_BUILD_ITEM);
                    bb.data = this.itdata.data;
                    ModuleEventManager.dispatchEvent(bb);
                }
            },
            enumerable: true,
            configurable: true
        });
        FactionBuildRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.ItemBg.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var selectkey;
            if (this.selected) {
                selectkey = "Selectok";
            }
            else {
                selectkey = "Selectno";
            }
            var state = this.parentTarget.baseAtlas.getRec(selectkey);
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, state.pixelX, state.pixelY, state.pixelWitdh, state.pixelHeight, 0, 0, state.pixelWitdh, state.pixelHeight);
            //居中的位置
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, vo.data.name, 16, 76, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            if (vo.state == 1) {
                //正在挑战
                var txtrect = this.parentTarget.baseAtlas.getRec("Buiild");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, txtrect.pixelX, txtrect.pixelY, txtrect.pixelWitdh, txtrect.pixelHeight, 0, 0, txtrect.pixelWitdh, txtrect.pixelHeight);
                //居中的位置
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "建造中", 20, 76, 13, TextAlign.CENTER, "#ffffff");
            }
            else if (vo.state == 2) {
                var txtrect = this.parentTarget.baseAtlas.getRec("Noopen");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, txtrect.pixelX, txtrect.pixelY, txtrect.pixelWitdh, txtrect.pixelHeight, 0, 0, txtrect.pixelWitdh, txtrect.pixelHeight);
                //居中的位置
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "主殿 LV" + vo.data.unlock + " 解锁", 20, 76, 13, TextAlign.CENTER, "#ffffff");
            }
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        FactionBuildRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        FactionBuildRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            //console.log("--点击--", this.itdata);
            if (this.itdata) {
                var vo = this.itdata.data;
                if (vo.state == 2) {
                    msgtip.MsgTipManager.outStrById(22, 51);
                    return;
                }
                this.setSelect();
            }
        };
        FactionBuildRender.prototype.setnull = function () {
            LabelTextFont.clearLabel(this.uiAtlas, this.ItemBg.skinName);
        };
        return FactionBuildRender;
    }(SListItem));
    faction.FactionBuildRender = FactionBuildRender;
    var FactionBuildRightPanel = /** @class */ (function (_super) {
        __extends(FactionBuildRightPanel, _super);
        function FactionBuildRightPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        FactionBuildRightPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            if (this.buildlist) {
                this.buildlist.dispose();
                this.buildlist = null;
            }
        };
        FactionBuildRightPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $publicuiAtlas;
            this.initView();
        };
        FactionBuildRightPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.build = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.build.x = 725;
            this.build.y = 352;
            this._buildLevAry = new Array;
            this._buildLevAry.push(this.build);
            this._buildLevAry.push(renderLevel.getComponent("build"));
            this.name = this.addChild(renderLevel.getComponent("a_16"));
            this.maxlev = renderLevel.getComponent("a_21");
            this.oncetime = this.addChild(renderLevel.getComponent("a_22"));
            this.res = this.addChild(renderLevel.getComponent("a_23"));
            this.curmoney = this.addChild(renderLevel.getComponent("a_24"));
            this.icon = this.addChild(renderLevel.getComponent("a_25"));
            this.addUIList(["bg3_4", "bg3_5", "bg3_6", "a_26"], this._bottomRender);
            var a_6 = renderLevel.getComponent("a_6");
            var a_7 = this.addChild(renderLevel.getComponent("a_7"));
            var a_8 = this.addChild(renderLevel.getComponent("a_8"));
            var a_9 = this.addChild(renderLevel.getComponent("a_9"));
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_6.skinName, "建筑等级上限：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_7.skinName, "建造所需时间：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_8.skinName, "消耗家族资金：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_9.skinName, "当前家族资金：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._MaxLevAry = new Array;
            this._MaxLevAry.push(a_6);
            this._MaxLevAry.push(this.maxlev);
            this._MaxLevAry.push(this._bottomRender.getComponent("bg3_3"));
            this._uiAry = new Array;
            for (var i = 0; i < 5; i++) {
                this._uiAry.push(renderLevel.getComponent("a_" + (11 + i)));
            }
            this.a_5 = this.addChild(renderLevel.getComponent("a_5"));
            this.addUIList(["line1", "xBg1"], renderLevel);
        };
        FactionBuildRightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.buildlist) {
                this.buildlist.left = this.a_5.parent.x / UIData.Scale + this.a_5.x;
                this.buildlist.top = this.a_5.parent.y / UIData.Scale + this.a_5.y;
            }
        };
        FactionBuildRightPanel.prototype.show = function () {
            if (!this.buildlist) {
                this.buildlist = new FactionBuildList();
                this.buildlist.init(this._bottomRender.uiAtlas);
            }
            this.buildlist.show(0);
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.buildlist.refreshAndselectIndex();
            this.resize();
        };
        FactionBuildRightPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.buildlist) {
                this.buildlist.hide();
            }
        };
        FactionBuildRightPanel.prototype.resetData = function ($data) {
            this._data = $data;
            this.setUiListVisibleByItem(this._buildLevAry, $data.data.can_lvup != 0);
            this._bottomRender.uiAtlas.upDataPicToTexture(getFactionBuildMapUrl($data.data.type), this.icon.skinName);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.name.skinName, $data.data.level + "级" + $data.data.name, 16, TextAlign.CENTER, ColorType.colorb96d49);
            if ($data.data.type == 1) {
                LabelTextFont.clearLabel(this._bottomRender.uiAtlas, this.maxlev.skinName);
                this.setUiListVisibleByItem(this._MaxLevAry, false);
            }
            else {
                this.setUiListVisibleByItem(this._MaxLevAry, true);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.maxlev.skinName, "  " + GuidData.faction.getLev() + "级", 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
            }
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.oncetime.skinName, "  " + this.getTimestr($data.data.time), 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.res.skinName, "  " + String($data.data.cost), 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.curmoney.skinName, "  " + String(GuidData.faction.getMoney()), 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
            this.setUiListVisibleByItem(this._uiAry, false);
            for (var i = 0; i < $data.data.desc.length; i++) {
                // LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this._uiAry[i].skinName, $data.data.desc[i], 16, TextAlign.LEFT, )
                this.drawinfo(this._uiAry[i], $data.data.desc[i], 16, ColorType.Green56da35, 264);
                this.setUiListVisibleByItem([this._uiAry[i]], true);
            }
            this.resize();
        };
        FactionBuildRightPanel.prototype.drawinfo = function ($ui, $ms, fontsize, fontColor, $maxWidth) {
            if ($maxWidth === void 0) { $maxWidth = 0; }
            if (fontColor.indexOf("[") != -1) {
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var $skilldescribe = this._baseRender.uiAtlas.getRec($ui.skinName);
            var $ctx = UIManager.getInstance().getContext2D($skilldescribe.pixelWitdh, $skilldescribe.pixelHeight, false);
            $ctx.font = "bolder " + fontsize + "px " + UIData.font;
            TextRegExp.wrapText($ctx, "[853d07]" + $ms, fontColor, 0, 0, $maxWidth, 16);
            this._baseRender.uiAtlas.updateCtx($ctx, $skilldescribe.pixelX, $skilldescribe.pixelY);
        };
        FactionBuildRightPanel.prototype.getTimestr = function ($time) {
            var hour = Math.floor($time / 60);
            var min = $time - hour * 60;
            var str1 = "";
            if (hour > 0) {
                var str1 = hour + "小时";
            }
            var str2 = str1 + min + "分钟";
            return str2;
        };
        FactionBuildRightPanel.prototype.rewardClik = function (evt) {
            var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
            aa.id = evt.target.data;
            ModuleEventManager.dispatchEvent(aa);
        };
        FactionBuildRightPanel.prototype.butClik = function (evt) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.build:
                    if (!this.getIdentity()) {
                        msgtip.MsgTipManager.outStrById(22, 52);
                        return;
                    }
                    if (GuidData.faction.getBuildCur() != 0) {
                        TimeUtil.addTimeOut(30, function () {
                            AlertUtil.show("当前有建筑正在建造中，是否需要加速建造？", "提示", function (a) { _this.backFun(a); });
                        });
                        return;
                    }
                    if (GuidData.faction.getMoney() < this._data.data.cost) {
                        msgtip.MsgTipManager.outStrById(22, 55);
                        return;
                    }
                    if (GuidData.faction.getLev() <= this._data.data.level && this._data.data.type != 1) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前建筑已达等级上限", 99);
                        return;
                    }
                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BUILDING_UPGRADE, this._data.data.id, 0, "", "");
                    break;
                default:
                    break;
            }
        };
        FactionBuildRightPanel.prototype.backFun = function (a) {
            var _this = this;
            if (a == 1) {
                //购买次数
                var tab3 = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
                //加速建造
                var $evt = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL);
                $evt.resoureItem = tab3.speedup_cost;
                // $evt.Type = popbuy.PopBuyType.SPEEDBUILD;
                $evt.Info1 = "剩余";
                var tab = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
                $evt.Info2 = "一次加速减少" + tab.speedup_time + "分钟建造时间";
                $evt.cutNum = tab3.speedup_limit - GuidData.player.getFactionSpeedUpNum();
                $evt.SubmitFun = function (value) {
                    if (_this.compareTime(value * tab3.speedup_time)) {
                        NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BUILDING_UPGRADE_SPEEDUP, value, 0, "", "");
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "建筑即将建造完成，请减少购买次数", 99);
                    }
                };
                ModuleEventManager.dispatchEvent($evt);
            }
        };
        FactionBuildRightPanel.prototype.compareTime = function ($addtime) {
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts);
            var time = ($sever.getTime() + $addtime * 60) - GuidData.faction.getBuildEndTime() - 59;
            if (time > 0) {
                return false;
            }
            else {
                return true;
            }
        };
        FactionBuildRightPanel.prototype.getIdentity = function () {
            var ary = GuidData.faction.getFactionList();
            var identity;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == GuidData.player.getGuid()) {
                    identity = ary[i].identity;
                    break;
                }
            }
            var basetabvo = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
            for (var i = 0; i < basetabvo.zhiwei_limit.length; i++) {
                if (basetabvo.zhiwei_limit[i] == identity) {
                    return true;
                }
            }
            return false;
        };
        return FactionBuildRightPanel;
    }(UIVirtualContainer));
    faction.FactionBuildRightPanel = FactionBuildRightPanel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBuildList.js.map