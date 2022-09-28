export const getPreSiblingWidth = (element) => {
    let preSiblingsLeft = 0;

    // 水平
    for (let i = 0; i < element.siblings.length; i++) {
        const sibling = element.siblings[i];

        if (sibling === element) {
            break;
        }

        preSiblingsLeft += sibling.getComputedStyle().width;
    }

    return preSiblingsLeft;
}

export const getPreSiblingHeight = (element) => {
    let preSiblingTop = 0;
    // 垂直
    for(let i = 0; i < element.siblings.length; i++) {
        const sibling = element.siblings[i];

        if (sibling === element) {
            break;
        }

        preSiblingTop += sibling.getComputedStyle().height;
    }

    return preSiblingTop;
}

export const isPositionedNode = (element) => {
    const style = element.getComputedStyle();

    return style.position !== 'static';
}
