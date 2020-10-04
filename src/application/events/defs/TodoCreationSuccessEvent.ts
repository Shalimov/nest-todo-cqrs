import { IEvent } from '@nestjs/cqrs';

export class TodoCreationSuccessEvent implements IEvent {
  constructor(public readonly todoId: number) {}
}
