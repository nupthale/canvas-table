import {PIXEL_RATIO} from "../engine/utils/util";

import Table from "./elements/Table";
import THead from "./elements/THead";
import SelectedTBody from "./elements/SelectedTBody";
import TRow from "./elements/TRow";
import TCol from "./elements/TCol";
import SelectedTCol from "./elements/SelectedTCol";
import SelectedTRow from "./elements/SelectedTRow";
import Container from "./elements/Container";

import Stage from '../engine/stage';

import SelectionManager from "./selection/manager";

import {cellStyle } from "./meta";

export default class TableEntry {
    constructor(props) {
        this.columns = this.getColumns(props);
        this.dataSource = this.getDataSource(props);

        this.$root = props.$root;
        this.fixedHeader = props.fixedHeader;

        this.hasInit = false;
        this.table = null;

        // this.selectionManager = new SelectionManager(this);
        this.init();
    }

    init() {
        if (this.hasInit) {
            return;
        }

        this.hasInit = true;

        this.render();
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

    render() {
        this.table = Table.create(
            this,
            this.getTHead(),
            this.getTBody()
        );

        this.domTree = Container.create(this, this.table);

        this.stage = new Stage(this.domTree, this.$root);
        this.stage.render();
    }
}
