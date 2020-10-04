import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { TodoCreationSuccessEvent } from '@/application/events/defs';
import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';
import { ITodoRepository } from '@/infrastructure/repositories/types/ITodoRepository';

import { CreateTodoCommand } from '../defs';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand, boolean> {
  constructor(
    @Inject(ITodoRepository)
    private readonly todoRepository: ITodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoCommand): Promise<boolean> {
    const newTodo = new Todo(
      command.title,
      command.description,
      TodoStatus.INPROGRESS,
    );

    const insertedTodo = await this.todoRepository.insert(newTodo);

    // It's temporary here
    await this.todoRepository.unitOfWork.complete();

    if (insertedTodo.id) {
      this.eventBus.publish(new TodoCreationSuccessEvent(insertedTodo.id));
    }

    return true;
  }
}
