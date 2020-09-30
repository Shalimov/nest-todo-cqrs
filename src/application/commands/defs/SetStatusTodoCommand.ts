import { ICommand } from '@nestjs/cqrs';

import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';

export class SetStatusTodoCommand implements ICommand {
  constructor(
    public readonly todoId: string,
    public readonly status: TodoStatus,
  ) {}
}
