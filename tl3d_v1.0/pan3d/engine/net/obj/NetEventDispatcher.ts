/**
* 事件分发器,由于本身事件数量肯定不会多
* 所以没有必要使用二分查找算法,直接遍历 
* 事件ID与事件回调处于不同的数组，通过相同的数组下标关联
* @author linbc
*/	
module Pan3d {
    export class NetEventDispatcher {
        //事件分发器,事件句柄为整形
        public static KEY_TYPE_INT: number = 0;

        //事件分发器的事件句柄为字符串
        public static KEY_TYPE_STRING: number = 1;

        //事件分发类型使用的是
        public static KEY_TYPE_INT_MASK: number = 2;

        protected _event_key_type: number;

        protected _event_id_int: Array<number>;
        protected _event_id_str: Array<string>;
        protected _event_callback: Array<Function>;

        //用来触发多下标变化事件
        protected _event_id_int_mask: Array<UpdateMask>;

        protected _callback_index: number = 0;

        //由于事件触发时有可能修改到容器本身的值，所以先将事件放到该容器一起触发
        private _event_index: Array<number>;

        public constructor(type: number = 0) {
            this._event_key_type = type;

            //如果是事件句柄为字符串，初始化不同的数组
            if (type == NetEventDispatcher.KEY_TYPE_STRING)
                this._event_id_str = new Array;
            else if (type == NetEventDispatcher.KEY_TYPE_INT)
                this._event_id_int = new Array;
            else if (type == NetEventDispatcher.KEY_TYPE_INT_MASK)
                this._event_id_int_mask = new Array;

            this._event_callback = new Array;

            this._event_index = new Array;
        }

		/**
		 * 触发该事件的参数 
		 * @param param
		 */
        private DispatchIndex(param: Object): void {
            var i: any;
            if (this._event_key_type == NetEventDispatcher.KEY_TYPE_STRING) {
                for (i in this._event_index) {
                    this._event_callback[this._event_index[i]](param);
                }

            } else if (this._event_key_type == NetEventDispatcher.KEY_TYPE_INT) {
                for (i in this._event_index) {
                    this._event_callback[this._event_index[i]](param);
                }
            } else if (this._event_key_type == NetEventDispatcher.KEY_TYPE_INT_MASK) {
                for (i in this._event_index) {
                    this._event_callback[this._event_index[i]](param);
                }
            }
        }

        public DispatchString(key: string, param: Object): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_STRING)
                throw new Error("this.DispatchIndex/this._event_key_type != NetEventDispatcher.KEY_TYPE_STRING");

            //先清空
            this._event_index.length = 0;

            var len: number = this._event_callback.length;
            for (var i: number = 0; i < len; i++) {
                //插入最开头部分,便于等下循环删除
                if (key == this._event_id_str[i])
                    this._event_index.unshift(i);
            }
            //大部分是不触发的
            if (this._event_index.length) {
                this.DispatchIndex(param);
            }
        }

        public DispatchInt(key: number, param: Object): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT)
                throw new Error("this.DispatchIndex/this._event_key_type != NetEventDispatcher.KEY_TYPE_INT");
            //先触发			
            this._event_index.length = 0;

            var len: number = this._event_callback.length;
            for (var i: number = 0; i < len; i++) {
                //插入最开头部分,便于等下循环删除
                if (key == this._event_id_int[i])
                    this._event_index.unshift(i);
            }

            //大部分是不触发的
            if (this._event_index.length)
                this.DispatchIndex(param);
        }

        public DispatchIntMask(key: UpdateMask, param: Object): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT_MASK)
                throw new Error("this.DispatchIndex/this._event_key_type != NetEventDispatcher.KEY_TYPE_INT_MASK");

            this._event_index.length = 0;
            var len: number = this._event_callback.length;
            for (var i: number = 0; i < len; i++) {
                if (this._event_id_int_mask[i].test(key))
                    this._event_index.unshift(i);
            }

            //大部分是不触发的
            if (this._event_index.length)
                this.DispatchIndex(param);
        }

		/**
		 * 根据规则触发整数回调
		 *  
		 * @param param
		 * @param pred 回调格式 pred(index,binlog)->bool
		 */
        public Dispatch(param: Object, pred: Function): void {
            this._event_index.length = 0;

            var len: number = this._event_callback.length;
            for (var i: number = 0; i < len; i++) {
                //传入事件ID/事件参数，由函数指针
                if (pred(this._event_id_int[i], param))
                    this._event_index.unshift(i);
            }

            //大部分是不触发的
            if (this._event_index.length)
                this.DispatchIndex(param);
        }

		/**
		 * 添加回调监听,监听ID手工指定
		 * @param key	事件ID
		 * @param f		回调函数闭包,可以支持一个参数(Object)
		 */
        public AddListenInt(key: number, f: Function): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT)
                throw new Error("AddListenInt but (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT)");

            for (var i: number = 0; i < this._event_id_int.length; i++) {
                if (this._event_id_int[i] == key && this._event_callback[i] == f) {
                    return;
                }
            }

            this._event_id_int.push(key);
            this._event_callback.push(f);
        }

        public AddListenString(key: string, f: Function): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_STRING)
                throw new Error("AddListenString but (this._event_key_type != NetEventDispatcher.KEY_TYPE_STRING)");

            for (var i: number = 0; i < this._event_id_str.length; i++) {
                if (this._event_id_str[i] == key && this._event_callback[i] == f) {
                    return;
                }
            }

            this._event_id_str.push(key);
            this._event_callback.push(f);
        }

        public AddListenIntMask(key: UpdateMask, f: Function): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT_MASK)
                throw new Error("AddListenString but (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT_MASK)");

            for (var i: number = 0; i < this._event_id_int_mask.length; i++) {
                if (this._event_id_int_mask[i].equals(key) && this._event_callback[i] == f) {
                    return;
                }
            }

            this._event_id_int_mask.push(key.clone());
            this._event_callback.push(f);
        }

		/**
		 * 移除整型类的回调监听
		 * @param key 	事件ID
		 * @param f		回调函数闭包,可以支持一个参数(Object)，如果f为空，则移除所有
		 */
        public removeListenerInt(key: number, f: Function = null): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT)
                throw new Error("removeListenerInt but (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT)");
            for (var i: number = 0; i < this._event_id_int.length;) {
                if (this._event_id_int[i] == key && (f == null || this._event_callback[i] == f)) {
                    this._event_id_int.splice(i, 1);
                    this._event_callback.splice(i, 1);
                } else i++;
            }
        }

		/**
		 * 移除字符串类型的回调监听 
		 * @param key 	事件ID
		 * @param f 回调函数闭包,可以支持一个参数(Object)，如果f为空，则移除所有
		 */
        public removeListenerString(key: string, f: Function = null): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_STRING)
                throw new Error("removeListenerString but (this._event_key_type != NetEventDispatcher.KEY_TYPE_STRING)");
            for (var i: number = 0; i < this._event_id_str.length;) {
                if (this._event_id_str[i] == key && (f == null || this._event_callback[i] == f)) {
                    this._event_id_str.splice(i, 1);
                    this._event_callback.splice(i, 1);
                } else i++;
            }
        }

		/**
		 * 移除多下标监听 
		 * @param key
		 * @param f
		 */
        public removeListenerUpdateMask(key: UpdateMask, f: Function = null): void {
            if (this._event_key_type != NetEventDispatcher.KEY_TYPE_INT_MASK)
                throw new Error("removeListenerUpdateMask but ()");
            for (var i: number = 0; i < this._event_id_int_mask.length;) {
                if (this._event_id_int_mask[i].equals(key) && (f == null || this._event_callback[i] == f)) {
                    this._event_id_int_mask.splice(i, 1);
                    this._event_callback.splice(i, 1);
                } else i++;
            }

        }

		/**
		 *  添加回调监听,事件ID自增后并返回
		 * @param f	事件支持一个参数,Object
		 */
        public AddCallback(f: Function): number {
            if (this._event_key_type == NetEventDispatcher.KEY_TYPE_STRING)
                throw new Error("AddCallback but (this._event_key_type == NetEventDispatcher.KEY_TYPE_STRING)");

            var new_ev: number = this._callback_index + 1;
            do {
                new_ev = this._callback_index + 1;

                //如果回调编号已经存在或者等于0重新来
                for (var i in this._event_id_int) {
                    if (new_ev == 0 || new_ev == Number(i))
                        continue;
                }
                //回调跳号赋值
                this._callback_index = new_ev;
            } while (false);

            this.AddListenInt(new_ev, f);
            return new_ev;
        }

		/**
		 * 清空所有已经注册的事件监听 
		 */
        public Clear(): void {
            if (this._event_callback)
                this._event_callback.length = 0;
            if (this._event_id_int)
                this._event_id_int.length = 0;
            if (this._event_id_str)
                this._event_id_str.length = 0;
            if (this._event_index)
                this._event_index.length = 0;
            if (this._event_id_int_mask)
                this._event_id_int_mask.length = 0;
        }
    }
}