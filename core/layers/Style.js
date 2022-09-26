import StaticLayout from "./StaticLayout";

import {drawRect, drawLine} from "../utils/draw";

const defaultStyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 0,
    zIndex: 0,
    align: 'left',
    overflow: 'ellipsis',
    verticalAlign: 'middle',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
};

// 与布局相关的样式部分在Layout
// 与非布局相关的样式部分在Style
export default class Style extends StaticLayout {
    constructor(props) {
        super(props);

        this.style = props.style;
        this.defaultStyle = defaultStyle;
    }

    get zIndex() {
        return this.style?.zIndex;
    }

    clear() {
        const {left, top, height, width} = this;
        this.ctx.clearRect(left, top, width, height);
    }

    renderBox() {
        const { backgroundColor, border } = this.style;
        const { left, top, width, height } = this;

        if (backgroundColor) {
            drawRect(this.ctx, left, top, width, height, backgroundColor);
        }

        if (border?.length) {
            const [topB, rightB, bottomB, leftB] = border;

            if (topB) {
                drawLine(this.ctx, left, top, left + width, top, topB.color);
            }

            if (rightB) {
                drawLine(this.ctx, left + width, top, left + width, top + height, rightB.color);
            }

            if (bottomB) {
                drawLine(this.ctx, left, top + height, left + width, top + height, bottomB.color);
            }

            if (leftB) {
                drawLine(this.ctx, left, top, left, top + height, leftB.color);
            }
        }
    }

    renderSelf() {

    }

    preRender() {}

    postRender() {}

    sortAndRender(children) {
        // 必须clone， 要不然siblings的顺序也被sort了
        const sortedLayer = [...(children || [])].sort((prev, next) => (prev.zIndex || 0) - (next.zIndex || 0));

        sortedLayer.forEach(child => {
            child.render();
        });
    }

    renderChildren() {
        if (!this.children?.length) {
            return;
        }

        this.sortAndRender(this.children);
    }

    render() {
        if (this.isInView()) {
            // 画Box
            this.preRender();

            this.renderBox();
            this.renderSelf();
            // 画children
            this.renderChildren();

            this.postRender();
        }
    }
}
