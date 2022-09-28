import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";

import ExpandIndicator from "./ExpandIndicator";

export default class SelectionRect extends Element {
    static create(props) {
        return createElement(SelectionRect, {
            ...props,
            style: {
                width: 0,
                height: 0,
                border: [],
                padding: [],
            },
        }, [
            ExpandIndicator.create(props)
        ])
    }

    constructor(props) {
        super(props);

        this.props = props;
        this.stage = props.stage;

        this.trs = props.trs || [];

        this.expandIndicator = this.children[0];
    }
}
