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
var Camand;
(function (Camand) {
    var CammandRender = /** @class */ (function (_super) {
        __extends(CammandRender, _super);
        function CammandRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CammandRender.prototype.draw = function () {
            var ctx = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            UiDraw.cxtDrawImg(ctx, PuiData.Slist_select, new Rectangle(0, 0, 98, 50), UIData.publicUi);
            //  UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_select);
            this.drawLable(ctx, 50, 15, this._listItemData.data.txt, 16, "#000000", false);
            this.atlas.updateCtx(ctx, this.uvData.ox, this.uvData.oy);
        };
        CammandRender.prototype.drawLable = function (ctx, $xpos, $ypos, $str, fontsize, fontColor, bolder) {
            if (bolder === void 0) { bolder = false; }
            ctx.textBaseline = TextAlign.TOP;
            ctx.textAlign = TextAlign.CENTER;
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px" + UIData.font;
            ctx.fillText($str, $xpos, $ypos);
        };
        return CammandRender;
    }(ListItemRender));
    Camand.CammandRender = CammandRender;
    var CammandPanel = /** @class */ (function (_super) {
        __extends(CammandPanel, _super);
        function CammandPanel() {
            var _this = _super.call(this) || this;
            _this.chatItem = new Array();
            _this.mapItem = ["高山竹林", "darkmap"];
            _this.mapId = 1;
            _this.charArr = ["wd", "em"];
            _this.charId = 0;
            //  this.makeBgWinPanel();
            _this.width = 600;
            _this.height = 400;
            _this.center = 0;
            _this.middle = 0;
            _this._listRender = new UIListRenderComponent;
            _this.addRender(_this._listRender);
            _this._baseRender = new UIRenderComponent();
            _this.addRender(_this._baseRender);
            _this.addList();
            return _this;
        }
        CammandPanel.prototype.addList = function () {
            var $pos = new Vector2D(30, 20);
            this._bgList = this._listRender.createGridList();
            this._bgList.x = $pos.x;
            this._bgList.y = $pos.y;
            this.addChild(this._bgList);
            this._bgMask = new UIMask();
            this._bgMask.x = $pos.x;
            this._bgMask.y = $pos.y;
            this._bgMask.width = 512;
            this._bgMask.height = 300;
            this.addMask(this._bgMask);
            this._listRender.mask = this._bgMask;
            this.refreshData();
        };
        CammandPanel.prototype.refreshData = function () {
            var _this = this;
            var ary = new Array;
            var butItem = [
                //"家族模式",
                //"和平模式",
                //     "显示FPS",
                "显示A星",
                "升满级",
                "新帐号",
                "换服务器",
                "自杀",
                "VIP+1",
                "重置0",
                "资源清空",
                "资源+10000",
                "加道具",
                "升级+10",
                "升级+1",
                "升级+5",
                //"金币+100",
                // "真气+100",
                //"兽灵+100",
                //"元宝+100",
                //"绑定元宝+100",
                //"精华+100",
                //"兽灵元宝清空",
                "完成主线",
                "系统开启",
                //"完成技能",
                //"完成神兵",
                //"完成骑乘",
                //"完成坐骑",
                //"完成副本",
                //"完成家族",
                //"完成强化",
                //"完成斗剑台",
                //"测试粒子",
                "回到主城",
                "转盘抽奖",
                "开启家族战",
                "清空家族战",
                "挑战首领",
                "GM武器",
            ];
            for (var i = 0; i < butItem.length; i++) {
                var listItemData = new ListItemData();
                listItemData.data = { txt: butItem[i], id: i };
                listItemData.clickFun = function ($listItemData) { _this.itemDataClick($listItemData); };
                ary.push(listItemData);
            }
            this._bgList.contentY = 0;
            this._bgList.setGridData(ary, CammandRender, 5, 100, 50, 512, 512, 512, 300);
        };
        CammandPanel.prototype.itemDataClick = function ($listItemData) {
            var str = $listItemData.data.txt;
            switch (str) {
                case "挑战首领":
                    NetManager.getInstance().protocolos.try_mass_boss(0);
                    break;
                case "开启家族战":
                    GameControlManager.sendGmCom("@开启家族战");
                    break;
                case "转盘抽奖":
                    console.log("转盘抽奖", "lottery_recharge");
                    NetManager.getInstance().protocolos.lottery_recharge();
                    break;
                case "清空家族战":
                    GameControlManager.sendGmCom("@清空家族战");
                    break;
                case "家族模式":
                    NetManager.getInstance().protocolos.change_battle_mode(SharedDef.FAMILY_MODE);
                    break;
                case "和平模式":
                    NetManager.getInstance().protocolos.change_battle_mode(SharedDef.PEACE_MODE);
                    break;
                case "坐骑打开":
                    ModulePageManager.openPanel(SharedDef.MODULE_MOUNT);
                    break;
                case "全民boss":
                    ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.SHOW_SBOSS_PANEL));
                    break;
                case "翅膀":
                    ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.SHOW_WING_PANEL_EVENT));
                    break;
                case "法宝":
                    ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SHOW_TREASURE_EVENT));
                    break;
                case "组队副本":
                    break;
                case "回到主城":
                    NetManager.getInstance().protocolos.teleport_map(1, 1);
                    // NetManager.getInstance().protocolos.challange_boss();
                    break;
                case "去1009":
                    NetManager.getInstance().protocolos.teleport_map(1009, 1);
                    console.log("去1009");
                    break;
                case "招募成员":
                    ////console.log("guid", GameInstance.mainChar.unit.uintGuid);
                    //NetManager.getInstance().protocolos.clientSubscription(GameInstance.mainChar.unit.uintGuid);
                    //  NetManager.getInstance().protocolos.challange_boss();
                    //   //console.log("challange_boss321")
                    var $indexUrl = window.location.toString();
                    var $d = $indexUrl.indexOf("?");
                    if ($d != -1) {
                        $indexUrl = $indexUrl.substring(0, $d);
                    }
                    var $url = $indexUrl + "?inviteGuid=" + GuidData.faction.getGuid();
                    $url = $url.replace("index.html", "login.html");
                    //console.log("outUrl", $url)
                    copy2clipboard($url);
                    alert($url);
                    break;
                case "家族场景":
                    NetManager.getInstance().protocolos.back_to_famity();
                    break;
                case "显示FPS":
                    var $fps = document.getElementById('FpsTipsCanvas');
                    if ($fps.style["z-index"] == 0) {
                        $fps.style["z-index"] = 2;
                    }
                    else {
                        $fps.style["z-index"] = 0;
                    }
                    break;
                case "新帐号":
                    window.location.href = "random.html";
                    break;
                case "换服务器":
                    window.location.href = "login.html";
                    break;
                case "升级+1":
                    var tempStr = "@Rank " + String(GameInstance.mainChar.unit.getLevel() + 1);
                    GameControlManager.sendGmCom(tempStr);
                    break;
                case "升级+5":
                    var tempStr = "@Rank " + String(GameInstance.mainChar.unit.getLevel() + 5);
                    GameControlManager.sendGmCom(tempStr);
                    break;
                case "升级+10":
                    var tempStr = "@Rank " + String(GameInstance.mainChar.unit.getLevel() + 10);
                    GameControlManager.sendGmCom(tempStr);
                    break;
                case "升满级":
                    var tempStr = "@Rank " + String(199);
                    GameControlManager.sendGmCom(tempStr);
                    break;
                case "系统开启":
                    this.openSystemAll();
                    break;
                case "VIP+1":
                    var tempStr = "@VIP " + String(GuidData.player.getVipLevel() + 1);
                    GameControlManager.sendGmCom(tempStr);
                    //console.log(tempStr)
                    break;
                case "修改发送":
                    //console.log("修改发送", GameInstance.mainChar.unit.uintGuid)
                    NetManager.getInstance().protocolos.clientSubscription(GameInstance.mainChar.unit.uintGuid);
                    break;
                case "进入试练塔":
                    //console.log(str)
                    NetManager.getInstance().protocolos.enter_trial_instance();
                    break;
                case "重置0":
                    str = "@重置 0";
                    //console.log(str)
                    GameControlManager.sendGmCom(str);
                    break;
                case "重置世界BOSS":
                    var $oDate = new Date(); //实例一个时间对象；
                    //console.log($oDate.getHours(), $oDate.getMinutes())
                    var $addnum = 1;
                    if ($oDate.getSeconds() > 50) {
                        $addnum = 2;
                    }
                    $addnum = 2;
                    str = "@世界BOSS " + $oDate.getHours() + " " + ($oDate.getMinutes() + $addnum) + " 1 15";
                    //console.log(str)
                    GameControlManager.sendGmCom(str);
                    break;
                // 
                case "自杀":
                    //console.log(str)
                    GameControlManager.sendGmCom("@自杀");
                    // GameControlManager.sendGmCom("@制造 103 1000 1")
                    break;
                case "资源清空":
                    //console.log(str)
                    GameControlManager.sendGmCom("@Resource -1 0");
                    break;
                case "资源+10000":
                    this.changeMoney(SharedDef.MONEY_TYPE_GOLD_INGOT, 10000000);
                    this.changeMoney(SharedDef.MONEY_TYPE_BIND_GOLD, 10000000);
                    this.changeMoney(SharedDef.MONEY_TYPE_SILVER, 1000000000);
                    break;
                case "加道具":
                    var itemAry = [237, 1402, 1403, 1401, 202, 203, 201, 227, 224, 226, 211, 212, 233, 234];
                    for (var i = 0; i < itemAry.length; i++) {
                        GameControlManager.sendGmCom("@制造 " + itemAry[i] + " 990");
                    }
                    break;
                case "GM武器":
                    var itemAry = [30000, 30001, 30002];
                    for (var i = 0; i < itemAry.length; i++) {
                        GameControlManager.sendGmCom("@制造 " + itemAry[i] + " 1");
                    }
                    break;
                /*
                case "金币+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_SILVER, 100 + GuidData.player.getSilver())
                    break;
                case "真气+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_QI, 100 + GuidData.player.getQI())
                    break;
                case "兽灵+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_BEAST, 100 + GuidData.player.getBeast())
                    break;
                case "元宝+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_GOLD_INGOT, 100 + GuidData.player.getGoldIngot())
                    break;
                case "绑定元宝+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_BIND_GOLD, 100 + GuidData.player.getBindGold())
                    break;
                case "精华+100":
                    this.changeMoney(SharedDef.MONEY_TYPE_GEM, 100 + GuidData.player.getGem())
                    break;
                case "兽灵元宝清空":
                    this.changeMoney(SharedDef.MONEY_TYPE_BEAST, 0)
                    this.changeMoney(SharedDef.MONEY_TYPE_GOLD_INGOT, 0)
                    */
                // break;
                case "显示A星":
                    ModuleEventManager.dispatchEvent(new Camand.ComandEvent(Camand.ComandEvent.SHOW_ASTAR_LINE));
                    break;
                case "完成主线":
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成神兵":
                    GameControlManager.sendGmCom("@制造 201 100 1");
                    GameControlManager.sendGmCom("@选择主线 10123");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成技能":
                    GameControlManager.sendGmCom("@选择主线 10220");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成骑乘":
                    GameControlManager.sendGmCom("@选择主线 10203");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成坐骑":
                    GameControlManager.sendGmCom("@选择主线 10203");
                    GameControlManager.sendGmCom("@完成当前主线");
                    GameControlManager.sendGmCom("@选择主线 10229");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成副本":
                    GameControlManager.sendGmCom("@选择主线 10209");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成强化":
                    GameControlManager.sendGmCom("@选择主线 10217");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成家族":
                    GameControlManager.sendGmCom("@选择主线 10224");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "完成斗剑台":
                    GameControlManager.sendGmCom("@选择主线 10214");
                    GameControlManager.sendGmCom("@完成当前主线");
                    break;
                case "家族活动":
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT));
                    break;
                case "坐骑":
                    // ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.SHOW_MOUNT_EVENT));
                    break;
                case "排位赛":
                    ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT));
                    break;
                case "家族技能":
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT));
                    break;
                case "强化系统":
                    // ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.SHOW_STRENGTHGEM_PANEL));
                    break;
                case "角色":
                    ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.SHOW_ROLE_EVENT));
                    break;
                case "测试粒子":
                    // for (var i: number = 0; i < 60; i++) {
                    //     GameInstance.mainChar.addTestWeapon();
                    // }
                    copy2clipboard("dddddddddddddddds****");
                    break;
                case "外观":
                    ModuleEventManager.dispatchEvent(new exterior.ExteriorEvent(exterior.ExteriorEvent.SHOW_EXTERIOR_EVENT));
                    break;
                case "技能":
                    ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SHOW_SKILLUI_EVENT));
                    break;
                case "我要变强":
                    ModulePageManager.openPanel(SharedDef.MODULE_STRENGTH);
                    break;
                case "日常任务":
                    ModulePageManager.openPanel(SharedDef.MODULE_DAILY_TASKS);
                    break;
                default:
                    return;
            }
            this.sendNextMsg();
            this.hide();
            //"进入等待房间",
            //"挑战BOSS",
        };
        CammandPanel.prototype.openSystemAll = function () {
            //@选择主线 10220 技能
            //@选择主线 10123 神兵
            //@选择主线 10229 坐骑
            //@选择主线 10217 强化
            //@选择主线 10203 坐骑获得
            //@选择主线 10224 家族
            //@选择主线 10209 副本
            //@选择主线 10225 每日活动
            //@选择主线 10214 1v1
            //@选择主线 10130 7天登入
            var $arr = new Array;
            $arr.push(10220); //@选择主线 10220 技能
            $arr.push(10123); //@选择主线 10123 神兵
            $arr.push(10229); //@选择主线 10229 坐骑
            $arr.push(10217); //@选择主线 10217 强化
            $arr.push(10203); //@选择主线 10203 坐骑获得
            $arr.push(10209); //@选择主线 10209 副本
            $arr.push(10225); //@选择主线 10225 每日活动
            $arr.push(10214); //@选择主线 10214 1v1
            $arr.push(10130); //@选择主线 10130 7天登入
            $arr.push(10224); //@选择主线 10224 家族
            for (var i = 0; i < $arr.length; i++) {
                GameControlManager.sendGmCom("@选择主线 " + $arr[i]);
                GameControlManager.sendGmCom("@完成当前主线");
            }
        };
        CammandPanel.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            }
        };
        CammandPanel.prototype.onStageMouseUp = function (evt) {
            this.hide();
        };
        CammandPanel.prototype.changeMoney = function ($id, $num) {
            //public static MONEY_TYPE_GOLD_INGOT: number = 0;	// 元宝
            //public static MONEY_TYPE_BIND_GOLD: number = 1;	// 绑定元宝
            //public static MONEY_TYPE_SILVER: number = 2;	// 身上的银子
            //public static MONEY_TYPE_SILVER_WAREHOUSE: number = 3;	// 仓库的银子
            //public static MONEY_TYPE_GOLD_WAREHOUSE: number = 4;	// 仓库元宝
            //public static MONEY_TYPE_BIND_GOLD_WAREHOUSE: number = 5;	// 仓库的绑元
            //public static MONEY_TYPE_QI: number = 6;	// 真气
            //public static MONEY_TYPE_BEAST: number = 7;	// 兽灵
            //public static MONEY_TYPE_GEM: number = 8;	// 宝石精华
            //SharedDef.MONEY_TYPE_SILVER
            this.chatItem.push({ id: $id, num: $num });
        };
        CammandPanel.prototype.sendNextMsg = function () {
            var _this = this;
            if (this.chatItem.length) {
                var $obj = this.chatItem.pop();
                var str = "@Resource " + $obj.id + " " + $obj.num;
                //console.log(str)
                GameControlManager.sendGmCom(str);
                if (this.chatItem.length) {
                    setTimeout(function () { _this.sendNextMsg(); }, 200);
                }
            }
        };
        CammandPanel.prototype.showAstarLine = function () {
            if (!this._astarLineSprite) {
                ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader());
                this._astarLineSprite = new LineDisplaySprite();
                SceneManager.getInstance().addDisplay(this._astarLineSprite);
                this.makeAstarLine(AstarUtil.navmeshData);
            }
            else {
                SceneManager.getInstance().removeDisplay(this._astarLineSprite);
                this._astarLineSprite = null;
            }
        };
        CammandPanel.prototype.makeAstarLine = function ($navMeshStaticMesh) {
            var w = $navMeshStaticMesh.heightItem[0].length;
            var h = $navMeshStaticMesh.heightItem.length;
            var midu = $navMeshStaticMesh.midu;
            var aPos = $navMeshStaticMesh.aPos;
            var vecItem = new Array;
            var ty = 0;
            for (var i = 0; i < h; i++) {
                for (var j = 0; j < w; j++) {
                    ty = $navMeshStaticMesh.heightItem[i][j];
                    var pos = new Vector3D(j * midu, ty, i * midu);
                    pos.x = pos.x + aPos.x;
                    pos.z = aPos.z + h * midu - pos.z;
                    pos.y = ty;
                    vecItem.push(pos);
                    if (i < 2 || j < 2 || i > (w - 2) || j > (h - 2)) {
                        //   $navMeshStaticMesh.astarItem[i][j] = 0  //特殊边缘为不可寻走
                    }
                }
            }
            this._astarLineSprite.clear();
            this._astarLineSprite.baseColor = new Vector3D(1, 0, 1, 1);
            for (i = 0; i < h - 1; i++) {
                for (j = 0; j < w - 1; j++) {
                    var a = i * w + j;
                    var b = a + 1;
                    var c = a + 1 + w;
                    var d = a + w;
                    if ($navMeshStaticMesh.astarItem[i][j] == 1) {
                        this._astarLineSprite.makeLineMode(vecItem[a], vecItem[b]);
                        this._astarLineSprite.makeLineMode(vecItem[a], vecItem[d]);
                        if ($navMeshStaticMesh.astarItem[i + 1][j] == 0) {
                            this._astarLineSprite.makeLineMode(vecItem[c], vecItem[d]);
                        }
                        if ($navMeshStaticMesh.astarItem[i][j + 1] == 0) {
                            this._astarLineSprite.makeLineMode(vecItem[b], vecItem[c]);
                        }
                    }
                }
            }
            this._astarLineSprite.upToGpu();
        };
        CammandPanel.prototype.randomJumpTxt = function () {
        };
        CammandPanel.prototype.butClik = function (evt) {
            this.hide();
        };
        CammandPanel.prototype.changeChat = function () {
        };
        CammandPanel.prototype.hide = function () {
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Down, this.onStageMouseUp, this);
            UIManager.getInstance().removeUIContainer(this);
        };
        return CammandPanel;
    }(UIConatiner));
    Camand.CammandPanel = CammandPanel;
    var SceneModelTwoTexture = /** @class */ (function (_super) {
        __extends(SceneModelTwoTexture, _super);
        function SceneModelTwoTexture() {
            return _super.call(this) || this;
        }
        SceneModelTwoTexture.prototype.loadGroup = function ($name) {
            var _this = this;
            var groupRes = new GroupRes;
            groupRes.load(Scene_data.fileRoot + "model/" + $name + ".txt", function () { _this.loadPartRes(groupRes); });
        };
        SceneModelTwoTexture.prototype.loadPartRes = function (groupRes) {
            for (var i = 0; i < groupRes.dataAry.length; i++) {
                var item = groupRes.dataAry[i];
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                }
                else if (item.types == BaseRes.PREFAB_TYPE) {
                    this.setObjUrl(item.objUrl);
                    //console.log(item.materialUrl)
                    this.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                }
            }
        };
        return SceneModelTwoTexture;
    }(Display3DSprite));
    Camand.SceneModelTwoTexture = SceneModelTwoTexture;
    var MonsterChar = /** @class */ (function (_super) {
        __extends(MonsterChar, _super);
        function MonsterChar() {
            return _super.call(this) || this;
        }
        MonsterChar.prototype.destory = function () {
            _super.prototype.destory.call(this);
            while (this.skillitem.length) {
                var $Skill = this.skillitem.pop();
                $Skill.isDeath = true;
                $Skill.useNum = 0;
            }
        };
        MonsterChar.prototype.walkComplete = function () {
            //this.playSkillAction("j_skill_01")
            return;
            // if (this.skillitem && this.skillitem.length) {
            //     this.watch(GameInstance.mainChar)
            //     var $skill: Skill = this.skillitem[4];
            //     $skill.reset();
            //     $skill.isDeath = false;
            //     $skill.configTrajectory(this, GameInstance.mainChar, () => {
            //         //  GameInstance.mainChar.play(CharAction.ATTACK_01,2)
            //     }, 0);
            //     SkillManager.getInstance().playSkill($skill);
            // }
        };
        MonsterChar.prototype.setWalkPath = function ($arr) {
            this.walkPath = $arr;
            //  this.walkPathComplete()
        };
        return MonsterChar;
    }(SceneChar));
    Camand.MonsterChar = MonsterChar;
    var SceneMonster = /** @class */ (function () {
        function SceneMonster() {
            var _this = this;
            this.monsterItem = new Array();
            TimeUtil.addFrameTick(function (t) { _this.update(t); });
        }
        SceneMonster.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneMonster();
            }
            return this._instance;
        };
        SceneMonster.prototype.update = function (t) {
        };
        //找场景时清除所有怪物
        SceneMonster.prototype.clearSceneMonster = function () {
            while (this.monsterItem.length) {
                this.removeMonsterChar(this.monsterItem[0]);
            }
        };
        SceneMonster.prototype.removeMonsterChar = function ($MonsterChar) {
            var index = this.monsterItem.indexOf($MonsterChar);
            if (index != -1) {
                this.monsterItem.splice(index, 1);
            }
            GameInstance.removeSceneChar($MonsterChar);
            $MonsterChar.destory();
        };
        SceneMonster.prototype.roundHit = function ($pos) {
            for (var i = 0; this.monsterItem && i < this.monsterItem.length; i++) {
                var $MonsterChar = this.monsterItem[i];
                var $p = $MonsterChar.getCurrentPos();
                if (Vector3D.distance($p, $pos) < 55) {
                    $MonsterChar.life -= 15;
                }
            }
        };
        //添加10个角色
        SceneMonster.prototype.addSceneMonsterList = function () {
        };
        //先择一个角色自己寻路到主角的位置
        SceneMonster.prototype.selectMonsterMove = function () {
            if (this.monsterItem && this.monsterItem.length) {
                var $monsterChar = randomByItem(this.monsterItem);
                var $arr = AstarUtil.findPath($monsterChar.getCurrentPos(), GameInstance.mainChar.getCurrentPos());
                $monsterChar.setWalkPath($arr);
            }
        };
        //所有怪物播放技能
        SceneMonster.prototype.allPlaySkill = function () {
            for (var i = 0; this.monsterItem && i < this.monsterItem.length; i++) {
                var $MonsterChar = this.monsterItem[i];
                if ($MonsterChar) {
                    //$MonsterChar.playSkillAction("skill_01")
                }
            }
        };
        SceneMonster.prototype.getSceneChar = function (name, shadowSize, watchflag, retinueName, fix) {
            if (shadowSize === void 0) { shadowSize = 10; }
            if (watchflag === void 0) { watchflag = false; }
            if (retinueName === void 0) { retinueName = null; }
            if (fix === void 0) { fix = null; }
            var char = new MonsterChar();
            char.setRoleUrl(getRoleUrl(name));
            char.x = 0;
            char.y = 5;
            char.z = 0;
            char.setShadowSize(shadowSize);
            return char;
        };
        return SceneMonster;
    }());
    Camand.SceneMonster = SceneMonster;
})(Camand || (Camand = {}));
//# sourceMappingURL=CammandPanel.js.map