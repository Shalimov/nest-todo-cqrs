import { Todo } from '@/domain/aggregates/todoList/Todo';
import { TodoList } from '@/domain/aggregates/todoList/TodoList';
import { TodoStatus } from '@/domain/aggregates/todoList/TodoStatus';

import { ITodoListRepository } from '../ITodoListRepository';

const tempTodos: Todo[] = [
  new Todo('Hello World', 'Describe your first app', TodoStatus.COMPLETE),
  new Todo('Prismaphone', 'Describe your second app', TodoStatus.INPROGRESS),
  new Todo('Lucio', 'Describe your third app', TodoStatus.INPROGRESS),
];

export class TodoListRepository implements ITodoListRepository {
  async insert(todoList: TodoList): Promise<TodoList> {
    tempTodos.push(...todoList.todos);

    return Promise.resolve(todoList);
  }

  async update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOne(): Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<TodoList> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(new TodoList(tempTodos));
      }, 1000);
    });
  }
}
