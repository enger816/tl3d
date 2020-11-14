module Pan3d {


    export class GameStart {

        /**是否是外网 */
        public static outNet: boolean = false;
        public static GM: boolean = true
        public static ready: boolean = false;
        public dataReady: boolean = false;
        public uiReadyNum: number = 0;
        public uiAllNum: number = 0;
        public static appVersion: number = 0;
        public init(): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + "ui/load/001.jpg", ($texture: TextureRes) => {
            });
            if (GameStart.outNet) {
                GameStart.GM = false
            }
            var $baseUiList: Array<any> = new Array;
            $baseUiList.push({ xmlurl: "ui/arpgui/textlist.xml", picurl: "ui/arpgui/textlist.png", name: UIData.textlist });
            $baseUiList.push({ xmlurl: "ui/uidata/public/public.xml", picurl: "ui/uidata/public/public.png", name: UIData.publicUi });
            this.uiAllNum = UIData.init($baseUiList,
                () => {
                    this.loadAll();
                },
                (num: number) => {
                    this.uiReadyNum = num;
                    if (this.dataReady) {
                        FpsStage.getInstance().showLoadInfo("读取UI数据：" + this.uiReadyNum + "/" + this.uiAllNum);
                    }
                }
            );
       
   

        }

  

        private loadAll(): void {
            if (this.uiReadyNum == this.uiAllNum && this.dataReady) {
                this.loadDataComplet();
                FpsStage.getInstance().showLoadInfo("正在连接服务器");
                GameStart.ready = true;

            }
        }
        private loadDataComplet(): void {
            if (GameStart.outNet) {
                GameStart.GM = false;
            }



        }




    }

}