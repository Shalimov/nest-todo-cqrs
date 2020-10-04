import { IEvent } from '@nestjs/cqrs';

export class TodoDeletionSuccessEvent implements IEvent {
  constructor(public readonly todoId: number) {}
}
