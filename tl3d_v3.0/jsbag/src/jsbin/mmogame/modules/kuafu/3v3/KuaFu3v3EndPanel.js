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
var kuafu;
(function (kuafu) {
    var KuaFu3v3EndPanel = /** @class */ (function (_super) {
        __extends(KuaFu3v3EndPanel, _super);
        function KuaFu3v3EndPanel() {
            var _this = _super.call(this) || this;
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
            _this._topRender.uiAtlas = new UIAtlas();
            _this._topRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/kuafuend.xml", "ui/uidata/kuafu/3v3/kuafuend.png", function () { _this.loadConfigCom(); }, "ui/uidata/kuafu/pc.png");
            return _this;
        }
        KuaFu3v3EndPanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        };
        KuaFu3v3EndPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            var renderLevel = this._topRender;
            var a_bg0 = this.addEvntBut("a_bg", this._bottomRender);
            var a_bg1 = this.addEvntBut("a_bg", this._bottomRender);
            a_bg1.x = a_bg0.x + 391;
            a_bg1.isU = true;
            this.addChild(this._bottomRender.getComponent("line1"));
            this.addUIList(["a_bottom_bg", "a_title_bg", "a_16"], this._midRender);
            this.a_left_num = this.addChild(renderLevel.getComponent("a_left_num"));
            this.a_right_num = this.addChild(renderLevel.getComponent("a_right_num"));
            this.a_tip_txt = this.addChild(renderLevel.getComponent("a_tip_txt"));
            this.addUIList(["a_1_0", "a_2_0", "a_4_0", "a_3_0", "a_2_1", "a_4_1", "a_1_1", "a_3_1"], this._midRender);
            this._curNum = this.addChild(renderLevel.getComponent("a_9"));
            this._gradeIcon = this.addChild(renderLevel.getComponent("a_8"));
            this._curGrade = this.addChild(renderLevel.getComponent("a_10"));
            this._aryItemBg = new Array;
            this._aryItemIcon = new Array;
            this._aryItemName = new Array;
            this._aryItemJisha = new Array;
            this._aryItemShanghai = new Array;
            this._aryItemJifen = new Array;
            this._aryItemRongyu = new Array;
            this._aryItemZuijia = new Array;
            for (var i = 0; i < 6; i++) {
                var uifra = renderLevel.getComponent("fra_bg" + i);
                if (i > 2) {
                    uifra.isU = true;
                }
                this._aryItemBg.push(uifra);
                this._aryItemIcon.push(renderLevel.getComponent("icon" + i));
                this._aryItemName.push(renderLevel.getComponent("name" + i));
                this._aryItemJisha.push(renderLevel.getComponent("j" + i));
                this._aryItemShanghai.push(renderLevel.getComponent("sH" + i));
                this._aryItemJifen.push(renderLevel.getComponent("jF" + i));
                this._aryItemRongyu.push(renderLevel.getComponent("rY" + i));
                this._aryItemZuijia.push(renderLevel.getComponent("a_7_" + i));
            }
            this._tickFun = function (t) { _this.tickRefreshState(t); };
            this.refrish();
        };
        KuaFu3v3EndPanel.prototype.tickRefreshState = function (t) {
            var $time = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                ArtFont.getInstance().writeFontToSkinNameCenter(this._midRender.uiAtlas, "A_17", String($time), ArtFont.num7, 5);
                //console.log("刷新", $time);
                if ($time < 0) {
                    //回调
                    this.close();
                    NetManager.getInstance().protocolos.goback_to_game_server();
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
            }
        };
        KuaFu3v3EndPanel.prototype.close = function () {
            this.setUiListVisibleByItem(this._aryItemBg, false);
            this.setUiListVisibleByItem(this._aryItemIcon, false);
            this.setUiListVisibleByItem(this._aryItemName, false);
            this.setUiListVisibleByItem(this._aryItemJisha, false);
            this.setUiListVisibleByItem(this._aryItemShanghai, false);
            this.setUiListVisibleByItem(this._aryItemJifen, false);
            this.setUiListVisibleByItem(this._aryItemRongyu, false);
            this.setUiListVisibleByItem(this._aryItemZuijia, false);
            UIManager.getInstance().removeUIContainer(this);
        };
        KuaFu3v3EndPanel.prototype.butClik = function (evt) {
            this.close();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            NetManager.getInstance().protocolos.instance_exit(0);
            //console.log("推出副本")
        };
        KuaFu3v3EndPanel.prototype.refrish = function () {
            //正常交互数据
            var $item = kuafu.KuaFu3v3Model.getInstance().kuafuItem;
            //比分临时变量
            var $leftnum = 0;
            var $rightnum = 0;
            //当前绘制索引变量
            var anum = 0;
            var bnum = 3;
            //玩家战斗结算数据循环绘制
            for (var i = 0; i < $item.length; i++) {
                var index;
                //绘制ItemUI
                if ($item[i].group == 1) {
                    index = anum;
                    anum++;
                }
                else {
                    index = bnum;
                    bnum++;
                }
                var uibg = this._aryItemBg[index];
                var uiicon = this._aryItemIcon[index];
                var uiname = this._aryItemName[index];
                var uijisha = this._aryItemJisha[index];
                var uishanghai = this._aryItemShanghai[index];
                var uijifen = this._aryItemJifen[index];
                var uirongyu = this._aryItemRongyu[index];
                this.setUiListVisibleByItem([uibg, uiicon, uiname, uijisha, uishanghai, uijifen, uirongyu], true);
                if ($item[i].zuijia == 1) {
                    this.setUiListVisibleByItem([this._aryItemZuijia[index]], true);
                }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, uiname.skinName, getServerAndName($item[i].name), 14, TextAlign.CENTER, "#d6e7ff");
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uijisha.skinName, String($item[i].killnum), ArtFont.num3);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uishanghai.skinName, String($item[i].shanghai), ArtFont.num3);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uijifen.skinName, String($item[i].jifen), ArtFont.num3);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uirongyu.skinName, String($item[i].rongyu), ArtFont.num3);
                this.drawIcon(uiicon, $item[i]);
                var $selfGrop = kuafu.KuaFu3v3Model.getInstance().selfVo;
                if ($selfGrop == $item[i]) {
                    uibg.goToAndStop(0);
                }
                else {
                    uibg.goToAndStop(1);
                }
                //统计比分逻辑
                if ($item[i].dieState == 1) {
                    if ($item[i].group == 1) {
                        $rightnum++;
                    }
                    else {
                        $leftnum++;
                    }
                }
            }
            //上部绘制
            this.drawTop($leftnum, $rightnum);
            //底部绘制
            this.drawBottom();
            var $time = GameInstance.getGameSecond(GuidData.map.getMapIntFieldEndTM());
            this._endtime = TimeUtil.getTimer() + $time * 1000; //结束时间
            // this._endtime = (15 * 1000) + TimeUtil.getTimer();
            TimeUtil.addFrameTick(this._tickFun);
        };
        KuaFu3v3EndPanel.prototype.drawIcon = function ($ui, $kuafu3V3dataVo) {
            var _this = this;
            var $picUrl = getTouPic($kuafu3V3dataVo.gender);
            IconManager.getInstance().getIcon($picUrl, function ($img) {
                var $uiRec = _this._topRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                //头像
                ctx.drawImage($img, 0, 0, 82, 82, 2, 2, 64, 64);
                var bg;
                if ($kuafu3V3dataVo.group == 1) {
                    bg = _this._topRender.uiAtlas.getRec("Blue");
                }
                else {
                    bg = _this._topRender.uiAtlas.getRec("Red");
                }
                ctx.drawImage(_this._topRender.uiAtlas.useImg, bg.pixelX, bg.pixelY, bg.pixelWitdh, bg.pixelHeight, 0, 0, 68, 68);
                var levelbg = _this._topRender.uiAtlas.getRec("Levelbg");
                ctx.drawImage(_this._topRender.uiAtlas.useImg, levelbg.pixelX, levelbg.pixelY, levelbg.pixelWitdh, levelbg.pixelHeight, 16, 56, levelbg.pixelWitdh, levelbg.pixelHeight);
                ArtFont.getInstance().writeFontToCtxCenten(ctx, String($kuafu3V3dataVo.level), ArtFont.num28, 36, 56);
                _this._topRender.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
            });
        };
        KuaFu3v3EndPanel.prototype.drawTop = function ($leftnum, $rightnum) {
            //胜负ui
            if ($leftnum == $rightnum) {
                this.a_tip_txt.goToAndStop(2);
            }
            else {
                var $selfGrop = kuafu.KuaFu3v3Model.getInstance().selfVo.group;
                if ($leftnum > $rightnum && $selfGrop == 1 || $leftnum < $rightnum && $selfGrop == 2) {
                    this.a_tip_txt.goToAndStop(1);
                }
                else {
                    this.a_tip_txt.goToAndStop(0);
                }
            }
            //左右比分绘制
            UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.a_left_num.skinName, String($leftnum));
            UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.a_right_num.skinName, String($rightnum));
        };
        KuaFu3v3EndPanel.prototype.drawBottom = function () {
            //当前段位
            var $tb_kuafu3v3_month_reward = kuafu.KuaFu3v3Model.getInstance().get_month_reward_item();
            this.drawPkGrade($tb_kuafu3v3_month_reward.type);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._curGrade.skinName, $tb_kuafu3v3_month_reward.name, 16, TextAlign.CENTER, "#d5e7ff");
            //本局积分
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._curNum.skinName, "+" + kuafu.KuaFu3v3Model.getInstance().selfVo.jifen, ArtFont.num7, TextAlign.CENTER, 5);
        };
        KuaFu3v3EndPanel.prototype.drawPkGrade = function ($type) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + getUIpkGradeUrl(String($type)), LoadManager.IMG_TYPE, function ($img) {
                var $uiRec = _this._topRender.uiAtlas.getRec(_this._gradeIcon.skinName);
                var ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                //头像
                ctx.drawImage($img, 0, 0, 82, 106, 0, 0, 82, 106);
                _this._topRender.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
            });
        };
        return KuaFu3v3EndPanel;
    }(UIPanel));
    kuafu.KuaFu3v3EndPanel = KuaFu3v3EndPanel;
})(kuafu || (kuafu = {}));
//# sourceMappingURL=KuaFu3v3EndPanel.js.map