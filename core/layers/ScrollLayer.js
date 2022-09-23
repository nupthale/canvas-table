import Layer from "./Layer";

export default class ScrollLayer extends Layer {
    constructor(props) {
        super(props);

        this.scrollLeft = 0;
        this.scrollTop = 0;

        this.scrollWidth = props.scrollWidth;
        this.scrollHeight = props.scrollHeight;

        this.initEvent();
    }

    get maxScrollLeft() {
        return this.scrollWidth - this.width;
    }

    get maxScrollTop() {
        return this.scrollHeight - this.height;
    }

    initEvent() {
        this.on('mousewheel', (e) => {
            e.stopPropagation();
            console.info('####e', e.deltaX);
            this.scrollBy(e.deltaX, e.deltaY);
        });
    }

    scrollBy(deltaX, deltaY) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (this.scrollByX(deltaX)) {
                this.sortAndRender(this.children);
            }
        } else {
            if (this.scrollByY(deltaY)) {
                this.sortAndRender(this.children);
            }
        }
    }

    // @override
    sortAndRender(children) {
        this.ctx.save();

        // 必须clone， 要不然siblings的顺序也被sort了
        const sortedLayer = [...(children || [])].sort((prev, next) => (prev.zIndex || 0) - (next.zIndex || 0));

        // 清空内部
        this.ctx.clearRect(this.left, this.top, this.width, this.height);

        // clip
        this.ctx.rect(this.left, this.top, this.width, this.height);

        this.ctx.clip();

        console.info('###scroll', this.scrollLeft, this.scrollTop);

        sortedLayer.forEach(child => {
            child.render();
        });

        this.ctx.restore();
    }

    scrollByX(deltaX) {
        // 无需滚动
        if (this.scrollWidth <= this.width || deltaX === 0) {
            return false;
        }

        let shouldUpdate = false;
        const newScrollLeft = this.scrollLeft + deltaX;

        if (newScrollLeft < 0) {
            shouldUpdate = this.scrollLeft === 0;
            this.scrollLeft = 0;
        } else if (newScrollLeft > this.maxScrollLeft) {
            shouldUpdate = this.scrollLeft === this.maxScrollLeft;
            this.scrollLeft = this.maxScrollLeft;
        } else {
            shouldUpdate = true;
            this.scrollLeft = newScrollLeft;
        }

        return shouldUpdate;
    }

    scrollByY(deltaY) {
        // 无需滚动
        if (this.scrollHeight <= this.height || deltaY === 0) {
            return false;
        }

        let shouldUpdate = false;
        const newScrollTop = this.scrollTop + deltaY;

        if (newScrollTop < 0) {
            shouldUpdate = this.scrollTop === 0;
            this.scrollTop = 0;
        } else if (newScrollTop > this.maxScrollTop) {
            shouldUpdate = this.scrollTop === this.maxScrollTop;
            this.scrollTop = this.maxScrollTop;
        } else {
            shouldUpdate = true;
            this.scrollTop = newScrollTop;
        }

        return shouldUpdate;
    }
}
