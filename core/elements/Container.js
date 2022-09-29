import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";
import {containerPadding, getTableViewWidth, getTableViewHeight, width, height} from "../meta";

import Scrollable from "../../engine/dom/Scrollable";

export default class Container extends Element {
    static create(tableEntry, table) {
        const scrollable = createElement(Scrollable, {
            scrollWidth: tableEntry.tableWidth,
            scrollHeight: tableEntry.tableHeight,
            onScroll: () => {
                tableEntry.stage.repaint();
            },
            style: {
                padding: [],
                border: [],
            }
        }, [table]);

        const container = createElement(Container, {
            style: {
                width,
                height,
                border: [],
                padding: [containerPadding, containerPadding, containerPadding, containerPadding],
            },
        }, [createElement(Element, {
            style: {
                boxShadow: [],
                border: [],
            }
        }, [scrollable])]);

        return container;
    }

    constructor(props) {
        super(props);

        this.ctx = props.ctx;
        this.stage = props.stage;
        this.children = props.children || [];
    }
}
