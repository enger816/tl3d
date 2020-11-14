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
var PopTimeOutUtil = /** @class */ (function (_super) {
    __extends(PopTimeOutUtil, _super);
    // public _baseRender: UIRenderComponent;
    // public _topRender: UIRenderComponent;
    function PopTimeOutUtil() {
        var _this = _super.call(this) || this;
        _this._complete = false;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.center = 0;
        _this.middle = 0;
        _this._bottomRender = new UIRenderComponent;
        _this.addRender(_this._bottomRender);
        // this._baseRender = new UIRenderComponent;
        // this.addRender(this._baseRender)
        // this._topRender = new UIRenderComponent;
        // this.addRender(this._topRender)
        _this._bottomRender.setInfo("ui/uidata/poptimeout/poptimeout.xml", "ui/uidata/poptimeout/poptimeout.png", function () { _this.loadConfigCom(); });
        return _this;
    }
    PopTimeOutUtil.prototype.initData = function ($backFun, $type, $time) {
        if ($backFun === void 0) { $backFun = null; }
        this._backFun = $backFun;
        this._type = $type;
        this._endtime = $time + TimeUtil.getTimer();
        this.RefreshItems();
    };
    PopTimeOutUtil.prototype.RefreshItems = function () {
        if (this._complete) {
            this.showItems();
        }
    };
    PopTimeOutUtil.prototype.loadConfigCom = function () {
        // this._bottomRender.uiAtlas = this._topRender.uiAtlas
        // this._baseRender.uiAtlas = this._topRender.uiAtlas
        this.initUI();
        this._complete = true;
        this.RefreshItems();
    };
    /**
     * 添加时，类型相对应，数字对应枚举
     */
    PopTimeOutUtil.prototype.initUI = function () {
        var _this = this;
        var renderLevel = this._bottomRender;
        this._icon = this.addChild(renderLevel.getComponent("type0"));
        this._a_time = this.addChild(renderLevel.getComponent("a_time"));
        this._tickFun = function (t) { _this.tickRefreshState(t); };
    };
    PopTimeOutUtil.prototype.tickRefreshState = function (t) {
        var $time = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
        if (this._curtime != $time) {
            this._curtime = $time;
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this._a_time.skinName, this.type2time($time), this.type2font(), TextAlign.CENTER);
            ////console.log("刷新", $time);
            if ($time < 0) {
                this.close();
                //回调
                if (this._backFun) {
                    this._backFun();
                }
            }
        }
        if (!this.hasStage) {
            TimeUtil.removeFrameTick(this._tickFun);
        }
    };
    PopTimeOutUtil.prototype.showItems = function () {
        var _this = this;
        LoadManager.getInstance().load(Scene_data.fileRoot + getUItimeOutUrl(String(this._type)), LoadManager.IMG_TYPE, function ($img) {
            var $rec = _this._bottomRender.uiAtlas.getRec(_this._icon.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var posx = ($rec.pixelWitdh / 2) - ($img.width / 2);
            var posy = $rec.pixelHeight - $img.height;
            ctx.drawImage($img, 0, 0, $img.width, $img.height, posx, posy, $img.width, $img.height);
            _this._bottomRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            TimeUtil.addFrameTick(_this._tickFun);
        });
        if (this._type == PopTimeOutUtil.END) {
            this.middle = -60;
        }
        else {
            this.middle = 0;
        }
    };
    PopTimeOutUtil.prototype.type2font = function () {
        switch (this._type) {
            case PopTimeOutUtil.MATCHINGOK:
            case PopTimeOutUtil.PLAYGO:
            case PopTimeOutUtil.SHUGUAI:
            case PopTimeOutUtil.END:
                return ArtFont.num61;
            case PopTimeOutUtil.FUHUO:
                return ArtFont.num101;
            default:
                break;
        }
    };
    PopTimeOutUtil.prototype.type2time = function ($num) {
        if (this._type == PopTimeOutUtil.END) {
            return TimeUtil.getLocalTime3($num + 1);
        }
        return String($num + 1);
    };
    PopTimeOutUtil.prototype.close = function () {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
        }
    };
    /**

     * $type：类型
     * $time：时间 毫秒
         * $backFun：倒计时结束回调
     */
    PopTimeOutUtil.show = function ($type, $time, $backFun) {
        if ($time === void 0) { $time = 5000; }
        if ($backFun === void 0) { $backFun = null; }
        if (!this.popTimeOutUtil) {
            this.popTimeOutUtil = new PopTimeOutUtil();
        }
        if (this.popTimeOutUtil.hasStage) {
            return;
        }
        this.popTimeOutUtil.initData($backFun, $type, $time);
        UIManager.getInstance().addUIContainer(this.popTimeOutUtil);
        return this.popTimeOutUtil;
    };
    /**复活 只能设置5秒以下倒计时*/
    PopTimeOutUtil.FUHUO = 2;
    /**战斗开始 */
    PopTimeOutUtil.PLAYGO = 1;
    /**匹配成功 */
    PopTimeOutUtil.MATCHINGOK = 0;
    PopTimeOutUtil.SHUGUAI = 3;
    PopTimeOutUtil.END = 4;
    return PopTimeOutUtil;
}(UIConatiner));
//# sourceMappingURL=PopTimeOutUtil.js.map