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
var map;
(function (map) {
    var MapLinePanel = /** @class */ (function (_super) {
        __extends(MapLinePanel, _super);
        function MapLinePanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        MapLinePanel.prototype.setRender = function ($bottom, $top) {
            this._bottomRender = $bottom;
            this._topRender = $top;
            this.loadConfigCom();
        };
        MapLinePanel.prototype.loadConfigCom = function () {
        };
        MapLinePanel.prototype.clearFramAll = function () {
            while (this.lineFramList && this.lineFramList.length) {
                var indx = this.lineFramList.length - 1;
                this.lineFramList[indx].removeEventListener(InteractiveEvent.Up, this.butClik, this);
                this.removeChild(this.lineFramList[indx]);
                this.lineFramList.pop();
            }
            this.lineFramList = new Array();
        };
        MapLinePanel.prototype.showLinePanel = function () {
            this.clearFramAll();
            var $vo = map.MapModel.getInstance().mapLineData;
            for (var i = 0; i < 10; i++) {
                if ($vo.info[i] || i < 4) {
                    var rate = 0;
                    if ($vo.info[i]) {
                        rate = $vo.info[i].rate;
                    }
                    var line_label = this.addChild(this._topRender.getComponent("line_label"));
                    line_label.goToAndStop(i);
                    line_label.data = i;
                    line_label.addEventListener(InteractiveEvent.Up, this.butClik, this);
                    line_label.x = 680;
                    line_label.y = 75 + i * 40;
                    this.drawToCtxB(line_label, i + 1, rate);
                    this.lineFramList.push(line_label);
                }
            }
        };
        MapLinePanel.prototype.drawToCtxB = function ($ui, $id, $rate) {
            var $uiRec = this._bottomRender.uiAtlas.getRec($ui.skinName);
            var $toRect = $ui.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var $bgRect = map.MapNpcListItemRender.uiAtlas.getRec("S_line_bg");
            $ctx.drawImage(map.MapNpcListItemRender.uiAtlas.useImg, $bgRect.pixelX, $bgRect.pixelY, $bgRect.pixelWitdh, $bgRect.pixelHeight, 0, 0, $toRect.width, $toRect.height);
            var tpos = new Vector2D(30, 10);
            var $rateStr = "S_yellow";
            if ($rate < 60) {
                $rateStr = "S_green";
            }
            if ($rate > 95) {
                $rateStr = "S_red";
            }
            var $txtBRect = map.MapNpcListItemRender.uiAtlas.getRec($rateStr);
            $ctx.drawImage(map.MapNpcListItemRender.uiAtlas.useImg, $txtBRect.pixelX, $txtBRect.pixelY, $txtBRect.pixelWitdh, $txtBRect.pixelHeight, 30 + tpos.x, 0 + tpos.y, $txtBRect.pixelWitdh, $txtBRect.pixelHeight);
            ArtFont.getInstance().writeFontToCtxCenten($ctx, String($id), ArtFont.num1, 10 + tpos.x, 0 + tpos.y);
            $ui.drawToCtx(this._bottomRender.uiAtlas, $ctx);
        };
        MapLinePanel.prototype.changeLine = function (value) {
            //console.log("换线" + (value + 1));
            NetManager.getInstance().protocolos.change_line(value + 1);
        };
        MapLinePanel.prototype.butClik = function (evt) {
            this.changeLine(evt.target.data);
            this.parent.showLinePanel();
            this.parent.close();
        };
        return MapLinePanel;
    }(UIVirtualContainer));
    map.MapLinePanel = MapLinePanel;
})(map || (map = {}));
//# sourceMappingURL=MapLinePanel.js.map