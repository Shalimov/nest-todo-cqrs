import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { TodoList } from '@/domain/aggregates/todoList/TodoList';

import { CompletedTodosQuery } from '../CompletedTodosQuery';

@QueryHandler(CompletedTodosQuery)
export class CompletedTodosQueryHandler implements IQueryHandler<CompletedTodosQuery, TodoList> {
    execute(query: CompletedTodosQuery): Promise<TodoList> {
        throw new Error('Method not implemented.');
    }
}
