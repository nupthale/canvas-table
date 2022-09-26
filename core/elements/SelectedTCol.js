import TCol from "./TCol";
import {createElement} from "../utils/util";
import Tag from "./Tag";

export default class SelectedTCol extends TCol {
    static create(stage, props) {
        const { commonProps } = stage;

        let children = this.createLayerText(commonProps, props.text);

        if (props.colIndex === 3) {
            children = Tag.create({
                ...props,
                stage,
            });
        }

        return createElement(SelectedTCol, this.getColProps(stage, props),
            [children]
        )
    }
    constructor(props) {
        super(props);

        this.stage = props.stage;
        this.tag = 'col';

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
        });

        this.on('mouseenter', () => {
        });

        this.on('mouseleave', () => {
        });
    }
}
