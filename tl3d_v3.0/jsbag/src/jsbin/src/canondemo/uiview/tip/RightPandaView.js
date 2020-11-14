var tips;
(function (tips) {
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var GameDataModel = game.GameDataModel;
    var PandaMeshData = /** @class */ (function () {
        function PandaMeshData() {
            this.isplayTipTxt = false;
            PandaMeshData.speenid++;
            this.id = PandaMeshData.speenid;
        }
        PandaMeshData.showCentenTxtInfoType = function ($key, $txt, $data) {
            if ($data === void 0) { $data = null; }
            var $pandaMeshData = new tips.PandaMeshData();
            $pandaMeshData.type = PandaMeshData.type2;
            $pandaMeshData.key = $key;
            $pandaMeshData.txt = $txt;
            $pandaMeshData.data = $data;
            var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.SHOW_PANDA_INFO);
            $topUiViewEvent.data = $pandaMeshData;
            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
        };
        PandaMeshData.hideCentenTxtInfoType2 = function ($key) {
            var $pandaMeshData = new tips.PandaMeshData();
            $pandaMeshData.type = PandaMeshData.type2;
            $pandaMeshData.key = $key;
            var $topUiViewEvent = new uiview.TopUiViewEvent(uiview.TopUiViewEvent.CLEAR_PANDA_INFO);
            $topUiViewEvent.data = $pandaMeshData;
            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent);
        };
        PandaMeshData.type1 = 1;
        PandaMeshData.type2 = 2;
        PandaMeshData.key1 = 1; //帮助列表
        PandaMeshData.key2 = 2; //被别人帮助 
        PandaMeshData.key3 = 3; //皮肤
        PandaMeshData.key4 = 4; //分享
        PandaMeshData.key5 = 5; //点击请求帮助
        PandaMeshData.key6 = 6; //提示关卡
        PandaMeshData.key7 = 7; //显示榜单
        PandaMeshData.key8 = 8; //看录像
        PandaMeshData.key9 = 9; //领取分享奖励
        PandaMeshData.key10 = 10; //给于的奖励需要点击领取
        PandaMeshData.key11 = 11; //无尽模式
        PandaMeshData.key12 = 12; //榜单
        PandaMeshData.key13 = 13; //联机夺宝
        PandaMeshData.key101 = 101; //请求帮助
        PandaMeshData.key102 = 102; //正在播放录像
        PandaMeshData.key103 = 103; //正在回放录像
        PandaMeshData.key104 = 104; //如果有bug请提交
        PandaMeshData.key105 = 105; //在正帮助别人
        PandaMeshData.speenid = 0;
        return PandaMeshData;
    }());
    tips.PandaMeshData = PandaMeshData;
    var RightPandaView = /** @class */ (function () {
        function RightPandaView($uiConatiner, $topRender) {
            this.lastDownTm = 0;
            this._sortId = 0;
            this._uiConatiner = $uiConatiner;
            this._topRender = $topRender;
            this._frameItem = new Array;
            this.waitTipsItem = new Array;
            for (var i = 0; i < 5; i++) {
                var $temp = this._topRender.getComponent("a_panda_frame");
                $temp.addEventListener(InteractiveEvent.Down, this.butDown, this);
                $temp.addEventListener(InteractiveEvent.Up, this.butClik, this);
                $temp.goToAndStop(i);
                this._frameItem.push($temp);
            }
        }
        RightPandaView.prototype.butDown = function (evt) {
            this.lastDownTm = Pan3d.TimeUtil.getTimer();
        };
        RightPandaView.prototype.getCanUseUi = function () {
            for (var i = 0; i < this._frameItem.length; i++) {
                if (!Boolean(this._frameItem[i].parent)) {
                    return this._frameItem[i];
                }
            }
            return null;
        };
        RightPandaView.prototype.playVideoWeb = function (ui) {
            var _this = this;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_rank", "level=" + GameDataModel.levelNum + "&page=" + "1", function (res) {
                if (res && res.data && res.data.list && res.data.list.length) {
                    msgalert.AlertUtil.show("确定要播放" + GameDataModel.levelNum + "关的录像.", "提示", function (value) {
                        if (value == 1) {
                            game.GameVideoManager.loadVideoXml(res.data.list[0]);
                            _this.removeFrameUi(ui);
                        }
                    }, 2);
                }
                else {
                    msgalert.AlertUtil.show("这一关还没有人通过。加油", "提示", function (value) {
                        _this.removeFrameUi(ui);
                    }, 2);
                }
            });
        };
        RightPandaView.prototype.savePandaClik = function ($key) {
            if (GameData.webuserInfo) {
                console.log(GameData.webuserInfo.info);
                if (GameData.webuserInfo.info && GameData.webuserInfo.info.length) {
                }
                else {
                    GameData.webuserInfo.info = "{}";
                }
                var $obj = JSON.parse(GameData.webuserInfo.info);
                var keyname = "r" + $key;
                if (!Boolean($obj[keyname])) {
                    $obj[keyname] = 0;
                }
                $obj[keyname] += 1;
                GameData.webuserInfo.info = JSON.stringify($obj);
                var $postStr = "";
                $postStr += "openid=" + GameData.getStorageSync("openid");
                $postStr += "&user_key=" + "info";
                $postStr += "&user_value=" + GameData.webuserInfo.info;
                GameData.WEB_SEVER_EVENT_AND_BACK("user_update_info", $postStr, function (res) {
                    console.log("修改pandakey", res);
                });
            }
        };
        RightPandaView.prototype.butClik = function (evt) {
            var _this = this;
            if (GameData.isPlayVideo) {
                return;
            }
            if (GameData.gameType != 1) {
                msgalert.AlertUtil.show("点左上角返回关卡", "提示", function (value) {
                }, 2);
                return;
            }
            if (Math.abs(Pan3d.TimeUtil.getTimer() - this.lastDownTm) < 1000) {
                var ui = evt.target;
                var $vo = ui.data;
                this.savePandaClik($vo.key);
                switch ($vo.key) {
                    case PandaMeshData.key8:
                        this.playVideoWeb(ui);
                        break;
                    case PandaMeshData.key11:
                        msgalert.AlertUtil.show("确定进入无尽榜单", "提示", function (value) {
                            if (value == 1) {
                                if ($vo.data) {
                                    ModuleEventManager.dispatchEvent($vo.data);
                                }
                                _this.removeFrameUi(ui);
                            }
                        }, 2);
                        break;
                    case PandaMeshData.key10:
                        var $has = GameData.getStorageSyncNumber("hasBagdiamonds"); //自己背包里的钻石。加上需要点击领取
                        var tipstr = "";
                        msgalert.AlertUtil.show("领取奖励" + $has + "钻石", "奖励", function (value) {
                            if (value == 1) {
                                _this.removeFrameUi(ui);
                                GameData.hasdiamondsHavenum += $has;
                                GameData.setStorageSync("hasBagdiamonds", 0);
                            }
                        }, 2);
                        break;
                    case PandaMeshData.key9:
                        GameData.WEB_SEVER_EVENT_AND_BACK("check_advertise_reward", "openid=" + GameData.getStorageSync("openid"), function (res) {
                            if (res && res.data && res.data.reward > 0) {
                                msgalert.AlertUtil.show("分享得到了奖励." + res.data.reward + "钻石", "奖励", function (value) {
                                    if (value == 1) {
                                        _this.removeFrameUi(ui);
                                        var $postStr = "";
                                        $postStr += "openid=" + GameData.getStorageSync("openid");
                                        $postStr += "&num=" + res.data.reward;
                                        GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_reward ", $postStr, function (res) {
                                            if (res && res.data && res.data.num) {
                                                GameData.hasdiamondsHavenum += res.data.num;
                                            }
                                        });
                                    }
                                }, 2);
                            }
                        });
                        break;
                    default:
                        if ($vo.data) {
                            ModuleEventManager.dispatchEvent($vo.data);
                        }
                        this.removeFrameUi(ui);
                        break;
                }
            }
        };
        RightPandaView.prototype.removeFrameUi = function (ui) {
            this._uiConatiner.removeChild(ui);
            this.resizeUi();
        };
        RightPandaView.prototype.resizeUi = function () {
            var $ty = 0;
            this._frameItem.sort(function (a, b) {
                return Number(a.name) - Number(b.name);
            });
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    $ty += 70;
                    var $toy = this._frameItem[i].baseRec.y + $ty;
                    TweenLite.to(this._frameItem[i], 0.3, { y: $toy });
                    if (this.a_panda_tip_msg_txt.data == this._frameItem[i]) {
                        this.a_panda_tip_msg_txt.y = this._frameItem[i].y;
                        TweenLite.to(this.a_panda_tip_msg_txt, 0.3, { y: $toy + 20 });
                    }
                }
            }
        };
        RightPandaView.prototype.pushPandaInfo = function ($vo) {
            var $infoStr = "";
            switch ($vo.key) {
                case PandaMeshData.key1:
                    $infoStr = "点击帮助其它玩家";
                    break;
                case PandaMeshData.key2:
                    $infoStr = "好心玩家帮助了我";
                    break;
                case PandaMeshData.key3:
                    $infoStr = "各种好看的外观等你挑选";
                    break;
                case PandaMeshData.key4:
                    $infoStr = "邀请好友，可以获得超多奖励";
                    break;
                case PandaMeshData.key5:
                    $infoStr = "点击求助，定有人帮";
                    break;
                case PandaMeshData.key6:
                    $infoStr = "打开关卡选择";
                    break;
                case PandaMeshData.key7:
                    $infoStr = "查看好友排行";
                    break;
                case PandaMeshData.key8:
                    $infoStr = "观看其它人通关录像";
                    break;
                case PandaMeshData.key9:
                    $infoStr = "领取分享奖励！";
                    break;
                case PandaMeshData.key10:
                    $infoStr = String($vo.data);
                    break;
                case PandaMeshData.key11:
                    $infoStr = "进入无尽榜单！";
                    break;
                case PandaMeshData.key12:
                    $infoStr = "查看榜单！";
                    break;
                default:
                    $infoStr = "还没有给提示" + $vo.key;
                    break;
            }
            if (this.isCanAddByKey($vo.key)) {
                var $temp = this.getCanUseUi();
                if ($temp) {
                    $temp.data = $vo;
                    $temp.name = String(this._sortId++);
                    this._uiConatiner.addChild($temp);
                    this.drawPicToUi($temp);
                    if (!this.selectShowText) {
                        this.a_panda_tip_msg_txt.data = $temp;
                    }
                }
                else {
                    console.log("提示信息不够");
                }
            }
            $vo.showtipInfotxt = $infoStr;
            this.waitTipsItem.push($vo);
            this.showPandaTipInfo();
            this.resizeUi();
        };
        RightPandaView.prototype.showPandaTipInfo = function () {
            var _this = this;
            if (!this.selectShowText && this.waitTipsItem.length) {
                var vo = this.waitTipsItem.shift();
                var hasIcon = false;
                for (var i = 0; i < this._frameItem.length; i++) {
                    if (Boolean(this._frameItem[i].parent)) {
                        if (this._frameItem[i].data.key == vo.key) {
                            this.a_panda_tip_msg_txt.y = this._frameItem[i].y + 20;
                            hasIcon = true;
                        }
                    }
                }
                if (hasIcon) {
                    this.selectShowText = vo.showtipInfotxt;
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_panda_tip_msg_txt.skinName, this.selectShowText, 28, TextAlign.RIGHT, Pan3d.ColorType.Black000000);
                    this.a_panda_tip_msg_txt.uvScale = 0;
                    TweenLite.to(this.a_panda_tip_msg_txt, 1, {
                        uvScale: -1, delay: 0.3, onComplete: function () {
                            TweenLite.to(_this.a_panda_tip_msg_txt, 1, {
                                uvScale: 0, delay: 1.5, onComplete: function () {
                                    _this.selectShowText = null;
                                    _this.showPandaTipInfo();
                                }
                            });
                        }
                    });
                }
                else {
                    this.showPandaTipInfo();
                }
            }
        };
        RightPandaView.prototype.clearPandaInfo = function (value) {
            console.log("清理pandata");
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo = this._frameItem[i].data;
                    if ($vo.key == value.key) {
                        this._uiConatiner.removeChild(this._frameItem[i]);
                        this.resizeUi();
                    }
                }
            }
        };
        RightPandaView.prototype.isCanAddByKey = function ($key) {
            for (var i = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo = this._frameItem[i].data;
                    if ($vo.key == $key) {
                        this.a_panda_tip_msg_txt.data = this._frameItem[i];
                        return false;
                    }
                }
            }
            return true;
        };
        RightPandaView.prototype.clearFrameCompenent = function ($temp) {
            var $toRect = $temp.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var context = $ctx;
            context.fillStyle = "rgba(66,66,66,0)";
            context.fillRect(0, 0, $toRect.width, $toRect.width);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        RightPandaView.prototype.drawEmpetBlack = function ($temp) {
            var $toRect = $temp.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var context = $ctx;
            context.fillStyle = "rgba(66,66,66,1)";
            console.log($toRect.width, $toRect.width);
            context.fillRect(0, 0, $toRect.width, $toRect.width);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        };
        RightPandaView.prototype.drawPicToUi = function ($temp) {
            var _this = this;
            this.clearFrameCompenent($temp);
            var $vo = $temp.data;
            console.log("准备加载图片", $vo.url);
            if ($vo.url.indexOf("https://wx") != -1) {
                this.drawEmpetBlack($temp);
            }
            GameData.loadImgByPicUrl($vo.url, function ($img) {
                var $toRect = $temp.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                var context = $ctx;
                //if (Math.random() > 0.5) {
                //    context.beginPath();
                //    context.arc(32, 32, 32, 0, 2 * Math.PI);
                //    context.clip();
                //    context.closePath();
                //}
                context.fillStyle = "rgba(66,66,66,0)";
                console.log($toRect.width, $toRect.width);
                context.fillRect(0, 0, $toRect.width, $toRect.width);
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                $temp.drawToCtx(_this._topRender.uiAtlas, $ctx);
                console.log("小熊猫加载成功", $img);
            });
        };
        return RightPandaView;
    }());
    tips.RightPandaView = RightPandaView;
})(tips || (tips = {}));
//# sourceMappingURL=RightPandaView.js.map