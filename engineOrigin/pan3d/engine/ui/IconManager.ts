module Pan3d {
    export class IconManager {
        private static _instance: IconManager;
        public static getInstance(): IconManager {
            if (!this._instance) {
                this._instance = new IconManager();
            }
            return this._instance;
        }

        private _dic: Object;
        private _loadDic: Object;

        public constructor() {
            this._dic = new Object;
            this._loadDic = new Object;
        }

 
       

    }

}