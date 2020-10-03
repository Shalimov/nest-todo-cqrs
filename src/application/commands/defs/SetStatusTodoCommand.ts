import { ICommand } from '@nestjs/cqrs';

export class SetStatusTodoCommand implements ICommand {
  constructor(
    public readonly todoId: number,
    public readonly status: 'completed' | 'inprogress',
  ) {}
}
