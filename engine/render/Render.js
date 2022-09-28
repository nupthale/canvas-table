import {isNumber} from "lodash-es";


import {dfs} from "../utils/tree";

import ElementRender from "./ElementRender";
import TextRender from "./TextRender";

import {shouldClipCtx} from "./util";


export default class Render {
    constructor(ctx, rootLayer) {
        this.ctx = ctx;
        this.rootLayer = rootLayer;

        this.opacityNodes = [];
        this.overflowNodes = [];
    }

    paint() {
        this.ctx.save();

        dfs(this.rootLayer, (layer) => {
            // 先渲染root, 再渲染nodes, 再渲染children
            const nodes = layer.nodes || [];

            this.renderElement(layer.rootNode);
            this.renderNodes(nodes);
        });

        this.ctx.restore();
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
        if (this.overflowNodes?.length) {
            const crtOverflowNode = this.overflowNodes[this.overflowNodes.length - 1];

            if (!crtOverflowNode?.isChild(element)) {
                this.ctx.restore();

                this.overflowNodes.pop();
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

            this.overflowNodes.push(element);
        }
    }

    makeOpacity(element) {

        if (this.opacityNodes?.length) {
            const crtOpacityNode = this.opacityNodes[this.opacityNodes.length - 1];

            if (!crtOpacityNode?.isChild(element)) {
                this.ctx.restore();

                this.opacityNodes.pop();
            }
        }

        const style = element.getComputedStyle();
        if (isNumber(style.opacity) && style.opacity < 1) {
            this.ctx.save();
            this.ctx.globalAlpha = style.opacity;

            this.opacityNodes.push(element);
        }
    }

    renderElement(element) {
        this.makeClip(element);

        this.makeOpacity(element);

        const renderer = new ElementRender(this.ctx, element);
        renderer.render();
    }

    renderTextNode(node) {
        const renderer = new TextRender(this.ctx, node);
        renderer.render();
    }
}
