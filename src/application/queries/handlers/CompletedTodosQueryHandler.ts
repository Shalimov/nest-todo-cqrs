import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ITodoListRepository } from '@/infrastructure/repositories/ITodoListRepository';
import { TodoList } from '@/domain/aggregates/todoList/TodoList';

import { CompletedTodosQuery } from '../defs';

@QueryHandler(CompletedTodosQuery)
export class CompletedTodosQueryHandler
  implements IQueryHandler<CompletedTodosQuery, TodoList> {
  constructor(
    @Inject(ITodoListRepository)
    private readonly todoListRepository: ITodoListRepository,
  ) {}

  async execute(_query: CompletedTodosQuery): Promise<TodoList> {
    const todoList = await this.todoListRepository.findAll();
    return new TodoList(todoList.getCompletedTodos());
  }
}
