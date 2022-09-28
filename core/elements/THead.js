import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";

import { cellStyle } from "../meta";

export default class THead extends Element {
    static create(stage, tr) {
        const { tableWidth, fixedHeader } = stage;

        return createElement(THead, {
            fixedHeader,
            style: {
                direction: 'horizontal',
                width: tableWidth,
                height: cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
                zIndex: 3,
            }
        }, [tr]);
    }

    constructor(props) {
        super(props);
        this.fixedHeader = props.fixedHeader;
    }
}

