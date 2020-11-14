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
var msgtip;
(function (msgtip) {
    var SkillTipPicRender = /** @class */ (function (_super) {
        __extends(SkillTipPicRender, _super);
        function SkillTipPicRender() {
            var _this = _super.call(this) || this;
            _this.uiAtlas = new UIAtlas();
            _this.uiAtlas.configData = new Array();
            return _this;
        }
        SkillTipPicRender.prototype.makeSamplePic = function () {
            var _this = this;
            this.uiAtlas.configData.push(this.uiAtlas.getObject("picSkin", 0, 0, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.picUi = this.creatBaseComponent("picSkin");
            var $basePos = new Vector2D(UIData.designWidth / 2 - 150, UIData.designHeight / 2 - 50);
            this.picUi.width = this.uiAtlas.textureRes.width;
            this.picUi.height = this.uiAtlas.textureRes.height;
            this.picUi.x = -this.picUi.width / 2 + $basePos.x;
            this.picUi.y = -this.picUi.height / 2 + $basePos.y;
            this.container.addChild(this.picUi);
            var $uiTweenVo = new UiTweenVo;
            $uiTweenVo.ui = this.picUi;
            $uiTweenVo.scale = 1;
            this.picUi.alpha = 0;
            TweenMoveTo(this.picUi, 0.2, { alpha: 1 });
            TweenMoveTo($uiTweenVo, 0.2, { scale: 1.3 });
            TimeUtil.addTimeOut(1500, function () {
                TweenMoveTo(_this.picUi, 0.1, { alpha: 0.3 });
                TweenMoveTo($uiTweenVo, 0.1, { scale: 0.6, onComplete: function () { _this.changeButEnd(); } });
            });
        };
        SkillTipPicRender.prototype.changeButEnd = function () {
            if (this.bFun) {
                this.bFun();
            }
        };
        SkillTipPicRender.prototype.setTextures = function ($textureRes) {
            this.uiAtlas.textureRes = $textureRes;
            this.makeSamplePic();
        };
        return SkillTipPicRender;
    }(AlphaUIRenderComponent));
    msgtip.SkillTipPicRender = SkillTipPicRender;
    var SkillTipUi = /** @class */ (function () {
        function SkillTipUi($cs) {
            this.container = $cs;
            this.picRender = new SkillTipPicRender();
            this.container.addRender(this.picRender);
        }
        SkillTipUi.prototype.loadPicData = function ($id) {
            var _this = this;
            //console.log("技能图标", $id)
            this.picRender.bFun = function () { _this.playEnd(); };
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + this.getIconById($id), function ($aaaa) {
                _this.picRender.setTextures($aaaa);
            });
        };
        SkillTipUi.prototype.getIconById = function ($id) {
            var a = "ui/load/toptip/skillpic/" + $id + ".png";
            return a;
        };
        SkillTipUi.prototype.playEnd = function () {
            this.container.removeRender(this.picRender);
            this.picRender.dispose();
        };
        return SkillTipUi;
    }());
    msgtip.SkillTipUi = SkillTipUi;
    var MsgSkillTipPanel = /** @class */ (function (_super) {
        __extends(MsgSkillTipPanel, _super);
        function MsgSkillTipPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.frameUpFun = function (t) { _this.upData(t); };
            TimeUtil.addFrameTick(_this.frameUpFun);
            return _this;
        }
        MsgSkillTipPanel.prototype.upData = function (t) {
            if (this.renderList.length <= 0) {
                this.close();
            }
        };
        MsgSkillTipPanel.prototype.setSystemData = function ($id) {
            var $vo = new SkillTipUi(this);
            $vo.loadPicData($id);
        };
        MsgSkillTipPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.dispose();
        };
        MsgSkillTipPanel.prototype.dispose = function () {
            MsgSkillTipPanel.msgSkillTipPanel = null;
            TimeUtil.removeFrameTick(this.frameUpFun);
            this.frameUpFun = null;
        };
        MsgSkillTipPanel.show = function (value) {
            if (!this.msgSkillTipPanel) {
                this.msgSkillTipPanel = new MsgSkillTipPanel();
            }
            this.msgSkillTipPanel.setSystemData(value);
            UIManager.getInstance().addUIContainer(this.msgSkillTipPanel);
        };
        return MsgSkillTipPanel;
    }(UIConatiner));
    msgtip.MsgSkillTipPanel = MsgSkillTipPanel;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgSkillTipPanel.js.map