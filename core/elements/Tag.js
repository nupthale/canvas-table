import Layer from "../layers/Layer";
import LayerText from "../layers/LayerText";
import {createElement} from "../utils/util";

export default class Tag extends Layer {
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
            }
        }, [createElement(LayerText, {
            ...commonProps,
            text: '测试中',
            style: {
                color: '#7B21C3',
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
