export const shouldClipCtx = (element) => {
    const style = element.getComputedStyle();

    return style.overflow !== 'visible';
}
