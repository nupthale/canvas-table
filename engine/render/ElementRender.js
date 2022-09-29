import {drawLine, drawRect, shadowRect} from "../utils/draw";
import {containerPadding} from "../../core/meta";

export default class ElementRender {
    constructor(ctx, element) {
        this.ctx = ctx;
        this.element = element;
    }

    renderBox() {
        const element = this.element;
        const style = element.getComputedStyle();
        const layout = element.getLayout();

        const { backgroundColor, border, margin, width, height } = style;
        const { x, y } = layout;

        const startX = x + margin.left || 0;
        const startY = y + margin.top || 0;
        const rectWidth = width - margin.left || 0 - margin.right || 0;
        const rectHeight = height - margin.top || 0 - margin.bottom || 0;

        if (backgroundColor) {
            drawRect(this.ctx, startX, startY, rectWidth, rectHeight, backgroundColor);
        }

        const { top, right, bottom, left } = border;

        if (top) {
            drawLine(this.ctx, startX, startY, startX + rectWidth, startY, top.color, top.width);
        }

        if (right) {
            drawLine(this.ctx, startX + rectWidth, startY, startX + rectWidth, startY + rectHeight, right.color, right.width);
        }

        if (bottom) {
            drawLine(this.ctx, startX, startY + rectHeight, startX + rectWidth, startY + rectHeight, bottom.color, bottom.width);
        }

        if (left) {
            drawLine(this.ctx, startX, startY, startX, startY + rectHeight, left.color, left.width);
        }
    }

    renderShadow() {
        const element = this.element;
        const layout = element.getLayout();
        const style = element.getComputedStyle();
        const { x, y } = layout;

        const { boxShadow, width, height, margin, backgroundColor } = style;
        const startX = x + margin.left || 0;
        const startY = y + margin.top || 0;
        const rectWidth = width - margin.left || 0 - margin.right || 0;
        const rectHeight = height - margin.top || 0 - margin.bottom || 0;

        if (boxShadow) {
            const [shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor] = boxShadow;


            shadowRect({
                ctx: this.ctx,
                x: startX,
                y: startY,
                w: rectWidth,
                h: rectHeight,
                fillStyle: backgroundColor,
                shadowOffsetX,
                shadowOffsetY,
                shadowBlur,
                shadowColor,
            });
        }
    }

    render() {
        // 顺序, 先box-shadow, 再box
        this.renderShadow();

        this.renderBox();
    }
}
