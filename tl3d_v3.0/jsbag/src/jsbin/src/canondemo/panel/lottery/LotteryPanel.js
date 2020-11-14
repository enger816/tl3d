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
var lottery;
(function (lottery) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var RoationUIRenderComponent = Pan3d.RoationUIRenderComponent;
    var LotteryMeshVo = /** @class */ (function () {
        function LotteryMeshVo($id, $type, $num) {
            this.id = $id;
            this.type = $type;
            this.num = $num;
        }
        return LotteryMeshVo;
    }());
    lottery.LotteryMeshVo = LotteryMeshVo;
    var LotteryPanel = /** @class */ (function (_super) {
        __extends(LotteryPanel, _super);
        function LotteryPanel() {
            var _this = _super.call(this) || this;
            _this.shareNum = 0;
            _this.isPLayNow = false;
            _this.interfaceUI = false;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._rotationRender = new RoationUIRenderComponent();
            _this.addRender(_this._rotationRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.makeXml();
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/lottery/lottery.txt", "panelui/lottery/lottery.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LotteryPanel.prototype.makeXml = function () {
            this.item = new Array();
            this.item.push(new LotteryMeshVo(0, 1, 40));
            this.item.push(new LotteryMeshVo(1, 1, 1));
            this.item.push(new LotteryMeshVo(2, 2, 0));
            this.item.push(new LotteryMeshVo(3, 1, 80));
            this.item.push(new LotteryMeshVo(4, 1, 40));
            this.item.push(new LotteryMeshVo(5, 1, 5));
            this.item.push(new LotteryMeshVo(6, 1, 10));
            this.item.push(new LotteryMeshVo(7, 1, 20));
        };
        LotteryPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._rotationRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addChild(this._bottomRender.getComponent("a_win_bg"));
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(this._bottomRender.getComponent("a_lottery_tittle"));
            this.a_lottery_rotation = this.addEvntBut("a_lottery_rotation", this._rotationRender);
            this.a_lottery_rotation.x = this.a_lottery_rotation.baseRec.x + this.a_lottery_rotation.width / 2;
            this.a_lottery_rotation.y = this.a_lottery_rotation.baseRec.y + this.a_lottery_rotation.height / 2;
            this.a_start_but = this.addEvntBut("a_start_but", this._topRender);
            this.addChild(this._topRender.getComponent("a_top_front_pic"));
            this.addChild(this._bottomRender.getComponent("a_have_num_bg"));
            this.a_have_num = this.addChild(this._topRender.getComponent("a_have_num"));
            this.addChild(this._topRender.getComponent("a_left_has_num_pic"));
            this.a_right_add_but = this.addEvntBut("a_right_add_but", this._topRender);
            this.a_win_close_but = this.addEvntButUp("a_win_close_but", this._topRender);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        LotteryPanel.prototype.drawHasNum = function (value) {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_have_num.skinName, Pan3d.ColorType.Whiteffffff + String(value), 16, TextAlign.CENTER);
        };
        LotteryPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_start_but:
                    break;
                case this.a_win_close_but:
                    this.hidePanel();
                    break;
                case this.a_right_add_but:
                    this.mouseDonwAddBut();
                    break;
                default:
                    break;
            }
        };
        LotteryPanel.prototype.playToNextNum = function () {
            if (Math.random() > 0.8) {
                return this.item[5];
            }
            else {
                return this.item[1];
            }
        };
        LotteryPanel.prototype.playTo = function () {
            var _this = this;
            var tempData = GameData.getEveryDataSyncByName("lotterydata");
            if (tempData.num > 0) {
                this.isPLayNow = true;
                var $vo = this.playToNextNum();
                this.a_lottery_rotation.rotation = this.a_lottery_rotation.rotation % 360;
                TweenLite.to(this.a_lottery_rotation, 3, {
                    rotation: (360 * 3 + $vo.id * (360 / 8)), onComplete: function () {
                        console.log("结束");
                        _this.isPLayNow = false;
                        switch ($vo.type) {
                            case 1:
                                break;
                            case 2:
                                break;
                            default:
                                break;
                        }
                    }
                });
                GameData.setEveryDataSyncByName("lotterydata", tempData.num - 1);
                this.refrishData();
            }
            else {
                msgalert.OnlyTopTxt.show("你已没有卷了点击+号邀请好友可获取机会");
            }
        };
        LotteryPanel.prototype.mouseDonwAddBut = function () {
            var _this = this;
            var maxData = GameData.getEveryDataSyncByName("oneDayMaxLotteryNum");
            if (maxData.num > 10) {
            }
            else {
                GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(function (value) {
                    if (value == 1) {
                        console.log("分享成功", maxData.num);
                        GameData.setEveryDataSyncByName("oneDayMaxLotteryNum", maxData.num + 1);
                        GameData.setEveryDataSyncByName("lotterydata", GameData.getEveryDataSyncByName("lotterydata").num + 2);
                        _this.refrishData();
                    }
                }, AllShareMeshVo.type1));
            }
        };
        LotteryPanel.prototype.refrishData = function () {
            var $a = GameData.getEveryDataSyncByName("lotteryisGetByData");
            if ($a.num == 0) {
                GameData.setEveryDataSyncByName("lotteryisGetByData", $a.num + 1); //相当于设置了今天已领取
                GameData.setEveryDataSyncByName("lotterydata", 2); //首次进入为设置为2
            }
            var tempData = GameData.getEveryDataSyncByName("lotterydata");
            this.drawHasNum(tempData.num);
        };
        LotteryPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
                this.refrishData();
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        LotteryPanel.prototype.hidePanel = function () {
            var _this = this;
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        return LotteryPanel;
    }(H5UIConatiner));
    lottery.LotteryPanel = LotteryPanel;
})(lottery || (lottery = {}));
//# sourceMappingURL=LotteryPanel.js.map