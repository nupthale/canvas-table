import TBody from "./TBody";
import {createElement} from "../../engine/utils/util";
import {cellStyle} from "../meta";
import SelectionRect from "./SelectionRect";

export default class SelectedTBody extends TBody {
    static create(stage, trs) {
        const { tableWidth, dataSource } = stage;

        // const selectionRect = SelectionRect.create({
        //     trs,
        // }, []);

        return createElement(SelectedTBody, {
            style: {
                width: tableWidth,
                height: dataSource.length * cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            },
        }, [...trs])
    }

    constructor(props) {
        super(props);

        this.stage = props.stage;
        this.trs = props.trs;
    }
}
