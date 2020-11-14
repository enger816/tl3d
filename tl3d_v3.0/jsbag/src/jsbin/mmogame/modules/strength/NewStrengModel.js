var strengthgem;
(function (strengthgem) {
    var WashVo = /** @class */ (function () {
        function WashVo() {
        }
        return WashVo;
    }());
    strengthgem.WashVo = WashVo;
    var StrengVo = /** @class */ (function () {
        function StrengVo() {
        }
        return StrengVo;
    }());
    strengthgem.StrengVo = StrengVo;
    var RefiningVo = /** @class */ (function () {
        function RefiningVo() {
        }
        return RefiningVo;
    }());
    strengthgem.RefiningVo = RefiningVo;
    var GemVo = /** @class */ (function () {
        function GemVo() {
        }
        return GemVo;
    }());
    strengthgem.GemVo = GemVo;
    var NewStrengModel = /** @class */ (function () {
        function NewStrengModel() {
        }
        NewStrengModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new NewStrengModel();
            }
            return this._instance;
        };
        /**
         * 强化数据
         * @param
         */
        NewStrengModel.prototype.getstrengvo = function ($part) {
            var aaa = new StrengVo();
            aaa.partid = $part;
            aaa.partlev = GuidData.grow.getPartStrengLev($part);
            aaa.curtab = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById($part, aaa.partlev);
            var $nexobj = TableData.getInstance().getData(TableData.tb_equipdevelop_strength, $part * 1000 + aaa.partlev + 1);
            if ($nexobj) {
                aaa.state = 1;
                aaa.nexttab = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById($part, aaa.partlev + 1);
            }
            else {
                aaa.state = 0;
            }
            return aaa;
        };
        /**
         * 精炼数据
         * @param
         */
        NewStrengModel.prototype.getrefiningvo = function ($part) {
            var bbb = new RefiningVo();
            bbb.partid = $part;
            bbb.partlevstar = GuidData.grow.getPartRefineVo($part);
            bbb.curtab = tb.TB_equipdevelop_refine.get_TB_equipdevelop_refineById($part, bbb.partlevstar[0], bbb.partlevstar[1]);
            if (bbb.curtab.lvup_type == 0) {
                bbb.state = 0;
            }
            else {
                bbb.state = 1;
                if (bbb.curtab.lvup_type == 2) {
                    bbb.nexttab = tb.TB_equipdevelop_refine.get_TB_equipdevelop_refineById($part, bbb.partlevstar[0] + 1, 1);
                }
                else {
                    bbb.nexttab = tb.TB_equipdevelop_refine.get_TB_equipdevelop_refineById($part, bbb.partlevstar[0], bbb.partlevstar[1] + 1);
                }
            }
            return bbb;
        };
        /**
         * 镶嵌宝石数据
         * @param
         */
        NewStrengModel.prototype.getGemvo = function ($part, gemlevary) {
            if (gemlevary === void 0) { gemlevary = null; }
            var tab = tb.TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_partById($part);
            //var gemlevary: Array<number> = GuidData.grow.getPartGemVo($part);
            if (!gemlevary) {
                gemlevary = GuidData.grow.getPartGemVo($part);
            }
            var gemvoary = new Array;
            for (var index = 0; index < gemlevary.length; index++) {
                var ccc = new GemVo();
                ccc.index = index + 1;
                ccc.partid = $part;
                ccc.gemid = tab.gem_array[index];
                ccc.gemlev = gemlevary[index];
                var $nextobj = TableData.getInstance().getData(TableData.tb_equipdevelop_gem, ccc.gemid * 1000 + ccc.gemlev + 1);
                var needgemlev = ccc.gemlev;
                if (ccc.gemlev == 0) {
                    var partlevstar = GuidData.grow.getPartRefineVo($part);
                    if (tab.unlock_strength_lv[index] <= GuidData.grow.getPartStrengLev($part) && partlevstar[0] >= tab.unlock_refine_lv[index]) {
                        ccc.state = 1;
                        //未解锁时。获取1级时的状态
                        needgemlev = 1;
                        ccc.nexttab = tb.TB_equipdevelop_gem.get_TB_equipdevelop_gemById(ccc.gemid, 1);
                    }
                    else {
                        needgemlev = 1;
                        ccc.state = 2;
                    }
                }
                else if ($nextobj == null) {
                    ccc.state = 4;
                }
                else {
                    ccc.state = 3;
                    ccc.nexttab = tb.TB_equipdevelop_gem.get_TB_equipdevelop_gemById(ccc.gemid, ccc.gemlev + 1);
                }
                ccc.curtab = tb.TB_equipdevelop_gem.get_TB_equipdevelop_gemById(ccc.gemid, needgemlev);
                gemvoary.push(ccc);
            }
            return gemvoary;
        };
        return NewStrengModel;
    }());
    strengthgem.NewStrengModel = NewStrengModel;
    var StrengUtil = /** @class */ (function () {
        function StrengUtil() {
        }
        StrengUtil.setEquIcon = function ($ui, $iconUrl, $lev, $selected, $type, $que, $baselev) {
            if ($iconUrl) {
                //var $url: string = getIconUrl(entryData.icon);
                IconManager.getInstance().getIcon($iconUrl, function ($img) {
                    var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
                    //console.log("---$que--", $que);
                    //头像
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($que), new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4 + 4, 4, 60, 60);
                    UiDraw.cxtDrawImg(ctx, "A_JJ" + $baselev, new Rectangle(4 + 4, 4, 41, 17), UIData.publicUi);
                    // UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4 + 4, 4, 41, 17), UIData.publicUi);
                    // ArtFont.getInstance().writeFontToCtxCenten(ctx, String($baselev), ArtFont.num63, 20, 4, 4);
                    if ($selected) {
                        UiDraw.cxtDrawImg(ctx, PuiData.Select, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
                    }
                    if ($type == StrengUtil.REFINING) {
                        var btnbg = $ui.uiRender.uiAtlas.getRec("LevBg");
                        ctx.drawImage($ui.uiRender.uiAtlas.useImg, btnbg.pixelX, btnbg.pixelY, btnbg.pixelWitdh, btnbg.pixelHeight, 38 + 4, 53, btnbg.pixelWitdh, btnbg.pixelHeight);
                        LabelTextFont.writeSingleLabelToCtx(ctx, ColorType.Whiteffffff + "+" + $lev[0], 14, -8, 53, TextAlign.RIGHT);
                    }
                    else if ($type == StrengUtil.STRENG) {
                        var DanBg = $ui.uiRender.uiAtlas.getRec("DanBg");
                        ctx.drawImage($ui.uiRender.uiAtlas.useImg, DanBg.pixelX, DanBg.pixelY, DanBg.pixelWitdh, DanBg.pixelHeight, 0, 72 - DanBg.pixelHeight, DanBg.pixelWitdh, DanBg.pixelHeight);
                        var StarBg = $ui.uiRender.uiAtlas.getRec("StarBg");
                        ctx.drawImage($ui.uiRender.uiAtlas.useImg, StarBg.pixelX, StarBg.pixelY, StarBg.pixelWitdh, StarBg.pixelHeight, 46 + 3, 72 - StarBg.pixelHeight, StarBg.pixelWitdh, StarBg.pixelHeight);
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[0], 14, 11 + 3, 49, TextAlign.CENTER);
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[1], 14, 61 + 3, 49, TextAlign.CENTER);
                    }
                    else if ($type == StrengUtil.GEM) {
                        for (var index = 0; index < $lev.length; index++) {
                            var Light = $lev[index] < 3 ? "Lightdown" : "Lightup";
                            var LightBg = $ui.uiRender.uiAtlas.getRec(Light);
                            ctx.drawImage($ui.uiRender.uiAtlas.useImg, LightBg.pixelX, LightBg.pixelY, LightBg.pixelWitdh, LightBg.pixelHeight, 13 + 4 + index * 15, 52, LightBg.pixelWitdh, LightBg.pixelHeight);
                        }
                    }
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            }
        };
        /**没有装备的框 */
        StrengUtil.setEquNoIcon = function ($ui, $partid, $lev, $selected, $type) {
            var $rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
            if ($selected) {
                UiDraw.cxtDrawImg(ctx, PuiData.Select, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
            }
            var tx = -4; //兼容tx
            if ($type == StrengUtil.REFINING) {
                var btnbg = $ui.uiRender.uiAtlas.getRec("LevBg");
                ctx.drawImage($ui.uiRender.uiAtlas.useImg, btnbg.pixelX, btnbg.pixelY, btnbg.pixelWitdh, btnbg.pixelHeight, 38 + 4, 53, btnbg.pixelWitdh, btnbg.pixelHeight);
                LabelTextFont.writeSingleLabelToCtx(ctx, ColorType.Whiteffffff + "+" + $lev[0], 14, -8, 53, TextAlign.RIGHT);
            }
            else if ($type == StrengUtil.STRENG) {
                var DanBg = $ui.uiRender.uiAtlas.getRec("DanBg");
                ctx.drawImage($ui.uiRender.uiAtlas.useImg, DanBg.pixelX, DanBg.pixelY, DanBg.pixelWitdh, DanBg.pixelHeight, 0, 72 - DanBg.pixelHeight, DanBg.pixelWitdh, DanBg.pixelHeight);
                var StarBg = $ui.uiRender.uiAtlas.getRec("StarBg");
                ctx.drawImage($ui.uiRender.uiAtlas.useImg, StarBg.pixelX, StarBg.pixelY, StarBg.pixelWitdh, StarBg.pixelHeight, 46 + 3, 72 - StarBg.pixelHeight, StarBg.pixelWitdh, StarBg.pixelHeight);
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[0], 14, 11 + 3, 49, TextAlign.CENTER);
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[1], 14, 61 + 3, 49, TextAlign.CENTER);
            }
            else if ($type == StrengUtil.GEM) {
                for (var index = 0; index < $lev.length; index++) {
                    var Light = $lev[index] < 3 ? "Lightdown" : "Lightup";
                    var LightBg = $ui.uiRender.uiAtlas.getRec(Light);
                    ctx.drawImage($ui.uiRender.uiAtlas.useImg, LightBg.pixelX, LightBg.pixelY, LightBg.pixelWitdh, LightBg.pixelHeight, 13 + 4 + index * 15, 52, LightBg.pixelWitdh, LightBg.pixelHeight);
                }
            }
            LabelTextFont.writeSingleLabelToCtx(ctx, ColorType.Browndb39264 + StrengUtil.equProp[$partid - 1], 14, tx + 4, 26, TextAlign.CENTER);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        };
        StrengUtil.parseStr = function ($str) {
            var vo = new WashVo;
            var ary = $str.split("|");
            var count = Number(ary[1]);
            var group = new Array;
            for (var i = 0; i < count; i++) {
                var aa = new Array;
                var attrId = Number(ary[3 + i * 3]);
                var val = Number(ary[4 + i * 3]);
                var qua = Number(ary[5 + i * 3]);
                aa.push(attrId);
                aa.push(val);
                aa.push(qua);
                group.push(aa);
            }
            vo.attrary = group;
            vo.guid = ary[0];
            vo.partid = Number(ary[2]);
            return vo;
        };
        StrengUtil.getMinMax = function ($itemid, $attrid) {
            var tab = tb.TB_item_template.get_TB_item_template($itemid);
            //console.log("-----------$itemid-------", $itemid, $attrid, tab.forge_pro);
            for (var i = 0; i < tab.forge_pro.length; i++) {
                if (tab.forge_pro[i][0] == $attrid) {
                    return tab.forge_pro[i];
                }
            }
            return null;
        };
        StrengUtil.GENERAL = "GENERAL";
        StrengUtil.STRENG = "STRENG";
        StrengUtil.REFINING = "REFINING";
        StrengUtil.GEM = "GEM";
        // public static drawCost($ui: UICompenent, $CostAry: Array<number>): boolean {
        //     var costnum: string;
        //     var flag: boolean;
        //     var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($CostAry[0])
        //     if ($vo.money_type && $vo.money_type > 0) {
        //         //资源
        //         if (GuidData.player.getResType($vo.money_type - 1) >= $CostAry[1]) {
        //             costnum = ColorType.Green98ec2c + Snum($CostAry[1]);
        //             flag = true;
        //         } else {
        //             flag = false;
        //             costnum = ColorType.Redce0a00 + Snum($CostAry[1]);
        //         }
        //     } else {
        //         //材料
        //         if (GuidData.bag.hasItem($CostAry[0], $CostAry[1])) {
        //             costnum = ColorType.Green98ec2c + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
        //             flag = true;
        //         } else {
        //             flag = false;
        //             costnum = ColorType.Redce0a00 + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
        //         }
        //     }
        //     LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, costnum, 14, TextAlign.CENTER);
        //     return flag;
        // }
        StrengUtil.KeyNameByType = ["强化大师", "精炼大师", "镶嵌大师"];
        StrengUtil.equProp = ["武器", "衣服", "护手", "腰带", "鞋子", "头饰", "项链", "手镯", "戒指", "腰坠"];
        return StrengUtil;
    }());
    strengthgem.StrengUtil = StrengUtil;
})(strengthgem || (strengthgem = {}));
//# sourceMappingURL=NewStrengModel.js.map