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
    var PbossLeftListRender = /** @class */ (function (_super) {
        __extends(PbossLeftListRender, _super);
        function PbossLeftListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // private S_KILL_TIP: UICompenent;
        PbossLeftListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            var _this = this;
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var cententRender = this._customRenderAry[0];
            this.S_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "S_BG", 0, 0, 222, 87, 8, 8);
            $container.addChild(this.S_BG);
            this.S_BG.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.S_ICON = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_ICON", 8, 8, 68, 68);
            $container.addChild(this.S_ICON);
            // this.S_KILL_TIP = this.creatSUI($baseRender, PbossLeftListRender.baseAtlas, "S_KILL_TIP", 185, 0, 35, 60);
            // $container.addChild(this.S_KILL_TIP);
            this.S_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_NAME", 85, 12, 120, 18);
            $container.addChild(this.S_NAME);
            this.S_LEVEL = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_LEVEL", 85, 36, 120, 18);
            $container.addChild(this.S_LEVEL);
            this.S_TIME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_TIME", 85, 57, 120, 18);
            $container.addChild(this.S_TIME);
            this.Redpoint = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "S_REDPOINT", 205, 1, 17, 16);
            this.Redpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Redpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
            this.upDataFun = function (t) { _this.update(t); };
        };
        PbossLeftListRender.prototype.update = function (t) {
            if (!this.parentTarget.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            }
            else {
                this.drawTimeInfo();
            }
        };
        Object.defineProperty(PbossLeftListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyRender();
                }
                if (val) {
                    UIManager.popClikNameFun("S_BG");
                    var $kevt = new sboss.SbossEvent(sboss.SbossEvent.PBOSS_REFRISH_PANEL);
                    $kevt.data = this.itdata.data;
                    ModuleEventManager.dispatchEvent($kevt);
                }
            },
            enumerable: true,
            configurable: true
        });
        PbossLeftListRender.prototype.applyRender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                var $tb_Vo = tb.TB_creature_template.get_TB_creature_template($vo.tabbossinfo.bossEntry);
                if ($vo.node) {
                    $vo.node.bindUI(this.Redpoint);
                }
                this.loadIcon(String($tb_Vo.avatar));
                // if (this.selected) {
                //     //console.log(this.selected, this.itdata.id)
                // }
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.S_BG.skinName, UIData.publicUi, this.selected ? PuiData.Slist_select : PuiData.Slist_nselect);
                var name;
                if (!$vo.openstate) {
                    name = ColorType.colorb96d49 + $tb_Vo.name;
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_LEVEL.skinName, ColorType.colorb96d49 + $vo.tabbossinfo.permitLevel + "级解锁", 16, TextAlign.LEFT);
                }
                else {
                    name = ColorType.Orange853d07 + $tb_Vo.name;
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_LEVEL.skinName, ColorType.Orange853d07 + "等级:" + $vo.tabbossinfo.permitLevel, 14, TextAlign.LEFT);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_NAME.skinName, name, 16, TextAlign.LEFT);
            }
        };
        PbossLeftListRender.prototype.drawTimeInfo = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                if ($vo.openstate) {
                    var $str = ColorType.Brown7a2f21 + "剩余次数:" + $vo.getTims();
                    if ($str != this.lastTmStr) {
                        LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_TIME.skinName, $str, 14, TextAlign.LEFT);
                        this.lastTmStr = $str;
                    }
                }
                else {
                    UiDraw.clearUI(this.S_TIME);
                }
            }
        };
        PbossLeftListRender.prototype.loadIcon = function ($bossavatar) {
            var _this = this;
            // var $vo: PersonBossVo = <PersonBossVo>this.itdata.data;
            // var obj: any = TableData.getInstance().getData(TableData.tb_creature_template, $vo.tabbossinfo.bossEntry)
            IconManager.getInstance().getIcon(getRoleIconUrl($bossavatar), function ($img) {
                var rec = _this.uiAtlas.getRec(_this.S_ICON.skinName);
                _this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                UiDraw.cxtDrawImg(_this.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight), UIData.publicUi);
                _this.uiAtlas.ctx.drawImage($img, 3, 3, rec.pixelWitdh - 6, rec.pixelHeight - 6);
                TextureManager.getInstance().updateTexture(_this.uiAtlas.texture, rec.pixelX, rec.pixelY, _this.uiAtlas.ctx);
            });
            // this.drawKillIcon();
        };
        // private drawKillIcon(): void {
        //     if (this.lastState == 1) {
        //         UiDraw.SharedDrawImg(this.uiAtlas, PbossLeftListRender.baseAtlas, this.S_KILL_TIP.skinName, "U_KILL_TITTLE");
        //     } else {
        //         this.uiAtlas.clearCtxTextureBySkilname(this.S_KILL_TIP.skinName);
        //     }
        // }
        PbossLeftListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                TimeUtil.removeFrameTick(this.upDataFun);
                TimeUtil.addFrameTick(this.upDataFun);
                this.lastTmStr = "";
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        PbossLeftListRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.S_BG.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_ICON.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_NAME.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_LEVEL.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.S_TIME.skinName);
            this.Redpoint.preHide();
        };
        PbossLeftListRender.prototype.butClik = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                // var $vo: PersonBossVo = <PersonBossVo>this.itdata.data;
                // if (!$vo.openstate) {
                //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "等级不够，请多多练练再来", 99)
                // } else {
                this.setSelect();
                // }
            }
        };
        return PbossLeftListRender;
    }(SListItem));
    sboss.PbossLeftListRender = PbossLeftListRender;
    var PbossLeftList = /** @class */ (function (_super) {
        __extends(PbossLeftList, _super);
        function PbossLeftList() {
            var _this = _super.call(this) || this;
            _this.left = 325;
            _this.top = 149;
            return _this;
        }
        PbossLeftList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        PbossLeftList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, PbossLeftListRender, 225, 87 * 5, 225, 87, 5, 256, 1024, 1, 7, 1);
        };
        PbossLeftList.prototype.resetData = function () {
            var $tbDataArr = sboss.SbossModel.getInstance().getPersonBossItemData();
            var nodeList = RedPointManager.getInstance().getNodeByID(119).children;
            for (var i = 0; i < $tbDataArr.length; i++) {
                nodeList[i].data = $tbDataArr[i].data;
                $tbDataArr[i].data.node = nodeList[i];
            }
            this.refreshData($tbDataArr);
        };
        PbossLeftList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
            // var idx = SbossModel.getInstance().getMaxIndex();
            var idx = this.getCurrentSelectIndex();
            this.scrollIdx(idx);
            this.setSelectIndex(idx);
        };
        PbossLeftList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return PbossLeftList;
    }(SList));
    sboss.PbossLeftList = PbossLeftList;
    var PersonBossPanel = /** @class */ (function (_super) {
        __extends(PersonBossPanel, _super);
        function PersonBossPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
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
            _this._frameFun = function (t) { _this.upTime(t); };
            return _this;
        }
        PersonBossPanel.prototype.setRender = function ($uiAtlas, $win) {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._winRender = $win;
            this.loadConfigCom();
        };
        PersonBossPanel.prototype.upTime = function (t) {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
                return;
            }
            if (this.selectVo && this.selectVo.openstate) {
                var $str = this.selectVo.getTime();
                if ($str != "") {
                    $str = ColorType.Redd92200 + $str + ColorType.Brown7a2f21 + "恢复挑战次数";
                }
                if ($str != this.lastCdStr) {
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_cd_label.skinName, $str, 14, TextAlign.CENTER);
                    this.lastCdStr = $str;
                }
            }
            else {
                //清空
                UiDraw.clearUI(this.a_cd_label);
            }
        };
        PersonBossPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.pbossleftList.show();
            TimeUtil.addFrameTick(this._frameFun);
        };
        PersonBossPanel.prototype.hide = function () {
            this.pbossleftList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        PersonBossPanel.prototype.butClik = function (evt) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.e_tiaozhan:
                    UIManager.popClikNameFun("e_tiaozhan");
                    this.tiaozhanBoss();
                    break;
                case this.e_leftbtn:
                    this._curpage = Math.max(1, --this._curpage);
                    this.drawReward();
                    this.setPage();
                    break;
                case this.e_rightbtn:
                    this._curpage = Math.min(this._maxpage, ++this._curpage);
                    this.drawReward();
                    this.setPage();
                    break;
                case this.e_selbtn:
                    // this.t_selbtn.selected = !this.t_selbtn.selected;
                    GameData.configData.setopen_prompting_pboss(this.selectVo.tabbossinfo.id - 1, this.e_selbtn.selected);
                    break;
                default:
                    break;
            }
        };
        // private getbuffvalue($num:number):number{
        //     var tabary:Array<tb.Tb_private_boss_buff>= tb.Tb_private_boss_buff.get_Tb_private_boss_buff();
        //     for (var index = 0; index < tabary.length; index++) {
        //         var element = tabary[index];
        //         //console.log("---$num---",$num);
        //         if($num >= element.force_range_left && $num <= element.force_range_right){
        //             var tab:any = TableData.getInstance().getData(TableData.tb_buff_effect, element.buffeffect_id);
        //             if(tab){
        //                 return tab.value;
        //             }else{
        //                 return 0;
        //             }
        //         }   
        //     }
        //     return 0;
        // }
        PersonBossPanel.prototype.tiaozhanBoss = function () {
            var _this = this;
            if (this.selectVo && this.selectVo.openstate) {
                if (this.selectVo.hasTims() > 0) {
                    //战斗力提示
                    if (this.selectVo.tabbossinfo.force > GuidData.player.getForce()) {
                        // var aa = Math.floor((GuidData.player.getForce() / this.selectVo.tabbossinfo.force) * 100);
                        // var bb = this.getbuffvalue(aa);
                        // var $str:string = "";
                        // if(bb < 0){
                        //     $str = "该BOSS属性会大幅增加"+Math.abs(bb);
                        // }else{
                        //     $str = "该BOSS增加属性0";
                        // }
                        AlertUtil.show(ColorType.Brown7a2f21 + "当前您的战斗力" + ColorType.colorcd2000 + GuidData.player.getForce()
                            + ColorType.Brown7a2f21 + "低于BOSS战斗力" + this.selectVo.tabbossinfo.force + "\n挑战会受到影响，该BOSS属性会大幅增加\n是否进行挑战？", "提示", function (a) {
                            if (a == 1) {
                                NetManager.getInstance().protocolos.enter_private_boss(_this.selectVo.tabbossinfo.id);
                            }
                        }, 2, ["前往挑战", "取消"]);
                    }
                    else {
                        NetManager.getInstance().protocolos.enter_private_boss(this.selectVo.tabbossinfo.id);
                    }
                }
                else {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "挑战次数不足", 99);
                }
            }
        };
        PersonBossPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addUIList(["e_reward_r", "e_reward_c", "e_reward_l"], this._bottomRender);
            this.addUIList(["e_rewardtitle"], this._midRender);
            this.e_leftbtn = this.addEvntButUp("e_leftbtn", this._midRender);
            this.e_rightbtn = this.addEvntButUp("e_rightbtn", this._midRender);
            this.unlockAry = new Array;
            this.unlockAry.push(this._bottomRender.getComponent("e_right_has_bg0"));
            this.unlockAry.push(this._midRender.getComponent("e_openinfo"));
            this.e_tiaozhan = this.addEvntButUp("e_tiaozhan", this._topRender);
            this.a_cd_label = this.addChild(this._bottomRender.getComponent("e_cd_label"));
            this.e_selbtn = this.addEvntBut("e_selbtn", this._topRender);
            this.btnAry = new Array;
            this.btnAry.push(this.e_tiaozhan);
            this.btnAry.push(this.a_cd_label);
            this.btnAry.push(this._midRender.getComponent("e_info"));
            this.btnAry.push(this.e_selbtn);
            //this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.addChild(this._bottomRender.getComponent("e_boss_bg"));
            this.addChild(this._bottomRender.getComponent("a_list_bg"));
            this.a_list_pos = this.addChild(this._bottomRender.getComponent("a_list_pos"));
            this.addChild(this._midRender.getComponent("a_boss_name_bg"));
            this.addChild(this._midRender.getComponent("e_forcebg"));
            this.a_boss_name = this.addChild(this._topRender.getComponent("a_boss_name"));
            this.e_force = this.addChild(this._topRender.getComponent("e_force"));
            this.rewardIconItem = new Array();
            for (var i = 0; i < 6; i++) {
                var ui = this.addChild(this._midRender.getComponent("e_reward" + i));
                this.rewardIconItem.push(ui);
            }
            this.initList();
            this.addBossChar();
        };
        PersonBossPanel.prototype.selectMeshBossByVo = function (vo) {
            this.selectVo = vo;
            var $tb_Vo = tb.TB_creature_template.get_TB_creature_template(vo.tabbossinfo.bossEntry);
            this.bossChar.setAvatar($tb_Vo.avatar);
            var $bossNameStr = "";
            if ($tb_Vo.name.length <= 3) {
                $bossNameStr += "\n";
            }
            for (var i = 0; i < $tb_Vo.name.length; i++) {
                $bossNameStr += $tb_Vo.name.substr(i, 1);
                $bossNameStr += "\n";
            }
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.e_force.skinName, Snum(vo.tabbossinfo.force), ArtFont.num56);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_boss_name.skinName, ColorType.colorfef3d7 + $bossNameStr, 16, TextAlign.LEFT);
            this._curpage = 1;
            this._maxpage = Math.ceil(vo.tabbossinfo.show.length / 6);
            this.drawReward();
            this.setPage();
            if (!vo.openstate) {
                this.setUiListVisibleByItem(this.unlockAry, true);
                this.setUiListVisibleByItem(this.btnAry, false);
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.unlockAry[1].skinName, ColorType.Brown7a2f21 + vo.tabbossinfo.permitLevel + "级解锁BOSS", 16, TextAlign.CENTER);
            }
            else {
                this.setUiListVisibleByItem(this.unlockAry, false);
                this.setUiListVisibleByItem(this.btnAry, true);
            }
            this.e_selbtn.selected = GameData.configData.getopen_prompting_pboss(vo.tabbossinfo.id - 1);
        };
        PersonBossPanel.prototype.drawReward = function () {
            var idx = (this._curpage - 1) * 6;
            for (var i = idx; i < idx + 6; i++) {
                if (i < this.selectVo.tabbossinfo.show.length) {
                    this.setUiListVisibleByItem([this.rewardIconItem[i % 6]], true);
                    IconManager.getInstance().drawItemIcon60(this.rewardIconItem[i % 6], this.selectVo.tabbossinfo.show[i]);
                }
                else {
                    this.setUiListVisibleByItem([this.rewardIconItem[i % 6]], false);
                }
            }
        };
        PersonBossPanel.prototype.setPage = function () {
            if (this._curpage == this._maxpage && this._maxpage == 1) {
                this.setUiListVisibleByItem([this.e_leftbtn, this.e_rightbtn], false);
            }
            else if (this._curpage < this._maxpage && this._curpage == 1) {
                this.setUiListVisibleByItem([this.e_leftbtn], false);
                this.setUiListVisibleByItem([this.e_rightbtn], true);
            }
            else if (this._curpage == this._maxpage && this._curpage != 1) {
                this.setUiListVisibleByItem([this.e_leftbtn], true);
                this.setUiListVisibleByItem([this.e_rightbtn], false);
            }
            else {
                this.setUiListVisibleByItem([this.e_leftbtn, this.e_rightbtn], true);
            }
        };
        PersonBossPanel.prototype.refrishListData = function () {
            this.pbossleftList.resetData();
        };
        PersonBossPanel.prototype.addBossChar = function () {
            this.bossChar = new MonsterUIChar();
            this._bottomRender.addModel(this.bossChar);
        };
        PersonBossPanel.prototype.initList = function () {
            this.pbossleftList = new PbossLeftList;
            this.pbossleftList.init(this._midRender.uiAtlas);
        };
        PersonBossPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.pbossleftList) {
                this.pbossleftList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x + 3;
                this.pbossleftList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y + 5;
            }
            if (this.bossChar) {
                this.bossChar.resize();
                this.bossChar.scale = 1.8 * UIData.Scale;
                this.bossChar.x = -60 * UIData.Scale;
                this.bossChar.y = -30 * UIData.Scale;
            }
        };
        return PersonBossPanel;
    }(UIConatiner));
    sboss.PersonBossPanel = PersonBossPanel;
})(sboss || (sboss = {}));
//# sourceMappingURL=PersonBossPanel.js.map