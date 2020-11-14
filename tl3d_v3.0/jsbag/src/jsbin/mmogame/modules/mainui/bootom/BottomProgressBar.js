var bottomui;
(function (bottomui) {
    var Progress_line = /** @class */ (function () {
        function Progress_line($perent, $bottom, $mid) {
            var _this = this;
            this.perent = $perent;
            this.uiAtlas = $bottom.uiAtlas;
            this.c_progress_bg = $bottom.getComponent("c_progress_bg");
            this.c_progress_bar = $mid.getComponent("c_progress_bar");
            this.c_progress_bar.uvScale = 0;
            this.c_progress_label = $bottom.getComponent("c_progress_label");
            this.c_progress_num = $bottom.getComponent("c_progress_num");
            this.c_progress_fen = $bottom.getComponent("c_progress_fen");
            this.uilistArr = new Array();
            this.uilistArr.push(this.c_progress_bg);
            this.uilistArr.push(this.c_progress_bar);
            this.uilistArr.push(this.c_progress_label);
            this.uilistArr.push(this.c_progress_num);
            this.uilistArr.push(this.c_progress_fen);
            Progress_line._instance = this;
            this.updataFun = function (t) { _this.updata(t); };
        }
        Progress_line.prototype.show = function ($num, $bfun, $type) {
            if ($type === void 0) { $type = 3; }
            if (!this.c_progress_bar.parent) {
                this.c_progress_bar.uvScale = 0;
                this.showType = $type;
                this.c_progress_label.goToAndStop(this.showType);
                this.perent.setUiListVisibleByItem(this.uilistArr, true);
                this.statTime = TimeUtil.getTimer();
                this.cdEndTime = this.statTime + $num;
                this.backFun = $bfun;
                TimeUtil.addFrameTick(this.updataFun);
            }
        };
        Progress_line.prototype.updata = function (t) {
            var $sp = this.cdEndTime - TimeUtil.getTimer();
            if ($sp < 0) {
                if (this.backFun) {
                    this.backFun();
                }
                this.hide();
            }
            else {
                $sp = $sp / (this.cdEndTime - this.statTime);
                $sp = 1 - $sp;
                this.c_progress_bar.uvScale = $sp;
                if (this.showType == 0) {
                    this.uiAtlas.clearCtxTextureBySkilname(this.c_progress_num.skinName);
                }
                else {
                    ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.c_progress_num.skinName, String(Math.floor($sp * 100)), ArtFont.num64, TextAlign.RIGHT);
                }
            }
        };
        Progress_line.prototype.hide = function () {
            if (this.c_progress_bar.parent) {
                this.perent.setUiListVisibleByItem(this.uilistArr, false);
                TimeUtil.removeFrameTick(this.updataFun);
            }
        };
        Progress_line.getInstance = function () {
            return this._instance;
        };
        return Progress_line;
    }());
    bottomui.Progress_line = Progress_line;
})(bottomui || (bottomui = {}));
//# sourceMappingURL=BottomProgressBar.js.map