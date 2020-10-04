import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PoktaMsgCreationFailedEvent } from '../defs';

@EventsHandler(PoktaMsgCreationFailedEvent)
export class PoktaMsgCreationFailedEventHandler
  implements IEventHandler<PoktaMsgCreationFailedEvent> {
  handle(event: PoktaMsgCreationFailedEvent) {
    console.log(`Pokta Message Creation Failed for todo ${event.todoId}`);
  }
}
