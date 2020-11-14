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
var topui;
(function (topui) {
    var BuffCdUi = /** @class */ (function () {
        function BuffCdUi() {
            this.endTM = 0;
            this.len = 20; //秒
        }
        BuffCdUi.prototype.update = function (t) {
            var $tm = this.endTM - TimeUtil.getTimer();
            if ($tm > 0) {
                var $int = 1 - ($tm / 1000) / this.len;
                this.cd.setCdNum(Math.min($int, 1));
            }
        };
        return BuffCdUi;
    }());
    topui.BuffCdUi = BuffCdUi;
    var TopBuffUiList = /** @class */ (function () {
        function TopBuffUiList($perent, $render, $cd) {
            var _this = this;
            this._showListArr = [148, 151, 152];
            this.perent = $perent;
            this.render = $render;
            this.cdRender = $cd;
            TimeUtil.addFrameTick(function (t) { _this.update(t); });
        }
        TopBuffUiList.prototype.update = function (t) {
            for (var i = 0; this.buffuiItem && i < this.buffuiItem.length; i++) {
                this.buffuiItem[i].update(t);
            }
        };
        TopBuffUiList.prototype.refresh = function () {
            this.clear();
            var $buff = GameInstance.mainChar.unit.buffUnit;
            for (var $keystr in $buff.item) {
                //console.log($keystr, $buff.item[$keystr]);
                var keynum = Number($keystr);
                if (this.needShowById(keynum)) {
                    var $maxLen = $buff.item[keynum] - TimeUtil.getTimer();
                    if (TopBuffUiList.cdKeyLen[keynum]) {
                        if (TopBuffUiList.cdKeyLen[keynum] < $maxLen) {
                            TopBuffUiList.cdKeyLen[keynum] = $maxLen;
                        }
                    }
                    else {
                        TopBuffUiList.cdKeyLen[keynum] = $maxLen;
                    }
                    var $buffCdUi = new BuffCdUi();
                    $buffCdUi.len = (TopBuffUiList.cdKeyLen[keynum] / 1000);
                    $buffCdUi.ui = this.perent.addChild(this.render.getComponent("a_buff_cd"));
                    $buffCdUi.ui.goToAndStop(this.buffuiItem.length);
                    $buffCdUi.cd = this.perent.addChild(this.cdRender.getComponent("a_buff_mask"));
                    $buffCdUi.ui.x = $buffCdUi.ui.x + this.buffuiItem.length * 28;
                    $buffCdUi.cd.x = $buffCdUi.ui.x;
                    $buffCdUi.cd.y = $buffCdUi.ui.y;
                    $buffCdUi.cd.width = $buffCdUi.ui.width;
                    $buffCdUi.cd.height = $buffCdUi.ui.height;
                    this.ctxIconPic($buffCdUi.ui, keynum);
                    $buffCdUi.endTM = $buff.item[keynum];
                    this.buffuiItem.push($buffCdUi);
                    //  //console.log("显示", keynum);
                }
            }
        };
        TopBuffUiList.prototype.ctxIconPic = function ($ui, $key) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/buff/" + $key + ".png", LoadManager.IMG_TYPE, function ($img) {
                var $toRect = $ui.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $img.width, $img.height);
                $ui.drawToCtx(_this.render.uiAtlas, $ctx);
            });
        };
        TopBuffUiList.prototype.needShowById = function ($id) {
            for (var i = 0; i < this._showListArr.length; i++) {
                if (this._showListArr[i] == $id) {
                    return true;
                }
            }
            return false;
        };
        TopBuffUiList.prototype.clear = function () {
            if (this.buffuiItem) {
                while (this.buffuiItem.length) {
                    var $BuffCdUi = this.buffuiItem.pop();
                    this.perent.removeChild($BuffCdUi.ui);
                    this.perent.removeChild($BuffCdUi.cd);
                }
            }
            else {
                this.buffuiItem = new Array;
            }
        };
        TopBuffUiList.cdKeyLen = new Object;
        return TopBuffUiList;
    }());
    topui.TopBuffUiList = TopBuffUiList;
    var TopUiBuffPanel = /** @class */ (function (_super) {
        __extends(TopUiBuffPanel, _super);
        function TopUiBuffPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.top = 0;
            _this.left = 0;
            return _this;
        }
        TopUiBuffPanel.prototype.setRender = function ($top, $cd) {
            this._topRender = $top;
            this._cdRender = $cd;
            this.loadConfigCom();
        };
        TopUiBuffPanel.prototype.loadConfigCom = function () {
            this.topBuffUiList = new TopBuffUiList(this, this._topRender, this._cdRender);
        };
        TopUiBuffPanel.prototype.refresh = function () {
            this.topBuffUiList.refresh();
            /*
            if (GuidData.map.showAreaById(AreaType.topleft_1)) {
                this.left = 0
            } else {
                this.left = -1000;
            }
            */
        };
        return TopUiBuffPanel;
    }(UIVirtualContainer));
    topui.TopUiBuffPanel = TopUiBuffPanel;
})(topui || (topui = {}));
//# sourceMappingURL=TopUiBuffPanel.js.map