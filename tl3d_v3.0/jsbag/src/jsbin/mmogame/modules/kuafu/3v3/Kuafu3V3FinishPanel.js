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
    var Kuafu3V3FinishPanel = /** @class */ (function (_super) {
        __extends(Kuafu3V3FinishPanel, _super);
        function Kuafu3V3FinishPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topHeadRender = new UIRenderComponent;
            _this.addRender(_this._topHeadRender);
            _this._topLevelBgRender = new UIRenderComponent;
            _this.addRender(_this._topLevelBgRender);
            _this._topLeveltxtRender = new UIRenderComponent;
            _this.addRender(_this._topLeveltxtRender);
            _this._topRender.uiAtlas = new UIAtlas();
            _this._topRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/kuafu3v3end.xml", "ui/uidata/kuafu/3v3/kuafu3v3end.png", function () { _this.loadConfigCom(); }, "ui/uidata/kuafu/pc.png");
            return _this;
        }
        Kuafu3V3FinishPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._topHeadRender.dispose();
            this._topHeadRender = null;
        };
        Kuafu3V3FinishPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this._topHeadRender.uiAtlas = this._topRender.uiAtlas;
            this._topLevelBgRender.uiAtlas = this._topRender.uiAtlas;
            this._topLeveltxtRender.uiAtlas = this._topRender.uiAtlas;
            this.addChild(this._topRender.getComponent("a_kuafu_tip_bg"));
            this.a_kuafu_tittle = new Array();
            this.a_kuafu_tittle.push(this._midRender.getComponent("a_kuafu_tittle_0"));
            this.a_kuafu_tittle.push(this._midRender.getComponent("a_kuafu_tittle_1"));
            this.a_kuafu_tittle.push(this._midRender.getComponent("a_kuafu_tittle_2"));
            this.addChild(this._midRender.getComponent("a_kuafu_jifen_txt"));
            this.addChild(this._midRender.getComponent("a_kuafu_jisha_txt"));
            this.addChild(this._midRender.getComponent("a_kuafu_jifen_txt1"));
            this.addChild(this._midRender.getComponent("a_kuafu_jisha_txt1"));
            this.addChild(this._bottomRender.getComponent("a_win_bg_line"));
            this.addEvntBut("a_win_bg_color", this._bottomRender);
            var a_win_bg_color_right = this.addEvntBut("a_win_bg_color_right", this._bottomRender);
            a_win_bg_color_right.isU = true;
            var a_win_bg_line_right = this.addChild(this._bottomRender.getComponent("a_win_bg_line_right"));
            a_win_bg_line_right.isU = true;
            this.a_kuafu_dangqian_jifen_txt = this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_dangqian_jifen_txt"));
            this.addChild(this._bottomRender.getComponent("a_kuafu_tip_bg1"));
            this.a_kuafu_timeout = this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_timeout"));
            this.a_kuafu_head_bg = new Array();
            this.a_kuafu_head_icon = new Array();
            this.a_kuafu_head_name = new Array();
            this.a_kuafu_head_level = new Array();
            this.a_kuafu_jifen_frame = new Array();
            this.a_kuafu_jisha_frame = new Array();
            this.a_kuafu_cell_bg = new Array();
            this.a_kuafu_level_bg = new Array();
            this.a_kuafu_cell_bgslef = this.addChild(this._midRender.getComponent("a_kuafu_cell_bgslef"));
            for (var i = 0; i < 6; i++) {
                var $temp = this.addChild(this._midRender.getComponent("a_kuafu_cell_bg" + i));
                if (i % 2 == 1) {
                    $temp.isU = true;
                }
                this.a_kuafu_cell_bg.push($temp);
                this.a_kuafu_level_bg.push(this.addChild(this._topLevelBgRender.getComponent("a_kuafu_level_bg" + i)));
                this.a_kuafu_head_bg.push(this.addChild(this._topRender.getComponent("a_kuafu_head_bg" + i)));
                this.a_kuafu_head_icon.push(this.addChild(this._topHeadRender.getComponent("a_kuafu_head_icon" + i)));
                this.a_kuafu_head_name.push(this.addChild(this._topHeadRender.getComponent("a_kuafu_head_name" + i)));
                this.a_kuafu_head_level.push(this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_head_level" + i)));
                this.a_kuafu_jifen_frame.push(this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_jifen_frame" + i)));
                this.a_kuafu_jisha_frame.push(this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_jisha_frame" + i)));
            }
            this.a_bifen_right = this.addChild(this._topLeveltxtRender.getComponent("a_bifen_right"));
            this.a_bifen_left = this.addChild(this._topLeveltxtRender.getComponent("a_bifen_left"));
            this._bottomRender.applyObjData();
            this._midRender.applyObjData();
            this._topRender.applyObjData();
            this._tickFun = function (t) { _this.tickRefreshState(t); };
            this.refrish();
        };
        Kuafu3V3FinishPanel.prototype.butClik = function (evt) {
            this.close();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            NetManager.getInstance().protocolos.instance_exit(0);
            //console.log("推出副本")
        };
        Kuafu3V3FinishPanel.prototype.tickRefreshState = function (t) {
            var $time = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                //console.log("刷新", $time);
                LabelTextFont.writeTextAutoCenter(this._bottomRender.uiAtlas, this.a_kuafu_timeout.skinName, ColorType.Redd92200 + $time + ColorType.Whitefff7db + "秒后自动返回匹配界面", 16, ColorType.Yellowedce7e, 200, true);
                if ($time < 0) {
                    this.close();
                    NetManager.getInstance().protocolos.goback_to_game_server();
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
            }
        };
        Kuafu3V3FinishPanel.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        Kuafu3V3FinishPanel.prototype.refrish = function () {
            this.setUiListVisibleByItem(this.a_kuafu_head_bg, false);
            this.setUiListVisibleByItem(this.a_kuafu_head_icon, false);
            this.setUiListVisibleByItem(this.a_kuafu_head_name, false);
            this.setUiListVisibleByItem(this.a_kuafu_head_level, false);
            this.setUiListVisibleByItem(this.a_kuafu_jifen_frame, false);
            this.setUiListVisibleByItem(this.a_kuafu_jisha_frame, false);
            this.setUiListVisibleByItem(this.a_kuafu_cell_bg, false);
            this.setUiListVisibleByItem(this.a_kuafu_level_bg, false);
            var $itemArr = kuafu.KuaFu3v3Model.getInstance().kuafuItem;
            if (!$itemArr) {
                $itemArr = new Array();
            }
            var $leftnum = 0;
            var $rightnum = 0;
            //当前绘制索引变量
            var anum = 0;
            var bnum = 0;
            for (var k = 0; k < $itemArr.length; k++) {
                var $selecVo = $itemArr[k];
                var $cellIdx = k;
                if ($selecVo.group == 1) {
                    $cellIdx = anum * 2 + 0;
                    anum++;
                }
                else {
                    $cellIdx = bnum * 2 + 1;
                    bnum++;
                }
                if ($selecVo == kuafu.KuaFu3v3Model.getInstance().selfVo) {
                    this.a_kuafu_cell_bgslef.x = this.a_kuafu_cell_bg[$cellIdx].x;
                    this.a_kuafu_cell_bgslef.y = this.a_kuafu_cell_bg[$cellIdx].y;
                    this.a_kuafu_cell_bgslef.isU = this.a_kuafu_cell_bg[$cellIdx].isU;
                }
                else {
                    this.setUiListVisibleByItem([this.a_kuafu_cell_bg[$cellIdx]], true);
                }
                this.setUiListVisibleByItem([this.a_kuafu_level_bg[$cellIdx]], true);
                this.setUiListVisibleByItem([this.a_kuafu_head_bg[$cellIdx]], true);
                var $a_kuafu_head_name = this.a_kuafu_head_name[$cellIdx];
                $a_kuafu_head_name.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_head_name, ColorType.Yellowffecc6 + getBaseName($selecVo.name));
                this.setUiListVisibleByItem([$a_kuafu_head_name], true);
                var $a_kuafu_head_icon = this.a_kuafu_head_icon[$cellIdx];
                $a_kuafu_head_icon.goToAndStop($cellIdx);
                this.drawHeadIconToCtx($a_kuafu_head_icon, $selecVo.gender);
                this.setUiListVisibleByItem([$a_kuafu_head_icon], true);
                var $a_kuafu_head_level = this.a_kuafu_head_level[$cellIdx];
                $a_kuafu_head_level.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_head_level, ColorType.Whitefff7db + String($selecVo.level));
                this.setUiListVisibleByItem([$a_kuafu_head_level], true);
                var $a_kuafu_jifen_frame = this.a_kuafu_jifen_frame[$cellIdx];
                $a_kuafu_jifen_frame.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_jifen_frame, ColorType.Whitefff7db + String($selecVo.jifen));
                this.setUiListVisibleByItem([$a_kuafu_jifen_frame], true);
                var $a_kuafu_jisha_frame = this.a_kuafu_jisha_frame[$cellIdx];
                $a_kuafu_jisha_frame.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_jisha_frame, ColorType.Whitefff7db + String($selecVo.killnum));
                this.setUiListVisibleByItem([$a_kuafu_jisha_frame], true);
                if ($selecVo.dieState == 1) {
                    if ($selecVo.group == 1) {
                        $rightnum++;
                    }
                    else {
                        $leftnum++;
                    }
                }
            }
            $rightnum = ($itemArr.length / 2) - $rightnum;
            $leftnum = ($itemArr.length / 2) - $leftnum;
            LabelTextFont.writeTextAutoCenter(this._bottomRender.uiAtlas, this.a_kuafu_dangqian_jifen_txt.skinName, ColorType.Whitefff7db + "当前积分:" + kuafu.KuaFu3v3Model.getInstance().selfVo.score, 16, ColorType.Yellowedce7e, 200, true);
            this.drawTop($rightnum, $leftnum);
            var $time = GameInstance.getGameSecond(GuidData.map.getMapIntFieldEndTM());
            if ($time < 1) {
                $time = 15;
            }
            this._endtime = TimeUtil.getTimer() + $time * 1000; //结束时间
            TimeUtil.addFrameTick(this._tickFun);
        };
        Kuafu3V3FinishPanel.prototype.drawTop = function ($leftnum, $rightnum) {
            //胜负ui
            this.setUiListVisibleByItem(this.a_kuafu_tittle, false);
            if ($leftnum == $rightnum) {
                this.setUiListVisibleByItem([this.a_kuafu_tittle[1]], true);
            }
            else {
                var $selfGrop = kuafu.KuaFu3v3Model.getInstance().selfVo.group;
                if ($leftnum > $rightnum && $selfGrop == 1 || $leftnum < $rightnum && $selfGrop == 2) {
                    this.setUiListVisibleByItem([this.a_kuafu_tittle[0]], true);
                }
                else {
                    this.setUiListVisibleByItem([this.a_kuafu_tittle[2]], true);
                }
            }
            //左右比分绘制
            ArtFont.getInstance().writeFontToSkinNameCenter(this._bottomRender.uiAtlas, this.a_bifen_left.skinName, String($leftnum), ArtFont.num23);
            ArtFont.getInstance().writeFontToSkinNameCenter(this._bottomRender.uiAtlas, this.a_bifen_right.skinName, String($rightnum), ArtFont.num23);
        };
        Kuafu3V3FinishPanel.prototype.drawHeadIconToCtx = function ($ui, $id) {
            var _this = this;
            IconManager.getInstance().getIcon(getTouPic($id), function ($img) {
                var $skillrec = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
                $ctx.drawImage($img, 0, 0, $skillrec.width, $skillrec.height);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        Kuafu3V3FinishPanel.prototype.drawFrontToFrame = function ($ui, $str, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 14, 0, 0, $align);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        return Kuafu3V3FinishPanel;
    }(UIPanel));
    kuafu.Kuafu3V3FinishPanel = Kuafu3V3FinishPanel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=Kuafu3V3FinishPanel.js.map