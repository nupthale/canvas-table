import { dfs } from "./util";
import {shouldCreateContext} from "./util";


/**
 * layout tree -> layer tree
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index
 * 构造方法：
 * 1. 深度优先遍历layout tree
 * 2. 每个layer，包含nodes, 用于存无stackContext的node， children用个存有stackContext的layers
 * 3. nodes和children都需要有序， nodes的顺序是在原layoutTree中出现遍历的顺序；
 * 4. children的顺序按照zIndex排序；zIndex小的放前面， 大的放后面；
 */
export default class Layer {
    static create(rootNode, parentLayer, zIndex) {
        const layer = new Layer(rootNode, parentLayer, zIndex || 0);

        dfs(rootNode, (node) => {
            // 分层
            if (node === rootNode) {
                return true;
            }

            if (shouldCreateContext(node)) {
                const subLayer = Layer.create(node, layer, node.getComputedStyle().zIndex);

                layer.addChild(subLayer);
                return false;
            } else {
                layer.addNode(node);
                return true;
            }
        });

        // 因为是dfs， 所以node不需要sort
        layer.sortChildren();
        return layer;
    }

    constructor(rootNode, parent, zIndex) {
        this.rootNode = rootNode;
        this.parent = parent;

        this.zIndex = zIndex;

        this.nodes = [];
        this.children = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    addChild(layer) {
        this.children.push(layer);
    }

    sortChildren() {
         this.children.sort((prev, next) => prev.zIndex - next.zIndex);
    }
}
