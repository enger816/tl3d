var leftui;
(function (leftui) {
    var LeftHangUpBossVo = /** @class */ (function () {
        function LeftHangUpBossVo($perent, $mid, $top) {
            this.perent = $perent;
            this._midRender = $mid;
            this._topRender = $top;
            this.initUi();
        }
        LeftHangUpBossVo.prototype.initUi = function () {
            this.uiList = new Array();
            this.b_bg = this.perent.addChild(this._midRender.getComponent("b_bg"));
            this.uiList.push(this.b_bg);
            this.a_bg_top = this.perent.addChild(this._midRender.getComponent("a_bg_top"));
            this.a_bg_mid = this.perent.addChild(this._midRender.getComponent("a_bg_mid"));
            this.a_bg_bottom = this.perent.addChild(this._midRender.getComponent("a_bg_bottom"));
            this.uiList.push(this.a_bg_top);
            this.uiList.push(this.a_bg_mid);
            this.uiList.push(this.a_bg_bottom);
            this.b_map_name = this.perent.addChild(this._topRender.getComponent("b_map_name"));
            this.uiList.push(this.b_map_name);
            this.b_force_txt = this.perent.addChild(this._topRender.getComponent("b_force_txt"));
            this.uiList.push(this.b_force_txt);
            this.b_tip_info = this.perent.addChild(this._topRender.getComponent("b_tip_info"));
            this.uiList.push(this.b_tip_info);
            this.resize();
        };
        LeftHangUpBossVo.prototype.resize = function () {
            this.a_bg_top.x = this.b_bg.x;
            this.a_bg_mid.x = this.b_bg.x;
            this.a_bg_bottom.x = this.b_bg.x;
            this.a_bg_top.y = this.b_bg.y;
            this.a_bg_mid.y = this.a_bg_top.y + this.a_bg_top.height;
            this.a_bg_mid.height = this.b_bg.height - this.a_bg_top.height - this.a_bg_bottom.height;
            this.a_bg_bottom.y = this.b_bg.y + this.b_bg.height - this.a_bg_bottom.height;
        };
        LeftHangUpBossVo.prototype.refresh = function () {
            var $tb = tb.TB_risk_data.get_TB_risk_data(GuidData.map.getTrialInstanceFieldSectionId());
            //console.log("----------------------", $tb)
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_map_name.skinName, $tb.name, 14, TextAlign.LEFT, ColorType.Yellowffd500);
            var $expStr = ColorType.Whiteffffff + "Boss战力:" + ColorType.Green56da35 + $tb.advisepoint;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_force_txt.skinName, $expStr, 14, TextAlign.LEFT, ColorType.Whiteffffff);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_tip_info.skinName, "Boss奖励:", 14, TextAlign.LEFT, ColorType.Whiteffffff);
            this.clearIcon();
            for (var i = 0; i < 3; i++) {
                if (i > $tb.showitems.length - 1) {
                    return;
                }
                var $b_reward_frame = this.perent.addChild(this._topRender.getComponent("b_reward_frame"));
                $b_reward_frame.goToAndStop(i);
                $b_reward_frame.x += i * 50;
                this.drawIconReward($b_reward_frame, $tb.showitems[i]);
                $b_reward_frame.addEventListener(InteractiveEvent.Up, this.itemClick, this);
                // IconManager.getInstance().drawItemIcon40($b_reward_frame, $tb.showitems[i]);
                this.iconFrameItem.push($b_reward_frame);
            }
        };
        LeftHangUpBossVo.prototype.drawIconReward = function ($ui, $id) {
            var _this = this;
            var obj = tb.TB_item_template.get_TB_item_template($id);
            $ui.data = obj;
            IconManager.getInstance().getIcon(geteqiconIconUrl(obj.icon), function ($img) {
                var $skillrec = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
                UiDraw.cxtDrawImg($ctx, PuiData.PropBg40, new Rectangle(0, 0, 48, 48), UIData.publicUi);
                UiDraw.cxtDrawImg($ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 48, 48), UIData.publicUi);
                $ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 40, 40);
                $ui.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
        };
        LeftHangUpBossVo.prototype.itemClick = function ($e) {
            var itemData = $e.target.data;
            var bag = new BagItemData();
            bag.entryData = itemData;
            var evt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
            evt.data = bag;
            evt.buttonType = -1;
            ModuleEventManager.dispatchEvent(evt);
        };
        LeftHangUpBossVo.prototype.clearIcon = function () {
            if (this.iconFrameItem) {
                while (this.iconFrameItem.length) {
                    this.perent.removeChild(this.iconFrameItem.pop());
                }
            }
            else {
                this.iconFrameItem = new Array;
            }
        };
        LeftHangUpBossVo.prototype.show = function () {
            this.perent.setUiListVisibleByItem(this.uiList, true);
            this.refresh();
        };
        LeftHangUpBossVo.prototype.hide = function () {
            this.clearIcon();
            this.perent.setUiListVisibleByItem(this.uiList, false);
        };
        return LeftHangUpBossVo;
    }());
    leftui.LeftHangUpBossVo = LeftHangUpBossVo;
})(leftui || (leftui = {}));
//# sourceMappingURL=LeftHangUpBossVo.js.map