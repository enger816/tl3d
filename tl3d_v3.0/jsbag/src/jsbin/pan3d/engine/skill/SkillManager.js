var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var SkillManager = /** @class */ (function (_super) {
        __extends(SkillManager, _super);
        function SkillManager() {
            var _this = 
            //this._dic = new Object();
            _super.call(this) || this;
            _this._time = 0;
            _this._skillDic = new Object;
            _this._loadDic = new Object;
            _this._skillAry = new Array;
            _this._preLoadDic = new Object;
            return _this;
        }
        SkillManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new SkillManager();
            }
            return this._instance;
        };
        SkillManager.prototype.update = function () {
            var _tempTime = Pan3d.TimeUtil.getTimer();
            var t = _tempTime - this._time;
            for (var i = 0; i < this._skillAry.length; i++) {
                this._skillAry[i].update(t);
            }
            this._time = _tempTime;
        };
        SkillManager.prototype.preLoadSkill = function ($url) {
            var _this = this;
            if (this._dic[$url] || this._preLoadDic[$url]) {
                return;
            }
            Pan3d.ResManager.getInstance().loadSkillRes(Pan3d.Scene_data.fileRoot + $url, function ($skillRes) {
                var skillData = new Pan3d.SkillData();
                skillData.data = $skillRes.data;
                skillData.useNum++;
                _this._dic[$url] = skillData;
                _this.addSrc($url, skillData);
            });
            this._preLoadDic[$url] = true;
        };
        //public fengbaonum:number = 0;
        SkillManager.prototype.getSkill = function ($url, $name, $callback) {
            var _this = this;
            if ($callback === void 0) { $callback = null; }
            var skill;
            var key = $url + $name;
            // if(key == "skill/jichu_1_byte.txtm_skill_04"){
            //     console.log("添加技能风暴");
            //     this.fengbaonum++;
            // }
            var ary = this._skillDic[key];
            if (ary) {
                for (var i = 0; i < ary.length; i++) {
                    skill = ary[i];
                    if (skill.isDeath && skill.useNum == 0) {
                        skill.reset();
                        skill.isDeath = false;
                        return skill;
                    }
                }
            }
            skill = new Pan3d.Skill();
            skill.name = $name;
            skill.isDeath = false;
            if (!this._skillDic[key]) {
                this._skillDic[key] = new Array;
            }
            this._skillDic[key].push(skill);
            if (this._dic[$url]) {
                skill.setData(this._dic[$url].data[skill.name], this._dic[$url]);
                skill.key = key;
                this._dic[$url].useNum++;
                return skill;
            }
            if (this._loadDic[$url]) {
                var obj = new Object;
                obj.name = $name;
                obj.skill = skill;
                obj.callback = $callback;
                this._loadDic[$url].push(obj);
                return skill;
            }
            this._loadDic[$url] = new Array;
            var obj = new Object;
            obj.name = $name;
            obj.skill = skill;
            obj.callback = $callback;
            this._loadDic[$url].push(obj);
            Pan3d.ResManager.getInstance().loadSkillRes(Pan3d.Scene_data.fileRoot + $url, function ($skillRes) {
                _this.loadSkillCom($url, $skillRes);
            });
            return skill;
        };
        SkillManager.prototype.loadSkillCom = function ($url, $skillRes) {
            var skillData = new Pan3d.SkillData();
            skillData.data = $skillRes.data;
            for (var i = 0; i < this._loadDic[$url].length; i++) {
                var obj = this._loadDic[$url][i];
                if (!obj.skill.hasDestory) {
                    obj.skill.setData(skillData.data[obj.name], skillData);
                    obj.skill.key = $url + obj.name;
                    skillData.useNum++;
                }
            }
            this._dic[$url] = skillData;
            this.addSrc($url, skillData);
            for (var i = 0; i < this._loadDic[$url].length; i++) {
                var obj = this._loadDic[$url][i];
                if (obj.callback) {
                    obj.callback();
                }
            }
            this._loadDic[$url].length = 0;
            this._loadDic[$url] = null;
        };
        SkillManager.prototype.addSrc = function ($url, skillData) {
            for (var key in skillData.data) {
                var skill = new Pan3d.Skill();
                skill.name = key;
                skill.isDeath = true;
                skill.src = true;
                skill.setData(skillData.data[key], skillData);
                skillData.addSrcSkill(skill);
                //skillData.useNum++;
                var dkey = $url + key;
                if (!this._skillDic[dkey]) {
                    this._skillDic[dkey] = new Array;
                }
                this._skillDic[dkey].push(skill);
            }
        };
        SkillManager.prototype.playSkill = function ($skill) {
            this._skillAry.push($skill);
            $skill.play();
        };
        SkillManager.prototype.removeSkill = function ($skill) {
            var index = this._skillAry.indexOf($skill);
            if (index != -1) {
                this._skillAry.splice(index, 1);
            }
        };
        SkillManager.prototype.gcSkill = function (skill) {
            for (var key in this._skillDic) {
                var ary = this._skillDic[key];
                var idx = ary.indexOf(skill);
                if (idx != -1) {
                    ary.splice(idx, 1);
                }
            }
        };
        SkillManager.prototype.gc = function () {
            //super.gc();
            for (var key in this._dic) {
                var rc = this._dic[key];
                if (rc.useNum <= 0) {
                    rc.idleTime++;
                    if (rc.idleTime >= Pan3d.ResCount.GCTime && rc.testDestory()) {
                        //console.log("清理 -" + key);
                        rc.destory();
                        delete this._dic[key];
                    }
                }
            }
            for (var key in this._skillDic) {
                var ary = this._skillDic[key];
                for (var i = ary.length - 1; i >= 0; i--) {
                    if (ary[i].isDeath && ary[i].useNum <= 0) {
                        ary[i].idleTime++;
                        if (ary[i].idleTime >= Pan3d.ResCount.GCTime) {
                            if (!ary[i].src) {
                                ary[i].destory();
                                ary.splice(i, 1);
                            }
                        }
                    }
                }
                if (ary.length == 0) {
                    //console.log("清理 -" + key);
                    delete this._skillDic[key];
                }
            }
        };
        return SkillManager;
    }(Pan3d.ResGC));
    Pan3d.SkillManager = SkillManager;
    var ShockUtil = /** @class */ (function () {
        function ShockUtil() {
            var _this = this;
            this.upFun = function ($d) {
                _this.update($d);
            };
        }
        ShockUtil.getInstance = function () {
            if (!this._instance) {
                this._instance = new ShockUtil();
            }
            return this._instance;
        };
        ShockUtil.prototype.update = function ($dtime) {
            this.ctime += $dtime;
            if (this.ctime > this.time) {
                Pan3d.TimeUtil.removeFrameTick(this.upFun);
                Pan3d.Scene_data.cam3D.offset.setTo(0, 0, 0);
                return;
            }
            var ranX = (Math.random() - 0.5) * this.amp;
            var ranY = (Math.random() - 0.5) * this.amp;
            var ranZ = (Math.random() - 0.5) * this.amp;
            Pan3d.Scene_data.cam3D.offset.setTo(ranX, ranY, ranZ);
        };
        ShockUtil.prototype.shock = function (time, amp) {
            this.time = time;
            this.ctime = 0;
            this.amp = amp;
            Pan3d.TimeUtil.addFrameTick(this.upFun);
        };
        return ShockUtil;
    }());
    Pan3d.ShockUtil = ShockUtil;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillManager.js.map