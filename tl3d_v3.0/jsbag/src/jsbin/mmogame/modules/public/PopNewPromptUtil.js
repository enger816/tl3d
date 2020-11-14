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
var PopNewPromptUtil = /** @class */ (function (_super) {
    __extends(PopNewPromptUtil, _super);
    // public _topRender: UIRenderComponent;
    function PopNewPromptUtil() {
        var _this = _super.call(this) || this;
        _this._complete = false;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.center = 0;
        _this.middle = 0;
        _this._bottomRender = new UIRenderComponent;
        _this.addRender(_this._bottomRender);
        _this._baseRender = new UIRenderComponent;
        _this.addRender(_this._baseRender);
        // this._topRender = new UIRenderComponent;
        // this.addRender(this._topRender)
        _this._bottomRender.setInfo("ui/uidata/poptimeout/popnewprompt.xml", "ui/uidata/poptimeout/popnewprompt.png", function () { _this.loadConfigCom(); });
        return _this;
    }
    // private _lastvo: any
    PopNewPromptUtil.prototype.initData = function ($vo) {
        // if (this._lastvo && $vo.data.id == this._lastvo.data.id) {
        //     return;
        // }
        // this._lastvo = $vo;
        if (this._aryItems && this.hasStage) {
            this._aryItems.push($vo);
        }
        else {
            if (!this._aryItems) {
                this._aryItems = new Array;
            }
            this._aryItems.push($vo);
            UIManager.getInstance().addUIContainer(this);
            this.selectItem();
        }
    };
    PopNewPromptUtil.prototype.selectItem = function () {
        //console.log("_ary------", this._aryItems);
        if (this._aryItems && this._aryItems.length > 0) {
            this._type = this._aryItems[0].type;
            this._endtime = this._aryItems[0].times + TimeUtil.getTimer();
            this.RefreshItems();
        }
        else {
            this.close();
        }
    };
    PopNewPromptUtil.prototype.RefreshItems = function () {
        if (this._complete) {
            this.type2draw();
            TimeUtil.addFrameTick(this._tickFun);
        }
    };
    PopNewPromptUtil.prototype.loadConfigCom = function () {
        // this._bottomRender.uiAtlas = this._topRender.uiAtlas
        this._baseRender.uiAtlas = this._bottomRender.uiAtlas;
        this.initUI();
        this._complete = true;
        this.RefreshItems();
    };
    /**
     * 添加时，类型相对应，数字对应枚举
     */
    PopNewPromptUtil.prototype.initUI = function () {
        var _this = this;
        var renderLevel = this._baseRender;
        this.addChild(this._bottomRender.getComponent("bg"));
        this.c_info = this.addChild(renderLevel.getComponent("c_info"));
        renderLevel.applyObjData();
        this._aryachive = new Array;
        this._aryachive.push(renderLevel.getComponent("c_name"));
        this._aryachive.push(renderLevel.getComponent("c_reward2"));
        this.a_1 = this.addChild(renderLevel.getComponent("a_1"));
        this._arytitle = new Array;
        this._arytitle.push(renderLevel.getComponent("c_icon"));
        this._tickFun = function (t) { _this.tickRefreshState(t); };
    };
    PopNewPromptUtil.prototype.tickRefreshState = function (t) {
        var $time = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
        if (this._curtime != $time) {
            this._curtime = $time;
            //console.log("刷新", $time);
            if ($time < 0) {
                //回调
                this.nextprompt();
            }
        }
        if (!this.hasStage) {
            TimeUtil.removeFrameTick(this._tickFun);
        }
    };
    PopNewPromptUtil.prototype.nextprompt = function () {
        this._aryItems.shift();
        // this._aryItems.splice(0, 1);
        this.selectItem();
    };
    PopNewPromptUtil.prototype.drawicon = function ($ui, $url) {
        var _this = this;
        LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE, function ($img) {
            var $rec = _this._bottomRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var ratio = Math.min(($rec.pixelWitdh / $img.width), ($rec.pixelHeight / $img.height));
            // var posx: number = ($rec.pixelWitdh / 2) - ($img.width * ratio / 2);
            // var posy: number = ($rec.pixelHeight / 2) - ($img.height * ratio / 2);
            ctx.drawImage($img, 0, 0, $img.width, $img.height, $rec.pixelWitdh - ($img.width * ratio), $rec.pixelHeight - ($img.height * ratio), $img.width * ratio, $img.height * ratio);
            _this._bottomRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
    };
    PopNewPromptUtil.prototype.drawReward = function ($ui, $ary) {
        var _this = this;
        IconManager.getInstance().getIcon(GameData.getIconCopyUrl($ary[0]), function ($img) {
            var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
            //图标
            ctx.drawImage($img, 0, 0, 60, 60, 2, 2, 60, 60);
            ArtFont.getInstance().writeFontToCtxRight(ctx, String($ary[1]), ArtFont.num1, 64, 45);
            _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        });
    };
    PopNewPromptUtil.prototype.showachievement = function () {
        var $vo = this._aryItems[0].data;
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryachive[0].skinName, $vo.data.name, 18, TextAlign.CENTER, ColorType.Green56da35);
        var $str = "奖励： ";
        if ($vo.data.title && $vo.data.title > 0) {
            //有奖励称号
            var $titletab = tb.TB_title_base.get_TB_title_baseById($vo.data.title);
            if ($vo.data.reward.length > 0) {
                $str += getResName($vo.data.reward[0][0]) + " x" + $vo.data.reward[0][1] + "   ";
                // UiDraw.drawRewardIconAndtxt(this._aryachive[2], $vo.data.reward[0], false, TextAlign.LEFT)
            }
            $str += $titletab.name + " x1";
        }
        else {
            for (var i = 0; i < $vo.data.reward.length; i++) {
                $str += getResName($vo.data.reward[i][0]) + " x" + $vo.data.reward[i][1] + "   ";
                // UiDraw.drawRewardIconAndtxt(this._aryachive[i + 1], $vo.data.reward[i], false, TextAlign.LEFT)
            }
        }
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryachive[1].skinName, $str, 16, TextAlign.LEFT, ColorType.Whiteffffff);
        LabelTextFont.writeTextAutoCenter(this._baseRender.uiAtlas, this.c_info.skinName, $vo.data.info, 16, ColorType.Whiteffffff, 315, true);
    };
    PopNewPromptUtil.prototype.showdesignation = function () {
        var $vo = this._aryItems[0].data;
        this.drawicon(this._arytitle[0], "ui/load/tittle/" + $vo.id + ".png");
        LabelTextFont.writeTextAutoCenter(this._baseRender.uiAtlas, this.c_info.skinName, $vo.info, 16, ColorType.Whiteffffff, 315, true);
    };
    PopNewPromptUtil.prototype.type2draw = function () {
        switch (this._type) {
            case PopNewPromptUtil.NEW_ACHIEVEMENT:
                this.setUiListVisibleByItem(this._aryachive, true);
                this.setUiListVisibleByItem(this._arytitle, false);
                this.a_1.goToAndStop(0);
                this.showachievement();
                break;
            case PopNewPromptUtil.NEW_DESIGNATION:
                this.setUiListVisibleByItem(this._arytitle, true);
                this.setUiListVisibleByItem(this._aryachive, false);
                this.a_1.goToAndStop(1);
                this.showdesignation();
                break;
            default:
                break;
        }
    };
    PopNewPromptUtil.prototype.close = function () {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
        }
    };
    PopNewPromptUtil.show = function ($type, $data) {
        //console.log("---shuju-----", $data, $type);
        var newpromotvo = new NewPromptVo();
        newpromotvo.data = $data;
        newpromotvo.type = $type;
        if (!this.popNewPromptUtil) {
            this.popNewPromptUtil = new PopNewPromptUtil();
        }
        // if (this.popNewPromptUtil.hasStage) {
        //     return;
        // }
        this.popNewPromptUtil.initData(newpromotvo);
        return this.popNewPromptUtil;
    };
    /** 获得新成就 */
    PopNewPromptUtil.NEW_ACHIEVEMENT = 0;
    /** 获得新称号 */
    PopNewPromptUtil.NEW_DESIGNATION = 1;
    return PopNewPromptUtil;
}(UIConatiner));
var NewPromptVo = /** @class */ (function () {
    function NewPromptVo() {
        this.id = 1;
        this.times = 3000;
    }
    return NewPromptVo;
}());
//# sourceMappingURL=PopNewPromptUtil.js.map