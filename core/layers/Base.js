import {Subject, filter, tap} from "rxjs";


export default class Base {
    constructor(props) {
        this.event$ = new Subject({});

        // 全局Context
        this.ctx = props.ctx;

        // 层级关系
        this.parent = null;
        this._children = [];
        this.children = props.children;
    }

    // 同层级的所有Div
    get siblings() {
        return this.parent ? this.parent.children || [] : [];
    }

    get children() {
        return this._children;
    }

    set children(newChildren) {
        this._children = newChildren || [];

        newChildren.forEach(child => {
            child.parent = this;
        })
    }

    on(name, handler) {
        return this.event$.pipe(
            filter((e) => e.name === name),
            tap(handler),
        ).subscribe();
    }

    emit(name, value) {
        this.event$.next({
            name,
            value,
        });
    }

    makeChildren(children) {
        this.children = children;

        this.children.forEach(child => {
            child.parent = this;
        })
    }
}
