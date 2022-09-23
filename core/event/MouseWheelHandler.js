import LayerEvent from "./LayerEvent";

export default class MouseWheelHandler {
    constructor(stage) {
        this.stage = stage;
        this.$root = this.stage.$root;

        this.init();
    }

    init() {
        this.$root.addEventListener('mousewheel', e => {
            e.preventDefault();
            this.handler(e);
        });
    }

    handler(e) {
        const {left, top} = this.$root.getBoundingClientRect();
        this.eventX = e.clientX - left;
        this.eventY = e.clientY - top;

        const layerEvent = LayerEvent.create({
            type: 'mousewheel',
            x: this.eventX,
            y: this.eventY,
            originEvt: e,
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            stage: this.stage,
        });

        layerEvent.path.forEach(layer => {
            if (!layerEvent.isPropagationStopped) {
                layer.emit('mousewheel', layerEvent);
            }
        })
    }
}
