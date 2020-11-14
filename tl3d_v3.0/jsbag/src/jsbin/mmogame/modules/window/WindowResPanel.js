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
var WindowResPanel = /** @class */ (function (_super) {
    __extends(WindowResPanel, _super);
    function WindowResPanel() {
        var _this = _super.call(this) || this;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.middle = 0;
        _this.center = 0;
        _this._basebgRender = new UIRenderComponent;
        _this.addRender(_this._basebgRender);
        _this._bgRender = new UIRenderComponent;
        _this.addRender(_this._bgRender);
        _this._baseRender = new UIRenderComponent;
        _this.addRender(_this._baseRender);
        _this.layer = 310;
        return _this;
    }
    WindowResPanel.prototype.applyLoad = function () {
        var _this = this;
        this._baseUiAtlas = new UIAtlas();
        this._baseUiAtlas.setInfo("ui/uidata/window/windowres.xml", "ui/uidata/window/windowres.png", function () { _this.loadConfigCom(); }, "ui/uidata/window/windowpc.png");
    };
    WindowResPanel.prototype.loadConfigCom = function () {
        this._basebgRender.uiAtlas = this._baseUiAtlas;
        this._baseRender.uiAtlas = this._baseUiAtlas;
        this._bgRender.uiAtlas = this._baseUiAtlas;
        this.c_basebg = this.addEvntButUp("c_basebg", this._basebgRender);
        this.c_basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
        this.c_bg = this.addChild(this._bgRender.getComponent("c_bg"));
        this.c_bg.addEventListener(InteractiveEvent.Up, function () { }, this);
        this.t_slistindex = this.addChild(this._baseRender.getComponent("t_slistindex"));
        this.c_name = this.addChild(this._baseRender.getComponent("c_name"));
        this.c_icon = this.addChild(this._baseRender.getComponent("c_icon"));
        this.addLists();
        this.resize();
        this.applyLoadComplete();
    };
    WindowResPanel.prototype.addLists = function () {
        this.windowResSList = new WindowResSList;
        this.windowResSList.init(this._baseUiAtlas);
    };
    WindowResPanel.prototype.resize = function () {
        this.c_basebg.top = 0;
        this.c_basebg.left = 0;
        this.c_basebg.y = 0;
        this.c_basebg.x = 0;
        this.c_basebg.height = Scene_data.stageHeight / UIData.Scale;
        this.c_basebg.width = Scene_data.stageWidth / UIData.Scale;
        _super.prototype.resize.call(this);
        if (this.windowResSList) {
            this.windowResSList.left = this.t_slistindex.parent.x / UIData.Scale + this.t_slistindex.x;
            this.windowResSList.top = this.t_slistindex.parent.y / UIData.Scale + this.t_slistindex.y;
        }
    };
    WindowResPanel.prototype.butClik = function (evt) {
        if (evt.target == this.c_basebg) {
            this.hide();
        }
    };
    WindowResPanel.prototype.hide = function () {
        this.windowResSList.hide();
        UIManager.getInstance().removeUIContainer(this);
    };
    WindowResPanel.prototype.show = function ($propid) {
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.c_name.skinName, getResName($propid), 16, TextAlign.CENTER, ColorType.Whiteffeed0);
            IconManager.getInstance().drawItemIcon60(this.c_icon, $propid, 0, false, false);
            this.windowResSList.show($propid);
        }
    };
    return WindowResPanel;
}(UIPanel));
var WindowResSList = /** @class */ (function (_super) {
    __extends(WindowResSList, _super);
    function WindowResSList() {
        var _this = _super.call(this) || this;
        // this.left = 315;
        // this.top = 255;
        _this.layer = 311;
        _this.setShowLevel(8);
        return _this;
    }
    WindowResSList.prototype.init = function ($uiAtlas) {
        this.baseAtlas = $uiAtlas;
        this.initData();
    };
    WindowResSList.prototype.initData = function () {
        var $ary = new Array();
        this.setData($ary, WindowResSListRender, 373, 120, 0, 55, 2, 128, 256, 1, 4);
    };
    WindowResSList.prototype.setResData = function ($data) {
        var tab = tb.TB_item_template.get_TB_item_template($data);
        if (tab.output && tab.output.length > 0) {
            var $tbDataArr = new Array();
            for (var i = 0; i < tab.output.length; i++) {
                var outputtab = tb.TB_item_output.get_TB_item_output(tab.output[i]);
                var sysid = outputtab.output[0];
                var pageid = outputtab.output[1];
                if (outputtab.npc == 1) {
                    sysid = getNpcmodul(outputtab.output[3]);
                    pageid = outputtab.output[4];
                }
                if (sysid >= SharedDef.MODULE_FACTIONMAIN && sysid <= SharedDef.MODULE_FACTIONBOX) {
                    var $vo = new SListItemData();
                    $vo.data = outputtab;
                    $vo.id = i;
                    $tbDataArr.push($vo);
                }
                else if (GuidData.player.getsyspageopen(sysid, pageid)) {
                    var $vo = new SListItemData();
                    $vo.data = outputtab;
                    $vo.id = i;
                    $tbDataArr.push($vo);
                }
            }
            this.refreshData($tbDataArr);
        }
        else {
            console.log($data, "道具表没有配置获取途径      ");
        }
    };
    WindowResSList.prototype.show = function ($propid) {
        UIManager.getInstance().addUIContainer(this);
        this.setResData($propid);
    };
    WindowResSList.prototype.hide = function () {
        UIManager.getInstance().removeUIContainer(this);
    };
    return WindowResSList;
}(SList));
var WindowResSListRender = /** @class */ (function (_super) {
    __extends(WindowResSListRender, _super);
    function WindowResSListRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowResSListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
        if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
        _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
        this.Resinfo = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Resinfo", 47, 16, 120, 20);
        $container.addChild(this.Resinfo);
        this.Resbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Resbg", 0, 0, 373, 51, 4, 4);
        $container.addChild(this.Resbg);
        this.Resbtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Resbtn", 275, 8, 82, 36);
        $container.addChild(this.Resbtn);
        this.Resbtn.addEventListener(InteractiveEvent.Up, this.RewardClik, this);
    };
    WindowResSListRender.prototype.applyRender = function () {
        var $vo = this.itdata.data;
        UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Resbg.skinName, UIData.publicUi, PuiData.RESBG);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.Resinfo.skinName, ColorType.color903713 + (this.itdata.id + 1) + "." + $vo.name, 16, TextAlign.LEFT);
        UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Resbtn.skinName, "GoBtn");
    };
    WindowResSListRender.prototype.render = function ($data) {
        this.itdata = $data;
        //console.log("--$data----", $data);
        if (this.itdata && this.itdata.data) {
            this.applyRender();
        }
        else {
            this.setnull();
        }
    };
    WindowResSListRender.prototype.RewardClik = function (evt) {
        if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
            return;
        }
        if (this.itdata && this.itdata.data) {
            ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_PANEL));
            var $vo = this.itdata.data;
            if ($vo.npc) {
                var npcary = [3];
                npcary = npcary.concat($vo.output);
                //npcary = npcary.concat(vo.data.goto);
                //console.log("---npcary--",npcary);
                //npcary.push(2)
                quest.QuestModel.getInstance().meshQuestTargets(new quest.QuestTaskVo(), npcary);
            }
            else {
                var sub = $vo.output.shift();
                ModulePageManager.openPanel(sub, $vo.output);
            }
        }
    };
    WindowResSListRender.prototype.setnull = function () {
        UiDraw.clearUI(this.Resbtn);
        UiDraw.clearUI(this.Resbg);
        UiDraw.clearUI(this.Resinfo);
    };
    return WindowResSListRender;
}(SListItem));
//# sourceMappingURL=WindowResPanel.js.map