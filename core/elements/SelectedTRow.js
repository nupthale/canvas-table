import TRow from "./TRow";
import {createElement, isInBox} from "../utils/util";

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

    sortAndRender(children, clipCenterBox) {
        // 必须clone， 要不然siblings的顺序也被sort了
        const sortedLayer = [...(children || [])].sort((prev, next) => (prev.zIndex || 0) - (next.zIndex || 0));

        sortedLayer.forEach(child => {
            if (!clipCenterBox) {
                child.render();
            } else {
                if (isInBox(clipCenterBox, child)) {
                    child.render();
                }
            }
        });
    }

    renderCenter() {
        this.clipCenter((clipCenterBox) => {


            this.sortAndRender(this.centerCols, clipCenterBox);

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
