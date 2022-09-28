import Eventful from "../event/Eventful";

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
export default class Tween extends Eventful {
    constructor(props) {
        super(props);

        this.timeScale = props.timeScale || 1;

        this.duration = 0;

        this.position = 0;

        this._next = null;
        this._prev = null;
        this._parent = null;

        this.initEvt(props);
    }

    initEvt(props) {
        if (props.onChange) {
            this.on('change', props.onChange);
        }

        if (props.onComplete) {
            this.on('complete', props.onComplete);
        }
    }

    to(props, duration, ease) {
        if (duration === null || duration < 0) {
            duration = 0;
        }


    }
}
