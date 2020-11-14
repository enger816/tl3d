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
var gift;
(function (gift) {
    var GiftCell = /** @class */ (function () {
        function GiftCell($midRender, $topRender, $perent, $frameId) {
            var _this = this;
            this.select = false;
            this.midRender = $midRender;
            this.topRender = $topRender;
            this.perent = $perent;
            this.ui = this.perent.addChild(this.midRender.getComponent("a_gift_frame"));
            this.ui.goToAndStop($frameId);
            this.ui.addEventListener(InteractiveEvent.Down, this.frameDown, this);
            this.ui.addEventListener(InteractiveEvent.Up, this.frameUp, this);
            this.cell_clear = this.perent.addChild(this.topRender.getComponent("a_cell_clear"));
            this.cell_clear.addEventListener(InteractiveEvent.Down, this.clearDown, this);
            this.cell_clear.addEventListener(InteractiveEvent.Up, this.clearUp, this);
            this._id = $frameId; //初始给独立ID
            this.updataFun = function (t) { _this.updata(t); };
        }
        GiftCell.prototype.frameDown = function (evt) {
            if (this.data) {
                this.clearDown(evt);
                this.downUiPos = new Vector2D(this.ui.x, this.ui.y);
                this.downTime = TimeUtil.getTimer();
                this.lastNum = this.data.num;
                if (gift.GiftModel.getInstance().isCanAddGiffById(this.id)) {
                    TimeUtil.addFrameTick(this.updataFun);
                    Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
                }
                this.select = true;
                this.draw();
                this.perent.cellDownById(this);
            }
        };
        GiftCell.prototype.A_left_bg_MouseUp = function (evt) {
            if (evt === void 0) { evt = null; }
            TimeUtil.removeFrameTick(this.updataFun);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        };
        GiftCell.prototype.updata = function (t) {
            if (this.ui.x == this.downUiPos.x && this.ui.y == this.downUiPos.y) {
                var $useTm = (TimeUtil.getTimer() - this.downTime) - 300;
                $useTm = Math.max(0, $useTm);
                if ($useTm > 0) {
                    if ($useTm < 3000) {
                        this.data.num = Math.min(this.lastNum + Math.floor($useTm / 10), this.data.has);
                    }
                    else {
                        this.data.num = this.data.has;
                    }
                    this.dispatchEventTo();
                    this.draw();
                }
            }
            else {
                this.A_left_bg_MouseUp();
            }
        };
        GiftCell.prototype.frameUp = function (evt) {
            if (this.downPos && this.downPos.x == evt.x && this.downPos.y == evt.y) {
                if (this.data && this.data.num < this.data.has) {
                    if (gift.GiftModel.getInstance().isCanAddGiffById(this.id)) {
                        //console.log(this.id, "+++");
                        this.data.num++;
                        this.dispatchEventTo();
                        this.draw();
                        UIManager.popClikNameFun("a_gift_frame");
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不能选择大于4种礼物", 99);
                    }
                }
            }
        };
        GiftCell.prototype.clearDown = function (evt) {
            this.perent.A_left_bg_MouseDown(evt);
            this.downPos = new Vector2D(evt.x, evt.y);
        };
        GiftCell.prototype.clearUp = function (evt) {
            if (this.downPos.x == evt.x && this.downPos.y == evt.y) {
                if (this.data) {
                    //console.log(this.id, "clear");
                    this.data.num = 0;
                    this.dispatchEventTo();
                    this.draw();
                }
            }
        };
        GiftCell.prototype.dispatchEventTo = function () {
            ModuleEventManager.dispatchEvent(new gift.GiftEvent(gift.GiftEvent.REFRISH_CHANGE_CELL_DATA));
        };
        Object.defineProperty(GiftCell.prototype, "x", {
            set: function (value) {
                this.ui.x = value;
                this.cell_clear.x = value + 70;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GiftCell.prototype, "y", {
            set: function (value) {
                this.ui.y = value;
                this.cell_clear.y = value - 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GiftCell.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                if (this._id != value) {
                    this._id = value;
                    this.refresh();
                }
            },
            enumerable: true,
            configurable: true
        });
        GiftCell.prototype.refresh = function () {
            this.data = gift.GiftModel.getInstance().getResouceById(this._id);
            this.draw();
        };
        GiftCell.prototype.draw = function () {
            var _this = this;
            this.perent.setUiListVisibleByItem([this.cell_clear], false);
            if (this.data) {
                //console.log("绘制", this._id);
                IconManager.getInstance().getIcon(GameData.getIconCopyUrl(this.data.tb_item_template.avatar), function ($img) {
                    if (_this.data) {
                        var $toRect = _this.ui.getSkinCtxRect();
                        var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                        UiDraw.cxtDrawImg($ctx, _this.select ? "TBg12" : "TBg11", new Rectangle(2, 1, 116, 128), UIData.publicUi);
                        UiDraw.cxtDrawImg($ctx, PuiData.PropBg60, new Rectangle((120 - 66) / 2, 10, 66, 66), UIData.publicUi);
                        $ctx.drawImage($img, (120 - 66) / 2 + 5, 10 + 5, 56, 56);
                        var $color = ColorType.Orange853d07;
                        //console.log(this.data)
                        if (_this.data.has == 0) {
                            $color = ColorType.Orange853d07;
                        }
                        else {
                            if (_this.data.has == _this.data.num) {
                                $color = "[ff0000]";
                            }
                        }
                        LabelTextFont.writeSingleLabelToCtx($ctx, $color + _this.data.num + "/" + _this.data.has, 16, $toRect.width / 2, $toRect.height - 16 - 10, TextAlign.CENTER);
                        LabelTextFont.writeSingleLabelToCtx($ctx, _this.data.tb_item_template.getColorName(), 16, $toRect.width / 2, $toRect.height - 35 - 10, TextAlign.CENTER);
                        _this.perent.setUiListVisibleByItem([_this.cell_clear], _this.data.num > 0);
                        _this.ui.drawToCtx(_this.midRender.uiAtlas, $ctx);
                    }
                });
            }
        };
        return GiftCell;
    }());
    gift.GiftCell = GiftCell;
    var GiftPanel = /** @class */ (function (_super) {
        __extends(GiftPanel, _super);
        function GiftPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.cellWidht = 119;
            _this.moveTx = 0;
            _this.basePos = new Vector2D(254, 180);
            _this._pxleft = 0;
            _this._msgTxt = "请输入文字..";
            _this.cutFrameNum = 0;
            _this._lastMouseX = 0;
            _this._lastRoleRotatioinY = 0;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._cellMidRender = new UIRenderComponent;
            _this.addRender(_this._cellMidRender);
            _this._cellTopRender = new UIRenderComponent;
            _this.addRender(_this._cellTopRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        GiftPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/gift/gift.xml", "ui/uidata/gift/gift.png", function () { _this.loadConfigCom(); });
        };
        GiftPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._cellMidRender.uiAtlas = this._midRender.uiAtlas;
            this._cellTopRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._topRender.getComponent("a_tittle"));
            this.addChild(this._topRender.getComponent("a_input_bg"));
            this.addChild(this._topRender.getComponent("a_reward_label0"));
            this.addChild(this._topRender.getComponent("a_reward_label1"));
            this.addChild(this._topRender.getComponent("a_input_label"));
            this.addChild(this._topRender.getComponent("a_record_but"));
            this.a_input_txt = this.addEvntBut("a_input_txt", this._topRender);
            this.addChild(this._bottomRender.getComponent("a_gift_bg"));
            this.a_reward_num0 = this.addChild(this._topRender.getComponent("a_reward_num0"));
            this.a_reward_num1 = this.addChild(this._topRender.getComponent("a_reward_num1"));
            this.a_send_but = this.addEvntButUp("a_send_but", this._topRender);
            this.empty = this.addEvntBut("empty", this._topRender);
            this.itemList = new Array();
            for (var i = 0; i < 12; i++) {
                var $cell = new GiftCell(this._cellMidRender, this._cellTopRender, this, i);
                //   $cell.id = i;
                this.itemList.push($cell);
            }
            this.basePos.x = this.empty.x;
            this.basePos.y = this.empty.y;
            this.listMask = new UIMask();
            this.listMask.level = 3;
            this.listMask.x = this.empty.x;
            this.listMask.y = this.empty.y;
            this.listMask.width = this.empty.width;
            this.listMask.height = this.empty.height;
            this.addMask(this.listMask);
            this._cellMidRender.mask = this.listMask;
            this._cellTopRender.mask = this.listMask;
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        GiftPanel.prototype.showScaloe = function () {
            if (gift.GiftModel.getInstance().getResouceLen() > 10) {
                this.moveTx = this.cutFrameNum;
                this.moveTx = Math.min(0, this.moveTx);
                var $big = Math.ceil((gift.GiftModel.getInstance().getResouceLen() - 10) / 2) * this.cellWidht * -1;
                this.moveTx = Math.max($big, this.moveTx);
                var $t = Math.floor(Math.abs(this.moveTx) / this.cellWidht);
                var $min = $t * 2;
                var $max = $min + 12;
                for (var i = $min; i < $max; i++) {
                    var $cell = this.getCellById(i); //查找现有的
                    if (!$cell) {
                        $cell = this.getOutCell($min, $max); //找一个空的
                        if ($cell) {
                            $cell.id = i;
                        }
                    }
                }
                //  this.cutFrameNum = Math.min(0 + 60, this.cutFrameNum);
                //  this.cutFrameNum = Math.max($big - 60, this.cutFrameNum);
                if (this.cutFrameNum > 0) {
                    this.cutFrameNum = this.cutFrameNum / 4;
                }
                if (this.cutFrameNum < $big) {
                    this.cutFrameNum = $big + (this.cutFrameNum - $big) / 4;
                }
                for (var i = 0; i < this.itemList.length; i++) {
                    var $cell = this.itemList[i];
                    var $toPos = new Vector2D();
                    $toPos.x = Math.floor($cell.id / 2) * this.cellWidht + this.basePos.x + this.cutFrameNum;
                    $toPos.y = Math.floor($cell.id % 2) * 130 + this.basePos.y + 0;
                    $cell.x = $toPos.x;
                    $cell.y = $toPos.y;
                    if ($cell.id >= gift.GiftModel.getInstance().getResouceLen()) {
                        $cell.x = 1000;
                    }
                }
            }
            else {
                for (var i = 0; i < 10; i++) {
                    var $cell = this.getCellById(i); //查找现有的
                    $cell.id = i;
                    var $toPos = new Vector2D();
                    $toPos.x = Math.floor($cell.id / 2) * this.cellWidht + this.basePos.x;
                    $toPos.y = Math.floor($cell.id % 2) * 130 + this.basePos.y + 0;
                    $cell.x = $toPos.x;
                    $cell.y = $toPos.y;
                }
            }
        };
        GiftPanel.prototype.cellDownById = function ($cell) {
            if (this.selectCellVo) {
                if (this.selectCellVo != $cell) {
                    this.selectCellVo.select = false;
                    this.selectCellVo.draw();
                }
            }
            this.selectCellVo = $cell;
        };
        GiftPanel.prototype.resetToCellPos = function () {
            var $toTx;
            $toTx = Math.min(0, this.cutFrameNum);
            var $big = Math.ceil((gift.GiftModel.getInstance().getResouceLen() - 10) / 2) * this.cellWidht * -1;
            $toTx = Math.max($big, $toTx);
            this._pxleft = this.cutFrameNum;
            TweenMoveTo(this, 0.1, { pxleft: $toTx });
        };
        Object.defineProperty(GiftPanel.prototype, "pxleft", {
            get: function () {
                return this._pxleft;
            },
            set: function (value) {
                this._pxleft = value;
                this.cutFrameNum = this._pxleft;
                this.showScaloe();
            },
            enumerable: true,
            configurable: true
        });
        GiftPanel.prototype.getCellById = function ($id) {
            for (var i = 0; i < this.itemList.length; i++) {
                var $cell = this.itemList[i];
                if ($cell.id == $id) {
                    return $cell;
                }
            }
            return null;
        };
        GiftPanel.prototype.getOutCell = function ($min, $max) {
            var $outCell;
            for (var i = 0; i < this.itemList.length; i++) {
                var $cell = this.itemList[i];
                if ($cell.id < $min || $cell.id >= $max) {
                    $outCell = $cell;
                }
            }
            return $outCell;
        };
        GiftPanel.prototype.refresh = function () {
            gift.GiftModel.getInstance().refrishResouce();
            for (var i = 0; i < this.itemList.length; i++) {
                var $cell = this.itemList[i];
                $cell.refresh();
            }
            this.showScaloe();
            this.refreshCellData();
            this._msgTxt = "请输入文字..";
            this.writeInputTxt();
        };
        GiftPanel.prototype.writeInputTxt = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_input_txt.skinName, this._msgTxt, 16, TextAlign.LEFT, ColorType.Orange853d07);
        };
        GiftPanel.prototype.refreshCellData = function () {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_reward_num0.skinName, ColorType.colorce0a00 + gift.GiftModel.getInstance().getResouceRewardNow(), 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_reward_num1.skinName, ColorType.colorce0a00 + gift.GiftModel.getInstance().getResouceRewardEx(), 16, TextAlign.LEFT);
        };
        GiftPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.empty:
                    this.A_left_bg_MouseDown(evt);
                    break;
                case this.a_send_but:
                    UIManager.popClikNameFun("a_send_but");
                    var $infoStr = this._msgTxt;
                    if (this._msgTxt == "请输入文字.." || this._msgTxt.length == 0) {
                        $infoStr = "此玩家没有留言~";
                    }
                    var $temp = gift.GiftModel.getInstance().sendGiftToServer($infoStr);
                    if ($temp) {
                        this.hide();
                    }
                    else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请选赠送礼物", 99);
                    }
                    break;
                case this.a_input_txt:
                    if (this._msgTxt == "请输入文字..") {
                        this._msgTxt = "";
                    }
                    InputPanel.show(function ($str) { _this.inputBfun($str); }, this._msgTxt);
                    break;
                default:
                    break;
            }
        };
        GiftPanel.prototype.inputBfun = function ($str) {
            this._msgTxt = $str;
            if (this._msgTxt == "") {
                this._msgTxt = "请输入文字..";
            }
            this.writeInputTxt();
        };
        GiftPanel.prototype.A_left_bg_MouseDown = function (evt) {
            if (gift.GiftModel.getInstance().getResouceLen() > 10) {
                this._lastMouseX = evt.x;
                this._lastRoleRotatioinY = this.cutFrameNum;
                Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
                Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
            }
        };
        GiftPanel.prototype.A_left_bg_MouseMove = function (evt) {
            this.cutFrameNum = this._lastRoleRotatioinY + (evt.x - this._lastMouseX) / UIData.Scale;
            this.showScaloe();
        };
        GiftPanel.prototype.A_left_bg_MouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
            this.resetToCellPos();
        };
        GiftPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return GiftPanel;
    }(WindowMinUi));
    gift.GiftPanel = GiftPanel;
})(gift || (gift = {}));
//# sourceMappingURL=GiftPanel.js.map