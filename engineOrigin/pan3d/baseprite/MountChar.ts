module Pan3d {
    export class MountChar extends SceneBaseChar {

        public setData($rank: number, $iid: number): void {
            if ($iid > 0) {
                var obj: any = {}
                var avatar: number = obj.mountID;
                this.setAvatar(avatar);
                return;
            }

            if ($rank > 0) {
                var obj: any = {}
                var avatar: number = obj.mountID;
                this.setAvatar(avatar);
            }
        }

    }
}