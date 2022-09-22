import Layer from "../layers/Layer";
import {createElement} from "../utils/util";

import { cellStyle, containerPadding, getTableViewWidth } from "../meta";

import {clipRect} from "../utils/draw";


export default class TRow extends Layer {
    static getDefaultProps(stage, rowIndex) {
        const { commonProps } = stage;

        return {
            ...commonProps,
            rowIndex,
            stage,
            style: {
                direction: 'horizontal',
                width: stage.tableWidth,
                height: cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            }
        };
    }

    static create(stage, tds, rowIndex) {
        return createElement(TRow, this.getDefaultProps(stage, rowIndex), tds)
    }

    constructor(props) {
        super(props);

        this.stage = props.stage;
        this.rowIndex = props.rowIndex;
    }

    getTotalWidth(cols) {
        return cols.reduce((acc, crt) => {
            return acc + crt.width;
        }, 0);
    }

    get fixedLeftCols() {
        if (!this.children?.length) {
            return 0;
        }

        return this.children.filter(col => col.fixed === 'left');
    }

    get centerCols() {
        if (!this.children?.length) {
            return 0;
        }

        return this.children.filter(col => !col.fixed);
    }

    get fixedRightCols() {
        if (!this.children?.length) {
            return 0;
        }

        return this.children.filter(col => col.fixed === 'right');
    }

    clipCenter(callback) {
        const fixedLeftWidth = this.getTotalWidth(this.fixedLeftCols);
        const fixedRightWidth = this.getTotalWidth(this.fixedRightCols);

        clipRect(
            this.ctx,
            this.getTotalWidth(this.fixedLeftCols) + containerPadding,
            this.top,
            getTableViewWidth() - fixedLeftWidth - fixedRightWidth,
            this.height,
            () => {
                callback();
            }
        );
    }

    renderCenter() {
        this.clipCenter(() => {
            this.sortAndRender(this.centerCols);
        });
    }

    renderFixedLeft() {
        this.sortAndRender(this.fixedLeftCols);
    }

    renderFixedRight() {
        this.sortAndRender(this.fixedRightCols);
    }

    renderChildren() {
        this.renderCenter();
        this.renderFixedLeft();
        this.renderFixedRight();
    }
}
