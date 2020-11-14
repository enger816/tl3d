module Pan3d {
    export class SelectButton extends BaseButton {

        private _selected: boolean;

        public constructor() {
            super();
            this._selected = false;
        }

        public get selected(): boolean {
            return this._selected;
        }

        public set selected(value: boolean) {
            this._selected = value;

            if (this._selected) {
                this._state = 1;
            } else {
                this._state = 0;
            }
        }

        public interactiveEvent(e: InteractiveEvent): boolean {
            if (!this.enable) {
                return false
            }
            if (e.type == InteractiveEvent.Down) {
                if (this.testPoint(e.x, e.y)) {
                    this._selected = !this._selected;
                    if (this._selected) {
                        this._state = 1;
                    } else {
                        this._state = 0;
                    }
                }
            }

            return super.interactiveEvent(e);
        }
    }
}