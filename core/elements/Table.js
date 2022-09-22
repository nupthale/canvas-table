import Layer from "../layers/Layer";

import {createElement} from "../utils/util";

export default class Table extends Layer {
    static create(stage, thead, tbody) {
        const { commonProps } = stage;

        return createElement(Table, {
            ...(commonProps),
            style: {
                direction: 'vertical',
                width: commonProps.tableWidth,
                height: commonProps.tableHeight,
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