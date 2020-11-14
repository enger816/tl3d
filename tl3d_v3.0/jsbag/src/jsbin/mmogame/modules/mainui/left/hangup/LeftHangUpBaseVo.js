var leftui;
(function (leftui) {
    var LeftHangUpBaseVo = /** @class */ (function () {
        function LeftHangUpBaseVo($perent, $mid, $top, $top1) {
            this.startTM = 0;
            this.moneyTm = 0;
            this.perent = $perent;
            this._midRender = $mid;
            this._topRender = $top;
            this._topRender1 = $top1;
            this.initUi();
        }
        LeftHangUpBaseVo.prototype.initUi = function () {
            this.uiList = new Array();
            this.a_bg = this.perent.addChild(this._midRender.getComponent("a_bg"));
            this.a_bg_top = this.perent.addChild(this._midRender.getComponent("a_bg_top"));
            this.a_bg_mid = this.perent.addChild(this._midRender.getComponent("a_bg_mid"));
            this.a_bg_bottom = this.perent.addChild(this._midRender.getComponent("a_bg_bottom"));
            this.uiList.push(this.a_bg_top);
            this.uiList.push(this.a_bg_mid);
            this.uiList.push(this.a_bg_bottom);
            this.a_map_name = this.perent.addChild(this._topRender.getComponent("a_map_name"));
            this.a_exp_num = this.perent.addChild(this._topRender.getComponent("a_exp_num"));
            this.a_money_txt = this.perent.addChild(this._topRender.getComponent("a_money_txt"));
            var a_iocn_0 = this.perent.addChild(this._topRender.getComponent("a_iocn_0"));
            var a_iocn_1 = this.perent.addChild(this._topRender.getComponent("a_iocn_1"));
            var a_iocn_2 = this.perent.addChild(this._topRender.getComponent("a_iocn_2"));
            this.uiList.push(a_iocn_0);
            this.uiList.push(a_iocn_1);
            this.uiList.push(a_iocn_2);
            this.a_equ_txt = this.perent.addChild(this._topRender.getComponent("a_equ_txt"));
            this.a_hasquest = this._topRender1.getComponent("a_hasquest");
            this.uiList.push(this.a_bg);
            this.uiList.push(this.a_map_name);
            this.uiList.push(this.a_exp_num);
            this.uiList.push(this.a_money_txt);
            this.uiList.push(this.a_equ_txt);
            this.resize();
        };
        LeftHangUpBaseVo.prototype.resize = function () {
            this.a_bg_top.x = this.a_bg.x;
            this.a_bg_mid.x = this.a_bg.x;
            this.a_bg_bottom.x = this.a_bg.x;
            this.a_bg_top.y = this.a_bg.y;
            this.a_bg_mid.y = this.a_bg_top.y + this.a_bg_top.height;
            this.a_bg_mid.height = this.a_bg.height - this.a_bg_top.height - this.a_bg_bottom.height;
            this.a_bg_bottom.y = this.a_bg.y + this.a_bg.height - this.a_bg_bottom.height;
        };
        LeftHangUpBaseVo.prototype.refresh = function () {
            var $tb = adventure.AdventureModel.getInstance().getCurTb();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, ColorType.Yellowffd500 + $tb.name, 16 * 1.5, TextAlign.LEFT, ColorType.Yellowffd500, ColorType.colord27262e);
            var exp = $tb.expReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exp_num.skinName, "经验  " + exp + "/小时 ", 16 * 1.5, TextAlign.LEFT, ColorType.Green56da35, ColorType.colord27262e);
            var gold = $tb.goldReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_money_txt.skinName, "银币  " + gold + "/小时", 16 * 1.5, TextAlign.LEFT, ColorType.Green56da35, ColorType.colord27262e);
            var equipnum = Math.ceil($tb.suitScore * 360 / $tb.suitScoreChange);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_equ_txt.skinName, "装备  " + equipnum + "件/小时", 16 * 1.5, TextAlign.LEFT, ColorType.Green56da35, ColorType.colord27262e);
            for (var i = 0; i < random(10); i++) {
                //  ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.LEFT_HANGUP_BASE_REFRESH));
            }
            //console.log("--刷新----");
            var qv = quest.QuestModel.getInstance().getMainTaskVo();
            if (qv && qv.tb_quest.flag == 2 && qv.finish) {
                this.perent.setUiListVisibleByItem([this.a_hasquest], true);
            }
            else {
                this.perent.setUiListVisibleByItem([this.a_hasquest], false);
            }
        };
        LeftHangUpBaseVo.prototype.upTimeFrame = function () {
            this.refresh();
        };
        LeftHangUpBaseVo.prototype.show = function () {
            this.perent.setUiListVisibleByItem(this.uiList, true);
            var qv = quest.QuestModel.getInstance().getMainTaskVo();
            if (qv && qv.tb_quest.flag == 2) {
                this.perent.setUiListVisibleByItem([this.a_hasquest], true);
            }
            else {
                this.perent.setUiListVisibleByItem([this.a_hasquest], false);
            }
        };
        LeftHangUpBaseVo.prototype.hide = function () {
            this.perent.setUiListVisibleByItem(this.uiList, false);
            this.perent.setUiListVisibleByItem([this.a_hasquest], false);
        };
        return LeftHangUpBaseVo;
    }());
    leftui.LeftHangUpBaseVo = LeftHangUpBaseVo;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftHangUpBaseVo.js.map