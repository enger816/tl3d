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
    var CharBgPanel = /** @class */ (function (_super) {
        __extends(CharBgPanel, _super);
        function CharBgPanel() {
            var _this = _super.call(this) || this;
            _this._lastMouseX = 0;
            _this._lastRoleRotatioinY = 0;
            _this.uiAtlasComplet = false;
            // public refreshShenBing(): void {
            //     var divID: number = GuidData.player.getDivineID();
            //     if (divID) {
            //         var obj: any = TableData.getInstance().getData(TableData.tb_divine_base, divID);
            //         IconManager.getInstance().getIcon(geteqiconIconUrl(obj.icon),
            //             ($img: any) => {
            //                 var rec: UIRectangle = this._baseUiAtlas.getRec(this.shengbingUI.skinName);
            //                 var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //                 //背景框
            //                 var baseRec: any = this._baseUiAtlas.getRec("u_icon");
            //                 ctx.drawImage(this._baseUiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, 66, 66);
            //                 ctx.drawImage($img, 0, 0, 60, 60, 3, 3, 60, 60);
            //                 this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            //             });
            //         return;
            //     }
            //     this.setNoEquIcon(this.shengbingUI.skinName, 10);
            // }
            // public refreshShiZhuang(): void {
            //     var bgData: BagItemData = GuidData.bag.getEquByPart(SharedDef.EQUIPMENT_TYPE_FASHION);
            //     if (bgData) {
            //         var entryData: any = bgData.entryData;
            //         var url: string = geteqiconIconUrl(entryData.icon);
            //         IconManager.getInstance().getIcon(url,
            //             ($img: any) => {
            //                 var rec: UIRectangle = this._baseUiAtlas.getRec(this.shizhuangUI.skinName);
            //                 var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //                 //背景框
            //                 var baseRec: any = this._baseUiAtlas.getRec("u_icon_t");
            //                 ctx.drawImage(this._baseUiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, 66, 66);
            //                 ctx.drawImage($img, 0, 0, 60, 60, 3, 3, 60, 60);
            //                 this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            //             });
            //         this.shizhuangUI.data = bgData;
            //         this.shizhuangUI.addEventListener(InteractiveEvent.Up, this.equClick, this);
            //         return;
            //     }
            //     //this.refreshNoShiZhuang();
            //     this.setNoEquIcon(this.shizhuangUI.skinName, 11);
            // }
            // public setEquIcon($url: string, $skinName: string, entryData: any, $index: number): void {
            //     IconManager.getInstance().getIcon($url,
            //         ($img: any) => {
            //             var rec: UIRectangle = this._baseUiAtlas.getRec($skinName);
            //             var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //             //var baseRec: any = this._baseUiAtlas.getRec("u_icon");
            //             //ctx.drawImage(this._baseUiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, 66, 66);
            //             //绘制图标
            //             UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            //             ctx.drawImage($img, 0, 0, 60, 60, 3, 3, 60, 60);
            //             UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(entryData.quality), new Rectangle(3, 3, 60, 60), UIData.publicUi);
            //             this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            //         });
            // }
            _this.partNameAry = ["武器", "衣服", "护手", "腰带", "鞋子", "头饰", "项链", "手镯", "戒指", "腰坠"];
            _this._defaultIdx = 1; //1表示默认 0 表示显示熔炼
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender();
            _this.addRender(_this._redPointRender);
            _this._baseUiAtlas = new UIAtlas();
            _this._bagPanel = new charbg.BagPanel();
            _this.smeltPanel = new charbg.SmeltEquPanel();
            _this.addPersonChar();
            return _this;
        }
        CharBgPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._bagPanel.dispose();
            this._bagPanel = null;
            //this._infoPanel.dispose();
            //this._infoPanel = null;
        };
        CharBgPanel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                UIManager.popClikNameFun("w_close");
                this.close();
            }
        };
        CharBgPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/charbg/charbags.xml", "ui/uidata/charbg/bag.png", function () { _this.loadConfigCom(); }, "ui/uidata/charbg/charbaguse.png");
        };
        CharBgPanel.prototype.bgDataChg = function ($data, $showType) {
            if ($showType == BagData.TYPE_EQU) {
                this.chgEqu($data);
            }
            else {
                this._bagPanel.bgDataChg($data, $showType);
                // if (($showType - 1) == BagData.TYPE_EQU) {
                //     this._smeltPanel.bgDataChg($data);
                // }
                if (this.smeltPanel.hasStage && $showType == BagData.TYPE_EQU_BG) {
                    this.smeltPanel.bagDataChg();
                }
            }
        };
        CharBgPanel.prototype.chgEqu = function ($data) {
            for (var i = 0; i < $data.length; i++) {
                var bgData = GuidData.bag.getEquByPart($data[i]);
                // if ($data[i] == SharedDef.EQUIPMENT_TYPE_FASHION) {
                //     this.refreshShiZhuang();
                //     continue;
                // }
                if (bgData) {
                    var entryData = TableData.getInstance().getData(TableData.tb_item_template, bgData.entry);
                    var ui;
                    ui = this.equViewList[bgData.pos - 1];
                    //this.setEquIcon(geteqiconIconUrl(entryData.icon), ui.skinName, entryData, bgData.pos - 1);
                    IconManager.getInstance().drawItemIcon60(ui, entryData.id, 1, false, false);
                    ui.data = bgData;
                    ui.addEventListener(InteractiveEvent.Up, this.equClick, this);
                }
                else {
                    this.removeEquView($data[i] - 1);
                }
            }
            this._bagPanel.drawUpDown();
        };
        CharBgPanel.prototype.addPersonChar = function () {
            var _this = this;
            var $person2DChar = new Person2DChar();
            this.wintopRender.addModel($person2DChar);
            this.showDisPlay = $person2DChar;
            this._rotationFun = function (d) { _this.rotationRole(); };
            this.refreshRole();
            this.setWing();
            this.resize();
        };
        CharBgPanel.prototype.setWing = function () {
            if (!this.wingDisplay) {
                if (GuidData.grow.getWingID()) {
                    this.wingDisplay = new Person2DChar();
                    this.wingDisplay.needUIUrl = false;
                    this.wintopRender.addModel(this.wingDisplay);
                    this.wingDisplay.setBind(this.showDisPlay, SceneChar.WING_SLOT);
                }
            }
            if (GuidData.grow.getWingID()) {
                this.wingDisplay.setAvatar(GuidData.grow.getWingModel());
            }
        };
        CharBgPanel.prototype.refreshRole = function () {
            this.resetAvata();
            this.resetWeapon();
        };
        CharBgPanel.prototype.resetAvata = function () {
            this.showDisPlay.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
        };
        CharBgPanel.prototype.resetWeapon = function () {
            this.showDisPlay.setBaseRoleWeapon(GuidData.player.getWeapon(), GuidData.player.getCharType());
        };
        CharBgPanel.prototype.refreshWing = function () {
            this.setWing();
        };
        CharBgPanel.prototype.refreshRoleType = function ($type) {
            if ($type == 0) {
                this.resetAvata();
            }
            else if ($type == 1) {
                this.resetWeapon();
            }
        };
        CharBgPanel.prototype.A_left_bg_MouseDown = function (evt) {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.showDisPlay.rotationY;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        CharBgPanel.prototype.A_left_bg_MouseMove = function (evt) {
            this.showDisPlay.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        };
        CharBgPanel.prototype.A_left_bg_MouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        CharBgPanel.prototype.rotationRole = function () {
            this.showDisPlay.rotationY -= 0.5;
        };
        CharBgPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.showDisPlay.resize();
            this.showDisPlay.scale = 5.5 * UIData.Scale;
            this.showDisPlay.x = 80 * UIData.Scale;
            this.showDisPlay.y = -130 * UIData.Scale;
            if (this.wingDisplay) {
                this.wingDisplay.resize();
                this.wingDisplay.scale = 5.5 * UIData.Scale;
            }
        };
        CharBgPanel.prototype.loadConfigCom = function () {
            this.uiAtlasComplet = true;
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._bagPanel.setUIAtlas(this._baseUiAtlas);
            // this._infoPanel.setUIAtlas(this._baseUiAtlas);
            //this._smeltPanel.setUIAtlas(this._baseUiAtlas);
            var renderLevel = this._baseRender;
            this.equViewList = new Array;
            for (var i = 0; i < 10; i++) {
                var eq = this._bgRender.getComponent("a_eq_" + i);
                this.addChild(eq);
                this.equViewList.push(eq);
            }
            this.addChild(this._bgRender.getComponent("d_rolebg"));
            this._zlUI = this._baseRender.getComponent("a_zhanli");
            this.addChild(this._zlUI);
            this.addBaseBg();
            var b_rongliantxt = this.addChild(this._topRender.getComponent("b_rongliantxt"));
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, b_rongliantxt.skinName, "熔炼", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var rl = this.addChild(this._baseRender.getComponent("b_ronglian"));
            rl.addEventListener(InteractiveEvent.Down, this.showRL, this);
            this._rlRed = this._redPointRender.getRedPointUI(this, 2, new Vector2D(rl.x + rl.width, rl.y));
            this.refreshEquData();
            this.refreshForce();
            if (this.hasStage) {
                this._bagPanel.show();
                if (this._defaultIdx == 0) {
                    this.showRL();
                }
            }
            this.resize();
            GoodsTip.getInstance().init();
            this.applyLoadComplete();
        };
        CharBgPanel.prototype.showRL = function ($e) {
            var _this = this;
            if ($e === void 0) { $e = null; }
            UIManager.popClikNameFun("b_ronglian");
            this.smeltPanel.load(function () {
                _this.smeltPanel.show(_this._baseUiAtlas);
                var $scenePange = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW);
                $scenePange.data = SharedDef.MODULE_BAG;
                ModuleEventManager.dispatchEvent($scenePange);
            });
        };
        CharBgPanel.prototype.refreshForce = function () {
            //LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._zlUI.skinName, "战力:" + GuidData.player.getForce(), 16, TextAlign.CENTER, ColorType.Orange853d07);
            ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this._zlUI.skinName, Snum(GuidData.player.getForce()), ArtFont.num56, TextAlign.LEFT);
        };
        CharBgPanel.prototype.refreshLevel = function () {
            if (this._bagPanel) {
                this._bagPanel.drawEquDis();
            }
        };
        //private smeltBg: UICompenent;
        CharBgPanel.prototype.addBaseBg = function () {
            this.addUIList(["a_bag_bg0", "a_win_line1"], this.winmidRender);
            this.addChild(this._bgRender.getComponent("a_zl_bg"));
            this.addChild(this._baseRender.getComponent("a_title"));
            this.roleBg = this.winmidRender.getComponent("a_ming_bg");
            this.addChild(this.roleBg);
            //this.roleBg.addEventListener(InteractiveEvent.Down, this.A_left_bg_MouseDown, this);
            var ui = this._baseRender.getComponent("a_rotation_bg");
            this.addChild(ui);
            ui.addEventListener(InteractiveEvent.Down, this.A_left_bg_MouseDown, this);
            //this.smeltBg = this.winmidRender.getComponent("smelt_bg");
        };
        // private selectTabIndex(tabId: number): void {
        //     if (tabId == 0) {
        //         this._bagPanel.hide();
        //         this._infoPanel.show();
        //         this._smeltPanel.hide();
        //         this.showHideRole(true);
        //     } else if (tabId == 1) {
        //         this._bagPanel.show();
        //         this._infoPanel.hide();
        //         this._smeltPanel.hide();
        //         this.showHideRole(true);
        //     } else if (tabId == 2) {
        //         this._bagPanel.hide();
        //         this._infoPanel.hide();
        //         this._smeltPanel.show();
        //         this.showHideRole(false);
        //     }
        // }
        // private _roleVisible: boolean = true;
        // private showHideRole(tf): void {
        //     if (tf == this._roleVisible) {
        //         return;
        //     }
        //     this._roleVisible = tf;
        //     if (tf) {
        //         this.addRender(this._bgRender);
        //         this.addChild(this.roleBg);
        //         //this.removeChild(this.smeltBg);
        //     } else {
        //         this.removeRender(this._bgRender);
        //         this.removeChild(this.roleBg);
        //         //this.addChild(this.smeltBg)
        //     }
        //     this.showDisPlay.visible = this._roleVisible;
        // }
        CharBgPanel.prototype.refreshEquData = function () {
            var equData = GuidData.bag.getEquData();
            for (var i = 0; i < 10; i++) {
                var part = i + 1;
                var ui = this.equViewList[i];
                if (equData[part]) {
                    var entryData = equData[part].entryData;
                    //this.setEquIcon(geteqiconIconUrl(entryData.icon), ui.skinName, entryData, i);
                    IconManager.getInstance().drawItemIcon60(ui, entryData.id, 1, false, false);
                    ui.data = equData[part];
                    ui.addEventListener(InteractiveEvent.Up, this.equClick, this);
                }
                else {
                    this.setNoEquIcon(ui.skinName, i);
                }
            }
        };
        CharBgPanel.prototype.setNoEquIcon = function ($skinName, $index) {
            var rec = this._baseUiAtlas.getRec($skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            //背景框
            //var baseRec: any = this._baseUiAtlas.getRec("u_icon");
            //ctx.drawImage(this._baseUiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, 66, 66);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            //背景标题类型
            //baseRec = this._baseUiAtlas.getRec("u_eq_" + $index);
            //ctx.drawImage(this._baseUiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 15, 25, 37, 19);
            LabelTextFont.writeSingleLabelToCtx(ctx, this.partNameAry[$index], 16, 0, 25, TextAlign.CENTER, ColorType.Brownac8965);
            this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        };
        CharBgPanel.prototype.removeEquView = function ($idx) {
            if (this.equViewList[$idx]) {
                this.setNoEquIcon(this.equViewList[$idx].skinName, $idx);
                this.equViewList[$idx].removeEventListener(InteractiveEvent.Up, this.equClick, this);
            }
        };
        CharBgPanel.prototype.equClick = function ($evt) {
            UIManager.popClikNameFun("a_eq_0");
            var evt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
            evt.data = $evt.target.data;
            evt.buttonType = 1;
            ModuleEventManager.dispatchEvent(evt);
        };
        CharBgPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
            //this._infoPanel.hide();
            this._bagPanel.hide();
            this.smeltPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        CharBgPanel.prototype.add = function ($idx) {
            if ($idx === void 0) { $idx = 1; }
            this._defaultIdx = $idx;
            if (this.uiAtlasComplet) {
                // this._virtualRightPanel.selectTabIndex($idx);
                this._bagPanel.show();
                if ($idx == 0) {
                    this.showRL();
                }
                this.refreshRole();
                this.setWing();
            }
            ModulePageManager.showResTittle([1, 2, 3]);
        };
        return CharBgPanel;
    }(WindowUi));
    charbg.CharBgPanel = CharBgPanel;
    // export class CharBagRightPanel extends UIVirtualContainer {
    //     private _bgRender: UIRenderComponent;
    //     private _baseRender: UIRenderComponent;
    //     private _clickFun: Function;
    //     private _closeFun: Function;
    //     public constructor() {
    //         super();
    //         this.width = 960;
    //         this.height = 540;
    //         this.center = 0;
    //         this.middle = 0;
    //     }
    //     private a_menu_0: SelectButton;
    //     private a_menu_1: SelectButton;
    //     private a_menu_2: SelectButton;
    //     private selcetTabId: number = 0;
    //     public selectTabIndex(tabId: number): void {
    //         if (tabId == 0) {
    //             this.a_menu_0.selected = true;
    //             this.a_menu_1.selected = false;
    //             this.a_menu_2.selected = false;
    //         } else if (tabId == 1) {
    //             this.a_menu_0.selected = false;
    //             this.a_menu_1.selected = true;
    //             this.a_menu_2.selected = false;
    //         } else if (tabId == 2) {
    //             this.a_menu_0.selected = false;
    //             this.a_menu_1.selected = false;
    //             this.a_menu_2.selected = true;
    //         }
    //         this.selcetTabId = tabId;
    //         this._clickFun(this.selcetTabId);
    //     }
    //     public setRender($bg: UIRenderComponent, $base: UIRenderComponent): void {
    //         this._bgRender = $bg;
    //         this._baseRender = $base;
    //         this.a_menu_0 = <SelectButton>this._baseRender.getComponent("a_menu_0");
    //         this.addChild(this.a_menu_0)
    //         this.a_menu_0.addEventListener(InteractiveEvent.Down, this.butClik, this);
    //         this.a_menu_1 = <SelectButton>this._baseRender.getComponent("a_menu_1");
    //         this.addChild(this.a_menu_1)
    //         this.a_menu_1.addEventListener(InteractiveEvent.Down, this.butClik, this);
    //         this.a_menu_2 = <SelectButton>this._baseRender.getComponent("a_menu_2");
    //         this.addChild(this.a_menu_2)
    //         this.a_menu_2.addEventListener(InteractiveEvent.Down, this.butClik, this);
    //         this.selectTabIndex(1);
    //     }
    //     public setClickeFun($fun: Function, $close: Function): void {
    //         this._clickFun = $fun;
    //         this._closeFun = $close;
    //     }
    //     protected butClik(evt: InteractiveEvent): void {
    //         switch (evt.target.name) {
    //             case "a_menu_0":
    //                 this.selectTabIndex(0)
    //                 break
    //             case "a_menu_1":
    //                 this.selectTabIndex(1)
    //                 break
    //             case "a_menu_2":
    //                 this.selectTabIndex(2)
    //                 break
    //             case "a_char_bg":
    //                 break
    //             case "a_close_an":
    //                 this._closeFun();
    //                 break
    //             default:
    //                 break;
    //         }
    //     }
    // }
})(charbg || (charbg = {}));
var ItemGoodQuality = /** @class */ (function () {
    function ItemGoodQuality() {
    }
    ItemGoodQuality.getQuaStr = function ($qu) {
        switch ($qu) {
            case 0:
                return PuiData.A_GOODS_WHITE;
            case 1:
                return PuiData.A_GOODS_GREEN;
            case 2:
                return PuiData.A_GOODS_BLUE;
            case 3:
                return PuiData.A_GOODS_PURPLE;
            case 4:
                return PuiData.A_GOODS_ORANGE;
            case 5:
                return PuiData.A_GOODS_RED;
            default:
                return PuiData.A_GOODS_WHITE;
        }
    };
    return ItemGoodQuality;
}());
//# sourceMappingURL=CharBgPanel.js.map