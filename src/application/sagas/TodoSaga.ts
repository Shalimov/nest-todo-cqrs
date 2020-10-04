import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreatePoktaMessageCommand, DeleteTodoCommand } from '../commands/defs';
import {
  TodoCreationSuccessEvent,
  PoktaMsgCreationFailedEvent,
} from '../events/defs';

@Injectable()
export class TodoSaga {
  @Saga()
  createTodoSaga(events$: Observable<any>) {
    return events$.pipe(
      ofType(TodoCreationSuccessEvent),
      map((event: TodoCreationSuccessEvent) => {
        return new CreatePoktaMessageCommand(
          `Todo with some specific id was created ${event.todoId}`,
          event.todoId,
        );
      }),
    );
  }

  @Saga()
  poktaFailedSaga(events$: Observable<any>) {
    return events$.pipe(
      ofType(PoktaMsgCreationFailedEvent),
      map((event: PoktaMsgCreationFailedEvent) => {
        return new DeleteTodoCommand(event.todoId);
      }),
    );
  }
}
