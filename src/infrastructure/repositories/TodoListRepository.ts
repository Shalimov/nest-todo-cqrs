import { TodoList } from '@/domain/aggregates/todoList/TodoList';

import { ITodoListRepository } from './ITodoListRepository';

export class TodoListRepository implements ITodoListRepository {
  insert(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOne(): Promise<TodoList> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<TodoList> {
    throw new Error('Method not implemented.');
  }
}
