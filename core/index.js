import {getScrollbarWidth, PIXEL_RATIO} from "./utils/util";
import Layer from "./layers/Layer";

import Table from "./elements/Table";
import THead from "./elements/THead";
import TBody from "./elements/TBody";
import TRow from "./elements/TRow";
import TCol from "./elements/TCol";
import Container from "./elements/Container";

import ClickHandler from "../core/event/ClickHandler";


import {cellStyle, height, width, strokeColor, containerPadding } from "./meta";


export default class TableEntry {
    constructor(props) {
        this.columns = props.columns;
        this.dataSource = props.dataSource;
        this.$canvas = null;
        this.$root = props.$root;
        this.$container = null;
        this.fixedHeader = props.fixedHeader;

        this.hasInit = false;

        this.table = null;

        this.scroller = {
            scrollTop: 0,
            scrollLeft: 0,
        };

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
    }

    ctxInit() {
        this.ctx = this.$canvas.getContext('2d');
        this.ctx.setTransform(PIXEL_RATIO, 0, 0 , PIXEL_RATIO, 0, 0);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px';
        this.ctx.textBaseline = 'middle';
        this.ctx.strokeStyle = strokeColor;
    }

    get commonProps() {
        return {
            ctx: this.ctx,
            tableWidth: this.tableWidth,
            tableHeight: this.tableHeight,
            scroller: this.scroller,
        }
    }

    get tableWidth() {
        return this.columns.length * cellStyle.width;
    }

    get tableHeight() {
        return (1 + this.dataSource.length) * cellStyle.height;
    }

    getTHead() {
        // header
        const cols = this.columns.map(col => {
            return TCol.create(this, {
                text: col.title,
                fixed: col.fixed,
            });
        });
        const row = TRow.create(this, cols);
        return THead.create(this, row);
    }

    getTBody() {
        const columns = this.columns;
        const dataSource = this.dataSource;

        // body
        const trs = dataSource.map(row => {
            const cols = columns.map(col => TCol.create(this, {
                text: row[col.dataIndex],
                fixed: col.fixed,
            }));

            return TRow.create(this, cols);
        });

        return TBody.create(this, trs);
    }

    onScroll(scrollLeft, scrollTop) {
        this.scroller.scrollLeft = scrollLeft;
        this.scroller.scrollTop = scrollTop;

        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.container.render();
    }

    render() {
        this.table = Table.create(this, this.getTHead(), this.getTBody());

        this.container = Container.create(this, this.table);

        this.container.render();
    }
}
