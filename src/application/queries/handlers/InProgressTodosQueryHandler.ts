import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import { TodoList } from "@/domain/aggregates/todoList/TodoList";

import { InProgressTodosQuery } from "../InProgressTodosQuery";

@QueryHandler(InProgressTodosQuery)
export class InProgressTodosQueryHandler implements IQueryHandler<InProgressTodosQuery, TodoList> {
  execute(query: InProgressTodosQuery): Promise<TodoList> {
    throw new Error("Method not implemented.");
  }
}
