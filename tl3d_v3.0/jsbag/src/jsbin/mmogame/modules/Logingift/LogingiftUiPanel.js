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
var logingift;
(function (logingift) {
    var LogingiftUiPanel = /** @class */ (function (_super) {
        __extends(LogingiftUiPanel, _super);
        function LogingiftUiPanel() {
            var _this = _super.call(this) || this;
            _this._lastMouseX = 0;
            _this._lastRoleRotatioinY = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baImg = new UIBackImg();
            _this._baImg.setImgInfo("ui/uidata/basebg/skillbg.png", 128, 64);
            _this.addRender(_this._baImg);
            _this._publicbgRender = new UIRenderComponent;
            _this.addRender(_this._publicbgRender);
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._baseRender.uiAtlas = new UIAtlas();
            return _this;
        }
        LogingiftUiPanel.prototype.dispose = function () {
            this._baImg.dispose();
            this._baImg = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this._publicbgRender.dispose();
            // this._publicbgRender = null;
        };
        LogingiftUiPanel.prototype.applyLoad = function () {
            var _this = this;
            // this._baseRender.setInfo("ui/uidata/ranking/ranking.xml", "ui/uidata/ranking/ranking.png", () => { this.loadConfigCom() });
            GameData.getPublicUiAtlas(function ($publicbgUiAtlas) {
                _this._publicbgRender.uiAtlas = $publicbgUiAtlas;
                _this._baseRender.uiAtlas.setInfo("ui/uidata/logingift/logingift.xml", "ui/uidata/logingift/logingift.png", function () { _this.loadConfigCom(); }, "ui/uidata/logingift/logingiftpc.png");
            });
        };
        LogingiftUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            var renderLevel = this._baseRender;
            this.t_rightbg2_1 = this.addChild(this._publicbgRender.getComponent("t_rightbg2"));
            this.setUiSizeByName(this.t_rightbg2_1, "bg");
            this.b_close = this.addEvntBut("b_close", this._publicbgRender);
            this.setUiSizeByName(this.b_close, "close");
            this.addChild(this._bgRender.getComponent("a_18_0"));
            var a_18_3 = this.addChild(this._bgRender.getComponent("a_18_3"));
            a_18_3.isU = true;
            a_18_3.isV = true;
            var a_18_2 = this.addChild(this._bgRender.getComponent("a_18_2"));
            a_18_2.isV = true;
            var a_18_1 = this.addChild(this._bgRender.getComponent("a_18_1"));
            a_18_1.isU = true;
            this.addUIList(["line", "a_18_0"], this._bgRender);
            this.a_info = this.addChild(this._topRender.getComponent("a_info"));
            this.a_receiveday = this.addChild(this._topRender.getComponent("a_receiveday"));
            this.a_name = this.addChild(this._topRender.getComponent("a_name"));
            this.btn_up = this.addEvntBut("btn_up", renderLevel);
            this.btn_down = this.addEvntBut("btn_down", renderLevel);
            this.addUIList(["a_2", "a_4", "a_1", "a_3"], renderLevel);
            this.role = this.addChild(renderLevel.getComponent("role"));
            this.role.isVirtual = true;
            this.role.addEventListener(InteractiveEvent.Down, this.A_left_bg_MouseDown, this);
            this.addPersonChar();
            this.applyLoadComplete();
        };
        LogingiftUiPanel.prototype.setUiSizeByName = function ($ui, $name) {
            var $temp = this._bgRender.getComponent($name);
            $ui.x = $temp.x;
            $ui.y = $temp.y;
            $ui.width = $temp.width;
            $ui.height = $temp.height;
        };
        LogingiftUiPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
            if (!this.logingiftList) {
                this.logingiftList = new LogingiftList();
                this.logingiftList.init(this._baseRender.uiAtlas);
            }
            this.logingiftList.show();
            this.resize();
        };
        LogingiftUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        LogingiftUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.logingiftList) {
                this.logingiftList.left = this.t_rightbg2_1.parent.x / UIData.Scale + this.t_rightbg2_1.x + 8;
                this.logingiftList.top = this.t_rightbg2_1.parent.y / UIData.Scale + this.t_rightbg2_1.y + 6;
            }
            this.resizeRole();
        };
        LogingiftUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_close:
                    //console.log("b_close");
                    ModuleEventManager.dispatchEvent(new logingift.LogingiftEvent(logingift.LogingiftEvent.HIDE_Logingift_EVENT));
                    break;
                case this.btn_up:
                    if (this._indx == 1) {
                        return;
                    }
                    this._indx--;
                    this.drawView();
                    break;
                case this.btn_down:
                    var arytab = tb.TB_login_activity_preview.get_TB_login_activity_preview();
                    if (this._indx == arytab[arytab.length - 1].id) {
                        return;
                    }
                    this._indx++;
                    this.drawView();
                    break;
                default:
                    break;
            }
        };
        LogingiftUiPanel.prototype.resetData = function () {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, "A_curday", String(GuidData.player.getLogingiftDay()), ArtFont.num7, 5);
            this._indx = logingift.LogingiftModel.getInstance().getnearday();
            this.drawView();
        };
        LogingiftUiPanel.prototype.drawView = function () {
            var tab = tb.TB_login_activity_preview.get_TB_login_activity_previewById(this._indx);
            this.drawName(this.a_name, getload_LogingiftUrl(tab.preview_name));
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_receiveday.skinName, String(tab.day), ArtFont.num26, 5);
            this.drawName(this.a_info, getload_LogingiftInfoUrl(tab.preview_info));
            if (tab.type == 1) {
                this.showDisPlay.showAvatarVisibel = false;
                this.showDisPlay.setAvatar(6302);
                this.showDisPlay.setWeaponByAvatar(tab.preview_model);
                this._scale = 4;
                this._posy = -40;
            }
            else {
                this.showDisPlay.showAvatarVisibel = true;
                this.showDisPlay.removePart(SceneChar.WEAPON_PART);
                this.showDisPlay.setAvatar(tab.preview_model);
                this._scale = 3;
                this._posy = -110;
            }
            this.resizeRole();
        };
        LogingiftUiPanel.prototype.drawName = function ($key, $url) {
            var _this = this;
            IconManager.getInstance().getIcon($url, function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($key.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, ($rec.pixelWitdh / 2) - ($img.width / 2), $rec.pixelHeight - $img.height, $img.width, $img.height);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        LogingiftUiPanel.prototype.addPersonChar = function () {
            var _this = this;
            this.showDisPlay = new Person2DChar();
            this._baseRender.addModel(this.showDisPlay);
            this._rotationFun = function (d) { _this.rotationRole(); };
        };
        LogingiftUiPanel.prototype.A_left_bg_MouseDown = function (evt) {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.showDisPlay.rotationY;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        LogingiftUiPanel.prototype.A_left_bg_MouseMove = function (evt) {
            this.showDisPlay.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        };
        LogingiftUiPanel.prototype.A_left_bg_MouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        LogingiftUiPanel.prototype.rotationRole = function () {
            this.showDisPlay.rotationY -= 0.5;
        };
        LogingiftUiPanel.prototype.resizeRole = function () {
            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = this._scale * UIData.Scale;
                this.showDisPlay.rotationY = 0;
                this.showDisPlay.y = this._posy * UIData.Scale;
                this.showDisPlay.x = 205 * UIData.Scale;
            }
        };
        return LogingiftUiPanel;
    }(UIPanel));
    logingift.LogingiftUiPanel = LogingiftUiPanel;
    /**
     * 登入大礼list
     */
    var LogingiftList = /** @class */ (function (_super) {
        __extends(LogingiftList, _super);
        function LogingiftList() {
            var _this = _super.call(this) || this;
            _this.left = 351;
            _this.top = 75;
            return _this;
        }
        LogingiftList.prototype.init = function ($uiAtlas) {
            LogingiftListRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        LogingiftList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, LogingiftListRender, 602, 465, 0, 86, 5, 512, 512, 1, 7);
        };
        /**
         * refreshData
         */
        LogingiftList.prototype.refreshDataByNewData = function () {
            var ary = logingift.LogingiftModel.getInstance().getList();
            var $sListItemData = this.getData(ary);
            this.refreshData($sListItemData);
        };
        LogingiftList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        LogingiftList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        };
        LogingiftList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return LogingiftList;
    }(SList));
    logingift.LogingiftList = LogingiftList;
    var LogingiftListRender = /** @class */ (function (_super) {
        __extends(LogingiftListRender, _super);
        function LogingiftListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        LogingiftListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Day = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Day", 30, 29, 81, 23);
            $container.addChild(this.Day);
            this._ary = new Array;
            this.Reward0 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward0", 124, 8, 64, 64);
            $container.addChild(this.Reward0);
            this.Reward0.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward0);
            this.Reward1 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward1", 194, 8, 64, 64);
            $container.addChild(this.Reward1);
            this.Reward1.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward1);
            this.Reward2 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward2", 264, 8, 64, 64);
            $container.addChild(this.Reward2);
            this.Reward2.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward2);
            this.Reward3 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward3", 334, 8, 64, 64);
            $container.addChild(this.Reward3);
            this.Reward3.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward3);
            this.Reward4 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward4", 404, 8, 64, 64);
            $container.addChild(this.Reward4);
            this.Reward4.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward4);
            this.Btn = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Btn", 489, 23, 98, 36);
            $container.addChild(this.Btn);
            this.Btn.addEventListener(InteractiveEvent.Up, this.btnChick, this);
            this.Itembg = this.creatGrid9SUI($bgRender, LogingiftListRender.baseAtlas, "Itembg", 0, 0, 601, 80, 20, 20);
            $container.addChild(this.Itembg);
        };
        LogingiftListRender.prototype.drawIcon = function ($ui) {
            var _this = this;
            var vo = this.itdata.data;
            var ary = $ui.data;
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl(ary[0]), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, 60, 60, 2, 2, 60, 60);
                if (vo.state == 1) {
                    //领取
                    UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
                }
                else if (vo.state == 3) {
                    //图像灰
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 64, 64));
                }
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        LogingiftListRender.prototype.drawBtn = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.Btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var btnstateRect1 = LogingiftListRender.baseAtlas.getRec(String(vo.state));
            ctx.drawImage(LogingiftListRender.baseAtlas.useImg, btnstateRect1.pixelX, btnstateRect1.pixelY, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight, 0, 0, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        LogingiftListRender.prototype.drawTitle = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.Day.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var LibaoRect1 = LogingiftListRender.baseAtlas.getRec("Di");
            ctx.drawImage(LogingiftListRender.baseAtlas.useImg, LibaoRect1.pixelX, LibaoRect1.pixelY, LibaoRect1.pixelWitdh, LibaoRect1.pixelHeight, 0, 0, LibaoRect1.pixelWitdh, LibaoRect1.pixelHeight);
            var total = ArtFont.getInstance().getAirFontWidth(ctx, String(vo.data.day), ArtFont.num26, 5);
            ArtFont.getInstance().writeFontToCtxLeft(ctx, String(vo.data.day), ArtFont.num26, 23, 0, 5);
            var LibaoRect2 = LogingiftListRender.baseAtlas.getRec("Tian");
            ctx.drawImage(LogingiftListRender.baseAtlas.useImg, LibaoRect2.pixelX, LibaoRect2.pixelY, LibaoRect2.pixelWitdh, LibaoRect2.pixelHeight, total + 26, 0, LibaoRect2.pixelWitdh, LibaoRect2.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        LogingiftListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                //奖励
                var vo = this.itdata.data;
                for (var i = 0; i < 5; i++) {
                    if (i < vo.data.reward.length) {
                        this._ary[i].data = vo.data.reward[i];
                        this.drawIcon(this._ary[i]);
                    }
                    else {
                        this._ary[i].data = null;
                        LabelTextFont.writeSingleLabel(this.uiAtlas, this._ary[i].skinName, "", 16, TextAlign.LEFT, "#d6e7ff");
                    }
                }
                this.drawTitle();
                this.drawBtn();
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Itembg.skinName, UIData.publicUi, PuiData.ITEMBG);
            }
        };
        LogingiftListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        LogingiftListRender.prototype.equClick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            var ary = evt.target.data;
            if (ary && ary.length > 0) {
                //查看物品详情
                var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                aa.id = ary[0];
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        LogingiftListRender.prototype.btnChick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.state == 1) {
                    NetManager.getInstance().protocolos.get_login_activity_reward(vo.data.id);
                }
            }
        };
        LogingiftListRender.prototype.setnull = function () {
            LabelTextFont.clearLabel(this.uiAtlas, this.Day.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward0.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward1.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward2.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward3.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward4.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Btn.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Itembg.skinName);
        };
        return LogingiftListRender;
    }(SListItem));
    logingift.LogingiftListRender = LogingiftListRender;
})(logingift || (logingift = {}));
//# sourceMappingURL=LogingiftUiPanel.js.map