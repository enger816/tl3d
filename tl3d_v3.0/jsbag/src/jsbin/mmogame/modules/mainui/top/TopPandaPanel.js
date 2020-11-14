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
var topui;
(function (topui) {
    var TopIconVo = /** @class */ (function () {
        function TopIconVo() {
        }
        return TopIconVo;
    }());
    topui.TopIconVo = TopIconVo;
    var ActivityManager = /** @class */ (function () {
        function ActivityManager() {
            /*
            private getSysList(): void {
                var $sysArr: Array<SystemOpenData> = GuidData.player.systemOpenItem;
                this.showData = new Array()
                for (var i: number = 0; i < $sysArr.length; i++) {
                    var $tb: tb.TB_system_icon = tb.TB_system_icon.getTempVo($sysArr[i].systemId);
                    if (($tb.position == 1 || $tb.position == 2) && $sysArr[i].needShowIcon) {
                        this.showData.push($tb)
                    }
                }
                this.showData.sort(
                    function (a: tb.TB_system_icon, b: tb.TB_system_icon): number {
                        return a.index - b.index;
                    }
                )
    
            }
            */
            this.nodeDic = { 504: 74, 601: 112, 111: 116, 501: 120 };
            this.visible = true;
        }
        ActivityManager.prototype.initUI = function ($container, $bg, $mid, $top, $redpointRender) {
            this._container = $container;
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top;
            this._redPointRender = $redpointRender;
            this._itemUi = new Array;
            this.aryUI = new Array;
            this.b_bg = this._midRender.getComponent("b_bg");
            this.b_text = this._topRender.getComponent("b_text");
            this.b_arrow = this._topRender.getComponent("b_arrow");
            this.aryUI.push(this.b_bg);
            this.aryUI.push(this.b_text);
            this.aryUI.push(this.b_arrow);
        };
        ActivityManager.prototype.refresh = function () {
            this.clear();
            if (this.visible) {
                var $cellAtx = 0;
                var $cellBtx = 0;
                // this.getSysList();
                this.showData = mainUi.MainUiModel.getSysList();
                for (var i = 0; i < this.showData.length; i++) {
                    var $tb = this.showData[i];
                    if (($tb.position == 1 || $tb.position == 2)) {
                        var $vo = new TopIconVo();
                        $vo.ui = this._container.addChild(this._bottomRender.getComponent("t_panda_frame"));
                        $vo.ui.data = $tb;
                        $vo.ui.goToAndStop(this._itemUi.length);
                        $vo.ui.addEventListener(InteractiveEvent.Up, this.butClik, this);
                        $vo.ui.addEventListener(InteractiveEvent.Down, function (v) { }, this);
                        var $pos = mainUi.MainUiModel.getPandaPostionBySysId($tb.id);
                        $vo.ui.x = $pos.x;
                        $vo.ui.y = $pos.y;
                        if (this.nodeDic[$tb.id]) {
                            $vo.red = this._redPointRender.getRedPointUI(this._container, this.nodeDic[$tb.id], new Vector2D(0, 0));
                            $vo.red.setPos($pos.x + $vo.ui.width - 17, $pos.y);
                        }
                        this.ctxIconPic($vo.ui, $tb);
                        this._itemUi.push($vo);
                    }
                }
            }
        };
        ActivityManager.prototype.showTips = function ($data) {
            this._container.setUiListVisibleByItem(this.aryUI, false);
            if (this.visible && $data) {
                var topiconvo = this.getUiById(SharedDef.MODULE_BOSS);
                if (topiconvo) {
                    this._container.setUiListVisibleByItem(this.aryUI, true);
                    var $txtWidth = LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_text.skinName, $data, 16, TextAlign.LEFT);
                    this.b_arrow.x = topiconvo.ui.x + 20;
                    this.b_arrow.y = topiconvo.ui.y + topiconvo.ui.height - 5;
                    this.b_bg.x = this.b_arrow.x - ($txtWidth - 69);
                    this.b_bg.y = this.b_arrow.y + 12;
                    this.b_bg.width = $txtWidth + 20;
                    this.b_text.x = this.b_bg.x + 12;
                    this.b_text.y = this.b_bg.y + 11;
                }
                // for (var i = 0; i < this._itemUi.length; i++) {
                //     var tb: tb.TB_system_icon = this._itemUi[i].ui.data
                //     if (tb.id == SharedDef.MODULE_BOSS) {
                //         this._container.setUiListVisibleByItem(this.aryUI, true);
                //         var $txtWidth: number = LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_text.skinName, $data, 16, TextAlign.LEFT);
                //         this.b_arrow.x = this._itemUi[i].ui.x + 20
                //         this.b_arrow.y = this._itemUi[i].ui.y + this._itemUi[i].ui.height - 5
                //         this.b_bg.x = this.b_arrow.x - ($txtWidth - 69)
                //         this.b_bg.y = this.b_arrow.y + 12
                //         this.b_bg.width = $txtWidth + 20;
                //         this.b_text.x = this.b_bg.x + 12
                //         this.b_text.y = this.b_bg.y + 11
                //     }
                // }
            }
        };
        ActivityManager.prototype.getIconByID = function ($id) {
            return "ui/load/systemicon/" + $id + ".png";
        };
        ActivityManager.prototype.ctxIconPic = function ($ui, $data) {
            var _this = this;
            $ui.name = "panda" + $data.id;
            LoadManager.getInstance().load(Scene_data.fileRoot + this.getIconByID($data.id), LoadManager.IMG_TYPE, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $toRect.width, $toRect.height);
                $ui.drawToCtx(_this._bottomRender.uiAtlas, $ctx);
            });
        };
        ActivityManager.prototype.butClik = function (evt) {
            if (evt.target.data instanceof tb.TB_system_icon) {
                var $tb = evt.target.data;
                UiTweenScale.getInstance().changeButSize(evt.target);
                //console.log($tb)
                if ($tb.id == SharedDef.MODULE_FISH) {
                    var topiconvo = this.getUiById(SharedDef.MODULE_FISH);
                    if (topiconvo) {
                        var $evt = new chgfish.ChgfishEvent(chgfish.ChgfishEvent.SHOW_Chgfish_EVENT);
                        $evt.data = topiconvo.ui;
                        ModuleEventManager.dispatchEvent($evt);
                    }
                }
                else {
                    ModulePageManager.openPanel($tb.id);
                }
                //  var evt1:any = new refill.RefillEvent(refill.RefillEvent.POP_Refill_EVENT)
                //  var data:topui.TopIconVo = new topui.TopIconVo();
                //  data.ui = evt.target
                //  evt1.data = data;
                //  ModuleEventManager.dispatchEvent(evt1);
            }
        };
        ActivityManager.prototype.getUiById = function ($id) {
            for (var i = 0; i < this._itemUi.length; i++) {
                var tb = this._itemUi[i].ui.data;
                if (tb.id == $id) {
                    return this._itemUi[i];
                }
            }
            return null;
        };
        ActivityManager.prototype.clear = function () {
            while (this._itemUi.length) {
                var $vo = this._itemUi.pop();
                this._container.removeChild($vo.ui);
                if ($vo.red) {
                    if ($vo.red.node) {
                        $vo.red.node.unBind();
                    }
                    this._container.removeChild($vo.red);
                }
            }
        };
        return ActivityManager;
    }());
    topui.ActivityManager = ActivityManager;
    var TopPandaPanel = /** @class */ (function (_super) {
        __extends(TopPandaPanel, _super);
        function TopPandaPanel() {
            var _this = _super.call(this) || this;
            _this.canAotuOpen = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.right = 0;
            return _this;
        }
        TopPandaPanel.prototype.setRender = function ($bottom, $mid, $top, $redpointRender) {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this._redPointRender = $redpointRender;
            this._activityManager = new ActivityManager();
            this._activityManager.initUI(this, this._bottomRender, this._midRender, this._topRender, this._redPointRender);
            this.loadConfigCom();
        };
        TopPandaPanel.prototype.loadConfigCom = function () {
            this.t_show_but = this.addEvntButUp("t_show_but", this._topRender);
            this.t_show_but.addEventListener(InteractiveEvent.Down, function (v) { }, this);
            GameInstance.pandaVisibel = true;
        };
        TopPandaPanel.prototype.changePandaVisible = function (value) {
            if (value == false) {
                this.canAotuOpen = true;
                GameInstance.pandaVisibel = false;
            }
            else {
                if (this.canAotuOpen) {
                    GameInstance.pandaVisibel = true;
                }
                this.canAotuOpen = false;
            }
            this.refresh();
        };
        TopPandaPanel.prototype.refresh = function () {
            this._activityManager.visible = GameInstance.pandaVisibel;
            this.t_show_but.isV = GameInstance.pandaVisibel;
            this._activityManager.refresh();
            this._activityManager.showTips(this._tipsVo);
            this._topRender.applyObjData();
            if (GuidData.map.showAreaById(AreaType.toprightPanda_3)) {
                this.right = 0;
            }
            else {
                this.right = 1000;
            }
        };
        TopPandaPanel.prototype.setTipsData = function ($data) {
            this._tipsVo = $data;
            this.refresh();
        };
        TopPandaPanel.prototype.getRefillPos = function () {
            if (this._activityManager && this._activityManager.visible) {
                var topIconVo = this._activityManager.getUiById(SharedDef.MODULE_FIRST_RECHARGE);
                if (topIconVo) {
                    var eee = new refill.RefillEvent(refill.RefillEvent.POP_Refill_EVENT);
                    eee.data = topIconVo;
                    ModuleEventManager.dispatchEvent(eee);
                }
            }
        };
        TopPandaPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.t_show_but:
                    GameInstance.pandaVisibel = !GameInstance.pandaVisibel;
                    this.refresh();
                    break;
                default:
                    break;
            }
        };
        return TopPandaPanel;
    }(UIVirtualContainer));
    topui.TopPandaPanel = TopPandaPanel;
})(topui || (topui = {}));
//# sourceMappingURL=TopPandaPanel.js.map