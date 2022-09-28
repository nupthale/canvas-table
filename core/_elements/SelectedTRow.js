import TRow from "./TRow";
import {createElement} from "../../engine/utils/util";

export default class SelectedTRow extends TRow {
    static create(stage, tds, rowIndex) {
        return createElement(SelectedTRow, {
            ...this.getDefaultProps(stage, rowIndex),
        }, [...tds])
    }

    constructor(props) {
        super(props);
    }
}
