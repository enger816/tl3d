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
var bottomui;
(function (bottomui) {
    var HornTxtVo = /** @class */ (function () {
        function HornTxtVo() {
        }
        return HornTxtVo;
    }());
    bottomui.HornTxtVo = HornTxtVo;
    var SysInfoPanel = /** @class */ (function () {
        function SysInfoPanel($ui, $bg, $uiAtlas) {
            this.lastTimePositon = 0; //移动时间标注点
            this.totalTime = 10000; //一个循环的时间。走0-0.5的UV
            this.moveSpeed = 0;
            this.ui = $ui;
            this.bg = $bg;
            this.uiAtlas = $uiAtlas;
            this.hornWaitItem = new Array();
            this.lastTimePositon = TimeUtil.getTimer() - this.totalTime;
        }
        SysInfoPanel.prototype.pushWaithornToItem = function ($s2c_send_chat) {
            var $startime = TimeUtil.getTimer() + this.totalTime;
            if (this.hornWaitItem.length) {
                var $preVo = this.hornWaitItem[this.hornWaitItem.length - 1];
                $startime = Math.max($startime, ($preVo.time + $preVo.timeLen));
            }
            var $vo = new HornTxtVo();
            $vo.time = $startime;
            $vo.data = $s2c_send_chat;
            var txtLen = FaceFontLabel.getFaceTxtStrLen($vo.data.content);
            $vo.timeLen = txtLen * 350 + 1000; //延时1秒间隔
            this.hornWaitItem.push($vo);
            this.drawHornSkin();
        };
        SysInfoPanel.prototype.updata = function (t) {
            if (this.hornWaitItem.length) {
                var $tempNum = TimeUtil.getTimer() - this.lastTimePositon;
                $tempNum = $tempNum / this.totalTime;
                if ($tempNum > 1) {
                    this.lastTimePositon = TimeUtil.getTimer();
                    this.drawHornSkin();
                    $tempNum = 0;
                }
                this.moveSpeed = $tempNum * 0.5;
                this.ui.renderData2[0] = 0.5;
                this.ui.renderData2[2] = this.moveSpeed;
                this.ui.uiRender.makeRenderDataVc(this.ui.vcId);
                this.bg.x = 214;
            }
            else {
                this.bg.x = 10000;
            }
        };
        SysInfoPanel.prototype.drawHornSkin = function () {
            var fontsize = 16;
            var $uiRect = this.uiAtlas.getRec(this.ui.skinName);
            var $ctx = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var dnum = 0;
            for (var i = this.hornWaitItem.length - 1; i >= 0; i--) {
                var $vo = this.hornWaitItem[i];
                var a = ($vo.time + $vo.timeLen) > this.lastTimePositon; //还没播完;
                var b = $vo.time < (this.lastTimePositon + this.totalTime * 2); //在可播范围内;
                if (a && b) {
                    var tx = ($vo.time - this.lastTimePositon) * (512 / this.totalTime);
                    // FaceFontLabel.wrapFaceText($ctx, $vo.data.content, fontsize, "[]", Math.floor(tx), 1, 10000, 20)
                    // LabelTextFont.writeSingleLabelToCtx($ctx, $vo.data.content, fontsize, Math.floor(tx),
                    TextRegExp.wrapText($ctx, ColorType.Brown7a2f21 + $vo.data.content, ColorType.Brown7a2f21, Math.floor(tx), 0, 10000, fontsize, fontsize, "#27262e", 4, 1.2);
                    dnum++;
                }
                else {
                    if (!a) {
                        this.hornWaitItem.splice(i, 1);
                    }
                }
            }
            this.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        };
        return SysInfoPanel;
    }());
    bottomui.SysInfoPanel = SysInfoPanel;
    var InfoTipIconVo = /** @class */ (function () {
        function InfoTipIconVo() {
        }
        return InfoTipIconVo;
    }());
    bottomui.InfoTipIconVo = InfoTipIconVo;
    var InfoTipManager = /** @class */ (function () {
        function InfoTipManager($container, $bg, $mid) {
            this.showData = [1, 2, 3, 4, 5, 6];
            this.visible = true;
            this._container = $container;
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._itemUi = new Array;
            this.refresh();
        }
        InfoTipManager.prototype.refresh = function () {
            this.clear();
            /*
            if (GuidData.map.tbMapVo.inst_type == 2) {  //副本
                return;
            }
            if (GuidData.map.tbMapVo.inst_type == 1) {  //活动
                return;
            }
            */
            this.showData = mainUi.MainUiModel.getMsgTipData();
            //  this.showData = [1, 2, 3, 4, 5, 6]
            if (this.visible) {
                var $cellNum6 = 6;
                var $num55 = 55;
                for (var i = 0; i < this.showData.length; i++) {
                    var $iconData = this.showData[i];
                    var $vo = new InfoTipIconVo();
                    $vo.ui = this._container.addChild(this._midRender.getComponent("a_info_icon"));
                    $vo.ui.data = $iconData;
                    $vo.ui.goToAndStop(i);
                    $vo.ui.addEventListener(InteractiveEvent.Up, this.butClik, this);
                    $vo.ui.addEventListener(InteractiveEvent.Down, function (v) { }, this);
                    var $pos = new Vector2D;
                    $pos.x = 480 + i * $num55 - (this.showData.length / 2) * $num55;
                    $pos.y = 417;
                    $vo.ui.x = $pos.x;
                    $vo.ui.y = $pos.y;
                    this.ctxIconPic($vo.ui, $iconData);
                    this._itemUi.push($vo);
                }
            }
        };
        InfoTipManager.prototype.ctxIconPic = function ($ui, $data) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/msgicon/" + $data + ".png", LoadManager.IMG_TYPE, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $toRect.width, $toRect.height);
                $ui.drawToCtx(_this._midRender.uiAtlas, $ctx);
            });
        };
        InfoTipManager.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target.data) {
                case 0:
                    break;
                case 1:
                    // ModulePageManager.openPanel(SharedDef.MODULE_SOCIAL);
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.SHOW_APPLYPANEL_EVENT));
                    break;
                case 2://家族
                    if (GuidData.faction) {
                        ModulePageManager.openPanel(SharedDef.MODULE_FACTION);
                    }
                    else {
                        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_INVITATION_EVENT));
                    }
                    break;
                case 3://礼物
                    // GuidData.faction.queenGiftUncheckNum = 0
                    this.refresh();
                    // ModuleEventManager.dispatchEvent(new faction.GiftprocessingEvent(faction.GiftprocessingEvent.SHOW_Gift_EVENT));
                    break;
                case 4://私聊
                    // Chat.ChatModel.showType = SharedDef.CHAT_TYPE_WHISPER;
                    // ModulePageManager.openPanel(PanelClass.SHOW_CHAT_PANEL);
                    var $arr = Chat.ChatModel.getInstance().getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
                    for (var i = $arr.length - 1; i >= 0; i--) {
                        if ($arr[i].s2c_send_chat.guid != GuidData.player.getGuid()) {
                            ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON, $arr[i].s2c_send_chat.guid);
                            break;
                        }
                    }
                    break;
                case 5://邮件
                    //ModulePageManager.openPanel(PanelClass.SHOW_CHAT_PANEL);
                    //email.EmailModel.getInstance().lastGetEmailTipTime = GameInstance.getServerNow();
                    ModulePageManager.openPanel(SharedDef.MODULE_MAIL);
                    this.refresh();
                    break;
                case 6://组队
                    ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.APPLY_TEAM_PANEL));
                    break;
                case 7://被邀请
                    ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.INVIREQUEST_TEAM_PANEL));
                    break;
                default:
                    break;
            }
        };
        InfoTipManager.prototype.clear = function () {
            while (this._itemUi.length) {
                var $vo = this._itemUi.pop();
                this._container.removeChild($vo.ui);
            }
        };
        return InfoTipManager;
    }());
    bottomui.InfoTipManager = InfoTipManager;
    var BottomUiPanel = /** @class */ (function (_super) {
        __extends(BottomUiPanel, _super);
        function BottomUiPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.expNum5 = 5;
            _this.expNum = 0.7;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.bottom = 0;
            _this.center = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        BottomUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/bootom/bootom.xml", "ui/uidata/mainui/bootom/bootom.png", function () { _this.loadConfigCom(); });
        };
        BottomUiPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.progress_line = new bottomui.Progress_line(this, this._bottomRender, this._midRender);
            this.infoTipManager = new InfoTipManager(this, this._bottomRender, this._topRender);
            this.bottomChatPanel = new bottomui.BottomUiChatPanel();
            this.bottomChatPanel.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.bottomChatPanel);
            this.bottomUiLeftPanel = new bottomui.BottomUiLeftPanel();
            this.bottomUiLeftPanel.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.bottomUiLeftPanel);
            this.bottomAotuScaleText = new bottomui.BottomAotuScaleText();
            this.bottomAotuScaleText.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.bottomAotuScaleText);
            this.a_sys_info_bg = this.addChild(this._bottomRender.getComponent("a_sys_info_bg"));
            this.a_sys_info_bg.top = 120;
            this.a_sys_info = this.addChild(this._midRender.getComponent("a_sys_info"));
            this.a_sys_info.top = 120 + 5;
            this.sysTipPanel = new SysInfoPanel(this.a_sys_info, this.a_sys_info_bg, this._bottomRender.uiAtlas);
            this.addexperience_lines();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            TimeUtil.addFrameTick(function (t) { _this.update(t); });
        };
        BottomUiPanel.prototype.setShowChatGrid = function (value) {
            if (this.uiAtlasComplet) {
                this.bottomChatPanel.setShowChatGrid(value);
            }
        };
        BottomUiPanel.prototype.addexperience_lines = function () {
            this.d_experience_bg = this.addChild(this._bottomRender.getComponent("d_experience_bg"));
            this.d_experience_bg.left = 0;
            this.d_experience_bg.bottom = 0;
            this.expUiItem = new Array();
            for (var i = 0; i < this.expNum5; i++) {
                this.expUiItem.push(this.addChild(this._midRender.getComponent("d_experience_line")));
                this.expUiItem[i].bottom = 0;
            }
        };
        BottomUiPanel.prototype.update = function (t) {
            if (this.uiAtlasComplet) {
                this.sysTipPanel.updata(t);
                this.bottomAotuScaleText.updata(t);
                var $tw = Scene_data.stageWidth / UIData.Scale;
                this.d_experience_bg.width = $tw;
                this.expNum = GuidData.player.getExp() / GuidData.player.getMaxExp();
                for (var i = 0; i < this.expNum5; i++) {
                    this.expUiItem[i].width = 0;
                    this.expUiItem[i].x = ($tw / this.expNum5 + 3) * i - this.x / UIData.Scale;
                    var $temp = this.expNum - (i * (1 / this.expNum5));
                    var tw = ($tw - ((this.expNum5 - 1) * 3)) / this.expNum5;
                    if ($temp > (1 / this.expNum5)) {
                        this.expUiItem[i].width = tw;
                    }
                    else {
                        this.expUiItem[i].width = Math.max(tw * $temp * this.expNum5, 0);
                    }
                }
            }
        };
        //全服喇叭提示
        BottomUiPanel.prototype.pushSysInfoTop = function ($s2c_send_chat) {
            if (this.sysTipPanel) {
                this.sysTipPanel.pushWaithornToItem($s2c_send_chat);
            }
        };
        //消息图标提示（邮件，好友）
        BottomUiPanel.prototype.refreshInfoTipManager = function () {
            this.infoTipManager.refresh();
        };
        BottomUiPanel.prototype.refresh = function () {
            if (this.uiAtlasComplet) {
                this.infoTipManager.refresh();
                this.bottomUiLeftPanel.refresh();
            }
        };
        return BottomUiPanel;
    }(UIPanel));
    bottomui.BottomUiPanel = BottomUiPanel;
})(bottomui || (bottomui = {}));
//# sourceMappingURL=BottomUiPanel.js.map