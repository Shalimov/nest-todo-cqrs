import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TodoCreationSuccessEvent } from '../defs';

@EventsHandler(TodoCreationSuccessEvent)
export class TodoCreationSuccessEventHandler
  implements IEventHandler<TodoCreationSuccessEvent> {
  handle(event: TodoCreationSuccessEvent) {
    console.log(`Todo with such Id ${event.todoId} was created`);
  }
}
