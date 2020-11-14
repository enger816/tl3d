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
var shieldui;
(function (shieldui) {
    var BlockVo = /** @class */ (function () {
        function BlockVo() {
        }
        return BlockVo;
    }());
    shieldui.BlockVo = BlockVo;
    var ShieldItemRender = /** @class */ (function (_super) {
        __extends(ShieldItemRender, _super);
        function ShieldItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShieldItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var $tx = 50;
            this.l_base_color = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_base_color", 0, 0, 400, 60);
            this.l_bg = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_bg", 0, 0, ShieldSList.listWidth600, 60);
            $container.addChild(this.l_bg);
            this.icon = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "Icon", 0 + $tx, 0, 60, 60);
            $container.addChild(this.icon);
            this.l_name = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_name", 100 + $tx, 20, 100, 16);
            $container.addChild(this.l_name);
            this.l_factionname = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_factionname", 270 + $tx, 20, 100, 16);
            $container.addChild(this.l_factionname);
            this.l_but = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_but", 425 + $tx, 10, 67, 39);
            $container.addChild(this.l_but);
            this.l_but.addEventListener(InteractiveEvent.Down, this.butClik, this);
        };
        ShieldItemRender.prototype.butClik = function (evt) {
            if (this.itdata) {
                var $vo = this.itdata.resdata;
                //console.log("取消", $vo.indx)
                NetManager.getInstance().protocolos.cancel_block_chat($vo.indx);
            }
        };
        ShieldItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                var $vo = $data.resdata;
                this.drawBg($data.id % 2 == 0);
                this.setIcon($vo);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.l_name.skinName, getBaseName($vo.name), 16, TextAlign.LEFT);
                if ($vo.factionName.length) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.l_factionname.skinName, getBaseName($vo.factionName), 16, TextAlign.LEFT);
                }
                else {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.l_factionname.skinName, "", 16, TextAlign.LEFT);
                }
                this.drawBut();
            }
            else {
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.icon.skinName, "", ArtFont.num1);
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_name.skinName, "", ArtFont.num1);
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_factionname.skinName, "", ArtFont.num1);
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_base_color.skinName, "", ArtFont.num1);
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_but.skinName, "", ArtFont.num1);
            }
        };
        ShieldItemRender.prototype.drawBg = function (value) {
            var $rec = this._baseRender.uiAtlas.getRec(this.l_base_color.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var $but = ShieldItemRender.baseAtlas.getRec(value ? "L_bgA" : "L_bgB");
            ctx.drawImage(ShieldItemRender.baseAtlas.useImg, $but.pixelX, $but.pixelY, $but.pixelWitdh, $but.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        ShieldItemRender.prototype.drawBut = function () {
            var $rec = this._baseRender.uiAtlas.getRec(this.l_but.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var $but = ShieldItemRender.baseAtlas.getRec("L_dele_but");
            ctx.drawImage(ShieldItemRender.baseAtlas.useImg, $but.pixelX, $but.pixelY, $but.pixelWitdh, $but.pixelHeight, 0, 0, $but.pixelWitdh, $but.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        ShieldItemRender.prototype.setIcon = function ($vo) {
            var _this = this;
            IconManager.getInstance().getIcon(getTouPic($vo.gender), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.icon.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                //绘制底色
                UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_BASE_66, new Rectangle(0, 0, 60, 60), UIData.publicUi);
                //绘制头像
                ctx.drawImage($img, 0, 0, 82, 82, 2, 2, 56, 56);
                var $but = ShieldItemRender.baseAtlas.getRec("L_dele_but");
                //   ctx.drawImage(ShieldItemRender.baseAtlas.useImg, $but.pixelX, $but.pixelY, $but.pixelWitdh , $but.pixelHeight, distion + 4 + ji.pixelWitdh, 0, $but.pixelWitdh * ratio, $but.pixelHeight);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        return ShieldItemRender;
    }(SListItem));
    shieldui.ShieldItemRender = ShieldItemRender;
    var ShieldSList = /** @class */ (function (_super) {
        __extends(ShieldSList, _super);
        function ShieldSList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        ShieldSList.prototype.init = function ($uiAtlas) {
            ShieldItemRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        ShieldSList.prototype.initData = function () {
            this._ary = new Array();
            this.setData(this._ary, ShieldItemRender, ShieldSList.listWidth600, Math.floor(60 * 5.5), 0, 60, 5, 512, 512, 1, 7);
        };
        /**
         * refreshData
         */
        ShieldSList.prototype.refreshNewData = function ($data) {
            this._ary.length = 0;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.resdata = $data[i];
                item.id = i;
                this._ary.push(item);
            }
            this.refreshData(this._ary);
        };
        ShieldSList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        ShieldSList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        ShieldSList.listWidth600 = 600;
        return ShieldSList;
    }(SList));
    shieldui.ShieldSList = ShieldSList;
    var ShieldUiPanel = /** @class */ (function (_super) {
        __extends(ShieldUiPanel, _super);
        function ShieldUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = 640;
            _this.height = 540;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender.uiAtlas = new UIAtlas;
            return _this;
        }
        ShieldUiPanel.prototype.applyLoad = function () {
            var _this = this;
            GameData.getPublicUiAtlas(function ($uiAtlas) { _this.makePanelUi($uiAtlas); });
        };
        ShieldUiPanel.prototype.makePanelUi = function ($uiAtlas) {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/chat/seting/seting.xml", "ui/uidata/chat/seting/seting.png", function () { _this.loadConfigCom(); }, "ui/uidata/chat/seting/setinguse.png");
        };
        ShieldUiPanel.prototype.setSizeForPanelUi = function ($ui, $uiName) {
            var temp = this._topRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        };
        ShieldUiPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = GameData.publicbgUiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            var guiBg0 = this.addChild(this._bottomRender.getComponent("guiBg0"));
            this.setSizeForPanelUi(guiBg0, "b_bg");
            this.b_close = this.addEvntBut("b_close", this._bottomRender);
            this.setSizeForPanelUi(this.b_close, "b_close");
            var titleBg = this.addChild(this._bottomRender.getComponent("titleBg"));
            this.setSizeForPanelUi(titleBg, "b_tittle_bg");
            var guiBg1 = this.addChild(this._bottomRender.getComponent("guiBg1"));
            this.setSizeForPanelUi(guiBg1, "b_in_bg");
            this._bottomRender.applyObjData();
            this.addChild(this._topRender.getComponent("b_tittle_txt"));
            this.addChild(this._topRender.getComponent("b_label2"));
            this.addChild(this._topRender.getComponent("b_label1"));
            this.addChild(this._topRender.getComponent("b_label0"));
            this.addChild(this._topRender.getComponent("b_line"));
            this.addList();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        ShieldUiPanel.prototype.addList = function () {
            if (!this._shieldSList) {
                this._shieldSList = new ShieldSList();
            }
            this._shieldSList.init(this._topRender.uiAtlas);
        };
        ShieldUiPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                var $item = this.getChatBlockItem();
                this._shieldSList.refreshNewData($item);
                this._shieldSList.show();
                //console.log("show")
            }
        };
        ShieldUiPanel.prototype.getChatBlockItem = function (value) {
            if (value === void 0) { value = true; }
            if (!value && this.blockItem) {
                return this.blockItem;
            }
            if (!this.blockItem) {
                this.blockItem = new Array;
            }
            this.blockItem.length = 0;
            var $strItem = GuidData.player.getPlayChatBlock();
            for (var i = 0; i < $strItem.length; i++) {
                if ($strItem[i]) {
                    var tempArr = $strItem[i].split("|");
                    var $vo = new BlockVo();
                    $vo.gender = Number(tempArr[0]);
                    $vo.level = Number(tempArr[1]);
                    $vo.name = String(tempArr[2]);
                    $vo.vip = Number(tempArr[3]);
                    $vo.factionName = String(tempArr[4]);
                    $vo.guid = String(tempArr[5]);
                    $vo.indx = i;
                    //console.log($vo.indx)
                    this.blockItem.push($vo);
                }
            }
            return this.blockItem;
        };
        ShieldUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_close:
                    this.close();
                    break;
                default:
                    break;
            }
        };
        ShieldUiPanel.prototype.close = function () {
            if (this._shieldSList) {
                this._shieldSList.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
        };
        return ShieldUiPanel;
    }(UIConatiner));
    shieldui.ShieldUiPanel = ShieldUiPanel;
})(shieldui || (shieldui = {}));
//# sourceMappingURL=ShieldUiPanel.js.map