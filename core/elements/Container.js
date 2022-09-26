import Layer from "../layers/Layer";
import {createElement} from "../utils/util";
import {shadowRect} from "../utils/draw";
import {containerPadding, getTableViewWidth, getTableViewHeight, width, height} from "../meta";

import ScrollLayer from "../layers/ScrollLayer";

export default class Container extends Layer {
    static create(stage, table) {
        const scroller = createElement(ScrollLayer, {
            ctx: stage.ctx,
            stage,
            scrollWidth: stage.tableWidth,
            scrollHeight: stage.tableHeight,
            style: {
                width: getTableViewWidth(),
                height: getTableViewHeight(),
                padding: [],
                border: [],
            }
        }, [table]);

        return createElement(Container, {
            ctx: stage.ctx,
            stage,
            style: {
                width,
                height,
                border: [],
                padding: [containerPadding, containerPadding, containerPadding, containerPadding],
            },
            scroller: stage.scroller,
        }, [scroller])
    }

    constructor(props) {
        super(props);

        this.ctx = props.ctx;
        this.stage = props.stage;
        this.children = props.children || [];
    }

    renderSelf() {
        const width = getTableViewWidth();
        const height = getTableViewHeight();

        shadowRect({
            ctx: this.ctx,
            x: containerPadding,
            y: containerPadding,
            w: width,
            h: height,
        });
    }
}
