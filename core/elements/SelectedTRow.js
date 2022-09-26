import TRow from "./TRow";
import {createElement, isInBox} from "../utils/util";

export default class SelectedTRow extends TRow {
    static create(stage, tds, rowIndex) {
        // const selectionRect = SelectionRect.create({
        //     stage,
        //     ctx: stage.ctx,
        //     rowIndex,
        //     style: {
        //         width: 0,
        //         height: 0,
        //         border: [],
        //         padding: [],
        //     },
        // }, []);

        return createElement(SelectedTRow, {
            ...this.getDefaultProps(stage, rowIndex),
        }, [...tds])
    }

    constructor(props) {
        super(props);

        this.props = props;

        this.selectionRect = props.selectionRect;

    }
    //
    // sortAndRender(children, clipCenterBox) {
    //     // 必须clone， 要不然siblings的顺序也被sort了
    //     const sortedLayer = [...(children || [])].sort((prev, next) => (prev.zIndex || 0) - (next.zIndex || 0));
    //
    //     sortedLayer.forEach(child => {
    //         if (!clipCenterBox) {
    //             child.render();
    //         } else {
    //             if (isInBox(clipCenterBox, child)) {
    //                 child.render();
    //             }
    //         }
    //     });
    // }

    // drawSelection() {
    //
    //     this.selectionRect.render();
    // }
    //
    //
    // drawCenterSelection() {
    //     const { selectionManager } = this.stage;
    //     const { activeCol } = selectionManager;
    //
    //     if (activeCol && !activeCol.fixed) {
    //         this.drawSelection();
    //     }
    // }
    //
    // drawFixedSelection() {
    //     const { selectionManager, table } = this.stage;
    //     const { activeCol } = selectionManager;
    //
    //     if (activeCol && activeCol.fixed) {
    //         this.drawSelection();
    //     }
    // }
}
