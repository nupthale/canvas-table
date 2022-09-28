import Node from "./Node";

import {createElement} from "../utils/util";

export default class Text extends Node {
    static create(props) {
        return createElement(Text, {
            children: [],
            ...props,
        });
    }

    constructor(props) {
        super(props);

        this.text = props.text;
    }

    get isTextNode() {
        return true;
    }
}
