import { IEvent } from '@nestjs/cqrs';

export class PoktaMsgCreationFailedEvent implements IEvent {
  constructor(public readonly todoId: number) {}
}
