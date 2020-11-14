var logo;
(function (logo) {
    var LogoLoad = /** @class */ (function () {
        function LogoLoad() {
            this.loadCav = document.getElementById('LoadCanvas');
            this.loadBigWidth();
            this.loadTittlePic();
            this.loadLoadBg();
            this.loadLoadBar();
        }
        LogoLoad.prototype.loadLoadBg = function () {
            var _this = this;
            this._loadbgImg = new Image();
            this._loadbgImg.onload = function () {
                _this.drawImgToCtx();
            };
            this._loadbgImg.src = "res/ui/progressbg.png";
        };
        LogoLoad.prototype.loadLoadBar = function () {
            var _this = this;
            this._loadbarImg = new Image();
            this._loadbarImg.onload = function () {
                _this.drawImgToCtx();
            };
            this._loadbarImg.src = "res/ui/progressbar.png";
        };
        LogoLoad.prototype.loadTittlePic = function () {
            var _this = this;
            this._logoimg = new Image();
            this._logoimg.onload = function () {
                _this.drawImgToCtx();
            };
            this._logoimg.src = "res/ui/logo.png";
        };
        LogoLoad.getInstance = function () {
            if (!this._instance) {
                this._instance = new LogoLoad();
            }
            return this._instance;
        };
        LogoLoad.prototype.showLoadInfo = function ($str) {
            this.showStr = $str;
            this.drawImgToCtx();
        };
        LogoLoad.prototype.loadBigWidth = function () {
            var _this = this;
            this._bigWidthimg = new Image();
            this._bigWidthimg.onload = function () {
                _this.drawImgToCtx();
            };
            this._bigWidthimg.src = "res/ui/b1.jpg";
        };
        LogoLoad.prototype.loadBigHeight = function () {
            var _this = this;
            this._bigHeightimg = new Image();
            this._bigHeightimg.onload = function () {
                _this.drawImgToCtx();
            };
            this._bigHeightimg.src = "res/ui/b2.jpg";
        };
        LogoLoad.prototype.drawImgToCtx = function () {
            var $ctx = this.loadCav.getContext("2d");
            var stageWidth = document.body.clientWidth;
            var stageHeight = document.body.clientHeight;
            if (document.body.clientWidth < document.body.clientHeight) {
                stageWidth = document.body.clientHeight;
                stageHeight = document.body.clientWidth;
                this.loadCav.style.transform = "matrix(0,1,-1,0," + stageHeight + ",0)";
            }
            else {
                this.loadCav.style.transform = "matrix(1,0,0,1,0,0)";
            }
            this.loadCav.style.transformOrigin = "0px 0px 0px";
            this.loadCav.width = stageWidth;
            this.loadCav.height = stageHeight;
            $ctx.fillStyle = "#000000"; // text color
            $ctx.clearRect(0, 0, this.loadCav.width, this.loadCav.height);
            $ctx.fillStyle = "#000000"; // text color
            $ctx.fillRect(0, 0, this.loadCav.width, this.loadCav.height);
            $ctx.fillStyle = "#4b3002";
            $ctx.fillStyle = "#4b3002";
            var $tx = (this.loadCav.width) / 2;
            var $ty = (this.loadCav.height) / 2;
            if (this._bigWidthimg) {
                $ctx.drawImage(this._bigWidthimg, 0, 0, this.loadCav.width, this.loadCav.height);
            }
            /*
            if (this._logoimg) {
                $ctx.drawImage(this._logoimg, $tx - 278 / 2, $ty - 152 / 2 );
            }
            */
            if (this._loadbgImg) {
                $ctx.drawImage(this._loadbgImg, $tx - 624 / 2, $ty + 110);
            }
            if (this._loadbarImg) {
                $ctx.drawImage(this._loadbarImg, $tx - 604 / 2, $ty + 113, 604 * this.getPercentage(this.showStr) / 100, 7);
            }
            $ctx.font = "24px Helvetica";
            $ctx.fillStyle = "#4b3002";
            $ctx.textBaseline = "top";
            $ctx.textAlign = "left";
            if (this.showStr) {
                $ctx.fillText(this.showStr, $tx - 80, $ty + 140);
            }
            else {
                $ctx.fillText("正在努力加载", $tx - 80, $ty + 140);
            }
        };
        LogoLoad.prototype.getPercentage = function ($str) {
            if ($str && $str.search("%") != -1) {
                var idx = $str.indexOf("%");
                if (idx > 3) {
                    var numA = Number($str.substr(idx - 1, 1));
                    var numB = Number($str.substr(idx - 2, 2));
                    if (isNaN(numB)) {
                        if (isNaN(numA)) {
                            return 0;
                        }
                        return numA;
                    }
                    else {
                        return numB;
                    }
                }
            }
            return 0;
        };
        return LogoLoad;
    }());
    logo.LogoLoad = LogoLoad;
})(logo || (logo = {}));
//# sourceMappingURL=logoload.js.map