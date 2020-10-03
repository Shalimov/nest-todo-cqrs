import { IEvent } from '@nestjs/cqrs';

export class TodoUpdatedEvent implements IEvent {
  constructor(public readonly todoId: number) {}
}
