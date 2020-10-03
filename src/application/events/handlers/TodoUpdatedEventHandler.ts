import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TodoUpdatedEvent } from '../defs';

@EventsHandler(TodoUpdatedEvent)
export class TodoUpdatedEventHandler
  implements IEventHandler<TodoUpdatedEvent> {
  handle(event: TodoUpdatedEvent) {
    console.log(`Todo with such Id ${event.todoId} was updated`);
  }
}
