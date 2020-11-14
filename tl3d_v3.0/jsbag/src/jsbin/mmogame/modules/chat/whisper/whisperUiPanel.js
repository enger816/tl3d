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
    var whisperUiPanel = /** @class */ (function (_super) {
        __extends(whisperUiPanel, _super);
        function whisperUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            _this.setBlackBg();
            _this._bootomRender = new UIRenderComponent();
            _this.addRender(_this._bootomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._faceRender = new UIRenderComponent();
            _this.addRender(_this._faceRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        whisperUiPanel.prototype.dispose = function () {
            this._faceRender.dispose();
            this._faceRender = null;
            this._midRender.dispose();
            this._midRender = null;
            if (this.whisperFriendList) {
                this.whisperFriendList.dispose();
                this.whisperFriendList = null;
            }
            if (this.whisperChatListPanel) {
                this.whisperChatListPanel.dispose();
                this.whisperChatListPanel = null;
            }
            // if (this.applyList) {
            //     this.applyList.dispose();
            //     this.applyList = null;
            // }
            _super.prototype.dispose.call(this);
        };
        whisperUiPanel.prototype.applyLoad = function () {
            var _this = this;
            this._bootomRender.uiAtlas = WindowUi.winUIAtlas;
            this._midRender.uiAtlas.setInfo("ui/uidata/chat/whisper/whisper.xml", "ui/uidata/chat/whisper/whisper.png", function () { _this.loadConfigCom(); });
        };
        whisperUiPanel.prototype.loadConfigCom = function () {
            this._faceRender.uiAtlas = this._midRender.uiAtlas;
            this.a_sendbtn = this.addEvntBut("a_sendbtn", this._faceRender);
            this.a_face = this.addEvntBut("a_face", this._faceRender);
            this.addUIList(["a_chatbg", "a_title"], this._midRender);
            this.a_txtbg = this.addEvntBut("a_txtbg", this._midRender);
            this.a_txt = this.addChild(this._faceRender.getComponent("a_txt"));
            this.indexSlist = this.addChild(this._midRender.getComponent("indexSlist"));
            this.indexSlist1 = this.addChild(this._midRender.getComponent("indexSlist1"));
            var cnew_bg_yellow = this.addChild(this._bootomRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._midRender);
            this._bootomRender.applyObjData();
            this._msg = "玩家输入聊天";
            this._type = false;
            this.refreshInputBfun(this._msg);
            this.applyLoadComplete();
        };
        whisperUiPanel.prototype.refreshData = function ($data) {
            this._itdata = $data;
            if (!this.whisperChatListPanel) {
                this.whisperChatListPanel = new whisper.whisperChatListPanel();
                this.whisperChatListPanel.init(this._midRender.uiAtlas);
            }
            this.whisperChatListPanel.show($data.guid);
        };
        whisperUiPanel.prototype.copyTxt = function ($txt) {
            if (this._type) {
                this._msg += $txt;
            }
            else {
                this._msg = $txt;
            }
            this._type = true;
            this.refreshInputBfun(this._msg);
        };
        whisperUiPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.a_face:
                    var $skd = new faceui.FaceUiEvent(faceui.FaceUiEvent.SHOW_FACE_UI_PANEL);
                    $skd.data = { bfun: function ($faceStr) { _this.faceFunBack($faceStr); } };
                    ModuleEventManager.dispatchEvent($skd);
                    break;
                case this.a_sendbtn:
                    if (this.checkStr(this._msg) && this._type && this._itdata && this._cansend && this._itdata.inOnline) {
                        this._cansend = false;
                        NetManager.getInstance().protocolos.chat_whisper(this._itdata.guid, this._msg);
                        this._msg = "玩家输入聊天";
                        this._type = false;
                        this.refreshInputBfun(this._msg);
                        TimeUtil.addTimeOut(3000, function () {
                            _this._cansend = true;
                        });
                    }
                    else {
                        if (!this._itdata) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请选择聊天对象", 99);
                            return;
                        }
                        if (!this._type) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不能发送空字符", 99);
                            return;
                        }
                        if (!this.checkStr(this._msg)) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "含敏感词汇,请更正", 99);
                            return;
                        }
                        if (!this._cansend) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您说话太快了", 99);
                            return;
                        }
                        if (!this._itdata.inOnline) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "对方不在线", 99);
                            return;
                        }
                    }
                    break;
                case this.e_close:
                    this.hide();
                    break;
                case this.a_txtbg:
                    InputPanel.show(function ($str) { _this.inputBfun($str); }, this._type ? this._msg : "", 0, 12);
                    break;
                default:
                    break;
            }
        };
        whisperUiPanel.prototype.faceFunBack = function ($faceStr) {
            if (this._type) {
                this._msg += $faceStr;
            }
            else {
                this._type = true;
                this._msg = $faceStr;
            }
            this.refreshInputBfun(this._msg);
        };
        //Fix
        whisperUiPanel.prototype.checkStr = function ($str) {
            return true;
        };
        whisperUiPanel.prototype.inputBfun = function ($str) {
            if ($str.length > 0) {
                this._type = true;
                this._msg = $str;
            }
            else {
                this._type = false;
                this._msg = "玩家输入聊天";
            }
            this.refreshInputBfun(this._msg);
        };
        whisperUiPanel.prototype.refreshInputBfun = function ($str) {
            LabelTextFont.writeSingleLabel(this._faceRender.uiAtlas, this.a_txt.skinName, $str, 16, TextAlign.LEFT, ColorType.colorb96d49);
        };
        whisperUiPanel.prototype.show = function ($guid) {
            UIManager.getInstance().addUIContainer(this);
            if (!this.whisperFriendList) {
                this.whisperFriendList = new WhisperFriendList();
                this.whisperFriendList.init(this._midRender.uiAtlas);
            }
            this.whisperFriendList.show($guid);
            this._cansend = true;
            this.resize();
        };
        whisperUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.whisperFriendList) {
                this.whisperFriendList.hide();
            }
            if (this.whisperChatListPanel) {
                this.whisperChatListPanel.hide();
            }
        };
        whisperUiPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.whisperFriendList) {
                this.whisperFriendList.left = this.indexSlist.parent.x / UIData.Scale + this.indexSlist.x;
                this.whisperFriendList.top = this.indexSlist.parent.y / UIData.Scale + this.indexSlist.y;
            }
            if (this.whisperChatListPanel) {
                this.whisperChatListPanel.left = this.indexSlist1.parent.x / UIData.Scale + this.indexSlist1.x;
                this.whisperChatListPanel.top = this.indexSlist1.parent.y / UIData.Scale + this.indexSlist1.y;
            }
        };
        return whisperUiPanel;
    }(WindowMinUi));
    whisper.whisperUiPanel = whisperUiPanel;
    /**
     * 好友列表
     */
    var WhisperFriendList = /** @class */ (function (_super) {
        __extends(WhisperFriendList, _super);
        function WhisperFriendList() {
            var _this = _super.call(this) || this;
            _this.left = 182;
            _this.top = 97;
            return _this;
        }
        WhisperFriendList.prototype.init = function ($atlas) {
            this.baseAtlas = $atlas;
            this.initData();
        };
        WhisperFriendList.prototype.initData = function () {
            var ary = new Array();
            this.setData(ary, WhisperFriendRender, 224, 397, 0, 90, 4, 256, 512, 1, 6);
        };
        WhisperFriendList.prototype.refreshDataByNewData = function ($guid) {
            //console.log("---创建_slistdata");
            var $ary = GuidData.social.getFriendList();
            this._slistdata = this.getData($ary);
            this.refreshData(this._slistdata);
            this.selectItem($guid, this._slistdata);
        };
        WhisperFriendList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        WhisperFriendList.prototype.selectItem = function ($guid, $ary) {
            var index = 0;
            for (var i = 0; i < $ary.length; i++) {
                var a = $ary[i].data;
                if (a.guid == $guid) {
                    // index = a.id
                    index = i;
                    break;
                }
            }
            // this.setSelectIndexCopy(index);
            this.setSelectIndex(index);
        };
        /**
         * 数据变化时，更新数据源
         */
        WhisperFriendList.prototype.resetData = function () {
            if (this._slistdata) {
                var $ary = GuidData.social.getFriendList();
                var chatary = Chat.ChatModel.getInstance().getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
                var vo = chatary[chatary.length - 1];
                if (vo && !vo.showLast && vo.s2c_send_chat.guid != GuidData.player.getGuid()) {
                    for (var index = 0; index < $ary.length; index++) {
                        if ($ary[index].guid == vo.s2c_send_chat.guid) {
                            var newItem = $ary.splice(index, 1);
                            $ary.unshift(newItem[0]);
                            //把新消息显示到第一条。
                            break;
                        }
                    }
                }
                for (var i = 0; i < this._slistdata.length; i++) {
                    this._slistdata[i].data = $ary[i];
                }
                this.refreshDraw();
                // this.setSelectIndexCopy(this.getCurrentSelectIndex());
                this.setSelectIndex(this.getCurrentSelectIndex());
            }
        };
        WhisperFriendList.prototype.show = function ($guid) {
            UIManager.getInstance().addUIContainer(this);
            this.refreshDataByNewData($guid);
        };
        WhisperFriendList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return WhisperFriendList;
    }(SList));
    whisper.WhisperFriendList = WhisperFriendList;
    var WhisperFriendRender = /** @class */ (function (_super) {
        __extends(WhisperFriendRender, _super);
        function WhisperFriendRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        WhisperFriendRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.ASbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "ASbg", 0, 0, 224, 87, 10, 10);
            $container.addChild(this.ASbg);
            this.ASbg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.ASicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASicon", 8, 11, 68, 68);
            $container.addChild(this.ASicon);
            this.ASname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASname", 84, 12, 100, 20);
            $container.addChild(this.ASname);
            this.ASvip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASvip", 186, 16, 29, 14);
            $container.addChild(this.ASvip);
            this.ASfac = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASfac", 84, 33, 100, 20);
            $container.addChild(this.ASfac);
            this.ASforce = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASforce", 84, 56, 135, 20);
            $container.addChild(this.ASforce);
        };
        Object.defineProperty(WhisperFriendRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyrender();
                }
                if (val) {
                    var $evt = new whisper.WhisperUiEvent(whisper.WhisperUiEvent.SELECT_ITEM_EVENT);
                    $evt.data = this.itdata;
                    ModuleEventManager.dispatchEvent($evt);
                }
            },
            enumerable: true,
            configurable: true
        });
        WhisperFriendRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        WhisperFriendRender.prototype.refreshDraw = function () {
            //console.log("--this.itdata-", this.itdata);
            this.render(this.itdata);
        };
        WhisperFriendRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                if (this.selected) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ASbg.skinName, UIData.publicUi, PuiData.Slist_select);
                }
                else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ASbg.skinName, UIData.publicUi, PuiData.Slist_nselect);
                }
                this.setIcon(this.itdata);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.ASname.skinName, getBaseName(this.itdata.data.name), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                this.uiAtlas.upDataPicToTexture(getVipIconUrl(this.itdata.data.vip), this.ASvip.skinName);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.ASfac.skinName, this.itdata.data.faction == "" ? "暂无家族" : getBaseName(this.itdata.data.faction), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.ASforce.skinName, "战力 " + Snum(this.itdata.data.force), 16, TextAlign.LEFT, ColorType.Green2ca937);
            }
        };
        WhisperFriendRender.prototype.setnull = function () {
            UiDraw.clearUI(this.ASicon);
            UiDraw.clearUI(this.ASname);
            UiDraw.clearUI(this.ASvip);
            UiDraw.clearUI(this.ASfac);
            UiDraw.clearUI(this.ASforce);
            UiDraw.clearUI(this.ASbg);
        };
        WhisperFriendRender.prototype.setIcon = function ($obj) {
            var _this = this;
            IconManager.getInstance().getIcon(getTouPic($obj.data.gender), function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.ASicon.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                //绘制底色
                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                //绘制头像
                ctx.drawImage($img, 0, 0, 82, 82, 3, 3, 62, 62);
                //选中高亮绘制
                if ($obj.selected) {
                    UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHR_C_66, new Rectangle(1, 1, 66, 66), UIData.publicUi);
                }
                if (!$obj.data.inOnline) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight));
                }
                // //console.log("--$obj.data.level-", $obj.data.level);
                // LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($obj.data.level), 16, 66, 45, TextAlign.RIGHT, ColorType.Brown7a2f21);
                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_LEV_BG, new Rectangle(15, 50, 53, 18), UIData.publicUi);
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + String($obj.data.level), 14, 42, 50, TextAlign.CENTER);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        WhisperFriendRender.prototype.equClick = function (evt) {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
            }
        };
        return WhisperFriendRender;
    }(SListItem));
    whisper.WhisperFriendRender = WhisperFriendRender;
})(whisper || (whisper = {}));
//# sourceMappingURL=whisperUiPanel.js.map