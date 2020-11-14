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
    var SystemOpenPanel = /** @class */ (function (_super) {
        __extends(SystemOpenPanel, _super);
        function SystemOpenPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this._winBgRender = new UIRenderComponent();
            _this.addRender(_this._winBgRender);
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._roationRenderComponent = new RoationUIRenderComponent();
            _this.addRender(_this._roationRenderComponent);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        SystemOpenPanel.prototype.applyLoad = function () {
            var _this = this;
            GameData.getPublicUiAtlas(function ($publicbgUiAtlas) {
                _this._winBgRender.uiAtlas = $publicbgUiAtlas;
                _this._midRender.uiAtlas.setInfo("ui/uidata/msg/systemopen.xml", "ui/uidata/msg/systemopen.png", function () { _this.loadConfigCom(); });
            });
        };
        SystemOpenPanel.prototype.addBg = function () {
            var $bg = this.addEvntBut("t_rightbg2", this._winBgRender);
            $bg.x = 0;
            $bg.y = 0;
            $bg.width = UIData.designWidth;
            $bg.height = UIData.designHeight;
            this.uiItem.push($bg);
            this.win_bg = $bg;
            this.resize();
        };
        SystemOpenPanel.prototype.resize = function () {
            this.win_bg.top = 0;
            this.win_bg.left = 0;
            this.win_bg.width = Scene_data.stageWidth / UIData.Scale;
            this.win_bg.height = Scene_data.stageHeight / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        SystemOpenPanel.prototype.loadConfigCom = function () {
            this.uiItem = new Array;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._roationRenderComponent.uiAtlas = this._midRender.uiAtlas;
            this.addBg();
            //   this.uiItem.push(this.addChild(this._bottomRender.getComponent("a_bg")));
            this.b_round_bg = this.addChild(this._roationRenderComponent.getComponent("b_round_bg"));
            this.b_round_bg.x = this.b_round_bg.x + this.b_round_bg.width / 2;
            this.b_round_bg.y = this.b_round_bg.y + this.b_round_bg.height / 2;
            this.b_round_bg.aotuRotation = 1;
            this.uiItem.push(this.b_round_bg);
            this.uiItem.push(this.addChild(this._midRender.getComponent("a_icon_bg")));
            this.a_icon = this.addChild(this._topRender.getComponent("a_icon"));
            this.a_tittle = this.addChild(this._topRender.getComponent("a_tittle"));
            this.uiItem.push(this.a_tittle);
            this.uiItem.push(this.addChild(this._topRender.getComponent("a_txt_bg")));
            this.a_text = this.addChild(this._topRender.getComponent("a_text"));
            this.baseIonPos = new Vector2D(this.a_icon.x, this.a_icon.y);
            this.uiItem.push(this.a_text);
            this.applyLoadComplete();
        };
        SystemOpenPanel.prototype.getOpenSkillIconUrl = function (name) {
            return "ui/load/activity/skillopen/openskill1.png";
        };
        SystemOpenPanel.prototype.drawSkillOpen = function ($id) {
            var _this = this;
            //  this._topRender.uiAtlas.upDataPicToTexture(this.getOpenSkillIconUrl(String($id)), this.a_icon.skinName);
            var $url = getSkillIconUrl(tb.TB_skill_base.get_TB_skill_base($id).icon);
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE, function ($img) {
                var rec = _this._topRender.uiAtlas.getRec(_this.a_icon.skinName);
                _this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                UiDraw.cxtDrawImg(_this._topRender.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                _this._topRender.uiAtlas.ctx.drawImage($img, 4, 4, 62, 62);
                TextureManager.getInstance().updateTexture(_this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, _this._topRender.uiAtlas.ctx);
            });
            /*
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE,
                ($img: any) => {
                    var rec: UIRectangle = this._topRender.uiAtlas.getRec(this.a_icon.skinName);
                    var $ctx: CanvasRenderingContext2D= UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                  //  $ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    UiDraw.cxtDrawImg($ctx, PuiData.SKILL_BG, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                    //$ctx.drawImage(imgA, 4, 4, 62, 62);
                    TextureManager.getInstance().updateTexture(this._topRender.texture, rec.pixelX, rec.pixelY, $ctx);
                });
            */
        };
        SystemOpenPanel.prototype.setData = function ($tb) {
            var _this = this;
            GameMouseManager.getInstance().useMouseEvent = false;
            var $picUrl = this.getIconByID($tb.id);
            var $text = ColorType.Yellowffe9b4 + $tb.text;
            this.setUiListVisibleByItem(this.uiItem, true);
            if ($tb.position == 99) {
                this.drawSkillOpen($tb.id);
                this.a_tittle.goToAndStop(1);
            }
            else {
                this._topRender.uiAtlas.upDataPicToTexture($picUrl, this.a_icon.skinName);
                this.a_tittle.goToAndStop(0);
            }
            console.log("系统说明==>", $text);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_text.skinName, $text, 14, TextAlign.CENTER, ColorType.Yellowffe9b4);
            this.a_icon.x = this.baseIonPos.x;
            this.a_icon.y = this.baseIonPos.y;
            this.toPos = new Vector2D(UIData.designWidth, UIData.designHeight);
            if ($tb.position == 4 || $tb.position == 5 || $tb.position == 6 || $tb.position == 7) {
                if (mainUi.MainUiModel.skillTabIndex == 0) {
                    this.toPos = UiTweenVo.getPosByPanel(new Vector2D(900, 150), { width: UIData.designWidth, height: UIData.designHeight, right: 0 }, this); //切换按钮位置
                }
                else {
                    this.toPos = UiTweenVo.getPosByPanel(this.getPandaPos($tb), { width: UIData.designWidth, height: UIData.designHeight, right: 0, bottom: 0 }, this);
                }
            }
            else if ($tb.position == 3) {
                this.toPos = UiTweenVo.getPosByPanel(new Vector2D(3, 471), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
            }
            else if ($tb.position == 9) {
                this.toPos = UiTweenVo.getPosByPanel(new Vector2D(750, 170), { width: UIData.designWidth, height: UIData.designHeight, right: 0, top: 0 }, this);
            }
            else if ($tb.position == 99) {
                switch ($tb.index) {
                    case 2:
                        this.toPos = UiTweenVo.getPosByPanel(new Vector2D(727, 454), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
                        break;
                    case 3:
                        this.toPos = UiTweenVo.getPosByPanel(new Vector2D(728, 374), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
                        break;
                    case 4:
                        this.toPos = UiTweenVo.getPosByPanel(new Vector2D(787, 316), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
                        break;
                    default:
                        break;
                }
            }
            else {
                //右上角系统提示
                this.toPos = UiTweenVo.getPosByPanel(this.getPandaPos($tb), { width: UIData.designWidth, height: UIData.designHeight, right: 0, top: 0 }, this);
            }
            TimeUtil.addTimeOut(1500, function () {
                _this.setUiListVisibleByItem(_this.uiItem, false);
                TweenMoveTo(_this.a_icon, 0.6, { x: _this.toPos.x, y: _this.toPos.y, onComplete: function () { _this.changeButEnd(); } });
            });
        };
        SystemOpenPanel.prototype.getPandaPos = function ($tb) {
            var $cellNum = 1;
            for (var i = 0; i < GuidData.player.systemOpenItem.length; i++) {
                if (GuidData.player.systemOpenItem[i].needShowIcon) {
                    var $temp = tb.TB_system_icon.getTempVo(GuidData.player.systemOpenItem[i].systemId);
                    if ($temp.position == $tb.position) {
                        if ($temp.index < $tb.index) {
                            $cellNum++;
                        }
                    }
                }
            }
            var $pandaPos = new Vector2D;
            if ($tb.position == 1) {
                $pandaPos.x = 780 - $cellNum * 65;
                $pandaPos.y = 10;
            }
            if ($tb.position == 2) {
                $pandaPos.x = 780 - $cellNum * 65;
                $pandaPos.y = 10 + 65;
            }
            if ($tb.position == 4) {
                $pandaPos.x = 890 - $cellNum * 70;
                $pandaPos.y = 464;
            }
            if ($tb.position == 5) {
                $pandaPos.x = 890;
                $pandaPos.y = 464 - $cellNum * 68;
            }
            return $pandaPos;
        };
        SystemOpenPanel.prototype.getMoveToPos = function ($v2d, $typeId) {
            var $pos = new Vector2D(896, 466);
            if (mainUi.MainUiModel.systemTab == $typeId) {
                return UiTweenVo.getPosByPanel($v2d, { width: UIData.designWidth, height: UIData.designHeight, right: 0, bottom: 0 }, this);
            }
            else {
                return UiTweenVo.getPosByPanel($pos, { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom: 0 }, this);
            }
        };
        SystemOpenPanel.prototype.getIconByID = function ($id) {
            //  return "ui/load/activity/panda/" + $id + ".png"
            return "ui/load/systemicon/" + $id + ".png";
        };
        SystemOpenPanel.prototype.changeButEnd = function () {
            UIManager.getInstance().removeUIContainer(this);
            GuidData.player.resetSkillItem();
            ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.REFRISH_SYS_AND_UI_CHANGE));
        };
        return SystemOpenPanel;
    }(UIConatiner));
    msgtip.SystemOpenPanel = SystemOpenPanel;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=SystemOpenPanel.js.map