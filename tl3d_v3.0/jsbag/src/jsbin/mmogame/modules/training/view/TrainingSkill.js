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
var training;
(function (training) {
    var SkillItemCell = /** @class */ (function () {
        function SkillItemCell() {
            this._selected = false;
        }
        Object.defineProperty(SkillItemCell.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                if (this._selected == val) {
                    return;
                }
                this._selected = val;
                this.drawUi();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillItemCell.prototype, "redShow", {
            get: function () {
                if (!this.redPoint) {
                    return false;
                }
                return this.redPoint.show;
            },
            enumerable: true,
            configurable: true
        });
        SkillItemCell.prototype.drawUi = function () {
            var $rec = this.skillui.uiRender.uiAtlas.getRec(this.skillui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            //252 315
            var levstr = "未解锁";
            var recstr = "Lineh" + this.data.baskData.line;
            if (this.data.lev > 0) {
                levstr = "LV" + this.data.lev;
                recstr = "Line" + this.data.baskData.line;
            }
            var imgUseRect = this.skillui.uiRender.uiAtlas.getRec(recstr);
            ctx.drawImage(this.skillui.uiRender.uiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 3, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
            var imgUseRect1 = this.skillui.uiRender.uiAtlas.getRec("Levbg");
            ctx.drawImage(this.skillui.uiRender.uiAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 50, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, levstr, 13, 25, 51, TextAlign.CENTER, ColorType.Whitefff4d6);
            if (this._selected) {
                UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(1, 4, 44, 44), UIData.publicUi);
            }
            // UiDraw.cxtDrawImg(ctx, PuiData.A_JIANTOU, new Rectangle(25, 0, 26, 33), UIData.publicUi);
            this.skillui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        SkillItemCell.prototype.refresh = function () {
            if (!this.data) {
                return;
            }
            var lev = GuidData.player.getPassiveSkillLev(this.data.id);
            if (lev == this.data.lev) {
                return;
            }
            this.data.lev = lev;
            if (this.data.lev > 0) {
                this.data.levData = tb.TB_skill_uplevel.get_TB_skill_uplevel(this.data.skillbaseData.uplevel_id[0] + this.data.lev - 1);
            }
            this.drawUi();
            if (this._selected) {
                this.parent.setSel(this);
            }
        };
        SkillItemCell.prototype.initRedpoint = function ($id, $redPointRender) {
            var pnode = RedPointManager.getInstance().getNodeByID(126);
            if (pnode.children[$id]) {
                var red = $redPointRender.getRedPointUI(this.parent, 0, new Vector2D(this.skillui.x + this.skillui.width - 8, this.skillui.y), "style1");
                pnode.children[$id].bindUI(red);
                this.redPoint = pnode.children[$id];
            }
        };
        return SkillItemCell;
    }());
    training.SkillItemCell = SkillItemCell;
    var SkillItemData = /** @class */ (function () {
        function SkillItemData() {
        }
        return SkillItemData;
    }());
    training.SkillItemData = SkillItemData;
    var TrainingSkill = /** @class */ (function (_super) {
        __extends(TrainingSkill, _super);
        function TrainingSkill() {
            var _this = _super.call(this) || this;
            _this._canclick = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            return _this;
        }
        TrainingSkill.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
        };
        TrainingSkill.prototype.initUiAtlas = function ($uiAtlas, $winrender) {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._winRender = $winrender;
            this.initView();
        };
        TrainingSkill.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this._cnew_right_bg_top = this._winRender.getComponent("cnew_right_bg_top");
            this.setSizeForPanelUiCopy(this._cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            this._cnew_right_bg_bottom = this._winRender.getComponent("cnew_right_bg_bottom");
            this.setSizeForPanelUiCopy(this._cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);
            this._winRender.applyObjData();
            var tabary = tb.TB_adventure_skill_base.get_TB_quest_adventure_base();
            this.skilllist = new Array;
            for (var i = 0; i < 10; i++) {
                var cell = new SkillItemCell();
                cell.parent = this;
                cell.skillui = this.addChild(renderLevel.getComponent("b_skill" + i));
                cell.skillui.data = cell;
                cell.skillui.addEventListener(InteractiveEvent.Up, this.onClick, this);
                var vo = new SkillItemData();
                vo.id = tabary[i].id;
                vo.baskData = tabary[i];
                vo.skillbaseData = tb.TB_skill_base.get_TB_skill_base(vo.id);
                cell.initRedpoint(i, this._redPointRender);
                cell.data = vo;
                this.skilllist.push(cell);
            }
            var ui = this.parent.loadBigPicByUrl("ui/load/training/trainingskillbg.jpg");
            this.parent.setSizeForPanelUiCopy(ui, "ccav", this._baseRender);
            this.initSelSkilPanel();
            this.setSel(this.skilllist[0]);
        };
        TrainingSkill.prototype.onClick = function ($e) {
            if ($e.target.data.data) {
                this.setSel($e.target.data);
            }
        };
        TrainingSkill.prototype.showSkillUpEff = function () {
            var _this = this;
            //console.log("up skill lev");
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ui_jn"), 4, 4, function ($ui) {
                    _this.upLevEff = $ui;
                    _this.upLevEff.x = _this.b_skillicon.x - 30;
                    _this.upLevEff.y = _this.b_skillicon.y - 30;
                    //this.upLevEff.width = this.upLevEff.baseRec.width * 0.8;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    _this.upLevEff.speed = 1;
                    _this.upLevEff.playOne(_this);
                });
            }
            if (this.upLevEff) {
                this.upLevEff.playOne(this);
            }
        };
        TrainingSkill.prototype.initSelSkilPanel = function () {
            this.addUIList(["b_titlebg", "b_titlebg1"], this._bgRender);
            this.b_skillicon = this.addChild(this._baseRender.getComponent("b_skillicon"));
            this.b_skillname = this.addChild(this._baseRender.getComponent("b_skillname"));
            this.b_skilllev = this.addChild(this._baseRender.getComponent("b_skilllev"));
            var b_title = this.addChild(this._baseRender.getComponent("b_title"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, b_title.skinName, "效果说明", 16, TextAlign.CENTER, ColorType.colorb96d49);
            var b_title1 = this.addChild(this._baseRender.getComponent("b_title1"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, b_title1.skinName, "升级条件", 16, TextAlign.CENTER, ColorType.colorb96d49);
            this.b_info = this.addChild(this._topRender.getComponent("b_info"));
            this.b_force = this.addChild(this._topRender.getComponent("b_force"));
            this.b_info1 = this.addChild(this._topRender.getComponent("b_info1"));
            this.b_force1 = this.addChild(this._topRender.getComponent("b_force1"));
            this.b_cost0 = this.addChild(this._topRender.getComponent("b_cost0"));
            this.b_cost1 = this.addChild(this._topRender.getComponent("b_cost1"));
            this.b_btninfo = this._topRender.getComponent("b_btninfo");
            this.uplevbtn = this._topRender.getComponent("b_uplevbtn");
            this.uplevbtn.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.selRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.uplevbtn.x + this.uplevbtn.width, this.uplevbtn.y));
        };
        TrainingSkill.prototype.resize = function () {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
        };
        TrainingSkill.prototype.refreshLev = function () {
            for (var i = 0; i < this.skilllist.length; i++) {
                this.skilllist[i].refresh();
            }
        };
        TrainingSkill.prototype.setSel = function ($item) {
            for (var i = 0; i < this.skilllist.length; i++) {
                if (this.skilllist[i] == $item) {
                    $item.selected = true;
                }
                else {
                    this.skilllist[i].selected = false;
                }
            }
            this.drawSelSkill($item); //, $item.redShow
        };
        TrainingSkill.prototype.drawSelSkill = function ($vo) {
            this._curCell = $vo;
            var strlev = ColorType.colorce0a00 + "未解锁";
            if ($vo.data.lev > 0) {
                strlev = ColorType.Brown7a2f21 + "等级：" + ColorType.colorff7200 + $vo.data.lev;
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_skilllev.skinName, strlev, 16, TextAlign.LEFT, ColorType.colorb96d49);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_skillname.skinName, $vo.data.skillbaseData.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            IconManager.getInstance().drawCircleIcon(this.b_skillicon, 2, $vo.data.skillbaseData.id);
            this._needcost = $vo.data.baskData.cost[0];
            var cureff = ColorType.Brown7a2f21 + "当前效果：" + ColorType.Green2ca937 + "待激活";
            var curforce = ColorType.Brown7a2f21 + "战力:" + ColorType.color4392ff + "0";
            if ($vo.data.lev > 0) {
                this._needcost = $vo.data.levData.uplevel_cost[0];
                cureff = ColorType.Brown7a2f21 + "当前效果：" + ColorType.Green2ca937 + tb.SkillDataVo.getSkillDesc($vo.data.id, $vo.data.lev);
                curforce = ColorType.Brown7a2f21 + "战力:" + ColorType.color4392ff + $vo.data.levData.fight_value;
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_info.skinName, cureff, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_force.skinName, curforce, 14, TextAlign.LEFT);
            var nextlevData = TableData.getInstance().getData(TableData.tb_skill_uplevel, $vo.data.skillbaseData.uplevel_id[0] + $vo.data.lev);
            if ($vo.data.lev > ($vo.data.skillbaseData.uplevel_id[1] - $vo.data.skillbaseData.uplevel_id[0])) {
                nextlevData = null;
            }
            var nexeff = ColorType.Brown7a2f21 + "下级效果：" + ColorType.Green2ca937 + "已满级";
            var nexforce = "";
            if (nextlevData) {
                nexeff = ColorType.Brown7a2f21 + "下级效果：" + ColorType.Green2ca937 + tb.SkillDataVo.getSkillDesc($vo.data.id, $vo.data.lev + 1);
                nexforce = ColorType.Brown7a2f21 + "战力:" + ColorType.color4392ff + nextlevData.fight_value;
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_info1.skinName, nexeff, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_force1.skinName, nexforce, 14, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_cost0.skinName, "需求" + getResName(this._needcost[0]) + ": " + this._needcost[1], 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.updataRes();
            this.setUiListVisibleByItem([this.b_btninfo, this.uplevbtn], false);
            if (nextlevData) {
                if ($vo.data.baskData.prev_limit[0]) {
                    if (GuidData.player.getPassiveSkillLev($vo.data.baskData.prev_limit[0][0]) < $vo.data.baskData.prev_limit[0][1]) {
                        //多少级解锁
                        this.setUiListVisibleByItem([this.b_btninfo], true);
                        var basetab = tb.TB_skill_base.get_TB_skill_base($vo.data.baskData.prev_limit[0][0]);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_btninfo.skinName, basetab.name + "达到LV" + $vo.data.baskData.prev_limit[0][1] + "可升级", 16, TextAlign.CENTER, ColorType.colorce0a00);
                    }
                    else {
                        //按钮
                        this.setUiListVisibleByItem([this.uplevbtn], true);
                    }
                }
                else {
                    //按钮
                    this.setUiListVisibleByItem([this.uplevbtn], true);
                }
            }
            else {
                //已满级
                this.setUiListVisibleByItem([this.b_btninfo], true);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_btninfo.skinName, "已满级", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            this.refreshredpoint();
        };
        TrainingSkill.prototype.refreshredpoint = function () {
            if (this._curCell.redShow) {
                this.selRedPoint.preShow();
            }
            else {
                this.selRedPoint.preHide();
            }
        };
        TrainingSkill.prototype.updataRes = function () {
            var str = ColorType.colorce0a00;
            this._canuplev = false;
            if (GuidData.player.getResType(this._needcost[0]) >= this._needcost[1]) {
                str = ColorType.Green2ca937;
                this._canuplev = true;
            }
            str += GuidData.player.getResTypeStr(this._needcost[0]);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_cost1.skinName, ColorType.Brown7a2f21 + "拥有" + getResName(this._needcost[0]) + ": " + str, 16, TextAlign.LEFT);
        };
        TrainingSkill.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.setUiListVisibleByItem([this._cnew_right_bg_top, this._cnew_right_bg_bottom], true);
            this.parent.addBigPic();
            if (this._baseRender.uiAtlas) {
                this.refreshLev();
            }
            this.resize();
        };
        TrainingSkill.prototype.hide = function () {
            this.setUiListVisibleByItem([this._cnew_right_bg_top, this._cnew_right_bg_bottom], false);
            this.parent.removeBigPic();
            UIManager.getInstance().removeUIContainer(this);
        };
        TrainingSkill.prototype.butClik = function (evt) {
            var _this = this;
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.uplevbtn:
                    if (this._canclick) {
                        this._canclick = false;
                        TimeUtil.addTimeOut(500, function () {
                            _this._canclick = true;
                        });
                        if (this._canuplev) {
                            NetManager.getInstance().protocolos.raise_adventurespell(this._curCell.data.id);
                        }
                        else {
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = this._needcost[0];
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                    }
                    break;
                // case this.a_arrowright:
                //     this.curpage++;
                //     break;
                default:
                    break;
            }
        };
        return TrainingSkill;
    }(UIVirtualContainer));
    training.TrainingSkill = TrainingSkill;
})(training || (training = {}));
//# sourceMappingURL=TrainingSkill.js.map