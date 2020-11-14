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
var skinui;
(function (skinui) {
    var UIManager = Pan3d.UIManager;
    var Rectangle = Pan3d.Rectangle;
    var UIData = Pan3d.UIData;
    var TextAlign = Pan3d.TextAlign;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
    var UiDraw = Pan3d.UiDraw;
    var Vector2D = Pan3d.Vector2D;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var SList = Pan3d.SList;
    var SListItem = Pan3d.SListItem;
    var SListItemData = Pan3d.SListItemData;
    var LabelTextFont = Pan3d.LabelTextFont;
    var ColorType = Pan3d.ColorType;
    var TextureManager = Pan3d.TextureManager;
    var SkinMeshVo = /** @class */ (function () {
        function SkinMeshVo() {
        }
        return SkinMeshVo;
    }());
    skinui.SkinMeshVo = SkinMeshVo;
    var SkinListRender = /** @class */ (function (_super) {
        __extends(SkinListRender, _super);
        function SkinListRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        SkinListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            //    this.S_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "S_bg", 0, 0, 500, SkinList.skilcellNum64);
            this.S_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "S_bg", 0, 0, SkinList.num500, 85, 25, 25);
            $container.addChild(this.S_bg);
            this.S_ranking_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_ranking_id", 20, 20, 45, 45);
            $container.addChild(this.S_ranking_id);
            this.S_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "S_ion_pic", 100, 10, 64, 64);
            $container.addChild(this.S_ion_pic);
            this.S_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_name", 180, 23, 140, 38);
            $container.addChild(this.S_name);
            this.S_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_select_bt", 330, 20, 110, 49);
            $container.addChild(this.S_select_bt);
            this.S_select_bt.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.S_select_bt.addEventListener(InteractiveEvent.Up, this.butClik, this);
        };
        SkinListRender.prototype.drawNeedDiamondsTxt = function ($ui, value) {
            var idBgRect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(idBgRect.pixelWitdh, idBgRect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, "Diamonds_icon", new Rectangle(0, 0, 38, 38), UIData.textlist);
            Pan3d.ArtFont.getInstance().writeFontToCtxCenten(this.uiAtlas.ctx, String(value), "NUM41", 80, 8, 6);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, idBgRect.pixelX, idBgRect.pixelY, this.uiAtlas.ctx);
        };
        SkinListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $vo = $data.data;
                var $num = GameData.hasdiamondsHavenum;
                this.uiAtlas.upDataPicToTexture("panelui/skin/pic/" + ($data.id + 1) + ".jpg", this.S_ion_pic.skinName);
                this.drawNeedDiamondsTxt(this.S_name, $vo.need);
                this.drawPicAndTxt(this.S_ranking_id, "List_id_bg", String($data.id + 1), new Vector2D(0, 15), TextAlign.CENTER);
                var $txtStr = "购买";
                var $picStr = "But_base_1";
                if ($vo.ishave) {
                    $txtStr = ColorType.Black000000 + "使用";
                    $picStr = "But_base_3";
                }
                else {
                    if ($vo.need > $num) {
                        $picStr = "But_base_2";
                    }
                }
                if (GameData.skinType == $vo.id) {
                    $txtStr = ColorType.Black000000 + "使用中";
                }
                this.drawPicAndTxt(this.S_select_bt, $picStr, $txtStr, new Vector2D(0, 15), TextAlign.CENTER);
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.S_bg.skinName, UIData.textlist, "List_base_bg_1");
                this.downTarget = null;
            }
        };
        SkinListRender.prototype.drawPicAndTxt = function ($ui, puslicname, txt, pos, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $rect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 18, pos.x, pos.y, $align);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        };
        SkinListRender.prototype.fileColor = function ($iconName, $color) {
            var rec = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color;
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        };
        SkinListRender.prototype.butDown = function (evt) {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y);
            this.downTarget = evt.target;
        };
        SkinListRender.prototype.selctSkinById = function (value) {
            GameData.skinType = value;
            GameData.setStorageSync("skinType", String(GameData.skinType));
            GameData.changeWebUserInfo("skin", String(GameData.skinType));
            if (GameData.getStorageSync("useEffictSkin")) {
                //如果正在使用特效皮肤，将先取消
                GameData.setStorageSync("useEffictSkin", false);
                game.GameDataModel.changeMainEffict();
            }
            game.GameDataModel.centenBall.changeSkinById(GameData.skinType);
            Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.HIDE_SKIN_LIST_PANEL));
            Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
        };
        SkinListRender.prototype.butClik = function (evt) {
            var _this = this;
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $vo = this.itdata.data;
                if ($vo.ishave) {
                    this.selctSkinById($vo.id);
                }
                else {
                    if ($vo.need <= GameData.hasdiamondsHavenum) {
                        msgalert.AlertUtil.show(ColorType.Black000000 + "确认购买 " + ColorType.Redd92200 + $vo.name + ColorType.Black000000 + " 外形" + " \n需要" + $vo.need + "个钻石", "提示", function (value) {
                            if (value == 1) {
                                GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum - $vo.need;
                                var $haveSkinList = GameData.getStorageSync("haveSkinList");
                                if (!$haveSkinList) {
                                    $haveSkinList = new Array();
                                }
                                $haveSkinList.push($vo.id);
                                GameData.setStorageSync("haveSkinList", $haveSkinList);
                                _this.selctSkinById($vo.id);
                            }
                        }, 2);
                    }
                    else {
                        msgalert.AlertUtil.show(ColorType.Black000000 + "你身上的钻石不足", "提示", function (value) {
                            if (value == 1) {
                                Pan3d.ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                            }
                        }, 2);
                    }
                }
            }
        };
        return SkinListRender;
    }(SListItem));
    skinui.SkinListRender = SkinListRender;
    var SkinList = /** @class */ (function (_super) {
        __extends(SkinList, _super);
        function SkinList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -50;
            _this._maskLevel = 5;
            return _this;
        }
        SkinList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        SkinList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, SkinListRender, SkinList.num500, SkinList.skilcellNum64 * 6, 0, SkinList.skilcellNum64, 6, 256, 1024, 1, 10);
        };
        SkinList.prototype.refreshDataByNewData = function (value) {
            var $xmlArr = JSON.parse(value);
            var $sListItemData = this.getData($xmlArr);
            this.refreshData($sListItemData);
        };
        SkinList.prototype.isHaveById = function (value) {
            var haveSkinList = GameData.getStorageSync("haveSkinList");
            if (haveSkinList) {
                for (var i = 0; i < haveSkinList.length; i++) {
                    if (haveSkinList[i] == value) {
                        return true;
                    }
                }
            }
            else {
                return false;
            }
        };
        SkinList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                var $vo = new SkinMeshVo;
                $vo.id = $ary[i].id;
                $vo.name = $ary[i].name;
                $vo.need = $ary[i].need;
                $vo.ishave = this.isHaveById($vo.id);
                item.data = $vo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        SkinList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        SkinList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        SkinList.skilcellNum64 = 86;
        SkinList.num500 = 456;
        return SkinList;
    }(SList));
    skinui.SkinList = SkinList;
    var SkinListPanel = /** @class */ (function (_super) {
        __extends(SkinListPanel, _super);
        function SkinListPanel() {
            var _this = _super.call(this) || this;
            _this.isNeedRefrishData = true;
            _this.lastHasDiamonds = 0;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        SkinListPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new AlphaUIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/skin/skin.txt", "panelui/skin/skin.png", function () { _this.loadConfigCom(); });
        };
        SkinListPanel.prototype.butClik = function (evt) {
            if (this.win_tip_bg == evt.target) {
                return;
            }
            this.isNeedRefrishData = false;
            this.hidePanel();
        };
        SkinListPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -10, 500, 580);
            this.s_tittle_txt = this.addChild(this._topRender.getComponent("s_tittle_txt"));
            this._skinList = new SkinList();
            this._skinList.init(this._topRender.uiAtlas);
            LoadManager.getInstance().load(Scene_data.fileRoot + "skilxml.txt", LoadManager.XML_TYPE, function ($data) {
                _this.skinXmlData = $data;
                _this.uiLoadComplte = true;
                _this.showPanel();
            });
        };
        SkinListPanel.prototype.showPanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._skinList.show();
                this._skinList.center = 0;
                this._skinList.middle = 0;
                this.TweenLiteScale(0.1, UIData.Scale, 0.5, function () {
                    if (_this.isNeedRefrishData || _this.lastHasDiamonds != GameData.hasdiamondsHavenum) {
                        _this._skinList.refreshDataByNewData(_this.skinXmlData); //防止卡，获取数据延后一点
                    }
                    _this.isNeedRefrishData = true;
                    _this.lastHasDiamonds = GameData.hasdiamondsHavenum; //钱不一样的时也刷新数据
                });
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        SkinListPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this._skinList.resize();
        };
        SkinListPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
                _this._skinList.hide();
            });
        };
        return SkinListPanel;
    }(basewin.BaseWinPanel));
    skinui.SkinListPanel = SkinListPanel;
})(skinui || (skinui = {}));
//# sourceMappingURL=SkinListPanel.js.map