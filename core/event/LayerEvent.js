import {dfs} from "../utils/tree";

export default class LayerEvent {
    static create(props) {
        return new LayerEvent({
            ...props,
        });
    }

    constructor(props) {
        this.stage = props.stage;
        this.root = this.stage.container;

        this.type = props.type;
        this.x = props.x;
        this.y = props.y;

        this.originEvt = props.originEvt;

        // mousewheel 使用
        this.deltaX = props.deltaX;
        this.deltaY = props.deltaY;

        // this.target = this.path[0] || null;

        this._path = [];
        this.path = props.path;

        this.isPropagationStopped = false;
    }

    stopPropagation() {
        this.isPropagationStopped = true;
    }

    copy(changedProps) {
        const { x, y, path, type, stage } = this;

        return LayerEvent.create({
            x,
            y,
            path: [...(path || [])],
            type,
            stage,
            ...changedProps,
        });
    }

    get path() {
       return this._path;
    }

    set path(path) {
        if (path) {
            this._path = path;
        } else {
            const { x, y } = this;
            const result = [];

            dfs(this.root, (layer) => {
                if (layer.isHit(x, y)) {
                    result.push(layer);
                    return true;
                }

                return false;
            });

            this._path = result;
        }

    }
}
