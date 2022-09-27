import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";

import { cellStyle, strokeColor, containerPadding, getTableViewWidth } from "../meta";
import Text from "../../engine/dom/Text";

const border = [
    { color: strokeColor, width: 1 },
    { color: strokeColor, width: 1 },
    { color: strokeColor, width: 1 },
    { color: strokeColor, width: 1 },
];

export default class TCol extends Element {
    static defaultColStyle = {
        display: 'inline-block',
        width: cellStyle.width,
        height: cellStyle.height,
        border,
        padding: [4, 8, 4, 8],
        color: "#666",
        backgroundColor: "#fff",
    }

    static createLayerText(commonProps, text, align) {
        return createElement(Text, {
            ...commonProps,
            text,
            style: {
                width: '100%',
                height: '100%',
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, []);
    }

    static getColProps(stage, props) {
        const { commonProps, columns } = stage;
        const column = columns[props.colIndex];

        return {
            ...commonProps,
            rowIndex: props.rowIndex,
            colIndex: props.colIndex,
            stage,
            fixed: props.fixed,
            style: {
                ...this.defaultColStyle,
                textAlign: column.align || 'left',
                // position: props.fixed ? 'sticky' : 'static',
                width: column.width || this.defaultColStyle.width,
                zIndex: props.fixed ? 1 : 0,
            }
        };
    }

    static create(stage, props) {
        const { commonProps, columns } = stage;
        const column = columns[props.colIndex];

        return createElement(TCol, this.getColProps(stage, props),
            [this.createLayerText(commonProps, props.text, column.dataIndex === 'rowIndex' ? 'center' : 'left')]
        )
    }

    constructor(props) {
        super(props);

        this.fixed = props.fixed;

        this.rowIndex = props.rowIndex;
        this.colIndex = props.colIndex;

        this.tag = 'col';
    }

    get left() {
        let value = 0;

        switch(this.fixed) {
            case 'left':
                const prevSiblings = this.prevSiblings;
                value = prevSiblings.reduce((acc, crt) => {
                    return acc + crt.width;
                }, 0) + containerPadding;

                break;
            case 'right':
                const postSiblings = this.postSiblings;

                const totalWidth = postSiblings.reduce((acc, crt) => acc + crt.width, 0);
                value = getTableViewWidth() + containerPadding - totalWidth - this.width;
                break;
            default:
                value = this.getStaticLeft();
                break;
        }

        return value;
    }
}
