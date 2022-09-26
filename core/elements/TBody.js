import Layer from "../layers/Layer";
import {createElement} from "../utils/util";

import {cellStyle, containerPadding, getTableViewWidth} from "../meta";
import {clipRect} from "../utils/draw";

export default class TBody extends Layer {
    static create(stage, trs) {
        const { commonProps, dataSource } = stage;

        return createElement(TBody, {
            ...commonProps,
            style: {
                direction: 'vertical',
                width: commonProps.tableWidth,
                height: dataSource.length * cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, trs)
    }

    constructor(props) {
        super(props);

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
            this._fixedLeftCols = [];
            this.children.forEach(row => {
               row.children.forEach(col => {
                   if (col.fixed === 'left') {
                       this._fixedLeftCols.push(col);
                   }
               })
            });
        }

        return this._fixedLeftCols;
    }

    get fixedRightCols() {
        if (this._fixedRightCols !== null) {
            return this._fixedRightCols;
        }

        if (!this.children?.length) {
            this._fixedRightCols = [];
        } else {
            this._fixedRightCols = [];

            this.children.forEach(row => {
               row.children.forEach(col => {
                 if (col.fixed === 'right') {
                     this._fixedRightCols.push(col);
                 }
               });
            });
        }

        return  this._fixedRightCols;
    }

    get centerCols() {
        if (this._centerCols !== null) {
            return this._centerCols;
        }

        if (!this.children?.length) {
            this._centerCols = [];
        } else {
            this._centerCols = [];

            this.children.forEach(row => {
                row.children.forEach(col => {
                    if (!col.fixed) {
                        this._centerCols.push(col);
                    }
                });
            });
        }

        return this._centerCols;
    }

    get fixedLeftWidth() {
        if (this._fixedLeftWidth !== null) {
            return this._fixedLeftWidth;
        }

        if (!this.children?.length) {
            return 0;
        }

        const row = this.children[0];
        const fixedLeftCols = row.children.filter(col => col.fixed === 'left');
        this._fixedLeftWidth = this.getTotalWidth(fixedLeftCols);
        return this._fixedLeftWidth;
    }

    get fixedRightWidth() {
        if (this._fixedRightWidth !== null) {
            return this._fixedLeftWidth;
        }

        if (!this.children?.length) {
            return 0;
        }

        const row = this.children[0];
        const fixedRightCols = row.children.filter(col => col.fixed === 'right');
        this._fixedRightWidth = this.getTotalWidth(fixedRightCols);
        return this._fixedRightWidth;
    }

    clipCenter(callback) {
        const fixedLeftWidth = this.fixedLeftWidth;
        const fixedRightWidth = this.fixedRightWidth;

        debugger;
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
        debugger;
        this.sortAndRender(this.fixedRightCols);
    }

    renderChildren() {
        this.renderCenter();

        this.renderFixedLeft();
        this.renderFixedRight();
    }
}
