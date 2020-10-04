import { ICommand } from '@nestjs/cqrs';

export class CreatePoktaMessageCommand implements ICommand {
  constructor(public readonly message: string, public readonly todoId: number) {}
}
