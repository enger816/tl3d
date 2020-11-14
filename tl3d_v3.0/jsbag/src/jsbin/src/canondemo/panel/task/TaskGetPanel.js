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
var task;
(function (task) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TaskGetPanel = /** @class */ (function (_super) {
        __extends(TaskGetPanel, _super);
        function TaskGetPanel() {
            var _this = _super.call(this) || this;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/task/task.txt", "panelui/task/task.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TaskGetPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addEvntBut("b_win_tip_bg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(this._topRender.getComponent("b_baoxian_pic"));
            this.addChild(this._topRender.getComponent("b_get_num_label"));
            this.b_get_num_txt = this._topRender.getComponent("b_get_num_txt");
            this.b_big_but = this.addEvntBut("b_big_but", this._topRender);
            this.b_no_need = this.addEvntBut("b_no_need", this._topRender);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        TaskGetPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.b_big_but:
                    this.setBigButSelect();
                    if (GameData.severinfo.adshareModel == 1) {
                        this.toLookAdAndPlay();
                    }
                    else {
                        this.shareBut_Clik();
                    }
                    break;
                case this.b_no_need:
                case this.win_tip_bg:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        TaskGetPanel.prototype.shareBut_Clik = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                if (value == 1) {
                    _this.getNumFinish();
                }
            }, AllShareMeshVo.type7));
        };
        TaskGetPanel.prototype.getNumFinish = function () {
            var $tadayStr = GameData.getDayStr();
            var $taskMeshVo = this.taskMeshVo;
            GameData.hasdiamondsHavenum += $taskMeshVo.num;
            msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + $taskMeshVo.num);
            switch ($taskMeshVo.type) {
                case task.TaskMeshVo.megameAdd:
                    GameData.setStorageSync("getMegameReward", true);
                    break;
                case task.TaskMeshVo.everydayLookAd:
                    var $lookAtTemp = GameData.getEveryDataSyncByName("lookVideoNum");
                    $lookAtTemp.isget = true;
                    GameData.setStorageSync("lookVideoNum", $lookAtTemp);
                    break;
                case task.TaskMeshVo.everydayonline:
                    GameData.setStorageSync("everydayonline", $tadayStr);
                    break;
                case task.TaskMeshVo.everydayendless:
                    GameData.setStorageSync("everydayendless", $tadayStr);
                    break;
                case task.TaskMeshVo.specialLeveladd:
                    var $specialLeveladd = GameData.getStorageSync("specialLeveladd");
                    $specialLeveladd.isget = true;
                    GameData.setStorageSync("specialLeveladd", $specialLeveladd);
                    break;
                case task.TaskMeshVo.helpOther:
                    var $helpdata = GameData.getStorageSync("helpdata");
                    $helpdata.isget = true;
                    GameData.setStorageSync("helpdata", $helpdata);
                    break;
                default:
                    break;
            }
            Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
            this.hidePanel();
        };
        TaskGetPanel.prototype.toLookAdAndPlay = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                if (value == 2) {
                    msgalert.AlertUtil.show("需要看完视屏才能领取奖励", "提示", function (value) {
                    }, 2);
                }
                if (value == 1) {
                    _this.getNumFinish();
                }
                if (value == 0) {
                    //视频看完了，就只能分享；
                    _this.shareBut_Clik();
                }
            });
        };
        TaskGetPanel.prototype.setBigButSelect = function () {
            this.b_big_but.selected = GameData.severinfo.adshareModel == 1;
        };
        TaskGetPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte && this.taskMeshVo) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.setBigButSelect();
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_get_num_txt.skinName, Pan3d.ColorType.Redff0000 + this.taskMeshVo.num, 26, Pan3d.TextAlign.CENTER);
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        TaskGetPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        return TaskGetPanel;
    }(H5UIConatiner));
    task.TaskGetPanel = TaskGetPanel;
})(task || (task = {}));
//# sourceMappingURL=TaskGetPanel.js.map