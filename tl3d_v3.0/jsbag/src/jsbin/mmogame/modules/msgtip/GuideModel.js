var msgtip;
(function (msgtip) {
    var GuideModel = /** @class */ (function () {
        function GuideModel() {
            var _this = this;
            this.closeGuild = false;
            this._stepGuideId = 0;
            this.listName = ["FubenResList"];
            if (UIManager.popClikNameFun) {
                UIManager.popClikNameFun = function ($name, $id) {
                    if ($id === void 0) { $id = 0; }
                    _this.uiClikName($name, $id);
                };
            }
        }
        GuideModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new GuideModel();
            }
            return this._instance;
        };
        GuideModel.prototype.hideGuidePop = function () {
            this.closeGuild = true;
            this.hidePopView();
            //console.log("关闭引导");
        };
        //从这里一定是主UI开始
        GuideModel.prototype.showMainUIGuidePopView = function () {
            if (UIManager.getInstance().hasWindowUI()) {
                return;
            }
            if (this.closeGuild) {
                return;
            }
            //  alert(GuidData.map.showAreaById(AreaType.sceneExit_30))
            if (GuidData.map.showAreaById(AreaType.sceneExit_30)) {
                return;
            }
            this.hidePopView();
            var b = GuidData.player.getPlayerIntFieldGuideIdNow();
            //console.log("当前进度", GuidData.player.getPlayerIntFieldGuidIdLast(), GuidData.player.getPlayerIntFieldGuideIdNow())
            //console.log("刷新系统--------",b)
            this.stepGuideId = 0;
            if (GuidData.player.needGuididPop && SceneManager.getInstance().render) {
                UIManager.getInstance().removeNoInterfaceUI();
                var $tb = tb.TB_system_guide.get_TB_system_guide(b * 10);
                // //console.log("新系统是否有开启", this.getSysIsOpenBySkinName($tb.skinName), $tb.skinName);
                if ($tb && this.getSysIsOpenBySkinName($tb.skinName)) {
                    switch ($tb.skinName) {
                        case "sys201":
                        case "sys202":
                        case "sys203":
                        case "sys204":
                        case "sys205":
                        case "sys206":
                        case "sys207":
                        case "sys208":
                        case "sys209":
                        case "sys501":
                            //console.log(mainUi.MainUiModel.skillTabIndex, mainUi.MainUiModel.systemTab)
                            if (mainUi.MainUiModel.skillTabIndex == 1) {
                                if (mainUi.MainUiModel.systemTab == 2) {
                                    this.e_anBut();
                                }
                                else {
                                    var $sysId = Number($tb.skinName.substring(3, $tb.skinName.length));
                                    var $sysPos = mainUi.MainUiModel.getPandaPostionBySysId($sysId);
                                    this.popCreatByRect(new Rectangle($sysPos.x - 2, $sysPos.y - 2, 75, 75), { bottom: 0, right: 0 }, $tb);
                                }
                            }
                            else {
                                this.c_qiehuanBut();
                                return;
                            }
                            break;
                        default:
                            if ($tb.skinName.search("panda") != -1) {
                                if (GameInstance.pandaVisibel) {
                                    var $pandaPos = mainUi.MainUiModel.getPandaPostionBySysId(Number($tb.skinName.substring(5, $tb.skinName.length)));
                                    this.popCreatByRect(new Rectangle($pandaPos.x, $pandaPos.y, 60, 60), { top: 0, right: 0 });
                                }
                            }
                            else {
                                this.popTempView($tb);
                            }
                            break;
                    }
                }
            }
            this.showMainuiOptional(0);
        };
        GuideModel.prototype.showPandaListhButGuide = function () {
        };
        GuideModel.prototype.showMainuiOptional = function ($page) {
            ModuleEventManager.dispatchEvent(new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_OPTIONL_GUIDE_EVENT));
            for (var i = 0; i < GuidData.player.optionalGuidItem.length; i++) {
                var $optionalId = GuidData.player.optionalGuidItem[i].x;
                var $flag = GuidData.player.optionalGuidItem[i].y;
                var $tb = tb.TB_system_guide.get_TB_system_guide($optionalId * 10 + $flag);
                if ($tb) {
                    if ($page == 0 && $tb.isMainui) {
                        var $canShow = false;
                        //console.log($tb);
                        switch ($tb.skinName) {
                            case "sys201":
                            case "sys202":
                            case "sys203":
                            case "sys204":
                            case "sys205":
                            case "sys206":
                            case "sys207":
                            case "sys208":
                            case "sys209":
                            case "sys501":
                                if (mainUi.MainUiModel.skillTabIndex == 1) {
                                    if (mainUi.MainUiModel.systemTab == 2) {
                                        //  this.e_anBut()
                                    }
                                    else {
                                        var $sysId = Number($tb.skinName.substring(3, $tb.skinName.length));
                                        var $sysPos = mainUi.MainUiModel.getPandaPostionBySysId($sysId);
                                        $tb.area[0] = $sysPos.x;
                                        $tb.area[1] = $sysPos.y;
                                        $canShow = true;
                                    }
                                }
                                else {
                                    //  this.c_qiehuanBut()
                                }
                                break;
                            default:
                                if ($tb.skinName.search("panda") != -1) {
                                    var $pandaPos = mainUi.MainUiModel.getPandaPostionBySysId(Number($tb.skinName.substring(5, $tb.skinName.length)));
                                    $tb.area[0] = $pandaPos.x;
                                    $tb.area[1] = $pandaPos.y;
                                    $canShow = true;
                                }
                                else {
                                    //  this.popTempView($tb)
                                }
                                break;
                        }
                        if ($canShow) {
                            //console.log("主UI", $tb.skinName);
                            var $guideEve = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_OPTIONL_GUIDE_EVENT);
                            $guideEve.data = $tb;
                            ModuleEventManager.dispatchEvent($guideEve);
                        }
                    }
                }
            }
        };
        GuideModel.prototype.showPanda = function () {
            this.popCreatByRect(new Rectangle(740, 1, 60, 60), { top: 0, right: 0 });
        };
        GuideModel.prototype.c_qiehuanBut = function () {
            this.popCreatByRect(new Rectangle(890, 145, 60, 60), { right: 0 });
        };
        GuideModel.prototype.e_anBut = function () {
            this.popCreatByRect(new Rectangle(900, 470, 60, 60), { bottom: 0, right: 0 });
        };
        //主UI，对象的系系统。
        GuideModel.prototype.getSysIsOpenBySkinName = function ($name) {
            var $sysId = 0;
            switch ($name) {
                case "f_qichen"://可骑乘
                    $sysId = 210;
                    break;
                case "a_boss_but"://任务
                    if (!GuidData.map.isAdventureBaseScene()) {
                        return false;
                        //break
                    }
                case "a_list_cell": //任务
                case "a_skill_2": //任务
                case "a_family": //任务
                case "a_bag": //任务
                case "a_map_icon": //任务
                case "a_hunjing"://任务
                    return true;
                default:
                    if ($name.search("panda") != -1) {
                        $sysId = Number($name.substring(5, $name.length));
                    }
                    if ($name.search("sys") != -1) {
                        $sysId = Number($name.substring(3, $name.length));
                        //console.log($name, $sysId )
                    }
                    break;
            }
            return GuidData.player.isOpenSystemById($sysId);
        };
        GuideModel.prototype.popCreatByRect = function ($rect, $layout, $baseTb) {
            if ($baseTb === void 0) { $baseTb = null; }
            var $tb = new tb.TB_system_guide(null);
            $tb.type = 1;
            $tb.area = [$rect.x, $rect.y, $rect.width, $rect.height];
            $tb.text = "";
            if ($baseTb) {
                $tb.text = $baseTb.text;
                $tb.area[2] = $baseTb.area[2];
                $tb.area[3] = $baseTb.area[3];
            }
            $tb.layout = $layout;
            this.popTempView($tb);
        };
        GuideModel.prototype.popTempView = function ($tb) {
            if ($tb) {
                //console.log($tb)
                var $ett = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_BIEGUIDE_EVENT);
                $ett.data = $tb;
                ModuleEventManager.dispatchEvent($ett);
            }
        };
        GuideModel.prototype.showModuleGuidePage = function ($pageId) {
            if ($pageId === void 0) { $pageId = null; }
            if (this.closeGuild) {
                return;
            }
            this.hidePopView();
            if ($pageId && $pageId != this.lastPage) {
                this.stepGuideId = 1;
                this.lastPage = $pageId;
            }
            else {
                $pageId = this.lastPage;
                this.stepGuideId = Math.max(1, this.stepGuideId);
            }
            /*
                if ($pageId) {
                    this.stepGuideId = 1;
                    this.lastPage = $pageId;
                } else {
                    $pageId = this.lastPage;
                }
            */
            var b = GuidData.player.getPlayerIntFieldGuideIdNow();
            var $list = tb.TB_system_icon.getTempVo($pageId).list;
            for (var i = 0; i < $list.length; i++) {
                if ($list[i] == b) {
                    var kkk = b * 10 + this.stepGuideId;
                    var $tb = tb.TB_system_guide.get_TB_system_guide(kkk);
                    if ($tb) {
                        this.popTempView($tb);
                    }
                    else {
                        //console.log("已经结束了")
                        this.stepGuideId = 0;
                    }
                }
            }
        };
        GuideModel.prototype.hidePopView = function () {
            ModuleEventManager.dispatchEvent(new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT));
        };
        Object.defineProperty(GuideModel.prototype, "stepGuideId", {
            get: function () {
                return this._stepGuideId;
            },
            set: function (value) {
                this._stepGuideId = value;
            },
            enumerable: true,
            configurable: true
        });
        GuideModel.prototype.uiClikName = function ($name, $pageid) {
            //console.log("按钮名字------>", $name);
            var _this = this;
            this.hidePopView();
            if ($name == "c_qiehuan" || $name == "e_an" || $name == "t_show_but") {
                TimeUtil.addTimeOut(1, function () {
                    _this.showMainUIGuidePopView();
                });
                return;
            }
            var b = GuidData.player.getPlayerIntFieldGuideIdNow();
            if (GuidData.player.needGuididPop || this.stepGuideId > 0) {
                var kkk = b * 10 + this.stepGuideId;
                var $tb = tb.TB_system_guide.get_TB_system_guide(kkk);
                if ($tb) {
                    if ($tb.skinName == $name) {
                        if ($tb.isfinish == 1) {
                            //console.log("完成引导", b, $tb);
                            NetManager.getInstance().protocolos.finish_now_guide();
                            GuidData.player.resetSystemItem();
                        }
                        if ($tb.isMainui) {
                            //console.log("在主面板准备开启模块");
                        }
                        else {
                            this.stepGuideId++;
                            this.showModuleGuidePage();
                        }
                    }
                }
                else {
                    this.stepGuideId = 0;
                }
            }
            else {
                if ($pageid > 0) {
                    this.clikOptionalGuide($name, $pageid);
                }
            }
        };
        GuideModel.prototype.clikOptionalGuide = function ($name, $pageid) {
            var $tbSystem = tb.TB_system_icon.getTempVo($pageid);
            if ($tbSystem) {
                var $optional_list = $tbSystem.optional_list;
                for (var i = 0; i < $optional_list.length; i++) {
                    for (var j = 0; j < GuidData.player.optionalGuidItem.length; j++) {
                        var $optionalId = GuidData.player.optionalGuidItem[j].x;
                        var $flag = Math.max(GuidData.player.optionalGuidItem[j].y, 1);
                        if ($optionalId == $optional_list[i]) {
                            var $tb = tb.TB_system_guide.get_TB_system_guide($optionalId * 10 + $flag);
                            if ($tb) {
                                //console.log($tb)
                                //console.log("$tb.skinName", $tb.skinName);
                                if ($tb.skinName == $name) {
                                    this.sendToSaveOptional($optionalId, $flag);
                                    //console.log("结束这次引导", $optionalId, $flag)
                                    this.showModuleOptionalPage($pageid); //当前引导完成，对比下一个引导位置
                                }
                            }
                        }
                    }
                }
            }
        };
        GuideModel.prototype.sendToSaveOptional = function ($optionalId, $flag) {
            NetManager.getInstance().protocolos.finish_optional_guide_step($optionalId, $flag);
            for (var j = 0; j < GuidData.player.optionalGuidItem.length; j++) {
                if (GuidData.player.optionalGuidItem[j].x == $optionalId) {
                    GuidData.player.optionalGuidItem[j].y += 1;
                }
            }
        };
        //显示面板里的非强制引导
        GuideModel.prototype.showModuleOptionalPage = function ($pageId) {
            ModuleEventManager.dispatchEvent(new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_OPTIONL_GUIDE_EVENT));
            if ($pageId) {
                var $optional_list = tb.TB_system_icon.getTempVo($pageId).optional_list;
                for (var i = 0; i < $optional_list.length; i++) {
                    for (var j = 0; j < GuidData.player.optionalGuidItem.length; j++) {
                        var $optionalId = GuidData.player.optionalGuidItem[j].x;
                        var $flag = GuidData.player.optionalGuidItem[j].y;
                        if ($flag == 0) {
                            this.sendToSaveOptional($optionalId, $flag);
                            $flag = $flag + 1;
                        }
                        if ($optionalId == $optional_list[i]) {
                            //console.log("需要显示的对象", $optionalId, $flag);
                            $optionalId * 10 + $flag;
                            var $tb = tb.TB_system_guide.get_TB_system_guide($optionalId * 10 + $flag);
                            if ($tb) {
                                var $guideEve = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_OPTIONL_GUIDE_EVENT);
                                $guideEve.data = $tb;
                                ModuleEventManager.dispatchEvent($guideEve);
                            }
                        }
                    }
                }
            }
        };
        return GuideModel;
    }());
    msgtip.GuideModel = GuideModel;
})(msgtip || (msgtip = {}));
//# sourceMappingURL=GuideModel.js.map