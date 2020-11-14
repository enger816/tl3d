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
var kuafu;
(function (kuafu) {
    var Kuafu1v1UI = /** @class */ (function () {
        function Kuafu1v1UI() {
        }
        return Kuafu1v1UI;
    }());
    kuafu.Kuafu1v1UI = Kuafu1v1UI;
    var Kuafu1v1SceneTopPanel = /** @class */ (function (_super) {
        __extends(Kuafu1v1SceneTopPanel, _super);
        function Kuafu1v1SceneTopPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.top = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._timeRender = new UIRenderComponent;
            _this.addRender(_this._timeRender);
            _this._topRender.uiAtlas = new UIAtlas();
            _this._frameFun = function (t) { _this.upTime(t); };
            return _this;
        }
        Kuafu1v1SceneTopPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._timeRender.dispose();
            this._timeRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        Kuafu1v1SceneTopPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/kuafu/1v1/kuafu1v1.xml", "ui/uidata/kuafu/1v1/kuafu1v1.png", function () { _this.loadConfigCom(); });
        };
        Kuafu1v1SceneTopPanel.prototype.loadConfigCom = function () {
            this._timeRender.uiAtlas = this._topRender.uiAtlas;
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_left_color"));
            this.addChild(this._bottomRender.getComponent("a_right_color"));
            this.addChild(this._bottomRender.getComponent("a_life_bg0"));
            this.addChild(this._bottomRender.getComponent("a_life_bg1"));
            this.addChild(this._bottomRender.getComponent("a_headbg0"));
            this.addChild(this._bottomRender.getComponent("a_headbg1"));
            this.addChild(this._topRender.getComponent("a_zl_label1"));
            this.addChild(this._topRender.getComponent("a_zl_label0"));
            this.addLeft();
            this.addRight();
            this.addChild(this._topRender.getComponent("a_time_bg"));
            this.a_time_txt = this.addChild(this._timeRender.getComponent("a_time_txt"));
            this.applyLoadComplete();
        };
        Kuafu1v1SceneTopPanel.prototype.show = function () {
            var stim = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if (stim > 0) {
                PopTimeOutUtil.show(PopTimeOutUtil.PLAYGO, stim, function () {
                    AotuSkillManager.getInstance().aotuBattle = true;
                });
            }
            else {
                AotuSkillManager.getInstance().aotuBattle = true;
            }
            this.endTime = TimeUtil.getTimer() + GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
            TimeUtil.addFrameTick(this._frameFun);
            UIManager.getInstance().addUIContainer(this);
            kuafu.KuaFu1v1Model.getInstance().setFullHp();
        };
        Kuafu1v1SceneTopPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        Kuafu1v1SceneTopPanel.prototype.upTime = function (t) {
            var timeNum = Math.ceil((this.endTime - TimeUtil.getTimer()) / 1000);
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
            }
            else {
                var $str = "00:00";
                if (timeNum > 0) {
                    var m = Math.floor((timeNum / 60 % 60));
                    var s = Math.floor(timeNum % 60);
                    $str = String(m < 10 ? "0" : "") + String(m) + ":" + String(s < 10 ? "0" : "") + String(s);
                }
                if (this.lastTimeStr != $str) {
                    this.lastTimeStr = $str;
                    //ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_time_txt.skinName, $str, ArtFont.num1, TextAlign.CENTER, 4)
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time_txt.skinName, $str, 16, TextAlign.CENTER, ColorType.Yellowffe9b4);
                    this.refresh();
                }
            }
        };
        Kuafu1v1SceneTopPanel.prototype.refresh = function () {
            var $item = kuafu.KuaFu1v1Model.getInstance().get1V1sceneData();
            if ($item.length == 2) {
                if (GuidData.player.getName() == $item[0].name) {
                    this.drawLeft($item[0]);
                    this.drawRight($item[1]);
                }
                else {
                    this.drawLeft($item[1]);
                    this.drawRight($item[0]);
                }
            }
        };
        Kuafu1v1SceneTopPanel.prototype.drawLeft = function ($data) {
            var $voui = this.leftKuafu1v1UI;
            this.setUvScaleByUi($voui.lifeUi, $data.life);
            this.drawPublicTempVo($voui, $data);
        };
        Kuafu1v1SceneTopPanel.prototype.drawPublicTempVo = function ($voui, $data) {
            this.drawHead($voui.headUi, $data.charType, $data.level);
            //ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, $voui.levelUi.skinName, String($data.level), ArtFont.num1,TextAlign.CENTER,2);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, $voui.levelUi.skinName, "LV " + String($data.level), 16, TextAlign.CENTER, ColorType.Yellowffe9b4);
            //ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, $voui.forceUi.skinName, String(Math.floor($data.force)), ArtFont.num99, TextAlign.CENTER)
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, $voui.forceUi.skinName, String(Math.floor($data.force)), 16, TextAlign.CENTER, ColorType.Yellowffe9b4);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, $voui.nameUi.skinName, ColorType.Yellowffe9b4 + getBaseName($data.name), 16);
            if ($data.vip > 0) {
                this.drawVipToCtx($voui.vipUi, $data.vip);
            }
            else {
                this._topRender.uiAtlas.clearCtxTextureBySkilname($voui.vipUi.skinName);
            }
        };
        Kuafu1v1SceneTopPanel.prototype.drawVipToCtx = function ($ui, $num) {
            var $uiRect = this._topRender.uiAtlas.getRec($ui.skinName);
            var $ctx = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            UiDraw.cxtDrawImg($ctx, PuiData.A_V, new Rectangle(0, 0, 22, 19), UIData.publicUi);
            ArtFont.getInstance().writeFontToCtxLeft($ctx, String($num), ArtFont.BigYellow, 25, 3);
            this._topRender.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        };
        Kuafu1v1SceneTopPanel.prototype.drawRight = function ($data) {
            var $voui = this.rightKuafu1v1UI;
            $voui.lifeUi.uvScale = $data.life;
            this.drawPublicTempVo($voui, $data);
        };
        Kuafu1v1SceneTopPanel.prototype.setUvScaleByUi = function ($ui, $uvScale) {
            $ui.renderX = $ui.absoluteX / Scene_data.stageWidth;
            $ui.renderY = $ui.absoluteY / Scene_data.stageHeight;
            $ui.renderWidth = $ui.absoluteWidth / Scene_data.stageWidth;
            $ui.renderHeight = $ui.absoluteHeight / Scene_data.stageHeight;
            $ui.renderData[0] = $ui.renderX + ($ui.renderWidth * (1 - $uvScale));
            $ui.renderData[2] = $ui.renderWidth * $uvScale;
            $ui.renderData2[0] = $ui.tr.width * $uvScale;
            $ui.renderData2[2] = $ui.tr.x + ($ui.tr.width * (1 - $uvScale));
            $ui.uiRender.makeRenderDataVc($ui.vcId);
        };
        Kuafu1v1SceneTopPanel.prototype.drawHead = function ($ui, $num, $level) {
            var _this = this;
            if (!$ui.data) {
                $ui.data = true;
                IconManager.getInstance().getIcon(getTouPic($num), function ($img) {
                    var $skillrec = _this._topRender.uiAtlas.getRec($ui.skinName);
                    var $ctx = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                    $ctx.drawImage($img, 0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight);
                    _this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
                });
            }
        };
        Kuafu1v1SceneTopPanel.prototype.addLeft = function () {
            var $left = new Kuafu1v1UI();
            $left.nameUi = this.addChild(this._midRender.getComponent("a_left_name"));
            $left.forceUi = this.addChild(this._midRender.getComponent("a_left_zl"));
            $left.headUi = this.addChild(this._midRender.getComponent("a_left_head"));
            $left.lifeUi = this.addChild(this._midRender.getComponent("a_left_life"));
            $left.vipUi = this.addChild(this._midRender.getComponent("a_left_vip"));
            $left.levelUi = this.addChild(this._midRender.getComponent("a_left_level"));
            this.leftKuafu1v1UI = $left;
        };
        Kuafu1v1SceneTopPanel.prototype.addRight = function () {
            var $right = new Kuafu1v1UI();
            $right.nameUi = this.addChild(this._midRender.getComponent("a_right_name"));
            $right.forceUi = this.addChild(this._midRender.getComponent("a_right_zl"));
            $right.headUi = this.addChild(this._midRender.getComponent("a_right_head"));
            $right.lifeUi = this.addChild(this._midRender.getComponent("a_right_life"));
            $right.vipUi = this.addChild(this._midRender.getComponent("a_right_vip"));
            $right.levelUi = this.addChild(this._midRender.getComponent("a_right_level"));
            this.rightKuafu1v1UI = $right;
        };
        return Kuafu1v1SceneTopPanel;
    }(UIPanel));
    kuafu.Kuafu1v1SceneTopPanel = Kuafu1v1SceneTopPanel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=Kuafu1v1SceneTopPanel.js.map