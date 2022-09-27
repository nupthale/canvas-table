import LayoutBase from './LayoutBase';

import {getPreSiblingWidth, getPreSiblingHeight} from "./util";

export default class StaticLayout extends LayoutBase {
    constructor(element) {
        super(element);
    }

    layoutX(parentX, elementStyle) {
        const element = this.element;
        const parent = element.parent;
        const parentScrollLeft = parent?.scrollLeft || 0;


        if (elementStyle.display === 'block') {
            return parentX - parentScrollLeft;
        }

        // 暂时不考虑自动换行
        return parentX + getPreSiblingWidth(element) - parentScrollLeft;
    }

    layoutY(parentY, elementStyle) {
        const element = this.element;
        const parent = element.parent;

        const parentScrollTop = parent?.scrollTop || 0;

        if (elementStyle.display !== 'block') {
            return parentY - parentScrollTop;
        }

        return parentY + getPreSiblingHeight(element) - parentScrollTop;
    }
}

