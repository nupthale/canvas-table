import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";
import {containerPadding, getTableViewWidth, getTableViewHeight, width, height} from "../meta";

import Scrollable from "../../engine/dom/Scrollable";

export default class Container extends Element {
    static create(stage, table) {
        const scrollable = createElement(Scrollable, {
            scrollWidth: stage.tableWidth,
            scrollHeight: stage.tableHeight,
            onScroll: () => {
              stage.repaint();
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
                border: [{
                    width: 10,
                    color: 'red',
                }, {
                    width: 10,
                    color: 'red',
                }, {
                    width: 10,
                    color: 'red',
                }, {
                    width: 10,
                    color: 'red',
                }],
                padding: [containerPadding, containerPadding, containerPadding, containerPadding],
            },
        }, [createElement(Element, {
            style: {
                boxShadow: [],
                border: [{
                    width: 10,
                    color: 'blue',
                }, {
                    width: 10,
                    color: 'blue',
                }, {
                    width: 10,
                    color: 'blue',
                }, {
                    width: 10,
                    color: 'blue',
                }],
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
