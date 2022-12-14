import Element from "../../engine/dom/Element";

import {createElement} from "../../engine/utils/util";
import {drawRect} from "../../engine/utils/draw";

export default class Table extends Element {
    static create(stage, thead, tbody) {
        const { tableWidth, tableHeight } = stage;

        return createElement(Table, {
            stage,
            style: {
                position: 'relative',
                zIndex: 1,
                width: tableWidth,
                height: tableHeight,
                padding: [0, 0, 0, 0],
                border: [],
                backgroundColor: '#fff',
            }
        }, [thead, tbody]);
    }

    constructor(props) {
        super(props);
    }
}
