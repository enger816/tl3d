var mountui;
(function (mountui) {
    var MountSkillData = /** @class */ (function () {
        function MountSkillData() {
        }
        return MountSkillData;
    }());
    mountui.MountSkillData = MountSkillData;
    var MountLevAttribute = /** @class */ (function () {
        function MountLevAttribute() {
        }
        return MountLevAttribute;
    }());
    mountui.MountLevAttribute = MountLevAttribute;
    var HuanhuaVo = /** @class */ (function () {
        function HuanhuaVo() {
        }
        return HuanhuaVo;
    }());
    mountui.HuanhuaVo = HuanhuaVo;
    var NewMountModel = /** @class */ (function () {
        function NewMountModel() {
        }
        NewMountModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new NewMountModel();
            }
            return this._instance;
        };
        NewMountModel.prototype.getSkillList = function () {
            var skillary = new Array;
            var $list = GuidData.grow.getzuoqiJinengList();
            var tabary = tb.TB_mount_base_vo.getItem();
            for (var i = 0; i < tabary.length; i++) {
                if (tabary[i].skills.length == 0 || tabary[i].skills[0] == 0) {
                    continue;
                }
                var aa = new MountSkillData();
                aa.id = i;
                aa.tab = tb.TB_skill_base.get_TB_skill_base(tabary[i].skills[0]);
                //可升级的等级上限
                var levup = aa.tab.uplevel_id[1] - aa.tab.uplevel_id[0] + 1;
                aa.state = 2;
                aa.lev = tabary[i].id;
                aa.tabskill_uplev = null;
                for (var j = 0; j < $list.length; j++) {
                    if (tabary[i].skills[0] == $list[j].id) {
                        aa.lev = $list[j].lev;
                        j == $list.length;
                        if ($list[j].lev == levup) {
                            aa.state = 1;
                        }
                        else {
                            aa.state = 0;
                            aa.tabskill_uplev = tb.TB_skill_uplevel.get_TB_skill_uplevel(aa.tab.uplevel_id[0] + aa.lev - 1);
                        }
                    }
                }
                skillary.push(aa);
            }
            return skillary;
        };
        /**
         * 获取等级属性对象
         */
        NewMountModel.prototype.getLevAttribute = function () {
            var levattr = new MountLevAttribute();
            var mountlev = GuidData.grow.getMountlev();
            var tabary = tb.TB_mount_raise_level.get_TB_mount_raise_level();
            levattr.nexttab = null;
            levattr.curtab = tabary[mountlev - 1];
            if (mountlev < tabary.length) {
                //未满级
                levattr.nexttab = tabary[mountlev];
                levattr.state = 0;
                if (GuidData.player.getLevel() <= mountlev) {
                    levattr.state = 1;
                }
            }
            else {
                //满级
                levattr.state = 2;
            }
            //console.log("==-levattr=", levattr, mountlev);
            return levattr;
        };
        /**
         * 获取阶数属性对象
         */
        NewMountModel.prototype.getOrderAttribute = function () {
            var levattr = new MountLevAttribute();
            var tabary = tb.TB_mount_train_vo.getTabelItem();
            var mountlevel = GuidData.grow.getMountLevel() == 0 ? 1 : GuidData.grow.getMountLevel(); //阶数
            var start = GuidData.grow.getMountStart();
            var $id = (mountlevel - 1) * 11 + start + 1; //索引id计算
            levattr.nexttab = null;
            levattr.curtab = tabary[$id - 1];
            var finalvo = tabary[tabary.length - 1];
            if (mountlevel == finalvo.level && start == finalvo.star) {
                //满级
                levattr.state = 2;
            }
            else {
                //未满级
                levattr.nexttab = this.differenceNum(tabary[$id], tabary[$id - 1]);
                levattr.state = 0;
            }
            return levattr;
        };
        NewMountModel.prototype.differenceNum = function ($nexttab, $curtab) {
            var Numary = new Array;
            for (var i = 0; i < $nexttab.prosKeys.length; i++) {
                Numary.push($nexttab.prosValues[i] - $curtab.prosValues[i]);
            }
            return Numary;
        };
        /**
         * 获取幻化属性对象
         */
        NewMountModel.prototype.getHuanhuaAttribute = function ($id) {
            var levattr = new MountLevAttribute();
            var tab = tb.TB_mount_illusion_vo.get_TB_mount_illusion_vo($id);
            levattr.nexttab = null;
            levattr.curtab = tab;
            levattr.state = 2;
            return levattr;
        };
        /**
         * 获取幻化数据
         */
        NewMountModel.prototype.getHuanhuaVO = function () {
            var ary = new Array;
            var tabary = tb.TB_mount_illusion_vo.getTabelItem();
            for (var i = 0; i < tabary.length; i++) {
                var a = new HuanhuaVo();
                a.tab = tabary[i];
                a.id = tabary[i].id;
                //console.log("id -- ",a.id);
                a.state = this.isactivation(tabary[i].id);
                ary.push(a);
            }
            ary.sort(function (a, b) {
                if (a.state != b.state) {
                    if (a.state == 1 || b.state == 1) {
                        return a.state == 1 ? 1 : -1;
                    }
                    else {
                        return a.tab.id - b.tab.id;
                    }
                }
                else {
                    return a.tab.id - b.tab.id;
                }
            });
            return ary;
        };
        /**
         * 获取数组中，幻化指针索引
         */
        NewMountModel.prototype.getHuanhuaIndex = function () {
            var aary = this.getHuanhuaVO();
            //console.log("---aary--",aary);
            for (var i = 0; i < aary.length; i++) {
                if (aary[i].state == 2) {
                    return aary[i].id;
                }
            }
            //如果没有查询到，则返回幻化表第一条数据的id
            return aary[0].id;
        };
        NewMountModel.prototype.isactivation = function ($id) {
            //已激活id
            var $ActivatedList = GuidData.grow.getHuanhuaID();
            for (var index = 0; index < $ActivatedList.length; index++) {
                if ($ActivatedList[index] == $id) {
                    //已激活该幻化坐骑
                    if (GuidData.player.getMountHuanhua() == $id) {
                        return 2;
                    }
                    else {
                        return 0;
                    }
                }
            }
            return 1;
        };
        return NewMountModel;
    }());
    mountui.NewMountModel = NewMountModel;
    var MountUtil = /** @class */ (function () {
        function MountUtil() {
        }
        return MountUtil;
    }());
    mountui.MountUtil = MountUtil;
})(mountui || (mountui = {}));
//# sourceMappingURL=NewMountModel.js.map