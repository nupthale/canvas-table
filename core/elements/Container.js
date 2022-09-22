import Layer from "../layers/Layer";
import {createElement} from "../utils/util";
import {clipRect, shadowRect} from "../utils/draw";
import {containerPadding, getTableViewWidth, getTableViewHeight} from "../meta";

export default class Container extends Layer {
    static create(stage, table) {
        return createElement(Container, {
            ctx: stage.ctx,
            stage,
            style: {
                width: stage.tableWidth + containerPadding * 2,
                height: stage.tableHeight + containerPadding * 2,
                border: [],
                padding: [containerPadding, containerPadding, containerPadding, containerPadding],
            },
            scroller: stage.scroller,
        }, [table])
    }

    constructor(props) {
        super(props);

        this.ctx = props.ctx;
        this.stage = props.stage;
        this.children = props.children || [];

        this.initEvent();
    }

    initEvent() {
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

    renderChildren() {
        clipRect(
            this.ctx,
            containerPadding,
            containerPadding,
            getTableViewWidth(),
            getTableViewHeight(),
            () => {
                this.sortAndRender(this.children);
            }
        );
    }
}
