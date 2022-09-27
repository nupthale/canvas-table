import {dfs} from "../utils/tree";

import ElementRender from "./ElementRender";
import TextRender from "./TextRender";

import {shouldClipCtx} from "./util";


export default class Render {
    constructor(ctx, rootLayer) {
        this.ctx = ctx;
        this.rootLayer = rootLayer;

        this.crtOverflowNode = null;
    }

    paint() {
        dfs(this.rootLayer, (layer) => {
            // 先渲染root, 再渲染nodes, 再渲染children
            const nodes = layer.nodes || [];

            this.renderElement(layer.rootNode);
            this.renderNodes(nodes);
        });
    }

    renderNodes(nodes) {
        nodes.forEach(node => {
            if (node.isTextNode) {
                this.renderTextNode(node);
            } else {
                this.renderElement(node);
            }
        })
    }

    makeClip(element) {
        if (this.crtOverflowNode) {
            if (!this.crtOverflowNode.isChild(element)) {
                this.ctx.restore();
            }
        }

        if (shouldClipCtx(element)) {
            const layout = element.getLayout();
            const style = element.getComputedStyle();

            this.ctx.save();
            this.ctx.rect(
                layout.x,
                layout.y,
                style.width,
                style.height,
            );
            this.ctx.clip();
        }
    }

    renderElement(element) {
        this.makeClip(element);

        const renderer = new ElementRender(this.ctx, element);
        renderer.render();
    }

    renderTextNode(node) {
        const renderer = new TextRender(this.ctx, node);
        renderer.render();
    }
}
