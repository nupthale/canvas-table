import LayoutBase from './LayoutBase';
import {isPositionedNode} from "./util";

// @todo
export default class StickyLayout extends LayoutBase {
    constructor(element) {
        super(element);

        this.positionedParent = null;
    }

    getPositionedParent() {
        if (this.positionedParent) {
            return this.positionedParent;
        }

        let node = this.element.parent;
        while(node) {
            if (isPositionedNode(node)) {
                this.positionedParent = node;
                break;
            }
        }

        return this.positionedParent;
    }

    layoutX(parentX, elementStyle) {
        const parent = this.getPositionedParent();

        const parentScrollLeft = parent?.scrollLeft || 0;
        const parentLayout = parent.getLayout();

        // console.info(parent, parentLayout, parentScrollLeft);

        console.info(elementStyle.left, parentX);

        if (elementStyle.left && parentX < 0) {
            return elementStyle.left;
        }
        return parentX + elementStyle.left;
    }

    layoutY(parentY, elementStyle) {
        if (elementStyle.top && parentY < 0) {
            return elementStyle.top;
        }
        return parentY + elementStyle.top;
    }
}

