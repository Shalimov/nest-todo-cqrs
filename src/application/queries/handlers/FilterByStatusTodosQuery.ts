import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';
import { ITodoRepository } from '@/infrastructure/repositories/types';
import { TodoFilterSpec } from '@/infrastructure/repositories/specifications';

import { FilterByStatusTodosQuery } from '../defs';

@QueryHandler(FilterByStatusTodosQuery)
export class FilterByStatusTodosQueryHandler
  implements IQueryHandler<FilterByStatusTodosQuery, Todo[]> {
  constructor(
    @Inject(ITodoRepository)
    private readonly TodoRepository: ITodoRepository,
  ) {}

  async execute(query: FilterByStatusTodosQuery): Promise<Todo[]> {
    const todoStatus =
      query.status === 'completed'
        ? TodoStatus.COMPLETE
        : TodoStatus.INPROGRESS;

    const filterSpec = new TodoFilterSpec(todoStatus);
    const todos = await this.TodoRepository.findAll(filterSpec);

    return todos;
  }
}
