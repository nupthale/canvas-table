import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";
import {drawRect, drawStrokeRect} from "../../engine/utils/draw";

import ExpandIndicator from "./ExpandIndicator";

export default class SelectionRect extends Element {
    static create(props) {
        return createElement(SelectionRect, {
            ...props,
            style: {
                width: 0,
                height: 0,
                border: [],
                padding: [],
            },
        }, [
            ExpandIndicator.create(props)
        ])
    }

    constructor(props) {
        super(props);

        this.props = props;
        this.stage = props.stage;

        this.trs = props.trs || [];

        this.expandIndicator = this.children[0];
    }

    renderBox() {
        const { selectionManager, ctx } = this.stage;
        const { activeCol } = selectionManager;

        const { left, top, width, height } = activeCol;

        if (!activeCol) {
            return;
        }

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

    preRender() {
        const { selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        const { left, top, width, height } = activeCol;

        if (!activeCol) {
            return;
        }

        this.expandIndicator.setPos(left + width, top + height);

        // this.expandIndicator.render();
    }

    isInView() {
        const { selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        return !!activeCol;
    }

    isFixedCol() {
        const { selectionManager } = this.stage;
        const { activeCol } = selectionManager;

        return !!activeCol?.fixed;
    }
}
