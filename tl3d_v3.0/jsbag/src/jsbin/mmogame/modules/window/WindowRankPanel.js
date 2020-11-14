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
var WindowRankPanel = /** @class */ (function (_super) {
    __extends(WindowRankPanel, _super);
    function WindowRankPanel() {
        var _this = _super.call(this) || this;
        _this.uiAtlasComplet = false;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.middle = 0;
        _this.center = 0;
        _this.setBlackBg();
        _this._baseRender = new UIRenderComponent;
        _this.addRender(_this._baseRender);
        return _this;
    }
    WindowRankPanel.prototype.applyLoad = function () {
        var _this = this;
        this._baseUiAtlas = new UIAtlas();
        this._baseUiAtlas.setInfo("ui/uidata/window/windowrank.xml", "ui/uidata/window/windowrank.png", function () { _this.loadConfigCom(); });
    };
    WindowRankPanel.prototype.loadConfigCom = function () {
        this._baseRender.uiAtlas = this._baseUiAtlas;
        this.labAry = new Array;
        for (var i = 0; i < 3; i++) {
            this.labAry.push(this.addChild(this._baseRender.getComponent("t_lab" + i)));
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas,ui.skinName,this._labName[i],16,TextAlign.CENTER,ColorType.color9a683f)
        }
        this.addUIList(["t_line1", "t_line2", "t_line3", "t_title"], this._baseRender);
        this.myInfo = this.addChild(this._baseRender.getComponent("t_my"));
        this.addLists();
        this.uiAtlasComplet = true;
        this.applyLoadComplete();
    };
    WindowRankPanel.prototype.addLists = function () {
        this.windowRankSList = new WindowRankSList;
        this.windowRankSList.init(this._baseUiAtlas);
    };
    WindowRankPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    WindowRankPanel.prototype.butClik = function (evt) {
        if (evt.target == this.c_close) {
            this.hide();
        }
    };
    WindowRankPanel.prototype.hide = function () {
        this.windowRankSList.hide();
        UIManager.getInstance().removeUIContainer(this);
    };
    WindowRankPanel.prototype.show = function ($labAry, $data, myStr) {
        for (var i = 0; i < this.labAry.length; i++) {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.labAry[i].skinName, $labAry[i], 16, TextAlign.CENTER, ColorType.color9a683f);
        }
        UIManager.getInstance().addUIContainer(this);
        this.windowRankSList.show();
        this.windowRankSList.setRankData($data);
        if (myStr != "") {
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas,this.myInfo.skinName,myStr,14,TextAlign.CENTER,ColorType.Brown7a2f21);
            UiDraw.drawTxtLab(this.myInfo, ColorType.Brown7a2f21 + myStr, 14, TextAlign.CENTER, 0, 5);
        }
        else {
            UiDraw.clearUI(this.myInfo);
        }
    };
    return WindowRankPanel;
}(WindowCentenMin));
var WindowRankSList = /** @class */ (function (_super) {
    __extends(WindowRankSList, _super);
    function WindowRankSList() {
        return _super.call(this) || this;
    }
    WindowRankSList.prototype.init = function ($uiAtlas) {
        WindowRankSListRender.baseAtlas = $uiAtlas;
        this.initData();
    };
    WindowRankSList.prototype.initData = function () {
        var $ary = new Array();
        var w = 400;
        var h = 330;
        this.setData($ary, WindowRankSListRender, w, h, 400, 33, 10, 256, 512, 1, 12);
        this.center = 20;
        this.middle = 30;
    };
    WindowRankSList.prototype.setRankData = function ($data) {
        var $tbDataArr = new Array();
        for (var i = 0; i < $data.length; i++) {
            var $vo = new SListItemData();
            if ($data[i]) {
                $vo.data = $data[i];
                $vo.id = i;
                $tbDataArr.push($vo);
            }
        }
        this.refreshData($tbDataArr);
    };
    WindowRankSList.prototype.show = function () {
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
        }
        this.setShowLevel(2);
    };
    WindowRankSList.prototype.hide = function () {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
        }
    };
    return WindowRankSList;
}(SList));
var WindowRankSListRender = /** @class */ (function (_super) {
    __extends(WindowRankSListRender, _super);
    function WindowRankSListRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowRankSListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
        if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
        _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
        this.r_num = this.creatSUI($baseRender, WindowRankSListRender.baseAtlas, "s_lab2", 261, 6, 100, 20);
        $container.addChild(this.r_num);
        this.r_name = this.creatSUI($baseRender, WindowRankSListRender.baseAtlas, "s_lab1", 112, 6, 130, 20);
        $container.addChild(this.r_name);
        this.r_rank = this.creatSUI($baseRender, WindowRankSListRender.baseAtlas, "s_lab0", 20, 6, 60, 20);
        $container.addChild(this.r_rank);
        this.r_bg = this.creatGrid9SUI($bgRender, WindowRankSListRender.baseAtlas, "s_bg", 0, 0, 356, 33, 5, 5);
        $container.addChild(this.r_bg);
    };
    WindowRankSListRender.prototype.applyRender = function () {
        if (!(this.itdata.id % 2)) {
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
        }
        var $vo = this.itdata.data;
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_name.skinName, ColorType.Brown7a2f21 + $vo.name, 14, TextAlign.CENTER);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_num.skinName, ColorType.Brown7a2f21 + $vo.val, 14, TextAlign.CENTER);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_rank.skinName, ColorType.Brown7a2f21 + $vo.rank, 14, TextAlign.CENTER);
    };
    WindowRankSListRender.prototype.render = function ($data) {
        this.itdata = $data;
        //console.log("--$data----",$data);
        if (this.itdata && this.itdata.data) {
            this.applyRender();
        }
        else {
            this.setnull();
        }
    };
    WindowRankSListRender.prototype.setnull = function () {
        UiDraw.clearUI(this.r_bg);
        UiDraw.clearUI(this.r_rank);
        UiDraw.clearUI(this.r_name);
        UiDraw.clearUI(this.r_num);
    };
    return WindowRankSListRender;
}(SListItem));
var WindowRankVo = /** @class */ (function () {
    function WindowRankVo() {
    }
    return WindowRankVo;
}());
//# sourceMappingURL=WindowRankPanel.js.map