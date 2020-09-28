export class Entity<T > {
    #id: T;

    constructor(id: T) {
        this.#id = id;
    }

    public get id() {
        return this.#id;
    }
}