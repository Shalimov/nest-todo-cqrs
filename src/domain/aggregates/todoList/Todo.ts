import { Entity } from "@/domain/seedWork/Entity";
import { TodoArgumentNullError } from "@/domain/exceptions/TodoArgumentNullError";

import { TodoStatus } from "./TodoStatus";

export class Todo extends Entity<string> {
    #title: string;
    #descripion: string;
    #status: TodoStatus;

    constructor(title: string, description: string, status: TodoStatus) {
        super(`${title}-${description}`);

        if (title === null || title.length === 0) {
            throw new TodoArgumentNullError("Title can not be null or empty");
        }

        this.#title = title;
        this.#descripion = description;
        this.#status = status;
    }

    public get title() {
        return this.#title;
    }

    public get description() {
        return this.#descripion;
    }

    public get status() {
        return this.#status;
    }

    public setStatus(status: TodoStatus) {
        this.#status = status;   
    }
}