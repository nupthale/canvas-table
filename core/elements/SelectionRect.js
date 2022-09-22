import Layer from "../layers/Layer";
import {createElement} from "../utils/util";
import {drawStrokeRect} from "../utils/draw";

import ExpandIndicator from "./ExpandIndicator";


export default class SelectionRect extends Layer {
    static create(props) {
        return createElement(SelectionRect, {
            ...props,
        }, [])
    }

    constructor(props) {
        super(props);

        this.props = props;
        this.stage = props.stage;
    }

    renderBox() {
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

        debugger;
        ExpandIndicator.create({
            ...this.props,
            left: left + width,
            top: top + height,
        }).render();
    }
}
