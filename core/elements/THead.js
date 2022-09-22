import Layer from "../layers/Layer";
import {createElement} from "../utils/util";
import {shadowRect} from "../utils/draw";

import { cellStyle, containerPadding } from "../meta";

export default class THead extends Layer {
    static create(stage, tr) {
        const { commonProps, fixedHeader } = stage;

        return createElement(THead, {
            ...commonProps,
            fixedHeader,
            style: {
                direction: 'horizontal',
                width: commonProps.tableWidth,
                height: cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
                zIndex: 3,
            }
        }, [tr]);
    }

    constructor(props) {
        super(props);
        this.fixedHeader = props.fixedHeader;
    }

    get top() {
        if (this.fixedHeader) {
            return containerPadding;
        }

        return this.getStaticTop();
    }

    preRender() {
        if (this.fixedHeader) {
            shadowRect({
                ctx: this.ctx,
                x: containerPadding,
                y: containerPadding,
                w: this.width,
                h: this.height,
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                shadowBlur: 20,
                shadowColor: '#e8ebed',
            });
        }
    }
}

