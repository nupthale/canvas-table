import Node from "./Node";
import {createElement, isInView} from "../utils/util";

import Style from "../style/Style";
import LayoutFactory from "../layout/LayoutFactory";

// HTML Element
export default class Element extends Node {
    static create(ctx, props, children) {
        return createElement(Element, {
            ctx,
            ...props,
        }, children);
    }

    constructor(props) {
        super(props);

        this.id = props.id;
        this.props = props;

        this.style = null;
        this._layout = null;
    }

    doLayout() {
        const style = new Style(this, this.props.style);
        // 支持node.style.opacity = 0.3的写法
        this.style = new Proxy(style, {
            set: (instance, property, value) => {
                instance.update({
                    [property]: value,
                });

                return true;
            },
            get: (instance, property) => {
                return instance[property];
            },
        });

        this._layout = LayoutFactory.make(this);

        this.children.forEach(child => {
            if (!child.isTextNode && child.doLayout) {
                child.doLayout();
            }
        });

        return this;
    }

    getComputedStyle() {
        return this.style.computedStyle;
    }

    getLayout() {
        return this._layout;
    }

    isHit(x, y) {
        const layout = this._layout;
        const computedStyle = this.getComputedStyle();

        // 鼠标点击的x， y，是否是当前的layer
        return (
            isInView(this) &&
            (x > layout.x && x < layout.x + computedStyle.width) &&
            (y > layout.y && y < layout.y + computedStyle.height)
        );
    }
}
