import TCol from "./TCol";
import {createElement} from "../utils/util";

export default class SelectedTCol extends TCol {
    static create(stage, props) {
        const { commonProps } = stage;

        return createElement(SelectedTCol, this.getColProps(stage, props),
            [this.createLayerText(commonProps, props.text)]
        )
    }
    constructor(props) {
        super(props);

        this.stage = props.stage;

        this.initEvent();
    }

    initEvent() {
        const { selectionManager } = this.stage;
        const { rowIndex, colIndex } = this;

        this.on('click', (e) => {
            selectionManager.activeCol = this;

            e.stopPropagation();
        });

        this.on('dblclick', (e) => {
            console.info('#dblclick', this.rowIndex, this.colIndex);
        });

        this.on('mouseenter', () => {
            console.info('#mouseenter', this.rowIndex, this.colIndex);
        });

        this.on('mouseleave', () => {
            console.info('#mouseleave', this.rowIndex, this.colIndex);
        });
    }
}
