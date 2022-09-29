import LayoutBase from './LayoutBase';

import {getPreSiblingWidth, getPreSiblingHeight} from "./util";

export default class StaticLayout extends LayoutBase {
    constructor(element) {
        super(element);
    }

    layoutX(parentX, elementStyle) {
        const element = this.element;
        const parent = element.parent;

        if (elementStyle.display === 'block') {
            return parentX;
        }

        // 暂时不考虑自动换行
        return parentX + getPreSiblingWidth(element);
    }

    layoutY(parentY, elementStyle) {
        const element = this.element;
        const parent = element.parent;

        if (elementStyle.display !== 'block') {
            return parentY;
        }

        return parentY + getPreSiblingHeight(element);
    }
}

