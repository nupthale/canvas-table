import Style from "./Style";
import {createElement} from "../utils/util";


export default class Layer extends Style {
    static create(ctx, props, children) {
        return createElement(Layer, {
            ctx,
            ...props,
        }, children);
    }

    constructor(props) {
        super(props);
    }
}
