import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { SetStatusTodoCommand } from "../defs";

@CommandHandler(SetStatusTodoCommand)
export class SetStatusTodoCommandHandler implements ICommandHandler<SetStatusTodoCommand, boolean> {
    execute(command: SetStatusTodoCommand): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}