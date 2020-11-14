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
var helpcall;
(function (helpcall) {
    var UIManager = Pan3d.UIManager;
    var UIConatiner = Pan3d.UIConatiner;
    var TextAlign = Pan3d.TextAlign;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
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
            this.setData($ary, HelpCallListRender, 500, HelpCallList.skilcellNum64 * 6, 0, HelpCallList.skilcellNum64, 6, 256, 1024, 1, 10);
        };
        HelpCallList.prototype.refreshDataByNewData = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/skin/skilxml.txt", LoadManager.XML_TYPE, function ($data) {
                var $xmlArr = JSON.parse($data);
                var $sListItemData = _this.getData($xmlArr);
                _this.refreshData($sListItemData);
            });
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
        return HelpCallList;
    }(SList));
    helpcall.HelpCallList = HelpCallList;
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
            this.B_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "B_bg", 0, 0, 500, HelpCallList.skilcellNum64);
            $container.addChild(this.B_bg);
            this.B_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_id", 20, 28, 50, 20);
            $container.addChild(this.B_id);
            this.B_head_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "B_head_pic", 120, 10, 64, 64);
            $container.addChild(this.B_head_pic);
            this.B_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_name", 240, 28, 100, 20);
            $container.addChild(this.B_name);
            this.B_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_select_bt", 360, 20, 131, 50);
            $container.addChild(this.B_select_bt);
            this.B_select_bt.addEventListener(InteractiveEvent.Up, this.butClik, this);
        };
        HelpCallListRender.prototype.render = function ($data) {
            var _this = this;
            this.itdata = $data;
            if ($data && $data.data) {
                var $dataValue = $data.data;
                var infoArr = String($dataValue.user_info).split("|");
                var picUir = infoArr[1];
                var $needNum = this.itdata.data.need;
                var $num = GameData.hasdiamondsHavenum;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_id.skinName, String($data.id + 1), 16, TextAlign.CENTER, ColorType.Black000000);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_name.skinName, "关卡" + $dataValue.level, 16, TextAlign.CENTER, ColorType.Black000000, "", 2);
                this.uiAtlas.upDataPicToTexture("ui/helpcallbut.png", this.B_select_bt.skinName);
                this.fileColor(this.B_bg.skinName, $data.id % 2 == 0 ? "rgba(217,217,217,1)" : "rgba(227,227,227,1)");
                Pan3d.LoadManager.getInstance().load(picUir, Pan3d.LoadManager.IMG_TYPE, function ($img) {
                    var rec = _this.uiAtlas.getRec(_this.B_head_pic.skinName);
                    _this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    _this.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    Pan3d.TextureManager.getInstance().updateTexture(_this.uiAtlas.texture, rec.pixelX, rec.pixelY, _this.uiAtlas.ctx);
                });
            }
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
                var $dataValue = this.itdata.data;
                var infoArr = String($dataValue.user_info).split("|");
                GameData.wxQuery = {};
                GameData.wxQuery.type = "call_help";
                GameData.wxQuery.nickName = infoArr[0];
                GameData.wxQuery.avatarUrl = infoArr[1];
                GameData.wxQuery.openid = $dataValue.openid;
                GameData.wxQuery.level = $dataValue.level;
                game.GameDataModel.levelNum = GameData.wxQuery.level;
                var $evt = new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL);
                $evt.levelNum = game.GameDataModel.levelNum;
                Pan3d.ModuleEventManager.dispatchEvent($evt);
                Pan3d.ModuleEventManager.dispatchEvent(new uiview.TopUiViewEvent(uiview.TopUiViewEvent.HIDE_HELP_CALL_PANEL));
            }
        };
        return HelpCallListRender;
    }(SListItem));
    helpcall.HelpCallListRender = HelpCallListRender;
    var HelpCallPanel = /** @class */ (function (_super) {
        __extends(HelpCallPanel, _super);
        function HelpCallPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
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
            _this._midRender.setInfo("ui/topview/topview.txt", "ui/topview/topview.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        HelpCallPanel.prototype.butClik = function (evt) {
            this.hidePanel();
        };
        HelpCallPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.b_tip_bg = this.addChild(this._bottomRender.getComponent("b_tip_bg"));
            this.b_tip_bg.top = 0;
            this.b_tip_bg.left = 0;
            this.b_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.b_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.b_list_bg = this.addChild(this._midRender.getComponent("b_list_bg"));
            this.b_tittle_txt = this.addChild(this._topRender.getComponent("b_tittle_txt"));
            this.b_back_an = this.addEvntButUp("b_back_an", this._topRender);
            this._helpCallList = new HelpCallList();
            this._helpCallList.init(this._topRender.uiAtlas);
            this.showPanel();
        };
        HelpCallPanel.prototype.showPanel = function () {
            var _this = this;
            if (this._helpCallList) {
                this._helpCallList.show();
                this._helpCallList.center = 0;
                this._helpCallList.middle = 0;
                GameData.WEB_SEVER_EVENT_AND_BACK("find_random_help_list", "level=100", function (res) {
                    console.log("随机列表回来了", res);
                    _this.makeItemListData(res.data.list);
                });
            }
            UIManager.getInstance().addUIContainer(this);
        };
        HelpCallPanel.prototype.makeItemListData = function ($ary) {
            //openid: "id1536150054950_1732", state: 1, level: 24, helper_info: "", time: 1536156879, …}
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            this._helpCallList.refreshData(ary);
        };
        HelpCallPanel.prototype.hidePanel = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this._helpCallList) {
                this._helpCallList.hide();
            }
        };
        return HelpCallPanel;
    }(UIConatiner));
    helpcall.HelpCallPanel = HelpCallPanel;
})(helpcall || (helpcall = {}));
//# sourceMappingURL=HelpCallPanel.js.map