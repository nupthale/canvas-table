import TBody from "./TBody";
import {createElement} from "../../engine/utils/util";
import {cellStyle} from "../meta";
import SelectionRect from "./SelectionRect";

export default class SelectedTBody extends TBody {
    static create(stage, trs) {
        const { commonProps, dataSource } = stage;

        const selectionRect = SelectionRect.create({
            stage,
            ctx: stage.ctx,
            trs,
        }, []);

        return createElement(SelectedTBody, {
            stage,
            ...commonProps,
            style: {
                direction: 'vertical',
                width: commonProps.tableWidth,
                height: dataSource.length * cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            },
            selectionRect,
            trs,
        }, [...trs, selectionRect])
    }

    constructor(props) {
        super(props);

        this.stage = props.stage;
        this.trs = props.trs;
    }
}
