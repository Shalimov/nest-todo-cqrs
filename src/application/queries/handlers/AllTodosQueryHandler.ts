import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { TodoList } from '@/domain/aggregates/todoList/TodoList';
import { ITodoListRepository } from '@/infrastructure/repositories/ITodoListRepository';

import { AllTodosQuery } from '../defs';

@QueryHandler(AllTodosQuery)
export class AllTodosQueryHandler
  implements IQueryHandler<AllTodosQuery, TodoList> {
  constructor(
    @Inject(ITodoListRepository)
    private readonly todoListRepository: ITodoListRepository,
  ) {}

  async execute(query: AllTodosQuery): Promise<TodoList> {
    const todoList = await this.todoListRepository.findAll();
    return todoList;
  }
}
