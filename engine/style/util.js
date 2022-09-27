export const getBorderWidth = (border = [], direction = 'horizontal') => {
    if (direction === 'horizontal') {
        return border.left?.width || 0 + border.right?.width || 0;
    } else {
        return border.top?.width || 0 + border.bottom?.width || 0;
    }
}

export const getPaddingWidth = (padding = [], direction = 'horizontal') => {
    if (direction === 'horizontal') {
        return padding.left || 0 + padding.right || 0;
    } else {
        return padding.top || 0 + padding.bottom || 0;
    }
}

export const getMarginWidth = (margin = [], direction = 'horizontal') => {
    if (direction === 'horizontal') {
        return margin.left || 0 + margin.right || 0;
    } else {
        return margin.top || 0 + margin.bottom || 0;
    }
}

// [0, 0 , 0 ,0] => { left: 0, top: 0, right: 0, bottom: 0}
export const parsePadding = (padding) => {
    const [top = 0, right = 0, bottom = 0, left = 0] = padding || [];
    return {
        top,
        right,
        bottom,
        left,
    }
}

// [{ width: 0, color: red }, { width: 0, color: red }, { width: 0, color: red }, { width: 0, color: red }]
// => { left: { width: 0, color: red }, top: { width: 0, color: red }, right: { width: 0, color: red }, bottom: { width: 0, color: red } }
export const parseBorder = (border) => {
    const [top, right, bottom, left] = border || [];

    return {
        top,
        right,
        bottom,
        left,
    }
}

export const parseMargin = (margin) => {
    const [top = 0, right = 0, bottom = 0, left = 0] = margin || [];

    return {
        top,
        right,
        bottom,
        left,
    }
}
