import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Todo } from '@/domain/aggregates/todo/Todo';
import { TodoStatus } from '@/domain/aggregates/todo/TodoStatus';
import { ITodoRepository } from '@/infrastructure/repositories/types/ITodoRepository';

import { CreateTodoCommand } from '../defs';
import { TodoCreatedEvent } from '@/application/events/defs';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand, boolean> {
  constructor(
    @Inject(ITodoRepository)
    private readonly TodoRepository: ITodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(query: CreateTodoCommand): Promise<boolean> {
    const newTodo = new Todo(
      query.title,
      query.description,
      TodoStatus.INPROGRESS,
    );

    await this.TodoRepository.insert(newTodo);

    this.eventBus.publish(new TodoCreatedEvent(newTodo.id));
    return true;
  }
}
