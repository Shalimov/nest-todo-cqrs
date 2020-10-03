import { Entity } from "@/domain/seedWork/Entity";
import { IAggregateRoot } from "@/domain/seedWork/IAggregateRoot";
import { TodoArgumentNullError } from "@/domain/exceptions/TodoArgumentNullError";

import { TodoStatus } from "./TodoStatus";

export class Todo extends Entity<number> implements IAggregateRoot {
    #title: string;
    #descripion: string;
    #status: TodoStatus;

    static restore(id: number, title: string, description: string, status: TodoStatus) : Todo {
        const todo = new Todo(title, description, status);
        
        todo.setId(id);

        return todo;
    }

    constructor(title: string, description: string, status: TodoStatus) {
        super(null);

        if (title === null || title.length === 0) {
            throw new TodoArgumentNullError("Title can not be null or empty");
        }

        this.#title = title;
        this.#descripion = description;
        this.#status = status;
    }

    getRootType() {
        return 'Todo';
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

    public set status(status: TodoStatus) {
        this.#status = status;   
    }
}