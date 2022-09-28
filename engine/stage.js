import {PIXEL_RATIO} from "./utils/util";

import Layer from "./layer/Layer";
import Render from "./render/Render";


import ClickHandler from "./event/ClickHandler";
import DblClickHandler from "./event/DblClickHandler";
import ContextMenuHandler from "./event/ContextMenuHandler";
import MouseMoveHandler from "./event/MouseMoveHandler";
import MouseWheelHandler from "./event/MouseWheelHandler";
import TouchMoveHandler from "./event/TouchMoveHandler";

import {height, width, strokeColor } from "../core/meta";

export default class Stage {
    constructor(root, mountNode) {
        this.root = root;

        this.$root = mountNode;

        this.init();
    }

    init() {
        if (this.hasInit) {
            return;
        }

        this.hasInit = true;

        this.initDom();
        this.ctxInit();
        this.render();
        this.eventInit();
    }

    initDom() {
        const $canvas = document.createElement('canvas');
        $canvas.width = width * PIXEL_RATIO;
        $canvas.height = height * PIXEL_RATIO;
        $canvas.style.width = `${width}px`;
        $canvas.style.height = `${height}px`;
        this.$canvas = $canvas;

        this.$root.prepend(this.$canvas);
    }

    eventInit() {
        new ClickHandler(this);
        new DblClickHandler(this);
        new ContextMenuHandler(this);
        new MouseMoveHandler(this);
        new MouseWheelHandler(this);
        new TouchMoveHandler(this);
    }

    ctxInit() {
        this.ctx = this.$canvas.getContext('2d');
        this.ctx.setTransform(PIXEL_RATIO, 0, 0 , PIXEL_RATIO, 0, 0);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px';
        this.ctx.textBaseline = 'middle';
        this.ctx.strokeStyle = strokeColor;
    }

    render() {
        this.domTree = this.root;
        this.layoutTree = this.domTree.doLayout();
        this.layerTree = Layer.create(this.layoutTree, null);

        const renderer = new Render(this.ctx, this.layerTree);
        renderer.paint();
    }
}
