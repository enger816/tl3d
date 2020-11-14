var fb;
(function (fb) {
    var FuBenResVo = /** @class */ (function () {
        function FuBenResVo() {
        }
        return FuBenResVo;
    }());
    fb.FuBenResVo = FuBenResVo;
    var FuBenModel = /** @class */ (function () {
        function FuBenModel() {
            this.initData();
        }
        FuBenModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FuBenModel();
            }
            return this._instance;
        };
        FuBenModel.prototype.getWorldBossReward = function () {
            var tabObj = TableData.getInstance().getData(TableData.tb_worldboss_base, 1);
            var obj = new Object;
            obj.name = "可能获得";
            obj.notarget = true;
            obj.morereward = true;
            var ary = new Array;
            for (var i = 0; i < tabObj.items.length; i++) {
                ary.push([tabObj.items[i], 1]);
            }
            obj.reward = ary;
            return obj;
        };
        FuBenModel.prototype.getTowerReawrd = function () {
            var floodID = GuidData.map.getTialID();
            var tabObj = TableData.getInstance().getData(TableData.tb_instance_trial, floodID);
            var obj = new Object;
            obj.name = "首通奖励";
            obj.reward = tabObj.firstReward;
            obj.lev = floodID;
            return obj;
        };
        FuBenModel.prototype.getResFubenRewad = function () {
            var floodID = GuidData.map.getResMapID();
            var tabObj = TableData.getInstance().getData(TableData.tb_instance_res, floodID);
            var obj = new Object;
            obj.name = "基础奖励";
            obj.reward = tabObj.basereward;
            return obj;
        };
        FuBenModel.prototype.getPersonBossRewad = function () {
            var floodID = GuidData.map.getPersonBossMapID();
            var tabObj = tb.Tb_private_boss_info.get_Tb_private_boss_infoById(floodID);
            // var tabObj: any = TableData.getInstance().getData(TableData.tb_private_boss_info, floodID);
            var obj = new Object;
            obj.name = "参与可能获得以下奖励";
            var aaa = new Array;
            for (var i = 0; i < tabObj.show.length; i++) {
                aaa.push([tabObj.show[i], 0]);
            }
            obj.reward = aaa;
            return obj;
        };
        FuBenModel.prototype.getFactionLeadRewad = function () {
            var floodID = GuidData.map.getReserve2();
            var tabObj = TableData.getInstance().getData(TableData.tb_faction_bossdefense_pool, floodID);
            var obj = new Object;
            obj.name = "首通奖励";
            obj.reward = tabObj.reward_preview;
            obj.lev = floodID;
            return obj;
        };
        FuBenModel.prototype.getFactionTripReward = function () {
            var floodID = GuidData.map.getFloorNum();
            var tabObj = TableData.getInstance().getData(TableData.tb_faction_tower_floor, floodID);
            var obj = new Object;
            obj.name = "参与可能获得以下奖励";
            obj.reward = tabObj.firstpass_reward;
            obj.lev = floodID;
            return obj;
        };
        FuBenModel.prototype.getTbGroupReward = function () {
            var $hardId = GuidData.map.getKuafuGropuInstanceFieldsHard();
            var $groupTb = tb.TB_group_instance_base.getTempVo($hardId);
            var $rewardid;
            var $rewardnum;
            var title;
            if (GuidData.player.isPlayerIntFieldGroupClearFlag($hardId)) {
                ////console.log("普通通关");
                title = "通关奖励";
                $rewardid = $groupTb.passRewardId;
                $rewardnum = $groupTb.passRewardCnt;
            }
            else {
                ////console.log("首次通关");
                title = "首通奖励";
                $rewardid = $groupTb.fpRewardId;
                $rewardnum = $groupTb.fpRewardCnt;
            }
            var $barr = new Array;
            for (var i = 0; i < $rewardid.length; i++) {
                var $tempArr = new Array();
                $tempArr.push($rewardid[i]);
                $tempArr.push($rewardnum[i]);
                $barr.push($tempArr);
            }
            var obj = new Object;
            obj.name = title;
            obj.reward = $barr;
            return obj;
        };
        FuBenModel.prototype.initData = function () {
            this.sweepLastTime = 0;
            this.vipItem = tb.TB_map_vip.getTabelItem();
            this.trialItem = tb.TB_map_trial.getTabelItem();
        };
        FuBenModel.prototype.refresh = function () {
            this.getVipData();
            this.getTrialData();
        };
        FuBenModel.prototype.getTrialData = function () {
            var A = GuidData.instanceData.getInstanceIntFieldTrialPassed();
            this.sweepCurrent = A[0];
            this.trialCurrent = A[1];
            //   this.sweepCurrent=2  
            var B = GuidData.instanceData.getInstanceIntFieldTrialSweep();
            this.sweepNum = B[0];
            this.canBuyNum = B[1];
            //    //console.log("今天可扫荡层次----", this.sweepCurrent);
            //    //console.log("可扫荡----", this.sweepNum);
            //    //console.log("可购买----", this.canBuyNum);
        };
        FuBenModel.prototype.getVipData = function () {
            var $list = GuidData.instanceData.getInstanceIntFieldVipSatrt();
            var selfForce = GuidData.player.getForce();
            for (var i = 0; i < this.vipItem.length; i++) {
                var $vo = this.vipItem[i];
                $vo.canPlayModel = 0; //可以达到的难度
                for (var j = 0; j < $vo.forces.length; j++) {
                    if (selfForce >= $vo.forces[j]) {
                        $vo.canPlayModel = j;
                    }
                }
                $vo.num = $list[i].num; //已挑战次数;
                $vo.buynum = $list[i].buys; //已购买次数;
                $vo.passed = $list[i].passed; //已通过的难度
            }
        };
        FuBenModel.prototype.getFubenResItem = function () {
            if (!this.fubenResItem) {
                this.fubenResItem = new Array();
                var $arr = tb.TB_instance_res.getTabelItem();
                var idx = -1;
                for (var i = 0; i < $arr.length; i++) {
                    if (idx != $arr[i].type) {
                        var $vo = new FuBenResVo();
                        $vo.data = $arr[i];
                        this.fubenResItem.push($vo);
                        idx = $arr[i].type;
                    }
                }
            }
            this.getResData();
            // this.fubenResItem.sort(function (a: fb.FuBenResVo, b: fb.FuBenResVo): number {
            //     return a.data.type - b.data.type;
            // })
            return this.fubenResItem;
        };
        FuBenModel.prototype.getResData = function () {
            var kk = GuidData.instanceData.getInstanceIntFieldResSatrt();
            for (var i = 0; i < this.fubenResItem.length; i++) {
                var $vo = this.fubenResItem[i];
                if (kk[i]) {
                    this.fubenResItem[i].num = kk[this.fubenResItem[i].data.type - 1].num;
                }
                $vo.maxtime = $vo.data.times;
            }
        };
        return FuBenModel;
    }());
    fb.FuBenModel = FuBenModel;
})(fb || (fb = {}));
//# sourceMappingURL=FuBenModel.js.map