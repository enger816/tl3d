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
var stronger;
(function (stronger) {
    /**
     * 变强list
     */
    var StrongerList = /** @class */ (function (_super) {
        __extends(StrongerList, _super);
        function StrongerList() {
            var _this = _super.call(this) || this;
            _this.left = 237;
            _this.top = 157;
            return _this;
        }
        StrongerList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        StrongerList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, StrongerListRender, 671, 352, 0, 89, 3, 512, 1024, 1, 6);
        };
        StrongerList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData(this._ary);
            this.refreshData($sListItemData);
        };
        StrongerList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i++) {
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        StrongerList.prototype.refreshItem = function () {
            this._ary = stronger.StrongerModel.getInstance().getList(this._type);
            //排序
            if (this._type == stronger.StrongerUitl.STRONGER_UP) {
                this._ary.sort(function (a, b) {
                    if (a.state == b.state) {
                        return a.data.id - b.data.id;
                    }
                    else {
                        return b.state - a.state;
                    }
                });
            }
            else {
                this._ary.sort(function (a, b) {
                    return b.data.priority - a.data.priority;
                });
            }
            this.refreshDataByNewData();
        };
        StrongerList.prototype.show = function ($type) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._type = $type;
            this.refreshItem();
        };
        StrongerList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return StrongerList;
    }(SList));
    stronger.StrongerList = StrongerList;
    var StrongerListRender = /** @class */ (function (_super) {
        __extends(StrongerListRender, _super);
        function StrongerListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StrongerListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.Icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Icon", 18, 9, 68, 68);
            $container.addChild(this.Icon);
            this.Name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Name", 106, 18, 82, 19);
            $container.addChild(this.Name);
            this.Info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Info", 192, 20, 190, 17);
            $container.addChild(this.Info);
            this.State = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "State", 467, 31, 72, 25);
            $container.addChild(this.State);
            this.Progress = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Progress", 110, 49, 333, 22);
            $container.addChild(this.Progress);
            this.Btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Btn", 552, 20, 103, 45);
            $container.addChild(this.Btn);
            this.Btn.addEventListener(InteractiveEvent.Up, this.btnChick, this);
            this.Itembg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Itembg", 0, 0, 671, 86, 10, 10);
            $container.addChild(this.Itembg);
        };
        StrongerListRender.prototype.drawIcon = function () {
            var _this = this;
            var vo = this.itdata.data;
            IconManager.getInstance().getIcon(getstrongerIconUrl(String(vo.data.icon)), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.Icon.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                //头像
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        StrongerListRender.prototype.drawProgress = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.Progress.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            if (vo.data.parent_id == stronger.StrongerUitl.STRONGER_UP) {
                //绘制进度条
                //背景
                var progressbgRect1 = this.parentTarget.baseAtlas.getRec("progressbg");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, progressbgRect1.pixelX, progressbgRect1.pixelY, progressbgRect1.pixelWitdh, progressbgRect1.pixelHeight, 0, 5, progressbgRect1.pixelWitdh, progressbgRect1.pixelHeight);
                // var ratio: number = (3 - vo.state) / 3;
                var ratio = vo.curzhanli / vo.zhanli;
                var progressupRect1 = this.parentTarget.baseAtlas.getRec("progressup");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, progressupRect1.pixelX, progressupRect1.pixelY, progressupRect1.pixelWitdh * ratio, progressupRect1.pixelHeight, 5, 5, progressupRect1.pixelWitdh * ratio, progressupRect1.pixelHeight);
                if (209 == vo.data.value_type) {
                    ratio;
                    console.log("===ratio===", ratio, vo.curzhanli, vo.zhanli);
                }
            }
            else {
                //绘制星星
                var startRect1 = this.parentTarget.baseAtlas.getRec("start");
                for (var i = 0; i < vo.data.priority; i++) {
                    ctx.drawImage(this.parentTarget.baseAtlas.useImg, startRect1.pixelX, startRect1.pixelY, startRect1.pixelWitdh, startRect1.pixelHeight, i * startRect1.pixelWitdh, 0, startRect1.pixelWitdh, startRect1.pixelHeight);
                }
            }
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        StrongerListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                //奖励
                var vo = this.itdata.data;
                this.drawProgress();
                this.drawIcon();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name.skinName, vo.data.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Info.skinName, vo.data.info, 14, TextAlign.LEFT, ColorType.color9a683f);
                if (vo.data.parent_id == stronger.StrongerUitl.STRONGER_UP) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.State.skinName, "State" + vo.state);
                }
                else {
                    LabelTextFont.clearLabel(this.uiAtlas, this.State.skinName);
                }
                if (vo.data.limitlev <= GuidData.player.getLevel()) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Btn.skinName, "Btn");
                }
                else {
                    this.drawUnlockBtn();
                }
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Itembg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
            }
        };
        StrongerListRender.prototype.drawUnlockBtn = function () {
            var vo = this.itdata.data;
            var $rec = this._baseRender.uiAtlas.getRec(this.Btn.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var imgUseRect1 = this.parentTarget.baseAtlas.getRec("A_unlockbtn");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            ArtFont.getInstance().writeFontToCtxCenten(ctx, String(vo.data.limitlev), ArtFont.num27, 22, 12);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        StrongerListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        StrongerListRender.prototype.btnChick = function (evt) {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            //console.log("--dianji--");
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data;
                if (vo.data.limitlev > GuidData.player.getLevel()) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "该系统" + vo.data.limitlev + "级开启", 99);
                    return;
                }
                if (vo.data.npc) {
                    var npcary = [3];
                    npcary = npcary.concat(vo.data.goto_sub);
                    ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.HIDE_Stronger_EVENT));
                    quest.QuestModel.getInstance().meshQuestTargets(new quest.QuestTaskVo(), npcary);
                }
                else {
                    ModulePageManager.openPanel(vo.data.goto, vo.data.goto_sub);
                    UIManager.popClikNameFun("Btn");
                }
            }
        };
        StrongerListRender.prototype.setnull = function () {
            LabelTextFont.clearLabel(this.uiAtlas, this.Icon.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Name.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.State.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Info.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Progress.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Btn.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Itembg.skinName);
        };
        return StrongerListRender;
    }(SListItem));
    stronger.StrongerListRender = StrongerListRender;
})(stronger || (stronger = {}));
//# sourceMappingURL=StrongerList.js.map