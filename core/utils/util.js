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

export const isInView = (layer) => {
    const isHorizontalInView = (layer.left + layer.width > 0 && layer.left < layer.ctx.canvas.width);
    const isVerticalInView = (layer.top + layer.height > 0 && layer.top < layer.ctx.canvas.height);

    return isHorizontalInView || isVerticalInView;
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
