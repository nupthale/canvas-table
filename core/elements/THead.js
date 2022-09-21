import Layer from "../layers/Layer";
import {createElement} from "../utils/util";

import { cellStyle, containerPadding } from "../meta";

export default class THead extends Layer {
    static create(tableEntry, tr) {
        const { commonProps, fixedHeader } = tableEntry;

        return createElement(THead, {
            ...commonProps,
            fixedHeader,
            style: {
                direction: 'horizontal',
                width: commonProps.tableWidth,
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

    get top() {
        if (this.fixedHeader) {
            return containerPadding;
        }

        return this.getStaticTop();
    }
}
