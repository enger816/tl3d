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
var selectlevel;
(function (selectlevel) {
    var UIManager = Pan3d.UIManager;
    var UIData = Pan3d.UIData;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent;
    var SelectLevelPanel = /** @class */ (function (_super) {
        __extends(SelectLevelPanel, _super);
        function SelectLevelPanel() {
            var _this = _super.call(this) || this;
            _this.pageNum = 0;
            _this.pageMax = 2;
            _this.pageTatolNum24 = 30;
            _this.pageRollNum = 5;
            _this.isMove = false;
            _this.lastCentenX = 0;
            _this.mouseDownX = 0;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this.allMc = new Array;
            _this._bottomRender = new AlphaUIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._tittleRender = new AlphaUIRenderComponent();
            _this.addRender(_this._tittleRender);
            _this._midRender = new AlphaUIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new AlphaUIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/selectlevel/selectlevel.txt", "panelui/selectlevel/selectlevel.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        SelectLevelPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._tittleRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addChild(this._bottomRender.getComponent("e_bg"));
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.mouseDown, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.baseButUp, this);
            this.addChild(this._tittleRender.getComponent("e_tittle_txt"));
            this.addChild(this._midRender.getComponent("e_window_bg"));
            this.e_back_an = this.addEvntButUp("e_back_an", this._topRender);
            // GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)
            this.uiLoadComplte = true;
            this.showPanel();
            this.showLevelAll();
        };
        SelectLevelPanel.prototype.adde_page_point = function () {
            if (!this.page_point_item) {
                this.page_point_item = new Array();
            }
            while (this.page_point_item.length) {
                this.removeChild(this.page_point_item.pop());
            }
            for (var i = 0; i < this.pageMax; i++) {
                var $temp = (this.addChild(this._topRender.getComponent("e_page_point")));
                $temp.center = i * 40 - 40;
                $temp.bottom = 100;
                $temp.alpha = 0.5;
                this.page_point_item.push($temp);
            }
        };
        SelectLevelPanel.prototype.clearAll = function () {
            while (this.allMc.length) {
                this.removeChild(this.allMc.pop());
            }
        };
        SelectLevelPanel.prototype.showLevelAll = function () {
            this.clearAll();
            this.lastShowMaxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
            var maxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) + 1;
            for (var i = 0; i < this.pageTatolNum24; i++) {
                var $level = i + 1 + (this.pageNum * this.pageTatolNum24);
                var e_level_bg = this.addEvntButUp("e_level_bg", this._midRender);
                e_level_bg.data = $level;
                e_level_bg.alpha = 0.0;
                e_level_bg.data = $level;
                e_level_bg.x = i % this.pageRollNum * 80 + +e_level_bg.baseRec.x;
                e_level_bg.y = Math.floor(i / this.pageRollNum) * 80 + e_level_bg.baseRec.y;
                var show = maxLevel < $level;
                e_level_bg.goToAndStop(show ? 1 : 0);
                var e_level_num = this.addChild(this._topRender.getComponent("e_level_num"));
                e_level_num.alpha = 0.0;
                e_level_num.goToAndStop(i);
                e_level_num.x = e_level_bg.x + 22;
                e_level_num.y = e_level_bg.y + 30;
                if (show) {
                    e_level_num.x = 10000;
                }
                var $toRect = e_level_num.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                Pan3d.ArtFont.getInstance().writeFontToCtxCenten($ctx, String($level), "NUM41", 20, 0, 8);
                e_level_num.drawToCtx(this._topRender.uiAtlas, $ctx);
                TweenLite.to(e_level_bg, 0.3, { alpha: 1, delay: i * 0.01 });
                TweenLite.to(e_level_num, 0.3, { alpha: 1, delay: i * 0.01 });
                this.allMc.push(e_level_bg);
                this.allMc.push(e_level_num);
            }
            for (var k = 0; k < this.page_point_item.length; k++) {
                this.page_point_item[k].alpha = this.pageNum == k ? 1 : 0.5;
            }
        };
        SelectLevelPanel.prototype.addEvntButUp = function ($name, $uiRender) {
            var $temp = this.addChild($uiRender.getComponent($name));
            $temp.addEventListener(InteractiveEvent.Up, this.baseButUp, this);
            return $temp;
        };
        Object.defineProperty(SelectLevelPanel.prototype, "center", {
            get: function () {
                return this._center;
            },
            set: function (value) {
                this._center = value;
                this._xType = 2;
                this._x = this._center * UIData.Scale + Scene_data.stageWidth / 2 - this.width * UIData.Scale / 2;
                this.applyChild();
            },
            enumerable: true,
            configurable: true
        });
        SelectLevelPanel.prototype.mouseDown = function (evt) {
            this.isMove = false;
            this.mouseDownX = evt.x;
            this.lastCentenX = this.center;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
        };
        SelectLevelPanel.prototype.onMove = function (evt) {
            this.isMove = true;
            this.center = this.lastCentenX + (evt.x - this.mouseDownX) / UIData.Scale;
        };
        SelectLevelPanel.prototype.showNextPage = function () {
            var _this = this;
            Pan3d.TimeUtil.addTimeOut(150, function () {
                _this.showLevelAll();
                _this.center = 0;
            });
        };
        SelectLevelPanel.prototype.baseButUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            if (this.isMove && Math.abs(this.center) > 5) {
                if (Math.abs(this.center) < 150) {
                    TweenLite.to(this, 0.3, { center: 0 });
                }
                else {
                    var $d = this.center / Math.abs(this.center) * 500;
                    var $toMove = $d;
                    if ($d > 0) {
                        if (this.pageNum <= 0) {
                            $toMove = 0;
                        }
                        else {
                            this.pageNum--;
                            this.showNextPage();
                        }
                    }
                    else {
                        if ((this.pageNum + 1) >= this.pageMax) {
                            $toMove = 0;
                        }
                        else {
                            this.pageNum++;
                            this.showNextPage();
                        }
                    }
                    TweenLite.to(this, 0.1, { center: $toMove });
                }
            }
            else {
                if (evt.target == this.e_back_an) {
                    this.hidePanel();
                }
                else {
                    var $selectNum = (evt.target.data);
                    var $maxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
                    if ($selectNum <= ($maxLevel + 1)) {
                        Pan3d.ModuleEventManager.dispatchEvent(new topstart.TopStartEvent(topstart.TopStartEvent.HIDE_TOP_START_PANEL));
                        GameData.dispatchToLevel($selectNum);
                        this.center = 0;
                        this.hidePanel();
                    }
                }
            }
        };
        SelectLevelPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        SelectLevelPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                var ke = Math.min(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) + 2, GameData.severinfo.level);
                this.pageMax = Math.ceil(ke / this.pageTatolNum24);
                this.adde_page_point();
                this.pageNum = Math.floor((game.GameDataModel.levelNum - 1) / this.pageTatolNum24);
                this.center = 0;
                Pan3d.UIManager.getInstance().addUIContainer(this);
                if (!isNaN(this.lastShowMaxLevel) && this._topRender.uiAtlas) {
                    if (this.lastShowMaxLevel != GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)) {
                        //刷新等级列表
                        this.showLevelAll();
                    }
                }
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        return SelectLevelPanel;
    }(H5UIConatiner));
    selectlevel.SelectLevelPanel = SelectLevelPanel;
})(selectlevel || (selectlevel = {}));
//# sourceMappingURL=SelectLevelPanel.js.map