import { isNil } from "lodash-es";

import {percentCalc} from "../utils/util";

import { getBorderWidth, getPaddingWidth, getMarginWidth, parseBorder, parsePadding, parseMargin } from "./util";

import {shouldClipCtx} from "../render/util";

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
    fontSize: '12px',
    fontFamily: '',
    fontWeight: 'normal',
};

// 使用margin-box模型， 宽度包含margin + border + padding + contentWidth
// paint前, 可能还需要重新new一次Style, 否则, 只更新了父级style, 子集的没继承
export default class Style {
    constructor(element, customStyle) {
        this.element = element;
        this.customStyle = customStyle;
        this.computedStyle = {};
        // 用于计算继承
        this.parentStyle = element.parent?.getComputedStyle();

        this.init(customStyle || {});

        this.overflowParent = null;
        this.initOverflowParent();
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

        computedStyle.opacity = this.inherit(computedStyle, 'opacity');
        computedStyle.fontSize = this.inherit(computedStyle, 'fontSize');
        computedStyle.fontWeight = this.inherit(computedStyle, 'fontWeight');
        computedStyle.fontFamily = this.inherit(computedStyle, 'fontFamily');

        this.computedStyle = computedStyle;
    }

    inherit(computedStyle, propKey) {
        const parentStyle = this.parentStyle;
        const value = computedStyle[propKey];
        const parentValue = parentStyle?.[propKey];

        if (isNil(value)) {
            if (!isNil(parentValue)) {
                return parentValue;
            }
        } else {
            return value;
        }
    }

    getContentWidth() {
        const border = this.computedStyle.border;
        const padding = this.computedStyle.padding;
        const margin = this.computedStyle.margin;

        const borderWidth = getBorderWidth(border, 'horizontal');
        const paddingWidth = getPaddingWidth(padding, 'horizontal');
        const marginWidth = getMarginWidth(margin, 'horizontal');

        return this.computedStyle.width - borderWidth - paddingWidth - marginWidth;
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

    // 找最近的有overflow的node
    initOverflowParent() {
        let node = this.element.parent;
        let parent = null;

        while(node) {
            if (shouldClipCtx(node)) {
                parent = node;
                break;
            }

            node = node.parent;
        }

        this.overflowParent = parent;
    }
}
