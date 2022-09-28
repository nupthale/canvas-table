import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";

import { cellStyle } from "../meta";

export default class TRow extends Element {
    static getDefaultProps(stage, rowIndex) {
        const { commonProps } = stage;

        return {
            ...commonProps,
            rowIndex,
            stage,
            style: {
                direction: 'horizontal',
                width: stage.tableWidth,
                height: cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            }
        };
    }

    static create(stage, tds, rowIndex) {
        return createElement(TRow, this.getDefaultProps(stage, rowIndex), tds)
    }

    constructor(props) {
        super(props);

        this.stage = props.stage;
        this.rowIndex = props.rowIndex;

        this.tag = 'row';
    }
}
