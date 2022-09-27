import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";
import {shadowRect} from "../../engine/utils/draw";
import {containerPadding, getTableViewWidth, getTableViewHeight, width, height} from "../meta";

import Scrollable from "../../engine/dom/Scrollable";

export default class Container extends Element {
    static create(stage, table) {
        const scrollable = createElement(Scrollable, {
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
        }, [scrollable])
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
