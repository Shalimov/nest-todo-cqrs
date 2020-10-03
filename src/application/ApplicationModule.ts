import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { InfrastructureModule } from '@/infrastructure/InfrastructureModule';

import {
  CreateTodoCommandHandler,
  SetStatusTodoCommandHandler,
} from './commands/handlers';
import {
  AllTodosQueryHandler,
  FilterByStatusTodosQueryHandler,
} from './queries/handlers';
import {
  TodoCreatedEventHandler,
  TodoUpdatedEventHandler,
} from './events/handlers';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [
    // Events
    TodoCreatedEventHandler,
    TodoUpdatedEventHandler,
    // Queries
    AllTodosQueryHandler,
    FilterByStatusTodosQueryHandler,
    // Commands
    CreateTodoCommandHandler,
    SetStatusTodoCommandHandler,
  ],
})
export class ApplicationModule {}
