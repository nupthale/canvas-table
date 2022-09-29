import {dfs} from "../utils/tree";
import {isInView} from "../utils/util";

export default class Event {
    static create(props) {
        return new Event({
            ...props,
        });
    }

    constructor(props) {
        this.stage = props.stage;
        this.root = this.stage.layoutTree;

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

        return Event.create({
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

            dfs(this.root, (node) => {
                if (!node.isTextNode && this.isHit(node, x, y)) {
                    result.push(node);
                    return true;
                }

                return false;
            });

            this._path = result;
        }

    }

    isHit(element, x, y) {
        const layout = element._layout;
        const computedStyle = element.getComputedStyle();

        // 鼠标点击的x， y，是否是当前的layer
        const result = (
            isInView(element, this.stage.ctx) &&
            (x > layout.x && x < layout.x + computedStyle.width) &&
            (y > layout.y && y < layout.y + computedStyle.height)
        );

        return result;

    }
}
