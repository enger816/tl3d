module Pan3d {
    export class UILoading extends UIConatiner {

        private static _instance: UILoading;
        public static getInstance(): UILoading {
            if (!this._instance) {
                this._instance = new UILoading();
            }
            return this._instance;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this.initData();
        }
        private _ui: FrameCompenent;
        private atls: UIAtlas;
        private _render: UIRenderComponent;
        public initData(): void {
            //var render:UIRenderComponent = new UIRenderComponent();
            this.atls = new UIAtlas();
            this.atls.configData = new Array;
            this.atls.configData.push(this.atls.getObject("load", 0, 0, 256, 256, 256, 256, 4, 4));
            this.atls.loadImgUrl("ui/load/ui_loding.png", () => { this.loadCom() })

        }

        private loadCom(): void {
            this._render = new UIRenderComponent();
            this._render.uiAtlas = this.atls;
            var ui: FrameCompenent = this._render.createFrame("load");
            this.addChild(ui);
            ui.speed = 1;
            ui.width = 100;
            ui.height = 100;
            ui.x = (UIData.designWidth - ui.width) / 2;
            ui.y = (UIData.designHeight - ui.height) / 2;
            this.addRender(this._render);

        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }
}