module Pan3d {
    export class StringIndexer {
        //这4个数据与下标索引组成一个完成结构体
        protected _indexerExp: Array<RegExp>;
        protected _objs: Array<Array<GuidObject>>;
        protected _evFilter: Array<SyncEventFilter>;

        public constructor() {
            this._indexerExp = new Array();
            this._objs = new Array();
            this._evFilter = new Array();
        }

		/**
		 * 根据正则表达式返回加入的索引，并返回索引编号 如: create("^i\d+") 代表所有的物品
		 * @param exp
		 * @return 
		 */
        public createIndex(exp: string): number {
            var index: number = this.getIndex(exp);
            if (index == -1) {
                index = this._indexerExp.length;
                this._indexerExp[index] = new RegExp(exp, "g");
                this._objs[index] = new Array<GuidObject>();
                this._evFilter[index] = null;
            }
            return index;
        }

		/**
		 * 根据正则表达式返回索引 
		 * @param exp 正则表达式
		 * @return 返回索引,如果返回-1就是没找到
		 */
        public getIndex(exp: string): number {
            var idx: number = -1;
            for (var key in this._indexerExp) {
                idx++;
                var reg: RegExp = this._indexerExp[key]
                if (reg.source == exp)
                    return idx;
            }
            return -1;
        }

		/**
		 * 释放正则表达式的索引的内容
		 * 暂时不支持运行过程中增加和删除索引
		 * @param exp
		 */
        public releaseIndex(exp: string): void {
            var index: number = this.getIndex(exp);
            if (index != -1) {
                this._indexerExp.splice(index, 1);
                this._objs.splice(index, 1);
                this._evFilter.splice(index, 1);
            }
        }

		/**
		 * 根据传入的字符串，验证符合哪个索引 
		 * @param obj
		 * @return 
		 */
        private test(k: string): number {
            for (var i: number = 0; i < this._indexerExp.length; i++) {
                this._indexerExp[i].lastIndex = 0;
                if (this._indexerExp[i].test(k))
                    return i;
            }
            return -1;
        }

		/**
		 * 插入对象，遍历所有的正则表达式，如果符合则会插入
		 * @param obj
		 */
        public insert(obj: GuidObject): void {
            var i: number = this.test(obj.guid);
            if (i >= 0 && this._objs[i] && this._objs[i].indexOf(obj) == -1) {
                //对象符合索引，插入到相应的数组中
                this._objs[i][this._objs[i].length] = obj;
            }
        }

		/**
		 * 根据对象的GUID移除所在的索引
		 * @param guid
		 */
        public remove(guid: string): void {
            var i: number = this.test(guid);
            if (i == -1)
                return;
            for (var j: number = 0; j < this._objs[i].length; j++) {
                if (this._objs[i][j].guid == guid) {
                    this._objs[i].splice(j, 1);
                    return;
                }
            }
        }

		/**
		 * 根据正则表达式查询对象集合
		 * @param exp
		 * @return 
		 */
        public query(exp: string): Array<GuidObject> {
            var index: number = this.getIndex(exp);
            if (index == -1)
                return null;
            return this._objs[index];
        }

		/**
		 * 根据索引编号返回所有的对象集合
		 * @param indexTyp
		 * @return 
		 */
        public get(indexTyp: number): Array<GuidObject> {
            if (indexTyp < 0 || indexTyp >= this._objs.length)
                return null;
            return this._objs[indexTyp];
        }

		/**
		 * 传入对象去匹索引器 
		 * @param obj
		 * @return 
		 */
        public matchObject(obj: GuidObject): SyncEventFilter {
            if (!obj)
                return null;
            var i: number = this.test(obj.guid);
            if (i >= 0) {
                return this._evFilter[i];
            }
            return null;
        }

		/**
		 * 根据对象筛选的集合触发相应的事件 
		 * @param exp
		 * @param f
		 */
        public filter(exp: string, f: SyncEventFilter): void {
            var indexTyp: number = this.getIndex(exp);
            if (indexTyp < 0 || indexTyp >= this._objs.length)
                throw new Error("indexTyp < 0 || indexTyp >= this._objs.length");
            if (indexTyp >= this._evFilter.length)
                throw new Error("indexTyp >= this._evFilter.length");
            this._evFilter[indexTyp] = f;
        }

        public Clear(): void {
            if (this._indexerExp) {
                this._indexerExp.length = 0;
                this._indexerExp = null;
            }
            if (this._objs) {
                this._objs.length = 0;
                this._objs = null;
            }
            if (this._evFilter) {
                while (this._evFilter.length) {
                    var syncEventFilter: SyncEventFilter = this._evFilter.shift();
                    if (syncEventFilter)
                        syncEventFilter.Clear()
                }
            }
        }
    }
}