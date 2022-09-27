import LayoutBase from './LayoutBase';

// @todo
export default class StickyLayout extends LayoutBase {
    constructor(element) {
        super(element);
    }

    layoutX(parentX, elementStyle) {
        return parentX + elementStyle.left;
    }

    layoutY(parentY, elementStyle) {
        return parentY + elementStyle.top;
    }
}

