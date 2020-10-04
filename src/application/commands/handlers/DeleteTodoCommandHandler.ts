import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { ITodoRepository } from '@/infrastructure/repositories/types';
import { DeleteSpec } from '@/infrastructure/repositories/specifications';

import { DeleteTodoCommand } from '../defs';
import { TodoDeletionSuccessEvent } from '@/application/events/defs';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoCommandHandler
  implements ICommandHandler<DeleteTodoCommand, boolean> {
  constructor(
    @Inject(ITodoRepository)
    private readonly todoRepository: ITodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteTodoCommand): Promise<boolean> {
    await this.todoRepository.delete(new DeleteSpec(command.todoId));

    // It's temporary here
    await this.todoRepository.unitOfWork.complete();

    this.eventBus.publish(new TodoDeletionSuccessEvent(command.todoId));

    return true;
  }
}
