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
var exterior;
(function (exterior) {
    var IdentificationListRender = /** @class */ (function (_super) {
        __extends(IdentificationListRender, _super);
        function IdentificationListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        IdentificationListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.G_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "G_BG", 0, 0, 530, 88, 10, 10);
            $container.addChild(this.G_BG);
            this.G_BG.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.iconAry = new Array;
            this.G_ICON0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_ICON0", 12, 10, 68, 68);
            $container.addChild(this.G_ICON0);
            this.G_ICON1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_ICON1", 87, 10, 68, 68);
            $container.addChild(this.G_ICON1);
            this.G_ICON2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_ICON2", 160, 10, 68, 68);
            $container.addChild(this.G_ICON2);
            this.iconAry.push(this.G_ICON0);
            this.iconAry.push(this.G_ICON1);
            this.iconAry.push(this.G_ICON2);
            this.G_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_NAME", 240, 20, 300, 18);
            $container.addChild(this.G_NAME);
            this.G_INFO = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_INFO", 240, 45, 300, 18);
            $container.addChild(this.G_INFO);
            this.G_LEFT_TOP = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_LEFT_TOP", 2, 2, 47, 41);
            $container.addChild(this.G_LEFT_TOP);
        };
        IdentificationListRender.prototype.butClik = function (evt) {
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        };
        IdentificationListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        IdentificationListRender.prototype.setnull = function () {
        };
        IdentificationListRender.prototype.applyRender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                var $nameTips = "收集:";
                var $infoTips = ColorType.Brown7a2f21 + "属性:";
                var $allPass = true;
                for (var i = 0; i < $vo.exterior.length; i++) {
                    var $has = GuidData.grow.isSpellIntFieldAppearanceById($vo.exterior[i]);
                    var $TB_appearance_info = tb.TB_appearance_info.getTempVo($vo.exterior[i]);
                    $nameTips += "[" + $TB_appearance_info.name + "]";
                    IconManager.getInstance().drawItemIcon60(this.iconAry[i], $TB_appearance_info.icon, 1, !$has, false);
                    if (!$has) {
                        $allPass = false;
                        $infoTips += ColorType.color5f5c59;
                    }
                    else {
                        $infoTips += ColorType.colorcd2000;
                    }
                    for (var j = 0; j < $vo.attrKeys.length; j++) {
                        $infoTips += getKeyProById($vo.attrKeys[j]) + " +" + $vo.attrValues[j] + ";";
                    }
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_NAME.skinName, ColorType.Brown7a2f21 + $nameTips, 16, TextAlign.LEFT);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_INFO.skinName, $infoTips, 16, TextAlign.LEFT);
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_BG.skinName, "U_BG");
                    if ($allPass) {
                        UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_LEFT_TOP.skinName, "U_LEFT_TOP");
                    }
                    else {
                        this.uiAtlas.clearCtxTextureBySkilname(this.G_LEFT_TOP.skinName);
                    }
                }
            }
        };
        return IdentificationListRender;
    }(SListItem));
    exterior.IdentificationListRender = IdentificationListRender;
    var IdentificationList = /** @class */ (function (_super) {
        __extends(IdentificationList, _super);
        function IdentificationList() {
            var _this = _super.call(this) || this;
            _this.setShowLevel(12);
            return _this;
        }
        IdentificationList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        IdentificationList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, IdentificationListRender, 530, 88 * 3 - 40, 530, 88, 3, 512, 1024, 1, 5);
        };
        IdentificationList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var $exterior = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).waiguantj;
            var $item = new Array();
            for (var i = 0; i < $exterior.length; i++) {
                var $vo = new SListItemData();
                $vo.data = tb.TB_appearance_pokedex.getTempVo($exterior[i]);
                $vo.id = i;
                $item.push($vo);
            }
            this.refreshData($item);
        };
        IdentificationList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return IdentificationList;
    }(SList));
    exterior.IdentificationList = IdentificationList;
    var IdentificationPanel = /** @class */ (function (_super) {
        __extends(IdentificationPanel, _super);
        function IdentificationPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        IdentificationPanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            _super.prototype.dispose.call(this);
        };
        IdentificationPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/exterior/identification/identification.xml", "ui/uidata/exterior/identification/identification.png", function () { _this.loadConfigCom(); }, "ui/uidata/exterior/identification/identificationuse.png");
        };
        IdentificationPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_list_title"));
            this.a_zhanli_num = this.addChild(this._bottomRender.getComponent("a_zhanli_num"));
            this.addChild(this._bottomRender.getComponent("a_zhanli_label"));
            this.addChild(this._bottomRender.getComponent("a_win_tittle"));
            this.addChild(this._bottomRender.getComponent("a_list_bg"));
            this.a_list_pos = this.addChild(this._bottomRender.getComponent("a_list_pos"));
            this.sxItem = new Array;
            for (var i = 0; i < 6; i++) {
                this.sxItem.push(this.addChild(this._bottomRender.getComponent("a_sx_" + i)));
            }
            this.initList();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        IdentificationPanel.prototype.initList = function () {
            this.identificationList = new IdentificationList;
            this.identificationList.init(this._midRender.uiAtlas);
        };
        IdentificationPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.baseBg:
                case this.e_close:
                    this.hide();
                    break;
            }
        };
        IdentificationPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.identificationList.hide();
        };
        IdentificationPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.identificationList.show();
            this.refrish();
        };
        IdentificationPanel.prototype.refrish = function () {
            var $waiguantj = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).waiguantj;
            var $dicKey = new Object;
            for (var i = 0; i < $waiguantj.length; i++) {
                var $exteriorArr = tb.TB_appearance_pokedex.getTempVo($waiguantj[i]).exterior;
                var $allPass = true;
                for (var k = 0; k < $exteriorArr.length; k++) {
                    var $has = GuidData.grow.isSpellIntFieldAppearanceById($exteriorArr[k]);
                    if (!$has) {
                        $allPass = false;
                    }
                }
                if ($allPass) {
                    for (var j = 0; j < $exteriorArr.length; j++) {
                        var $TB_appearance_info = tb.TB_appearance_info.getTempVo($exteriorArr[j]);
                        for (var k = 0; k < $TB_appearance_info.attrKeys.length; k++) {
                            if (!$dicKey[$TB_appearance_info.attrKeys[k]]) {
                                $dicKey[$TB_appearance_info.attrKeys[k]] = 0;
                            }
                            $dicKey[$TB_appearance_info.attrKeys[k]] += $TB_appearance_info.attrValues[k];
                        }
                    }
                }
            }
            var uiSkipNum = 0;
            var $aaa = new Array();
            var $bbb = new Array();
            for (var key in $dicKey) {
                UiDraw.drawAttVal(this.sxItem[uiSkipNum++], Number(key), $dicKey[key]);
                $aaa.push(Number(key));
                $bbb.push($dicKey[key]);
            }
            ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this.a_zhanli_num.skinName, String(getForceByAtt($aaa, $bbb)), ArtFont.num56, 3);
        };
        IdentificationPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.identificationList) {
                this.identificationList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x;
                this.identificationList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y;
            }
        };
        return IdentificationPanel;
    }(WindowMinUi));
    exterior.IdentificationPanel = IdentificationPanel;
})(exterior || (exterior = {}));
//# sourceMappingURL=IdentificationPanel.js.map