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
var activity;
(function (activity) {
    var EverydayActivityList = /** @class */ (function (_super) {
        __extends(EverydayActivityList, _super);
        function EverydayActivityList() {
            var _this = _super.call(this) || this;
            _this.left = 49;
            _this.top = 84;
            return _this;
        }
        EverydayActivityList.prototype.init = function ($uiAtlas) {
            var _this = this;
            this.baseAtlas = $uiAtlas;
            this.initData();
            this._tickFun = function () { _this.tickRefreshState(); };
        };
        EverydayActivityList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, EverydayActivityRender, 820, 258, 410, 86, 3, 1024, 512, 2, 5, 1);
        };
        EverydayActivityList.prototype.addTick = function () {
            TimeUtil.addTimeTick(1000, this._tickFun);
        };
        EverydayActivityList.prototype.removeTick = function () {
            TimeUtil.removeTimeTick(this._tickFun);
        };
        EverydayActivityList.prototype.tickRefreshState = function () {
            if (activity.ActivityModel.getInstance().compareAandB(this._aryList, this._type)) {
                ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_TABREDPOINT_EVENT));
            }
        };
        EverydayActivityList.prototype.refreshDataByNewData = function () {
            //通过type，获得所对应的列表
            this._aryList = activity.ActivityModel.getInstance().getList(this._type);
            var $sListItemData = this.getData(this._aryList);
            // //console.log("$sListItemDat----", $sListItemData);
            this.refreshData($sListItemData);
        };
        EverydayActivityList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        EverydayActivityList.prototype.show = function ($type) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.addTick();
            }
            this._type = $type;
            this.refreshDataByNewData();
        };
        EverydayActivityList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
            this.removeTick();
        };
        return EverydayActivityList;
    }(SList));
    activity.EverydayActivityList = EverydayActivityList;
    var EverydayActivityRender = /** @class */ (function (_super) {
        __extends(EverydayActivityRender, _super);
        function EverydayActivityRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        EverydayActivityRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var customRender = this._customRenderAry[0];
            this.Recomand = this.creatSUI(customRender, this.parentTarget.baseAtlas, "Recomand", 2, 1, 58, 60);
            $container.addChild(this.Recomand);
            this.Icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Icon", 12, 9, 68, 68);
            $container.addChild(this.Icon);
            this.Name = this.creatSUI(customRender, this.parentTarget.baseAtlas, "Name", 86, 15, 80, 25);
            $container.addChild(this.Name);
            this.Week = this.creatSUI(customRender, this.parentTarget.baseAtlas, "Week", 166, 15, 130, 20);
            $container.addChild(this.Week);
            this.Num = this.creatSUI(customRender, this.parentTarget.baseAtlas, "Num", 86, 42, 101, 32);
            $container.addChild(this.Num);
            this.Action = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Action", 192, 47, 80, 20);
            $container.addChild(this.Action);
            this.Time = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Time", 288, 4, 108, 20);
            $container.addChild(this.Time);
            this.Btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Btn", 288, 26, 108, 54);
            $container.addChild(this.Btn);
            this.Bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 407, 84, 10, 10);
            $container.addChild(this.Bg);
            // this.Bg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Btn.addEventListener(InteractiveEvent.Up, this.butClik, this);
        };
        // public set selected(val: boolean) {
        //     this._selected = val;
        //     this.applyrender();
        // }
        // public get selected(): boolean {
        //     return this._selected;
        // }
        EverydayActivityRender.prototype.drawIcon = function ($data) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + getactivityIconUrl(String($data.data.icon)), LoadManager.IMG_TYPE, function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.Icon.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        EverydayActivityRender.prototype.drawNameAndPk = function ($data) {
            var $rec = this._baseRender.uiAtlas.getRec(this.Name.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            LabelTextFont.writeSingleLabelToCtx(ctx, $data.data.name, 16, 0, 0, TextAlign.LEFT, ColorType.Brown7a2f21);
            if ($data.data.pvp) {
                var imgUseRect1 = this.parentTarget.baseAtlas.getRec("PK");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 109, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        EverydayActivityRender.prototype.drawBtn = function ($data) {
            var $rec = this._baseRender.uiAtlas.getRec(this.Btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            if ($data.state == -1) {
                //未激活
                var imgUseRect1 = this.parentTarget.baseAtlas.getRec("Btn_5");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
                ArtFont.getInstance().writeFontToCtxCenten(ctx, String($data.data.limdata), ArtFont.num27, 24, 18);
            }
            else if ($data.state == 4) {
                //活动今日未开启
                var imgUseRect1 = this.parentTarget.baseAtlas.getRec("Btn_6");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            else if ($data.state == 0) {
                //未开始
                var imgUseRect1 = this.parentTarget.baseAtlas.getRec("Btn_2");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            else if ($data.state == 1) {
                //正在进行中
                if ($data.canreceive) {
                    var imgUseRect1 = this.parentTarget.baseAtlas.getRec("Btn_7");
                }
                else {
                    var imgUseRect1 = this.parentTarget.baseAtlas.getRec("Btn_4");
                }
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            else if ($data.state == 2) {
                //已完成  判断是否领取奖励
                var imgUseRect1 = this.parentTarget.baseAtlas.getRec("Btn_7");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            else {
                //已结束
                var imgUseRect1 = this.parentTarget.baseAtlas.getRec("Btn_0");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        EverydayActivityRender.prototype.time2timestr = function ($num) {
            var aa;
            if ($num < 10) {
                aa = "0" + $num;
            }
            else {
                aa = $num + "";
            }
            return aa;
        };
        EverydayActivityRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            // if (this.selected) {
            //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RankSelect.skinName, UIData.publicUi, PuiData.A_HIGHT_F);
            // } else {
            //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.RankSelect.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            // }
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Bg.skinName, UIData.publicUi, PuiData.Slist_select);
            this.drawIcon(vo);
            // this.uiAtlas.upDataPicToTexture(getactivityIconUrl(String(vo.data.icon)), this.Icon.skinName);
            if (vo.data.recommend == 1) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Recomand.skinName, "T_1");
            }
            else {
                UiDraw.clearUI(this.Recomand);
            }
            this.drawNameAndPk(vo);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Week.skinName, vo.daliyinfo, 16, TextAlign.CENTER, "#d5e7ff");
            if (vo.state == 2 || (vo.state == 1 && vo.canreceive)) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Num.skinName, "Btn_1");
            }
            else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Num.skinName, ColorType.Brown7a2f21 + "次数:" + ColorType.Green2ca937 + vo.getNum() + "/" + vo.data.nums, 16, TextAlign.LEFT, "#d5e7ff", "", 5);
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Action.skinName, ColorType.Brown7a2f21 + "活跃:" + ColorType.colorff7200 + (vo.data.active * vo.data.nums), 16, TextAlign.LEFT, "#d5e7ff");
            var color;
            if (vo.state >= 2 || vo.state == -1) {
                color = ColorType.Brown7a2f21;
            }
            else if (vo.state == 0) {
                color = ColorType.colorcd2000;
            }
            else if (vo.state == 1) {
                color = ColorType.Green2ca937;
            }
            if (vo.isallday) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, "全天", 16, TextAlign.CENTER, color);
            }
            else if (vo.data.time.length == 2) {
                var str = this.time2timestr(vo.data.time[0][0]) + ":" + this.time2timestr(vo.data.time[0][1]) + "," + this.time2timestr(vo.data.time[1][0]) + ":" + this.time2timestr(vo.data.time[1][1]);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, str, 16, TextAlign.CENTER, color);
            }
            else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, this.time2timestr(vo.data.time[0][0]) + ":" + this.time2timestr(vo.data.time[0][1]) + "-" + this.time2timestr(vo.data.time[0][2]) + ":" + this.time2timestr(vo.data.time[0][3]), 16, TextAlign.CENTER, color);
            }
            this.drawBtn(vo);
        };
        EverydayActivityRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        EverydayActivityRender.prototype.butClik = function (evt) {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.state == 1 || vo.state == 2) {
                    //正在进行中
                    // ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.HIDE_ACTIVITY_EVENT));
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (vo.data.npc) {
                        var npcary = [3];
                        npcary = npcary.concat(vo.data.goto_sub);
                        //npcary = npcary.concat(vo.data.goto);
                        //console.log("---npcary--",npcary);
                        //npcary.push(2)
                        ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.HIDE_ACTIVITY_EVENT));
                        quest.QuestModel.getInstance().meshQuestTargets(new quest.QuestTaskVo(), npcary);
                    }
                    else {
                        var aaa = vo.data.goto_sub[0];
                        if (vo.data.goto == SharedDef.MODULE_MALL) {
                            aaa = vo.data.goto_sub;
                        }
                        //console.log("--vo.data.goto,vo.data.goto_sub--", vo.data.goto, aaa);
                        ModulePageManager.openPanel(vo.data.goto, aaa);
                        UIManager.popClikNameFun("Btn");
                    }
                }
            }
        };
        // private equClick(evt: InteractiveEvent): void {
        //     //选中，事件派发
        //     if (this.itdata && this.itdata.data) {
        //         if (UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
        //             var bb = new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_SELECT_EVENT);
        //             bb.data = this.itdata;
        //             ModuleEventManager.dispatchEvent(bb);
        //         }
        //     }
        // }
        EverydayActivityRender.prototype.setnull = function () {
            UiDraw.clearUI(this.Bg);
            UiDraw.clearUI(this.Icon);
            UiDraw.clearUI(this.Name);
            UiDraw.clearUI(this.Num);
            UiDraw.clearUI(this.Action);
            UiDraw.clearUI(this.Time);
            UiDraw.clearUI(this.Btn);
            UiDraw.clearUI(this.Recomand);
        };
        return EverydayActivityRender;
    }(SListItem));
    activity.EverydayActivityRender = EverydayActivityRender;
})(activity || (activity = {}));
//# sourceMappingURL=EverydayActivityList.js.map