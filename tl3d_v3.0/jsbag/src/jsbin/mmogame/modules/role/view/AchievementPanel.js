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
var role;
(function (role) {
    var AchievementPanel = /** @class */ (function (_super) {
        __extends(AchievementPanel, _super);
        function AchievementPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        AchievementPanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.achievementTabList) {
                this.achievementTabList.dispose();
                this.achievementTabList = null;
            }
            if (this.achievementList) {
                this.achievementList.dispose();
                this.achievementList = null;
            }
        };
        AchievementPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        AchievementPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.t_listindex0 = this.addChild(renderLevel.getComponent("t_listindex0"));
            this.t_listindex1 = this.addChild(renderLevel.getComponent("t_listindex1"));
            var bg = this.addChild(this._publicRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "coffeeBg", renderLevel);
            this._publicRender.applyObjData();
        };
        AchievementPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.achievementTabList) {
                this.achievementTabList.left = this.t_listindex0.parent.x / UIData.Scale + this.t_listindex0.x;
                this.achievementTabList.top = this.t_listindex0.parent.y / UIData.Scale + this.t_listindex0.y;
            }
            if (this.achievementList) {
                this.achievementList.left = this.t_listindex1.parent.x / UIData.Scale + this.t_listindex1.x;
                this.achievementList.top = this.t_listindex1.parent.y / UIData.Scale + this.t_listindex1.y;
            }
        };
        AchievementPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.achievementList) {
                this.achievementList = new AchievementList();
                this.achievementList.init(this._baseRender.uiAtlas);
            }
            if (!this.achievementTabList) {
                this.achievementTabList = new AchievementTabList();
                this.achievementTabList.init(this._baseRender.uiAtlas);
            }
            this.achievementTabList.show();
            this.resize();
        };
        AchievementPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.achievementTabList) {
                this.achievementTabList.hide();
            }
            if (this.achievementList) {
                this.achievementList.hide();
            }
        };
        return AchievementPanel;
    }(UIVirtualContainer));
    role.AchievementPanel = AchievementPanel;
    /**
     * TabList
     */
    var AchievementTabList = /** @class */ (function (_super) {
        __extends(AchievementTabList, _super);
        function AchievementTabList() {
            var _this = _super.call(this) || this;
            _this._type = -1;
            _this.left = 45;
            _this.top = 82;
            return _this;
        }
        AchievementTabList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        AchievementTabList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, AchievementTabRender, 167, 426, 0, 58, 7, 256, 1024, 1, 10);
        };
        /**
         * refreshData
         * 若不传参数，则代表领取完奖励的数据更新，维持当前_type
         */
        AchievementTabList.prototype.refreshDataByNewData = function ($type) {
            if ($type === void 0) { $type = -2; }
            if ($type != -2) {
                this._type = $type;
            }
            var aa = role.RoleModel.getInstance().getTabListByType(this._type);
            var $sListItemData = this.getData(aa);
            this.refreshData($sListItemData);
        };
        AchievementTabList.prototype.getData = function (aa) {
            var ary = new Array;
            for (var i = 0; i < aa.length; i++) {
                var item = new SListItemData;
                item.data = aa[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        AchievementTabList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData(-1);
            //分发第一条数据
            var aa1 = role.RoleModel.getInstance().getFirstList();
            var bb = new role.RoleUiEvent(role.RoleUiEvent.Achievement_VIEW_ITEM_EVENT);
            bb.data = aa1;
            ModuleEventManager.dispatchEvent(bb);
        };
        AchievementTabList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return AchievementTabList;
    }(SList));
    role.AchievementTabList = AchievementTabList;
    var AchievementTabRender = /** @class */ (function (_super) {
        __extends(AchievementTabRender, _super);
        function AchievementTabRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        AchievementTabRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Tab = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tab", 0, 0, 167, 58);
            $container.addChild(this.Tab);
        };
        Object.defineProperty(AchievementTabRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                this.applyrender();
            },
            enumerable: true,
            configurable: true
        });
        AchievementTabRender.prototype.draw = function (vo) {
            var $uiRectangle = this.uiAtlas.getRec(this.Tab.skinName);
            var ctx = UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);
            //二级页签的偏移量
            var posx = 0;
            var posy = 0;
            var flag = false;
            if (vo.state == 2) {
                posx = 7;
                posy = 4;
                flag = true;
            }
            if (flag) {
                //二级页签
                var selectedRect;
                //二级页签选中
                if (this.selected) {
                    selectedRect = this.parentTarget.baseAtlas.getRec("StypeBG2");
                }
                else {
                    selectedRect = this.parentTarget.baseAtlas.getRec("StypeBG1");
                }
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, selectedRect.pixelX, selectedRect.pixelY, selectedRect.pixelWitdh, selectedRect.pixelHeight, posx, posy, selectedRect.pixelWitdh, selectedRect.pixelHeight);
                // LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx,"aaa",16,66, 19,TextAlign.CENTER,ColorType.Brown7a2f21);
                var imgUseRect1 = this.parentTarget.baseAtlas.getRec(vo.name);
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 68, 21, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            else {
                //一级页签
                var imgUseRect = this.parentTarget.baseAtlas.getRec("TpeBG");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, posx, posy, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                // var $obj: any = TableData.getInstance().getData(TableData.tb_achieve_page, vo.);
                // LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx,"aaa",16,66, 19,TextAlign.CENTER,ColorType.Brown7a2f21);
                imgUseRect1 = this.parentTarget.baseAtlas.getRec(vo.name);
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 66, 19, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            if (!flag) {
                var imgUseRect2;
                if (vo.selecteds) {
                    imgUseRect2 = this.parentTarget.baseAtlas.getRec("UP");
                }
                else {
                    imgUseRect2 = this.parentTarget.baseAtlas.getRec("DOWN");
                }
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect2.pixelX, imgUseRect2.pixelY, imgUseRect2.pixelWitdh, imgUseRect2.pixelHeight, 128, 24, imgUseRect2.pixelWitdh, imgUseRect2.pixelHeight);
            }
            if (vo.isredpoint) {
                UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(143, posy, 17, 16), UIData.publicUi);
            }
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, ctx);
        };
        AchievementTabRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                this.draw(vo);
            }
        };
        AchievementTabRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.Tab.addEventListener(InteractiveEvent.Up, this.equClick, this);
                this.applyrender();
            }
            else {
                this.Tab.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        };
        AchievementTabRender.prototype.equClick = function () {
            //选中，事件派发
            var bb = new role.RoleUiEvent(role.RoleUiEvent.Achievement_SELECT_TAB_EVENT);
            bb.data = this.itdata;
            ModuleEventManager.dispatchEvent(bb);
            this.setSelect();
        };
        AchievementTabRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Tab);
        };
        return AchievementTabRender;
    }(SListItem));
    role.AchievementTabRender = AchievementTabRender;
    /**
     * RightList
     */
    var AchievementList = /** @class */ (function (_super) {
        __extends(AchievementList, _super);
        function AchievementList() {
            var _this = _super.call(this) || this;
            _this.left = 229;
            _this.top = 87;
            return _this;
        }
        AchievementList.prototype.init = function ($uiAtlas) {
            AchievementRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        AchievementList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, AchievementRender, 622, 422, 0, 91, 4, 512, 1024, 1, 7);
        };
        AchievementList.prototype.getData = function (aa) {
            var ary = new Array;
            for (var i = 0; i < aa.length; i++) {
                var item = new SListItemData;
                item.data = aa[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        AchievementList.prototype.show = function ($data) {
            //console.log("-$data--", $data);
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var $sListItemData = this.getData($data);
            this.refreshData($sListItemData);
        };
        AchievementList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return AchievementList;
    }(SList));
    role.AchievementList = AchievementList;
    var AchievementRender = /** @class */ (function (_super) {
        __extends(AchievementRender, _super);
        function AchievementRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        AchievementRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Bg = this.creatGrid9SUI($bgRender, AchievementRender.baseAtlas, "Bg", 0, 0, 622, 86, 15, 15);
            $container.addChild(this.Bg);
            this.Icon = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Icon", 8, 9, 68, 68);
            $container.addChild(this.Icon);
            this.Name = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Name", 93, 8, 125, 20);
            $container.addChild(this.Name);
            this.Info = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Info", 93, 30, 245, 20);
            $container.addChild(this.Info);
            this.Progress = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Progress", 92, 60, 239, 16);
            $container.addChild(this.Progress);
            this.Reward1 = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Reward1", 342, 9, 68, 68);
            $container.addChild(this.Reward1);
            this.Reward2 = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Reward2", 415, 9, 68, 68);
            $container.addChild(this.Reward2);
            this.Btn = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Btn", 501, 22, 105, 45);
            $container.addChild(this.Btn);
            this.Btn.addEventListener(InteractiveEvent.Up, this.butClik, this);
        };
        AchievementRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Bg.skinName, UIData.publicUi, PuiData.Slist_nselect);
            this.drawIcon();
            //name
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name.skinName, vo.data.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            // this.drawInfo();
            //成就说明
            var str = vo.data.info + "(" + vo.progress + "/" + vo.data.maxnum + ")";
            if (vo.hasReward) {
                str = ColorType.Green2ca937 + str;
            }
            else {
                str = ColorType.color9a683f + str;
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Info.skinName, str, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.drawProgress();
            if (vo.data.title && vo.data.title > 0) {
                //有奖励称号
                this.drawReward([0, 1], this.Reward1, true);
                this.Reward1.data = null;
                if (vo.data.reward.length > 0) {
                    IconManager.getInstance().drawItemIcon60(this.Reward2, vo.data.reward[0][0], vo.data.reward[0][1], vo.hasReward);
                }
            }
            else {
                for (var i = 0; i < vo.data.reward.length; i++) {
                    if (i) {
                        IconManager.getInstance().drawItemIcon60(this.Reward2, vo.data.reward[i][0], vo.data.reward[i][1], vo.hasReward);
                    }
                    else {
                        IconManager.getInstance().drawItemIcon60(this.Reward1, vo.data.reward[i][0], vo.data.reward[i][1], vo.hasReward);
                    }
                }
            }
            if (vo.data.reward.length == 1 && vo.data.title == 0) {
                UiDraw.clearUI(this.Reward2);
            }
            this.drawBtn();
        };
        AchievementRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        AchievementRender.prototype.drawBtn = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.Btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var btnrect;
            if (vo.hasReach) {
                if (vo.hasReward) {
                    btnrect = AchievementRender.baseAtlas.getRec("Ok");
                }
                else {
                    btnrect = AchievementRender.baseAtlas.getRec("Receive");
                }
            }
            else {
                btnrect = AchievementRender.baseAtlas.getRec("Go");
            }
            ctx.drawImage(AchievementRender.baseAtlas.useImg, btnrect.pixelX, btnrect.pixelY, btnrect.pixelWitdh, btnrect.pixelHeight, 0, 0, btnrect.pixelWitdh, btnrect.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        AchievementRender.prototype.drawReward = function ($ary, $ui, $istitle) {
            var _this = this;
            var vo = this.itdata.data;
            var url;
            if ($istitle) {
                url = "ui/load/tittle/icon" + $ary[0] + ".png";
            }
            else {
                url = GameData.getIconCopyUrl($ary[0]);
            }
            IconManager.getInstance().getIcon(url, function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
                //图标
                ctx.drawImage($img, 0, 0, 60, 60, 2, 2, 60, 60);
                ArtFont.getInstance().writeFontToCtxRight(ctx, String($ary[1]), ArtFont.num1, 64, 45);
                if (vo.hasReward) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 64, 64));
                }
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        AchievementRender.prototype.drawProgress = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.Progress.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var posx = 40;
            var posy = 3;
            var progress_bg = AchievementRender.baseAtlas.getRec("Pro_bg");
            ctx.drawImage(AchievementRender.baseAtlas.useImg, progress_bg.pixelX, progress_bg.pixelY, progress_bg.pixelWitdh, progress_bg.pixelHeight, 0, 0, progress_bg.pixelWitdh, progress_bg.pixelHeight);
            var ratio = vo.progress / vo.data.maxnum;
            var progress_bar = AchievementRender.baseAtlas.getRec("Pro");
            ctx.drawImage(AchievementRender.baseAtlas.useImg, progress_bar.pixelX, progress_bar.pixelY, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight, posx, posy, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        // private drawInfo(): void {
        //     var vo: AchieveItemData = this.itdata.data;
        //     var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Info.skinName);
        //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
        //     LabelTextFont.writeTextAutoCenterToCtx(ctx, vo.data.info, 16, 261, $rec.pixelHeight, vo.hasReward ? "#56da35" : "#d6e7ff");
        //     var posy: number = vo.hasReward ? 11 : 9
        //     var colorstr: string = vo.hasReward ? ArtFont.num7 : ArtFont.num10
        //     ArtFont.getInstance().writeFontToCtxLeft(ctx, vo.progress + "/" + vo.data.maxnum, colorstr, 268, posy);
        //     var distion = ArtFont.getInstance().getAirFontWidth(ctx, vo.progress + "/" + vo.data.maxnum, colorstr);
        //     var kuoleft: UIRectangle;
        //     var kuoright: UIRectangle;
        //     if (vo.hasReward) {
        //         kuoleft = AchievementRender.baseAtlas.getRec("Green_0")
        //         kuoright = AchievementRender.baseAtlas.getRec("Green_1")
        //     } else {
        //         kuoleft = AchievementRender.baseAtlas.getRec("Gray_0")
        //         kuoright = AchievementRender.baseAtlas.getRec("Gray_1")
        //     }
        //     ctx.drawImage(AchievementRender.baseAtlas.useImg, kuoleft.pixelX, kuoleft.pixelY, kuoleft.pixelWitdh, kuoleft.pixelHeight, 260, 11, kuoleft.pixelWitdh, kuoleft.pixelHeight);
        //     ctx.drawImage(AchievementRender.baseAtlas.useImg, kuoright.pixelX, kuoright.pixelY, kuoright.pixelWitdh, kuoright.pixelHeight, 268 + distion, 11, kuoright.pixelWitdh, kuoright.pixelHeight);
        //     this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        // }
        AchievementRender.prototype.drawIcon = function () {
            var _this = this;
            var vo = this.itdata.data;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/achievementicon/1.png", LoadManager.IMG_TYPE, function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.Icon.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                ArtFont.getInstance().writeFontToCtxCenten(ctx, String(vo.data.achval), ArtFont.num1, 34, 45);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        AchievementRender.prototype.butClik = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.hasReach) {
                    if (!vo.hasReward) {
                        //领取
                        NetManager.getInstance().protocolos.get_achieve_reward(vo.data.id);
                    }
                }
                else {
                    //前往
                    //console.log("前往");
                }
            }
        };
        AchievementRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Bg);
            UiDraw.clearUI(this.Icon);
            UiDraw.clearUI(this.Name);
            UiDraw.clearUI(this.Info);
            UiDraw.clearUI(this.Progress);
            UiDraw.clearUI(this.Reward1);
            UiDraw.clearUI(this.Reward2);
            UiDraw.clearUI(this.Btn);
        };
        return AchievementRender;
    }(SListItem));
    role.AchievementRender = AchievementRender;
})(role || (role = {}));
//# sourceMappingURL=AchievementPanel.js.map