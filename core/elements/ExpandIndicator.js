import Element from "../../engine/dom/Element";
import {createElement} from "../../engine/utils/util";

const border = [
    { color: '#4580e6' },
    { color: '#4580e6' },
    { color: '#4580e6' },
    { color: '#4580e6' },
];

export default class ExpandIndicator extends Element {
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
        this.stage = props.stage;


        this.tag = 'expandIndicator';

        this.initEvent();
    }

    setPos(left, top) {
        this._left = left - 5;
        this._top = top - 5;
    }


    get left() {
        return this._left;
    }

    get top() {
        return this._top;
    }

    initEvent() {
        this.on('mouseenter', () => {
            console.info('mouseenter:', this.stage);
            // this.stage.$root.style.cursor = 'crosshair';
        });

        this.on('mouseleave', () => {
            // this.stage.$root.style.cursor = 'cell';
        })
    }
}

