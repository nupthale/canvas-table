export const percentCalc = (number, parentNumber) => {
    if (typeof number === 'string') {
        if (/^\d{1,2}%$/.test(number)) {
            return parseInt(number.substring(0, -1)) * 0.01 * parentNumber()
        } else {
            return parentNumber()
        }
    } else if (typeof number === 'number') {
        return number
    } else {
        return parentNumber()
    }
};

export const isInView = (element) => {
    const style = element.getComputedStyle();
    const layout = element.getLayout();

    const isHorizontalInView = (layout.x + style.width > 0 && layout.x < element.props.style.width / PIXEL_RATIO);
    const isVerticalInView = (layout.y + style.height > 0 && layout.y < element.props.style.height / PIXEL_RATIO);

    return isHorizontalInView && isVerticalInView;
}

export const isInBox = (targetElement, element) => {
    const style = element.getComputedStyle();
    const layout = element.getLayout();

    const targetStyle = targetElement.getComputedStyle();
    const targetLayout = targetElement.getLayout();

    const isHorizontalInView = (layout.x + style.width > targetLayout.x && layout.x < targetLayout.x + targetStyle.width);
    const isVerticalInView = (layout.y + style.height > targetLayout.y && layout.y < targetLayout.y + targetStyle.height);

    return isHorizontalInView && isVerticalInView;
}

export const createElement = (Constructor, props, children) => {
    return new Constructor({
        ...props,
        children,
    });
}

export const PIXEL_RATIO = (() => {
    if (typeof window !== 'undefined') {
        const ctx = document.createElement('canvas').getContext('2d'),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx['webkitBackingStorePixelRatio'] ||
                ctx['mozBackingStorePixelRatio'] ||
                ctx['msBackingStorePixelRatio'] ||
                ctx['oBackingStorePixelRatio'] ||
                ctx['backingStorePixelRatio'] || 1;

        const ratio = dpr / bsr;
        return ratio < 1 ? 1 : ratio;
    }

    return 1;
})();

let _scrollbarWidth = 0;

export const getScrollbarWidth = () => {
    if (typeof window !== 'undefined') {
        if (_scrollbarWidth > 0) {
            return _scrollbarWidth;
        }


        // Creating invisible container
        const outer = document.createElement('div');
        // outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);

        _scrollbarWidth = scrollbarWidth;
        return scrollbarWidth;
    }

    return 0;
};
