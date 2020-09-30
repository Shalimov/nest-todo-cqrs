import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { Todo } from '@/domain/aggregates/todo/Todo';
import { ITodoRepository } from '@/infrastructure/repositories/types/ITodoRepository';

import { AllTodosQuery } from '../defs';

@QueryHandler(AllTodosQuery)
export class AllTodosQueryHandler
  implements IQueryHandler<AllTodosQuery, Todo[]> {
  constructor(
    @Inject(ITodoRepository)
    private readonly TodoRepository: ITodoRepository,
  ) {}

  async execute(query: AllTodosQuery): Promise<Todo[]> {
    const todos = await this.TodoRepository.findAll();
    return todos;
  }
}
