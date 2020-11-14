module Pan3d {
    export class GuidObjectTable extends SyncEvent {
        protected _objs: Object = new Object;

        private _newEvent: NetEventDispatcher;

        private _delEvent: NetEventDispatcher;

        protected _indexer: StringIndexer;

        //std::function<uint32_t(const string&)> 从字符串转换出整形用于节约 
        protected _hashGUID: Function = null;

        //以对象ID的hash希，整型作为key的对象表
        protected _u_2_guid: Object = new Object();

        public constructor() {
            super();
            this._newEvent = new NetEventDispatcher(NetEventDispatcher.KEY_TYPE_STRING);
            this._delEvent = new NetEventDispatcher(NetEventDispatcher.KEY_TYPE_STRING);
            this._indexer = new StringIndexer();
        }

        public Get(k: string): GuidObject {
            return <GuidObject>(this._objs[k]);
        }

		/**				 
		 * 索引器
		 */
        public get indexer(): StringIndexer {
            return this._indexer;
        }

		/**
		 * 创建对象
		 * @param k
		 * @return 
		 */
        public CreateObject(k: string): GuidObject {
            var p: GuidObject = this._objs[k];
            if (!p) {
                p = new GuidObject();
                p.guid = k;
                this.AttachObject(p);
            }
            return p;
        }

		/**
		 * 释放对象
		 * @param o
		 */
        public ReleaseObject(o: GuidObject): void {
            var k: string = o.guid;
            var p: GuidObject = this._objs[k];
            if (!p)
                return;
            this.DetachObject(p);
        }

        public ReleaseKey(k: string): void {
            var p: GuidObject = this._objs[k];
            if (!p)
                return;
            this.DetachObject(p);
        }

        public AttachObject(o: GuidObject): void {
            if (o == null)
                throw new Error("AttachObject,o==null");
            o.add_ref(1);
            this._objs[o.guid] = o;
            //加入对象分类
            this._indexer.insert(o);

            //如果hash函数不为空则要维护一个key对照表	
            var u_guid: number = 0;
            if (this._hashGUID != null) {
                u_guid = this._hashGUID(o.guid);
                if (u_guid != 0)
                    this._u_2_guid[u_guid] = o.guid;
            }
        }

        public DetachObject(o: GuidObject): void {
            o.add_ref(-1);
            if (o.ref <= 0) {
                this._indexer.remove(o.guid);
                delete this._objs[o.guid];

                //如果hash函数不为空则要维护一个key对照表	
                var u_guid: number = 0;
                if (this._hashGUID != null) {
                    u_guid = this._hashGUID(o.guid);
                    if (u_guid != 0) {
                        delete this._u_2_guid[u_guid];
                        ////console.log("删除GUID"+ u_guid);
                    }
                }
            }
        }

        public msgClientsubscription($byte: Pan3dByteArray): void {

        }


        protected static applyBlock_tmp_obj: GuidObject = new GuidObject;

		/**
		 * 应用对象更新数据包 
		 * @param bytes
		 */
        public ApplyBlock(bytes: Pan3dByteArray): boolean {
            while (bytes.bytesAvailable) {
                var flags: number = bytes.readUnsignedByte();
                var guid: string;//= bytes.readUTF();	
                //先读出标志，如果是整形guid则转换成字符串
                if (flags & SyncEvent.OBJ_OPT_U_GUID) {
                    var u_guid: number = bytes.readUnsignedInt();
                    guid = this._u_2_guid[u_guid] ? this._u_2_guid[u_guid] : "";

                    if (guid.length == 0) {
                        //console.log("111没有对象 uguid=>", u_guid);
                    }

                }
                else {
                    guid = bytes.readUTF();
                }
                //if (ObjectDef.getPrefix(guid) == "O"){
                //  //console.log("oooooooooooooodddd " + flags);
                //}
                if (guid.length == 0) {
                    //console.log("没有对象 guid=>", guid);
                    return false;
                }
                var cur_obj: GuidObject = this.Get(guid);
                //对象是否属于索引
                var evFilter: SyncEventFilter;
                //如果是删除则触发事件
                if (flags & SyncEvent.OBJ_OPT_DELETE) {
                    this._delEvent.DispatchString(guid, cur_obj);
                    this.ReleaseKey(guid);
                    evFilter = this._indexer.matchObject(cur_obj);
                    //对象消失了					
                    if (evFilter != null) {
                        evFilter.beginPush(cur_obj);
                        evFilter.pushDelete();
                        evFilter.endPush();
                    }
                    cur_obj.dispose();
                    continue;
                }
                //从流中读出对象,如果没有找到该对象则读取后抛弃
                var applyNew: boolean = (flags & SyncEvent.OBJ_OPT_NEW) == 0;
                if (!cur_obj) {
                    if (flags & SyncEvent.OBJ_OPT_NEW) {
                        applyNew = !this._objs[guid];
                        cur_obj = this.CreateObject(guid);
                        // console.log("创建GUID:" + guid);
                    }
                    else {
                        cur_obj = GuidObjectTable.applyBlock_tmp_obj;
                    }
                }

                if (flags & SyncEvent.OBJ_OPT_UPDATE) {
                    // console.log("更新GUID:" + guid);
                }
                evFilter = this._indexer.matchObject(cur_obj);
                if (evFilter) {
                    evFilter.beginPush(cur_obj);
                }
                cur_obj.ReadFrom(flags, bytes, evFilter, applyNew);
                if (evFilter) {
                    evFilter.endPush()
                };
                //如果是新对象则触发下事件
                if (flags & SyncEvent.OBJ_OPT_NEW) {
                    this._newEvent.DispatchString(cur_obj.guid.charAt(0), cur_obj);
                }
            }
            return true;
        }

        /*根据查询定符串返回对象列表*/
        public SearchObject(s: string, vec: Array<string>): void {
            //TODO:这里的正则对象性能优化
            var regex: RegExp = new RegExp(s);
            vec.length = 0;
            for (var k in this._objs) {
                if (regex.test(k))
                    vec.push(k);
            }
        }

        /*提供一种机制用于遍历所有的对象列表 委托格式 f(obj:GuidObject):void*/
        public ForEachObject(f: Function): void {
            for (var o in this._objs) {
                f(this._objs[o]);
            }
        }

		/**
		 * 调用远程创建对象，成功的时候回调 
		 * @param guid
		 * @param cb function(o:GuidObject):void
		 */

        public RegisterCreateEvent(guid: string, cb: Function): void {
            this._newEvent.AddListenString(guid, cb);
        }

		/**
		 * 调用远程删除对象,成功时回调 
		 * @param guid
		 * @param cb function(o:GuidObject):void
		 */

        public RegisterReleaseEvent(guid: string, cb: Function): void {
            this._delEvent.AddListenString(guid, cb);
        }

        //用于每次发包的缓存 		 
        private _packet_pool: Array<Pan3dByteArray> = new Array;

		/**
		 * 从池中分配新的数据包,如果没有包号就不要写入
		 * @param optCode
		 * @return 
		 */
        public newPacket(optCode: number = 0): Pan3dByteArray {
            var pkt: Pan3dByteArray = null;
            if (this._packet_pool.length == 0) {
                pkt = new Pan3dByteArray;
                pkt.endian = Endian.LITTLE_ENDIAN;
            }
            else {
                pkt = this._packet_pool.shift();
                pkt.clear();
            }
            if (optCode)
                pkt.writeShort(optCode);
            return pkt;
        }

		/**
		 * 回收数据包到包池 
		 * @param pkt
		 */
        public freePacket(pkt: Pan3dByteArray): void {
            pkt.clear();
            this._packet_pool.push(pkt);
        }

		/**
		 * 清理对象
		 */
        public clearObjs(): void {
            for (var key in this._objs) {
                if (this._objs[key] instanceof GuidObject) {
                    var obj: GuidObject = this._objs[key];
                    this.removeObject(obj.guid, obj);
                    obj.dispose();
                }
                delete this._objs[key];
            }
        }

        /*移除对象*/
        protected removeObject(guid: string, obj: GuidObject): void {
            this._delEvent.DispatchString(guid, obj);
            this.ReleaseKey(guid);
            var evFilter: SyncEventFilter = this._indexer.matchObject(obj);
            //对象消失了					
            if (evFilter != null) {
                evFilter.beginPush(obj);
                evFilter.pushDelete();
                evFilter.endPush();
            }
        }

        public dispose(): void {
            this._newEvent.Clear();
            this._delEvent.Clear();
            //this._indexer.Clear();
            for (var key in this._objs) {
                var k: GuidObject = this._objs[key];
                if (k) {
                    k.dispose();
                }
            }
            this._objs = new Object();
        }
    }
}