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

            console.info(rowIndex, colIndex);

            debugger;
            e.stopPropagation();
        });
    }
}
