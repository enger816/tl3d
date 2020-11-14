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
var boss;
(function (boss) {
    var BossRankCellVo = /** @class */ (function () {
        function BossRankCellVo() {
        }
        return BossRankCellVo;
    }());
    boss.BossRankCellVo = BossRankCellVo;
    var BossRankRender = /** @class */ (function (_super) {
        __extends(BossRankRender, _super);
        function BossRankRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BossRankRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.RankCell_txt = this.creatSUI($baseRender, BossRankRender.baseAtlas, "RankCell_txt", 0, 0, 210, 22);
            $container.addChild(this.RankCell_txt);
        };
        BossRankRender.prototype.applyrender = function () {
            var vo = this.itdata.data;
            /*
            ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.Rankid.skinName, String(vo.rankid), ArtFont.num1, TextAlign.LEFT)
            //名字
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name.skinName, vo.name, 16, TextAlign.CENTER, "#000000");
            //输出
            ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.Output.skinName, vo.ratio + "%", ArtFont.num3, TextAlign.CENTER)
            */
            //ffe400
            //d3ecff
            //dd6d29
            //ffe9b4
            var $str = "    ";
            $str += String(vo.rankid) + "     ";
            $str += getBaseName(vo.name) + "     ";
            $str += vo.ratio + "%";
            var colorStr = "ffe9b4";
            switch (vo.rankid) {
                case 1:
                    colorStr = "[ffe400]";
                    break;
                case 2:
                    colorStr = "[d3ecff]";
                    break;
                case 3:
                    colorStr = "[dd6d29]";
                    break;
                default:
                    colorStr = "[ffe9b4]";
                    break;
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.RankCell_txt.skinName, $str, 14, TextAlign.LEFT, colorStr);
        };
        BossRankRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            }
            else {
                this.setnull();
            }
        };
        BossRankRender.prototype.equClick = function (evt) {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var aa = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                aa.id = evt.target.data;
                ModuleEventManager.dispatchEvent(aa);
            }
        };
        BossRankRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.RankCell_txt.skinName);
        };
        return BossRankRender;
    }(SListItem));
    boss.BossRankRender = BossRankRender;
    var BossRankList = /** @class */ (function (_super) {
        __extends(BossRankList, _super);
        function BossRankList() {
            var _this = _super.call(this) || this;
            _this.center = 220;
            _this.top = 80;
            return _this;
        }
        BossRankList.prototype.init = function ($uiAtlas) {
            BossRankRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        BossRankList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, BossRankRender, 210, 160, 210, 20, 8, 256, 256, 1, 10);
        };
        /**
         * refreshData
         */
        BossRankList.prototype.refreshDataByNewData = function () {
            //var $sListItemData = this.getMassBossRankData();
            //this.refreshData($sListItemData);
        };
        BossRankList.prototype.getFamilyBossRankData = function () {
            var ary = new Array;
            var listary = faction.FactionBossModel.getInstance().getRankList(GuidData.faction.getBosschallengeidCur());
            for (var i = 0; i < listary.length; i++) {
                var item = new SListItemData;
                var $BossRankCellVo = new BossRankCellVo();
                $BossRankCellVo.rankid = listary[i].rankid;
                $BossRankCellVo.name = listary[i].name;
                $BossRankCellVo.ratio = listary[i].ratio;
                item.data = $BossRankCellVo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        BossRankList.prototype.getMassBossRankData = function () {
            var ary = new Array;
            for (var i = 0; i < 5; i++) {
                var item = new SListItemData;
                var $BossRankCellVo = new BossRankCellVo();
                $BossRankCellVo.rankid = i + 1;
                $BossRankCellVo.name = "ccavet";
                $BossRankCellVo.ratio = 10;
                item.data = $BossRankCellVo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        BossRankList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        };
        BossRankList.prototype.refreshAndselectIndex = function () {
            this.refreshDataByNewData();
            this.setSelectIndex(0);
        };
        BossRankList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return BossRankList;
    }(SList));
    boss.BossRankList = BossRankList;
    var BossRankPanel = /** @class */ (function (_super) {
        __extends(BossRankPanel, _super);
        function BossRankPanel() {
            var _this = _super.call(this) || this;
            _this.mineNum = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.top = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._topRender.uiAtlas = new UIAtlas();
            _this._frameFun = function (t) { _this.upTime(t); };
            return _this;
        }
        BossRankPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.uiAtlas.setInfo("ui/uidata/boss/oftenrank/oftenrank.xml", "ui/uidata/boss/oftenrank/oftenrank.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/factionpc.png");
        };
        BossRankPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.addEvntBut("a_list_bg", this._bottomRender);
            this.addChild(this._topRender.getComponent("a_bottom_line"));
            this.addChild(this._topRender.getComponent("a_top_line"));
            this.a_self_tip = this.addChild(this._topRender.getComponent("a_self_tip"));
            this.bossRankList = new BossRankList();
            this.bossRankList.init(this._midRender.uiAtlas);
            this.applyLoadComplete();
        };
        BossRankPanel.prototype.hide = function () {
            if (this.bossRankList) {
                this.bossRankList.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
        };
        BossRankPanel.prototype.show = function (value) {
            var _this = this;
            UIManager.getInstance().addUIContainer(this);
            this.bossRankList.show();
            TimeUtil.addFrameTick(this._frameFun);
            if (!value) {
                TimeUtil.addTimeOut(5000, function () { _this.hide(); });
            }
        };
        BossRankPanel.prototype.refreshOwn = function () {
            /*
            var listary: Array<faction.RankVo>  = faction.FactionBossModel.getInstance().getRankList(GuidData.faction.getBosschallengeidCur());
            var join: boolean = false;
            var $str:string=""
            for (var i = 0; i < listary.length; i++) {
                if (listary[i].isme) {
                    $str +=String(listary[i].rankid)+"     ";
                    $str += getBaseName(listary[i].name) + "     ";
                    $str += listary[i].ratio + "%";
           
                    join = true;
                    break;
                }
            }
            if (!join) {
                $str = "暂时没有上榜单";
            }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_self_tip.skinName, $str, 14, TextAlign.CENTER, ColorType.Greenadff00);
            */
            var $str = "";
            if (this.mineNum == -1) {
                $str = "暂时没有上榜单";
            }
            else {
                $str = (this.mineNum + 1) + "  " + getBaseName(GuidData.player.getName());
            }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_self_tip.skinName, $str, 14, TextAlign.CENTER, ColorType.Greenadff00);
        };
        BossRankPanel.prototype.setRankData = function ($s2c_boss_rank) {
            var ary = new Array;
            for (var i = 0; i < $s2c_boss_rank.rankList.length; i++) {
                var $vo = new SListItemData;
                var $BossRankCellVo = new BossRankCellVo();
                $BossRankCellVo.rankid = i + 1;
                $BossRankCellVo.name = $s2c_boss_rank.rankList[i].name;
                $BossRankCellVo.ratio = Math.floor($s2c_boss_rank.rankList[i].value * 10) / 10;
                $vo.data = $BossRankCellVo;
                $vo.id = i;
                ary.push($vo);
            }
            this.mineNum = $s2c_boss_rank.mine;
            this.bossRankList.refreshData(ary);
            //console.log("更新数据")
            this.refreshOwn();
        };
        BossRankPanel.prototype.upTime = function (t) {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
            }
            else {
                var $time = Math.floor(TimeUtil.getTimer() / 1000);
                if (this._curtime != $time) {
                    this._curtime = $time;
                    //console.log("更新", this._curtime)
                    this._curtime = $time;
                    if (this.bossRankList && this.bossRankList.hasStage) {
                        //  this.bossRankList.refreshDataByNewData();
                        this.refreshOwn();
                    }
                }
            }
        };
        return BossRankPanel;
    }(UIConatiner));
    boss.BossRankPanel = BossRankPanel;
})(boss || (boss = {}));
//# sourceMappingURL=BossRankPanel.js.map