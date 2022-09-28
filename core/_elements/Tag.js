import Element from "../../engine/dom/Element";
import Text from "../../engine/dom/Text";
import {createElement} from "../../engine/utils/util";

export default class Tag extends Element {
    static create(props) {
        const { commonProps } = props.stage;

        return createElement(Tag, {
            ...commonProps,
            ...props,
            style: {
                backgroundColor: '#FAEAFA',
                width: 60,
                height: 22,
                padding: [0, 0, 0, 0],
                color: '#7B21C3',
                textAlign: 'center',
            }
        }, [createElement(Text, {
            ...commonProps,
            text: '测试中',
            style: {
                align: 'center',
                width: '100%',
                height: '100%',
                padding: [0, 0, 0, 0],
                border: [],
            }
        }, [])]);
    }

    constructor(props) {
        super(props);

        this.tag = true;
    }
}
