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
    var FactionBossRender = /** @class */ (function (_super) {
        __extends(FactionBossRender, _super);
        function FactionBossRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionBossRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var centerRender = this._customRenderAry[0];
            var topRender = this._customRenderAry[1];
            this.C_list_cell = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "C_list_cell", 0, 0, 256, 80);
            $container.addChild(this.C_list_cell);
        };
        Object.defineProperty(FactionBossRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
                if (val) {
                    var bb = new faction.FactionBossEvent(faction.FactionBossEvent.CLICK_BOSS_ITEM);
                    bb.data = this.itdata.data;
                    ModuleEventManager.dispatchEvent(bb);
                }
            },
            enumerable: true,
            configurable: true
        });
        /*
        private drawToUiAtlasToCtx($ctx: CanvasRenderingContext2D, $fromuiAtlas: UIAtlas, $shareName:string,$posRect:Rectangle): void
        {
            var imgUseRect: UIRectangle = $fromuiAtlas.getRec($shareName)
            if (!$posRect) {
                $posRect=new Rectangle(0,0,0,0)
            }
            if ($posRect.width > 1 && $posRect.height > 1) {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, $posRect.width, $posRect.height);
            } else {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
            }

        }
        */
        FactionBossRender.prototype.applyrender = function () {
            var _this = this;
            var vo = this.itdata.data;
            LoadManager.getInstance().load(Scene_data.fileRoot + getUIIconUrl(String(vo.data.entry)), LoadManager.IMG_TYPE, function ($img) {
                var $touiAtlas = _this.uiAtlas;
                var $fromuiAtlas = _this.parentTarget.baseAtlas;
                var $skinName = _this.C_list_cell.skinName;
                var $uiRectangle = $touiAtlas.getRec($skinName);
                var $ctx = UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);
                if (_this.selected) {
                    UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_select_bg", new Rectangle(0, 0, 256, 80));
                }
                UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_icon_bg", new Rectangle(6, 11));
                $ctx.drawImage($img, 0, 0, 65, 65, 6 + 4, 11 + 4, 52, 52);
                LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Green20a200 + vo.data1.name, 18, 75, 14, TextAlign.LEFT);
                if (vo.state == 1) {
                    //正在挑战
                    UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_tiaozhan", new Rectangle(195, 6));
                    LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Orange853d07 + "剩余时间:" + ColorType.colorce0a00 + vo.time[0] + ":" + vo.time[1], 14, 75, 46, TextAlign.LEFT);
                }
                else if (vo.state == 3) {
                    UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_tiaozhan", new Rectangle(195, 6));
                    LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Orange853d07 + "倒计时间:" + ColorType.colorce0a00 + vo.time[0] + ":" + vo.time[1], 14, 75, 46, TextAlign.LEFT);
                }
                if (vo.state1 == 1) {
                    //已通关
                    UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_pass", new Rectangle(185, 18));
                }
                if (vo.state1 == 3) {
                    //未开放
                    var str = "";
                    if (vo.data.faction_lv_limit > GuidData.faction.getLev()) {
                        str = "帮会" + vo.data.faction_lv_limit + "级解锁";
                        UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_mask", new Rectangle(0, 0, 256, 80));
                        LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whiteffffff + str, 20, 75, 25, TextAlign.LEFT);
                    }
                    else {
                        str = "击杀上一个boss解锁";
                        LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Orange853d07 + str, 14, 75, 46, TextAlign.LEFT);
                    }
                }
                UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_line", new Rectangle(0, 0, 256, 4));
                TextureManager.getInstance().updateTexture($touiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, $ctx);
            });
            //  FactionBossRender.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.C_list_cell.skinName, "S_tiaozhan");
            /*
            FactionBossRender.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.B_bottom_line.skinName, "S_line");
            UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.B_head_icon.skinName, "S_icon_bg");
            //boss名字
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.BossName.skinName, ColorType.Green20a200 + vo.data1.name, 18, TextAlign.LEFT);
            if (vo.state == 1) {
                //正在挑战
                UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.Challenge.skinName, "S_tiaozhan");
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, vo.time[0] + ":" + vo.time[1], 16, TextAlign.CENTER);
            } else if (vo.state == 3) {
                UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.Challenge.skinName, "S_tiaozhan");
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, ColorType.Orange + vo.time[0] + ":" + vo.time[1], 16, TextAlign.CENTER);
            } else {
                this.uiAtlas.clearCtxTextureBySkilname(this.Challenge.skinName)
                this.uiAtlas.clearCtxTextureBySkilname(this.Time.skinName)
            }

            if (vo.state1 == 1) {
                //已通关
                UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.Over.skinName, "S_pass");
            } else {
                this.uiAtlas.clearCtxTextureBySkilname(this.Over.skinName)

            }
            if (vo.state1 == 3) {
                //未开放
                var str: string = "";
                if (vo.data.faction_lv_limit > GuidData.faction.getLev()) {
                    str = "帮会" + vo.data.faction_lv_limit + "解锁";
                } else {
                    str = "击杀上一个boss解锁";
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Open.skinName, ColorType.Orange + str, 14, TextAlign.LEFT);
            } else {
                LabelTextFont.clearLabel(this.uiAtlas, this.Open.skinName);
            }

            if (this.selected) {
           //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Select.skinName, UIData.publicUi, PuiData.A_HIGHT_F);
            } else {
         //       LabelTextFont.clearLabel(this.uiAtlas, this.Select.skinName);
            }


            */
        };
        FactionBossRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.C_list_cell.addEventListener(InteractiveEvent.Up, this.equClick, this);
            }
            else {
                this.C_list_cell.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        };
        FactionBossRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata) {
                var vo = this.itdata.data;
                if (vo.state1 == 3) {
                    msgtip.MsgTipManager.outStrById(22, 51);
                    return;
                }
                this.setSelect();
            }
        };
        FactionBossRender.prototype.setnull = function () {
            /*
            LabelTextFont.clearLabel(this.uiAtlas, this.Over.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.BossName.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Challenge.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Time.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Bg.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Select.skinName);
            */
        };
        return FactionBossRender;
    }(SListItem));
    faction.FactionBossRender = FactionBossRender;
    var FactionBossList = /** @class */ (function (_super) {
        __extends(FactionBossList, _super);
        function FactionBossList() {
            var _this = _super.call(this) || this;
            _this.left = 141;
            _this.top = 118;
            return _this;
        }
        FactionBossList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        FactionBossList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, FactionBossRender, 256, 350, 0, 80, 3, 256, 256 * 2, 1, 6, 2);
        };
        /**
         * refreshData
         */
        FactionBossList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        };
        FactionBossList.prototype.getData = function () {
            var ary = new Array;
            var listary = faction.FactionBossModel.getInstance().getList();
            //console.log("--listary--",listary);
            for (var i = 0; i < listary.length; i++) {
                var item = new SListItemData;
                item.data = listary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        FactionBossList.prototype.show = function ($type) {
            this._type = $type;
            //console.log("$type--", $type);
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        };
        FactionBossList.prototype.refreshAndselectIndex = function () {
            this.refreshDataByNewData();
            this.setSelectIndex(this._type);
        };
        FactionBossList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return FactionBossList;
    }(SList));
    faction.FactionBossList = FactionBossList;
    var FactionBossRightPanel = /** @class */ (function (_super) {
        __extends(FactionBossRightPanel, _super);
        function FactionBossRightPanel() {
            var _this = _super.call(this) || this;
            _this.starItem = new Array;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            return _this;
        }
        FactionBossRightPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            if (this.bosslist) {
                this.bosslist.dispose();
                this.bosslist = null;
            }
        };
        FactionBossRightPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this._publicuiAtlas = $publicuiAtlas;
            this.initView();
        };
        FactionBossRightPanel.prototype.initView = function () {
            var _this = this;
            var renderLevel = this._baseRender;
            this.tickFun = function () { _this.refreshBossState(); };
            this.Needrefresh();
            this.addChild(renderLevel.getComponent("a_select_boss_label"));
            this.a_1 = this.addChild(renderLevel.getComponent("a_1"));
            this.a_2 = this.addChild(renderLevel.getComponent("a_2"));
            this.b_zhaohuan = this.addEvntBut("b_zhaohuan", renderLevel);
            this.a_4 = this.addChild(renderLevel.getComponent("a_4"));
            this.b_add = this.addEvntBut("b_add", renderLevel);
            this.a_8 = renderLevel.getComponent("a_8");
            this.Isneedredpoint();
            this.a_9 = this.addChild(renderLevel.getComponent("a_9"));
        };
        FactionBossRightPanel.prototype.refreshBossState = function () {
            if (this.bosslist) {
                this.bosslist.refreshDataByNewData();
            }
            if (!faction.FactionBossModel.getInstance().isneedcountdown || !this.hasStage) {
                TimeUtil.removeTimeTick(this.tickFun);
            }
        };
        /**
         * 监听当前挑战的bossid，若不为0，则表示正在挑战boss。需要倒计时刷新界面
         */
        FactionBossRightPanel.prototype.Needrefresh = function () {
            if (GuidData.faction.getBosschallengeidCur() != 0) {
                TimeUtil.addTimeTick(1000, this.tickFun);
            }
        };
        FactionBossRightPanel.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
            if (this.bosslist) {
                this.bosslist.left = this.a_9.parent.x / UIData.Scale + this.a_9.x;
                this.bosslist.top = this.a_9.parent.y / UIData.Scale + this.a_9.y;
            }
        };
        FactionBossRightPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (!this.bosslist) {
                this.bosslist = new FactionBossList();
                this.bosslist.init(this._bottomRender.uiAtlas);
            }
            this.bosslist.show(faction.FactionBossModel.getInstance().getIndex());
            this.resize();
        };
        FactionBossRightPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.bosslist) {
                this.bosslist.hide();
            }
        };
        FactionBossRightPanel.prototype.resetData = function ($data) {
            //console.log("---data---", $data);
            this._data = $data;
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_1.skinName, ColorType.Brown6a4936 + "LV" + $data.data1.level, 14, TextAlign.LEFT, "#000000");
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_2.skinName, ColorType.Brown6a4936 + ($data.data.time / 60) + "分钟", 14, TextAlign.LEFT, "#000000");
            while (this.starItem.length) {
                this.removeChild(this.starItem.pop());
            }
            var $starNum = faction.FactionBossModel.getInstance().getBossStart($data.data1.level);
            //  $starNum=5
            for (var i = 0; i < $starNum; i++) {
                var $a_star = this.addChild(this._baseRender.getComponent("a_star"));
                $a_star.x += i * 20;
                this.starItem.push($a_star);
            }
            this.drawRewardFrame($data.data.all_rewards);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_4.skinName, ColorType.Orange853d07 + $data.data.token_cost, 16);
            this.resize();
        };
        FactionBossRightPanel.prototype.drawRewardFrame = function ($arr) {
            this.clearRewardUi();
            for (var i = 0; i < $arr.length; i++) {
                var $a_reward_frame = this.addChild(this._baseRender.getComponent("a_reward_frame"));
                $a_reward_frame.addEventListener(InteractiveEvent.Down, this.rewardClik, this);
                $a_reward_frame.x += i * 75;
                $a_reward_frame.goToAndStop(i);
                this.drawRewardFrameCtx($arr[i], $a_reward_frame);
                this.rewardFrameUiArr.push($a_reward_frame);
            }
        };
        FactionBossRightPanel.prototype.drawRewardFrameCtx = function ($ary, $ui) {
            var _this = this;
            $ui.data = $ary[0];
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($ary[0]), function ($img) {
                var $uiRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($uiRect.width, $uiRect.height, false);
                UiDraw.cxtDrawImg($ctx, PuiData.PropBg60, new Rectangle(0, 0, 66, 66), UIData.publicUi);
                $ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 58, 58);
                ArtFont.getInstance().writeFontToCtxRight($ctx, String($ary[1]), ArtFont.num1, 64, 45);
                $ui.drawToCtx(_this._baseRender.uiAtlas, $ctx);
            });
        };
        FactionBossRightPanel.prototype.clearRewardUi = function () {
            if (this.rewardFrameUiArr) {
                while (this.rewardFrameUiArr.length) {
                    this.removeChild(this.rewardFrameUiArr.pop());
                }
            }
            else {
                this.rewardFrameUiArr = new Array();
            }
        };
        FactionBossRightPanel.prototype.Isneedredpoint = function () {
            var tab2 = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (tab2.token_max_keep <= GuidData.faction.getBossTokenNum()) {
                this.setUiListVisibleByItem([this.a_8], true);
            }
            else {
                this.setUiListVisibleByItem([this.a_8], false);
            }
        };
        FactionBossRightPanel.prototype.rewardClik = function (evt) {
            var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
            aa.id = evt.target.data;
            ModuleEventManager.dispatchEvent(aa);
        };
        FactionBossRightPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_zhaohuan:
                    if (this.getIdentity() != 1) {
                        msgtip.MsgTipManager.outStrById(22, 52);
                        return;
                    }
                    if (GuidData.faction.getBosschallengeidCur() != 0) {
                        msgtip.MsgTipManager.outStrById(22, 53);
                        return;
                    }
                    if (this._data.state1 == 3) {
                        msgtip.MsgTipManager.outStrById(22, 51);
                        return;
                    }
                    if (GuidData.faction.getBossTokenNum() < this._data.data.token_cost) {
                        msgtip.MsgTipManager.outStrById(22, 54);
                        return;
                    }
                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_CHALLENGE_BOSS, this._data.data.id, 0, "", "");
                    break;
                case this.b_add:
                    //购买次数
                    this.showDuihuanYinbiPanel();
                    break;
                default:
                    break;
            }
        };
        /*
        private aaaa(): void
        {
                   var $ett = new kuafu.KuafuPanelModuleEvent(kuafu.KuafuPanelModuleEvent.SHOW_BUYNUM_DJ_EVENT);
                    $ett.data = 3;
                    ModuleEventManager.dispatchEvent($ett);

        }
        */
        FactionBossRightPanel.prototype.showDuihuanYinbiPanel = function () {
            var tab2 = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (GuidData.faction.getBossTokenNum() < tab2.token_max_keep) {
                var buynum = GuidData.faction.getBossTokentodaybuycount();
                if (buynum < tab2.token_buy_price.length) {
                    var $evt = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL);
                    $evt.resoureItem = tab2.token_buy_price;
                    // $evt.Type = popbuy.PopBuyType.TOKEN;
                    $evt.cutNum = tab2.token_buy_price.length - buynum;
                    $evt.Info1 = "家族Boss剩余可购买";
                    $evt.SubmitFun = function (value) {
                        // NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 1, value, "", "");
                        NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BUY_TOKEN, value, 0, "", "");
                    };
                    ModuleEventManager.dispatchEvent($evt);
                }
                else {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "购买次数已用完..", 99);
                }
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "先请挑战..", 99);
            }
        };
        FactionBossRightPanel.prototype.getIdentity = function () {
            var ary = GuidData.faction.getFactionList();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == GuidData.player.getGuid()) {
                    return ary[i].identity;
                }
            }
            return -1;
        };
        return FactionBossRightPanel;
    }(UIVirtualContainer));
    faction.FactionBossRightPanel = FactionBossRightPanel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBossList.js.map