import LayerEvent from "./LayerEvent";


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
            debugger;
            this.clickHandler('click', e);
        });
    }

    clickHandler(type, e) {
        const {left, top} = this.$root.getBoundingClientRect();
        this.eventX = e.clientX - left;
        this.eventY = e.clientY - top;

        const layerEvent = LayerEvent.create({
            type,
            x: this.eventX,
            y: this.eventY,
            stage: this.stage,
        });
        debugger;

        layerEvent.path.forEach(layer => {
            if (!layerEvent.isPropagationStopped) {
                layer.emit(type, layerEvent);
            }
        })
    }

}
