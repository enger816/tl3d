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
var msgtip;
(function (msgtip) {
    var MsgEffectsMoveData = /** @class */ (function () {
        function MsgEffectsMoveData() {
        }
        return MsgEffectsMoveData;
    }());
    msgtip.MsgEffectsMoveData = MsgEffectsMoveData;
    var MsgEffectsIconRender = /** @class */ (function (_super) {
        __extends(MsgEffectsIconRender, _super);
        function MsgEffectsIconRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MsgEffectsIconRender.prototype.makeData = function () {
            if (this._data) {
                this.msgEffectsMoveData = this.data;
                var $typeStr = PuiData.A_YUANBAO;
                switch (this.msgEffectsMoveData.MONEY_TYPE) {
                    case SharedDef.MONEY_TYPE_SILVER:
                        $typeStr = PuiData.A_YINBI;
                        break;
                    case 1:
                        $typeStr = PuiData.A_SHOULING;
                        break;
                    case 2:
                        $typeStr = PuiData.A_JINGHUA;
                        break;
                    case 101:
                        $typeStr = PuiData.A_HIGHT_START;
                        break;
                    case 107:
                        $typeStr = PuiData.A_HIGHT_START;
                        break;
                    default:
                        break;
                }
                if (this.afterStr != $typeStr) {
                    //console.log("更新")
                    UiDraw.uiAtlasDrawImg(this.parent.uiAtlas, this.textureStr, UIData.publicUi, $typeStr);
                }
                this.afterStr = $typeStr;
                this.ui.width = 24;
                this.ui.height = 24;
            }
        };
        MsgEffectsIconRender.prototype.update = function () {
            if (this.msgEffectsMoveData.startTM < TimeUtil.getTimer()) {
                if (this.msgEffectsMoveData.endTM < TimeUtil.getTimer()) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
                else {
                    var $nTime = (TimeUtil.getTimer() - this.msgEffectsMoveData.startTM) / (this.msgEffectsMoveData.endTM - this.msgEffectsMoveData.startTM);
                    var nAdd = MathClass.easeInOut($nTime, 0, 1, 1);
                    this.ui.height = 24 - (nAdd * 14);
                    this.ui.width = 24 - (nAdd * 14);
                    var $bezierPos = (MsgEffectsIconRender.drawbezier([this._data.pos, this._data.bezierPos, this._data.toPos], $nTime));
                    this.ui.x = $bezierPos.x;
                    this.ui.y = $bezierPos.y;
                }
            }
            else {
                this.ui.x = 3000;
            }
        };
        MsgEffectsIconRender.drawbezier = function (_array, _time) {
            var _newarray = new Array();
            if (_array.length == 0) {
                return new Vector2D();
            }
            for (var i = 0; i < _array.length; i++) {
                _newarray.push(new Vector2D(_array[i].x, _array[i].y));
            }
            while (_newarray.length > 1) {
                for (var j = 0; j < _newarray.length - 1; j++) {
                    this.mathmidpoint(_newarray[j], _newarray[j + 1], _time);
                }
                _newarray.pop();
            }
            return _newarray[0];
        };
        MsgEffectsIconRender.mathmidpoint = function (a, b, t) {
            var _nx, _ny, _nz;
            _nx = a.x + (b.x - a.x) * t;
            _ny = a.y + (b.y - a.y) * t;
            a.x = _nx;
            a.y = _ny;
        };
        return MsgEffectsIconRender;
    }(Disp2DBaseText));
    msgtip.MsgEffectsIconRender = MsgEffectsIconRender;
    var MsgEffectsManager = /** @class */ (function () {
        function MsgEffectsManager() {
            var _this = this;
            this._dis2DUIContianerPanel = new Dis2DUIContianerPanel(MsgEffectsIconRender, new Rectangle(0, 0, 32, 32), 15);
            this.frameUpFun = function (t) { _this.upData(t); };
        }
        MsgEffectsManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new MsgEffectsManager();
            }
            return this._instance;
        };
        MsgEffectsManager.prototype.show = function () {
            if (!this._dis2DUIContianerPanel.hasStage) {
                UIManager.getInstance().addUIContainer(this._dis2DUIContianerPanel);
                TimeUtil.addFrameTick(this.frameUpFun);
            }
        };
        MsgEffectsManager.prototype.setPopMsgVo = function (value) {
            this.show();
            this._dis2DUIContianerPanel.showTemp(value);
        };
        MsgEffectsManager.prototype.upData = function (t) {
            this._dis2DUIContianerPanel.update(0);
            for (var i = 0; i < this._dis2DUIContianerPanel.renderList.length; i++) {
                this._dis2DUIContianerPanel.renderList[i].update();
            }
            if (this._dis2DUIContianerPanel.hasStage) {
                if (this._dis2DUIContianerPanel.getUiItemLen() == 0) {
                    UIManager.getInstance().removeUIContainer(this._dis2DUIContianerPanel);
                }
            }
            else {
                TimeUtil.removeFrameTick(this.frameUpFun);
            }
        };
        return MsgEffectsManager;
    }());
    msgtip.MsgEffectsManager = MsgEffectsManager;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgEffectsIcon.js.map