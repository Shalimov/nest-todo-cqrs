import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';

import { ITodoRepository } from '../types/';
import { TodoFilterSpec } from '../specifications/';

const tempTodos: Todo[] = [
  new Todo('Hello World', 'Describe your first app', TodoStatus.COMPLETE),
  new Todo('Prismaphone', 'Describe your second app', TodoStatus.INPROGRESS),
  new Todo('Lucio', 'Describe your third app', TodoStatus.INPROGRESS),
];

export class TodoRepository implements ITodoRepository {
  async insert(todo: Todo): Promise<Todo> {
    tempTodos.push(todo);

    return Promise.resolve(todo);
  }

  async update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOne(): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  findAll(specification: TodoFilterSpec): Promise<Todo[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (specification) {
          return resolve(
            tempTodos.filter(todo => todo.status === specification.status),
          );
        }

        return resolve(tempTodos);
      }, 1000);
    });
  }
}
