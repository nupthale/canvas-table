export default class TextRender {
    constructor(ctx, node) {
        this.ctx = ctx;
        this.node = node;
    }

    drawText() {
        const ctx = this.ctx;
        const node = this.node;
        const element = node.parent;

        const style = element.getComputedStyle();
        const layout = element.getLayout();

        const { width, height } = style;
        const { x: left, y: top } = layout;

        let x = 0;
        let y = top + height / 2;

        ctx.save();

        switch(style.textAlign) {
            case 'center':
                x = left + width / 2;
                ctx.textAlign = 'center';
                break;
            case 'right':
                x = left + width - style.padding.right;
                ctx.textAlign = 'right';
                break;
            case 'left':
            default:
                x = left + style.padding.left;
                ctx.textAlign = 'left';
                break;
        }

        if (style.color) {
            ctx.fillStyle = style.color;
        }
        debugger;

        const fontSize = style.fontSize;
        const fontFamily = style.fontFamily;
        const fontWeight = style.fontWeight;

        ctx.font = [fontWeight, fontSize, fontFamily].join(' ');
        ctx.fillText(node.textEllipsis, x, y + style.padding.top);
        // ctx.fillText(this.left, x, y + this.padding.top);
        ctx.restore();
    }

    render() {
        this.drawText();
    }
}
