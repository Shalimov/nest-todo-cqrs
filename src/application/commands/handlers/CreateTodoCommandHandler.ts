import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { TodoList } from '@/domain/aggregates/todoList/TodoList';
import { Todo } from '@/domain/aggregates/todoList/Todo';
import { TodoStatus } from '@/domain/aggregates/todoList/TodoStatus';
import { ITodoListRepository } from '@/infrastructure/repositories/ITodoListRepository';

import { CreateTodoCommand } from '../defs';
import { TodoCreatedEvent } from '@/application/events/defs';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand, boolean> {
  constructor(
    @Inject(ITodoListRepository)
    private readonly todoListRepository: ITodoListRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(query: CreateTodoCommand): Promise<boolean> {
    const newTodo = new Todo(
      query.title,
      query.description,
      TodoStatus.INPROGRESS,
    );

    await this.todoListRepository.insert(new TodoList([newTodo]));

    this.eventBus.publish(new TodoCreatedEvent(newTodo.id));
    return true;
  }
}
