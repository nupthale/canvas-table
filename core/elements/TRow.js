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

        this._fixedLeftCols = null;
        this._fixedRightCols = null;
        this._centerCols = null;
        this._fixedLeftWidth = null;
        this._fixedRightWidth = null;
    }

    getTotalWidth(cols) {
        return cols.reduce((acc, crt) => {
            return acc + crt.width;
        }, 0);
    }

    get fixedLeftCols() {
        if (this._fixedLeftCols !== null) {
            return this._fixedLeftCols;
        }

        if (!this.children?.length) {
            this._fixedLeftCols = [];
        } else {
            this._fixedLeftCols = this.children.filter(col => col.fixed === 'left');
        }

        return this._fixedLeftCols;
    }

    get centerCols() {
        if (this._centerCols !== null) {
            return this._centerCols;
        }

        if (!this.children?.length) {
            this._centerCols = [];
        } else {
            this._centerCols = this.children.filter(col => !col.fixed);
        }

        return this._centerCols;
    }

    get fixedRightCols() {
        if (this._fixedRightCols !== null) {
            return this._fixedRightCols;
        }

        if (!this.children?.length) {
           this._fixedRightCols = [];
        } else {
            this._fixedRightCols = this.children.filter(col => col.fixed === 'right');
        }

        return  this._fixedRightCols;
    }

    clipCenter(callback) {
        const fixedLeftWidth = this._fixedLeftWidth === null ? this.getTotalWidth(this.fixedLeftCols) : this._fixedLeftWidth;
        const fixedRightWidth = this._fixedRightWidth === null ? this.getTotalWidth(this.fixedRightCols) : this._fixedRightWidth;

        const clipCenterBox = {
            left: fixedLeftWidth + containerPadding,
            top: this.top,
            width: getTableViewWidth() - fixedLeftWidth - fixedRightWidth,
            height: this.height,
        };

        clipRect(
            this.ctx,
            clipCenterBox.left,
            clipCenterBox.top,
            clipCenterBox.width,
            clipCenterBox.height,
            () => {
                callback(clipCenterBox);
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
