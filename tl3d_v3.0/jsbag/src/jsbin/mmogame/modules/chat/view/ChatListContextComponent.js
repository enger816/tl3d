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
var Chat;
(function (Chat) {
    var CellClikBox = /** @class */ (function () {
        function CellClikBox() {
        }
        CellClikBox.prototype.testPoint = function ($x, $y, $rect) {
            if ($x > $rect.x && $x < ($rect.x + $rect.width) && $y > $rect.y && $y < ($rect.y + $rect.height)) {
                return true;
            }
            else {
                return false;
            }
        };
        CellClikBox.prototype.clik = function ($x, $y) {
            if (this.testPoint($x, $y, this.headRect)) {
                return 1;
            }
            else {
                if (this.testPoint($x, $y, this.chatRect)) {
                    return 2;
                }
            }
            return 0;
        };
        return CellClikBox;
    }());
    Chat.CellClikBox = CellClikBox;
    var ChatListContextComponent = /** @class */ (function (_super) {
        __extends(ChatListContextComponent, _super);
        function ChatListContextComponent() {
            var _this = _super.call(this) || this;
            _this.pageBasePos = new Vector2D(0, 0);
            _this._textureRect = new Rectangle(0, 0, 512, 1024);
            _this._textScale = 1.40;
            _this.textHeight = 220;
            _this.baseFontsize = 12;
            _this.textFontStr = "bolder 22px Georgia";
            _this.lastMcY = 0;
            _this.tempH = 0;
            //计算所有记录所对应的位置;
            _this.totalH = 0;
            _this.textTotalHeight1024 = 0;
            return _this;
        }
        ChatListContextComponent.prototype.makeChatData = function (value) {
            this.refresh();
        };
        ChatListContextComponent.prototype.configUIAtlas = function ($perent) {
            this.chatPanel = $perent;
            this.uiAtlas = new UIAtlas();
            this.uiAtlas.configData = new Array();
            // this.uiAtlas.configData.push(this.uiAtlas.getObject("ccav", 0, 0, ChatPanel.num350, 1024, this._textureRect.width, this._textureRect.height));
            this.uiAtlas.configData.push(this.uiAtlas.getObject("ccav", 0, 0, 512, 1024, this._textureRect.width, this._textureRect.height));
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            this.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this.uiAtlas.ctx);
            this.uiAtlas.ctx.fillStyle = "#ff0000";
            this.uiAtlas.ctx.fillRect(0, 0, 512, 256);
            this.uiAtlas.updateCtx(this.uiAtlas.ctx, 0, 0);
            this.pageMc = this.creatBaseComponent("ccav");
            $perent.addChild(this.pageMc);
            this.pageMc.x = 0;
            this.pageMc.y = 0;
            this.pageMc.width = 512 / this._textScale;
            this.pageMc.height = 1024 / this._textScale;
        };
        ChatListContextComponent.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.pageMc.x = this.pageBasePos.x;
        };
        Object.defineProperty(ChatListContextComponent.prototype, "pagey", {
            get: function () {
                return this.disRect.y;
            },
            set: function (value) {
                var $num = Math.max(value, 0);
                if (this.totalH > this.disRect.height) {
                    $num = Math.min($num, this.totalH - this.disRect.height);
                }
                else {
                    $num = 0;
                }
                this.disRect.y = $num;
                this.resetNewPageMcY();
            },
            enumerable: true,
            configurable: true
        });
        ChatListContextComponent.prototype.uptoCtx = function () {
            this.drawList();
        };
        Object.defineProperty(ChatListContextComponent.prototype, "textScale", {
            get: function () {
                return this._textScale;
            },
            set: function (value) {
                this._textScale = value;
            },
            enumerable: true,
            configurable: true
        });
        ChatListContextComponent.prototype.getCharCellRect = function ($vo) {
            this.uiAtlas.ctx.font = this.textFontStr;
            var $rect = new Rectangle;
            var $metrics = TextRegExp.getTextMetrics(this.uiAtlas.ctx, $vo.contentTxt);
            var $cellNum = Math.ceil($metrics.width / Chat.ChatModel._textWidth + 0.01);
            if ($cellNum == 1) {
                $rect.width = $metrics.width + 50;
            }
            else {
                $rect.width = Chat.ChatModel._textWidth + 50;
            }
            $rect.height = $cellNum * 30 + 20;
            return $rect;
        };
        ChatListContextComponent.prototype.drawSytInfo = function () {
            this.uiAtlas.ctx.font = this.textFontStr;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            //  this.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this.uiAtlas.ctx);
            var $arr = Chat.ChatModel.getInstance().getChatItemByType(SharedDef.CHAT_TYPE_SYSTEM);
            var $totalNh = 0;
            var $beginNum = 0;
            for (var i = ($arr.length - 1); i > 0; i--) {
                var $nh = Chat.ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, ColorType.Brown7a2f21 + $arr[i].contentTxt, 23, 100, 0);
                $totalNh += $nh;
                if ($totalNh > 13) {
                    $beginNum = i;
                    i = 0;
                }
            }
            console.log("$beginNum", $beginNum);
            this.uiAtlas.ctx.clearRect(0, 0, this._textureRect.width, this._textureRect.height);
            var th = 0;
            for (var i = $beginNum; i < $arr.length; i++) {
                UiDraw.cxtDrawImg(this.uiAtlas.ctx, PuiData.S_sys_tip1, new Rectangle(10, th * 35 + 40, 63 * 1.2, 30 * 1.2), UIData.publicUi);
                var $contextStr = $arr[i].contentTxt.replace("[ffffff]", ColorType.Brown7a2f21);
                var $nh = Chat.ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, ColorType.Brown7a2f21 + $contextStr, 23, 100, 43 + th * 35);
                th += $nh;
            }
            this.uiAtlas.updateCtx(this.uiAtlas.ctx, 0, 0);
        };
        ChatListContextComponent.prototype.refresh = function () {
            if (Chat.ChatModel.showType == SharedDef.CHAT_TYPE_WHISPER) {
                this._countitem = Chat.ChatModel.getInstance().getWhisperByGuid();
            }
            else {
                this._countitem = Chat.ChatModel.getInstance().getChatItemByType(Chat.ChatModel.showType);
            }
            if (Chat.ChatModel.showType == SharedDef.CHAT_TYPE_SYSTEM) {
                this.drawSytInfo();
                this.pageMc.y = 0;
                this.resize();
                return;
            }
            this.makeItemRect(this._countitem);
            this.disRect = new Rectangle(0, 0, Chat.ChatModel._textWidth, this.textHeight * this.textScale);
            this.mathTempH();
            if (this.totalH > this.disRect.height) {
                this.disRect.y = this.totalH - this.disRect.height;
            }
            else {
                this.disRect.y = 0;
            }
            this.drawList();
            this.pagey = 10000;
            this.resize();
            if (Chat.ChatModel.showType == SharedDef.CHAT_TYPE_WHISPER) {
                ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
            }
        };
        ChatListContextComponent.prototype.getTestItem = function ($arr) {
            if ($arr.length) {
                var $barr = new Array;
                for (var i = 0; i < 50; i++) {
                    var $vo = new Chat.ChatVo();
                    $vo.s2c_send_chat = $arr[0].s2c_send_chat;
                    $vo.isSelf = Math.random() > 0.5;
                    $vo.contentTxt = "就这样吧，" + i;
                    $barr.push($vo);
                }
                return $barr;
            }
            else {
                return $arr;
            }
        };
        ChatListContextComponent.prototype.mathTempH = function () {
            this.tempH = (1024 - this.disRect.height) / 2;
            this.tempH = this.tempH;
        };
        ChatListContextComponent.prototype.drawList = function () {
            if (Chat.ChatModel.showType == SharedDef.CHAT_TYPE_SYSTEM) {
                return;
            }
            this.clikBoxItem = new Array;
            this.mathTempH();
            this.uiAtlas.ctx.font = this.textFontStr;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            this.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this.uiAtlas.ctx);
            var $ty = this.disRect.y; //20偏差
            for (var i = 0; i < this._countitem.length; i++) {
                var $chatVo = this._countitem[i];
                $chatVo.showLast = true;
                if (Chat.ChatModel.showType == SharedDef.CHAT_TYPE_SYSTEM) {
                }
                else {
                    if (!$chatVo.isSelf) {
                        this.drawChatLeftToCtx($chatVo, new Vector2D(40, $chatVo.startY - $ty + this.tempH), $chatVo.rect);
                    }
                    else {
                        this.drawChatRightToCtx($chatVo, new Vector2D(40, $chatVo.startY - $ty + this.tempH), $chatVo.rect);
                    }
                }
            }
            this.lastMcY = this.disRect.y;
            this.resetNewPageMcY();
            this.uiAtlas.updateCtx(this.uiAtlas.ctx, 0, 0);
        };
        ChatListContextComponent.prototype.resetNewPageMcY = function () {
            this.pageMc.y = ((-(this.disRect.y - this.lastMcY)) - this.tempH) / this.textScale;
            this.pageMc.y += this.pageBasePos.y;
            if (Chat.ChatModel.showType == SharedDef.CHAT_TYPE_SYSTEM) {
                this.pageMc.y = 0;
            }
        };
        ChatListContextComponent.prototype.makeItemRect = function (_item) {
            var ty = 0;
            for (var i = 0; i < _item.length; i++) {
                var $chatVo = _item[i];
                this.uiAtlas.ctx.font = this.textFontStr;
                if (!$chatVo.rect) {
                    $chatVo.rect = this.getCharCellRect($chatVo);
                    $chatVo.startY = ty;
                }
                ty = $chatVo.startY + $chatVo.rect.height + 40;
            }
            this.totalH = ty + 20;
        };
        ChatListContextComponent.prototype.drawStytem = function ($vo, $pos, $rect) {
            var $iconRect = new Rectangle($pos.x - 25, $pos.y + 10, 50 * this._textScale, 22 * this._textScale);
            if (Math.random() > 0.5) {
                this.drawImageToCtx("L_system_icon", $iconRect);
            }
            else {
                this.drawImageToCtx("L_tip_icon", $iconRect);
            }
            var $tipStr = "[000000]恭喜[ff0000]玩家名字[000000][000000]恭喜[ff0000]玩家名字[000000][000000]恭喜[ff0000]玩家名字[000000][000000]恭喜[ff0000]玩家名字[000000]获得神器[00ff00]霸王枪[000000]恭喜/大笑[ff0000]玩家名字[000000]获/大笑得神器[00ff00]霸/大笑王枪";
            var lineNum = Chat.ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, $vo.contentTxt, 23, $pos.x + 70, $pos.y + 10);
            return lineNum * 25;
            //   Multi line
        };
        ChatListContextComponent.prototype.drawCharBg = function ($rect, $isLeft) {
            if ($isLeft === void 0) { $isLeft = true; }
            var $minTre = new Rectangle(0, 0, 10, 10);
            var $keyTre = this.panelUiAtlas.getRec("Chat_txt_bg");
            var $uiScale = this._textScale * 1;
            var $cxt = this.uiAtlas.ctx;
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY, $minTre.width, $minTre.height, $rect.x, $rect.y, $minTre.width * $uiScale, $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY + $minTre.height, $minTre.width, $keyTre.pixelHeight - (2 * $minTre.height), $rect.x, $rect.y + $minTre.height * $uiScale, $minTre.width * $uiScale, $rect.height - ($minTre.height * $uiScale * 2));
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY + $keyTre.pixelHeight - $minTre.height, $minTre.width, $minTre.height, $rect.x, $rect.y + $rect.height - ($minTre.height * $uiScale), $minTre.width * $uiScale, $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $minTre.width, $keyTre.pixelY, $keyTre.pixelWitdh - $minTre.width * 2, $minTre.height, $rect.x + $minTre.height * $uiScale, $rect.y, $rect.width - ($minTre.width * $uiScale * 2), $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $minTre.width, $keyTre.pixelY + $keyTre.pixelHeight - $minTre.height, $keyTre.pixelWitdh - $minTre.width * 2, $minTre.height, $rect.x + $minTre.height * $uiScale, $rect.y + $rect.height - $minTre.height * $uiScale, $rect.width - ($minTre.width * $uiScale * 2), $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $keyTre.pixelWitdh - $minTre.width, $keyTre.pixelY, $minTre.width, $minTre.height, $rect.x + $rect.width - $minTre.width * $uiScale, $rect.y, $minTre.width * $uiScale, $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $keyTre.pixelWitdh - $minTre.width, $keyTre.pixelY + $minTre.width, $minTre.width, $keyTre.pixelHeight - (2 * $minTre.height), $rect.x + $rect.width - $minTre.width * $uiScale, $rect.y + $minTre.height * $uiScale, $minTre.width * $uiScale, $rect.height - ($minTre.height * $uiScale * 2));
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $keyTre.pixelWitdh - $minTre.width, $keyTre.pixelY + $keyTre.pixelHeight - $minTre.height, $minTre.width, $minTre.height, $rect.x + $rect.width - $minTre.width * $uiScale, $rect.y + $rect.height - ($minTre.height * $uiScale), $minTre.width * $uiScale, $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $minTre.width, $keyTre.pixelY + $minTre.height, $keyTre.pixelWitdh - $minTre.width * 2, $keyTre.pixelHeight - $minTre.height * 2, $rect.x + $minTre.width * $uiScale, $rect.y + $minTre.height * $uiScale, $rect.width - $minTre.width * $uiScale * 2, $rect.height - $minTre.height * $uiScale * 2);
            var $jiantou = this.panelUiAtlas.getRec($isLeft ? "Chat_left" : "Chat_right");
            if ($isLeft) {
                this.uiAtlas.ctx.drawImage(this.panelUiAtlas.useImg, $jiantou.pixelX, $jiantou.pixelY, $jiantou.pixelWitdh, $jiantou.pixelHeight, $rect.x - 6 * $uiScale, $rect.y + 10 * $uiScale, $jiantou.pixelWitdh * $uiScale, $jiantou.pixelHeight * $uiScale);
            }
            else {
                this.uiAtlas.ctx.drawImage(this.panelUiAtlas.useImg, $jiantou.pixelX, $jiantou.pixelY, $jiantou.pixelWitdh, $jiantou.pixelHeight, $rect.x + $rect.width - 5 * $uiScale, $rect.y + 10 * $uiScale, $jiantou.pixelWitdh * $uiScale, $jiantou.pixelHeight * $uiScale);
            }
        };
        ChatListContextComponent.prototype.outCtx = function (ty, th) {
            if (ty >= (1024 - th - 40)) {
                return true;
            }
            if (ty < 0) {
                return true;
            }
            return false;
        };
        ChatListContextComponent.prototype.getHeadBgSize = function () {
            return 68;
        };
        ChatListContextComponent.prototype.drawChatLeftToCtx = function ($vo, $pos, $rect) {
            if (this.outCtx($pos.y, $rect.height)) {
                return;
            }
            var lineNum = Chat.ChatModel.getTextHeight(this.uiAtlas.ctx, $vo.contentTxt, 23, $pos.x + 70, $pos.y + 40);
            $rect.height = lineNum * 30 + 20;
            var $headRect = new Rectangle($pos.x - 38, $pos.y + 30, this.getHeadBgSize(), this.getHeadBgSize());
            var $chatRect = new Rectangle($pos.x + 50, $pos.y + 30, $rect.width, $rect.height);
            this.drawCharBg($chatRect, true);
            this.drawImageToCtx("Chat_head_round", $headRect);
            //this.writeFontToCtx(this.uiAtlas.ctx, String($vo.s2c_send_chat.lvl), ArtFont.num1, 48, $pos.y+80)
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, PuiData.SKILL_LEV_BG, new Rectangle(20, $pos.y + 84, 53, 18), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtxSetAnchor(this.uiAtlas.ctx, ColorType.Whitefff4d6 + String($vo.s2c_send_chat.lvl), 18, 48, $pos.y + 80, TextAlign.CENTER, ColorType.Whitefff4d6, ColorType.colord27262e);
            Chat.ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, ColorType.Brown7a2f21 + $vo.contentTxt, 23, $pos.x + 70, $pos.y + 40);
            var $chatName = getBaseName($vo.s2c_send_chat.name);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, "[2a3553]" + $chatName, 22, $pos.x + 65, $pos.y + 5, TextAlign.LEFT);
            this.addClikBox($vo, $headRect, $chatRect);
            var metrics = this.uiAtlas.ctx.measureText($chatName);
            var $vipRect = new Rectangle($pos.x + 70 + metrics.width + 10, $pos.y + 2, 71 * 0.8, 35 * 0.8);
            if ($vo.s2c_send_chat.vip > 0) {
                this.drawImageToCtx("Vip_" + String($vo.s2c_send_chat.vip), $vipRect);
            }
        };
        ChatListContextComponent.prototype.drawChatRightToCtx = function ($vo, $pos, $rect) {
            if (this.outCtx($pos.y, $rect.height)) {
                return;
            }
            var k300 = 420;
            var lineNum = Chat.ChatModel.getTextHeight(this.uiAtlas.ctx, $vo.contentTxt, 23, k300 - $rect.width + 10, $pos.y + 35);
            $rect.height = lineNum * 30 + 20;
            var $headRect = new Rectangle(k300 + 15, $pos.y + 30, this.getHeadBgSize(), this.getHeadBgSize());
            var $chatRect = new Rectangle(k300 - $rect.width, $pos.y + 25, $rect.width, $rect.height);
            this.drawCharBg($chatRect, false);
            this.drawImageToCtx("Chat_head_round", $headRect);
            //    this.writeFontToCtx(this.uiAtlas.ctx, String(GuidData.player.getLevel()), ArtFont.num1, $headRect.x + 45, $pos.y + 80)
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, PuiData.SKILL_LEV_BG, new Rectangle(455, $pos.y + 86, 53, 18), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtxSetAnchor(this.uiAtlas.ctx, ColorType.Whitefff4d6 + String(GuidData.player.getLevel()), 18, 482, $pos.y + 83, TextAlign.CENTER, ColorType.Whitefff4d6, ColorType.colord27262e);
            Chat.ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, ColorType.Brown7a2f21 + $vo.contentTxt, 23, k300 - $rect.width + 10, $pos.y + 35);
            this.addClikBox($vo, new Rectangle(), $chatRect);
        };
        ChatListContextComponent.prototype.addClikBox = function ($vo, $headRect, $chatRect) {
            var $cellClikBox = new CellClikBox();
            $cellClikBox.headRect = $headRect;
            $cellClikBox.chatRect = $chatRect;
            $cellClikBox.chatVo = $vo;
            this.clikBoxItem.push($cellClikBox);
        };
        ChatListContextComponent.prototype.drawImageToCtx = function ($key, $rect) {
            var $keyTre = this.panelUiAtlas.getRec($key);
            this.uiAtlas.ctx.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY, $keyTre.pixelWitdh, $keyTre.pixelHeight, $rect.x, $rect.y, $rect.width, $rect.height);
        };
        ChatListContextComponent.prototype.clikEvent = function (evt) {
            ////console.log(evt.x, evt.y)
            ////console.log("UIData.Scale, this._textScale");
            ////console.log(UIData.Scale, this._textScale);
            var _this = this;
            var p = new Vector2D(evt.x / UIData.Scale - this.pageMc.x, evt.y / UIData.Scale - this.pageMc.y);
            p.scaleBy(this._textScale);
            for (var i = 0; i < this.clikBoxItem.length; i++) {
                var $clikNum = this.clikBoxItem[i].clik(p.x, p.y);
                if ($clikNum) {
                    this.clikChatVo = this.clikBoxItem[i].chatVo;
                    if (this.clikChatVo.jasonlink) {
                        var $linkVo = this.clikChatVo.jasonlink;
                        switch ($linkVo.T) {
                            case SharedDef.TEXT_TYPE_POSITION:
                                if (GuidData.map.getMapID() == $linkVo.M) {
                                    quest.QuestModel.getInstance().toplay(new Vector2D($linkVo.X, $linkVo.Y));
                                }
                                else {
                                    GameInstance.questMoveVo = new QuestMoveVo();
                                    GameInstance.questMoveVo.pos = new Vector2D($linkVo.X, $linkVo.Y);
                                    bottomui.Progress_line.getInstance().show(1000, function () {
                                        NetManager.getInstance().protocolos.teleport_map($linkVo.M, GuidData.map.getLineID());
                                    });
                                }
                                ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.HIDE_CHAT_EVENT));
                                break;
                            case SharedDef.TEXT_TYPE_GROUP:
                                console.log("$linkVo", $linkVo.G);
                                NetManager.getInstance().protocolos.group_join_request($linkVo.G);
                                ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.HIDE_CHAT_EVENT));
                                break;
                            default:
                                console.log("还需要处理的消息");
                                break;
                        }
                    }
                    else {
                        // if ($clikNum == 2) {
                        //     itdata.data.items = [11]
                        // }
                        if ($clikNum == 1) {
                            var itdata = new SListItemData();
                            itdata.data = new Object();
                            itdata.data.items = Chat.ChatModel.getInstance().getPopMenuItemByGuid(this.clikChatVo.s2c_send_chat);
                            PopMenuUtil.show(itdata, function (value) { _this.popBackFun(value); }, evt.x, evt.y);
                        }
                    }
                }
            }
        };
        ChatListContextComponent.prototype.popBackFun = function (value) {
            switch (value) {
                case 0:
                    NetManager.getInstance().protocolos.get_player_overview(this.clikChatVo.s2c_send_chat.guid);
                    break;
                case 11:
                    // this.toPaste()
                    //console.log(this.clikChatVo.contentTxt)
                    //    ChatHtmlInput.setChatHtmlText( this.clikChatVo.contentTxt)
                    break;
                case 1:
                    NetManager.getInstance().protocolos.send_faction_invite(this.clikChatVo.s2c_send_chat.guid);
                    //console.log("邀请，", this.clikChatVo.s2c_send_chat.guid,"加入家族")
                    break;
                case 6:
                    //  this.toPinbi()
                    NetManager.getInstance().protocolos.block_chat(this.clikChatVo.s2c_send_chat.guid);
                    msgtip.MsgTipManager.outStrById(22, 38);
                    break;
                case 7:
                    NetManager.getInstance().protocolos.social_add_friend(this.clikChatVo.s2c_send_chat.guid);
                    break;
                case 8:
                    //  this.toWhisper()
                    // ChatModel.toWhisper(this.clikChatVo.s2c_send_chat.name, this.clikChatVo.s2c_send_chat.guid);
                    //console.log("---milao");
                    ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON, this.clikChatVo.s2c_send_chat.guid);
                    break;
                default:
                    break;
            }
        };
        ChatListContextComponent.prototype.addFriend = function () {
            //NetManager.getInstance().protocolos.social_add_friend(this.itdata.data.guid);
            //var $evt = new social.SocialUiEvent(social.SocialUiEvent.REFRESHADDlIST_EVENT);
            //$evt.index = this.itdata.id;
            //ModuleEventManager.dispatchEvent($evt);
        };
        ChatListContextComponent.prototype.testPoint = function ($x, $y, $rect) {
            if ($x > $rect.x && $x < ($rect.x + $rect.width) && $y > $rect.y && $y < ($rect.y + $rect.height)) {
                return true;
            }
            else {
                return false;
            }
        };
        return ChatListContextComponent;
    }(UIRenderComponent));
    Chat.ChatListContextComponent = ChatListContextComponent;
})(Chat || (Chat = {}));
//# sourceMappingURL=ChatListContextComponent.js.map