import Base from "./Base";

import {isInView, percentCalc} from "../utils/util";

// 布局相关样式 + 盒模型
export default class _StaticLayout_backup extends Base {
    constructor(props) {
        super(props);

        this.dom = dom;

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

    get preSiblingWidth() {
        if (this._preSiblingWidth !== undefined) {
            return this._preSiblingWidth;
        }

        let preSiblingsLeft = 0;
        // 水平
        for (let i = 0; i < this.siblings.length; i++) {
            const sibling = this.siblings[i];

            if (sibling === this) {
                break;
            }

            preSiblingsLeft += sibling.width;
        }

        this._preSiblingWidth = preSiblingsLeft;
        return this._preSiblingWidth;
    }

    getStaticLeft() {
        const parent = this.parent;

        const parentLeft = parent ? parent.left + parent.padding.left : 0;
        const parentScrollLeft = parent?.scrollLeft || 0;


        if (this.parent?.direction === 'vertical') {
            return parentLeft;
        }

        let preSiblingsLeft = this.preSiblingWidth;
        return parentLeft + preSiblingsLeft - parentScrollLeft;
    }

    // parent外部的top + parent内部的paddingTop + 内部居中方式计算的top
    get top() {
       return this.getStaticTop();
    }

    get preSiblingHeight() {
        if (this._preSiblingHeight !== undefined) {
            return this._preSiblingHeight;
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

        this._preSiblingHeight = preSiblingTop;
        return this._preSiblingHeight;
    }

    getStaticTop() {
        const parent = this.parent;
        let verticalTop = 0;

        const parentTop = parent ? parent.top + parent.padding?.top : 0;
        const parentScrollTop = parent?.scrollTop || 0;

        if (this.parent?.direction === 'horizontal') {
            return parentTop;
        }

        let preSiblingTop = this.preSiblingHeight;

        return parentTop + preSiblingTop - parentScrollTop;
    }


    get width() {
        // if (this._width !== undefined) {
        //     return this._width;
        // }

        const parentInnerWidth = this.parent ? this.parent.innerWidth : 0;
        this._width = percentCalc(this.style.width, () => this.parent ? parentInnerWidth : 0);
        return this._width;
    }

    get innerWidth() {
        // if (this._innerWidth !== undefined) {
        //     return this._innerWidth;
        // }

        this._innerWidth = this.width - this.padding.left - this.padding.right;
        return this._innerWidth;
    }

    get height() {
        // if (this._height !== undefined) {
        //     return this._height;
        // }

        const parentInnerHeight = this.parent ? this.parent.innerHeight : 0;
        this._height = percentCalc(this.style.height, () => this.parent ? parentInnerHeight : 0)
        return this._height;
    }

    get innerHeight() {
        // if (this._innerHeight !== undefined) {
        //     return this._innerHeight;
        // }

        this._innerHeight = this.height - this.padding.top - this.padding.bottom;
        return this._innerHeight;
    }

    get padding() {
        const [top = 0, right = 0, bottom = 0, left = 0] = this.style.padding;
        return { top, right, bottom, left };
    }

    get border () {
        const [top = 0, right = 0, bottom = 0, left = 0] = this.style.border;
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

    isInView() {
        return isInView(this);
    }

    getBoundingBox() {
        return {
            width: this.width,
            innerWidth: this.innerWidth,
            height: this.height,
            innerHeight: this.innerHeight,
            top: this.top,
            left: this.left,
        }
    }

    appendChild(layer) {
        this.children.push(layer);
    }
}
