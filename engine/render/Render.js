import {isNumber} from "lodash-es";


import {dfs} from "../utils/tree";
import {isInView} from "../utils/util";


import ElementRender from "./ElementRender";
import TextRender from "./TextRender";

// render尽量保持o(1)复杂度， 如果出现o(n)就会卡
export default class Render {
    constructor(ctx, rootLayer) {
        this.ctx = ctx;
        this.rootLayer = rootLayer;

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

        this.paintRecords.forEach(node => {
            if (isInView(node, this.ctx)) {
                if (node.isTextNode) {
                    this.renderTextNode(node);
                } else {
                    this.renderElement(node);
                }
            }
        })

        this.ctx.restore();
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
        }
    }


    renderElement(element) {
        this.ctx.save();

        this.makeClip(element);
        this.makeOpacity(element);

        const overflowParent = element.style.overflowParent;
        const renderer = new ElementRender(this.ctx, element, overflowParent);
        renderer.render();

        this.ctx.restore();
    }

    renderTextNode(node) {
        this.ctx.save();

        this.makeClip(node.parent);
        this.makeOpacity(node.parent);

        const overflowParent = node.parent.style.overflowParent;
        const renderer = new TextRender(this.ctx, node, overflowParent);
        renderer.render();

        this.ctx.restore();
    }
}
