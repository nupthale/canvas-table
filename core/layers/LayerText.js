import Layer from "./Layer";

import {text2Ellipsis} from "../utils/draw";

export default class LayerText extends Layer {
    constructor(props) {
        super(props);

        this.text = props.text;
        this._textEllipsis = '';
    }

    get textEllipsis() {
        if (!this._textEllipsis) {
            this._textEllipsis = text2Ellipsis(this.ctx, this.text, this.innerWidth);
        }

        return this._textEllipsis;
    }

    get align() {
        return this.style.align;
    }

    drawText() {
        const ctx = this.ctx;

        let { left, top, width, height } = this;
        let x = 0;
        let y = top + height / 2;
        debugger;

        ctx.save();

        switch(this.align) {
            case 'center':
                x = left + width / 2;
                ctx.textAlign = 'center';
                break;
            case 'right':
                x = left + width - this.padding.right;
                ctx.textAlign = 'right';
                break;
            case 'left':
            default:
                x = left + this.padding.left;
                ctx.textAlign = 'left';
                break;
        }

        if (this.style.color) {
            ctx.fillStyle = this.style.color;
        }

        const fontSize = this.style.fontSize || this.defaultStyle.fontSize;
        const fontFamily = this.style.fontFamily || this.defaultStyle.fontFamily;
        const fontWeight = this.style.fontWeight || this.defaultStyle.fontWeight;

        ctx.font = [fontWeight, fontSize, fontFamily].join(' ');
        ctx.fillText(this._textEllipsis, x, y + this.padding.top);
        ctx.restore();
    }

    renderChildren() {
        this.drawText(this.textEllipsis);
    }
}
