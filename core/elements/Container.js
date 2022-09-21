import Layer from "../layers/Layer";
import {createElement} from "../utils/util";
import {clipRect, shadowRect} from "../utils/draw";
import {containerPadding, getTableViewWidth, getTableViewHeight} from "../meta";

export default class Container extends Layer {
    static create(tableEntry, table) {
        return createElement(Container, {
            ctx: tableEntry.ctx,
            style: {
                width: tableEntry.tableWidth + containerPadding * 2,
                height: tableEntry.tableHeight + containerPadding * 2,
                border: [],
                padding: [containerPadding, containerPadding, containerPadding, containerPadding],
            },
            scroller: tableEntry.scroller,
        }, [table])
    }

    constructor(props) {
        super(props);

        this.ctx = props.ctx;
        this.children = props.children || [];
    }

    renderSelf() {
        const width = getTableViewWidth();
        const height = getTableViewHeight();
        debugger;

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
