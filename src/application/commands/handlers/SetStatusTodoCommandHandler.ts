import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { TodoUpdatedEvent } from '@/application/events/defs';
import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';
import { ITodoRepository } from '@/infrastructure/repositories/types/ITodoRepository';

import { SetStatusTodoCommand } from '../defs';

@CommandHandler(SetStatusTodoCommand)
export class SetStatusTodoCommandHandler
  implements ICommandHandler<SetStatusTodoCommand, boolean> {
  constructor(
    @Inject(ITodoRepository)
    private readonly todoRepository: ITodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SetStatusTodoCommand): Promise<boolean> {
    const todo = await this.todoRepository.get(command.todoId);

    if (!todo) {
      throw new Error(`Todo with id: ${command.todoId} is not found.`);
    }

    todo.status =
      command.status == 'completed'
        ? TodoStatus.COMPLETE
        : TodoStatus.INPROGRESS;

    await this.todoRepository.update(todo);

    this.eventBus.publish(new TodoUpdatedEvent(command.todoId));

    // It's temporary here
    await this.todoRepository.unitOfWork.complete();

    return true;
  }
}
