import {dfs} from "../utils/tree";

export default class LayerEvent {
    static create(props) {
        return new LayerEvent({
            ...props,
        });
    }

    constructor(props) {
        this.tableEntry = props.tableEntry;
        this.root = this.tableEntry.container;

        this.type = props.type;
        this.x = props.x;
        this.y = props.y;
        this.target = this.path[0] || null;


        this.isPropagationStopped = false;
    }

    stopPropagation() {
        this.isPropagationStopped = true;
    }

    copy(changedProps) {
        const { x, y, path, type } = this;

        return LayerEvent.create({
            x,
            y,
            path: [...(path || [])],
            type,
            ...changedProps,
        });
    }

    get path() {
        const { x, y } = this;
        const result = [];

        dfs(this.root, (layer) => {
            if (layer.isHit(x, y)) {
                result.push(layer);
                return true;
            }

            return false;
        });

        return result;
    }
}
