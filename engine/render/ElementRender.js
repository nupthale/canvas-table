import {drawLine, drawRect} from "../utils/draw";

export default class ElementRender {
    constructor(ctx, element) {
        this.ctx = ctx;
        this.element = element;
    }

    renderBox() {
        const element = this.element;
        const style = element.getComputedStyle();
        const layout = element.getLayout();

        const { backgroundColor, border, width, height } = style;
        const { x, y } = layout;

        if (backgroundColor) {
            drawRect(this.ctx, x, y, width, height, backgroundColor);
        }

        const { top, right, bottom, left } = border;

        if (top) {
            drawLine(this.ctx, x, y, x + width, top, top.color);
        }

        if (right) {
            drawLine(this.ctx, x + width, y, x + width, y + height, right.color);
        }

        if (bottom) {
            drawLine(this.ctx, x, y + height, x + width, y + height, bottom.color);
        }

        if (left) {
            drawLine(this.ctx, x, y, x, y + height, left.color);
        }
    }

    render() {
        // 顺序, 先box-shadow, 再box
        this.renderBox();
    }
}
