import Layer from "../layers/Layer";
import {createElement} from "../utils/util";

import { cellStyle, strokeColor, containerPadding, getTableViewWidth } from "../meta";
import LayerText from "../layers/LayerText";

export default class TCol extends Layer {
    static create(tableEntry, props) {
        const { commonProps } = tableEntry;

        const border = [
            { color: strokeColor },
            { color: strokeColor },
            { color: strokeColor },
            { color: strokeColor },
        ];

        return createElement(TCol, {
                ...commonProps,
                fixed: props.fixed,
                style: {
                    direction: 'horizontal',
                    width: cellStyle.width,
                    height: cellStyle.height,
                    border,
                    padding: [4, 8, 4, 8],
                    zIndex: props.fixed ? 1 : 0,
                    backgroundColor: "#fff",
                }
            },
            [createElement(LayerText, {
                ...commonProps,
                text: props.text,
                style: {
                    width: '100%',
                    height: '100%',
                    padding: [0, 0, 0, 0],
                    border: [],
                    color: "#666"
                }
            }, [])]
        )
    }

    constructor(props) {
        super(props);

        this.fixed = props.fixed;
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

    get top() {
        // switch(this.fixed) {
        //     case 'left':
        //         break;
        //     case 'right':
        //         break;
        //     default:
        //
        //         break;
        // }
        return this.getStaticTop();
    }
}
