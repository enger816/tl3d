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
var whisper;
(function (whisper) {
    var WhisperChatVo = /** @class */ (function () {
        function WhisperChatVo() {
        }
        return WhisperChatVo;
    }());
    whisper.WhisperChatVo = WhisperChatVo;
    var whisperChatListPanel = /** @class */ (function (_super) {
        __extends(whisperChatListPanel, _super);
        function whisperChatListPanel() {
            var _this = _super.call(this) || this;
            /**
             * refreshData
             */
            _this.guid = "";
            _this.left = 428;
            _this.top = 100;
            _this.setShowLevel(6);
            return _this;
        }
        whisperChatListPanel.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            this.initData();
        };
        whisperChatListPanel.prototype.initData = function () {
            var ary = new Array();
            this.setData(ary, WhisperChatRender, 332, 322, 0, 87, 3, 512, 256, 1, 6);
        };
        whisperChatListPanel.prototype.refreshDataByNewData = function ($guid) {
            this.guid = $guid;
            var $arr = Chat.ChatModel.getInstance().getChatItemByToGuid($guid);
            var $sListItemData = this.getData($arr);
            this.refreshData($sListItemData);
            this.scrollIdx($sListItemData.length - 1);
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        };
        whisperChatListPanel.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var $data = new WhisperChatVo();
                $data.basevo = $ary[i];
                $data.items = [11];
                $data.id = i;
                var item = new SListItemData;
                item.data = $data;
                // item.id = i;
                ary.push(item);
            }
            return ary;
        };
        whisperChatListPanel.prototype.show = function ($guid) {
            UIManager.getInstance().addUIContainer(this);
            this.refreshDataByNewData($guid);
        };
        whisperChatListPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return whisperChatListPanel;
    }(SList));
    whisper.whisperChatListPanel = whisperChatListPanel;
    var WhisperChatRender = /** @class */ (function (_super) {
        __extends(WhisperChatRender, _super);
        function WhisperChatRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        WhisperChatRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.BSbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "BSbg", 0, 21, 332, 60, 18, 18);
            $container.addChild(this.BSbg);
            this.BSbg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.BSname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BSname", 8, 0, 100, 20);
            $container.addChild(this.BSname);
            this.BStime = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BStime", 108, 0, 100, 20);
            $container.addChild(this.BStime);
            this.BStext = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BStext", 9, 32, 317, 39);
            $container.addChild(this.BStext);
        };
        Object.defineProperty(WhisperChatRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyrender();
                }
            },
            enumerable: true,
            configurable: true
        });
        WhisperChatRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        WhisperChatRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var vo = this.itdata.data.basevo;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BSname.skinName, getBaseName(vo.s2c_send_chat.name), 16, TextAlign.LEFT, vo.isSelf ? ColorType.Green2ca937 : ColorType.color4392ff);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BStime.skinName, vo.time, 16, TextAlign.LEFT, vo.isSelf ? ColorType.Green2ca937 : ColorType.color4392ff);
                // this.drawTxt(vo);
                LabelTextFont.writeTextAutoVerticalCenter(this.uiAtlas, this.BStext.skinName, vo.contentTxt, 16, ColorType.Brown7a2f21, 300);
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.BSbg.skinName, UIData.publicUi, PuiData.CHATBG);
            }
        };
        // private drawTxt($vo: Chat.ChatVo ) {
        //     var $skillrec: UIRectangle = this.uiAtlas.getRec(this.BStext.skinName);
        //     var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
        //     $ctx.font = (true ? "bolder " : "") + " " + 16 + "px " + UIData.font;
        //     FaceFontLabel.wrapFaceText($ctx, ColorType.Brown7a2f21 + $vo.contentTxt, 16, ColorType.Brown7a2f21, 1, 1, 300, 20,false)
        //     this.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
        // }
        WhisperChatRender.prototype.setnull = function () {
            UiDraw.clearUI(this.BSname);
            UiDraw.clearUI(this.BStime);
            UiDraw.clearUI(this.BSbg);
            UiDraw.clearUI(this.BStext);
        };
        WhisperChatRender.prototype.equClick = function (evt) {
            var _this = this;
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
                PopMenuUtil.show(this.itdata, function (value) { _this.popBackFun(value); }, evt.x, evt.y);
            }
        };
        WhisperChatRender.prototype.popBackFun = function (value) {
            if (value == 11) {
                // //console.log("复制");
                var aa = new whisper.WhisperUiEvent(whisper.WhisperUiEvent.COPY_ONE_MSG_EVENT);
                aa.data = this.itdata.data.basevo.contentTxt;
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        return WhisperChatRender;
    }(SListItem));
    whisper.WhisperChatRender = WhisperChatRender;
})(whisper || (whisper = {}));
//# sourceMappingURL=whisperChatListPanel.js.map