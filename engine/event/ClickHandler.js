import Event from "./Event";

export default class ClickHandler {
    constructor(stage) {
        this.eventX = 0;
        this.eventY = 0;
        this.stage = stage;
        this.$root = this.stage.$root;

        this.init();
    }

    init() {
        this.$root.addEventListener('click', e => {
            this.handler('click', e);
        });
    }

    handler(type, e) {
        const {left, top} = this.$root.getBoundingClientRect();
        this.eventX = e.clientX - left;
        this.eventY = e.clientY - top;

        const layerEvent = Event.create({
            type,
            x: this.eventX,
            y: this.eventY,
            stage: this.stage,
        });

        layerEvent.path.forEach(layer => {
            if (!layerEvent.isPropagationStopped) {
                layer.emit(type, layerEvent);
            }
        })
    }

}
