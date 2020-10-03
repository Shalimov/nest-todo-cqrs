import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';

import { ITodoRepository } from '../types/';
import { TodoFilterSpec } from '../specifications/';

export class TodoRepository implements ITodoRepository {
  #ids = 1;
  #tempTodos: Todo[];

  constructor() {
    this.#tempTodos =[
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

  async insert(todo: Todo): Promise<Todo> {
    const newTodo = Todo.restore(
      ++this.#ids,
      todo.title,
      todo.description,
      todo.status,
    );

    this.#tempTodos.push(newTodo);

    return Promise.resolve(newTodo);
  }

  async update(id: number, todo: Todo): Promise<void> {
    const index = this.#tempTodos.findIndex(todo => todo.id === id);

    this.#tempTodos.splice(index, 1, todo);
  }

  get(id: number): Promise<Todo | null> { 
    return Promise.resolve(this.#tempTodos.find(todo => todo.id === id) ?? null);
  }

  findOne(): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  findAll(specification: TodoFilterSpec): Promise<Todo[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (specification) {
          return resolve(
            this.#tempTodos.filter(todo => todo.status === specification.status),
          );
        }

        return resolve(this.#tempTodos);
      }, 1000);
    });
  }
}
