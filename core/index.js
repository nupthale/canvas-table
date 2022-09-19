import {createElement, PIXEL_RATIO} from "./utils/util";
import Layer from "./layers/Layer";
import LayerText from "./layers/LayerText";

const cellStyle = {
    width: 100,
    height: 30,
}

const strokeColor = '#ddd';

export default class Table {
    constructor(props) {
        this.columns = props.columns;
        this.dataSource = props.dataSource;
        this.$canvas = props.$canvas;

        this.hasRender = false;

        this.init();
    }

    init() {
        this.ctxInit();

        this.render();
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
        }
    }

    get tableWidth() {
        return this.columns.length * cellStyle.width;
    }

    get tableHeight() {
        return (1 + this.dataSource.length) * cellStyle.height;
    }

    table(thead, tbody) {
        return createElement(Layer, {
            ...this.commonProps,
            style: {
                direction: 'vertical',
                width: this.tableWidth,
                height: this.tableHeight,
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, [thead, tbody]);
    }

    thead(tr) {
        return createElement(Layer, {
            ...this.commonProps,
            style: {
                direction: 'horizontal',
                width: this.tableWidth,
                height: cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, [tr]);
    }

    tbody(trs) {
        return createElement(Layer, {
            ...this.commonProps,
            style: {
                direction: 'vertical',
                width: this.tableWidth,
                height: this.dataSource.length * cellStyle.height,
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, trs)
    }

    tr(tds) {
       return createElement(Layer, {
           ...this.commonProps,
           style: {
               direction: 'horizontal',
               width: this.tableWidth,
               height: cellStyle.height,
               padding: [0, 0, 0, 0],
               border: [],
           }
       }, tds)
    }

    td(text) {
        const border = [
            { color: strokeColor },
            { color: strokeColor },
            { color: strokeColor },
            { color: strokeColor },
        ]

        return createElement(Layer, {
            ...this.commonProps,
            style: {
                direction: 'horizontal',
                width: cellStyle.width,
                height: cellStyle.height,
                border,
                padding: [4, 4, 4, 4],
            }
        },
            [createElement(LayerText, {
                ...this.commonProps,
                text,
                style: {
                    width: '100%',
                    height: '100%',
                    padding: [0, 0, 0, 0],
                    border: [],
                    color: "#666"
                }
            }, [])]
        )
    }

    render() {
        if (this.hasRender) {
            return;
        }

        const columns = this.columns;
        const dataSource = this.dataSource;

        // header
        const hdCols = columns.map(col => this.td(col.title));
        const hdRow = this.tr(hdCols);
        const thead = this.thead(hdRow);

        // body
        const trs = dataSource.map(row => {
            const cols = columns.map(col => this.td(row[col.dataIndex]))
            return this.tr(cols);
        });
        const tbody = this.tbody(trs);

        const table = this.table(thead, tbody);

        // this.testTable(table);
        this.hasRender = true;
        table.render();


    }

    testTable(table) {
        console.info('--start');
        console.info('--table', table.getLayoutBox());
        console.info('--thead', table.children[0].getLayoutBox());
        console.info('--tbody', table.children[1].getLayoutBox());


        console.info('--tr[0]', table.children[1].children[0].getLayoutBox());
        console.info('--tr[1]', table.children[1].children[1].getLayoutBox());
        console.info('--tr[2]', table.children[1].children[2].getLayoutBox());

        console.info('--end');
    }
}
