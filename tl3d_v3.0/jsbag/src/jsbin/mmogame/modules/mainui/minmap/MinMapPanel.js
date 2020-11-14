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
var minmap;
(function (minmap) {
    var MinMapPanel = /** @class */ (function (_super) {
        __extends(MinMapPanel, _super);
        function MinMapPanel() {
            var _this = _super.call(this) || this;
            _this.nextDrawGMtime = 0;
            _this.interfaceUI = true;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.right = 0;
            _this.top = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            // this._effRender = new FrameUIRender();
            // this.addRender(this._effRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            // this._effGuaRender = new FrameUIRender();
            // this.addRender(this._effGuaRender);
            // this._effGuaRender.blenderMode = 1;
            _this._redPointRender = new RedPointRender();
            _this.addRender(_this._redPointRender);
            _this._midRender.setInfo("ui/uidata/minmap/minmap.xml", "ui/uidata/minmap/minmap.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        MinMapPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.a_bg_map = this.addEvntBut("w_bg", this._bottomRender); //this.addChild(<UICompenent>this._bottomRender.getComponent("w_bg"));
            this.addChild(this._bottomRender.getComponent("a_email_bg"));
            //this.addChild(this._topRender.getComponent("a_open_map"));
            this.a_email_icon = this.addChild(this._topRender.getComponent("a_email_icon")); //this.addEvntBut("a_email_icon", this._topRender)
            this.a_email_icon.addEventListener(InteractiveEvent.Up, this.emailClick, this);
            var red = this._redPointRender.getRedPointUI(this, 3, new Vector2D(this.a_email_icon.x + this.a_email_icon.width + 3, this.a_email_icon.y - 4));
            this.a_map = this.addChild(this._topRender.getComponent("a_map"));
            // this.a_map_name = this.addChild(<UICompenent>this._topRender.getComponent("a_map_name"));
            // this.a_money = this.addChild(<UICompenent>this._topRender.getComponent("a_money"));
            // this.a_exp = this.addChild(<UICompenent>this._topRender.getComponent("a_exp"));
            // this.a_guaji = this.addChild(<UICompenent>this._topRender.getComponent("a_guaji"));
            this.a_pos_txt = this.addChild(this._topRender.getComponent("a_pos_txt"));
            // this.a_map_icon = <FrameCompenent>this._topRender.getComponent("a_map_icon");
            // this.addChild(this.a_map_icon);
            // this.a_map_icon.goToAndStop(0);
            // this.a_map_icon.addEventListener(InteractiveEvent.Up,this.butClik,this);
            // this._effRender.setImg(getEffectUIUrl("ui_zidong"), 4, 4, ($ui: any) => {
            //     this.expEff = $ui;
            //     this.expEff.x = this.a_guaji.x - 10;
            //     this.expEff.y = this.a_guaji.y - 38;
            //     this.expEff.width = this.expEff.baseRec.width;
            //     this.expEff.height = this.expEff.baseRec.height;
            //     this.expEff.speed = 2;
            //     this.addChild(this.expEff);
            // })
            // this._effGuaRender.setImg(getEffectUIUrl("ef_guangshu"), 4, 8, ($ui: any) => {
            //     this.guaEff = $ui;
            //     this.guaEff.x = this.a_map_icon.x - 8;
            //     this.guaEff.y = this.a_map_icon.y + 8;
            //     this.guaEff.width = this.guaEff.baseRec.width * 0.5;
            //     this.guaEff.height = this.guaEff.baseRec.height * 0.5;
            //     this.guaEff.speed = 2;
            //     if(this.a_map_icon.current == 1){
            //         this.addChild(this.guaEff);
            //     }                
            // })
            TimeUtil.addFrameTick(function (t) { _this.update(t); });
            this.refresh();
        };
        MinMapPanel.prototype.butClik = function (evt) {
            // if(GuidData.map.isAdventureScene()){
            //     page = 1
            // }else{
            //     if(!GuidData.player.getsyspageopen(SharedDef.MODULE_WORLD_RISK,SharedDef.MODULE_WORLD_RISK_MAIN)){
            //         var sy:tb.TB_system_base = tb.TB_system_base.getTempVo(SharedDef.MODULE_WORLD_RISK * 10 + SharedDef.MODULE_WORLD_RISK_MAIN);
            //         msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级" + sy.level + "级后解锁", 99);
            //         return;
            //     }
            // }
            ModulePageManager.openPanel(SharedDef.MODULE_MAP);
        };
        MinMapPanel.prototype.emailClick = function (evt) {
            ModulePageManager.openPanel(SharedDef.MODULE_MAIL);
        };
        MinMapPanel.prototype.update = function (t) {
            if (AstarUtil.minMapRect && this.hasStage) {
                var $v = GameInstance.mainChar.getAstarPos();
                if (!$v) {
                    return;
                }
                var str = $v.x + "," + $v.y;
                if (str != this.posStr) {
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_pos_txt.skinName, ColorType.Yellowffe9b4 + str, 28);
                    this.posStr = str;
                }
                //LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_pos_txt.skinName, ColorType.Yellowffe9b4 + "" + $v.x + ":" + $v.y, 14)
            }
        };
        MinMapPanel.prototype.refresh = function () {
            if (this._topRender.uiAtlas) {
                if (SceneManager.getInstance().ready) {
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map.skinName, ColorType.Coffeeff9200 + GuidData.map.tbMapVo.name, 28);
                    ////console.log("ui/load/map/" + String(GuidData.map.tbMapVo.id) + ".png")
                    /*
                    var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurTb();

                    if(GuidData.map.isAdventureScene()){
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, ColorType.colorffe9b4 + $tb.name, 28);
                        this.a_map_icon.goToAndStop(0);
                        if(this.guaEff){
                            this.removeChild(this.guaEff);
                        }
                    }else{
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, ColorType.colorffe9b4 + GuidData.map.tbMapVo.name, 28);
                        this.a_map_icon.goToAndStop(1);
                        if(this.guaEff){
                            this.addChild(this.guaEff);
                        }
                    }
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map.skinName, ColorType.Coffeeff9200 + GuidData.map.tbMapVo.types, 28);
                    

                    
                    var exp: number = $tb.expReward[1] * 360;
                    var wnum:number = LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exp.skinName, ColorType.colorffe9b4 + Snum(exp) + "/小时 ", 24, TextAlign.CENTER);
                    
                    var gold: number = $tb.goldReward[1] * 360;
                    wnum = LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_money.skinName, ColorType.colorffe9b4 + Snum(gold) + "/小时", 24, TextAlign.CENTER);

                    */
                }
            }
        };
        MinMapPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return MinMapPanel;
    }(UIConatiner));
    minmap.MinMapPanel = MinMapPanel;
})(minmap || (minmap = {}));
//# sourceMappingURL=MinMapPanel.js.map