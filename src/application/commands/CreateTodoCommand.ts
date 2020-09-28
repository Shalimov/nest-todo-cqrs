import { ICommand } from "@nestjs/cqrs";

export class CreateTodoCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
  ) {}
}
