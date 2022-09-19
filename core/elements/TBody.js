import Layer from "../layers/Layer";

export default class TBody extends Layer {
    constructor(props) {
        super({
            ...props,
            style: {
                ...(props.style),
                direction: 'column',
            }
        });
    }
}
