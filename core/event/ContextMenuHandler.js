import ClickHandler from "./ClickHandler";

export default class DblClickHandler extends ClickHandler {
    constructor(props) {
        super(props);
    }

    init() {
        this.$root.addEventListener('contextmenu', e => {
            this.handler('contextmenu', e);
        });
    }
}
