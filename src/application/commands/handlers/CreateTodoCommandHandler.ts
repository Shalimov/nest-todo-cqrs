import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateTodoCommand } from "../CreateTodoCommand";

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler implements ICommandHandler<CreateTodoCommand, boolean> {
    execute(command: CreateTodoCommand): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}