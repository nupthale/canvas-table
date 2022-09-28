import {filter, Subject, tap} from "rxjs";

export default class Eventful {
    constructor() {
        this.event$ = new Subject({});
    }

    on(name, handler) {
        return this.event$.pipe(
            filter((e) => e.name === name),
            tap((e) => handler(e.value)),
        ).subscribe();
    }

    emit(name, value) {
        this.event$.next({
            name,
            value,
        });
    }
}
