import { IEvent } from '@nestjs/cqrs';

export class TodoCreatedEvent implements IEvent {
  constructor(public readonly todoId: string) {}
}
