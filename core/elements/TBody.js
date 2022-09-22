import Layer from "../layers/Layer";
import {createElement} from "../utils/util";

import { cellStyle } from "../meta";

export default class TBody extends Layer {
    static create(stage, trs) {
        const { commonProps, dataSource } = stage;

        return createElement(TBody, {
            ...commonProps,
            style: {
                direction: 'vertical',
                width: commonProps.tableWidth,
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
