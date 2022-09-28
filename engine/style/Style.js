import {percentCalc} from "../utils/util";

import { getBorderWidth, getPaddingWidth, getMarginWidth, parseBorder, parsePadding, parseMargin } from "./util";

const defaultStyle = {
    display: 'block',
    position: 'static',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
    border: [],
    zIndex: 'auto',
    textAlign: 'left',
    overflow: 'visible',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
};

// 使用margin-box模型， 宽度包含margin + border + padding + contentWidth
export default class Style {
    constructor(element, customStyle) {
        this.element = element;
        this.customStyle = customStyle;
        this.computedStyle = {}

        this.init(customStyle || {});
    }

    init(customStyle) {
        const computedStyle = {
            ...defaultStyle,
            ...this.customStyle,
            ...customStyle,
        };

        const parent = this.element.parent;

        computedStyle.padding = parsePadding(computedStyle.padding);
        computedStyle.border = parseBorder(computedStyle.border);
        computedStyle.margin = parseMargin(computedStyle.margin);


        computedStyle.width = percentCalc(computedStyle.width, () => parent ? parent.style.getContentWidth() : 0);
        computedStyle.height = percentCalc(computedStyle.height, () => parent ? parent.style.getContentHeight() : 0);

        this.computedStyle = computedStyle;
    }

    getContentWidth() {
        const border = this.computedStyle.border;
        const padding = this.computedStyle.padding;
        const margin = this.computedStyle.margin;

        return this.computedStyle.width - getBorderWidth(border, 'horizontal') - getPaddingWidth(padding, 'horizontal') - getMarginWidth(margin, 'horizontal');
    }

    getContentHeight() {
        const border = this.computedStyle.border;
        const padding = this.computedStyle.padding;
        const margin = this.computedStyle.margin;

        return this.computedStyle.height - getBorderWidth(border, 'vertical') - getPaddingWidth(padding, 'vertical') - getMarginWidth(margin, 'vertical');
    }

    update(customStyle) {
        this.init(customStyle);
    }
}
