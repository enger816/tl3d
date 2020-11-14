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
var email;
(function (email) {
    var MailPanel = /** @class */ (function (_super) {
        __extends(MailPanel, _super);
        function MailPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.setBlackBg();
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            return _this;
        }
        MailPanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/mail/mail.xml", "ui/uidata/mail/mail.png", function () { _this.loadConfigCom(); }, "ui/uidata/mail/mailuse.png");
        };
        MailPanel.prototype.loadConfigCom = function () {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.addUIList(["t_win_title", "t_list_bg", "t_content_bg"], this._bgRender);
            var ui;
            ui = this.addChild(this._baseRender.getComponent("t_del_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.delread, this);
            ui = this.addChild(this._baseRender.getComponent("t_delall_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.getAll, this);
            this._redPointRender.getRedPointUI(this, 4, new Vector2D(ui.x + ui.width, ui.y));
            this.mailnumLab = this.addChild(this._baseRender.getComponent("t_mail_num"));
            this.getBtn = this._baseRender.getComponent("t_get_btn");
            this.getBtn.addEventListener(InteractiveEvent.Up, this.getclick, this);
            this.mailTitle = this.addChild(this._baseRender.getComponent("t_title"));
            this.mailContent = this.addChild(this._baseRender.getComponent("t_content"));
            this.mailIconLab = this.addChild(this._baseRender.getComponent("t_icon_lab"));
            this.mailIconAry = new Array;
            this.hasgetAry = new Array;
            for (var i = 0; i < 4; i++) {
                this.mailIconAry.push(this.addChild(this._bgRender.getComponent("t_icon" + i)));
                this.hasgetAry.push(this._baseRender.getComponent("t_hasget" + i));
            }
            this.addLists();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        MailPanel.prototype.mailChg = function ($type) {
            if ($type == 1) {
                this.windowRankSList.refreshDraw();
                this.drawShowData();
            }
            else {
                this.windowRankSList.setRankData();
            }
            this.drawNum();
        };
        MailPanel.prototype.delread = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.remove_mail_one_step();
        };
        MailPanel.prototype.getAll = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.pick_mail_one_step();
        };
        MailPanel.prototype.getclick = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._showData) {
                NetManager.getInstance().protocolos.pick_mail(this._showData.indx);
            }
        };
        MailPanel.prototype.setShowData = function ($data) {
            this._showData = $data;
            if ($data) {
                this.drawShowData();
            }
            else {
                this.clearShowData();
                this.removeChild(this.getBtn);
            }
        };
        MailPanel.prototype.clearShowData = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailTitle.skinName, "无邮件", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.clearUI(this.mailContent);
            UiDraw.clearUI(this.mailIconLab);
            for (var i = 0; i < this.mailIconAry.length; i++) {
                UiDraw.clearUI(this.mailIconAry[i]);
            }
            for (var i = 0; i < this.hasgetAry.length; i++) {
                this.removeChild(this.hasgetAry[i]);
            }
        };
        MailPanel.prototype.drawShowData = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailTitle.skinName, this._showData.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailContent.skinName, "   " + this._showData.desc, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            var strAry = new Array;
            if (this._showData.item != "") {
                strAry = this._showData.item.split(",");
                if (this._showData.isGetItem) {
                    this.removeChild(this.getBtn);
                }
                else {
                    this.addChild(this.getBtn);
                }
            }
            else {
                this.removeChild(this.getBtn);
            }
            for (var i = 0; i < this.mailIconAry.length; i++) {
                if (strAry[i * 2] && strAry[i * 2 + 1]) {
                    IconManager.getInstance().drawItemIcon60(this.mailIconAry[i], Number(strAry[i * 2]), Number(strAry[i * 2 + 1]));
                    if (this._showData.isGetItem) {
                        this.addChild(this.hasgetAry[i]);
                    }
                    else {
                        this.removeChild(this.hasgetAry[i]);
                    }
                }
                else {
                    IconManager.getInstance().drawItemIcon60(this.mailIconAry[i], 0, 0);
                    this.removeChild(this.hasgetAry[i]);
                }
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailIconLab.skinName, "奖励附件：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        };
        MailPanel.prototype.drawNum = function () {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailnumLab.skinName, ColorType.Brown7a2f21 + "邮件数量：" +
                ColorType.Green2ca937 + this.windowRankSList.getDataSize() + "/" + SharedDef.MAX_GIFTPACKS_INFO_COUNT, 16, TextAlign.LEFT);
        };
        MailPanel.prototype.addLists = function () {
            this.windowRankSList = new MailSList;
            this.windowRankSList.init(this._baseUiAtlas, this);
        };
        MailPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MailPanel.prototype.butClik = function (evt) {
            if (evt.target == this.e_close) {
                this.hide();
            }
        };
        MailPanel.prototype.hide = function () {
            this.windowRankSList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        MailPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.windowRankSList.show();
            this.drawNum();
            //this.windowRankSList.setRankData();
        };
        return MailPanel;
    }(WindowMinUi));
    email.MailPanel = MailPanel;
    var MailSList = /** @class */ (function (_super) {
        __extends(MailSList, _super);
        function MailSList() {
            return _super.call(this) || this;
        }
        MailSList.prototype.init = function ($uiAtlas, $panel) {
            MailSListRender.baseAtlas = $uiAtlas;
            this._panel = $panel;
            this.initData();
        };
        MailSList.prototype.initData = function () {
            var $ary = new Array();
            var w = 230;
            var h = 320;
            this.setData($ary, MailSListRender, w, h, 230, 90, 4, 256, 512, 1, 7);
            this.center = -180;
            this.middle = -10;
        };
        MailSList.prototype.setRankData = function () {
            var $data = GuidData.giftPacks.getGiftDataItem();
            var $tbDataArr = new Array();
            for (var i = 0; i < $data.length; i++) {
                var $vo = new SListItemData();
                if ($data[i]) {
                    $vo.data = $data[i];
                }
                $vo.id = i;
                $tbDataArr.push($vo);
            }
            this.refreshData($tbDataArr);
            if ($data.length) {
                this.setSelectIndex(0);
            }
            this._panel.setShowData($data[0]);
        };
        MailSList.prototype.setSelect = function ($item) {
            _super.prototype.setSelect.call(this, $item);
            this._panel.setShowData($item.itdata.data);
        };
        MailSList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.setRankData();
            this.setShowLevel(2);
        };
        MailSList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return MailSList;
    }(SList));
    email.MailSList = MailSList;
    var MailSListRender = /** @class */ (function (_super) {
        __extends(MailSListRender, _super);
        function MailSListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MailSListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.r_bg = this.creatGrid9SUI($bgRender, MailSListRender.baseAtlas, "s_bg", 0, 0, 224, 90, 10, 10);
            $container.addChild(this.r_bg);
            this.r_bg.addEventListener(InteractiveEvent.Up, this.onclick, this);
            this.r_icon = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_icon", 9, 9, 60, 64);
            $container.addChild(this.r_icon);
            this.r_title = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_title", 82, 12, 135, 20);
            $container.addChild(this.r_title);
            this.r_time = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_time", 82, 32, 135, 20);
            $container.addChild(this.r_time);
            this.r_lasttime = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_lasttime", 82, 56, 135, 20);
            $container.addChild(this.r_lasttime);
        };
        MailSListRender.prototype.onclick = function ($e) {
            if (this.itdata && this.itdata.data) {
                UiTweenScale.getInstance().changeButSize($e.target);
                this.parentTarget.setSelect(this);
            }
        };
        Object.defineProperty(MailSListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                if (this._selected == val) {
                    return;
                }
                this._selected = val;
                if (this._selected) {
                    NetManager.getInstance().protocolos.read_mail(this.itdata.data.indx);
                }
                if (this.itdata && this.itdata.data) {
                    this.drawSel();
                }
            },
            enumerable: true,
            configurable: true
        });
        MailSListRender.prototype.drawSel = function () {
            if (this._selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.Slist_select);
            }
            else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.Slist_nselect);
            }
        };
        MailSListRender.prototype.applyRender = function () {
            this.drawSel();
            var $vo = this.itdata.data;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_title.skinName, ColorType.Brown7a2f21 + $vo.name, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_time.skinName, ColorType.Brown7a2f21 + TimeUtil.getLocalTime0($vo.startTime), 16, TextAlign.LEFT);
            var $ts = $vo.endTime - GameInstance.getServerNow();
            $ts = Math.floor($ts / 60 / 60 / 12);
            if ($ts > 0) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_lasttime.skinName, ColorType.Green2ca937 + "剩余时间:" + $ts + "天", 16, TextAlign.LEFT);
            }
            else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_lasttime.skinName, ColorType.Green2ca937 + "已过期", 16, TextAlign.LEFT);
            }
            if ($vo.item != "") {
                this.drawIcon($vo.isGetItem);
            }
            else {
                this.drawIcon($vo.isRead);
            }
        };
        MailSListRender.prototype.drawIcon = function ($isRead) {
            var $ui = this.r_icon;
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var imgUseRect = MailSListRender.baseAtlas.getRec($isRead ? "u_unlock" : "u_lock");
            ctx.drawImage(MailSListRender.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        MailSListRender.prototype.refreshDraw = function () {
            if (this.itdata && this.itdata.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        MailSListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if (this.itdata && this.itdata.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        MailSListRender.prototype.setnull = function () {
            UiDraw.clearUI(this.r_bg);
            UiDraw.clearUI(this.r_lasttime);
            UiDraw.clearUI(this.r_time);
            UiDraw.clearUI(this.r_icon);
            UiDraw.clearUI(this.r_title);
        };
        return MailSListRender;
    }(SListItem));
    email.MailSListRender = MailSListRender;
    var WindowRankVo = /** @class */ (function () {
        function WindowRankVo() {
        }
        return WindowRankVo;
    }());
    email.WindowRankVo = WindowRankVo;
})(email || (email = {}));
//# sourceMappingURL=MailPanel.js.map