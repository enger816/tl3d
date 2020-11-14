module Pan3d {
    export class Module {
        public constructor() {

        }


        public getModuleName(): string {
            throw new Error("module必须复写命名");
            //return "";
        }

        /**
        * 注册的Processor的集合
        * 请注意：返回为Processor的实例数组
        * @return 
        * 
        */
        protected listProcessors(): Array<Processor> {
            return null;
        }
        /**
             * processor字典 
             */
        private processorMap: Object = new Object();
        /**
        * 注册所有的Processor
        */
        private registerProcessors(): void {
            //注册Processor
            var processorArr: Array<Processor> = this.listProcessors();
            if (processorArr != null && processorArr.length > 0) {
                for (var i: number = 0; i < processorArr.length; i++) {
                    this.registerProcessor(processorArr[i]);
                }
            }
        }

        /**
        * 注册Processor
        * @param $processor
        */
        private registerProcessor($processor: Processor): void {
            //单例
            if (this.processorMap[$processor.getName()] != null) {
                throw new Error("同一Module不能注册两个相同的Processor");
            }
            this.processorMap[$processor.getName()] = $processor;
            $processor.registerEvents();
            NetManager.getInstance().reg($processor);

        }



        /**
        * module字典 
        */
        public static moduleMap: Object = new Object();
        /**
        * 注册Module
        * @param $module
        */
        public static registerModule($module: Module): void {
            //单例
            if (Module.moduleMap[$module.getModuleName()] != null) {
                throw new Error("不能注册两个相同的Module");
            }
            Module.moduleMap[$module.getModuleName()] = $module;
            $module.registerProcessors();
            //$module.onRegister();
        }



    }
}