module Pan3d {
    export class UIConatiner {


        protected _x: number = 0;
        protected _y: number = 0;
        protected _width: number = 0;
        protected _height: number = 0;

        protected _left: number = 0;
        protected _right: number = 0;
        protected _center: number = 0;
        protected _xType: number = 0;

        protected _top: number = 0;
        protected _bottom: number = 0;
        protected _middle: number = 0;
        protected _yType: number = 0;

        protected _list: Array<UICompenent> = new Array;

        public renderList: Array<UIRenderComponent> = new Array;

        protected _maskList: Array<UIMask>;

        private _hasStage: boolean = false;

        public virtualContainerList: Array<UIVirtualContainer>;

        private _hasLoad: boolean = false;
        private _completeFun: Function;
        private _isLoading: boolean = false;
        private _needShowLoading: boolean = true;

        private _interfaceUI: boolean = false;
        private _layer: number = 100;

        public set layer(val: number) {
            this._layer = val;
            for (var i: number = 0; i < this.renderList.length; i++) {
                this.renderList[i].sortnum = this._layer;
            }
        }
        public get layer(): number {
            return this._layer;
        }

        public set interfaceUI(val: boolean) {
            this._interfaceUI = val
            if (val) {
                this.layer = 0;
            } else {
                this.layer = 100;
            }
        }

        public get interfaceUI(): boolean {
            return this._interfaceUI;
        }

        public constructor() {

        }
        public load($complateFun: Function, $needShowLoading = true): void {
            if (this._isLoading) {
                return;
            }
            this._completeFun = $complateFun;
            this._needShowLoading = $needShowLoading;
            if (this._hasLoad) {
                $complateFun();
            } else {
                this._isLoading = true;
                if (this._needShowLoading) {
                    UILoading.getInstance().show();
                }
                this.makeBaseWinUi();
            }
        }

        public get hasLoad(): boolean {
            return this._hasLoad;
        }
        protected makeBaseWinUi(): void {
            this.applyLoad();
        }
        public applyLoad(): void {

        }

        public applyLoadComplete(): void {
            this._isLoading = false;
            this._completeFun();
            if (this._needShowLoading) {
                UILoading.getInstance().hide();
            }
            this._hasLoad = true;

        }

        public set hasStage(val: boolean) {
            this._hasStage = val;
            if (val) {
                this.onAdd();
            } else {
                this.onRemove();
            }
        }

        public get hasStage(): boolean {
            return this._hasStage;
        }

        public setUiListVisibleByItem($arr: Array<UICompenent>, $flag: boolean): void {
            try {
                for (var i: number = 0; i < $arr.length; i++) {
                    if ($flag) {
                        if (!$arr[i].parent) {
                            this.addChild($arr[i])
                        }

                    } else {
                        if ($arr[i].parent) {
                            this.removeChild($arr[i])
                        }
                    }

                }
            } catch (err) {
                //console.log("在此处理错误3");
            }
        }
        public onAdd(): void { }

        public onRemove(): void { }



        public addChild($ui: UICompenent): UICompenent {
            if (!$ui) {
                //console.log("ui cuo ")
                throw new Error("ui cuo");
            }
            if ($ui.parent) {
                return;
            }
            this._list.push($ui);

            $ui.parent = this;
            $ui.addStage();
            return $ui;
        }

        public addVirtualContainer($con: UIVirtualContainer): void {
            if (!this.virtualContainerList) {
                this.virtualContainerList = new Array;
            }
            $con.parent = this
            this.virtualContainerList.push($con);
        }

        public removeVirtualContainer($con: UIVirtualContainer): void {

        }

        public addUIList($ary: Array<string>, $uiRender: UIRenderComponent): Array<UICompenent> {
            var $arr: Array<UICompenent> = new Array()
            for (var i: number = 0; i < $ary.length; i++) {
                var ui: UICompenent = $uiRender.getComponent($ary[i]);
                this.addChild(ui);
                $arr.push(ui)
            }
            return $arr;
        }
        public getUIList($ary: Array<string>, $uiRender: UIRenderComponent): Array<UICompenent> {
            var $arr: Array<UICompenent> = new Array()
            for (var i: number = 0; i < $ary.length; i++) {
                var ui: UICompenent = $uiRender.getComponent($ary[i]);
                $arr.push(ui)
            }
            return $arr;
        }
        /*
        *添加事件UI
        */
        public addEvntBut($name: string, $uiRender: UIRenderComponent): any {
            var $temp: UICompenent = this.addChild(<UICompenent>$uiRender.getComponent($name));
            $temp.addEventListener(InteractiveEvent.Down, this.butClik, this);
            return $temp;
        }
        public addEvntButUp($name: string, $uiRender: UIRenderComponent): any {
            var $temp: UICompenent = this.addChild(<UICompenent>$uiRender.getComponent($name));
            $temp.addEventListener(InteractiveEvent.Up, this.butClik, this);
            return $temp;
        }
        /*
        *移除事件UI
        */
        protected removeEvntBut($ui: UICompenent) {
            $ui.removeEventListener(InteractiveEvent.Down, this.butClik, this);
            this.removeChild($ui)
        }
        protected butClik(evt: InteractiveEvent): void {
        }
        /*
        *设置显示层的显示列表
        */
        protected renderSetVisibel($list: Array<UIRenderComponent>, value: boolean): void {
            for (var i: number = 0; i < $list.length; i++) {
                if (value) {
                    if (!$list[i].rendering) {
                        this.addRender($list[i]);
                    }
                } else {
                    if ($list[i].rendering) {
                        this.removeRender($list[i]);
                    }
                }
            }
        }


        public removeChild($ui: UICompenent): void {
            var index: number = this._list.indexOf($ui);
            if (index != -1) {
                this._list.splice(index, 1);
            } else {
                return;
            }
            $ui.parent = null;
            $ui.removeStage();
        }
        public removeAll(): void {
            while (this._list.length) {
                this.removeChild(this._list[0])
            }
            while (this._maskList.length) {
                this.removeMaks(this._maskList[0])
            }

        }

        public addMask($mask: UIMask): void {
            if (!this._maskList) {
                this._maskList = new Array;
            }
            $mask.parent = this;
            $mask.applyAbsolutePoint();
            this._maskList.push($mask);
        }

        public removeMaks($mask: UIMask): void {
            if (this._maskList) {
                var index: number = this._maskList.indexOf($mask);
                if (index != -1) {
                    this._maskList.splice(index, 1);
                }
            }
        }

        public addRender($uiRender: UIRenderComponent): void {
            var index: number = this.renderList.indexOf($uiRender);
            if (index != -1) {
                return;
            }
            $uiRender.container = this;
            $uiRender.sortnum = this._layer;
            this.renderList.push($uiRender);
            if (this.hasStage) {
                UIManager.getInstance().addUI($uiRender);
            }
        }
        public addRenderAt($uiRender: UIRenderComponent, $idx: number): void {
            var index: number = this.renderList.indexOf($uiRender);
            if (index != -1) {
                return;
            }
            $uiRender.container = this;
            $uiRender.sortnum = this._layer;
            this.renderList.splice($idx, 0, $uiRender);
            if (this.hasStage) {
                UIManager.getInstance().addUI($uiRender);
            }

        }

        public removeRender($uiRender: UIRenderComponent): void {

            var index: number = this.renderList.indexOf($uiRender);
            if (index != -1) {
                this.renderList.splice(index, 1);
            } else {
                return;
            }
            if (this.hasStage) {
                UIManager.getInstance().removeUI($uiRender);
            }
        }



        public resize(): void {
            if (this._xType == 0) {
                this._x = this._left * UIData.Scale;
            } else if (this._xType == 1) {
                this._x = Scene_data.stageWidth - this._right * UIData.Scale - this.width * UIData.Scale;
            } else if (this._xType == 2) {
                this._x = this._center * UIData.Scale + Scene_data.stageWidth / 2 - this.width * UIData.Scale / 2;
            }

            if (this._yType == 0) {
                this._y = this._top * UIData.Scale;
            } else if (this._yType == 1) {
                this._y = Scene_data.stageHeight - this._bottom * UIData.Scale - this.height * UIData.Scale;
            } else if (this._yType == 2) {
                this._y = this._middle * UIData.Scale + Scene_data.stageHeight / 2 - this.height * UIData.Scale / 2;
            }

            this.applyChild();

            this.resizeVirtualList();

        }

        public resizeVirtualList(): void {
            if (!this.virtualContainerList) {
                return;
            }

            for (var i: number = 0; i < this.virtualContainerList.length; i++) {
                this.virtualContainerList[i].resize();
            }

        }

        public set left(value: number) {
            this._left = value;
            this._xType = 0;
            this._x = this._left * UIData.Scale;
            this.applyChild();
        }
        public get left(): number {
            return this._left
        }


        public set right(value: number) {
            this._right = value;
            this._xType = 1;
            this._x = Scene_data.stageWidth - this._right * UIData.Scale - this.width * UIData.Scale;
            this.applyChild();
        }

        public get right(): number {
            return this._right;
        }

        public set center(value: number) {
            this._center = value;
            this._xType = 2;
            this._x = this._center * UIData.Scale + Scene_data.stageWidth / 2 - this.width * UIData.Scale / 2;
            this.applyChild();
        }

        public set top(value: number) {
            this._top = value;
            this._yType = 0;
            this._y = this._top * UIData.Scale;
            this.applyChild();
        }
        public get top(): number {
            return this._top
        }


        public set bottom(value: number) {
            this._bottom = value;
            this._yType = 1;
            this._y = Scene_data.stageHeight - this._bottom * UIData.Scale - this.height * UIData.Scale;
            this.applyChild();
        }

        public get bottom(): number {
            return this._bottom;
        }

        public set middle(value: number) {
            this._middle = value;
            this._yType = 2;
            this._y = this._middle * UIData.Scale + Scene_data.stageHeight / 2 - this.height * UIData.Scale / 2;
            this.applyChild();
        }

        public set width(value: number) {
            this._width = value;
        }

        public get width() {
            if (this._width != 0) {
                return this._width;
            }
            var num: number = 0;

            for (var i: number = 0; i < this._list.length; i++) {
                num = Math.max(this._list[i].width);
            }

            return num;
        }
        public set height(value: number) {
            this._height = value;
        }
        public get height() {

            if (this._height != 0) {
                return this._height;
            }
            var num: number = 0;

            for (var i: number = 0; i < this._list.length; i++) {
                num = Math.max(this._list[i].height);
            }

            return num;
        }

        public applyChild(): void {
            for (var i: number = 0; i < this._list.length; i++) {
                this._list[i].applyAbsolutePoint();
            }

            if (this._maskList) {
                for (var i: number = 0; i < this._maskList.length; i++) {
                    this._maskList[i].applyAbsolutePoint();
                }
            }

        }

        public set x(value: number) {
            this._x = value;
        }
        public get x() {
            return this._x;
        }

        public set y(value: number) {
            this._y = value;
        }
        public get y() {
            return this._y;
        }

        public dispose(): void {
            //console.log("忘了重写disposepanel");
        }
        public setSizeForPanelUiCopy($ui: UICompenent, $uiName: string, $uiRender: UIRenderComponent): void {
            var temp: UICompenent = $uiRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        }



    }

    export class Dis2DUIContianerBase extends UIConatiner {
        public constructor() {
            super();
        }
        public update(t: number): void {

        }
        public clearOneTemp(): void {
        }
    }
}