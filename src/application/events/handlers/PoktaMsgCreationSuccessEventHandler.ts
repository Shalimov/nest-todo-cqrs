import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PoktaMsgCreationSuccessEvent } from '../defs';

@EventsHandler(PoktaMsgCreationSuccessEvent)
export class PoktaMsgCreationSuccessEventHandler
  implements IEventHandler<PoktaMsgCreationSuccessEvent> {
  handle(event: PoktaMsgCreationSuccessEvent) {
    console.log(`Pokta Message Creation Succeed for todo ${event.todoId}`);
  }
}
