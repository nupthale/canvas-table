import Layer from "../layers/Layer";

export default class Scroller extends Layer {
    constructor(props) {
        super(props);

        this.scrollLeft = 0;
        this.scrollTop = 0;

        this.innerWidth = props.innerWidth;
        this.innerHeight = props.innerHeight;
    }


}
