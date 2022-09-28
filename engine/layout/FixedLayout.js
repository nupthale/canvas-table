import LayoutBase from './LayoutBase';

export default class FixedLayout extends LayoutBase {
    constructor(element) {
        super(element);
    }

    layoutX(_parentX, elementStyle) {
        return elementStyle.left;
    }

    layoutY(_parentY, elementStyle) {
        return elementStyle.top;
    }
}

