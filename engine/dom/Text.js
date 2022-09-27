import Node from "./Node";

import {text2Ellipsis} from "../utils/draw";
import {createElement} from "../utils/util";

export default class Text extends Node {
    static create(ctx, props) {
        return createElement(Text, {
            ctx,
            children: [],
            ...props,
        });
    }

    constructor(props) {
        super(props);

        this.text = props.text;
        this._textEllipsis = '';
    }

    get isTextNode() {
        return true;
    }

    get textEllipsis() {
        if (!this._textEllipsis) {
            const element = this.parent;
            const contentWidth = element.style.getContentWidth();

            this._textEllipsis = text2Ellipsis(this.ctx, this.text, contentWidth);
        }

        return this._textEllipsis;
    }
}
