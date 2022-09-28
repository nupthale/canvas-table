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
    constructor(options) {
        super();

        this.options = options;
        this.context = {};
        this.cancel = false;

        this.startTime = null;

        this.tick = this._tick.bind(this);

        this.initEvt(options);
    }

    initEvt(options) {
        if (options.onChange) {
            this.on('change', options.onChange);
        }

        if (options.onComplete) {
            this.on('complete', options.onComplete);
        }
    }

    _tick(ticktime) {
        const { duration, easing = defaultEasing, startValue, endValue } = this.options;
        const byValue = endValue - startValue;

        this.startTime = this.startTime || ticktime;
        const endTime = this.startTime + duration;

        const time = ticktime || +new Date();
        const currentTime = time > endTime ? duration : time - this.startTime;

        if (this.cancel) {
            return;
        }

        if (time > endTime) {
            this.context.currentValue = endValue;

            this.emit('complete', this.context.currentValue);
            this.emit('change', this.context.currentValue);
        } else {
            this.context.currentValue = easing(currentTime, startValue, byValue, duration);

            this.emit('change', this.context.currentValue);
            this.raf(this.tick);
        }
    }

    raf(tick) {
        requestAnimationFrame(tick);
    }

    start() {
        const {
            delay = 0,
        } = this.options;

        if (delay > 0) {
            setTimeout(() => {
                this.raf(this.tick);
            }, delay);
        } else {
            this.raf(this.tick);
        }
    }
}
