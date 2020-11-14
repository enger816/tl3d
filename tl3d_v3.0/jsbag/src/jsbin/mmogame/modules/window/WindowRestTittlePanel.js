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
var wintittle;
(function (wintittle) {
    var TittleUi = /** @class */ (function () {
        function TittleUi() {
        }
        return TittleUi;
    }());
    wintittle.TittleUi = TittleUi;
    var WindowRestTittlePanel = /** @class */ (function (_super) {
        __extends(WindowRestTittlePanel, _super);
        function WindowRestTittlePanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.lock = false;
            _this.tittleUiList = new Array;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        WindowRestTittlePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/window/window.xml", "ui/uidata/window/window.png", function () { _this.loadConfigCom(); });
        };
        WindowRestTittlePanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        WindowRestTittlePanel.prototype.refresh = function ($data) {
            if ($data === void 0) { $data = null; }
            if (this.lock) {
                return;
            }
            if ($data) {
                //console.log("---到了");
                this.clear();
                this.showData = $data;
                for (var i = 0; i < this.showData.length; i++) {
                    var $vo = new TittleUi();
                    $vo.bg = this.addChild(this._midRender.getComponent("t_res_bg"));
                    $vo.addbtn = this.addEvntButUp("t_res_add", this._midRender);
                    $vo.label = this.addChild(this._topRender.getComponent("t_res_frame"));
                    $vo.label.goToAndStop(i);
                    if (this.showData.length == 3) {
                        $vo.bg.x = 145 + i * 250;
                    }
                    else if (this.showData.length == 2) {
                        $vo.bg.x = 250 + i * 300;
                    }
                    else {
                        $vo.bg.x = 100 + i * 200;
                    }
                    $vo.addbtn.x = $vo.bg.x + $vo.bg.width;
                    $vo.label.x = $vo.bg.x + 30;
                    $vo.typeId = this.showData[i];
                    $vo.addbtn.data = $vo;
                    this.tittleUiList.push($vo);
                }
            }
            this.drawTxtToCtx();
        };
        WindowRestTittlePanel.prototype.drawTxtToCtx = function () {
            for (var i = 0; i < this.tittleUiList.length; i++) {
                var $vo = this.tittleUiList[i];
                var $ui = $vo.label;
                var $toRect = $ui.getSkinCtxRect();
                var $strnum = GuidData.player.getResTypeStr($vo.typeId);
                // if ($vo.lastDrawNum != $num) {
                //     $vo.lastDrawNum = $num;
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                UiDraw.cxtDrawImg($ctx, UIuitl.getInstance().costtype($vo.typeId), new Rectangle(0, 0, 35, 35), UIData.publicUi);
                LabelTextFont.writeSingleLabelToCtx($ctx, $strnum, 16, 0, 13, TextAlign.CENTER);
                $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
                // }
            }
        };
        WindowRestTittlePanel.prototype.forceRefresh = function () {
            this.drawTxtToCtx();
        };
        WindowRestTittlePanel.prototype.butClik = function ($evt) {
            var idx = 4011;
            var vo = $evt.target.data;
            var goto = SharedDef.MODULE_MALL;
            var gosub = [SharedDef.MODULE_MALL_RECHARGE];
            if (vo.typeId == SharedDef.MONEY_TYPE_SILVER) {
                goto = SharedDef.MODULE_MONEYTREE;
                gosub = SharedDef.MODULE_MONEYTREE_ALL;
                idx = 1121;
            }
            var $tb_system_base = tb.TB_system_base.getTempVo(idx);
            if ($tb_system_base.level <= GuidData.player.getLevel()) {
                ModulePageManager.openPanel(goto, gosub);
            }
            else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + $tb_system_base.level + "级后解锁", 99);
            }
        };
        WindowRestTittlePanel.prototype.clear = function () {
            while (this.tittleUiList.length) {
                var $vo = this.tittleUiList.pop();
                this.removeChild($vo.bg);
                this.removeChild($vo.label);
                this.removeChild($vo.addbtn);
            }
        };
        return WindowRestTittlePanel;
    }(UIPanel));
    wintittle.WindowRestTittlePanel = WindowRestTittlePanel;
})(wintittle || (wintittle = {}));
//# sourceMappingURL=WindowRestTittlePanel.js.map