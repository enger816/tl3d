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
var fb;
(function (fb) {
    var FubenLeftFactionPanel = /** @class */ (function (_super) {
        __extends(FubenLeftFactionPanel, _super);
        function FubenLeftFactionPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.iconAry = [-1, -1];
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.left = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            // this._midRender = new UIRenderComponent();
            // this.addRender(this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas;
            _this._bottomRender.uiAtlas.setInfo("ui/uidata/fuben/left/fubenfactionleft.xml", "ui/uidata/fuben/left/fubenfactionleft.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        FubenLeftFactionPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_mid_bg = this.addChild(this._bottomRender.getComponent("t_bg"));
            this.a_mid_bg.addEventListener(InteractiveEvent.Down, this.midClick, this);
            this.slab1 = this.addChild(this._topRender.getComponent("t_s1"));
            this.slab2 = this.addChild(this._topRender.getComponent("t_s2"));
            this.slab3 = this.addChild(this._topRender.getComponent("t_s3"));
            this.sicon = this.addChild(this._topRender.getComponent("t_icon1"));
            this.olab1 = this.addChild(this._topRender.getComponent("t_o1"));
            this.olab2 = this.addChild(this._topRender.getComponent("t_o2"));
            this.olab3 = this.addChild(this._topRender.getComponent("t_o3"));
            this.oicon = this.addChild(this._topRender.getComponent("t_icon2"));
            this.uiAtlasComplet = true;
            this.refresh();
        };
        FubenLeftFactionPanel.prototype.midClick = function ($e) { };
        FubenLeftFactionPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                var obj = GuidData.map.getFactionFubenInfo();
                var data = TableData.getInstance().getData(TableData.tb_faction_match_base, 1);
                //蓝方
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.slab1.skinName, ColorType.colorfff2d3 + (obj.g2 ? "本方" : "敌方") + "资源:" + obj.s2 + "/" + data.target_score, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.slab2.skinName, ColorType.colorfff2d3 + "人数：" + obj.m2, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.slab3.skinName, ColorType.colorfff2d3 + "资源点：" + obj.f2, 14, TextAlign.LEFT);
                //红方
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.olab1.skinName, ColorType.colorfff2d3 + (obj.g1 ? "本方" : "敌方") + "资源:" + obj.s1 + "/" + data.target_score, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.olab2.skinName, ColorType.colorfff2d3 + "人数：" + obj.m1, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.olab3.skinName, ColorType.colorfff2d3 + "资源点：" + obj.f1, 14, TextAlign.LEFT);
                this.drawIcon(obj.i2, obj.i1);
            }
        };
        FubenLeftFactionPanel.prototype.reset = function () {
            this.iconAry = [-1, -1];
        };
        FubenLeftFactionPanel.prototype.drawIcon = function (i1, i2) {
            var _this = this;
            if (this.iconAry[0] != i1) {
                this.iconAry[0] = i1;
                LoadManager.getInstance().load(Scene_data.fileRoot + getload_FacBuildUrl(String(i1)), LoadManager.IMG_TYPE, function ($img) {
                    var $rec = _this._topRender.uiAtlas.getRec(_this.sicon.skinName);
                    var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, 42, 42);
                    _this._topRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            }
            if (this.iconAry[1] != i2) {
                this.iconAry[1] = i2;
                LoadManager.getInstance().load(Scene_data.fileRoot + getload_FacBuildUrl(String(i2)), LoadManager.IMG_TYPE, function ($img) {
                    var $rec = _this._topRender.uiAtlas.getRec(_this.oicon.skinName);
                    var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, 42, 42);
                    _this._topRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            }
        };
        FubenLeftFactionPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return FubenLeftFactionPanel;
    }(UIConatiner));
    fb.FubenLeftFactionPanel = FubenLeftFactionPanel;
})(fb || (fb = {}));
//# sourceMappingURL=FubenLeftFactionPanel.js.map