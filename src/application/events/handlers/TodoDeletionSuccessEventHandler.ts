import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { TodoDeletionSuccessEvent } from '../defs';

@EventsHandler(TodoDeletionSuccessEvent)
export class TodoDeletionSuccessEventHandler
  implements IEventHandler<TodoDeletionSuccessEvent> {
  handle(event: TodoDeletionSuccessEvent) {
    console.log(`Todo with such Id ${event.todoId} was deleted`);
  }
}
