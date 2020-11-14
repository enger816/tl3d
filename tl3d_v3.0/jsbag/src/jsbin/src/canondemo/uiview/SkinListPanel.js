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
var skin;
(function (skin) {
    var UIManager = Pan3d.UIManager;
    var TextAlign = Pan3d.TextAlign;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
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
        SkinList.prototype.refreshDataByNewData = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/skin/skilxml.txt", LoadManager.XML_TYPE, function ($data) {
                var $xmlArr = JSON.parse($data);
                var $sListItemData = _this.getData($xmlArr);
                _this.refreshData($sListItemData);
            });
        };
        SkinList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        SkinList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshDataByNewData();
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
    skin.SkinList = SkinList;
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
            this.S_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "S_bg", 0, 0, SkinList.num500, 85, 15, 40);
            $container.addChild(this.S_bg);
            this.S_ranking_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_ranking_id", 20, 30, 50, 20);
            $container.addChild(this.S_ranking_id);
            this.S_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "S_ion_pic", 100, 10, 64, 64);
            $container.addChild(this.S_ion_pic);
            this.S_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_name", 180, 30, 100, 20);
            $container.addChild(this.S_name);
            this.S_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_select_bt", 330, 20, 107, 42);
            $container.addChild(this.S_select_bt);
            this.S_select_bt.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.S_select_bt.addEventListener(InteractiveEvent.Up, this.butClik, this);
        };
        SkinListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $needNum = this.itdata.data.need;
                var $num = GameData.hasdiamondsHavenum;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_ranking_id.skinName, String($data.id + 1), 16, TextAlign.CENTER, ColorType.Black000000);
                this.uiAtlas.upDataPicToTexture("ui/skin/list/" + ($data.id + 1) + ".jpg", this.S_ion_pic.skinName);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_name.skinName, "钻石 X " + $needNum, 16, TextAlign.CENTER, ColorType.Black000000, "", 2);
                this.uiAtlas.upDataPicToTexture("ui/skin/skinuse" + ($needNum > $num ? "1" : "0") + ".png", this.S_select_bt.skinName);
                //  this.fileColor(this.S_bg.skinName, $data.id % 2 == 0 ? "rgba(217,217,217,1)" : "rgba(227,227,227,1)")
                this.uiAtlas.upDataPicToTexture("ui/skin/skinbg.png", this.S_bg.skinName);
                this.downTarget = null;
            }
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
        SkinListRender.prototype.butClik = function (evt) {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $needNum = this.itdata.data.need;
                var $num = GameData.hasdiamondsHavenum;
                if ($needNum <= $num) {
                    GameData.hasdiamondsHavenum = $num - $needNum;
                    GameData.skinType = this.itdata.id + 1;
                    GameData.setStorageSync("skinType", String(GameData.skinType));
                    GameData.setStorageSync("changeSkinFrist", true);
                    GameData.changeWebUserInfo("skin", String(GameData.skinType));
                    game.GameDataModel.centenBall.changeSkinById(GameData.skinType);
                    Pan3d.ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.HIDE_SKIN_LIST_PANEL));
                    Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                }
            }
        };
        return SkinListRender;
    }(SListItem));
    skin.SkinListRender = SkinListRender;
    var SkinListPanel = /** @class */ (function (_super) {
        __extends(SkinListPanel, _super);
        function SkinListPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new AlphaUIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        SkinListPanel.prototype.butClik = function (evt) {
            if (this.s_tip_bg == evt.target) {
                return;
            }
            this.hidePanel();
        };
        SkinListPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.s_tip_bg = this.addEvntBut("s_tip_bg", this._bottomRender);
            this.s_tip_bg.top = 0;
            this.s_tip_bg.left = 0;
            this.s_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.s_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.s_list_bg = this.addChild(this._midRender.getComponent("s_win_bg"));
            this.addChild(this._topRender.getComponent("s_tittle_bg"));
            this.addChild(this._topRender.getComponent("s_list_bg"));
            this.s_back_an = this.addEvntButUp("s_back_an", this._topRender);
            this.s_tittle_txt = this.addChild(this._topRender.getComponent("s_tittle_txt"));
            this._skinList = new SkinList();
            this._skinList.init(this._topRender.uiAtlas);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        SkinListPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._skinList.show();
                this._skinList.center = 0;
                this._skinList.middle = 0;
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        SkinListPanel.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
            this._skinList.hide();
        };
        return SkinListPanel;
    }(H5UIConatiner));
    skin.SkinListPanel = SkinListPanel;
})(skin || (skin = {}));
//# sourceMappingURL=SkinListPanel.js.map