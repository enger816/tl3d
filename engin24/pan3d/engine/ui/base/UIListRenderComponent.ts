import {UIRenderComponent} from "./UIRenderComponent"
import {List} from "../compenent/List"
import {GridList} from "../compenent/GridList"

    export class UIListRenderComponent extends UIRenderComponent {

        public constructor() {
            super();
        }

        public createList(): List {

            var list: List = new List;
            list.uiRender = this;
            return list;

        }

        public createGridList(): GridList {

            var list: GridList = new GridList;
            list.uiRender = this;
            return list;
        }

    }
