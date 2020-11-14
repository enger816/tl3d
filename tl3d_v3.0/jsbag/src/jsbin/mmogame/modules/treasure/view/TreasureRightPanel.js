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
var treasure;
(function (treasure) {
    var TreasureRightPanel = /** @class */ (function (_super) {
        __extends(TreasureRightPanel, _super);
        function TreasureRightPanel() {
            var _this = _super.call(this) || this;
            _this._canclick = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._publicRender = new UIRenderComponent;
            _this.addRender(_this._publicRender);
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent;
            _this.addRender(_this._baseRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._redPointRender = new RedPointRender;
            _this.addRender(_this._redPointRender);
            return _this;
        }
        TreasureRightPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this.treasureList) {
                this.treasureList.dispose();
                this.treasureList = null;
            }
        };
        TreasureRightPanel.prototype.initUiAtlas = function ($uiAtlas, $publicuiAtlas) {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        };
        TreasureRightPanel.prototype.initView = function () {
            var renderLevel = this._baseRender;
            this.a_listindex = this.addChild(this._baseRender.getComponent("a_listindex"));
            this.b_zhanli = this.addChild(this._topRender.getComponent("b_zhanli"));
            this.addChild(this._topRender.getComponent("a_zhanli_txt"));
            this.addChild(renderLevel.getComponent("b_numberBg"));
            this.b_currentname = this.addChild(renderLevel.getComponent("b_currentname"));
            this.addUIList(["b_line1_1", "e_title0", "e_info1", "e_title1"], renderLevel);
            this.addUIList(["b_titleBg", "b_titleBg1"], this._bgRender);
            this.e_force = this.addChild(renderLevel.getComponent("e_force"));
            this.b_skillicon = this.addChild(renderLevel.getComponent("b_skillicon"));
            this.b_skillname = this.addChild(renderLevel.getComponent("b_skillname"));
            this.b_skillinfo = this.addChild(renderLevel.getComponent("b_skillinfo"));
            this.btnuiary = new Array;
            var b_btntxt = renderLevel.getComponent("b_btntxt");
            this.btnuiary.push(b_btntxt);
            var cnew_btn1 = this._publicRender.getComponent("cnew_btn1");
            this.setSizeForPanelUiCopy(cnew_btn1, "btnBg", renderLevel);
            cnew_btn1.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.btnuiary.push(cnew_btn1);
            this.btnuiary.push(renderLevel.getComponent("c_item0"));
            this.btnuiary.push(this._topRender.getComponent("c_itemnum0"));
            this.e_pro = this._baseRender.getComponent("e_pro");
            this.btnuiary.push(this._bgRender.getComponent("e_probg"));
            this.btnuiary.push(this.e_pro);
            this.btnuiary.push(renderLevel.getComponent("e_info"));
            // this.btnuiary.push(renderLevel.getComponent("b_res2"));
            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(cnew_btn1.x + cnew_btn1.width, cnew_btn1.y));
            this.Okuiary = new Array;
            this.Okuiary.push(renderLevel.getComponent("b_infotxt"));
            this.attribute_cur_ary = new Array;
            this.attribute_next_ary = new Array;
            this.attribute_lev_ary = new Array;
            for (var i = 0; i < 7; i++) {
                this.attribute_cur_ary.push(this._topRender.getComponent("c_attribute_c" + i));
                this.attribute_next_ary.push(this._topRender.getComponent("c_attribute_n" + i));
            }
            this.attribute_lev_ary.push(this._topRender.getComponent("c_lev"));
            this.attribute_lev_ary.push(this._topRender.getComponent("c_curlevtxt"));
        };
        TreasureRightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.treasureList) {
                this.treasureList.left = this.a_listindex.parent.x / UIData.Scale + this.a_listindex.x;
                this.treasureList.top = this.a_listindex.parent.y / UIData.Scale + this.a_listindex.y;
            }
        };
        TreasureRightPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            if (!this.treasureList) {
                this.treasureList = new TreasureList();
                this.treasureList.init(this._baseRender.uiAtlas);
            }
            this.treasureList.show();
            this.resize();
        };
        TreasureRightPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.treasureList) {
                this.treasureList.hide();
            }
        };
        TreasureRightPanel.prototype.resetData = function ($data) {
            //console.log("-$data--", $data);
            this._itdata = $data;
            //设置模型
            var $uiPanel = this.parent;
            $uiPanel.setAvatar(Number($data.tabvo.model), $data.tabvo.name, 6);
            this.drawIcon(this.b_currentname, "ui/load/treasure/" + $data.tabvo.icon + ".png");
            var str;
            var a = this.btnuiary[0];
            var resitem1; //必要道具
            var spirittabary = tb.TB_talisman_spirit.get_TB_talisman_spiritByIdArray($data.tabvo.id);
            if ($data.state == 2) {
                //未激活 
                this._curstate = 2;
                resitem1 = $data.tabvo.avtivedata[0];
                a.goToAndStop(0);
                str = String(getForceByAtt(spirittabary[0].attr_id, spirittabary[0].attr_value));
            }
            else if ($data.state == 1) {
                //已激活
                a.goToAndStop(1);
                str = String($data.activityvo.power);
                var nextlev = $data.activityvo.lev + 1;
                if (nextlev > spirittabary[spirittabary.length - 1].level) {
                    resitem1 = null;
                }
                else {
                    this._nextlevtab = spirittabary[nextlev - 1];
                    resitem1 = this._nextlevtab.item_cost[0];
                }
                if (resitem1 == null) {
                    this._curstate = 3;
                }
                else {
                    this._curstate = 1;
                }
            }
            //绘制战力
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_zhanli.skinName, str, 14, TextAlign.RIGHT, ColorType.Yellowffe9b4);
            if (resitem1 == null) {
                //等级已达上限
                this.setUiListVisibleByItem(this.btnuiary, false);
                this.setUiListVisibleByItem(this.Okuiary, true);
            }
            else {
                this.setUiListVisibleByItem(this.btnuiary, true);
                this.setUiListVisibleByItem(this.Okuiary, false);
                IconManager.getInstance().drawItemIcon40(this.btnuiary[2], resitem1[0]);
                // UiDraw.drawResHasNumAndAllNum(this.btnuiary[3], resitem1)
                this.btnuiary[6].goToAndStop($data.state == 1 ? 0 : 1);
                var raio;
                var raiostr;
                if (GuidData.bag.hasItem(resitem1[0])) {
                    raio = 1;
                    raiostr = GuidData.bag.getItemCount(resitem1[0]) + "/" + resitem1[1];
                    if (GuidData.bag.getItemCount(resitem1[0]) < resitem1[1]) {
                        raio = GuidData.bag.getItemCount(resitem1[0]) / resitem1[1];
                    }
                }
                else {
                    raio = 0;
                    raiostr = "0/" + resitem1[1];
                }
                //console.log("---raio--", raio);
                this.e_pro.uvScale = raio;
                LabelTextFont.writeSingleLabel(this.btnuiary[3].uiRender.uiAtlas, this.btnuiary[3].skinName, raiostr, 14, TextAlign.CENTER, ColorType.Whiteffffff);
            }
            //技能绘制
            var skilltab = tb.TB_skill_base.get_TB_skill_base($data.tabvo.passiveskill[0][0]);
            var $uplevelobj = TableData.getInstance().getData(TableData.tb_skill_uplevel, skilltab.uplevel_id[0]);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.e_force.skinName, ColorType.Brown7a2f21 + "战力: " + ColorType.Green2ca937 + $uplevelobj["fight_value"], 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            // this.drawIcon(this.b_skillicon, getSkillIconUrl(skilltab.icon), PuiData.SKILL_BG58);
            IconManager.getInstance().drawCircleIcon(this.b_skillicon, 2, $data.tabvo.passiveskill[0][0], false, 1);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_skillname.skinName, skilltab.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeText(this._baseRender.uiAtlas, this.b_skillinfo.skinName, 0, 0, tb.SkillDataVo.getSkillDesc($data.tabvo.passiveskill[0][0]), 14, ColorType.color9a683f, 175);
            //绘制属性
            this.drawAttribute();
            this.drawLev();
            if ($data.node.show) {
                this._btnRedPoint.preShow();
            }
            else {
                this._btnRedPoint.preHide();
            }
        };
        TreasureRightPanel.prototype.drawAttribute = function () {
            var lev;
            if (this._itdata.activityvo) {
                lev = this._itdata.activityvo.lev;
            }
            else {
                lev = 1;
            }
            var curlevtab = tb.TB_talisman_spirit.get_TB_talisman_spiritById(this._itdata.tabvo.id, lev);
            for (var i = 0; i < 7; i++) {
                this.setUiListVisibleByItem([this.attribute_cur_ary[i], this.attribute_next_ary[i]], false);
                if (i <= curlevtab.attr_id.length - 1) {
                    if (this._curstate == 1) {
                        this.setUiListVisibleByItem([this.attribute_cur_ary[i], this.attribute_next_ary[i]], true);
                        this.drawCurAttr(i, curlevtab.attr_id[i], curlevtab.attr_value[i]);
                    }
                    else {
                        this.setUiListVisibleByItem([this.attribute_cur_ary[i]], true);
                        this.drawAttr(i, curlevtab.attr_id[i], curlevtab.attr_value[i]);
                    }
                }
            }
            // for (var i = 0; i < 7; i++) {
            //     this.setUiListVisibleByItem([this.attribute_cur_ary[i], this.attribute_next_ary[i]], true);
            //             this.drawAttr(i,1,1000);
            // }
        };
        TreasureRightPanel.prototype.drawLev = function () {
            if (this._curstate == 1) {
                this.setUiListVisibleByItem(this.attribute_lev_ary, true);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.attribute_lev_ary[0].skinName, String(this._itdata.activityvo.lev), 16, TextAlign.LEFT, ColorType.colorff7200);
            }
            else {
                this.setUiListVisibleByItem(this.attribute_lev_ary, false);
            }
        };
        TreasureRightPanel.prototype.drawCurAttr = function ($index, $attrid, $attrvalue) {
            //显示当前属性和下一阶属性
            // var curlevtab = tb.TB_talisman_spirit.get_TB_talisman_spiritById(this._itdata.tabvo.id,this._itdata.activityvo.lev);
            // var attrid = this._itdata.tabvo.props[$index][0]
            // var attrNum_base = this._itdata.tabvo.props[$index][1]
            // var comebackid1 = this.gettabindex(attrid, curlevtab);
            // var comebackid2 = this.gettabindex(attrid, this._nextlevtab);
            // if (comebackid1 == -1 || comebackid2 == -1) {
            //     //console.log(":--出错");
            // } else {
            //     var attrNum_c = attrNum_base + curlevtab.attr_value[comebackid1];
            //     var attrNum_n = attrNum_base + this._nextlevtab.attr_value[comebackid2];
            // }
            UiDraw.drawAttVal(this.attribute_cur_ary[$index], $attrid, $attrvalue);
            UiDraw.drawAddValRight(this.attribute_next_ary[$index], this._nextlevtab.attr_value[$index], false, TextAlign.LEFT);
            this.attribute_cur_ary[$index].y = this.attribute_next_ary[$index].y = 142 + $index * 20;
            this.attribute_cur_ary[$index].x = 685;
        };
        TreasureRightPanel.prototype.drawAttr = function ($index, $attrid, $attrvalue) {
            //显示当前属性
            // var attrid = this._itdata.tabvo.props[$index][0]
            // var attrNum_base = this._itdata.tabvo.props[$index][1]
            // var attrNum_c = attrNum_base;
            // if (this._curstate == 3) {
            //     var comebackid1 = this.gettabindex(attrid, curlevtab);
            //     if (comebackid1 == -1) {
            //         //console.log(":--出错");
            //     } else {
            //         attrNum_c = attrNum_base + curlevtab.attr_value[comebackid1];
            //     }
            // }
            UiDraw.drawAttVal(this.attribute_cur_ary[$index], $attrid, $attrvalue);
            this.attribute_cur_ary[$index].y = 142 + $index * 20 - 26;
            this.attribute_cur_ary[$index].x = 685 + 42;
        };
        // private gettabindex($attrid: number, $ary: tb.TB_talisman_spirit): number {
        //     for (var i = 0; i < $ary.attr_id.length; i++) {
        //         if ($ary.attr_id[i] == $attrid) {
        //             return i;
        //         }
        //     }
        //     return -1;
        // }
        TreasureRightPanel.prototype.getcostStr = function ($ary, $baseColor) {
            if ($baseColor === void 0) { $baseColor = ColorType.colorb96d49; }
            var itemcount;
            if (GuidData.player.getResType($ary[0]) >= $ary[1]) {
                itemcount = ColorType.Green98ec2c + $ary[1];
            }
            else {
                itemcount = ColorType.colorce0a00 + $ary[1];
            }
            return itemcount;
        };
        TreasureRightPanel.prototype.drawIcon = function ($ui, $url, $bgname) {
            var _this = this;
            if ($bgname === void 0) { $bgname = null; }
            IconManager.getInstance().getIcon($url, function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                if ($bgname != null) {
                    UiDraw.cxtDrawImg(ctx, $bgname, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                }
                //头像
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 1, 1, $rec.pixelWitdh - 2, $rec.pixelHeight - 2);
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        TreasureRightPanel.prototype.butClik = function (evt) {
            var _this = this;
            if (this._itdata) {
                UIManager.popClikNameFun("cnew_btn1");
                if (this._canclick) {
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this._canclick = false;
                    TimeUtil.addTimeOut(btnClickTime, function () {
                        _this._canclick = true;
                    });
                    if (this._curstate == 2) {
                        //激活操作
                        var $ary = this._itdata.tabvo.avtivedata[0];
                        if (hasEnoughResItem($ary)) {
                            //console.log("--id-", this._itdata.tabvo.id);
                            NetManager.getInstance().protocolos.talisman_active(this._itdata.tabvo.id);
                        }
                        else {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99)
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = $ary[0];
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                    }
                    else if (this._curstate == 1) {
                        //升级操作
                        var $ary1 = this._nextlevtab.item_cost[0];
                        if (hasEnoughResItem($ary1)) {
                            //console.log("--id-", this._itdata.tabvo.id);
                            NetManager.getInstance().protocolos.talisman_lvup(this._itdata.tabvo.id);
                        }
                        else {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99)
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = $ary1[0];
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                    }
                }
                else {
                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
                }
            }
            else {
                //console.log("--未选中--");
            }
        };
        return TreasureRightPanel;
    }(UIVirtualContainer));
    treasure.TreasureRightPanel = TreasureRightPanel;
    /**
     * list
     */
    var TreasureList = /** @class */ (function (_super) {
        __extends(TreasureList, _super);
        function TreasureList() {
            var _this = _super.call(this) || this;
            _this.left = 46;
            _this.top = 173;
            return _this;
        }
        TreasureList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        TreasureList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, TreasureListRender, 234, 343, 0, 85, 4, 256, 512, 1, 6, 2);
        };
        TreasureList.prototype.setSelect = function ($item) {
            _super.prototype.setSelect.call(this, $item);
            this._lastTid = $item.itdata.data.id;
        };
        TreasureList.prototype.getSelectIdByTid = function ($tid) {
            //console.log("---表id---", $tid);
            for (var i = 0; i < this._itemDataList.length; i++) {
                if (this._itemDataList[i].data.id == $tid) {
                    return this._itemDataList[i].id;
                }
            }
            //console.log("--没有符合的项", $tid);
            return 0;
        };
        TreasureList.prototype.refreshDataByNewData = function () {
            var a = treasure.TreasureModel.getInstance().getList();
            var nodeList = RedPointManager.getInstance().getNodeByID(133).children;
            for (var i = 0; i < this._itemDataList.length; i++) {
                nodeList[i].data = a[i];
                a[i].node = nodeList[i];
                this._itemDataList[i].data = a[i];
            }
            this.refreshDraw();
            var selid = this.getSelectIdByTid(this._lastTid);
            this.scrollIdx(selid);
            this.setSelectIndex(selid);
            this.setEffectUrl("ui_qh", 4, 4);
            // this.showExpEff(this.getIdxY(selid));
        };
        TreasureList.prototype.effectComplte = function () {
            //console.log("加载好了，回调");
            this.playEffect(0, -52, this.getIdxY(this.getSelectIdByTid(this._lastTid)) - 50, 1.5, 1.5);
        };
        TreasureList.prototype.getData = function ($data) {
            var ary = new Array;
            var nodeList = RedPointManager.getInstance().getNodeByID(133).children;
            for (var i = 0; i < $data.length; i++) {
                nodeList[i].data = $data[i];
                $data[i].node = nodeList[i];
                var item = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        TreasureList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._itemDataList = this.getData(treasure.TreasureModel.getInstance().getList());
            this.refreshData(this._itemDataList);
            var selid = this.getSelectIdByTid(this._lastTid);
            this.scrollIdx(selid);
            // this.setSelectIndexCopy(this.getCurrentSelectIndex());
            this.setSelectIndex(selid);
        };
        TreasureList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return TreasureList;
    }(EffectSlist));
    treasure.TreasureList = TreasureList;
    var TreasureListRender = /** @class */ (function (_super) {
        __extends(TreasureListRender, _super);
        function TreasureListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        TreasureListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var cententRender = this._customRenderAry[0];
            var topRender = this._customRenderAry[1];
            this.UnlockBg = this.creatGrid9SUI(cententRender, this.parentTarget.baseAtlas, "UnlockBg", 0, 0, 234, 80, 15, 15);
            $container.addChild(this.UnlockBg);
            this.Sicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sicon", 9, 6, 68, 68);
            $container.addChild(this.Sicon);
            this.Sname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sname", 87, 19, 98, 22);
            $container.addChild(this.Sname);
            this.Sinfo = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sinfo", 87, 45, 140, 18);
            $container.addChild(this.Sinfo);
            this.Wear = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Wear", 164, 48, 67, 27);
            $container.addChild(this.Wear);
            this.Redpoint = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Redpoint", 214, 3, 17, 16);
            this.Redpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Redpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
            this.Sselect = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Sselect", 0, 0, 234, 80, 15, 15);
            $container.addChild(this.Sselect);
            this.Sselect.addEventListener(InteractiveEvent.Up, this.equClick, this);
        };
        TreasureListRender.prototype.drawIcon = function () {
            var _this = this;
            var $vo = this.itdata.data;
            var $url = "ui/load/treasure/" + $vo.tabvo.icon;
            IconManager.getInstance().getIcon($url + "_c.png", function ($img) {
                var $rec = _this._baseRender.uiAtlas.getRec(_this.Sicon.skinName);
                var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                // UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                var equ = _this.parentTarget.baseAtlas.getRec("equ" + $vo.tabvo.quality);
                ctx.drawImage(_this.parentTarget.baseAtlas.useImg, equ.pixelX, equ.pixelY, equ.pixelWitdh, equ.pixelHeight, 0, 0, 68, 68);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                // UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 64, 64))
                _this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        };
        Object.defineProperty(TreasureListRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (this.itdata) {
                    this.applyrender();
                }
                if (val) {
                    var $evt = new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SELECT_ITEM_EVENT);
                    $evt.data = this.itdata;
                    ModuleEventManager.dispatchEvent($evt);
                }
            },
            enumerable: true,
            configurable: true
        });
        TreasureListRender.prototype.applyrender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                if ($vo.node) {
                    $vo.node.bindUI(this.Redpoint);
                }
                if (this.selected) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_select);
                }
                else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_nselect);
                }
                this.drawIcon();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.name, 16, TextAlign.LEFT, getColorQua($vo.tabvo.quality));
                if ($vo.state == 1) {
                    UiDraw.clearUI(this.UnlockBg);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sinfo.skinName, "+" + $vo.activityvo.lev, 14, TextAlign.LEFT, getColorQua($vo.tabvo.quality));
                }
                else {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sinfo.skinName, "收集" + $vo.tabvo.avtivedata[0][1] + "个碎片激活", 14, TextAlign.LEFT, ColorType.Brown6a4936);
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.UnlockBg.skinName, UIData.publicUi, PuiData.MASK);
                }
                if ($vo.wear) {
                    UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Wear.skinName, "wear");
                }
                else {
                    UiDraw.clearUI(this.Wear);
                }
                // UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I2tembg.skinName, UIData.publicUi, PuiData.ITEMBG);
            }
        };
        TreasureListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        TreasureListRender.prototype.refreshDraw = function () {
            this.render(this.itdata);
        };
        TreasureListRender.prototype.equClick = function (evt) {
            UIManager.popClikNameFun("Sselect");
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
            }
        };
        TreasureListRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.Sicon.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Sname.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Sinfo.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Wear.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.Sselect.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this.UnlockBg.skinName);
            this.Redpoint.preHide();
        };
        return TreasureListRender;
    }(SListItem));
    treasure.TreasureListRender = TreasureListRender;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureRightPanel.js.map