import {text2Ellipsis} from "../utils/draw";

export default class TextRender {
    constructor(ctx, node, overflowParent) {
        this.ctx = ctx;
        this.node = node;

        this.overflowParent = overflowParent;

        this._textEllipsis = '';
    }


    getTextEllipsis() {
        if (!this._textEllipsis) {
            const element = this.node.parent;
            const contentWidth = element.style.getContentWidth();

            this._textEllipsis = text2Ellipsis(this.ctx, this.node.text, contentWidth);
        }

        return this._textEllipsis;
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
        let y = top;

        ctx.save();

        switch(style.textAlign) {
            case 'center':
                x = left + width / 2 - (this.overflowParent?.scrollLeft || 0);
                ctx.textAlign = 'center';
                break;
            case 'right':
                x = left + width - style.padding.right - (this.overflowParent?.scrollLeft || 0);
                ctx.textAlign = 'right';
                break;
            case 'left':
            default:
                x = left + style.padding.left - (this.overflowParent?.scrollLeft || 0);
                ctx.textAlign = 'left';
                break;
        }

        switch(style.verticalAlign) {
            case 'middle':
                y = top + height / 2 - (this.overflowParent?.scrollTop || 0);
                ctx.textBaseline = "middle";
                break;
            case 'bottom':
                y = top + height - (this.overflowParent?.scrollTop || 0);
                ctx.textBaseline = 'bottom';
                break;
            case 'top':
            default:
                y = top - (this.overflowParent?.scrollTop || 0);
                ctx.textBaseline = "top";
                break;
        }

        if (style.color) {
            ctx.fillStyle = style.color;
        }

        const fontSize = style.fontSize;
        const fontFamily = style.fontFamily || 'Roboto';
        const fontWeight = style.fontWeight || 500;

        ctx.font = [fontWeight, fontSize, fontFamily].join(' ');
        ctx.fillText(this.getTextEllipsis(), x, y);
        // ctx.fillText(this.left, x, y + this.padding.top);
        ctx.restore();
    }

    render() {
        this.drawText();
    }
}
