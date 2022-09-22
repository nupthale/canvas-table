
export default class SelectionManager {
    constructor(stage) {
        // 当前选中的Cell， 选区的min Cell
        this._activeCol = null;

        // 拖拽时，鼠标所在位置的cell， 选区的max Cell; 目前只支持单列选择
        this._selectionCol = null;

        this.stage = stage;
    }

    get selection() {
        if (!this.activeCol || !this.selectionCol) {
            return null;
        }

        return {
            min: {
                row: Math.min(this.activeCol.rowIndex, this.selectionCol.rowIndex),
                col: Math.min(this.activeCol.colIndex, this.selectionCol.colIndex),
            },
            max: {
                row: Math.max(this.activeCol.rowIndex, this.selectionCol.rowIndex),
                col: Math.max(this.activeCol.colIndex, this.selectionCol.colIndex),
            }
        }
    }

    get activeCol() {
        return this._activeCol;
    }

    set activeCol(activeCol) {
        this._activeCol = activeCol;

        this.stage.updateView();
    }

    get selectionCol() {
        return this._selectionCol;
    }

    set selectionCol(selectionCol) {
        this._selectionCol = selectionCol;
        this.stage.updateView();
    }
}
