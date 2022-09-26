import TBody from "./TBody";
import {createElement} from "../utils/util";
import {cellStyle} from "../meta";
import SelectionRect from "./SelectionRect";


export default class SelectedTBody extends TBody {
    static create(stage, trs) {
        const { commonProps, dataSource } = stage;

        const selectionRect = SelectionRect.create({
            stage,
            ctx: stage.ctx,
        }, []);

        return createElement(SelectedTBody, {
            ...commonProps,
            style: {
                direction: 'vertical',
                width: commonProps.tableWidth,
                height: dataSource.length * cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            },
            selectionRect,
        }, [...trs, selectionRect])
    }

    constructor(props) {
        super(props);
    }
}
