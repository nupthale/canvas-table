import Layer from "../layers/Layer";
import {createElement} from "../utils/util";

import { cellStyle } from "../meta";

export default class THead extends Layer {
    static create(tableEntry, tr) {
        const { commonProps } = tableEntry;

        return createElement(THead, {
            ...commonProps,
            style: {
                direction: 'horizontal',
                width: commonProps.tableWidth,
                height: cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, [tr]);
    }

    constructor(props) {
        super(props);
    }
}
