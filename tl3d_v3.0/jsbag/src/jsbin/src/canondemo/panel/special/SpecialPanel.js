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
var special;
(function (special) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var Rectangle = Pan3d.Rectangle;
    var SListItemData = Pan3d.SListItemData;
    var SpecialPanel = /** @class */ (function (_super) {
        __extends(SpecialPanel, _super);
        function SpecialPanel() {
            var _this = _super.call(this) || this;
            _this.maxShowNum4 = 5;
            return _this;
        }
        SpecialPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/special/special.txt", "panelui/special/special.png", function () { _this.loadConfigCom(); });
        };
        SpecialPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true;
            this.winRect = new Rectangle(0, 0, 480, 600);
            this.addChild(this._topRender.getComponent("a_win_tittle_txt"));
            this._taskUiList = new special.SpecialUiList();
            this._taskUiList.init(this._topRender.uiAtlas);
            this.showPanel();
        };
        SpecialPanel.prototype.makeListArr = function ($str) {
            var $arr = JSON.parse($str);
            this.specialSelfshow = GameData.getStorageSync("specialSelfshow");
            this.makeWillSelfShow($arr);
            var $backArr = new Array();
            for (var i = 0; i < this.specialSelfshow.length; i++) {
                for (var j = 0; j < $arr.length; j++) {
                    if ($arr[j].levelnum == this.specialSelfshow[i]) {
                        $backArr.push($arr[j]);
                    }
                }
            }
            return $backArr;
        };
        SpecialPanel.prototype.makeWillSelfShow = function ($arr) {
            if (!this.specialSelfshow) {
                //如果第一次进来
                this.specialSelfshow = new Array();
                for (var i = 0; i < $arr.length && i < this.maxShowNum4; i++) {
                    this.specialSelfshow.push($arr[i].levelnum);
                }
            }
            else {
                var $passNum = 0;
                for (var j = 0; j < this.specialSelfshow.length; j++) {
                    if (this.isPassByLevel(this.specialSelfshow[j])) {
                        $passNum++;
                    }
                }
                if ($passNum >= this.maxShowNum4 - 1) {
                    this.specialSelfshow = new Array();
                    for (var k = 0; k < $arr.length && this.specialSelfshow.length < this.maxShowNum4; k++) {
                        if (!this.isPassByLevel($arr[k].levelnum)) {
                            this.specialSelfshow.push($arr[k].levelnum);
                        }
                    }
                    console.log("准备更新新的关卡", this.specialSelfshow);
                }
                else {
                    console.log("保持原来数据");
                }
            }
            GameData.setStorageSync("specialSelfshow", this.specialSelfshow);
        };
        SpecialPanel.prototype.toBeFinishAll = function () {
            for (var i = 0; i < this.showItem.length; i++) {
                var vo = this.showItem[i].data;
                var $specialdata = GameData.getStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR);
                if (!$specialdata) {
                    $specialdata = {};
                }
                if (!$specialdata[vo.levelnum]) {
                    $specialdata[vo.levelnum] = {};
                }
                $specialdata[vo.levelnum].ispass = true;
                GameData.setStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR, $specialdata);
            }
        };
        SpecialPanel.prototype.showSpecialListData = function () {
            var _this = this;
            if (this.showItem) {
                return;
            }
            else {
                this.showItem = new Array;
            }
            LoadManager.getInstance().load(Scene_data.fileRoot + "panelui/special/bg/speciallist.txt", LoadManager.XML_TYPE, function ($str) {
                var $xmlArr = _this.makeListArr($str);
                //this.toBiFinish(5000)
                //this.toBiFinish(5001)
                //this.toBiFinish(5002)
                //this.toBiFinish(5003)
                console.log("$xmlArr", $xmlArr);
                console.log(_this.showItem);
                var $leveItem = new Array;
                for (var i = 0; i < $xmlArr.length; i++) {
                    $leveItem.push($xmlArr[i].levelnum);
                }
                var $postStr = "levels=" + JSON.stringify($leveItem);
                GameData.WEB_SEVER_EVENT_AND_BACK("get_level_record", $postStr, function (res) {
                    console.log("返回的数据", res);
                    for (var i = 0; i < $xmlArr.length; i++) {
                        var item = new SListItemData;
                        var $taskMeshVo = new special.SpecialMeshVo();
                        $taskMeshVo.picurl = $xmlArr[i].picurl;
                        $taskMeshVo.colorid = $xmlArr[i].colorid;
                        $taskMeshVo.mapname = $xmlArr[i].mapname;
                        $taskMeshVo.openlevel = $xmlArr[i].openlevel;
                        $taskMeshVo.id = $xmlArr[i].id;
                        $taskMeshVo.levelnum = $xmlArr[i].levelnum;
                        $taskMeshVo.name = $xmlArr[i].name;
                        $taskMeshVo.isPass = _this.isPassByLevel($taskMeshVo.levelnum);
                        $taskMeshVo.ranklist = _this.rankListArrByLevel($taskMeshVo.levelnum, res);
                        $taskMeshVo.id = 1;
                        item.data = $taskMeshVo;
                        item.id = 1;
                        _this.showItem.push(item);
                    }
                    _this._taskUiList.refreshData(_this.showItem);
                });
            });
        };
        SpecialPanel.prototype.rankListArrByLevel = function (value, res) {
            var $arr = new Array;
            if (res && res.data && res.data.list) {
                var $list = res.data.list[value];
                for (var i = 0; $list && i < $list.length; i++) {
                    var $vo = new GameUserVo;
                    $vo.name = $list[i].info;
                    $vo.openid = $list[i].openid;
                    $vo.data = $list[i].time;
                    ;
                    $arr.push($vo);
                }
            }
            return $arr;
        };
        SpecialPanel.prototype.isPassByLevel = function (value) {
            var $specialdata = GameData.getStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR);
            if (!$specialdata) {
                $specialdata = {};
                GameData.setStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR, $specialdata);
            }
            if ($specialdata[value]) {
                return $specialdata[value].ispass;
            }
            return false;
        };
        SpecialPanel.prototype.pushTempSListItemData = function (ary, $vo1) {
            if ($vo1) {
                ary.push($vo1);
                $vo1.id = ary.length;
            }
        };
        SpecialPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        SpecialPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                if (!this.hasStage) {
                    Pan3d.UIManager.getInstance().addUIContainer(this);
                    this._taskUiList.show();
                    this.TweenLiteScale(0.1, UIData.Scale, 0.5);
                }
                this.showSpecialListData();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        SpecialPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this._taskUiList.resize();
        };
        SpecialPanel.prototype.hidePanel = function () {
            var _this = this;
            if (this.uiLoadComplte && this.hasStage) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                    Pan3d.UIManager.getInstance().removeUIContainer(_this);
                    _this._taskUiList.hide();
                });
            }
        };
        SpecialPanel.SPECIAL_DATA_SYNC_STR = "SPECIAL_DATA_SYNC_STR";
        return SpecialPanel;
    }(basewin.BaseWinPanel));
    special.SpecialPanel = SpecialPanel;
})(special || (special = {}));
//# sourceMappingURL=SpecialPanel.js.map