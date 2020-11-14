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
var loginnew;
(function (loginnew) {
    var SkillSceneChar = /** @class */ (function (_super) {
        __extends(SkillSceneChar, _super);
        function SkillSceneChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillSceneChar.prototype.onMeshLoaded = function () {
            _super.prototype.onMeshLoaded.call(this);
            if (this.loadFinishFun) {
                this.loadFinishFun();
            }
        };
        SkillSceneChar.prototype.changeAction = function ($action) {
            this.curentAction = this._defaultAction;
            if (this.changeActionFun) {
                this.changeActionFun($action);
            }
        };
        SkillSceneChar.prototype.updateFrame = function (t) {
            //  this._completeState = 1;
            _super.prototype.updateFrame.call(this, t);
        };
        SkillSceneChar.prototype.update = function () {
            if (this.curentAction && this._animDic[this.curentAction]) {
            }
            _super.prototype.update.call(this);
        };
        Object.defineProperty(SkillSceneChar.prototype, "shadow", {
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        SkillSceneChar.prototype.destory = function () {
            if (this.loadFinishFun) {
                this.loadFinishFun = null;
            }
            if (this.changeActionFun) {
                this.changeActionFun = null;
            }
            _super.prototype.destory.call(this);
        };
        return SkillSceneChar;
    }(SceneChar));
    var RoleAndSkillVo = /** @class */ (function () {
        function RoleAndSkillVo($skillFileName, $charIdstr, $weaponNum, $skillEffectItem) {
            this.skillFileName = "login_5";
            this.charIdstr = "login_5";
            this.weaponNum = 50011;
            this.skipId = 0;
            this.skillEffectItem = ["skill_01"];
            this.skillFileName = $skillFileName;
            this.charIdstr = $charIdstr;
            this.weaponNum = $weaponNum;
            this.skillEffectItem = $skillEffectItem;
        }
        return RoleAndSkillVo;
    }());
    loginnew.RoleAndSkillVo = RoleAndSkillVo;
    var LoginNewPanel = /** @class */ (function (_super) {
        __extends(LoginNewPanel, _super);
        function LoginNewPanel() {
            var _this = _super.call(this) || this;
            _this._mainType = 1;
            _this._raceBgPos = [[18, 89], [30, 229], [55, 357]];
            _this._raceBgSelPos = [-15, -13];
            _this._roYNum = 0;
            _this._raceType = 0;
            _this._genderType = 0;
            _this.lastShowID = -1;
            _this.genderUint = 1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._baImg = new UIBackImg();
            //     this._baImg.setImgInfo("ui/load/loginbg/1.jpg", 960, 540);
            _this.addRender(_this._baImg);
            _this._baImg.sortnum = -1;
            _this._baseBgRender = new UIRenderComponent();
            _this.addRender(_this._baseBgRender);
            _this._bgRender = new UIRenderComponent();
            _this.addRender(_this._bgRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this._baseUiAtlas = new UIAtlas();
            _this._leftTop = new UIVirtualContainer();
            _this._leftTop.width = _this.width;
            _this._leftTop.height = _this.height;
            _this._leftTop.left = 0;
            _this._leftTop.top = 0;
            _this.addVirtualContainer(_this._leftTop);
            _this._rightTop = new UIVirtualContainer();
            _this._rightTop.width = _this.width;
            _this._rightTop.height = _this.height;
            _this._rightTop.right = 0;
            _this._rightTop.top = 0;
            _this.addVirtualContainer(_this._rightTop);
            _this._leftBottom = new UIVirtualContainer();
            _this._leftBottom.width = _this.width;
            _this._leftBottom.height = _this.height;
            _this._leftBottom.left = 0;
            _this._leftBottom.bottom = 0;
            _this.addVirtualContainer(_this._leftBottom);
            _this._rightBottom = new UIVirtualContainer();
            _this._rightBottom.width = _this.width;
            _this._rightBottom.height = _this.height;
            _this._rightBottom.right = 0;
            _this._rightBottom.bottom = 0;
            _this.addVirtualContainer(_this._rightBottom);
            Engine.resReady();
            return _this;
        }
        LoginNewPanel.prototype.dispose = function () {
            this._baImg.dispose();
            this._baImg = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        };
        LoginNewPanel.prototype.setData = function ($data) {
            var _this = this;
            this._data = $data;
            if (this._data.queen_name != "") {
                this._mainType = 1;
            }
            this._baseUiAtlas.setInfo("ui/uidata/login/loginnew.xml", "ui/uidata/login/loginnew.png", function () { _this.loadConfigCom(); });
        };
        LoginNewPanel.prototype.initUI = function () {
            //this.addUIList([, "t_bg2"], this._baseBgRender);
            this.bg1 = this._baseBgRender.getComponent("t_bg1");
            this._leftTop.addChild(this.bg1);
            this.bg2 = this._baseBgRender.getComponent("t_bg2");
            this._rightTop.addChild(this.bg2);
            var back1 = this._bgRender.getComponent("t_back1");
            this._leftTop.addChild(back1);
            var back2 = this._bgRender.getComponent("t_back2");
            this._leftTop.addChild(back2);
            var info0 = this._bgRender.getComponent("t_info0");
            this._rightBottom.addChild(info0);
            //this.addChild(this._bgRender.getComponent("t_name_bg"));
            // this.addUIList(["t_back1", "t_back2", "t_info0", "t_name_bg"], this._bgRender);
            this._qiangkeBtn = this._baseRender.getComponent("t_qiangke");
            this.addChild(this._qiangkeBtn);
            this._qiangkeBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);
            this._jiankeBtn = this._baseRender.getComponent("t_jianke");
            this.addChild(this._jiankeBtn);
            this._jiankeBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);
            this._daoshiBtn = this._baseRender.getComponent("t_daoshi");
            this.addChild(this._daoshiBtn);
            this._daoshiBtn.addEventListener(InteractiveEvent.Down, this.raceClick, this);
            this._raceUnselBg1 = this._bgRender.getComponent("t_unsel1");
            this.addChild(this._raceUnselBg1);
            this._raceUnselBg2 = this._bgRender.getComponent("t_unsel2");
            this.addChild(this._raceUnselBg2);
            this._raceSelBg = this._bgRender.getComponent("t_sel");
            this.addChild(this._raceSelBg);
            if (this._mainType != 0) {
                this.maleBtn = this._baseRender.getComponent("t_male");
                this._leftBottom.addChild(this.maleBtn);
                this.maleBtn.addEventListener(InteractiveEvent.Down, this.genderClick, this);
                this.femaleBtn = this._baseRender.getComponent("t_female");
                this._leftBottom.addChild(this.femaleBtn);
                this.femaleBtn.addEventListener(InteractiveEvent.Down, this.genderClick, this);
                this.genderBg = this._baseRender.getComponent("t_sex_bg");
                this._leftBottom.addChild(this.genderBg);
            }
            else {
                this._genderType = 1;
            }
            this.nameBgUI = this.addEvntBut("t_name_bg", this._bgRender);
            this.nameUI = this._baseRender.getComponent("t_name"); //= this.addEvntBut("t_name", this._baseRender);
            this.addChild(this.nameUI);
            this.timeUI = this._bgRender.getComponent("t_sec");
            this._rightBottom.addChild(this.timeUI);
            this.randomBtn = this.addEvntBut("t_random", this._baseRender);
            //this.addEvntBut("t_enter", this._baseRender);
            this.enterBtn = this._baseRender.getComponent("t_enter");
            this._rightBottom.addChild(this.enterBtn);
            this.enterBtn.addEventListener(InteractiveEvent.Up, this.enterGame, this);
            var raceRan = Math.random();
            var raceRanType = 0;
            if (raceRan < 0.333) {
                raceRan = 0;
            }
            else if (raceRan < 0.666) {
                raceRan = 1;
            }
            else {
                raceRan = 2;
            }
            this.setRaceType(raceRan);
            this.setGenderType(Math.random() > 0.5 ? 0 : 1);
            this.getRandomName();
            if (sessionStorage.getItem("name") && sessionStorage.getItem("name") != "") {
                this.setNameLable(sessionStorage.getItem("name"));
            }
        };
        LoginNewPanel.prototype.initQueenUI = function () {
            var _this = this;
            this.iconUI = this._baseRender.getComponent("t_icon");
            this._rightTop.addChild(this.iconUI);
            this.facUI = this._baseRender.getComponent("t_fac");
            this._rightTop.addChild(this.facUI);
            this.queenUI = this._baseRender.getComponent("t_queen");
            this._rightTop.addChild(this.queenUI);
            LoadManager.getInstance().load(getQueenIconUrl(this._data.icon), LoadManager.IMG_TYPE, function ($img) {
                var rec = _this._baseUiAtlas.getRec(_this.iconUI.skinName);
                var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                //UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 66, 66), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 0, 0, 60, 60);
                _this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            });
            if (this._mainType == 1) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.facUI.skinName, "家族:" + getBaseName(this._data.faction_name), 15, TextAlign.LEFT, ColorType.Yellowedce7e);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.queenUI.skinName, "女王:" + getBaseName(this._data.queen_name), 15, TextAlign.LEFT, ColorType.Yellowedce7e);
            }
        };
        LoginNewPanel.prototype.butClik = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this.nameBgUI:
                    InputPanel.show(function ($str) { _this.setNameLable($str); }, "");
                    break;
                case this.randomBtn:
                    this.getRandomName();
                    break;
                case this.enterBtn:
                    this.enterGame();
                    break;
            }
        };
        LoginNewPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.bg1 && this.bg2) {
                this.bg1.height = Scene_data.stageHeight / UIData.Scale;
                this.bg2.height = (Scene_data.stageHeight - 60) / UIData.Scale;
            }
        };
        LoginNewPanel.prototype.raceClick = function ($e) {
            switch ($e.target) {
                case this._jiankeBtn:
                    this.setRaceType(0);
                    break;
                case this._qiangkeBtn:
                    this.setRaceType(1);
                    break;
                case this._daoshiBtn:
                    this.setRaceType(2);
                    break;
            }
        };
        LoginNewPanel.prototype.genderClick = function ($e) {
            switch ($e.target) {
                case this.maleBtn:
                    this.setGenderType(0);
                    break;
                case this.femaleBtn:
                    this.setGenderType(1);
                    break;
            }
        };
        LoginNewPanel.prototype.setRaceType = function ($type) {
            if ($type == 0) {
                this._jiankeBtn.goToAndStop(1);
                this._qiangkeBtn.goToAndStop(0);
                this._daoshiBtn.goToAndStop(0);
                this._raceSelBg.setPos(this._raceBgPos[0][0] + this._raceBgSelPos[0], this._raceBgPos[0][1] + this._raceBgSelPos[1]);
                this._raceUnselBg1.setPos(this._raceBgPos[1][0], this._raceBgPos[1][1]);
                this._raceUnselBg2.setPos(this._raceBgPos[2][0], this._raceBgPos[2][1]);
            }
            else if ($type == 1) {
                this._jiankeBtn.goToAndStop(0);
                this._qiangkeBtn.goToAndStop(1);
                this._daoshiBtn.goToAndStop(0);
                this._raceUnselBg1.setPos(this._raceBgPos[0][0], this._raceBgPos[0][1]);
                this._raceSelBg.setPos(this._raceBgPos[1][0] + this._raceBgSelPos[0], this._raceBgPos[1][1] + this._raceBgSelPos[1]);
                this._raceUnselBg2.setPos(this._raceBgPos[2][0], this._raceBgPos[2][1]);
            }
            else if ($type == 2) {
                this._jiankeBtn.goToAndStop(0);
                this._qiangkeBtn.goToAndStop(0);
                this._daoshiBtn.goToAndStop(1);
                this._raceUnselBg1.setPos(this._raceBgPos[0][0], this._raceBgPos[0][1]);
                this._raceUnselBg2.setPos(this._raceBgPos[1][0], this._raceBgPos[1][1]);
                this._raceSelBg.setPos(this._raceBgPos[2][0] + this._raceBgSelPos[0], this._raceBgPos[2][1] + this._raceBgSelPos[1]);
            }
            this._raceType = $type;
            this.applyShow();
        };
        LoginNewPanel.prototype.setGenderType = function ($type) {
            // if ($type == 0) {
            //     this.maleBtn.selected = true;
            //     this.femaleBtn.selected = false;
            // } else if ($type == 1) {
            //     this.maleBtn.selected = false;
            //     this.femaleBtn.selected = true;
            // }
            var flag = false;
            if (this._genderType != $type) {
                flag = true;
            }
            this.genderBg.goToAndStop($type);
            this._genderType = $type;
            this.applyShow();
            if (flag) {
                this.getRandomName();
            }
        };
        LoginNewPanel.prototype.applyShow = function () {
            var modelID = 0;
            if (this._raceType == 0) {
                if (this._genderType == 0) {
                    modelID = 5;
                }
                else {
                    modelID = 6;
                }
            }
            else if (this._raceType == 1) {
                if (this._genderType == 0) {
                    modelID = 1;
                }
                else {
                    modelID = 2;
                }
            }
            else if (this._raceType == 2) {
                if (this._genderType == 0) {
                    modelID = 3;
                }
                else {
                    modelID = 4;
                }
            }
            this.genderUint = modelID;
            this.makeMainChar();
        };
        LoginNewPanel.prototype.loadConfigCom = function () {
            this._baseBgRender.uiAtlas = this._baseUiAtlas;
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.initBaseData();
            this.initUI();
            this.timeEnter();
            this.loadName();
        };
        LoginNewPanel.prototype.initBaseData = function () {
            this._itemArr = new Array();
            //this._itemArr.push(new RoleAndSkillVo("login_5", "login_5", 50011, ["skill_01"]));
            //this._itemArr.push(new RoleAndSkillVo("login_5", "login_5", 50011, ["skill_01"]));
            this._itemArr.push(new RoleAndSkillVo("jichu_1", "5113", 50011, ["skill_01", "skill_02", "skill_03"]));
            this._itemArr.push(new RoleAndSkillVo("jichu_1", "5114", 50012, ["skill_01", "skill_02", "skill_03"]));
            this._itemArr.push(new RoleAndSkillVo("jichu_2", "5115", 50013, ["skill_01", "skill_02", "skill_03"]));
            this._itemArr.push(new RoleAndSkillVo("jichu_2", "5116", 50014, ["skill_01", "skill_02", "skill_03"]));
            this._itemArr.push(new RoleAndSkillVo("jichu_3", "5117", 50015, ["skill_01", "skill_02", "skill_03"]));
            this._itemArr.push(new RoleAndSkillVo("jichu_3", "5118", 50016, ["skill_01", "skill_02", "skill_03"]));
            this.addGridLineSprite();
            Scene_data.cam3D.distance = 100;
            Scene_data.focus3D.y = 25;
            Scene_data.focus3D.rotationY = 160;
            Scene_data.focus3D.rotationX = -15;
        };
        LoginNewPanel.prototype.makeMainChar = function () {
            var _this = this;
            if (this.lastShowID == -1) {
                this.lastShowID = this.genderUint;
                return;
            }
            this._baImg.setImgInfo("ui/load/loginbg/" + (this._raceType + 1) + ".jpg", 960, 540);
            this._selectSkillVo = this._itemArr[this.genderUint - 1];
            this._selectSkillVo.skipId = 0;
            if (this.mainChar) {
                this.mainChar.setWeapon(-1);
                SceneManager.getInstance().removeMovieDisplay(this.mainChar);
                this.mainChar.destory();
            }
            SkillManager.getInstance().preLoadSkill(getSkillUrl(this._selectSkillVo.skillFileName));
            UILoading.getInstance().show();
            this.mainChar = new SkillSceneChar();
            this.mainChar.changeActionFun = function () { _this.playSkill(); };
            this.mainChar.loadFinishFun = function () {
                console.log("角色加载完");
                _this.mainChar.setWeaponByAvatar(_this._selectSkillVo.weaponNum);
                UILoading.getInstance().hide();
                ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + getSkillUrl(_this._selectSkillVo.skillFileName), function ($skillRes) {
                    // SkillManager.getInstance().preLoadSkill(getSkillUrl(this._selectSkillVo.skillFileName));
                    console.log("技能加载完");
                    TimeUtil.addTimeOut(1, function () { _this.playSkill(); });
                });
            };
            this.mainChar.setRoleUrl(getRoleUrl(this._selectSkillVo.charIdstr));
            SceneManager.getInstance().addMovieDisplay(this.mainChar);
        };
        LoginNewPanel.prototype.playSkill = function () {
            if (this._selectSkillVo.skipId >= 3) {
                return;
            }
            var $effectName = this._selectSkillVo.skillEffectItem[this._selectSkillVo.skipId % this._selectSkillVo.skillEffectItem.length];
            var $skill = SkillManager.getInstance().getSkill(getSkillUrl(this._selectSkillVo.skillFileName), $effectName);
            if (!$skill.keyAry) {
                return;
            }
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            $skill.configFixEffect(this.mainChar);
            this.mainChar.playSkill($skill);
            //  TweenLite.to(<object>Scene_data.cam3D, 0.4, { distance: 150 });
            this._selectSkillVo.skipId++;
        };
        LoginNewPanel.prototype.addGridLineSprite = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            var $GridLineSprite = new GridLineSprite();
            //    SceneManager.getInstance().addDisplay($GridLineSprite);
            SceneManager.getInstance().ready = true;
        };
        LoginNewPanel.prototype.loadName = function () {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "data/gamename.txt", LoadManager.XML_TYPE, function ($str) {
                var ary = $str.split("\n");
                _this.nameDic = new Object;
                _this.nameDic.xing = ary[0].split(",");
                _this.nameDic.nan = ary[1].split(",");
                _this.nameDic.nv = ary[2].split(",");
                _this.nameDic.xingl = _this.nameDic.xing.length;
                _this.nameDic.nanl = _this.nameDic.nan.length;
                _this.nameDic.nvl = _this.nameDic.nv.length;
                _this.getRandomName();
            });
        };
        LoginNewPanel.prototype.timeEnter = function () {
            var _this = this;
            var num = 30;
            var fun = function () {
                if (!InputPanel.hasPanel()) {
                    num--;
                }
                LabelTextFont.writeSingleLabel(_this._baseUiAtlas, _this.timeUI.skinName, String(num), 16, TextAlign.RIGHT, ColorType.colorce0a00);
                if (num == 0) {
                    _this.enterGame();
                    TimeUtil.removeTimeTick(fun);
                }
            };
            TimeUtil.addTimeTick(1000, fun);
        };
        LoginNewPanel.prototype.enterGame = function ($e) {
            if ($e === void 0) { $e = null; }
            var $name = this._nameStr;
            if ($name.length > 6) {
                AlertUtil.show("名字不能超过6个字符", "", null, 1);
                return;
            }
            if ($name.length) {
                var info = new char_create_info();
                info.faction = 0;
                info.hair_id = 0;
                info.head_id = 0;
                info.level = 1;
                info.race = 0;
                info.gender = this.genderUint;
                //alert(info.gender)
                info.name = $name;
                info.inviteGuid = "";
                //L1.2_1003
                if (getUrlParam("inviteGuid")) {
                    info.inviteGuid = getUrlParam("inviteGuid");
                }
                else {
                    info.faction_name = $name + "的家族";
                }
                //console.log(" info.inviteGuid=======>", info.inviteGuid)
                NetManager.getInstance().protocolos.char_create(info);
            }
            //this.close()
            document.body.ontouchend = function (event) { event.preventDefault(); };
        };
        LoginNewPanel.prototype.getRandomName = function () {
            var str;
            if (this.nameDic) {
                str = this.nameDic.xing[float2int(this.nameDic.xingl * Math.random())];
                if (this._genderType == 0) {
                    str += this.nameDic.nan[float2int(this.nameDic.nanl * Math.random())];
                }
                else {
                    str += this.nameDic.nv[float2int(this.nameDic.nvl * Math.random())];
                }
            }
            else {
                var s1 = ['陈', '成', '程', '池', '褚', '淳于', '崔', '代', '单', '单于', '福', '澹台', '狄', '帝', '东', '龚', '东方', '东郭', '独孤', '杜', '端木', '段', '朵', '樊', '范'];
                var s2 = ['傲风', '傲之', '霸', '柏舟', '半夏', '邦少', '彼岸', '伯光', '伯雷', '伯庸', '博风', '不败', '不悔', '展天', '残夜', '残竹', '沧海', '浩云', '皓轩', '皓月', '和风'];
                str = s1[float2int(s1.length * Math.random())] + s2[float2int(s2.length * Math.random())];
            }
            this.setNameLable(str);
        };
        LoginNewPanel.prototype.setNameLable = function (str) {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nameUI.skinName, str, 16, TextAlign.CENTER, ColorType.Yellowffe9b4);
            if (this._mainType == 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.facUI.skinName, "家族:" + str + "的家族", 15, TextAlign.LEFT, ColorType.Yellowedce7e);
            }
            this._nameStr = str;
        };
        LoginNewPanel.prototype.close = function () {
            if (this.mainChar) {
                SceneManager.getInstance().removeMovieDisplay(this.mainChar);
                this.mainChar.destory();
                GameInstance.setMapData();
            }
            // if (this.chatHtmlInput.parentElement) {
            //     this.chatHtmlInput.value = "";
            //     document.body.removeChild(this.chatHtmlInput);
            // }
            UIManager.getInstance().removeUIContainer(this);
        };
        return LoginNewPanel;
    }(UIPanel));
    loginnew.LoginNewPanel = LoginNewPanel;
})(loginnew || (loginnew = {}));
//# sourceMappingURL=LoginNewPanel.js.map