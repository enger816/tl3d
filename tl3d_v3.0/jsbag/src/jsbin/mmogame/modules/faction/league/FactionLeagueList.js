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
var faction;
(function (faction) {
    var LeagueItem = /** @class */ (function () {
        function LeagueItem() {
        }
        return LeagueItem;
    }());
    faction.LeagueItem = LeagueItem;
    var FactionLeagueList = /** @class */ (function (_super) {
        __extends(FactionLeagueList, _super);
        function FactionLeagueList() {
            return _super.call(this) || this;
        }
        FactionLeagueList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        FactionLeagueList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, LeagueRender, 786, 265, 0, 74, 3, 512, 512, 1, 5, 1);
        };
        /**
         * refreshData
         */
        FactionLeagueList.prototype.refreshDataByNewData = function ($type) {
            var $ary = faction.FactionLeagueModel.getInstance().readData();
            var $sListItemData = this.getData($ary);
            this.refreshData($sListItemData);
        };
        FactionLeagueList.prototype.getData = function ($ary) {
            var ary = new Array;
            for (var i = 0; i < $ary.length; i++) {
                var item = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        };
        FactionLeagueList.prototype.show = function ($type) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData($type);
        };
        FactionLeagueList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return FactionLeagueList;
    }(SList));
    faction.FactionLeagueList = FactionLeagueList;
    var LeagueRender = /** @class */ (function (_super) {
        __extends(LeagueRender, _super);
        function LeagueRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LeagueRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            this._container = $container;
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var topRender = $customizeRenderAry[0];
            this.Bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 786, 71, 36, 22);
            $container.addChild(this.Bg);
            this.Line = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Line", 177, 33, 600, 6);
            $container.addChild(this.Line);
            this.LevPic = this.creatSUI(topRender, this.parentTarget.baseAtlas, "LevPic", 0, 6, 228, 61);
            $container.addChild(this.LevPic);
            this.aryType0 = new Array;
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name0", 339, 10, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name1", 533, 10, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name2", 339, 44, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name3", 533, 44, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "VS0", 483, 9, 35, 24));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "VS1", 483, 43, 35, 24));
            this.aryType1 = new Array;
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Winnername", 433, 11, 150, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name0", 265, 44, 130, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name1", 444, 44, 130, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Losername", 611, 44, 150, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Winner", 403, 4, 30, 30));
        };
        LeagueRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo = $data.data;
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Bg.skinName, UIData.publicUi, PuiData.A_LEAGUELISTBG);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Line.skinName, "Line");
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.LevPic.skinName, "lev" + $data.id);
                if (vo.type == 0) {
                    this.pushUI(this.aryType0);
                    this.popUI(this.aryType1);
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.aryType0[4].skinName, "VS");
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.aryType0[5].skinName, "VS");
                    for (var i = 0; i < vo.items.length; i++) {
                        var aaa = vo.items[i].name;
                        var aaa = getBaseName(aaa);
                        if (vo.items[i].guid == "") {
                            aaa = "轮空";
                        }
                        else {
                            if (vo.items[i].result > 0) {
                                var result = vo.items[i].result == 1 ? ColorType.Reddb4051 + "(负)" : ColorType.Green2ca937 + "(胜)";
                                aaa += result;
                            }
                        }
                        var color = i % 2 ? ColorType.Green20a200 : ColorType.Redd92200;
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.aryType0[i].skinName, aaa, 16, TextAlign.CENTER, color);
                    }
                }
                else {
                    this.popUI(this.aryType0);
                    this.pushUI(this.aryType1);
                    if ($data.id == 0) {
                        UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.aryType1[4].skinName, "Winner");
                    }
                    else {
                        UiDraw.clearUI(this.aryType1[4]);
                    }
                    for (var i = 0; i < vo.items.length; i++) {
                        var color;
                        var str = vo.items[i].name;
                        if (str != "") {
                            str = getBaseName(str);
                            if (i == 0) {
                                if ($data.id == 0) {
                                    color = ColorType.colorff7200;
                                }
                                else {
                                    str += "(晋级)";
                                    color = ColorType.Green2ca937;
                                }
                            }
                            else if (i == vo.items.length - 1) {
                                str += "(降级)";
                                color = ColorType.colorcd2000;
                            }
                            else {
                                color = ColorType.Brown7a2f21;
                            }
                        }
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.aryType1[i].skinName, str, 16, TextAlign.CENTER, color);
                    }
                }
            }
            else {
                this.setnull();
            }
        };
        LeagueRender.prototype.pushUI = function ($ary) {
            for (var i = 0; i < $ary.length; i++) {
                if (!$ary[i].parent) {
                    this._container.addChild($ary[i]);
                }
            }
        };
        LeagueRender.prototype.popUI = function ($ary) {
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i].parent) {
                    this._container.removeChild($ary[i]);
                }
            }
        };
        LeagueRender.prototype.setnull = function () {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Bg.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Line.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.LevPic.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
        };
        return LeagueRender;
    }(SListItem));
    faction.LeagueRender = LeagueRender;
})(faction || (faction = {}));
//# sourceMappingURL=FactionLeagueList.js.map