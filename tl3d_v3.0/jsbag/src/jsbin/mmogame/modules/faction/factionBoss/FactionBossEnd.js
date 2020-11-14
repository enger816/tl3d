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
var faction;
(function (faction) {
    var FactionBossEndRender = /** @class */ (function (_super) {
        __extends(FactionBossEndRender, _super);
        function FactionBossEndRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactionBossEndRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Rankid = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Rankid", 30 - 10, 17, 30, 20);
            $container.addChild(this.Rankid);
            this.Name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Name", 97, 17, 138, 20);
            $container.addChild(this.Name);
            this.Title = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Title", 256 - 10, 17, 84, 20);
            $container.addChild(this.Title);
            this.Output = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Output", 373 - 10, 17, 84, 20);
            $container.addChild(this.Output);
            this.Reward0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Reward0", 500 - 10, 3, 50, 50);
            $container.addChild(this.Reward0);
            this.Reward0.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 584, 55);
            $container.addChild(this.Bg);
            // this.Select = this.creatGrid9SUI($baseRender, this.parentTarget.baseAtlas, "Select", 5, 4, 210, 74, 9);
            // $container.addChild(this.Select);
        };
        FactionBossEndRender.prototype.drawBg = function () {
            var $uiRect = this.uiAtlas.getRec(this.Bg.skinName);
            var $ctx = UIManager.getInstance().getContext2D($uiRect.pixelWitdh + 2, $uiRect.pixelHeight + 2, false);
            $ctx.fillStyle = "#e7d7be";
            $ctx.fillRect(0, 0, $uiRect.pixelWitdh + 2, $uiRect.pixelHeight + 2);
            this.uiAtlas.updateCtx($ctx, $uiRect.pixelX - 1, $uiRect.pixelY - 1);
        };
        FactionBossEndRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            //console.log("--vo--", vo, this.itdata.id);
            //   UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Bg.skinName, "ItemBg");
            if (vo.rankid % 2 == 1) {
                this.drawBg();
            }
            else {
                this.uiAtlas.clearCtxTextureBySkilname(this.Bg.skinName);
            }
            var $colorStr = vo.isme ? ColorType.Brown6a4936 : ColorType.Orange853d07;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Rankid.skinName, $colorStr + String(vo.rankid), 16);
            //名字
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name.skinName, $colorStr + getBaseName(vo.name), 16);
            //头衔
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Title.skinName, $colorStr + vo.title, 16);
            //输出
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Output.skinName, $colorStr + vo.output, 16);
            if (this.itdata.id == 1) {
                this.drawReward(vo.rewardary.reward[0]);
            }
            else {
                if (vo.rewardary) {
                    this.drawReward(vo.rewardary.fail_reward[0]);
                }
            }
        };
        FactionBossEndRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        FactionBossEndRender.prototype.drawReward = function ($ary) {
            var _this = this;
            this.Reward0.data = $ary[0];
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($ary[0]), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.Reward0.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 50, 50), UIData.publicUi);
                //图标
                ctx.drawImage($img, 0, 0, 60, 60, 2, 2, 46, 46);
                // ArtFont.getInstance().writeFontToCtxRight(ctx, String($ary[1]), ArtFont.num1, 4, 15);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        FactionBossEndRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                aa.id = evt.target.data;
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        FactionBossEndRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.Rankid.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Name.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Title.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Output.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Reward0.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Bg.skinName);
        };
        return FactionBossEndRender;
    }(SListItem));
    faction.FactionBossEndRender = FactionBossEndRender;
    var FactionBossEndList = /** @class */ (function (_super) {
        __extends(FactionBossEndList, _super);
        function FactionBossEndList() {
            var _this = _super.call(this) || this;
            _this.left = 324;
            _this.top = 153;
            return _this;
        }
        FactionBossEndList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        FactionBossEndList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, FactionBossEndRender, 584, 55 * 4, 0, 55, 5, 256, 512, 1, 5);
        };
        /**
         * refreshData
         */
        FactionBossEndList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        };
        FactionBossEndList.prototype.getData = function () {
            var ary = new Array;
            var listary = faction.FactionBossModel.getInstance().getRankList(this._result);
            for (var i = 0; i < listary.length; i++) {
                var item = new SListItemData;
                item.data = listary[i];
                item.id = this._result;
                ary.push(item);
            }
            return ary;
        };
        FactionBossEndList.prototype.show = function ($result) {
            this._result = $result;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        };
        FactionBossEndList.prototype.refreshAndselectIndex = function () {
            this.refreshDataByNewData();
            this.setSelectIndex(0);
        };
        FactionBossEndList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return FactionBossEndList;
    }(SList));
    faction.FactionBossEndList = FactionBossEndList;
    var FactionBossEnd = /** @class */ (function (_super) {
        __extends(FactionBossEnd, _super);
        function FactionBossEnd() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            _this._frameFun = function (t) { _this.upTime(t); };
            return _this;
        }
        FactionBossEnd.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.factionBossEndList) {
                this.factionBossEndList.dispose();
                this.factionBossEndList = null;
            }
            _super.prototype.dispose.call(this);
        };
        FactionBossEnd.prototype.applyLoad = function () {
            var _this = this;
            GameData.getPublicUiAtlas(function ($publicbgUiAtlas) {
                _this._publicRender.uiAtlas = $publicbgUiAtlas;
                _this._topRender.uiAtlas.setInfo("ui/uidata/faction/factionboss/factionbossend.xml", "ui/uidata/faction/factionboss/factionbossend.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
            });
        };
        FactionBossEnd.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            //  this.addChild(<UICompenent>this._midRender.getComponent("test"));
            this.addChild(this._bottomRender.getComponent("a_label4"));
            this.addChild(this._bottomRender.getComponent("a_label3"));
            this.addChild(this._bottomRender.getComponent("a_label2"));
            this.addChild(this._bottomRender.getComponent("a_label1"));
            this.addChild(this._bottomRender.getComponent("a_label0"));
            this.addChild(this._bottomRender.getComponent("a_tittle"));
            this.addChild(this._topRender.getComponent("a_height_line0"));
            this.addChild(this._topRender.getComponent("a_height_line1"));
            this.addChild(this._topRender.getComponent("a_height_line2"));
            this.addChild(this._topRender.getComponent("a_height_line3"));
            this.addChild(this._topRender.getComponent("a_width_line0"));
            this.addChild(this._topRender.getComponent("a_width_line1"));
            this.a_end_tip_info = this.addChild(this._topRender.getComponent("a_end_tip_info"));
            this.a_submit = this.addEvntBut("a_submit", this._midRender);
            //   this.a_state_frame = <FrameCompenent>this.addChild(this._midRender.getComponent("a_state_frame"));
            this.a_list_pos = this.addChild(this._midRender.getComponent("a_list_pos"));
            this.applyLoadComplete();
        };
        FactionBossEnd.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_submit:
                case this.e_close:
                    this.close();
                    break;
                default:
                    break;
            }
            // NetManager.getInstance().protocolos.instance_exit(0);
        };
        FactionBossEnd.prototype.close = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.factionBossEndList) {
                this.factionBossEndList.hide();
            }
        };
        FactionBossEnd.prototype.show = function ($data) {
            this.endTime = TimeUtil.getTimer() + 10 * 1000;
            TimeUtil.addFrameTick(this._frameFun);
            UIManager.getInstance().addUIContainer(this);
            if (!this.factionBossEndList) {
                this.factionBossEndList = new FactionBossEndList();
                this.factionBossEndList.init(this._bottomRender.uiAtlas);
            }
            this.factionBossEndList.show($data.result);
            //  this.a_state_frame.goToAndStop($data.result - 1);
            // this.a_state_frame.goToAndStop(1);
            var $str;
            if ($data.result == 1) {
                $str = ColorType.Brown6a4936 + "挑战成功。家族资金 +" + ColorType.Green20a200 + "+" + $data.money + ColorType.Brown6a4936 + "！家族额外获得【XXXX】";
            }
            else {
                $str = ColorType.Brown6a4936 + "挑战失败。家族资金 -" + ColorType.colorce0a00 + "-" + $data.money + ColorType.Brown6a4936 + "！请提升家族实力再来挑战";
            }
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_end_tip_info.skinName, $str, 14);
            this.resize();
        };
        FactionBossEnd.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
            if (this.factionBossEndList) {
                this.factionBossEndList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x;
                this.factionBossEndList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y;
            }
        };
        FactionBossEnd.prototype.upTime = function (t) {
            var $time = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                //console.log(this._curtime)
                if ($time < 0) {
                    //回调
                    this.close();
                }
                else {
                    // ArtFont.getInstance().writeFontToSkinNameCenter(this._midRender.uiAtlas, this.b_out_time_txt.skinName, String($time), ArtFont.num1, 5);
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
            }
        };
        return FactionBossEnd;
    }(WindowMinUi));
    faction.FactionBossEnd = FactionBossEnd;
})(faction || (faction = {}));
//# sourceMappingURL=FactionBossEnd.js.map