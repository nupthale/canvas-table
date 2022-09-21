import Base from "./Base";

import {isInView, percentCalc} from "../utils/util";

// 布局相关样式 + 盒模型
export default class StaticLayout extends Base {
    constructor(props) {
        super(props);

        this.style = props.style;
    }

    get direction() {
        // horizontal、vertical
        return this.style.direction;
    }

    // parent外部的left + parent内部的paddingLeft + 前置兄弟$div的宽度
    get left() {
       return this.getStaticLeft();
    }

    getStaticLeft() {
        const parent = this.parent;

        const parentLeft = parent ? parent.left + parent.padding.left : 0;
        let preSiblingsLeft = 0;

        if (!this.parent) {
            return this.scroller.scrollLeft;
        }

        if (this.parent?.direction === 'vertical') {
            return parentLeft;
        }

        // 水平
        for (let i = 0; i < this.siblings.length; i++) {
            const sibling = this.siblings[i];

            if (sibling === this) {
                break;
            }

            preSiblingsLeft += sibling.width;
        }


        return parentLeft + preSiblingsLeft;
    }

    // parent外部的top + parent内部的paddingTop + 内部居中方式计算的top
    get top() {
       return this.getStaticTop();
    }

    getStaticTop() {
        const parent = this.parent;
        let verticalTop = 0;

        const parentTop = parent ? parent.top + parent.padding?.top : 0;

        if (!this.parent) {
            return this.scroller.scrollTop;
        }

        if (this.parent?.direction === 'horizontal') {
            return parentTop;
        }

        let preSiblingTop = 0;
        // 垂直
        for(let i = 0; i < this.siblings.length; i++) {
            const sibling = this.siblings[i];

            if (sibling === this) {
                break;
            }

            preSiblingTop += sibling.height;
        }

        return parentTop + preSiblingTop;
    }

    get width() {
        const parentInnerWidth = this.parent ? this.parent.innerWidth : 0;
        return percentCalc(this.style.width, () => this.parent ? parentInnerWidth : 0);
    }

    get innerWidth() {
        return this.width - this.padding.left - this.padding.right;
    }

    get height() {
        const parentInnerHeight = this.parent ? this.parent.innerHeight : 0;
        return percentCalc(this.style.height, () => this.parent ? parentInnerHeight : 0)
    }

    get innerHeight() {
        return this.height - this.padding.top - this.padding.bottom;
    }

    get padding() {
        const [top, right, bottom, left] = this.style.padding;
        return { top, right, bottom, left };
    }

    get border () {
        const [top, right, bottom, left] = this.style.border;
        return { top, right, bottom, left };
    }

    // 鼠标点击的x， y，是否是当前的layer
    isHit(x, y) {
        return (
            isInView(this) &&
            (x > this.left && x < this.left + this.width) &&
            (y > this.top && y < this.top + this.height)
        );
    }

    getLayoutBox() {
        return {
            width: this.width,
            innerWidth: this.innerWidth,
            height: this.height,
            innerHeight: this.innerHeight,
            top: this.top,
            left: this.left,
        }
    }
}
