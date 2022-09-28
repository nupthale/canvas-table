import Eventful from "../event/Eventful";

const defaultEasing = (t, b, c, d) =>
    -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;

// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
// 代码copy from fabric的utils/animate文件
/**
 * new Animation({
 *     startValue: 1,
 *     endValue: 10,
 *     onChange(crtValue) {
 *         canvas.requestToPaint();
 *     }
 * });
 */
export default class Animation extends Eventful {
    constructor(props) {
        super(props);

        this.options = props.options;
        this.context = {};
        this.cancel = false;

        this.startTime = null;

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

    tick(ticktime) {
        const { duration, easing = defaultEasing, startValue, endValue } = this.options;
        const byValue = endValue - startValue;

        this.startTime = this.startTime || ticktime;
        const endTime = this.startTime + duration;

        const time = ticktime || +new Date();
        const currentTime = time > endTime ? duration : time - this.startTime;

        this.context.currentValue = easing(currentTime, this.startTime, byValue, duration);

        if (this.cancel) {
            return;
        }

        if (time > endTime) {
            this.context.currentValue = endValue;

            this.emit('complete', this.context.currentValue);
        } else {
            this.emit('change', this.context.currentValue);
            this.raf(this.tick);
        }
    }

    raf(tick) {
        requestAnimationFrame(tick);
    }

    start() {
        const {
            startValue = 0,
            delay = 0,
        } = this.options;

        this.context = {
            ...options,
            currentValue: startValue,
            completionRate: 0,
            durationRate: 0,
        };

        if (delay > 0) {
            setTimeout(() => {
                this.raf(this.tick);
            }, delay);
        } else {
            this.raf(this.tick);
        }
    }
}
