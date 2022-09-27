export default class LayoutBase {
    constructor(element) {
        this.x = 0;
        this.y = 0;

        this.element = element;

        this.layout();
    }

    layout() {
        const element = this.element;
        const elementStyle = element.getComputedStyle();

        const parent = element.parent;
        if (!parent) {
            return;
        }

        const parentLayout = parent.getLayout();
        const parentStyle = parent.getComputedStyle();

        const parentMarginLeft = parentStyle.margin?.left || 0;
        const parentBorderLeft = parentStyle.border.left?.width || 0;
        const parentPaddingLeft = parentStyle.padding.left || 0;
        const parentX = parent ? parentLayout.x + parentMarginLeft + parentBorderLeft + parentPaddingLeft : 0;


        const parentMarginTop = parentStyle.margin.top || 0;
        const parentBorderTop = parentStyle.border.top?.width || 0;
        const parentPaddingTop = parentStyle.padding.top || 0;
        const parentY = parent ? parentLayout.y + parentMarginTop + parentBorderTop + parentPaddingTop : 0;


        this.x = this.layoutX(parentX, elementStyle);
        this.y = this.layoutY(parentY, elementStyle);
    }

    layoutX(parentX, elementStyle) {}

    layoutY(parentY, elementStyle) {}
}
