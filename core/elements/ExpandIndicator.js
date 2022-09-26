import Layer from "../layers/Layer";
import {createElement} from "../utils/util";

const border = [
    { color: '#4580e6' },
    { color: '#4580e6' },
    { color: '#4580e6' },
    { color: '#4580e6' },
];

export default class ExpandIndicator extends Layer {
    static create(props) {
        return createElement(ExpandIndicator, {
            ...props,
            style: {
                width: 10,
                height: 10,
                border,
                backgroundColor: '#fff',
            },
        }, []);
    }

    constructor(props) {
        super(props);

        this._left = props.left - 5;
        this._top = props.top - 5;
        this.stage = props.stage;

        this.initEvent();
    }


    get left() {
        return this._left;
    }

    get top() {
        return this._top;
    }

    initEvent() {
        this.on('mouseenter', () => {
            debugger;
            this.stage.$root.style.cursor = 'drag';
        });
    }
}

