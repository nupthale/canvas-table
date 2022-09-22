import TRow from "./TRow";
import {createElement} from "../utils/util";
import {drawStrokeRect} from "../utils/draw";

export default class SelectedTRow extends TRow {
    static create(stage, tds, rowIndex) {
        return createElement(SelectedTRow, this.getDefaultProps(stage, rowIndex), tds)
    }

    constructor(props) {
        super(props);
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

    drawSelection() {
        const { selectionManager, ctx } = this.stage;
        const { activeCol } = selectionManager;

        const { left, top, width, height } = activeCol;

        drawStrokeRect(
            ctx,
            left,
            top,
            width,
            height,
            2,
            'rgba(69, 128, 230, 1)',
            4,
        );
    }

    drawCenterSelection() {
        const { selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        if (activeCol && !activeCol.fixed) {
            this.drawSelection();
        }
    }

    drawFixedSelection() {
        const { selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        if (activeCol && activeCol.fixed) {
            this.drawSelection();
        }
    }
}
