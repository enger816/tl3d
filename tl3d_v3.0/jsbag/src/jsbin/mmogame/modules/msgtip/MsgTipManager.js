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
    var PopMsgVo = /** @class */ (function () {
        function PopMsgVo() {
        }
        //全服广播1
        //升级提示2
        //拾取提示3
        //经验提示4
        //生命变化5
        //任务完成6
        //操作反馈7
        //属性、状态变化8
        //战斗提示9
        //行为状态提示10
        //地图信息11
        //战力提示12
        PopMsgVo.type1 = 1; //1固定;
        PopMsgVo.type2 = 2; // 2中间飘;
        PopMsgVo.type3 = 3; //3位置飘;
        PopMsgVo.type4 = 4; // 左上漂字;
        PopMsgVo.type5 = 5; // 右下漂字;
        PopMsgVo.type6 = 6; // 固定向上顶;
        PopMsgVo.type7 = 7; // 固定位置
        PopMsgVo.type8 = 8; // 固定位置
        PopMsgVo.HH = 35;
        return PopMsgVo;
    }());
    msgtip.PopMsgVo = PopMsgVo;
    var MsgTipItemRender = /** @class */ (function (_super) {
        __extends(MsgTipItemRender, _super);
        function MsgTipItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.waitTime2000 = 3000; //2秒
            return _this;
        }
        MsgTipItemRender.prototype.makeData = function () {
            this.ui.width = 1024 * 0.75;
            this.ui.height = PopMsgVo.HH * 0.75;
            this._msgTipVo = this._data;
            if (this._msgTipVo) {
                this.waitTime2000 = 3000;
                if (this._msgTipVo.moveType == PopMsgVo.type1) {
                    this.waitTime2000 = 1000;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type2) {
                    this.waitTime2000 = 1500;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type4) {
                    this.waitTime2000 = 1000;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type5) {
                    this.waitTime2000 = 1000;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type7) {
                    this.waitTime2000 = 1500;
                }
                this.endTime = TimeUtil.getTimer() + this.waitTime2000;
                this.drawCtx();
                this.update();
            }
        };
        MsgTipItemRender.prototype.drawCtx = function () {
            var $uiRect = this.parent.uiAtlas.getRec(this.textureStr);
            var $ctx = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            var txtLen = (FaceFontLabel.getFaceTxtStrLen(this._msgTipVo.text) * 25 + 20) * 1.0;
            UiDraw.cxtDrawImg($ctx, PuiData.HASSEL, new Rectangle((MsgTipItemRender.textureSize1024 - txtLen) / 2, 0, txtLen, 36), UIData.publicUi);
            var $color = "[ff0000]";
            if (this._msgTipVo.moveType == PopMsgVo.type1) {
                $color = "[ffffff]";
            }
            if (this._msgTipVo.moveType == PopMsgVo.type2) {
                $color = "[0000ff]";
            }
            LabelTextFont.writeSingleLabelToCtx($ctx, $color + this._msgTipVo.text, 25, 0, 0, TextAlign.CENTER, "#ffffff", "#27262e");
            this.parent.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        };
        MsgTipItemRender.prototype.update = function () {
            if (this._msgTipVo) {
                var et = (1 - (this.endTime - TimeUtil.getTimer()) / this.waitTime2000);
                var $ty = MathClass.easeInOut(et, 0, 50, 1);
                var $tx = 0;
                var $alp = this.ui;
                $alp.alpha = Math.max(Math.min((1 - et) * 2, 1), 0);
                if (this._msgTipVo.moveType == PopMsgVo.type1) {
                    $ty = 0;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type2) {
                    $ty = 0;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type3) {
                    $ty = 0;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type7) {
                    $ty = et * 75;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type6) {
                    $ty = et * 40 * 2;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type4) {
                    $tx = $ty;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type5) {
                    $ty = -$ty;
                    $tx = $ty;
                }
                var $toV2d = new Vector2D();
                if (this._msgTipVo.v2d) {
                    $toV2d.x = this._msgTipVo.v2d.x / UIData.Scale - $tx;
                    $toV2d.y = this._msgTipVo.v2d.y / UIData.Scale - $ty;
                }
                if (this._msgTipVo.v3d) {
                    //v2d.x = this._msgTipVo.v3d.x
                    //v2d.y = this._msgTipVo.v3d.y
                }
                this.ui.x = $toV2d.x - this.ui.width / 2;
                this.ui.y = $toV2d.y;
                if (this.endTime < TimeUtil.getTimer()) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        MsgTipItemRender.textureSize1024 = 1024;
        return MsgTipItemRender;
    }(Disp2DBaseText));
    msgtip.MsgTipItemRender = MsgTipItemRender;
    var MsTip2DUIContianerPanel = /** @class */ (function (_super) {
        __extends(MsTip2DUIContianerPanel, _super);
        function MsTip2DUIContianerPanel($classVo, $rect, $num) {
            return _super.call(this, $classVo, $rect, $num) || this;
        }
        MsTip2DUIContianerPanel.prototype.update = function (t) {
            var $num1 = 0;
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type1) {
                        $vo.v2d.y = 200 + $num1 * 40;
                        $num1++;
                    }
                    this._uiItem[i].update();
                }
            }
        };
        /*
        public getNumByType($type: number): number
        {
            var $num: number = 0;
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo: PopMsgVo = this._uiItem[i].data;
                    if ($vo.moveType == $type) {
                        $num++
                    }
                }
            }
            return $num
        }
        */
        MsTip2DUIContianerPanel.prototype.getType6MaxTy = function () {
            var $maxY = 0;
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type6) {
                        $maxY = Math.max(this._uiItem[i].ui.y, $maxY);
                    }
                }
            }
            return $maxY * UIData.Scale;
        };
        MsTip2DUIContianerPanel.prototype.clearType2 = function () {
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type2) {
                        var $dd = this._uiItem[i];
                        $dd.endTime = TimeUtil.getTimer();
                    }
                }
            }
        };
        MsTip2DUIContianerPanel.prototype.tureType6moveTy = function () {
            var $max = this.getType6MaxTy();
            var $ty = Math.max(0, $max - (250 - 40));
            for (var i = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type6) {
                        $vo.v2d.y -= $ty;
                    }
                }
            }
        };
        return MsTip2DUIContianerPanel;
    }(AlphaUiContianer));
    msgtip.MsTip2DUIContianerPanel = MsTip2DUIContianerPanel;
    var MsgTipManager = /** @class */ (function (_super) {
        __extends(MsgTipManager, _super);
        function MsgTipManager() {
            var _this = _super.call(this) || this;
            _this._totalNum = 20;
            _this._jumpTxtContianerPanel = new MsTip2DUIContianerPanel(MsgTipItemRender, new Rectangle(0, 0, MsgTipItemRender.textureSize1024, PopMsgVo.HH), _this._totalNum);
            SceneManager.getInstance().addDisplay2DList(_this);
            return _this;
        }
        MsgTipManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new MsgTipManager();
            }
            return this._instance;
        };
        MsgTipManager.prototype.setPopMsgVo = function (value) {
            if (value.moveType == PopMsgVo.type6) {
                this._jumpTxtContianerPanel.tureType6moveTy();
            }
            if (value.moveType == PopMsgVo.type2) {
                this._jumpTxtContianerPanel.clearType2();
            }
            var $vo = this._jumpTxtContianerPanel.showTemp(value);
            if ($vo && value.moveType == PopMsgVo.type6) {
                var $PopMsgVo = $vo.data;
                $PopMsgVo.v2d.y = 250;
                $vo.ui.y = $PopMsgVo.v2d.y / UIData.Scale; //设置UI坐标
            }
        };
        MsgTipManager.setMsgId = function (value) {
            //65546
            var $tb_msg = tb.TB_msg.get_TB_msg(value);
            var $len = random(10) + 10;
            var $str = "";
            for (var i = 0; i < $len; i++) {
                $str += "中";
            }
            //全服广播1
            //升级提示2
            //拾取提示3
            //经验提示4
            //生命变化5
            //任务完成6
            //操作反馈7
            //属性、状态变化8
            //战斗提示9
            //行为状态提示10
            //地图信息11
            //战力提示12
            $tb_msg.msgtype = 7;
            var showStr = "xxxxxxx";
            if ($tb_msg.msgtype == 1) {
                showStr = "[ffde13]玩家名字aecf[00ff00]获得/脸g[0000ff]神器[]";
                this.toSysHorn("[ffffff]" + $tb_msg.text);
                return;
            }
            if ($tb_msg.msgtype == 2) {
                showStr = "升级提示升级提示升级提示升级提示";
            }
            if ($tb_msg.msgtype == 3) {
                showStr = "拾取提示拾取提示";
            }
            if ($tb_msg.msgtype == 7) {
                showStr = "操作反馈操作反馈";
            }
            this.outStr(showStr, this.getPopTypeByTB($tb_msg.msgtype));
            this.id++;
        };
        MsgTipManager.getPopTypeByTB = function (msgtype) {
            var $pType = PopMsgVo.type1;
            if (msgtype == 2) {
                $pType = PopMsgVo.type1;
            }
            if (msgtype == 3) {
                $pType = PopMsgVo.type6;
            }
            if (msgtype == 4) {
                $pType = PopMsgVo.type2;
            }
            if (msgtype == 7) {
                $pType = PopMsgVo.type1;
            }
            return $pType;
        };
        MsgTipManager.setMsgData = function ($msgVo) {
            var $id = $msgVo.type * 65536 + $msgVo.reason;
            var $tb_msg = tb.TB_msg.get_TB_msg($id);
            if ($tb_msg && $tb_msg.id) {
                var $newStr = $tb_msg.text;
                if ($msgVo.data != "") {
                    var $infoArr = $msgVo.data.split("|");
                    for (var i = 0; i < $infoArr.length; i++) {
                        var $oldStr = "{" + (i + 1) + "}";
                        $newStr = $newStr.replace($oldStr, $infoArr[i]);
                    }
                }
                // //console.log("$aaa=", $newStr, "args = ", $msgVo);
                var $pType = 1;
                if ($tb_msg.msgtype == 1) {
                    this.toSysHorn("[ffffff]" + $newStr);
                    return;
                }
                else if ($tb_msg.msgtype == 15) {
                    AlertUtil.show($newStr, "", null, 1);
                }
                else if ($tb_msg.msgtype == 16) {
                    var evt = new welfare.WelfareEvent(welfare.WelfareEvent.LOTTERY_INFO_EVENT);
                    evt.data = $infoArr;
                    ModuleEventManager.dispatchEvent(evt);
                }
                else if ($tb_msg.msgtype != 13) {
                    this.outStr($newStr, this.getPopTypeByTB($tb_msg.msgtype));
                }
                ////console.log("提示信息：type:" + $msgVo.type + " reason:" + $msgVo.reason + " " + $msgVo.data,$newStr);
            }
            else {
                // //console.log("操作失败：type:" + $msgVo.type + " reason:" + $msgVo.reason + " " + $msgVo.data);
            }
        };
        MsgTipManager.outStrById = function (a, b, $replItem) {
            if ($replItem === void 0) { $replItem = null; }
            var $id = a * 65536 + b;
            var $tb_msg = tb.TB_msg.get_TB_msg($id);
            var $str = $tb_msg.text;
            for (var i = 0; $replItem && i < $replItem.length; i++) {
                var repls = "{" + (i + 1) + "}";
                $str = $str.replace(repls, $replItem[i]);
            }
            this.outStr($str, this.getPopTypeByTB($tb_msg.msgtype));
        };
        MsgTipManager.outStr = function ($str, $type, $d2vPos) {
            if ($d2vPos === void 0) { $d2vPos = null; }
            if ($type == 1 || $type == 99) {
                $type = 2;
            }
            var $vo = new PopMsgVo();
            $vo.text = ColorType.Redd92200 + $str;
            $vo.moveType = $type;
            $vo.v2d = new Vector2D((Scene_data.stageWidth / 2), (Scene_data.stageHeight / 2));
            if ($d2vPos) {
                $vo.v2d.x = $d2vPos.x;
                $vo.v2d.y = $d2vPos.y;
            }
            if ($vo.moveType == PopMsgVo.type1) {
                $vo.v2d.x = Scene_data.stageWidth / 2;
            }
            if ($vo.moveType == PopMsgVo.type2) {
                $vo.v2d.x = Scene_data.stageWidth / 2;
                $vo.v2d.y = Scene_data.stageHeight / 2;
            }
            if ($vo.moveType == PopMsgVo.type3) {
                $vo.v2d.x = Scene_data.stageWidth / 2;
                $vo.v2d.y = Scene_data.stageHeight / 2;
            }
            if ($vo.moveType == PopMsgVo.type4) {
                $vo.v2d.x = Scene_data.stageWidth / 2 - 150;
                $vo.v2d.y = Scene_data.stageHeight / 2 - 100;
            }
            if ($vo.moveType == PopMsgVo.type5) {
                $vo.v2d.x = Scene_data.stageWidth / 2 + 150;
                $vo.v2d.y = Scene_data.stageHeight / 2 - 100;
            }
            MsgTipManager.getInstance().setPopMsgVo($vo);
        };
        MsgTipManager.toSysHorn = function ($str) {
            var $s2c_send_chat = new s2c_send_chat();
            $s2c_send_chat.content = $str;
            $s2c_send_chat.channel = SharedDef.CHAT_TYPE_HORM;
            //   GameInstance.mainUi.bottomCenterPanel.pushSysInfoTop($s2c_send_chat)
            Chat.ChatModel.getInstance().pushNewSysInfo($str);
            var $MsgTipEvent = new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO);
            $MsgTipEvent.data = $s2c_send_chat;
            ModuleEventManager.dispatchEvent($MsgTipEvent);
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_CHAT_INFO));
        };
        MsgTipManager.prototype.update = function () {
            this._jumpTxtContianerPanel.update(0);
            for (var i = 0; i < this._jumpTxtContianerPanel.renderList.length; i++) {
                this._jumpTxtContianerPanel.renderList[i].update();
            }
        };
        MsgTipManager.prototype.resize = function () {
            this._jumpTxtContianerPanel.resize();
            for (var i = 0; i < this._jumpTxtContianerPanel.renderList.length; i++) {
                this._jumpTxtContianerPanel.renderList[i].resize();
            }
        };
        MsgTipManager.id = 0;
        return MsgTipManager;
    }(Display3D));
    msgtip.MsgTipManager = MsgTipManager;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=MsgTipManager.js.map