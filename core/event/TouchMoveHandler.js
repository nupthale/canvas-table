import LayerEvent from "./LayerEvent";

export default class TouchMoveHandler {
    constructor(stage) {
        this.stage = stage;
        this.$root = this.stage.$root;

        this.touchStartEvt = null;

        this.init();
    }

    init() {
        this.$root.addEventListener('touchstart', e => {
            this.touchStartHandler(e);
        });

        this.$root.addEventListener('touchmove', e => {
            this.touchMoveHandler(e);
        });

        this.$root.addEventListener('touchend', e => {
            this.touchEndHandler(e);
        });
    }

    touchStartHandler(e) {
        const {left, top} = this.$root.getBoundingClientRect();
        this.eventX = e.clientX - left;
        this.eventY = e.clientY - top;

        this.touchStartEvt = LayerEvent.create({
            type: 'touchstart',
            x: this.eventX,
            y: this.eventY,
            originEvt: e,
            stage: this.stage,
        });

        this.touchStartEvt.path.forEach(layer => {
            if (!this.touchStartEvt.isPropagationStopped) {
                layer.emit('touchstart', this.touchStartEvt);
            }
        });
    }

    touchMoveHandler(e) {
        if (!this.touchStartEvt) {
            return;
        }

        const {left, top} = this.$root.getBoundingClientRect();
        this.eventX = e.clientX - left;
        this.eventY = e.clientY - top;

        const layerEvt = this.touchStartEvt.copy({
            type: 'touchmove',
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            originEvt: e,
        });

        layerEvt.path.forEach(layer => {
            if (!layerEvt.isPropagationStopped) {
                layer.emit('touchmove', layerEvt);
            }
        })
    }

    touchEndHandler(e) {
        if (!this.touchStartEvt) {
            return;
        }

        const {left, top} = this.$root.getBoundingClientRect();
        this.eventX = e.clientX - left;
        this.eventY = e.clientY - top;

        const layerEvt = this.touchStartEvt.copy({
            type: 'touchend',
            originEvt: e,
        });

        layerEvt.path.forEach(layer => {
            if (!layerEvt.isPropagationStopped) {
                layer.emit('touchend', layerEvt);
            }
        });

        this.touchStartEvt = null;
    }
}
