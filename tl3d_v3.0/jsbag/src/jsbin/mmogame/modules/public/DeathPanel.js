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
var DeathPanel = /** @class */ (function (_super) {
    __extends(DeathPanel, _super);
    function DeathPanel() {
        var _this = _super.call(this) || this;
        // public setData($str1: string, $str2: string, $str3: string, $cost: number, $time: number, $type: number, $leftFun: Function, $rightFun: Function): void {
        //     LabelTextFont.writeSingleLabel(this.uiAtlas, this._label1.skinName, $str1, 18, TextAlign.CENTER);
        //     if (!$str2 || $str2 == "") {
        //         LabelTextFont.clearLabel(this.uiAtlas, this._label2.skinName);
        //     } else {
        //         LabelTextFont.writeSingleLabel(this.uiAtlas, this._label2.skinName, $str2, 18, TextAlign.CENTER);
        //     }
        //     if ($type == 0) {
        //         this._rightBtn.goToAndStop(0);
        //     } else if ($type == 1) {
        //         this._rightBtn.goToAndStop(1);
        //     }
        //     this._leftFun = $leftFun;
        //     this._rightFun = $rightFun;
        //     this._timeNum = $time;
        //     TimeUtil.addTimeTick(1000, this._tickFun);
        // }
        _this.showType = 0;
        _this.showVal = 0;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.center = 0;
        _this.middle = 0;
        _this._bgRender = new UIRenderComponent;
        _this.addRender(_this._bgRender);
        _this._bg2Render = new UIRenderComponent;
        _this.addRender(_this._bg2Render);
        _this._baseRender = new UIRenderComponent;
        _this.addRender(_this._baseRender);
        _this.uiAtlas = new UIAtlas();
        _this._baseRender.uiAtlas = _this.uiAtlas;
        _this._bgRender.uiAtlas = _this.uiAtlas;
        _this._bg2Render.uiAtlas = _this.uiAtlas;
        return _this;
    }
    DeathPanel.prototype.applyLoad = function () {
        var _this = this;
        this.uiAtlas.setInfo("ui/uidata/public/deathnew.xml", "ui/uidata/public/deathnew.png", function () { _this.loadConfigCom(); });
    };
    DeathPanel.prototype.loadConfigCom = function () {
        var _this = this;
        this._mainBg = this._bgRender.getComponent("t_bg");
        this.addChild(this._mainBg);
        this._mainBg.addEventListener(InteractiveEvent.Up, this.onClick, this);
        this.addUIList(["t_basebg"], this._bg2Render);
        this.addUIList(["t_title"], this._baseRender);
        this._label1 = this._baseRender.getComponent("t_lab1");
        this.addChild(this._label1);
        this._val1 = this._baseRender.getComponent("t_val1");
        this.addChild(this._val1);
        this._label2 = this._baseRender.getComponent("t_lab2");
        this.addChild(this._label2);
        this._val2 = this._baseRender.getComponent("t_val2");
        this.addChild(this._val2);
        this._mainLabel = this._baseRender.getComponent("t_death");
        this.addChild(this._mainLabel);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this._mainLabel.skinName, "您已经死亡！", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        this._leftBtn = this._baseRender.getComponent("t_btn1");
        this.addChild(this._leftBtn);
        this._leftBtn.addEventListener(InteractiveEvent.Up, this.onClick, this);
        this._rightBtn = this._baseRender.getComponent("t_btn2");
        this.addChild(this._rightBtn);
        this._rightBtn.addEventListener(InteractiveEvent.Up, this.onClick, this);
        this._tickFun = function () { _this.tick(); };
        LabelTextFont.writeSingleLabel(this.uiAtlas, this._label2.skinName, "自动复活：", 14, TextAlign.LEFT, ColorType.Orange9a683f);
        this.applyLoadComplete();
    };
    DeathPanel.prototype.onClick = function (e) {
        var _this = this;
        if (e.target == this._leftBtn) {
            if (this.showType == 1) {
                if (this.showVal > 0) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "原地复活时间未到", 99);
                    return;
                }
            }
            costRes([SharedDef.MONEY_TYPE_BIND_GOLD, this.showVal], function () {
                NetManager.getInstance().protocolos.gold_respawn(1);
                TimeUtil.removeTimeTick(_this._tickFun);
                UIManager.getInstance().removeUIContainer(_this);
            }, function () {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            });
            // if(!hasEnoughRes([SharedDef.MONEY_TYPE_BIND_GOLD,this.showVal])){
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00+"元宝不足，无法复活", 99)
            //     return;
            // }
            // NetManager.getInstance().protocolos.gold_respawn(1)
            // TimeUtil.removeTimeTick(this._tickFun);
            // UIManager.getInstance().removeUIContainer(this);
        }
        else if (e.target == this._rightBtn) {
            NetManager.getInstance().protocolos.xianfu_random_respawn();
            TimeUtil.removeTimeTick(this._tickFun);
            UIManager.getInstance().removeUIContainer(this);
        }
    };
    DeathPanel.prototype.resize = function () {
        if (this._mainBg) {
            this._mainBg.top = 0;
            this._mainBg.left = 0;
            this._mainBg.width = Scene_data.stageWidth / UIData.Scale;
            this._mainBg.height = Scene_data.stageHeight / UIData.Scale;
        }
        _super.prototype.resize.call(this);
    };
    DeathPanel.prototype.setData = function ($type, $val, $autotime) {
        this.showType = $type;
        this.showVal = $val;
        this._timeNum = $autotime;
        if ($type == 0) {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._label1.skinName, "消耗：", 14, TextAlign.LEFT, ColorType.Orange9a683f);
            // this.drawCost($val);
            UiDraw.drawRewardIconAndtxt(this._val1, [SharedDef.MONEY_TYPE_BIND_GOLD, $val], true, TextAlign.LEFT, 20);
        }
        else {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._label1.skinName, "等待：", 14, TextAlign.LEFT, ColorType.Orange9a683f);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._val1.skinName, String($val), 16, TextAlign.LEFT, ColorType.colorcd2000, "", 12);
        }
        LabelTextFont.writeSingleLabel(this.uiAtlas, this._val2.skinName, this._timeNum + "秒", 14, TextAlign.LEFT, ColorType.Green2ca937);
        TimeUtil.addTimeTick(1000, this._tickFun);
    };
    // private drawCost(val: number): void {
    //     var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this._val1.skinName);
    //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
    //     UiDraw.drawCost(ctx, 0, -10, SharedDef.MONEY_TYPE_BIND_GOLD);
    //     LabelTextFont.writeSingleLabelToCtx(ctx, String(val), 16, 35, 3, TextAlign.LEFT, ColorType.colorcd2000);
    //     this.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
    // }
    DeathPanel.prototype.tick = function () {
        this._timeNum--;
        if (this._timeNum <= 0) {
            UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeTimeTick(this._tickFun);
            NetManager.getInstance().protocolos.xianfu_random_respawn();
        }
        if (this.showType == 1) {
            this.showVal--;
            if (this.showVal < 0) {
                this.showVal = 0;
                UIManager.getInstance().removeUIContainer(this);
                TimeUtil.removeTimeTick(this._tickFun);
                NetManager.getInstance().protocolos.gold_respawn(1);
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._val1.skinName, String(this.showVal), 16, TextAlign.LEFT, ColorType.colorcd2000, "", 12);
        }
        LabelTextFont.writeSingleLabel(this.uiAtlas, this._val2.skinName, this._timeNum + "秒", 14, TextAlign.LEFT, ColorType.Green2ca937);
    };
    DeathPanel.prototype.onRemove = function () {
        TimeUtil.removeTimeTick(this._tickFun);
        _super.prototype.onRemove.call(this);
    };
    /**主提示文字
     * 次提示文字
     * 时间提示文字
     * 花费
     * 时间
     * 类型
     * 左边按钮事件
     * 右边按钮事件
     */
    // public static show($str1: string, $str2: string, $str3: string, $cost: number, $time: number, $type: number, $leftFun: Function, $rightFun: Function): void {
    //     if (!this._instance) {
    //         this._instance = new DeathPanel();
    //     }
    //     this._instance.load(() => {
    //         UIManager.getInstance().addUIContainer(this._instance);
    //         this._instance.setData($str1, $str2, $str3, $cost, $time, $type, $leftFun, $rightFun);
    //     }, false);
    // }
    DeathPanel.show = function ($type, $val, $autotime) {
        var _this = this;
        if (!this._instance) {
            this._instance = new DeathPanel();
        }
        this._instance.load(function () {
            UIManager.getInstance().addUIContainer(_this._instance);
            _this._instance.setData($type, $val, $autotime);
        }, false);
    };
    return DeathPanel;
}(UIConatiner));
//# sourceMappingURL=DeathPanel.js.map