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
var mountui;
(function (mountui) {
    var NewMountUiPanel = /** @class */ (function (_super) {
        __extends(NewMountUiPanel, _super);
        function NewMountUiPanel() {
            var _this = _super.call(this) || this;
            _this._lastMouseX = 0;
            _this._lastRoleRotatioinY = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._publicbguiRender = new UIRenderComponent;
            _this.addRender(_this._publicbguiRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        NewMountUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            this.mountRoleSprite.destory();
            this.mountRoleSprite = null;
            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }
            if (this.mountUpOrder) {
                this.mountUpOrder.dispose();
                this.mountUpOrder = null;
            }
            if (this.mountUpLev) {
                this.mountUpLev.dispose();
                this.mountUpLev = null;
            }
            if (this.mountSkill) {
                this.mountSkill.dispose();
                this.mountSkill = null;
            }
            if (this.mountHuanhua) {
                this.mountHuanhua.dispose();
                this.mountHuanhua = null;
            }
            _super.prototype.dispose.call(this);
        };
        NewMountUiPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/mountui/newmountui.xml", "ui/uidata/mountui/newmountui.png", function () { _this.loadConfigCom(); }, "ui/uidata/mountui/mountpc.png");
            // });
        };
        NewMountUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._baseRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        NewMountUiPanel.prototype.initData = function () {
            this.mountRoleSprite = new Person2DChar();
            this._roleRender.addModel(this.mountRoleSprite);
            this.a_ro_bg = this.addEvntBut("a_ro_bg", this._roleRender);
            this.SkillAry = new Array;
            this.SkillUnlockAry = new Array;
            for (var i = 0; i < 4; i++) {
                this.SkillAry.push(this._roleRender.getComponent("a_skill" + i));
                this.SkillUnlockAry.push(this.addChild(this._topRender.getComponent("a_skillunlock" + i)));
            }
            this.TabAry = new Array;
            for (var i = 0; i < 3; i++) {
                var a = this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = i + SharedDef.MODULE_MOUNT_UPGRADE;
                a.addEventListener(InteractiveEvent.Down, this.click, this);
                this.TabAry.push(a);
                this._redPointRender.getRedPointUI(this, 28 + i * 2, new Vector2D(a.x + a.width - 5, a.y));
            }
            this.wingStarAry = new Array;
            for (var i = 0; i < 10; i++) {
                var star = this.addChild(this._baseRender.getComponent("t_star" + i));
                star.goToAndStop(1);
                this.wingStarAry.push(star);
            }
            this.wingExPer = this._baseRender.getComponent("t_pre");
            this.wingExPer.uvScale = 0.01;
            this.t_cursor = this._baseRender.getComponent("t_cursor");
            this.wingExp = this._topRender.getComponent("t_exp");
            this.a_name = this.addChild(this._topRender.getComponent("a_name"));
            this.a_force = this.addChild(this._topRender.getComponent("a_force"));
            this.AdvanceUIAry = new Array;
            this.AdvanceUIAry.push(this.wingExPer);
            this.AdvanceUIAry.push(this.t_cursor);
            this.AdvanceUIAry.push(this.wingExp);
            this.AdvanceUIAry.push(this._roleRender.getComponent("t_bg4"));
            this.AdvanceUIAry.push(this._roleRender.getComponent("a_forcebg"));
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);
            this.SkillRightBgAry = new Array;
            this.OtherRightBgAry = new Array;
            var cnew_bg_yellow = this.winmidRender.getComponent("cnew_bg_yellow");
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._roleRender);
            this.SkillRightBgAry.push(cnew_bg_yellow);
            var cnew_right_bg_top = this.winmidRender.getComponent("cnew_right_bg_top");
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._roleRender);
            this.OtherRightBgAry.push(cnew_right_bg_top);
            var cnew_right_bg_bottom = this.winmidRender.getComponent("cnew_right_bg_bottom");
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._roleRender);
            this.OtherRightBgAry.push(cnew_right_bg_bottom);
            this.winmidRender.applyObjData();
            this.addUIList(["a_titlt", "a_line1", "t_mountshadow", "a_namebg"], this._roleRender);
            this.addUIList(["t_bg"], this._bgRender);
            this.a_huanhuaok = this._roleRender.getComponent("a_huanhuaok");
            this.UnlockUIAry = new Array;
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            this.t_unlock0.data = "请先激活坐骑";
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._bgRender);
            this.t_unlock1.data = "请先激活坐骑";
            this.UnlockUIAry.push(this.t_unlock1);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._bgRender);
            this.t_unlock2.data = "请先激活坐骑";
            this.UnlockUIAry.push(this.t_unlock2);
            // this.t_unlock3 = this.addEvntBut("t_unlock3", this._bgRender);
            // this.t_unlock3.data = "请先激活坐骑";
            // this.UnlockUIAry.push(this.t_unlock3);
        };
        NewMountUiPanel.prototype.A_left_bg_MouseDown = function (evt) {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.mountRoleSprite.rotationY;
            // //console.log(this._lastMouseX)
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        NewMountUiPanel.prototype.A_left_bg_MouseMove = function (evt) {
            this.mountRoleSprite.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        };
        NewMountUiPanel.prototype.A_left_bg_MouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        NewMountUiPanel.prototype.rotationRole = function () {
            this.mountRoleSprite.rotationY -= 0.5;
        };
        NewMountUiPanel.prototype.setAvatar = function () {
            var tabvo;
            var orderlev = GuidData.grow.getMountLevel();
            if (orderlev == 0) {
                orderlev = 1;
            }
            if (GuidData.player.getMountHuanhua() != 0) {
                //有幻化
                tabvo = tb.TB_mount_illusion_vo.get_TB_mount_illusion_vo(GuidData.player.getMountHuanhua());
                this.a_huanhuaok;
            }
            else {
                //无幻化
                tabvo = tb.TB_mount_base_vo.get_TB_mount_base_vo(orderlev);
            }
            this.mountRoleSprite.setAvatar(tabvo.mountID);
            this.mountRoleSprite.rotationY = 45;
            LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, this.a_name.skinName, tabvo.name + "     " + getChiNum(orderlev) + "阶", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            // if ($value == 6) {
            //     this._b_name_level.Invisible();
            // } else {
            //     this._b_name_level.goToAndStop($value);
            // }
        };
        //幻化分页时显示的模型
        NewMountUiPanel.prototype.setHuanHuaAvatar = function ($id, $name) {
            this.mountRoleSprite.setAvatar($id);
            this.mountRoleSprite.rotationY = 45;
            LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, this.a_name.skinName, $name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        };
        NewMountUiPanel.prototype.resizeRole = function () {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 3 * UIData.Scale;
                this.mountRoleSprite.rotationY = 45;
                this.mountRoleSprite.x = 100 * UIData.Scale;
                this.mountRoleSprite.y = -75 * UIData.Scale;
            }
        };
        NewMountUiPanel.prototype.resize = function () {
            this.resizeRole();
            _super.prototype.resize.call(this);
        };
        NewMountUiPanel.prototype.refreshOpenLev = function () {
            if (!this.activation) {
                var tabsysary = new Array;
                //读表，判断解锁情况
                for (var j = 0; j < SharedDef.MODULE_MOUNT_ILLUSION; j++) {
                    var $tb_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_MOUNT * 10 + j + 1));
                    tabsysary.push($tb_system_base);
                }
                for (var i = 0; i < tabsysary.length; i++) {
                    if (tabsysary[i].level <= GuidData.player.getLevel()) {
                        this.setUiListVisibleByItem([this.TabAry[i]], true);
                        this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                    }
                    else {
                        this.setUiListVisibleByItem([this.TabAry[i]], false);
                        this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
                        this.UnlockUIAry[i].data = "人物等级达到" + tabsysary[i].level + "级后解锁";
                    }
                }
            }
            else {
                this.setUiListVisibleByItem(this.TabAry, false);
                this.setUiListVisibleByItem(this.UnlockUIAry, true);
            }
        };
        NewMountUiPanel.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.activation = GuidData.grow.getMountLevel() == 0;
            this.refreshOpenLev();
            this.setUiListVisibleByItem(this.AdvanceUIAry, !this.activation);
            this.setUiListVisibleByItem(this.wingStarAry, !this.activation);
            this.setUiListVisibleByItem(this.SkillAry, true);
            if (!this.activation) {
                //已激活
                if (this.unActivationUiPanel) {
                    this.unActivationUiPanel.hide();
                }
                this.selectedTab($data);
                this.refreshLevStar();
                //设置坐骑总战力
                this.setForce();
            }
            else {
                if (!this.unActivationUiPanel) {
                    this.unActivationUiPanel = new mountui.UnActivationUiPanel();
                    this.unActivationUiPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                }
                this.unActivationUiPanel.show();
                this.setUiListVisibleByItem(this.OtherRightBgAry, true);
                this.setUiListVisibleByItem(this.SkillRightBgAry, false);
            }
            //设置模型
            this.setAvatar();
            this.refreshSkill();
        };
        NewMountUiPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.unActivationUiPanel) {
                this.unActivationUiPanel.hide();
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        };
        NewMountUiPanel.prototype.refreshLevStar = function () {
            this.drawExp();
            //console.log("--阶数和星数--", this._lastlev, this._laststar, GuidData.grow.getMountLevel(), GuidData.grow.getMountStart());
            if (this._lastlev == GuidData.grow.getMountLevel() && this._laststar == GuidData.grow.getMountStart()) {
                //星数和阶数不变，只更新经验进度
            }
            else {
                this._lastlev = GuidData.grow.getMountLevel();
                this._laststar = GuidData.grow.getMountStart();
                for (var i = 0; i < this.wingStarAry.length; i++) {
                    if (this._laststar > i) {
                        this.wingStarAry[i].goToAndStop(0);
                    }
                    else {
                        this.wingStarAry[i].goToAndStop(1);
                    }
                }
            }
        };
        NewMountUiPanel.prototype.showExpEff = function () {
            var _this = this;
            //console.log("up skill lev");
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_cb"), 3, 4, function ($ui) {
                    _this.expEff = $ui;
                    _this.expEff.x = _this.wingExPer.x - 70;
                    _this.expEff.y = _this.wingExPer.y - 55;
                    _this.expEff.width = _this.expEff.baseRec.width * 1.1;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    _this.expEff.speed = 5;
                    _this.expEff.playOne(_this);
                });
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        };
        NewMountUiPanel.prototype.drawExp = function () {
            var $toScale;
            var $str;
            var finalary = tb.TB_mount_train_vo.getTabelItem();
            var $level = GuidData.grow.getMountLevel();
            var $star = GuidData.grow.getMountStart();
            if ($level == finalary[finalary.length - 1].level && $star == finalary[finalary.length - 1].star) {
                //满级
                $toScale = 1;
                $str = "已满级";
            }
            else {
                var $id = ($level - 1) * 11 + $star + 1;
                var targetData;
                if ($star == 10) {
                    targetData = finalary[$id - 2];
                    if (!targetData) {
                        return;
                    }
                    $toScale = 1;
                    $str = targetData.exp + "/" + targetData.exp;
                }
                else {
                    targetData = finalary[$id - 1];
                    if (!targetData) {
                        return;
                    }
                    //计算经验比
                    $toScale = GuidData.grow.getMountExp() / targetData.exp;
                    $str = GuidData.grow.getMountExp() + "/" + targetData.exp;
                }
            }
            if ($toScale > this.wingExPer.uvScale) {
                TweenMoveTo(this.wingExPer, 0.1, { uvScale: $toScale });
                TweenMoveTo(this.t_cursor, 0.1, { x: $toScale * 240 + 197 });
            }
            else {
                TweenMoveTo(this.wingExPer, 0.1, { uvScale: 1 });
                this.wingExPer.uvScale = 0;
                TweenMoveTo(this.wingExPer, 0.1, { uvScale: $toScale });
                TweenMoveTo(this.t_cursor, 0.1, { x: 437 });
                this.t_cursor.x = 197;
                TweenMoveTo(this.t_cursor, 0.1, { x: $toScale * 240 + 197 });
                //console.log("-$toScale--", $toScale);
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.wingExp.skinName, $str, 14, TextAlign.CENTER, ColorType.Whiteffffff, "", 0, 0, true);
        };
        NewMountUiPanel.prototype.refreshSkill = function () {
            var listitem = mountui.NewMountModel.getInstance().getSkillList();
            var listitemleng = listitem.length;
            if (listitemleng > 4) {
                listitemleng = 4;
            }
            for (var i = 0; i < listitemleng; i++) {
                var skilllev = 1;
                if (listitem[i].state == 2) {
                    LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, this.SkillUnlockAry[i].skinName, " " + listitem[i].lev + "阶\n开启", 14, TextAlign.LEFT, ColorType.Whiteffffff);
                }
                else {
                    skilllev = listitem[i].lev;
                    LabelTextFont.clearLabel(this._roleRender.uiAtlas, this.SkillUnlockAry[i].skinName);
                }
                IconManager.getInstance().drawMinSkillIcon(this.SkillAry[i], listitem[i].tab.id, listitem[i].state == 2, skilllev);
            }
        };
        NewMountUiPanel.prototype.setForce = function () {
            var strforce = GuidData.player.getMountForce();
            // if (GuidData.grow.getMountLevel() == 0) {
            //     strforce = "";
            // } else {
            //     strforce = Snum(GuidData.player.getMountForce());
            // }
            if (this._lastforce == strforce) {
                return;
            }
            this._lastforce = strforce;
            ArtFont.getInstance().writeFontToSkinName(this._roleRender.uiAtlas, this.a_force.skinName, Snum(this._lastforce), ArtFont.num56);
        };
        NewMountUiPanel.prototype.selectedTab = function ($value) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                }
                else {
                    this.TabAry[i].selected = false;
                }
            }
            //公共背景显隐逻辑
            this.setUiListVisibleByItem(this.OtherRightBgAry, $value != SharedDef.MODULE_MOUNT_SKILL);
            this.setUiListVisibleByItem(this.SkillRightBgAry, $value == SharedDef.MODULE_MOUNT_SKILL);
            this.showTabPage($value);
            this.hideTabPage($value);
        };
        NewMountUiPanel.prototype.showTabPage = function ($value) {
            switch ($value) {
                case SharedDef.MODULE_MOUNT_UPGRADE:
                    if (!this.mountUpOrder) {
                        this.mountUpOrder = new mountui.MountUpOrder();
                        this.mountUpOrder.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountUpOrder.parent = this;
                    }
                    this.mountUpOrder.show();
                    break;
                case SharedDef.MODULE_MOUNT_LEVEL:
                    if (!this.mountUpLev) {
                        this.mountUpLev = new mountui.MountUpLev();
                        this.mountUpLev.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountUpLev.parent = this;
                    }
                    this.mountUpLev.show();
                    break;
                case SharedDef.MODULE_MOUNT_SKILL:
                    if (!this.mountSkill) {
                        this.mountSkill = new mountui.MountSkill();
                        this.mountSkill.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountSkill.parent = this;
                    }
                    this.mountSkill.show();
                    break;
                case SharedDef.MODULE_MOUNT_ILLUSION:
                    if (!this.mountHuanhua) {
                        this.mountHuanhua = new mountui.MountHuanhua();
                        this.mountHuanhua.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountHuanhua.parent = this;
                    }
                    this.mountHuanhua.show();
                    break;
                default:
                    break;
            }
            //切换至幻化页面时。主页面的个别布局显隐逻辑
            var skillvisiable = false;
            if ($value == SharedDef.MODULE_MOUNT_UPGRADE) {
                skillvisiable = true;
            }
            if ($value == SharedDef.MODULE_MOUNT_ILLUSION) {
                this.setUiListVisibleByItem([this.a_huanhuaok], false);
            }
            else {
                this.setUiListVisibleByItem([this.a_huanhuaok], GuidData.player.getMountHuanhua() != 0);
            }
            this.setUiListVisibleByItem(this.AdvanceUIAry, skillvisiable);
            this.setUiListVisibleByItem([this.AdvanceUIAry[this.AdvanceUIAry.length - 1]], true);
            this.setUiListVisibleByItem(this.wingStarAry, skillvisiable);
            this.setUiListVisibleByItem(this.SkillUnlockAry, $value < 3);
            this.setUiListVisibleByItem(this.SkillAry, $value < 3);
        };
        NewMountUiPanel.prototype.hideTabPage = function ($value) {
            if ($value === void 0) { $value = -1; }
            switch ($value) {
                case SharedDef.MODULE_MOUNT_UPGRADE:
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
                case SharedDef.MODULE_MOUNT_LEVEL:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
                case SharedDef.MODULE_MOUNT_SKILL:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
                case SharedDef.MODULE_MOUNT_ILLUSION:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    break;
                default:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
            }
        };
        NewMountUiPanel.prototype.showflyword = function ($str) {
            if (this.wingExPer && this.wingExPer.parent) {
                var v21d = new Vector2D(this.wingExPer.parent.x + this.wingExPer.width, this.wingExPer.y);
                var v2d = UiTweenVo.getPosByPanel(v21d, { width: UIData.designWidth, height: UIData.designHeight });
                // var v2d: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(204, 473), { width: 960, height: 540 })
                v2d.x = v2d.x * UIData.Scale;
                v2d.y = v2d.y * UIData.Scale;
                msgtip.MsgTipManager.outStr(ColorType.Yellowedce7e + "坐骑经验+" + $str, msgtip.PopMsgVo.type8, v2d);
            }
        };
        NewMountUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_ro_bg:
                    this.A_left_bg_MouseDown(evt);
                    break;
                case this.w_close:
                    UIManager.popClikNameFun("w_close");
                    ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.HIDE_MOUNT_EVENT));
                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock0.data, 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock1.data, 99);
                    break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock2.data, 99);
                    break;
                // case this.t_unlock3:
                //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock3.data, 99);
                //     break;
                default:
                    break;
            }
        };
        NewMountUiPanel.prototype.click = function (evt) {
            this.selectedTab(evt.target.data);
        };
        return NewMountUiPanel;
    }(WindowUi));
    mountui.NewMountUiPanel = NewMountUiPanel;
})(mountui || (mountui = {}));
//# sourceMappingURL=NewMountUiPanel.js.map