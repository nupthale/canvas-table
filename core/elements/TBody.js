import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";

import {cellStyle, containerPadding, getTableViewWidth} from "../meta";
import {clipRect, shadowRect} from "../../engine/utils/draw";

export default class TBody extends Element {
    static create(stage, trs) {
        const { tableWidth, dataSource } = stage;

        return createElement(TBody, {
            style: {
                direction: 'vertical',
                width: tableWidth,
                height: dataSource.length * cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, trs)
    }

    constructor(props) {
        super(props);
    }
}
