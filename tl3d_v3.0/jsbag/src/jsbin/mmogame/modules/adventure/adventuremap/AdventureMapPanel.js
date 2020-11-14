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
var adventuremap;
(function (adventuremap) {
    var AdventureMapVo = /** @class */ (function () {
        function AdventureMapVo() {
        }
        return AdventureMapVo;
    }());
    adventuremap.AdventureMapVo = AdventureMapVo;
    var AdventureMapPanel = /** @class */ (function (_super) {
        __extends(AdventureMapPanel, _super);
        function AdventureMapPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.passUiItem = new Array();
            _this.pageId = -1;
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
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        AdventureMapPanel.prototype.dispose = function () {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        AdventureMapPanel.prototype.initUiAtlas = function ($uiAtlas) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this.addChild(this._bottomRender.getComponent("a_txt_bg_exp"));
            this.addChild(this._bottomRender.getComponent("a_txt_bg_map_name"));
            this.addChild(this._midRender.getComponent("a_info_txt"));
            this.a_map_name = this.addChild(this._topRender.getComponent("a_map_name"));
            this.a_money_txt = this.addChild(this._topRender.getComponent("a_money_txt"));
            this.a_exp_txt = this.addChild(this._topRender.getComponent("a_exp_txt"));
            this.a_equ_txt = this.addChild(this._topRender.getComponent("a_equ_txt"));
            this.a_card_num = this.addChild(this._topRender.getComponent("a_card_num"));
            this.a_card_num_bg = this.addChild(this._midRender.getComponent("a_card_num_bg"));
            this.a_attact_now = this.addEvntButUp("a_attact_now", this._topRender);
            this.a_adventure_time = this.addChild(this._topRender.getComponent("a_adventure_time"));
            this.a_page_but_left = this.addEvntButUp("a_page_but_left", this._topRender);
            this.a_page_but_right = this.addEvntButUp("a_page_but_right", this._topRender);
            this.a_page_but_right.isU = true;
            this.mapIconUiList = new Array();
            for (var i = 0; i < 5; i++) {
                var $vo = new AdventureMapVo();
                $vo.idex = i;
                $vo.pic = this.addChild(this._midRender.getComponent("a_chart_frame"));
                $vo.pic.goToAndStop(i);
                $vo.tittle = this.addChild(this._topRender.getComponent("a_tittle_frame"));
                $vo.tittle.goToAndStop(i);
                $vo.bg = this.addChild(this._bottomRender.getComponent("a_pic_tittle_bg"));
                this.mapIconUiList.push($vo);
            }
            this.a_rank_but = this.addEvntButUp("a_rank_but", this._topRender);
            this.a_enter_but = this.addEvntButUp("a_enter_but", this._topRender);
            this.a_guaji = this.addChild(this._topRender.getComponent("a_guaji"));
            this.uiAtlasComplet = true;
        };
        AdventureMapPanel.prototype.drawLabelTittle = function ($ui, $txt) {
            var $skillrec = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whitefffce6 + $txt, 16, 0, 0, TextAlign.CENTER);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        AdventureMapPanel.prototype.drawMapIcon = function ($vo, $tb_risk_data) {
            var _this = this;
            var $chapterId = $tb_risk_data.chapterId;
            var $startId = this.pageId * 5;
            var $tb = tb.TB_risk_chapter.get_TB_risk_chapter($vo.idex + $startId + 1);
            this.setUpost($vo, $tb.iconpos);
            this.drawLabelTittle($vo.tittle, $tb.name);
            var $iconUrl = "ui/load/map/world/" + $tb.icon + ".png";
            if ($tb.id < ($chapterId + 1)) {
                $iconUrl = "ui/load/adventure/icon/1.png";
            }
            else {
                $iconUrl = "ui/load/adventure/icon/2.png";
            }
            LoadManager.getInstance().load(Scene_data.fileRoot + $iconUrl, LoadManager.IMG_TYPE, function ($img) {
                var $toRect = $vo.pic.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                //  //console.log("$vo.id ,$chapterId", $tb.id, $chapterId);
                if ($tb.id > ($chapterId + 1)) {
                    //  UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                }
                $vo.pic.drawToCtx(_this._topRender.uiAtlas, $ctx);
            });
            if ($tb.id < $chapterId) {
                var $temp = this.addChild(this._topRender.getComponent("a_pass_icon"));
                $temp.x = $tb.iconpos[0] - 30;
                $temp.y = $tb.iconpos[1] - 10;
                this.passUiItem.push($temp);
            }
            if ($tb.id == $chapterId) {
                this.a_attact_now.x = $tb.iconpos[0] - 30;
                this.a_attact_now.y = $tb.iconpos[1] - 75;
                this.a_guaji.x = $tb.iconpos[0] - 50;
                this.a_guaji.y = $tb.iconpos[1] - 15;
                this.a_card_num.x = $tb.iconpos[0] - 55 + 10;
                this.a_card_num.y = $tb.iconpos[1] + 20 - 10;
                this.a_card_num_bg.x = this.a_card_num.x;
                this.a_card_num_bg.y = this.a_card_num.y;
                var $count = tb.TB_risk_menu.get_TB_risk_menu($chapterId).count;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_card_num.skinName, ColorType.Green98ec2c + "关卡" + $tb_risk_data.cardId + "/" + $count, 15, TextAlign.CENTER);
            }
        };
        AdventureMapPanel.prototype.setUpost = function ($vo, $iconpos) {
            $vo.pic.x = $iconpos[0] - 50;
            $vo.pic.y = $iconpos[1] - 50;
            $vo.tittle.x = $vo.pic.x;
            $vo.tittle.y = $vo.pic.y + 90;
            $vo.bg.x = $vo.pic.x - 10;
            $vo.bg.y = $vo.pic.y + 60;
        };
        AdventureMapPanel.prototype.refresh = function () {
            UIManager.getInstance().addUIContainer(this);
            while (this.passUiItem.length) {
                this.removeChild(this.passUiItem.pop());
            }
            this.a_attact_now.x = -1000;
            this.a_attact_now.y = 0;
            this.a_guaji.x = -1000;
            this.a_guaji.y = 0;
            this.a_card_num.x = -1000;
            this.a_card_num.y = 0;
            this.a_card_num_bg.x = -1000;
            this.a_card_num_bg.y = 0;
            var $tb = adventure.AdventureModel.getInstance().getCurTb();
            if (this.pageId == -1) {
                this.pageId = Math.floor(($tb.chapterId - 1) / 5);
                // this.pageId=1
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, ColorType.Yellowffe9b4 + $tb.name, 16, TextAlign.CENTER);
            var exp = $tb.expReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exp_txt.skinName, exp + "/小时 ", 14, TextAlign.RIGHT, ColorType.Green98ec2c, ColorType.colord27262e);
            var gold = $tb.goldReward[1] * 360;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_money_txt.skinName, gold + "/小时", 14, TextAlign.RIGHT, ColorType.Green98ec2c, ColorType.colord27262e);
            var equipnum = Math.ceil($tb.suitScore * 360 / $tb.suitScoreChange);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_equ_txt.skinName, equipnum + "件/小时", 14, TextAlign.RIGHT, ColorType.Green98ec2c, ColorType.colord27262e);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_adventure_time.skinName, getvipadd("riskReward"), 16, TextAlign.CENTER, ColorType.Yellowffe9b4, ColorType.colord27262e);
            for (var j = 0; j < this.mapIconUiList.length; j++) {
                //this.mapIconUiList[j].idex = j + this.pageId *5
                this.drawMapIcon(this.mapIconUiList[j], $tb);
            }
            /*
                  */
            var $aaa = GuidData.player.getPlayerIntFiledLeaveRiskPicked();
            var $bbb = GuidData.player.getPlaerExpAndIntLastLogoutTime();
            this.leaveTime = TimeUtil.getTimer() + GameInstance.getGameSecond($bbb) * 1000;
            //TimeUtil.addTimeTick(1000, this._tickFun);
            var ui = this.parent.loadBigPicByUrl("ui/load/adventure/" + (this.pageId + 1) + ".jpg");
            ui.width = 826;
            ui.height = 451;
            this.setUiListVisibleByItem([this.a_page_but_left], this.pageId > 0);
            var $len = tb.TB_risk_chapter.getItem().length;
            this.setUiListVisibleByItem([this.a_page_but_right], this.pageId < ($len / 5 - 1));
        };
        AdventureMapPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_page_but_left:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this.pageId > 0) {
                        this.pageId--;
                        this.refresh();
                    }
                    break;
                case this.a_page_but_right:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this.pageId < (tb.TB_risk_chapter.getItem().length / 5)) {
                        this.pageId++;
                        this.refresh();
                    }
                    break;
                case this.a_attact_now:
                case this.a_enter_but:
                    UIManager.popClikNameFun(this.a_enter_but.name);
                    ModuleEventManager.dispatchEvent(new adventuremap.AdventureMapEvent(adventuremap.AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL));
                    //console.log("=================enter_risk_instance")
                    NetManager.getInstance().protocolos.enter_risk_instance();
                    break;
                case this.a_rank_but:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    NetManager.getInstance().protocolos.risk_get_rank();
                    break;
                default:
                    break;
            }
        };
        AdventureMapPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return AdventureMapPanel;
    }(UIVirtualContainer));
    adventuremap.AdventureMapPanel = AdventureMapPanel;
})(adventuremap || (adventuremap = {}));
//# sourceMappingURL=AdventureMapPanel.js.map