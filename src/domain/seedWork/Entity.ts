export class Entity<T> {
    #id: T | null;

    constructor(id: T | null) {
        this.#id = id;
    }

    public get id() {
        return this.#id;
    }

    protected setId(id: T) {
        this.#id = id;
    }
}