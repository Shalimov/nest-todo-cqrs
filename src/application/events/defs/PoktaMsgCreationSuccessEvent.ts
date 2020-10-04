import { IEvent } from '@nestjs/cqrs';

export class PoktaMsgCreationSuccessEvent implements IEvent {
  constructor(public readonly todoId: number) {}
}
