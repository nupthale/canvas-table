import TRow from "./TRow";
import {createElement} from "../utils/util";

import SelectionRect from "./SelectionRect";
import ExpandIndicator from './ExpandIndicator';

export default class SelectedTRow extends TRow {
    static create(stage, tds, rowIndex) {
        return createElement(SelectedTRow, this.getDefaultProps(stage, rowIndex), tds)
    }

    constructor(props) {
        super(props);

        this.props = props;
    }

    renderCenter() {
        this.clipCenter(() => {
            this.sortAndRender(this.centerCols);

            this.drawCenterSelection();
        });
    }

    renderChildren() {
        this.renderCenter();

        this.renderFixedLeft();
        this.renderFixedRight();

        this.drawFixedSelection();
    }



    drawCenterSelection() {
        const { selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        if (activeCol && !activeCol.fixed) {
            SelectionRect.create(this.props).render();
        }
    }

    drawFixedSelection() {
        const { selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        if (activeCol && activeCol.fixed) {
            SelectionRect.create(this.props).render();
        }
    }
}
