import Element from "../../engine/dom/Element";

import {createElement} from "../../engine/utils/util";
import {drawRect} from "../../engine/utils/draw";

export default class Table extends Element {
    static create(stage, thead, tbody) {
        const { commonProps } = stage;

        return createElement(Table, {
            ...(commonProps),
            stage,
            style: {
                position: 'relative',
                zIndex: 1,
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

        this.stage = props.stage;
        this.thead = props.children[0];
        this.tbody = props.children[1];
        this.trs = this.tbody?.children.filter(child => child.tag === 'row');
    }

    postRender() {
        const { columns, selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        if (activeCol) {

            const { rowIndex, colIndex } = activeCol;

            this.trs.forEach(tr => {
                tr.children.forEach(td => {
                    // rowIndex
                    if (td.rowIndex === rowIndex && columns[td.colIndex].dataIndex === 'rowIndex') {
                        drawRect(
                            this.ctx,
                            td.left + td.width - 1,
                            td.top,
                            2,
                            td.height,
                            'rgba(69, 128, 230, 1)',
                        );
                    }
                })
            });

            // header

            const headerCol = this.thead.children[0].children.filter(col => colIndex === col.colIndex)[0];
            drawRect(
                this.ctx,
                headerCol.left,
                headerCol.top + headerCol.height - 1,
                headerCol.width,
                2,
                'rgba(69, 128, 230, 1)',
            );
        }
    }
}
