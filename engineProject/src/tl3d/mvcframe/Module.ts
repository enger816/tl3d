namespace tl3d {
    export class Module {
        public constructor() {

        }


        public getModuleName(): string {
            throw new Error("namespace必须复写命名");
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
         * 模块初始化
         */
        protected onRegister():void
        {

        }

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
                throw new Error("同一namespace不能注册两个相同的Processor");
            }
            this.processorMap[$processor.getName()] = $processor;
            $processor.registerEvents();
            //NetManager.getInstance().reg($processor);
        }



        /**
        * namespace字典 
        */
        static namespaceMap: Object = new Object();
        /**
        * 注册namespace
        * @param $namespace
        */
        static registerModule($namespace: Module): void {
            //单例
            if (Module.namespaceMap[$namespace.getModuleName()] != null) {
                throw new Error("不能注册两个相同的namespace："+$namespace.getModuleName());
            }
            Module.namespaceMap[$namespace.getModuleName()] = $namespace;
            $namespace.registerProcessors();
            $namespace.onRegister();
        }



    }
}