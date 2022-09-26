import Layer from "../layers/Layer";
import {createElement} from "../utils/util";
import {drawStrokeRect} from "../utils/draw";

import ExpandIndicator from "./ExpandIndicator";


export default class SelectionRect extends Layer {
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

        this.test = true;

        this.props = props;
        this.stage = props.stage;

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

    renderChildren() {
        const { selectionManager, ctx } = this.stage;
        const { activeCol } = selectionManager;

        const { left, top, width, height } = activeCol;

        if (!activeCol) {
            return;
        }

        this.expandIndicator.setPos(left + width, top + height);

        this.expandIndicator.render();
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
