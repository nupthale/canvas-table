import {isNumber} from "lodash-es";


import {dfs} from "../utils/tree";
import {isInView, isInOverflowBox, PIXEL_RATIO} from "../utils/util";


import ElementRender from "./ElementRender";
import TextRender from "./TextRender";

let count = 0;

// render尽量保持o(1)复杂度， 如果出现o(n)就会卡
// 注意clip前必须beginPath,否则大量clip就卡死了: https://stackoverflow.com/questions/21160459/html-5-canvas-clip-very-costly
export default class Render {
    constructor(ctx, rootLayer) {
        this.ctx = ctx;
        this.rootLayer = rootLayer;

        this.paintRecords = [];

        this._isPainting = false;

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
        if (this._isPainting) {
            return;
        }

        this._isPainting = true;
        count = 0;

        const me = this;
        this.paintRecords.forEach(node => {
            if (node.isTextNode && node.text === 'address1') {
                console.info('#isInView', node, me.ctx.canvas.width / PIXEL_RATIO, isInView(node, this.ctx));
                debugger;
            }

            if (isInView(node, me.ctx)) {
                if (node.isTextNode) {
                    this.renderTextNode(node);
                } else {
                    this.renderElement(node);
                }
            }
        });

        console.info('#count', count);

        this._isPainting = false;
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

            // 重点,clip前必须beginPath,否则非常多clip的时候直接卡死
            this.ctx.beginPath();
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
        const overflowParent = element.style.overflowParent;
        if (overflowParent && !isInOverflowBox(overflowParent, element)) {
            return;
        }

        count++;

        this.ctx.save();

        this.makeClip(element);
        this.makeOpacity(element);

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
