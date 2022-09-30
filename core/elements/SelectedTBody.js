import TBody from "./TBody";
import {createElement} from "../../engine/utils/util";
import {cellStyle} from "../meta";
import SelectionRect from "./SelectionRect";
import SelectedTCol from "./SelectedTCol";
import SelectedTRow from "./SelectedTRow";
import Element from "../../engine/dom/Element";

export default class SelectedTBody extends TBody {
    static create(stage) {
        const { tableWidth, dataSource, columns } = stage;

        // const selectionRect = SelectionRect.create({
        //     trs,
        // }, []);

        const trs = dataSource.map((row, rowIndex) => {
            const cols = columns.map((col, colIndex) => SelectedTCol.create(stage, {
                text: row[col.dataIndex],
                fixed: col.fixed,
                rowIndex: rowIndex + 1,
                colIndex,
            }));

            return SelectedTRow.create(this, cols, rowIndex + 1);
        });

        const fixedLeftTrs = dataSource.map((row, rowIndex) => {
           const cols = columns
               .filter(col => col.fixed === 'left')
               .map((col, colIndex) => SelectedTCol.create(stage, {
                   text: row[col.dataIndex],
                   fixed: col.fixed,
                   rowIndex: rowIndex + 1,
                   colIndex,
               }));
           return SelectedTRow.create(this, cols, rowIndex + 1);
        });

        return createElement(SelectedTBody, {
            style: {
                width: tableWidth,
                height: dataSource.length * cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
                position: 'static',
            },
        }, [
            // createElement(Element, {
            //     style: {
            //         position: 'sticky',
            //     },
            // }, [
            //     ...fixedLeftTrs,
            // ]),
            // createElement(Element, {
            //   style: {
            //       position: 'sticky',
            //       left: 50,
            //       width: 100,
            //       height: 100,
            //       backgroundColor: '#ccc',
            //   },
            // }, []),
            createElement(Element, {
                style: {
                    position: 'static',
                },
            }, [
                ...trs,
            ]),
        ]);
    }

    constructor(props) {
        super(props);

        this.stage = props.stage;
        this.trs = props.trs;
    }
}
