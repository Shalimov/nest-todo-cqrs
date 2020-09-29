import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TodoCreatedEvent } from '../defs';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedEventHandler
  implements IEventHandler<TodoCreatedEvent> {
  handle(event: TodoCreatedEvent) {
    console.log(`Todo with such Id ${event.todoId} was created`);
  }
}
