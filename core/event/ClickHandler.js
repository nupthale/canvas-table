import LayerEvent from "./LayerEvent";


export default class ClickHandler {
    constructor(tableEntry) {
        this.eventX = 0;
        this.eventY = 0;
        this.tableEntry = tableEntry;
        this.$root = this.tableEntry.$root;

        this.init();
    }

    init() {
        this.$root.addEventListener('click', e => {
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
            tableEntry: this.tableEntry,
        });

        layerEvent.path.forEach(layer => {
            if (!layerEvent.isPropagationStopped) {
                layer.emit(type, layerEvent);
            }
        })
    }

}
