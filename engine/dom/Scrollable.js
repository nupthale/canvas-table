import Element from "./Element";

export default class Scrollable extends Element {
    constructor(props) {
        props.style.overflow = 'auto';

        super(props);

        this.scrollLeft = 0;
        this.scrollTop = 0;

        this.scrollWidth = props.scrollWidth;
        this.scrollHeight = props.scrollHeight;
        this.onScroll = props.onScroll;

        this.initEvent();
    }

    get width() {
        return this.getComputedStyle().width;
    }

    get height() {
        return this.getComputedStyle().height;
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
            this.scrollBy(e.deltaX, e.deltaY);
        });
    }

    scrollBy(deltaX, deltaY) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (this.scrollByX(deltaX)) {
                this.doLayout();

                this.onScroll?.();
            }
        } else {
            if (this.scrollByY(deltaY)) {
                this.doLayout();

                this.onScroll?.();
            }
        }
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
