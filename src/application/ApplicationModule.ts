import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { InfrastructureModule } from '@/infrastructure/InfrastructureModule';

import {
  CreateTodoCommandHandler,
  SetStatusTodoCommandHandler,
  DeleteTodoCommandHandler,
  CreatePoktaMessageCommandHandler,
} from './commands/handlers';
import {
  AllTodosQueryHandler,
  FilterByStatusTodosQueryHandler,
  AllPoktaMessagesQueryHandler,
} from './queries/handlers';
import {
  TodoCreationSuccessEventHandler,
  TodoDeletionSuccessEventHandler,
  PoktaMsgCreationFailedEventHandler,
  PoktaMsgCreationSuccessEventHandler,
} from './events/handlers';
import { TodoSaga } from './sagas/TodoSaga';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [
    // Sagas
    TodoSaga,
    // Events
    TodoCreationSuccessEventHandler,
    TodoDeletionSuccessEventHandler,
    PoktaMsgCreationFailedEventHandler,
    PoktaMsgCreationSuccessEventHandler,
    // Queries
    AllTodosQueryHandler,
    FilterByStatusTodosQueryHandler,
    AllPoktaMessagesQueryHandler,
    // Commands
    CreateTodoCommandHandler,
    SetStatusTodoCommandHandler,
    DeleteTodoCommandHandler,
    CreatePoktaMessageCommandHandler,
  ],
})
export class ApplicationModule {}
