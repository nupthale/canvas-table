import Eventful from "../event/Eventful";

// https://stackoverflow.com/questions/9979172/difference-between-node-object-and-element-object
export default class Node extends Eventful {
    constructor(props) {
        super(props);

        // 层级关系
        this.parent = null;
        this._children = [];
        this.children = props.children;
    }

    // 同层级的所有Div
    get siblings() {
        return this.parent ? this.parent.children || [] : [];
    }

    get prevSiblings() {
        const siblings = this.siblings || [];

        const index = siblings.findIndex(sibling => sibling === this);

        return siblings.slice(0, index);
    }

    get postSiblings() {
        const siblings = this.siblings || [];

        const index = siblings.findIndex(sibling => sibling === this);

        return siblings.slice(index + 1);
    }

    get children() {
        return this._children;
    }

    set children(newChildren) {
        this._children = newChildren || [];
        const me = this;

        newChildren.forEach(child => {
            child.parent = me;
        })
    }

    isChild(node) {
        return this.children.some(child => {
            if (child === node) {
                return true;
            }

            return child.isChild(node);
        })
    }
}
