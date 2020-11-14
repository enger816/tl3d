var role;
(function (role) {
    var TabItemData = /** @class */ (function () {
        function TabItemData() {
            this.selecteds = false;
        }
        return TabItemData;
    }());
    role.TabItemData = TabItemData;
    var TabKey = /** @class */ (function () {
        function TabKey() {
        }
        TabKey.TabAction = 1;
        TabKey.Tabdesignation = 2;
        return TabKey;
    }());
    role.TabKey = TabKey;
    var TitleData = /** @class */ (function () {
        function TitleData() {
            /** 数据状态   1：未获得  2：未查看  3：未装备  4：已装备 */
            this.state = 1;
        }
        return TitleData;
    }());
    role.TitleData = TitleData;
    var ObtainData = /** @class */ (function () {
        function ObtainData() {
            this.isObtain = false;
        }
        return ObtainData;
    }());
    role.ObtainData = ObtainData;
    var RoleModel = /** @class */ (function () {
        function RoleModel() {
            this.getBaseList();
        }
        RoleModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new RoleModel();
            }
            return this._instance;
        };
        RoleModel.prototype.getBaseList = function () {
            this._allachieveary = tb.TB_achieve_base.getTB_achieve_base();
            this._allachieveary.sort(function (a, b) {
                if (a.type == b.type) {
                    return a.id - b.id;
                }
                else {
                    return a.type - b.type;
                }
            });
            //console.log("---this._allary---", this._allachieveary);
            this._alltitleary = tb.TB_title_base.getTB_title_base();
        };
        RoleModel.prototype.getTabListByType = function ($type) {
            var lastvo;
            var type = -1;
            var stype = -1;
            var $ary = new Array;
            for (var i = 0; i < this._allachieveary.length; i++) {
                //先获取所有的一级页签
                if (this._allachieveary[i].type != type) {
                    //是否有这个一级页签  没有，则添加上去
                    type = this._allachieveary[i].type;
                    var tabitemData = new TabItemData();
                    tabitemData.state = 1;
                    tabitemData.id = type;
                    tabitemData.name = "T1_" + type;
                    tabitemData.isredpoint = this.isredpointByOne(type);
                    if ($type == type) {
                        tabitemData.selecteds = true;
                    }
                    else {
                        tabitemData.selecteds = false;
                    }
                    $ary.push(tabitemData);
                }
                //再获取选中的一级页签下的，二级页签
                if ($type == this._allachieveary[i].type && this._allachieveary[i].stype != stype) {
                    //二级页签 当前选中的一级页签下的二级页签
                    stype = this._allachieveary[i].stype;
                    var tabitemData = new TabItemData();
                    tabitemData.state = 2;
                    tabitemData.id = stype;
                    tabitemData.name = "T1_" + type + "_" + stype;
                    this.setAry(tabitemData, this._allachieveary[i].type, this._allachieveary[i].stype);
                    tabitemData.isredpoint = this.isredpointBytwo(tabitemData.data);
                    $ary.push(tabitemData);
                }
            }
            return $ary;
        };
        RoleModel.prototype.setAry = function ($tabitemData, $type, $stype) {
            var $ary1 = new Array; //已完成 已领取
            var $ary2 = new Array; //已完成 未领取
            var $ary3 = new Array; //未完成
            for (var i = 0; i < this._allachieveary.length; i++) {
                if (this._allachieveary[i].type == $type && this._allachieveary[i].stype == $stype) {
                    var bb = GuidData.quest.getAchieveInfo(this._allachieveary[i].id);
                    bb.data = this._allachieveary[i];
                    if (bb.hasReach && bb.hasReward) {
                        $ary1.push(bb);
                    }
                    if (bb.hasReach && !bb.hasReward) {
                        $ary2.push(bb);
                    }
                    if (!bb.hasReach) {
                        $ary3.push(bb);
                    }
                }
            }
            var list = $ary2.concat($ary3, $ary1);
            $tabitemData.data = list;
            return list;
        };
        RoleModel.prototype.getFirstList = function () {
            var $type = 1;
            var $stype = 1;
            for (var i = 0; i < this._allachieveary.length; i++) {
                var bb = GuidData.quest.getAchieveInfo(this._allachieveary[i].id);
                bb.data = this._allachieveary[i];
                if (bb.hasReach && !bb.hasReward) {
                    $type = this._allachieveary[i].type;
                    $stype = this._allachieveary[i].stype;
                    break;
                }
            }
            return this.setAry(new TabItemData, $type, $stype);
        };
        RoleModel.prototype.getListBy2Type = function ($type, $stype) {
            return this.setAry(new TabItemData, $type, $stype);
        };
        RoleModel.prototype.isredpointByOne = function ($type) {
            for (var i = 0; i < this._allachieveary.length; i++) {
                if (this._allachieveary[i].type == $type) {
                    var aa = GuidData.quest.getAchieveInfo(this._allachieveary[i].id);
                    if (aa.hasReach && !aa.hasReward) {
                        return true;
                    }
                }
            }
            return false;
        };
        RoleModel.prototype.isredpointBytwo = function ($data) {
            for (var i = 0; i < $data.length; i++) {
                if ($data[i].hasReach && !$data[i].hasReward) {
                    return true;
                }
            }
            return false;
        };
        /**
         * getListByTab
         */
        RoleModel.prototype.getListByTab = function ($type) {
            var typeAry = new Array;
            for (var i = 0; i < this._alltitleary.length; i++) {
                if (this._alltitleary[i].type == $type) {
                    var aary = new TitleData();
                    aary.data = this._alltitleary[i];
                    typeAry.push(aary);
                }
            }
            var okary = new Array; //已获得称号
            var noary = new Array; //未获得称号
            for (var i = 0; i < typeAry.length; i++) {
                var $obtainData = this.obtainTitle(typeAry[i]);
                if ($obtainData.isObtain) {
                    typeAry[i].time = $obtainData.time;
                    if ($obtainData.init) {
                        typeAry[i].state = 3;
                    }
                    else {
                        typeAry[i].state = 2;
                    }
                    okary.push(typeAry[i]);
                }
                else {
                    noary.push(typeAry[i]);
                }
            }
            //已获得装备的排序
            okary = this.SortByQualityDESC(okary);
            var currenttitle = GuidData.player.getTitleID();
            if (currenttitle != 0) {
                var vobyid = tb.TB_title_base.get_TB_title_baseById(currenttitle);
                if (vobyid.type == $type) {
                    //当前装备称号在此分类中
                    for (var i = 0; i < okary.length; i++) {
                        if (currenttitle == okary[i].data.id) {
                            var aaa = okary[i];
                            aaa.state = 4;
                            //删除
                            okary.splice(i, 1);
                            //插入
                            okary.splice(0, 0, aaa);
                        }
                    }
                }
            }
            else {
                // //console.log("当前无装备称号");
            }
            //未获得装备的排序
            noary = this.SortByQualityASC(noary);
            return okary.concat(noary);
        };
        RoleModel.prototype.SortByQualityDESC = function ($ary) {
            //按品质降序排序
            $ary.sort(function (a, b) {
                if (a.data.qua == b.data.qua) {
                    return b.data.id - a.data.id;
                }
                else {
                    return b.data.qua - a.data.qua;
                }
            });
            return $ary;
        };
        RoleModel.prototype.SortByQualityASC = function ($ary) {
            //按品质升序排序
            $ary.sort(function (a, b) {
                if (a.data.qua == b.data.qua) {
                    return a.data.id - b.data.id;
                }
                else {
                    return a.data.qua - b.data.qua;
                }
            });
            return $ary;
        };
        RoleModel.prototype.obtainTitle = function ($vo) {
            var a = GuidData.quest.getTitleList();
            var obtainData = new ObtainData();
            if (a) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == $vo.data.id) {
                        //封装成一个对象过去。
                        obtainData.isObtain = true;
                        obtainData.init = a[i].init;
                        obtainData.time = a[i].time;
                    }
                }
            }
            return obtainData;
        };
        return RoleModel;
    }());
    role.RoleModel = RoleModel;
})(role || (role = {}));
//# sourceMappingURL=RoleModel.js.map