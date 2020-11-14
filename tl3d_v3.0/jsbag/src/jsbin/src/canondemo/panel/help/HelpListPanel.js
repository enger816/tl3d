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
var help;
(function (help) {
    var UIManager = Pan3d.UIManager;
    var Rectangle = Pan3d.Rectangle;
    var UIData = Pan3d.UIData;
    var TextAlign = Pan3d.TextAlign;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
    var UiDraw = Pan3d.UiDraw;
    var Vector2D = Pan3d.Vector2D;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var SList = Pan3d.SList;
    var SListItem = Pan3d.SListItem;
    var SListItemData = Pan3d.SListItemData;
    var LabelTextFont = Pan3d.LabelTextFont;
    var ColorType = Pan3d.ColorType;
    var TextureManager = Pan3d.TextureManager;
    var HelpCallList = /** @class */ (function (_super) {
        __extends(HelpCallList, _super);
        function HelpCallList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -50;
            _this._maskLevel = 4;
            return _this;
        }
        HelpCallList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        HelpCallList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, HelpCallListRender, HelpCallList.rollNum500, HelpCallList.skilcellNum64 * 6, 0, HelpCallList.skilcellNum64, 6, 256, 1024, 1, 10);
        };
        HelpCallList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        HelpCallList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        HelpCallList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        HelpCallList.skilcellNum64 = 86;
        HelpCallList.rollNum500 = 450;
        return HelpCallList;
    }(SList));
    help.HelpCallList = HelpCallList;
    var HelpCallListRender = /** @class */ (function (_super) {
        __extends(HelpCallListRender, _super);
        function HelpCallListRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        HelpCallListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.B_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "B_bg", 0, 0, HelpCallList.rollNum500, 85, 25, 25);
            $container.addChild(this.B_bg);
            this.B_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_id", 20, 20, 45, 45);
            $container.addChild(this.B_id);
            this.B_head_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "B_head_pic", 100, 10, 64, 64);
            $container.addChild(this.B_head_pic);
            this.B_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_name", 180, 25, 100, 24);
            $container.addChild(this.B_name);
            this.B_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_select_bt", 320, 18, 115, 52);
            $container.addChild(this.B_select_bt);
            this.B_select_bt.addEventListener(InteractiveEvent.Up, this.butClik, this);
        };
        HelpCallListRender.prototype.render = function ($data) {
            var _this = this;
            this.itdata = $data;
            if ($data && $data.data) {
                var $vo = $data.data;
                var infoArr = String($vo.user_info).split("|");
                var picUir = infoArr[1];
                var $needNum = this.itdata.data.need;
                var $num = GameData.hasdiamondsHavenum;
                //LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_id.skinName, String($data.id + 1), 16, TextAlign.CENTER, ColorType.Black000000);
                this.drawPicAndTxt(this.B_id, "List_id_bg", String($data.id + 1), new Vector2D(0, 15), TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_name.skinName, "关卡" + $vo.level, 20, TextAlign.CENTER, ColorType.Black000000, "", 2);
                this.drawPicAndTxt(this.B_select_bt, "But_base_1", "帮助他", new Vector2D(0, 15), TextAlign.CENTER);
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.B_bg.skinName, UIData.textlist, "List_base_bg_1");
                if (picUir) {
                    GameData.loadImgByPicUrl(picUir, function ($img) {
                        var rec = _this.uiAtlas.getRec(_this.B_head_pic.skinName);
                        _this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                        _this.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                        Pan3d.TextureManager.getInstance().updateTexture(_this.uiAtlas.texture, rec.pixelX, rec.pixelY, _this.uiAtlas.ctx);
                    });
                }
            }
            else {
                this.drawNull();
            }
        };
        HelpCallListRender.prototype.drawPicAndTxt = function ($ui, puslicname, txt, pos, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $rect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 18, pos.x, pos.y, $align);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        };
        HelpCallListRender.prototype.drawNull = function () {
            UiDraw.clearUI(this.B_id);
            UiDraw.clearUI(this.B_head_pic);
            UiDraw.clearUI(this.B_name);
            UiDraw.clearUI(this.B_select_bt);
        };
        HelpCallListRender.prototype.fileColor = function ($iconName, $color) {
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
        HelpCallListRender.prototype.butClik = function (evt) {
            if (this.itdata) {
                var $vo = this.itdata.data;
                var infoArr = String($vo.user_info).split("|");
                GameData.helpBeforSelfLevel = game.GameDataModel.levelNum;
                GameData.helpinfo = $vo;
                GameData.dispatchToLevel($vo.level);
                rightpanda.PandaMeshData.showCentenTxtInfoType(rightpanda.PandaMeshData.key105, Pan3d.ColorType.Black000000 + "帮助 " + $vo.userNickName + " 第 " + $vo.level + " 关", function () {
                });
                Pan3d.ModuleEventManager.dispatchEvent(new help.HelpEvent(help.HelpEvent.HIDE_HELP_LIST_PANEL));
            }
        };
        return HelpCallListRender;
    }(SListItem));
    help.HelpCallListRender = HelpCallListRender;
    var HelpListPanelView = /** @class */ (function (_super) {
        __extends(HelpListPanelView, _super);
        function HelpListPanelView() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        HelpListPanelView.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new AlphaUIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/help/help.txt", "panelui/help/help.png", function () { _this.loadConfigCom(); });
        };
        HelpListPanelView.prototype.butClik = function (evt) {
            this.hidePanel();
        };
        HelpListPanelView.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -10, 500, 580);
            this.addChild(this._topRender.getComponent("a_help_tittle_txt"));
            this.uiLoadComplte = true;
            this._helpCallList = new HelpCallList();
            this._helpCallList.init(this._topRender.uiAtlas);
            this._helpCallList.center = 0;
            this._helpCallList.middle = 0;
            this.refrishData(this.showData);
            this.showPanel();
        };
        HelpListPanelView.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._helpCallList.show();
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        HelpListPanelView.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
                _this._helpCallList.hide();
            });
        };
        HelpListPanelView.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this._helpCallList.resize();
        };
        HelpListPanelView.prototype.refrishData = function (value) {
            if (value) {
                this.showData = value;
                if (this._helpCallList) {
                    this.makeItemListData(this.showData);
                }
            }
        };
        HelpListPanelView.prototype.makeItemListData = function ($ary) {
            //openid: "id1536150054950_1732", state: 1, level: 24, helper_info: "", time: 1536156879, …}
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                var $melpOtherVo = new HelpOtherVo();
                $melpOtherVo.meshObj($ary[i]);
                item.data = $melpOtherVo;
                item.id = i;
                ary.push(item);
            }
            this._helpCallList.refreshData(ary);
        };
        return HelpListPanelView;
    }(basewin.BaseWinPanel));
    help.HelpListPanelView = HelpListPanelView;
})(help || (help = {}));
//# sourceMappingURL=HelpListPanel.js.map