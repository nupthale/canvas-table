import {isNumber} from "lodash-es";


import {dfs} from "../utils/tree";

import ElementRender from "./ElementRender";
import TextRender from "./TextRender";

import {shouldClipCtx} from "./util";

// render尽量保持o(1)复杂度， 如果出现o(n)就会卡
export default class Render {
    constructor(ctx, rootLayer) {
        this.ctx = ctx;
        this.rootLayer = rootLayer;

        this.opacityNodes = [];
        this.overflowNodes = [];
        this.scrollableNodes = [];

        this.paintRecords = [];

        this.init();
    }

    init() {
        this.paintRecords = [];

        dfs(this.rootLayer, (layer) => {
            // 先渲染root, 再渲染nodes, 再渲染children
            const nodes = layer.nodes || [];

            this.paintRecords.push(layer.rootNode);
            nodes.forEach(node => {
               this.paintRecords.push(node);
            });
        });
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

    makeOpacity(element) {
        const style = element.getComputedStyle();

        if (isNumber(style.opacity)) {
            this.ctx.globalAlpha = style.opacity;
        }
    }

    makeClip(element) {
        const overflowParent = element.style.overflowParent;

        if (overflowParent) {
            const layout = overflowParent.getLayout();
            const style = overflowParent.getComputedStyle();

            this.ctx.rect(
                layout.x,
                layout.y,
                style.width,
                style.height,
            );
            this.ctx.clip();


            if (overflowParent.scrollLeft || overflowParent.scrollTop) {
                console.info('translate', overflowParent.scrollLeft);

                this.ctx.translate(0 - overflowParent.scrollLeft, 0 - overflowParent.scrollTop);
            }
        }
    }


    renderElement(element) {
        this.ctx.save();

        this.makeClip(element);
        this.makeOpacity(element);

        const renderer = new ElementRender(this.ctx, element);
        renderer.render();

        this.ctx.restore();
    }

    renderTextNode(node) {
        this.ctx.save();

        this.makeClip(node.parent);
        this.makeOpacity(node.parent);

        const renderer = new TextRender(this.ctx, node);
        renderer.render();

        this.ctx.restore();
    }
}
