import Eventful from "../event/Eventful";


export default class Tween extends Eventful {
    constructor(props) {
        super(props);

        this.ignoreGlobalPause = props.ignoreGlobalPause || false;

        this.loop = props.loop === true ? -1 : props.loop || 0;

        this.useTicks = props.useTicks || false;

        this.reserved = props.reserved || false;

        this.bounce = props.bounce || false;

        this.timeScale = props.timeScale || 1;

        this.duration = 0;

        this.position = 0;

        this.rawPosition = -1;

        this._paused = true;
        this._next = null;
        this._prev = null;
        this._parent = null;
        this._labels = null;
        this._labelList = null;

        this._status = -1;
        this._lastTick = 0;

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

    set paused(value) {
        this._paused = value;
    }

    get paused() {
        return this._paused;
    }

    get currentLabel() {
        const labels = this.getLabels();
        const pos = this.position;
        let i = 0;

        for (let l = labels.length; i < l; i++) {
            if (pos < labels[i].position) {
                break;
            }
        }
        return (i === 0) ? null : labels[i - 1].label;
    }

    getLabels() {
        let list = this._labelList;

        if (list) {
            return list;
        }

        list = this._labelList = [];
        const labels = this._labels;
        for (let n in labels) {
            list.push({ label: n, position: labels[n] });
        }
        list.sort((a, b) => a.position - b.position);
        return list;
    }

    setPosition(rawPosition, ignoreActions, jump, callback) {
        const duration = this.duration;
        const loopCount = this.loop;
        const prevRawPosition = this.rawPosition;

        let loop = 0;
        let t = 0;
        let end = false;

        if (rawPosition < 0) {
            rawPosition = 0;
        }

        if (duration === 0) {
            end = true;
            if (prevRawPosition !== -1) {
                return end;
            }
        } else {
            loop = rawPosition/duration;
            t = rawPosition - loop * d;
            end = loopCount !== -1 && rawPosition >= loopCount * d + d;
            if (end) {
                // rawPosition = t=d * loop =
            }
        }

    }
}
