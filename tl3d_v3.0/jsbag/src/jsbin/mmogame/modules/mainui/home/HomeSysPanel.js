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
var homeui;
(function (homeui) {
    var SystemUi = /** @class */ (function () {
        function SystemUi() {
        }
        SystemUi.prototype.clik = function () {
            var $data = 1;
            if (this.tb.id == SharedDef.MODULE_MALL || this.tb.id == SharedDef.MODULE_MOUNT) {
                $data = [1];
            }
            if (this.tb.id == SharedDef.MODULE_FACTION) {
                $data = null;
            }
            if (this.tb.id == SharedDef.MODULE_TEAM) {
                $data = null;
            }
            if (this.tb.id == SharedDef.MODULE_RANK) {
                $data = 0;
            }
            ModulePageManager.openPanel(this.tb.id, $data);
        };
        SystemUi.prototype.drawIcon = function ($bottom) {
            this.frame.getSkinCtxRect;
            var $ui = this.frame;
            var $url = "ui/load/systemicon/" + this.tb.id + ".png";
            IconManager.getInstance().getIcon($url, function ($img) {
                var $skillrec = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
                $ctx.drawImage($img, 0, 0, 100, 100);
                $ui.drawToCtx($bottom.uiAtlas, $ctx);
            });
        };
        return SystemUi;
    }());
    homeui.SystemUi = SystemUi;
    var HomeSysPanel = /** @class */ (function (_super) {
        __extends(HomeSysPanel, _super);
        function HomeSysPanel() {
            var _this = _super.call(this) || this;
            _this.nodeDic = { 201: 6, 202: 14, 203: 17, 204: 20, 205: 27, 206: 37, 207: 50, 301: 55, 302: 60, 208: 80, 209: 136 };
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.right = 0;
            _this.bottom = 0;
            return _this;
        }
        HomeSysPanel.prototype.setRender = function ($bottom, $top) {
            this._baseRender = $bottom;
            this._redPointRender = $top;
            this.loadConfigCom();
        };
        HomeSysPanel.prototype.loadConfigCom = function () {
            this.addBaseSysFram();
            this.refresh();
        };
        HomeSysPanel.prototype.addBaseSysFram = function () {
            this.frameSysItem = new Array();
            var $tbItem = tb.TB_system_icon.getItem();
            for (var i = 0; i < $tbItem.length; i++) {
                var $tb = $tbItem[i];
                if ($tb.position >= 4 && $tb.position <= 7) {
                    var $uivo = new SystemUi();
                    $uivo.tb = $tb;
                    $uivo.frame = this.addEvntButUp("a_sys_fram", this._baseRender);
                    $uivo.frame.addEventListener(InteractiveEvent.Down, function (v) { }, this);
                    $uivo.frame.goToAndStop(this.frameSysItem.length);
                    if (this.nodeDic[$tb.id]) {
                        $uivo.redPoint = this._redPointRender.getRedPointUI(this, this.nodeDic[$tb.id], new Vector2D(0, 0));
                    }
                    this.frameSysItem.push($uivo);
                }
            }
        };
        HomeSysPanel.prototype.refresh = function () {
            for (var i = 0; i < this.frameSysItem.length; i++) {
                var $temp = this.frameSysItem[i];
                var $visible = this.getSysIconVisible($temp.tb);
                if ($visible) {
                    this.addChild($temp.frame);
                    //   var $pos: Vector2D = this.getPandaPostionBySysId(i);
                    var $pos = mainUi.MainUiModel.getPandaPostionBySysId($temp.tb.id);
                    $temp.frame.x = $pos.x;
                    $temp.frame.y = $pos.y;
                    $temp.drawIcon(this._baseRender);
                    if ($temp.redPoint) {
                        $temp.redPoint.setPos($pos.x + $temp.frame.width - 17, $pos.y);
                    }
                    //console.log($pos)
                }
                else {
                    this.removeChild($temp.frame);
                }
            }
        };
        HomeSysPanel.prototype.getSysIconVisible = function ($tb) {
            var $visible = GuidData.player.isOpenSystemNeedShow($tb.id);
            return $visible;
        };
        HomeSysPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                default:
                    for (var i = 0; i < this.frameSysItem.length; i++) {
                        if (this.frameSysItem[i].frame == evt.target) {
                            UIManager.popClikNameFun("sys" + this.frameSysItem[i].tb.id);
                            UiTweenScale.getInstance().changeButSize(evt.target);
                            this.frameSysItem[i].clik();
                            break;
                        }
                    }
                    break;
            }
        };
        return HomeSysPanel;
    }(UIVirtualContainer));
    homeui.HomeSysPanel = HomeSysPanel;
})(homeui || (homeui = {}));
//# sourceMappingURL=HomeSysPanel.js.map