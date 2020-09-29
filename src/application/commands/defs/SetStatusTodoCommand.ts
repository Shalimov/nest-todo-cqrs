import { ICommand } from '@nestjs/cqrs';

import { TodoStatus } from '@/domain/aggregates/todoList/TodoStatus';

export class SetStatusTodoCommand implements ICommand {
  constructor(
    public readonly todoId: string,
    public readonly status: TodoStatus,
  ) {}
}
