import {PIXEL_RATIO} from "./utils/util";

import Table from "./elements/Table";
import THead from "./elements/THead";
import TBody from "./elements/TBody";
import TRow from "./elements/TRow";
import TCol from "./elements/TCol";
import SelectedTCol from "./elements/SelectedTCol";
import SelectedTRow from "./elements/SelectedTRow";
import Container from "./elements/Container";

import ClickHandler from "../core/event/ClickHandler";

import SelectionManager from "./selection/manager";


import {cellStyle, height, width, strokeColor } from "./meta";


export default class Stage {
    constructor(props) {
        this.columns = props.columns;
        this.dataSource = props.dataSource;

        this.$canvas = null;
        this.$root = props.$root;
        this.fixedHeader = props.fixedHeader;

        this.hasInit = false;
        this.table = null;

        this.selectionManager = new SelectionManager(this);

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
        const cols = this.columns.map((col, colIndex) => {
            return TCol.create(this, {
                text: col.title,
                fixed: col.fixed,
                rowIndex: 0,
                colIndex,
            });
        });
        const row = TRow.create(this, cols, 0);
        return THead.create(this, row);
    }

    getTBody() {
        const columns = this.columns;
        const dataSource = this.dataSource;

        // body
        const trs = dataSource.map((row, rowIndex) => {
            const cols = columns.map((col, colIndex) => SelectedTCol.create(this, {
                text: row[col.dataIndex],
                fixed: col.fixed,
                rowIndex: rowIndex + 1,
                colIndex,
            }));

            return SelectedTRow.create(this, cols, rowIndex + 1);
        });

        return TBody.create(this, trs);
    }

    updateView() {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.container.render();
    }

    onScroll(scrollLeft, scrollTop) {
        this.scroller.scrollLeft = scrollLeft;
        this.scroller.scrollTop = scrollTop;

        this.updateView();
    }

    render() {
        this.table = Table.create(this, this.getTHead(), this.getTBody());

        this.container = Container.create(this, this.table);

        this.updateView();
    }
}
