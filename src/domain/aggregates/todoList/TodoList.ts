import { AggregateRoot } from "@/domain/seedWork/AggregateRoot";
import { TodoCollectionEmptyError } from "@/domain/exceptions/TodoCollectionEmptyError";

import { Todo } from "./Todo";
import { TodoStatus } from "./TodoStatus";

export class TodoList extends AggregateRoot {
    #todos: Todo[];

    constructor(todos: Todo[]) {
        super();

        if (todos.length === 0) {
            throw new TodoCollectionEmptyError("Collection could not be empty.");
        }

        this.#todos = todos;
    }

    get todos() {
        return this.#todos;
    }

    getCompletedTodos() {
        return this.#todos.filter(todo => todo.status === TodoStatus.COMPLETE);
    }      

    getInProgressTodos() {
        return this.#todos.filter(todo => todo.status === TodoStatus.INPROGRESS);
    }      
}