import LayerEvent from "./LayerEvent";

export default class MouseMoveHandler {
    constructor(stage) {
        this.eventX = 0;
        this.eventY = 0;
        this.stage = stage;
        this.$root = this.stage.$root;

        this.lastMouseEnterEvt = null;
        this.lastMouseMoveEvt = null;
        this.lastMouseLeaveEvt = null;

        this.init();
    }

    init() {
        this.$root.addEventListener('mousemove', e => {
            this.handler(e);
        });
    }

    _handler(layerEvent, type) {
        layerEvent.path.forEach(layer => {
            if (!layerEvent.isPropagationStopped) {
                layer.emit(type, layerEvent);
            }
        })
    }

    mouseenter (layerEvent) {
        const lastPath = this.lastMouseEnterEvt?.path || [];
        const newPath = layerEvent.path || [];

        const newEvt = layerEvent.copy({
            type: 'mouseenter',
            path: newPath.filter(layer => !lastPath.includes(layer))
        });

        this._handler(newEvt, 'mouseenter');

        console.info('####newEvt', newEvt.path);

        this.lastMouseEnterEvt = layerEvent;
    }

    mousemove(layerEvent) {
        const lastPath = this.lastMouseMoveEvt?.path || [];
        const newPath = layerEvent.path || [];

        const newEvt = layerEvent.copy({
            type: 'mousemove',
            path: newPath.filter(layer => lastPath.includes(layer))
        });

        this._handler(newEvt, 'mousemove');

        this.lastMouseMoveEvt = layerEvent;
    }

    mouseleave(layerEvent) {
        const lastPath = this.lastMouseLeaveEvt?.path || [];
        const newPath = layerEvent.path || [];

        const newEvt = layerEvent.copy({
            type: 'mouseleave',
            path: lastPath.filter(layer => !newPath.includes(layer))
        });

        this._handler(newEvt, 'mouseleave');

        this.lastMouseLeaveEvt = layerEvent;
    }

    // 相对于原event的path, 新增的是mouseEnter, 去除的是mouseLeave,保持的是mousemove;
    handler(e) {
        const {left, top} = this.$root.getBoundingClientRect();
        this.eventX = e.clientX - left;
        this.eventY = e.clientY - top;

        const layerEvent = LayerEvent.create({
            x: this.eventX,
            y: this.eventY,
            stage: this.stage,
        });
        console.info('#layerEvent', layerEvent.path);

        this.mouseenter(layerEvent);
        this.mouseleave(layerEvent);
        this.mousemove(layerEvent);
    }

}
