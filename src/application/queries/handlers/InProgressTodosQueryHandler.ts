import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { TodoList } from '@/domain/aggregates/todoList/TodoList';
import { ITodoListRepository } from '@/infrastructure/repositories/ITodoListRepository';

import { InProgressTodosQuery } from '../defs';

@QueryHandler(InProgressTodosQuery)
export class InProgressTodosQueryHandler
  implements IQueryHandler<InProgressTodosQuery, TodoList> {
  constructor(
    @Inject(ITodoListRepository)
    private readonly todoListRepository: ITodoListRepository,
  ) {}

  async execute(_query: InProgressTodosQuery): Promise<TodoList> {
    const todoList = await this.todoListRepository.findAll();
    return new TodoList(todoList.getInProgressTodos());
  }
}
