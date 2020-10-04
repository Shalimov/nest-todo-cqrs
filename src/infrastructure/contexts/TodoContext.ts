import { Injectable } from '@nestjs/common';

import { Todo, TodoStatus } from '@/domain/aggregates/todo';
import { IUnitOfWork } from '@/domain/seedWork/IUnitOfWork';

// Preparation for adding unit of work
// This context will be replace with real db driver
@Injectable()
export class TodoContext implements IUnitOfWork {
  #ids = 1;
  #todos: Todo[];
  #bufferAddTodo: Todo[] = [];
  #bufferUpdateTodo: Todo[] = [];
  #bufferDeleteTodo: number[] = [];

  constructor() {
    this.#todos = [
      Todo.restore(
        this.#ids,
        'Hello World',
        'Describe your first app',
        TodoStatus.COMPLETE,
      ),
      Todo.restore(
        ++this.#ids,
        'Prismaphone',
        'Describe your second app',
        TodoStatus.INPROGRESS,
      ),
      Todo.restore(
        ++this.#ids,
        'Lucio',
        'Describe your third app',
        TodoStatus.INPROGRESS,
      ),
    ];
  }

  async addTodo(todo: Todo) {
    const newTodo = Todo.restore(
      ++this.#ids,
      todo.title,
      todo.description,
      todo.status,
    );

    this.#bufferAddTodo.push(newTodo);

    return newTodo;
  }

  async updateTodo(todoChanges: Todo) {
    this.#bufferUpdateTodo.push(todoChanges);
  }

  async findById(id: number) {
    return Promise.resolve(this.#todos.find((todo) => todo.id === id) ?? null);
  }

  async findByStatus(status: TodoStatus) {
    return this.#todos.filter((todo) => todo.status === status);
  }

  async findAll() {
    return this.#todos;
  }

  async deleteById(id: number) {
    this.#bufferDeleteTodo.push(id);
  }

  // Dirty Implementaiton
  async commit() {
    this.#todos.push(...this.#bufferAddTodo);

    // To emulate changes application
    for (const todoChanges of this.#bufferUpdateTodo) {
      const index = this.#todos.findIndex((todo) => todo.id === todoChanges.id);
      this.#todos.splice(index, 1, todoChanges);
    }

    for (const todoId of this.#bufferDeleteTodo) {
      const index = this.#todos.findIndex((todo) => todo.id === todoId);
      this.#todos.splice(index, 1);
    }

    this.clearBuffers();
  }

  async rollback() {
    this.#ids -= this.#bufferAddTodo.length;
    this.clearBuffers();
  }

  async complete() {
    try {
      await this.commit();
    } catch (error) {
      await this.rollback();
    }
  }


  private clearBuffers() {
    this.#bufferAddTodo = [];
    this.#bufferUpdateTodo = [];
    this.#bufferDeleteTodo = [];
  }
}
