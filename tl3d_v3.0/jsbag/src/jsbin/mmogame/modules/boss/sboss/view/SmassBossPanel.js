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
var sboss;
(function (sboss) {
    var SbossLeftListRender = /** @class */ (function (_super) {
        __extends(SbossLeftListRender, _super);
        function SbossLeftListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SbossLeftListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            var _this = this;
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.S_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "S_BG", 0, 0, 222, 87, 8, 8);
            $container.addChild(this.S_BG);
            this.S_BG.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.S_ICON = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_ICON", 8, 8, 68, 68);
            $container.addChild(this.S_ICON);
            this.S_KILL_TIP = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_KILL_TIP", 185, 0, 35, 60);
            $container.addChild(this.S_KILL_TIP);
            this.S_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_NAME", 85, 12, 120, 18);
            $container.addChild(this.S_NAME);
            this.S_LEVEL = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_LEVEL", 85, 36, 120, 18);
            $container.addChild(this.S_LEVEL);
            this.S_TIME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_TIME", 85, 57, 120, 18);
            $container.addChild(this.S_TIME);
            this.upDataFun = function (t) { _this.update(t); };
        };
        SbossLeftListRender.prototype.update = function (t) {
            if (!this.parentTarget.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            }
            else {
                this.drawTimeInfo();
                this.loadIcon();
            }
        };
        Object.defineProperty(SbossLeftListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyRender();
                }
                if (val) {
                    var $kevt = new sboss.SbossEvent(sboss.SbossEvent.SELECT_MESH_BOSS_ID);
                    $kevt.selectMeshBossVo = this.itdata.data;
                    ModuleEventManager.dispatchEvent($kevt);
                }
            },
            enumerable: true,
            configurable: true
        });
        SbossLeftListRender.prototype.applyRender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                var $tb_Vo = tb.TB_creature_template.get_TB_creature_template($vo.tb.bossEntry);
                if (this.selected) {
                    //console.log(this.selected, this.itdata.id)
                }
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.S_BG.skinName, UIData.publicUi, this.selected ? PuiData.Slist_select : PuiData.Slist_nselect);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_NAME.skinName, ColorType.Orange853d07 + $tb_Vo.name, 16, TextAlign.LEFT);
                var $color = GuidData.player.getLevel() < $vo.tb.level ? ColorType.colorce0a00 : ColorType.Orange853d07;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_LEVEL.skinName, $color + "Lv: " + $tb_Vo.level, 14, TextAlign.LEFT);
            }
        };
        SbossLeftListRender.prototype.drawTimeInfo = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                var $tm = GameInstance.getGameSecond($vo.time);
                var $str;
                if ($vo.state == 1 && $tm > 0) {
                    $str = ColorType.Green20a200;
                    $str += getScencdStr($tm);
                    $str += "后刷新";
                }
                else {
                    $str = "";
                }
                if ($tm != this.lastTmStr) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_TIME.skinName, $str, 14, TextAlign.LEFT);
                    this.lastTmStr = $tm;
                }
            }
        };
        SbossLeftListRender.prototype.loadIcon = function () {
            var _this = this;
            var $vo = this.itdata.data;
            if (this.lastState != $vo.state) {
                this.lastState = $vo.state;
                var $url = "ui/load/boss/tou.png";
                var obj = TableData.getInstance().getData(TableData.tb_creature_template, $vo.tb.bossEntry);
                IconManager.getInstance().getIcon(getRoleIconUrl(obj.avatar), function ($img) {
                    var rec = _this.uiAtlas.getRec(_this.S_ICON.skinName);
                    _this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(_this.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight), UIData.publicUi);
                    _this.uiAtlas.ctx.drawImage($img, 3, 3, rec.pixelWitdh - 6, rec.pixelHeight - 6);
                    TextureManager.getInstance().updateTexture(_this.uiAtlas.texture, rec.pixelX, rec.pixelY, _this.uiAtlas.ctx);
                });
                this.drawKillIcon();
            }
        };
        SbossLeftListRender.prototype.drawKillIcon = function () {
            if (this.lastState == 1) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.S_KILL_TIP.skinName, "U_KILL_TITTLE");
            }
            else {
                this.uiAtlas.clearCtxTextureBySkilname(this.S_KILL_TIP.skinName);
            }
        };
        SbossLeftListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                TimeUtil.removeFrameTick(this.upDataFun);
                TimeUtil.addFrameTick(this.upDataFun);
                this.lastTmStr = -1;
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        SbossLeftListRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.S_BG.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_ICON.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_NAME.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_LEVEL.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_TIME.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_KILL_TIP.skinName);
        };
        SbossLeftListRender.prototype.butClik = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                this.setSelect();
            }
        };
        return SbossLeftListRender;
    }(SListItem));
    sboss.SbossLeftListRender = SbossLeftListRender;
    var SbossLeftList = /** @class */ (function (_super) {
        __extends(SbossLeftList, _super);
        function SbossLeftList() {
            var _this = _super.call(this) || this;
            _this.left = 325;
            _this.top = 149;
            return _this;
        }
        SbossLeftList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        SbossLeftList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, SbossLeftListRender, 225, 87 * 5, 225, 87, 5, 256, 1024, 1, 7);
        };
        SbossLeftList.prototype.resetData = function () {
            var $tbDataArr = sboss.SbossModel.getInstance().getItemData();
            this.refreshData($tbDataArr);
        };
        SbossLeftList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();
            this.setSelectIndex(0);
        };
        SbossLeftList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return SbossLeftList;
    }(SList));
    sboss.SbossLeftList = SbossLeftList;
    var SmassBossPanel = /** @class */ (function (_super) {
        __extends(SmassBossPanel, _super);
        function SmassBossPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bigPic = new UIRenderOnlyPicComponent();
            _this.addRender(_this._bigPic);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
            // this._frameFun = (t: number) => { this.upTime(t) };
        }
        SmassBossPanel.prototype.setRender = function ($uiAtlas, $win) {
            this._bigPic.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._winRender = $win;
            this.loadConfigCom();
        };
        // private lastCdStr: string
        // public upTime(t: number): void {
        //     if (!this.hasStage) {
        //         TimeUtil.removeFrameTick(this._frameFun);
        //         return;
        //     }
        //     var $cdStr: string = "";
        //     var $massBossCdNum: number = GameInstance.getGameSecond(GuidData.player.getPlayerIntFieldMassBossCd());
        //     if ($massBossCdNum > 0) {
        //         $cdStr = ColorType.colorce0a00 + getScencdStr($massBossCdNum);
        //         $cdStr += ColorType.Orange853d07 + " 增加1次挑战次数";
        //     }
        //     if (this.lastCdStr != $cdStr) {
        //         LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_cd_label.skinName, ColorType.Orange853d07 + $cdStr, 14, TextAlign.CENTER);
        //         this.lastCdStr = $cdStr;
        //     }
        // }
        SmassBossPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.sbossLeftList.show();
            this.refristhPanel();
            // TimeUtil.addFrameTick(this._frameFun);
        };
        SmassBossPanel.prototype.refristhPanel = function () {
            var $a = GuidData.player.getPlayerIntFieldMassBossTimes();
            // var $b: number = tb.TB_mass_boss_base.getTempVo(1).dailytimes;
            var $obj = TableData.getInstance().getData(TableData.tb_mass_boss_base, 1);
            var $tb_vip_base = TableData.getInstance().getData(TableData.tb_vip_base, GuidData.player.getVipLevel());
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_tz_num.skinName, ColorType.Brown7a2f21 + "今日奖励获得次数: " + ColorType.Green2ca937 + $a + "/" + ($obj["dailytimes"] + $tb_vip_base["massbossExtraTimes"]), 16, TextAlign.CENTER);
        };
        SmassBossPanel.prototype.hide = function () {
            this.sbossLeftList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        SmassBossPanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.t_gzbtn:
                case this.t_1:
                    ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.SHOW_GZ_EVENT));
                    break;
                case this.a_tiaozhan:
                    this.tiaozhanBoss();
                    break;
                case this.t_bossbtn:
                    var $eee = new sboss.SbossEvent(sboss.SbossEvent.SHOW_BOSSINFO_EVENT);
                    $eee.data = this.selectVo.tb;
                    ModuleEventManager.dispatchEvent($eee);
                    break;
                case this.t_selbtn:
                    //console.log("----this.t_selbtn.selected----", this.t_selbtn.selected);
                    GameData.configData.setopen_prompting_sboss(this.selectVo.tb.id - 1, this.t_selbtn.selected);
                    break;
                default:
                    break;
            }
        };
        SmassBossPanel.prototype.tiaozhanBoss = function () {
            var _this = this;
            if (this.selectVo.tb.level > GuidData.player.getLevel()) {
                //该地图无法进入
                var $mapobj = TableData.getInstance().getData(TableData.tb_map, this.selectVo.tb.mapid);
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + $mapobj["name"] + "需要达到" + this.selectVo.tb.level + "级才可进入，快去提升等级吧", 99);
            }
            else {
                var $a = GuidData.player.getPlayerIntFieldMassBossTimes();
                if ($a <= 0) {
                    AlertUtil.show("今日击杀boss获得奖励次数已达上限，将无法对boss造成伤害，无法获得boss奖励，是否前往？", "提示", function (a) {
                        if (a == 1) {
                            _this.gotrymassboss();
                        }
                    }, 2, ["是", "否"]);
                }
                else {
                    this.gotrymassboss();
                }
            }
        };
        SmassBossPanel.prototype.gotrymassboss = function () {
            GameInstance.questMoveVo = new QuestMoveVo();
            GameInstance.questMoveVo.autoplay = true;
            GameInstance.questMoveVo.pos = new Vector2D(this.selectVo.tb.bossPos[0], this.selectVo.tb.bossPos[1]);
            NetManager.getInstance().protocolos.try_mass_boss(this.selectVo.tb.id);
        };
        SmassBossPanel.prototype.loadConfigCom = function () {
            //大背景
            this.addChild(this._bigPic.getComponent("b_pic"));
            this._bigPic.setImgUrl("ui/uidata/boss/sboss/quanminbossbg.png");
            this.addChild(this._bottomRender.getComponent("a_list_bg"));
            this.a_list_pos = this.addChild(this._bottomRender.getComponent("a_list_pos"));
            this.addChild(this._bottomRender.getComponent("t_info"));
            this.a_tz_num = this.addChild(this._midRender.getComponent("a_tz_num"));
            this.a_tiaozhan = this.addEvntButUp("a_tiaozhan", this._midRender);
            this.t_selbtn = this.addEvntBut("t_selbtn", this._midRender);
            this.t_1 = this.addEvntButUp("t_1", this._topRender);
            this.addChild(this._topRender.getComponent("t_btntxt"));
            this.t_bossbtn = this.addEvntButUp("t_bossbtn", this._topRender);
            this.t_gzbtn = this.addEvntButUp("t_gzbtn", this._topRender);
            this.rewardIconItem = new Array();
            for (var i = 0; i < 8; i++) {
                var ui = this.addChild(this._midRender.getComponent("a_reward" + i));
                this.rewardIconItem.push(ui);
            }
            this.initList();
        };
        SmassBossPanel.prototype.selectMeshBossByVo = function (vo) {
            //选中item后的页面
            this.selectVo = vo;
            this.t_selbtn.selected = GameData.configData.getopen_prompting_sboss(vo.tb.id - 1);
            for (var index = 0; index < 8; index++) {
                if (vo.tb.show.length > index) {
                    IconManager.getInstance().drawItemIcon60(this.rewardIconItem[index], vo.tb.show[index]);
                }
                else {
                    IconManager.getInstance().clearItemEvent(this.rewardIconItem[index]);
                    UiDraw.clearUI(this.rewardIconItem[index]);
                }
            }
        };
        SmassBossPanel.prototype.refrishListData = function () {
            this.sbossLeftList.resetData();
        };
        SmassBossPanel.prototype.initList = function () {
            this.sbossLeftList = new SbossLeftList;
            this.sbossLeftList.init(this._midRender.uiAtlas);
        };
        SmassBossPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.sbossLeftList) {
                this.sbossLeftList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x + 3;
                this.sbossLeftList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y + 5;
            }
        };
        return SmassBossPanel;
    }(UIConatiner));
    sboss.SmassBossPanel = SmassBossPanel;
})(sboss || (sboss = {}));
//# sourceMappingURL=SmassBossPanel.js.map