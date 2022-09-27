import {PIXEL_RATIO} from "../engine/utils/util";

import Table from "./elements/Table";
import THead from "./elements/THead";
import SelectedTBody from "./elements/SelectedTBody";
import TRow from "./elements/TRow";
import TCol from "./elements/TCol";
import SelectedTCol from "./elements/SelectedTCol";
import SelectedTRow from "./elements/SelectedTRow";
import Container from "./elements/Container";

import Layer from "../engine/layer/Layer";
import Render from "../engine/render/Render";


import ClickHandler from "../engine/event/ClickHandler";
import DblClickHandler from "../engine/event/DblClickHandler";
import ContextMenuHandler from "../engine/event/ContextMenuHandler";
import MouseMoveHandler from "../engine/event/MouseMoveHandler";
import MouseWheelHandler from "../engine/event/MouseWheelHandler";
import TouchMoveHandler from "../engine/event/TouchMoveHandler";

import SelectionManager from "./selection/manager";

import {cellStyle, height, width, strokeColor } from "./meta";

export default class Stage {
    constructor(props) {
        this.columns = this.getColumns(props);
        this.dataSource = this.getDataSource(props);

        this.$canvas = null;
        this.$root = props.$root;
        this.fixedHeader = props.fixedHeader;

        this.hasInit = false;
        this.table = null;

        this.selectionManager = new SelectionManager(this);


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

    get commonProps() {
        return {
            ctx: this.ctx,
            tableWidth: this.tableWidth,
            tableHeight: this.tableHeight,
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

        return SelectedTBody.create(this, trs);
    }

    getColumns(props) {
        const columns = props.columns || [];

        columns.unshift(
            {title: '', dataIndex: 'rowIndex', fixed: 'left', width: 60, align: 'center' },
        );

        return columns;
    }

    getDataSource(props) {
        let dataSource = props.dataSource || [];
        return dataSource.map((row, rowIndex) => {
            return {
                rowIndex,
                ...row,
            }
        });
    }

    updateView() {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        // this.container.render();
    }

    render() {
        this.table = Table.create(
            this,
            this.getTHead(),
            this.getTBody()
        );

        this.domTree = Container.create(this, this.table);
        this.layoutTree = this.domTree.doLayout();
        this.layerTree = Layer.create(this.layoutTree, null);

        console.info('#layoutTree', this.layoutTree);

        const renderer = new Render(this.ctx, this.layerTree);
        renderer.paint();
    }
}
